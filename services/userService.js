import User from "../model/user.js";

export const getUsers = async () => {
  const users = await User.find();
  if (!users.length) {
    console.log("no users found in db");
  }
  return users;
};

export const userExists = async (searchObject) => {
  const user = await User.findOne(searchObject);
  return user;
};
