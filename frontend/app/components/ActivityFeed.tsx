"use client";
import React from "react";
import axios from "axios";
import { Activity } from "../types/Activity";
import PostCreatedForm from "./modals/PostForm";
const ActivityFeed = () => {
  const [limit, setLimit] = React.useState(0);
  const [cursor, setCursor] = React.useState();
  const [showActivity, setShowActvity] = React.useState(false);

  const [activity, setActivity] = React.useState<Activity[]>([]);
  const loadActivity = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/activities?cursor=${cursor}&limit=20`,
        {
          headers: {
            "tenant-id": "google",
          },
        },
      );
      setActivity(response.data);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="relative">
      <button onClick={() => setShowActvity(!showActivity)}>Activity</button>
      {showActivity && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30">
          <PostCreatedForm setShowActivity={setShowActvity} />
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;
