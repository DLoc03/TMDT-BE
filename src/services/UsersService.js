const User = require("../models/UsersModel");
const bcrypt = require("bcrypt");
const { generalAccessToken, generalRefreshToken } = require("./JWService");

const createUser = (user) => {
  return new Promise(async (resolve, reject) => {
    const { username, email, number, password, confirmPassword } = user;
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser !== null) {
        return resolve({
          status: "ERR",
          message: "The email is already",
        });
      }
      const hash = bcrypt.hashSync(password, 10);
      const createdUser = await User.create({
        username,
        email,
        number,
        password: hash,
      });
      if (createdUser) {
        resolve({
          status: "OK",
          message: "Success",
          data: createdUser,
        });
      }
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = userLogin;
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      } else {
        const comparePassword = bcrypt.compareSync(
          password,
          checkUser.password
        );
        console.log(password);
        console.log("comparePassword: ", comparePassword);
        if (!comparePassword) {
          resolve({
            status: "ERR",
            message: "The password is incorrect",
          });
        } else {
          const access_token = await generalAccessToken({
            id: checkUser.id,
            isAdmin: checkUser.isAdmin,
          });
          console.log("access_token: ", access_token);

          const refresh_token = await generalRefreshToken({
            id: checkUser.id,
            isAdmin: checkUser.isAdmin,
          });
          console.log("refresh token: ", refresh_token);
          resolve({
            status: "OK",
            message: "Successfully!",
            access_token: access_token,
          });
        }
      }
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

const updateUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });
      // console.log("check user service: ", checkUser);
      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }
      const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
      console.log("Update user: ", updatedUser);
      resolve({
        status: "OK",
        message: "Success",
        data: updatedUser,
      });
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });
      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }
      // await User.findByIdAndDelete({
      //   _id: id,
      // });
      resolve({
        status: "OK",
        message: "The user is deleted",
      });
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

const getAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allUsers = await User.find();
      if (allUsers) {
        resolve({
          status: "OK",
          message: "Success",
          data: allUsers,
        });
      } else {
        resolve({
          status: "ERR",
          message: "No data",
        });
      }
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

const getUserDetail = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        _id: id,
      });
      console.log("Check user detail: ", user);
      if (user === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }
      resolve({
        status: "OK",
        message: "Success",
        data: user,
      });
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserDetail,
};
