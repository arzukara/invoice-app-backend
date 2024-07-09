import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
    let collection = await db.collection("invoice");
    let results = await collection.find({}).toArray();
    console.log(results);
    res.send(results).status(200);
});

router.get("/:id", async (req, res) => {
    let collection = await db.collection("invoice");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

export default router;

