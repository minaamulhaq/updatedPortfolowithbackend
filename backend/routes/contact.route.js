import { Router } from "express";

import { creatContact, getContacts } from "../controllers/contact.model.js";
import { protect } from "../middleware/protect.js";


const route = Router();
route.post("/create", creatContact);
route.get("/all", protect, getContacts);
export default route;