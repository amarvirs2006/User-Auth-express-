🛡️ User Authentication System (Express.js)
A simple user authentication system built using Node.js, Express.js, MongoDB, and EJS.
Includes features like user registration, login, OTP email verification, and session-based authentication.

🚀 Features
Register with username, email, and password

OTP-based email verification

Login with secure password hashing (bcryptjs)

Protected dashboard route (only for logged-in users)

Session management using express-session

Logout functionality

📦 Tech Stack
Backend: Node.js, Express.js

Database: MongoDB, Mongoose

Authentication: express-session, bcryptjs

Email: nodemailer

Templating: EJS

📂 Folder Structure

auth-project/
│
├── models/
│   └── user.js          # Mongoose schema for User
│
├── views/
│   ├── register.ejs
│   ├── login.ejs
│   ├── verify-otp.ejs
│   └── dashboard.ejs
│
├── .env                 # Environment variables (email credentials)
├── .gitignore
├── package.json
└── main.js              # Main Express app