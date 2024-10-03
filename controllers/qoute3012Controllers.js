const Qoutes3012 = require("../models/quote3012");

exports.getQuotes = async (req, res) => {
  try {
    const Qoutes = await Qoutes3012.find();
    if (Qoutes) {
      res.json(Qoutes);
    } else {
      console.log("hong");
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách 3012", error });
  }
};

exports.createQuote = async (req, res) => {
  const newQuote = new Qoutes3012(req.body);
  try {
    await newQuote
      .save()
      .then((quoute) => console.log(quoute))
      .catch((error) => console.log(error));
  } catch (error) {
    res.status(400).json({ message: "Loi khi tạo 3012", error });
  }
};
