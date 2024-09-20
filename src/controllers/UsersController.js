const { response } = require("express");
const UsersService = require("../services/UsersService");
const JWService = require("../services/JWService");

const createUser = async (req, res) => {
  try {
    const { username, email, number, password, confirmPassword } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);

    if (!username || !email || !number || !password || !confirmPassword) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERR",
        message: "Invalid email format",
      });
    } else if (password !== confirmPassword) {
      return res.status(200).json({
        status: "ERR",
        message: "Passwords do not match",
      });
    } else {
      console.log("Calling UsersService.createUser...");
      const response = await UsersService.createUser(req.body);

      console.log("Response from UsersService: ", response);
      return res.status(200).json(response);
    }
  } catch (e) {
    console.log("Error in createUser controller: ", e);
    return res.status(500).json({
      status: "ERR",
      message: "Internal server error",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);
    console.log(email, password);
    if (!email || !password) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERR",
        message: "Email phải đúng định dạng example@gmail.com",
      });

      // } else if (password !== confirmPassword) {
      //   return res.status(200).json({
      //     status: "ERR",
      //     message: "The password is equal confirm password",
      //   });
    } else {
      const response = await UsersService.loginUser(req.body);
      const { refresh_token, ...newResponse } = response;
      return res.status(200).json(newResponse);
    }
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    if (!id) {
      return res.status(200).json({
        status: "ERR",
        message: "The user id is required",
      });
    } else {
      // console.log("User id: ", id);
      const response = await UsersService.updateUser(id, data);
      return res.status(200).json(response);
    }
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(200).json({
        status: "ERR",
        message: "The user id is required",
      });
    } else {
      // console.log("User id: ", id);
      const response = await UsersService.deleteUser(id);
      return res.status(200).json(response);
    }
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const response = await UsersService.getAllUsers();
    res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getUserDetail = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).json({
        status: "ERR",
        message: "The user id is required",
      });
    }
    const response = await UsersService.getUserDetail(id);
    res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const token = req.headers.token.split(" ")[1];
    if (!token) {
      return res.status(404).json({
        status: "ERR",
        message: "The token is required",
      });
    }
    const response = await JWService.refreshToken(token);
    res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserDetail,
  refreshToken,
};
