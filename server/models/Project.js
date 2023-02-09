import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Project", ProjectSchema);
