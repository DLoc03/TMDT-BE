const Product = require("../models/ProductsModel");
const bcrypt = require("bcrypt");
const { generalAccessToken, generalRefreshToken } = require("./JWService");

const createProduct = (product) => {
  return new Promise(async (resolve, reject) => {
    const { name, image, type, price, description, rating, countInStock } =
      product;
    try {
      const createdProduct = await Product.create({
        name,
        image,
        type,
        price,
        description,
        rating,
        countInStock,
      });
      if (createdProduct) {
        resolve({
          status: "OK",
          message: "Success",
          data: createdProduct,
        });
      }
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

const updateProduct = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });
      if (checkProduct === null) {
        resolve({
          status: "ERR",
          message: "The product is not existed",
        });
      }
      const updatedProduct = await Product.findByIdAndUpdate(id, data, {
        new: true,
      });
      //   console.log("Update user: ", updatedUser);
      resolve({
        status: "OK",
        message: "Success",
        data: updatedProduct,
      });
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });
      if (checkProduct === null) {
        resolve({
          status: "ERR",
          message: "The product is not existed",
        });
      }
      // await User.findByIdAndDelete({
      //   _id: id,
      // });
      resolve({
        status: "OK",
        message: "The product is deleted",
      });
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

const getAllProducts = (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalProducts = await Product.countDocuments();
      if (filter) {
        // console.log("Filter result: ", filter);
        // const objectFilter = {};
        // objectFilter[filter[0]] = filter[1];
        // console.log("Object filter: ", objectFilter);
        const label = filter[0];
        const allProductFilter = await Product.find({
          [label]: { $regex: filter[1] },
        })
          .limit(limit)
          .skip(page * limit);

        if (allProductFilter.length === 0) {
          resolve({
            status: "OK",
            message: `There are no products fill with ${filter[0]} is ${filter[1]}`,
            totalProduct: totalProducts,
            pageCurrent: Number(page) + 1,
            totalPage: Math.ceil(totalProducts / limit),
          });
        } else {
          resolve({
            status: "OK",
            message: "Success",
            data: allProductFilter,
            totalProduct: totalProducts,
            pageCurrent: Number(page) + 1,
            totalPage: Math.ceil(totalProducts / limit),
          });
        }
      }
      if (sort) {
        console.log("Sort result: ", sort);
        const objectSort = {};
        objectSort[sort[1]] = sort[0];
        console.log("Object sort: ", objectSort);
        const allProductSort = await Product.find()
          .limit(limit)
          .skip(page * limit)
          .sort(objectSort);
        resolve({
          status: "OK",
          message: "Success",
          data: allProductSort,
          totalProduct: totalProducts,
          pageCurrent: Number(page) + 1,
          totalPage: Math.ceil(totalProducts / limit),
        });
      }
      const allProducts = await Product.find()
        .limit(limit)
        .skip(page * limit);
      if (allProducts) {
        resolve({
          status: "OK",
          message: "Success",
          data: allProducts,
          totalProduct: totalProducts,
          pageCurrent: Number(page) + 1,
          totalPage: Math.ceil(totalProducts / limit),
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

const getProductDetail = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findOne({
        _id: id,
      });
      //   console.log("Check user detail: ", user);
      if (product === null) {
        resolve({
          status: "ERR",
          message: "The product is not exist",
        });
      }
      resolve({
        status: "OK",
        message: "Success",
        data: product,
      });
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductDetail,
};
