const dotenv = require("dotenv");
const express = require("express");
const unless = require("express-unless");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./Routes/userRoute");
const boardRoute = require("./Routes/boardRoute");
const listRoute = require("./Routes/listRoute");
const cardRoute = require("./Routes/cardRoute");
const auth = require("./Middlewares/auth");
const functions = require("firebase-functions");

dotenv.config();
const app = express();

const allowedDomains = [
  "http://localhost:3000",
  "https://trello-application-5672d.web.app",
];
app.use(
  cors({
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
    origin: (origin, callback) => {
      // bypass the requests with no origin (like curl requests, mobile apps, etc )
      if (!origin) return callback(null, true);

      if (allowedDomains.indexOf(origin) === -1) {
        var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);
app.use(express.json());

// AUTH VERIFICATION AND UNLESS

auth.verifyToken.unless = unless;

app.use(
  auth.verifyToken.unless({
    path: [
      { url: "/user/login", method: ["POST"] },
      { url: "/user/register", method: ["POST"] },
    ],
  })
);

//MONGODB CONNECTION

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("Database connection is succesfull!");
  })
  .catch((err) => {
    console.log(`Database connection failed!`);
    console.log(`Details : ${err}`);
  });

//ROUTES

app.use("/user", userRoute);
app.use("/board", boardRoute);
app.use("/list", listRoute);
app.use("/card", cardRoute);

exports.trello = functions.https.onRequest(app);
