const { Planet } = require("../models/index.js");

// Show all resources
const index = async (req, res) => {
  const planets = await Planet.findAll();
  res.status(200).json(planets);
};

// Show resource
const show = async (req, res) => {
  // Respond with a single object and 2xx code
  // res.status(200).json(`Planet#show(:id)`);
  const planet = await Planet.findByPk(req.params.id);
  res.status(200).json(planet);
};

// Create a new resource
const create = async (req, res) => {
  try {
    const planet = await Planet.create(req.body);
    res.status(201).json(planet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an existing resource
const update = async (req, res) => {
  const planet = await Planet.findByPk(req.params.id);
  await planet.update(req.body);
  res.status(200).json(planet);
};

// Remove a single resource
const remove = async (req, res) => {
  const planet = await Planet.findByPk(req.params.id);
  await planet.destroy();
  res.status(204).json(true);
};

// Export all controller actions
module.exports = { index, show, create, update, remove };
