import app from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./configs/mongo.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
connectDB();

app.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}`);
});
