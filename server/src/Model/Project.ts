import mongoose, { Schema } from "mongoose";
import { ProjectEntity } from "../types";

interface ProjectEntityDocument extends ProjectEntity {}

const TaskSchema: Schema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  isComplete: { type: Boolean, required: true },
  order: { type: Number, required: true },
});

const ProjectEntitySchema: Schema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  createdTime: {
    type: Number,
    required: true,
    default: new Date().getTime(),
  },
  tasks: [TaskSchema],
});

const ProjectModel = mongoose.model<ProjectEntityDocument>(
  "Project",
  ProjectEntitySchema
);

export default ProjectModel;
