import usersTable from "../models/users.js";

export const checkUsername = async (req, res) => {
  try {
    const { username } = req.body;
    const userData = await usersTable.findOne({ username });

    if (!userData) {
      const newUser = await usersTable.create({ username });
      res.status(201).json({ success: true, data: newUser });
    } else {
      res.status(200).json({ success: true, data: userData });
    }
  } catch (error) {
    console.log(error);
  }
};
