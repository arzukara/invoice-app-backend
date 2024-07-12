import express from "express";
import db from "../db/connection.js";

const router = express.Router();

let collection = await db.collection("invoice");

router.get("/", async (req, res) => {
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

router.post('/filter', async (req, res) => {
    const { selectedStatuses } = req.body;
    try {
        const invoices = await collection.find({ status: { $in: selectedStatuses } }).toArray();
        res.send(invoices).status(200);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching invoices' });
    }
});

export default router;

