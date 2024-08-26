import express from "express";
import db from "../db/connection.js";
import {
  HttpError,
  errorHandler,
  notFoundHandler,
} from "../middleware/errorHandlers.js";

const router = express.Router();

let collection;
(async () => {
  collection = await db.collection("invoice");
})();

router.get("/", async (req, res, next) => {
  try {
    let results = await collection.find({}).toArray();
    res.status(200).send(results);
  } catch (error) {
    next(new HttpError(500, "Error fetching invoices"));
  }
});

router.post("/count", async (req, res, next) => {
  try {
    const { selectedStatuses } = req.body;
    if (!selectedStatuses || !Array.isArray(selectedStatuses)) {
      throw new HttpError(
        400,
        "Bad Request: selectedStatuses is required and must be an array"
      );
    }

    let query = {};
    if (selectedStatuses.length > 0) {
      query.status = { $in: selectedStatuses };
    }

    const count = await collection.countDocuments(query);
    res.status(200).send({ count });
  } catch (error) {
    next(error);
  }
});

router.post("/filter", async (req, res, next) => {
  try {
    const { selectedStatuses } = req.body;
    if (!Array.isArray(selectedStatuses)) {
      throw new HttpError(
        400,
        "Bad Request: selectedStatuses must be an array"
      );
    }

    const invoices = await collection
      .find({ status: { $in: selectedStatuses } })
      .toArray();

    res.status(200).send(invoices);
  } catch (error) {
    next(error);
  }
});

router.post("/page", async (req, res, next) => {
  try {
    const { selectedStatuses } = req.body;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    if (isNaN(page) || isNaN(limit)) {
      throw new HttpError(400, "Bad Request: page and limit must be numbers");
    }

    let query = {};
    if (Array.isArray(selectedStatuses) && selectedStatuses.length > 0) {
      query.status = { $in: selectedStatuses };
    }

    let results = await collection
      .find(query)
      .skip(offset)
      .limit(limit)
      .toArray();

    res.status(200).send(results);
  } catch (error) {
    next(error);
  }
});

// Use the not found handler
router.use(notFoundHandler);

// Use the error handler
router.use(errorHandler);

export default router;
