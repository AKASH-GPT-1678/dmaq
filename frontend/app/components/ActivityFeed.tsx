"use client";
import React from "react";
import axios from "axios";
import { Activity } from "../types/Activity";
import PostCreatedForm from "./modals/PostForm";
import { io, Socket } from "socket.io-client";
import { useRouter } from "next/navigation";
import { error } from "console";
const ActivityFeed = () => {
  const [limit, setLimit] = React.useState(0);
  const [cursor, setCursor] = React.useState("2026-06-19T12:30:00.000Z");
  const [showActivity, setShowActvity] = React.useState(false);

  const [activity, setActivity] = React.useState<Activity[]>([]);
  const endpoint = process.env.NEXT_PUBLIC_ENDPOINT;
  const router = useRouter();
  const socketRef = React.useRef<Socket | null>(null);
  const tenantId = "tenant_001";
  const loadActivity = async (): Promise<Activity[]> => {
    try {
      const response = await axios.get<Activity[]>(
        `http://localhost:3000/activities?cursor=${cursor}&limit=20`,
        {
          headers: {
            "tenant-id": tenantId,
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  React.useEffect(() => {
    if (!tenantId) {
      router.push("/login");
    }
    loadActivity()
      .then((data) => {
        console.log(data);
        setActivity(data);
      })
      .catch((e) => {
        console.error(e);
      });

    const socketInstance = io("http://localhost:3000", {
      autoConnect: false,
    });

    socketRef.current = socketInstance;
    socketInstance.connect();

    socketInstance.on("connect", () => {
      console.log("Connected to server");
    });
    socketInstance.on(tenantId, (data) => {
      console.log(data);
      setActivity((prev) => [...prev, data as Activity]);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
<div className="min-h-screen bg-zinc-950 text-white">
  {/* Header */}
  <div className="sticky top-0 z-20 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
    <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
      <h1 className="text-2xl font-bold">Activity Feed</h1>

      <button
        onClick={() => setShowActvity(!showActivity)}
        className="rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition hover:scale-105"
      >
        Create Activity
      </button>
    </div>
  </div>

  {/* Feed */}
  <div className="mx-auto flex max-w-3xl flex-col gap-5 px-4 py-8">
    {activity.map((activity) => (
      <div
        key={activity._id}
        className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg transition duration-300 hover:border-zinc-700 hover:-translate-y-1"
      >
        {/* Top */}
        <div className="mb-5 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black text-lg font-bold">
            {activity.actorName.charAt(0).toUpperCase()}
          </div>

          <div className="flex-1">
            <h2 className="font-semibold">
              {activity.actorName}
            </h2>

            <p className="text-sm text-zinc-400">
              {activity.type}
            </p>
          </div>

          <span className="text-xs text-zinc-500">
            {new Date(activity.createdAt).toLocaleString()}
          </span>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">
            {activity.metadata.title}
          </h3>

          <p className="leading-7 text-zinc-300">
            {activity.metadata.description}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 border-t border-zinc-800 pt-4 text-xs text-zinc-500">
          Activity ID • {activity.entityId}
        </div>
      </div>
    ))}
  </div>

  {/* Modal */}
  {showActivity && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <PostCreatedForm setShowActivity={setShowActvity} />
    </div>
  )}
</div>
  );
};

export default ActivityFeed;
