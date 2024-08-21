import { getClients, getClientById } from "./client.queries.mjs";
import { getProjects } from "./project.queries.mjs";
import { getUsers, getUserByEmail } from "./user.queries.mjs";
import { requestS3URL } from "./aws.queries.mjs";

export default {
  getClients,
  getClientById,
  getProjects,
  getUsers,
  getUserByEmail,
  requestS3URL,
};
