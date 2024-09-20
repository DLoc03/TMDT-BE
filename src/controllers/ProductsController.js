const { response } = require("express");
const ProductService = require("../services/ProductsService");
const JWService = require("../services/JWService");

const createProduct = async (req, res) => {
  try {
    const { name, image, type, price, countInStock, rating, description } =
      req.body;
    if (!name || !image || !type || !price || !countInStock || !rating) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    } else {
      const response = await ProductService.createProduct(req.body);
      return res.status(200).json(response);
    }
  } catch (e) {
    return res.status(500).json({
      status: "ERR",
      message: "Internal server error",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    if (!id) {
      return res.status(404).json({
        status: "ERR",
        message: "The product id is required",
      });
    } else {
      const response = await ProductService.updateProduct(id, data);
      return res.status(200).json(response);
    }
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(200).json({
        status: "ERR",
        message: "The product id is required",
      });
    } else {
      const response = await ProductService.deleteProduct(id);
      return res.status(200).json(response);
    }
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;
    const response = await ProductService.getAllProducts(
      Number(limit) || 5,
      Number(page) || 0,
      sort,
      filter
    );
    res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getProductDetail = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).json({
        status: "ERR",
        message: "The product id is required",
      });
    }
    const response = await ProductService.getProductDetail(id);
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
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductDetail,
};
