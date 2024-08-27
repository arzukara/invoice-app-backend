import express from "express";
import cors from "cors";
import invoices from "./routes/invoice.js";

const PORT = 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/invoice", invoices);
 
// starts the express server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})