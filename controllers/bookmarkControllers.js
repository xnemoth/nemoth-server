const Bookmark = require("../models/bookmark");

exports.getBookmark = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find();
    if (bookmarks) {
        res.json(bookmarks);
    } else {
        console.log("hong");
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy danh sách bookmark", error });
  }
};
