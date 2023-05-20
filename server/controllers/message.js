import messagesTable from "../models/messages.js";
import usersTable from "../models/users.js";
import groupsTable from "../models/groups.js";

export const getMessages = async (req, res) => {
  try {
    const { groupName } = req.body;

    const groupData = await groupsTable.findOne({ name: groupName });
    const groupId = groupData._id;

    const messagesData = await messagesTable
      .find({
        groupId,
      })
      .populate("userId")
      .exec();

    res.status(200).json({ success: true, data: messagesData });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "Unable to get messages, try again later",
    });
  }
};

export const createMessage = async (req, res) => {
  try {
    const { username, message, groupName } = req.body;

    const userData = await usersTable.findOne({ username });
    const userId = userData._id;

    const groupData = await groupsTable.findOne({ name: groupName });
    const groupId = groupData._id;

    const newMessageToCreate = {
      groupId,
      userId,
      message,
    };

    if (typeof newMessageToCreate !== "object") {
      res.status(400).json({
        success: false,
        msg: `You need to provide a 'newMessageToCreate' object. Received: ${JSON.stringify(
          newMessageToCreate
        )}`,
      });

      return;
    }

    const newMessage = await messagesTable.create(newMessageToCreate);
    res.status(201).json({ success: true, message: newMessage });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "Unable to create a message, try again later",
    });
  }
};
