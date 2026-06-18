import express from 'express';
const app = express();
import decodeToken from './middlewares/checkTokenMiddleware.js';
import router from './routes/router.js';
import cors from 'cors';

app.use(express.json());
app.use(cors());
app.use(decodeToken);
app.use("/api", router);

app.get("/", (req, res) => {
    res.send("Hello World!");
});




export default app;