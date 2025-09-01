const { Star, Galaxy } = require("../models/index.js");
const multer = require("multer");
const path = require("path");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/stars/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "star-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Show all resources
const index = async (req, res) => {
  try {
    const stars = await Star.findAll({
      include: [{ model: Galaxy, as: "Galaxy" }],
    });

    if (req.accepts("html")) {
      res.render("stars/index", { stars, title: "Stars" });
    } else {
      res.status(200).json(stars);
    }
  } catch (error) {
    if (req.accepts("html")) {
      res.status(400).render("error", { error: error.message, title: "Error" });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

// Show form for new star
const newStar = async (req, res) => {
  try {
    const galaxies = await Galaxy.findAll();
    if (req.accepts("html")) {
      res.render("stars/new", { galaxies, title: "New Star" });
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
    const star = await Star.findByPk(req.params.id, {
      include: [{ model: Galaxy, as: "Galaxy" }],
    });

    if (!star) {
      if (req.accepts("html")) {
        res
          .status(404)
          .render("error", { error: "Star not found", title: "Error" });
      } else {
        res.status(404).json({ error: "Star not found" });
      }
      return;
    }

    if (req.accepts("html")) {
      res.render("stars/show", { star, title: star.name });
    } else {
      res.status(200).json(star);
    }
  } catch (error) {
    if (req.accepts("html")) {
      res.status(400).render("error", { error: error.message, title: "Error" });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

// Show form for editing star
const edit = async (req, res) => {
  try {
    const star = await Star.findByPk(req.params.id);
    const galaxies = await Galaxy.findAll();

    if (!star) {
      if (req.accepts("html")) {
        res
          .status(404)
          .render("error", { error: "Star not found", title: "Error" });
      } else {
        res.status(404).json({ error: "Star not found" });
      }
      return;
    }

    if (req.accepts("html")) {
      res.render("stars/edit", { star, galaxies, title: `Edit ${star.name}` });
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
    const starData = { ...req.body };
    if (req.file) {
      starData.image = `/uploads/stars/${req.file.filename}`;
    }

    const star = await Star.create(starData);

    if (req.accepts("html")) {
      res.redirect(`/stars/${star.id}`);
    } else {
      res.status(201).json(star);
    }
  } catch (error) {
    if (req.accepts("html")) {
      const galaxies = await Galaxy.findAll();
      res
        .status(400)
        .render("stars/new", {
          error: error.message,
          galaxies,
          title: "New Star",
        });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

// Update an existing resource
const update = async (req, res) => {
  try {
    const star = await Star.findByPk(req.params.id);

    if (!star) {
      if (req.accepts("html")) {
        res
          .status(404)
          .render("error", { error: "Star not found", title: "Error" });
      } else {
        res.status(404).json({ error: "Star not found" });
      }
      return;
    }

    const starData = { ...req.body };
    if (req.file) {
      starData.image = `/uploads/stars/${req.file.filename}`;
    }

    await star.update(starData);

    if (req.accepts("html")) {
      res.redirect(`/stars/${star.id}`);
    } else {
      res.status(200).json(star);
    }
  } catch (error) {
    if (req.accepts("html")) {
      const galaxies = await Galaxy.findAll();
      res
        .status(400)
        .render("stars/edit", {
          error: error.message,
          star: await Star.findByPk(req.params.id),
          galaxies,
          title: "Edit Star",
        });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

// Remove a single resource
const remove = async (req, res) => {
  try {
    const star = await Star.findByPk(req.params.id);

    if (!star) {
      if (req.accepts("html")) {
        res
          .status(404)
          .render("error", { error: "Star not found", title: "Error" });
      } else {
        res.status(404).json({ error: "Star not found" });
      }
      return;
    }

    await star.destroy();

    if (req.accepts("html")) {
      res.redirect("/stars");
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
module.exports = { index, show, create, update, remove, newStar, edit, upload };
