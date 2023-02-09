import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Query {
    hello: String
    projects: [Project]
    project(_id: ID!): Project
    tasks: [Task]
    task(_id: ID!): Task
  }

  type Mutation {
    createProject(name: String, description: String): Project
    deleteProject(projectID: ID!): Project
    updateProject(projectID: ID!, name: String!, description: String): Project

    createTask(title: String, projectID: ID): Task
    deleteTask(taskID: ID!): Task
    updateTask(taskID: ID!, title: String!, projectID: ID!): Task
  }

  type Project {
    _id: ID
    name: String
    description: String
    createdAt: String
    updatedAt: String
    tasks: [Task]
  }

  type Task {
    _id: ID
    title: String
    project: Project
    createdAt: String
    updatedAt: String
  }
`;
