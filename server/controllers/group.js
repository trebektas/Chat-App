import groupsTable from "../models/groups.js";

export const createGroup = async (req, res) => {
  try {
    const { name } = req.body;
    const groupData = await groupsTable.findOne({ name });

    if (!groupData) {
      const newGroup = await groupsTable.create({ name });
      res.status(201).json({ success: true, data: newGroup });
    } else {
      res.status(400).json({ success: false, msg: "Group already exists" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "Unable to create a group, try again later",
    });
  }
};

export const getAllGroup = async (req, res) => {
  try {
    const groupsData = await groupsTable.find().sort({ name: 1, _id: 1 });

    if (groupsData) {
      res.status(200).json({ success: true, data: groupsData });
    } else {
      res
        .status(500)
        .json({ success: false, msg: "Unable to get groups, try again later" });
    }
  } catch (error) {
    console.log(error);
  }
};
