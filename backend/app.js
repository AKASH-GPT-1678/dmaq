import express from "express";
const app = express();
import decodeToken from "./middlewares/checkTokenMiddleware.js";
import router from "./routes/router.js";
import cors from "cors";
import {
  createActivity,
  getActivity,
} from "./controllers/activity.controller.js";

app.use(express.json());
app.use(cors());
app.use(decodeToken);
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app
  .route("/activities")
  .post(createActivity)
  .get(getActivity);

export default app;
