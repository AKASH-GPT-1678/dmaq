import Activity from "../models/activities.js";

const getActivity = async (req, res) => {
  try {
    let { limit, cursor } = req.query;
    limit = Number(limit) || 20;

    const tenantId = req.headers["tenant-id"];
    const query = {
      tenantId: tenantId,
    };
    

    if (cursor) {
      query.createdAt = {
        $lt: new Date(cursor),
      };
    }

    const activities = await Activity.find(query)
      .sort({ createdAt: -1 })
      .limit(limit);
    // .select("actorName type entityId createdAt");

    return res.json(activities);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export { getActivity };
