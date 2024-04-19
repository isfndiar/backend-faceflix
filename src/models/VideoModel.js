import mongoose from "mongoose";

const videoSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    video: {
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

const VideoModel = mongoose.model("Video", videoSchema);

export default VideoModel;
