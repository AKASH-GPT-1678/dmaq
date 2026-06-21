import express from "express";
const app = express();
import router from "./routes/router.js";
import cors from "cors";
import Activity from "./models/activities.js";
import { Server } from "socket.io";
import {

  createManyActivities,
  getActivity,
  login,
  register,
} from "./controllers/activity.controller.js";
import http from "http"

app.use(express.json());
app.use(
  cors({
    origin: [
      "https://dmaq.vercel.app",
      "http://localhost:3001",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use("/api", router);
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3001",
      "https://dmaq.vercel.app"
    ],
    methods: ["GET", "POST"]
  }
});
io.on("connection", (socket) => {
  console.log("Connected:", socket.id);

  socket.on("disconnect", (reason) => {
    console.log("Disconnected:", socket.id);
    console.log("Reason:", reason);
  });
});
const createActivity = async (req, res) => {
  try {
    const lastActivity = await Activity.findOne()
      .sort({ entityId: -1 })
      .select("entityId");

    const nextEntityId = lastActivity ? lastActivity.entityId + 1 : 1;
    const activity = await Activity.create({
      tenantId: req.body.tenantId,
      actorId: req.body.actorId,
      actorName: req.body.actorName,
      type: req.body.type,
      entityId: nextEntityId,

      metadata: req.body.metadata,
    });
    console.log("Emitting:", req.body.tenantId);
     io.emit(req.body.tenantId.trim() , activity)
     

    res.status(201).json({
      success: true,
      data: activity,
    });
   
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app
  .route("/activities")
  .post(createActivity)
  .get(getActivity);


app
.route("/many")
.post(createManyActivities)


app.post("/register" , register);
app.post("/login" , login);

export default server;
