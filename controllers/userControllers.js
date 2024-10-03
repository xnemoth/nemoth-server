const User = require("../models/user");
const bcrypt = require("bcrypt");

const saltRounds = 10;

exports.getUser = async (req, res) => {
  try {
    const users = await User.find();
    if (users) {
      res.json(users);
    } else {
      console.log("hong");
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy danh sách người dùng", error });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {
      if (err) {
        console.log("error", err);
      } else {
        const newUser = new User({
          ring: req.body.ring,
          username: req.body.username,
          password: hash,
        });
        const saveUser = await newUser.save();
        res.status(201).json(saveUser);
      }
    })
  } catch (error) {
    res.status(400).json({ message: "Loi khi tạo người dùng", error });
  }
};

// exports.updateUser = async (req, res) => {}

// exports.deleteUser = async (req, res) => {}
