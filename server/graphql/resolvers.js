import { resourceUsage } from "process";
import Project from "../models/Project.js";
import Task from "../models/Task.js";

export const resolvers = {
  Query: {
    hello: () => "hello world",
    projects: async () => await Project.find(),
    project: async (_, { _id }) => await Project.findById(_id),
    tasks: async () => await Task.find(),
    task: async (_, { _id }) => await Task.findById(_id),
  },
  Mutation: {
    createProject: async (_, { name, description }) => {
      const project = new Project({
        name,
        description,
      });

      return await project.save();
    },
    deleteProject: async (_, { projectID }) => {
      const project = await Project.findByIdAndDelete(projectID);
      if (!project) throw new Error("Project not found");

      await Task.deleteMany({ projectID });
      return project;
    },
    updateProject: async (_, args) => {
      const updateProject = await Project.findByIdAndUpdate(
        args.projectID,
        args,
        {
          new: true,
        }
      );

      if (!updateProject) throw new Error("Project not foud");

      return updateProject;
    },

    createTask: async (_, { title, projectID }) => {
      const project = await Project.findById(projectID);

      if (!project) throw new Error("Project not found");

      const task = new Task({
        title,
        projectID,
      });

      return await task.save();
    },
    deleteTask: async (_, { taskID }) => {
      const task = await Task.findByIdAndDelete(taskID);

      if (!task) throw new Error("Task not found");

      return task;
    },
    updateTask: async (_, args) => {
      const project = await Project.findById(args.projectID);
      if (!project) throw new Error("Project not found");
      const updateTask = await Task.findByIdAndUpdate(args.taskID, args, {
        new: true,
      });
      if (!updateTask) throw new Error("Task not found");
      return updateTask;
    },
  },
  Project: {
    tasks: async (parent) => await Task.find({ projectID: parent._id }),
  },
  Task: {
    project: async (parent) => await Project.findById(parent.projectID),
  },
};
