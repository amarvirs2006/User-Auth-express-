# Express.js User Authentication with Email OTP Verification

This project is a simple authentication system built using Node.js and Express.js. It allows users to:

- Register with email and password
- Verify their email using OTP
- Login after successful verification
- Access a protected dashboard
- Logout

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- express-session
- bcryptjs
- nodemailer
- dotenv
- EJS (Templating engine)

## Getting Started

1. Clone the repository

   git clone https://github.com/your-username/auth-project.git
   cd auth-project

2. Install dependencies

   npm install

3. Create a `.env` file in the root folder and add your credentials

   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password

4. Run the application

   node main.js

   The app will run at: http://localhost:3000

## Folder Structure

auth-project/
├── models/
│   └── user.js
├── views/
│   ├── register.ejs
│   ├── login.ejs
│   ├── verify-otp.ejs
│   └── dashboard.ejs
├── .env
├── .gitignore
├── package.json
└── main.js

## Important Notes

- Do not push `.env` to GitHub. Add it to `.gitignore`.
- Also add `node_modules/` to `.gitignore` to keep your repo clean.
- If you've already pushed `node_modules`, remove it from the repo history using:

   git rm -r --cached node_modules
   git commit -m "Remove node_modules"
   git push

## Author

Your Name - https://github.com/amarvirs2006
