const { Planet } = require("../models/index.js");
const multer = require("multer");
const path = require("path");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/planets/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "planet-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Show all resources
const index = async (req, res) => {
  try {
    const planets = await Planet.findAll();

    if (req.accepts("html")) {
      res.render("planets/index", { planets, title: "Planets" });
    } else {
      res.status(200).json(planets);
    }
  } catch (error) {
    if (req.accepts("html")) {
      res.status(400).render("error", { error: error.message, title: "Error" });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

// Show form for new planet
const newPlanet = async (req, res) => {
  try {
    if (req.accepts("html")) {
      res.render("planets/new", { title: "New Planet" });
    } else {
      res.status(400).json({ error: "HTML only endpoint" });
    }
  } catch (error) {
    if (req.accepts("html")) {
      res.status(400).render("error", { error: error.message, title: "Error" });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

// Show resource
const show = async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.id);

    if (!planet) {
      if (req.accepts("html")) {
        res
          .status(404)
          .render("error", { error: "Planet not found", title: "Error" });
      } else {
        res.status(404).json({ error: "Planet not found" });
      }
      return;
    }

    if (req.accepts("html")) {
      res.render("planets/show", { planet, title: planet.name });
    } else {
      res.status(200).json(planet);
    }
  } catch (error) {
    if (req.accepts("html")) {
      res.status(400).render("error", { error: error.message, title: "Error" });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

// Show form for editing planet
const edit = async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.id);

    if (!planet) {
      if (req.accepts("html")) {
        res
          .status(404)
          .render("error", { error: "Planet not found", title: "Error" });
      } else {
        res.status(404).json({ error: "Planet not found" });
      }
      return;
    }

    if (req.accepts("html")) {
      res.render("planets/edit", { planet, title: `Edit ${planet.name}` });
    } else {
      res.status(400).json({ error: "HTML only endpoint" });
    }
  } catch (error) {
    if (req.accepts("html")) {
      res.status(400).render("error", { error: error.message, title: "Error" });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

// Create a new resource
const create = async (req, res) => {
  try {
    const planetData = { ...req.body };
    if (req.file) {
      planetData.image = `/uploads/planets/${req.file.filename}`;
    }

    const planet = await Planet.create(planetData);

    if (req.accepts("html")) {
      res.redirect(`/planets/${planet.id}`);
    } else {
      res.status(201).json(planet);
    }
  } catch (error) {
    if (req.accepts("html")) {
      res
        .status(400)
        .render("planets/new", { error: error.message, title: "New Planet" });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

// Update an existing resource
const update = async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.id);

    if (!planet) {
      if (req.accepts("html")) {
        res
          .status(404)
          .render("error", { error: "Planet not found", title: "Error" });
      } else {
        res.status(404).json({ error: "Planet not found" });
      }
      return;
    }

    const planetData = { ...req.body };
    if (req.file) {
      planetData.image = `/uploads/planets/${req.file.filename}`;
    }

    await planet.update(planetData);

    if (req.accepts("html")) {
      res.redirect(`/planets/${planet.id}`);
    } else {
      res.status(200).json(planet);
    }
  } catch (error) {
    if (req.accepts("html")) {
      res
        .status(400)
        .render("planets/edit", {
          error: error.message,
          planet: await Planet.findByPk(req.params.id),
          title: "Edit Planet",
        });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

// Remove a single resource
const remove = async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.id);

    if (!planet) {
      if (req.accepts("html")) {
        res
          .status(404)
          .render("error", { error: "Planet not found", title: "Error" });
      } else {
        res.status(404).json({ error: "Planet not found" });
      }
      return;
    }

    await planet.destroy();

    if (req.accepts("html")) {
      res.redirect("/planets");
    } else {
      res.status(204).json(true);
    }
  } catch (error) {
    if (req.accepts("html")) {
      res.status(400).render("error", { error: error.message, title: "Error" });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

// Export all controller actions
module.exports = {
  index,
  show,
  create,
  update,
  remove,
  newPlanet,
  edit,
  upload,
};
