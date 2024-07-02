if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors')

const authRoute = require('./routes/auth')
const notesRoute = require('./routes/notes')

// express init
const app = express()

// mongoose init
const dbUrl = process.env.DB_URL || "mongodb+srv://vijaykumarannam069:sSCEGQ6vEsAYEZM3@cluster0.9hu59w0.mongodb.net/"
async function main() {
  await mongoose.connect(dbUrl);
  console.log("Database connected");
}
main().catch(err => console.log(err));

// app.use(cors())
app.use(cors({
  origin: '*', // Allow requests from any origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// middleware
app.use(express.json())


// Routes
app.get('/', (req, res) => {
    res.send("Hello wprld")
})

app.use('/api/auth', authRoute)
app.use('/api/notes', notesRoute)


// error handling middleware
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err
    if (!err.message) err.message = 'Something went wrong'
    res.status(statusCode).json({success: false, message: err.message}); //For development
})

const port = process.env.PORT || 8080
app.listen(port, (req, res) => {
    console.log('Listening to the port 8080');
})

// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config();
// }

// const express = require("express");
// const mongoose = require('mongoose');
// const cors = require('cors');
// const session = require('express-session');
// const passport = require('passport');
// const MongoStore = require('connect-mongo');
// const authRoute = require('./routes/auth');
// const notesRoute = require('./routes/notes');
// require('./utils/passport'); // Importing the passport configuration

// // express init
// const app = express();

// // mongoose init
// const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/myNoteBook';
// async function main() {
//   await mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
//   console.log("Database connected");
// }
// main().catch(err => console.log(err));

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Session middleware
// app.use(session({
//     secret: process.env.SESSION_SECRET || 'mySecret',
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({ mongoUrl: dbUrl })
// }));

// // Passport middleware
// app.use(passport.initialize());
// app.use(passport.session());

// // Routes
// app.get('/', (req, res) => {
//     res.send("Hello world");
// });

// app.use('/api/auth', authRoute);
// app.use('/api/notes', notesRoute);

// // Error handling middleware
// app.use((err, req, res, next) => {
//     const { statusCode = 500 } = err;
//     if (!err.message) err.message = 'Something went wrong';
//     res.status(statusCode).json({ success: false, message: err.message });
// });

// const port = process.env.PORT || 8080;
// app.listen(port, () => {
//     console.log(`Listening to the port ${port}`);
// });
