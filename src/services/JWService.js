const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const generalAccessToken = async (payload) => {
  console.log("payload: ", payload);
  const access_token = jwt.sign(
    {
      payload,
    },
    process.env.ACCESS_TOKEN,
    { expiresIn: "30s" }
  );
  return access_token;
};

const generalRefreshToken = async (payload) => {
  console.log("payload: ", payload);
  const refresh_token = jwt.sign(
    {
      payload,
    },
    process.env.REFRESH_TOKEN,
    { expiresIn: "365d" }
  );
  return refresh_token;
};

const refreshToken = async (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("Token: ", token);
      jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
        if (err) {
          resolve({
            status: "ERR",
            message: "The authentication",
          });
        }
        const { payload } = user;
        const access_token = await generalAccessToken({
          id: payload?.id,
          isAdmin: payload?.isAdmin,
        });
        console.log("Access token: ", access_token);
        resolve({
          status: "OK",
          message: "Success",
          data: access_token,
        });
      });
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

module.exports = {
  generalAccessToken,
  generalRefreshToken,
  refreshToken,
};
