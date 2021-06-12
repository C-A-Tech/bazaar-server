const ImageUploadRouter = require("express").Router();
const parser = require("../middleware/cloudinary.config");


const ImageSchema = require("../models/ImageUpload");

UploadImage = async (req, res) => {
  const imageUploaded = new ImageSchema({
    image: req.file.path,
  });

  try {
    await imageUploaded.save();
    res.json({ msg: "image uploaded"})
  } catch (error) {
    return res.status(400).json({
      message: `image upload failed, check to see the ${error}`,
      status: "error",
    });
  }
};


ImageUploadRouter.post("/", parser.single("image"), UploadImage);

module.exports = ImageUploadRouter;