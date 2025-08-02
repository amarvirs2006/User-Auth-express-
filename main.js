const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')
const nodemailer = require('nodemailer')
const User = require('./models/user')

dotenv.config()

const app = express()
mongoose.connect('mongodb://localhost:27017/authProject')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true })) //With This we can use req.body

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false
}))

function isLoggedIn(req, res, next) {
    if (req.session.userId) {
        return next()
    }
    res.redirect('/login')
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

function generateOTP() {
//Using This Formula I Generated OTP: Math.floor(min+Math.random()*(max-min+1))
    return Math.floor(100000 + Math.random() * 900000).toString()
}

// Routes
app.get('/', (req, res) => res.redirect('/login'))

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body
    const hashed = await bcrypt.hash(password, 10)
    const otp = generateOTP()
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000)

    await User.create({ username, email, password: hashed, otp, otpExpires })

    await transporter.sendMail({
        to: email,
        from: process.env.EMAIL_USER,
        subject: 'Verify your email',
        text: `Your OTP is: ${otp}`
    })

    req.session.tempUser = username
    res.redirect('/verify-otp')
})

app.get('/verify-otp', (req, res) => {
    res.render('verify-otp')
})

app.post('/verify-otp', async (req, res) => {
    const { otp } = req.body
    const user = await User.findOne({ username: req.session.tempUser })

    if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
        return res.send('Invalid or expired OTP')
    }

    user.otp = undefined
    user.otpExpires = undefined
    await user.save()

    req.session.userId = user._id
    res.redirect('/dashboard')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username })

    if (!user) return res.send('No such user')

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) return res.send('Wrong password')

    req.session.userId = user._id
    res.redirect('/dashboard')
})

app.get('/dashboard', isLoggedIn, (req, res) => {
    res.render('dashboard')
})

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login')
    })
})

app.listen(3000, () => {
    console.log('App running on http://localhost:3000')
})
