const { Star } = require("../models/index.js");

// Show all resources
const index = async (req, res) => {
  try {
    const stars = await Star.findAll();
    res.status(200).json(stars);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Show resource
const show = async (req, res) => {
  try {
    const star = await Star.findByPk(req.params.id);
    res.status(200).json(star);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create a new resource
const create = async (req, res) => {
  try {
    const star = await Star.create(req.body);
    res.status(201).json(star);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an existing resource
const update = async (req, res) => {
  try {
    const star = await Star.findByPk(req.params.id);
    await star.update(req.body);
    res.status(200).json(star);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Remove a single resource
const remove = async (req, res) => {
  try {
    const star = await Star.findByPk(req.params.id);
    await star.destroy();
    res.status(204).json(true);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Export all controller actions
module.exports = { index, show, create, update, remove };
