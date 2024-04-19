import mongoose from "mongoose";

const imageSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
  },
  {
    timestamps: true,
  }
);

const ImageModel = mongoose.model("Image", imageSchema);

export default ImageModel;
