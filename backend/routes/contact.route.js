import { Router } from "express";

import { creatContact, getContacts } from "../controllers/contact.model.js";

const route = Router();
route.post("/create", creatContact);
route.get("/all", getContacts);
export default route;