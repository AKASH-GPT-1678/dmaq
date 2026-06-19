import mongoose, { now } from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    tenantId: {
      type: String,
      required: true,
    },
    actorId: {
      type: String,
      required: true,
    },
    actorName: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["NOTICE", "REPORT", "ACTIVITY", "UPDATE"],
    },
    entityId: {
      type: Number,
      required: true,
    },
    metadata: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  },
);

const Activity = mongoose.model("Activity", activitySchema);

export default Activity;
