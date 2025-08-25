const { Galaxy } = require("../models/index.js");

// Show all resources
const index = async (req, res) => {
  try {
    console.log("Attempting to find all galaxies...");
    const galaxies = await Galaxy.findAll();
    console.log("Successfully found galaxies:", galaxies.length);
    res.status(200).json(galaxies);
  } catch (error) {
    console.error("Error in galaxy index:", error);
    res.status(400).json({ error: error.message });
  }
};

// Show resource
const show = async (req, res) => {
  try {
    const galaxy = await Galaxy.findByPk(req.params.id);
    res.status(200).json(galaxy);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create a new resource
const create = async (req, res) => {
  try {
    const galaxy = await Galaxy.create(req.body);
    res.status(201).json(galaxy);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an existing resource
const update = async (req, res) => {
  try {
    const galaxy = await Galaxy.findByPk(req.params.id);
    await galaxy.update(req.body);
    res.status(200).json(galaxy);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Remove a single resource
const remove = async (req, res) => {
  try {
    const galaxy = await Galaxy.findByPk(req.params.id);
    await galaxy.destroy();
    res.status(204).json(true);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Export all controller actions
module.exports = { index, show, create, update, remove };
