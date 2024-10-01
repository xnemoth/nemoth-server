const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const secretKey = "nemoth";

const DATA = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  { id: 3, name: "Item 3" },
];

const users = [
  {
    id: 1,
    username: "nemoth",
    password: "$2a$10$2GPASaptsK.dzmEn4rqw5eVw29ZkuUYHWZWwSoMJCYirzn8QjfL5e",
  },
];

const port = process.env.PORT || 3000; // Use the port provided by the host or default to 3000
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Define a route to handle incoming requests
app.get("/bookmark", (req, res) => {
  res.send("Bookmark here!");
});

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

// Middleware to parse JSON requests
app.use(express.json());

// Create (POST) a new item
app.post("/items", (req, res) => {
  const newItem = req.body;
  DATA.push(newItem);
  res.status(201).json(newItem);
});

// Read (GET) all items
app.get("/items", (req, res) => {
  res.json(DATA);
});

// Read (GET) a specific item by ID
app.get("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = DATA.find((item) => item.id === id);
  if (!item) {
    res.status(404).json({ error: "Item not found" });
  } else {
    res.json(item);
  }
});

// Update (PUT) an item by ID
app.put("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedItem = req.body;
  const index = DATA.findIndex((item) => item.id === id);
  if (index === -1) {
    res.status(404).json({ error: "Item not found" });
  } else {
    DATA[index] = { ...DATA[index], ...updatedItem };
    res.json(DATA[index]);
  }
});

// Delete (DELETE) an item by ID
app.delete("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = DATA.findIndex((item) => item.id === id);
  if (index === -1) {
    res.status(404).json({ error: "Item not found" });
  } else {
    const deletedItem = DATA.splice(index, 1);
    res.json(deletedItem[0]);
  }
});

// Function to verify user credentials
function authenticateUser(username, password) {
  const user = users.find((user) => user.username === username);
  if (!user) {
    return null; // User not found
  }
  if (bcrypt.compareSync(password, user.password)) {
    return user; // Password is correct
  }
  return null; // Password is incorrect
}

app.post("/auth/login", (req, res) => {
  const { username, password } = req.body;
  const user = authenticateUser(username, password);

  if (!user) {
    return res.status(401).json({ error: "Authentication failed" });
  }

  const token = jwt.sign(
    { userId: user.id, username: user.username },
    secretKey,
    {
      expiresIn: "1h", // Token expiration time
    }
  );

  res.json({ token });
});

function authenticateToken(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Authentication token missing" });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Token is invalid" });
    }
    req.user = user;
    next(); // Continue to the protected route
  });
}

// Example usage:
app.get("/admin", authenticateToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

// Change the 404 message modifing the middleware
app.use(function (req, res, next) {
  res.status(404).send("Tìm không thấy ?! -48.876667, -123.393333");
});
