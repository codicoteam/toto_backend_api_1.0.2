const home_bannerModel = require("../models/home_banner_model.js");
// Home Banner Service
exports.create = async (data) => {
  console.log("create home banner service called with:", data);
  return { id: Date.now(), ...data, isActive: true, createdAt: new Date() };
};

exports.getAll = async () => {
  console.log("getAll home banners service called");
  return [
    { id: 1, title: "Welcome to Toto Academy", image: "banner1.jpg", link: "/", isActive: true },
    { id: 2, title: "New Courses Available", image: "banner2.jpg", link: "/courses", isActive: true }
  ];
};

exports.getById = async (id) => {
  console.log("getById home banner service called for:", id);
  return { id, title: "Sample Banner", image: "sample.jpg", link: "/", isActive: true };
};

exports.update = async (id, data) => {
  console.log("update home banner service called for:", id, "with:", data);
  return { id, ...data, updatedAt: new Date() };
};

exports.delete = async (id) => {
  console.log("delete home banner service called for:", id);
  return { deleted: true, id };
};
