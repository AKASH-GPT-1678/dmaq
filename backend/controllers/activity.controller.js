import Activity from "../models/activities.js";

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

export { createActivity, getActivity };
