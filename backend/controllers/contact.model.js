import { Contact } from "../models/contact.model.js";

const creatContact = async (req, res) => {
    try {
        if (!req.body)
            return res.status(400).json({ error: "Please provide contact data" });
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const contact = new Contact({ name, email, subject, message });
        const savedContact = await contact.save();
        res.status(201).json(savedContact);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export { creatContact, getContacts };