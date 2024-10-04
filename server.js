require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const connectDB = require("./config/db");

const app = express();
app.use(express.json());

app.use(cors({
  origin: "https://slug-panel.onrender.com"
}
))
app.options('*', cors())

connectDB();

const userRoutes = require("./routes/userRoutes");
const bookmarkRoutes = require("./routes/bookmarkRoutes");
const quote3012Routes = require("./routes/qoute3012Routes");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

app.get("/", (req, res) => {
  res.send("wellcome");
});

app.use('/api', userRoutes)

app.use('/api', bookmarkRoutes);

app.use('/api', quote3012Routes);

// // Function to verify user credentials
// function authenticateUser(username, password) {
//   const user = User.find((user) => user.username === username);
//   if (!user) {
//     return null; // User not found
//   }
//   if (bcrypt.compareSync(password, user.password)) {
//     return user; // Password is correct
//   }
//   return null; // Password is incorrect
// }

// app.post("/auth/login", (req, res) => {
//   const { username, password } = req.body;
//   const user = authenticateUser(username, password);

//   if (!user) {
//     return res.status(401).json({ error: "Authentication failed" });
//   }

//   const token = jwt.sign(
//     { userId: user.id, username: user.username },
//     process.env.SECRET_KEY,
//     {
//       expiresIn: "1h", // Token expiration time
//     }
//   );

//   res.json({ token });
// });

// function authenticateToken(req, res, next) {
//   const token = req.header("Authorization");

//   if (!token) {
//     return res.status(401).json({ error: "Authentication token missing" });
//   }

//   jwt.verify(token, secretKey, (err, user) => {
//     if (err) {
//       return res.status(403).json({ error: "Token is invalid" });
//     }
//     req.user = user;
//     next(); // Continue to the protected route
//   });
// }

// // Example usage:
// app.get("/admin", authenticateToken, (req, res) => {
//   res.json({ message: "This is a protected route", user: req.user });
// });

const port = process.env.PORT || 3000; // Use the port provided by the host or default to 3000
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Change the 404 message modifing the middleware
app.use(function (req, res, next) {
  res.status(404).send("Tìm không thấy ?! -48.876667, -123.393333");
});
