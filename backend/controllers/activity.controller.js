import Activity from "../models/activities.js";
import Auth from "../models/tenant.js";

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
    const totalCount = await Activity.countDocuments(query);
    console.log(totalCount);

    const activities = await Activity.find(query)
      .sort({ createdAt: -1 })
      .limit(limit);

    const lastTimestamp = activities.at(-1)?.createdAt;
    console.log(lastTimestamp);
    // .select("actorName type entityId createdAt");
    const response = {
      data : activities,
      lastTimestamp : lastTimestamp
    }

    return res.json(response);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
const register = async (req, res) => {
  try {
    const { tenantId } = req.body;

    if (!tenantId) {
      return res.status(400).json({
        message: "Tenant ID is required",
      });
    }

    const existingTenant = await Auth.findOne({ tenantId });

    if (existingTenant) {
      return res.status(409).json({
        message: "Tenant already exists",
      });
    }

    const tenant = await Auth.create({
      tenantId,
    });

    res.status(201).json({
      message: "Tenant registered successfully",
      success: true,
      tenantId: tenant.tenantId,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
const login = async (req, res) => {
  try {
    const { tenantId } = req.body;

    if (!tenantId) {
      return res.status(400).json({
        message: "Tenant ID is required",
      });
    }

    const tenant = await Auth.findOne({ tenantId });

    if (!tenant) {
      return res.status(404).json({
        message: "Tenant not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Login successful",
      success: true,
      tenantId: tenant.tenantId,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const createManyActivities = async (req, res) => {
  try {
    const activities = req.body;

    const insertedActivities = await Activity.insertMany(activities);

    res.status(201).json({
      success: true,
      data: insertedActivities,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { getActivity, createManyActivities, register, login };
