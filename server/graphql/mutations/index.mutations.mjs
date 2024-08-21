import { signup, login } from "./user.mutations.mjs";
import { addClient, editClient, deleteClient } from "./client.mutations.mjs";
import {
  addProject,
  updateProject,
  deleteProject,
} from "./project.mutations.mjs";

export default {
  signup,
  login,
  addClient,
  editClient,
  deleteClient,
  addProject,
  updateProject,
  deleteProject,
};
