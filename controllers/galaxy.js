const { Galaxy } = require("../models/index.js");
const multer = require("multer");
const path = require("path");

// Configure multer for galaxy image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/galaxies/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Show all resources
const index = async (req, res) => {
  try {
    console.log("Attempting to find all galaxies...");
    const galaxies = await Galaxy.findAll();
    console.log("Successfully found galaxies:", galaxies.length);

    if (req.accepts("html")) {
      res.render("galaxies/index", { galaxies, title: "Galaxies" });
    } else {
      res.status(200).json(galaxies);
    }
  } catch (error) {
    console.error("Error in galaxy index:", error);
    if (req.accepts("html")) {
      res.status(400).render("error", { error: error.message, title: "Error" });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

// Show form for creating new galaxy
const newGalaxy = async (req, res) => {
  if (req.accepts("html")) {
    res.render("galaxies/new", { title: "New Galaxy" });
  } else {
    res.status(405).json({ error: "Method not allowed for JSON requests" });
  }
};

// Show resource
const show = async (req, res) => {
  try {
    const galaxy = await Galaxy.findByPk(req.params.id, {
      include: ["Stars"],
    });

    if (!galaxy) {
      if (req.accepts("html")) {
        return res
          .status(404)
          .render("error", { error: "Galaxy not found", title: "Not Found" });
      } else {
        return res.status(404).json({ error: "Galaxy not found" });
      }
    }

    if (req.accepts("html")) {
      res.render("galaxies/show", { galaxy, title: galaxy.name });
    } else {
      res.status(200).json(galaxy);
    }
  } catch (error) {
    if (req.accepts("html")) {
      res.status(400).render("error", { error: error.message, title: "Error" });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

// Show form for editing galaxy
const edit = async (req, res) => {
  try {
    const galaxy = await Galaxy.findByPk(req.params.id);

    if (!galaxy) {
      return res
        .status(404)
        .render("error", { error: "Galaxy not found", title: "Not Found" });
    }

    if (req.accepts("html")) {
      res.render("galaxies/edit", { galaxy, title: `Edit ${galaxy.name}` });
    } else {
      res.status(405).json({ error: "Method not allowed for JSON requests" });
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
    const galaxyData = { ...req.body };
    if (req.file) {
      galaxyData.image = `/uploads/galaxies/${req.file.filename}`;
    }

    const galaxy = await Galaxy.create(galaxyData);

    if (req.accepts("html")) {
      res.redirect(`/galaxies/${galaxy.id}`);
    } else {
      res.status(201).json(galaxy);
    }
  } catch (error) {
    if (req.accepts("html")) {
      res
        .status(400)
        .render("galaxies/new", { error: error.message, title: "New Galaxy" });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

// Update an existing resource
const update = async (req, res) => {
  try {
    const galaxy = await Galaxy.findByPk(req.params.id);

    if (!galaxy) {
      if (req.accepts("html")) {
        return res
          .status(404)
          .render("error", { error: "Galaxy not found", title: "Not Found" });
      } else {
        return res.status(404).json({ error: "Galaxy not found" });
      }
    }

    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = `/uploads/galaxies/${req.file.filename}`;
    }

    await galaxy.update(updateData);

    if (req.accepts("html")) {
      res.redirect(`/galaxies/${galaxy.id}`);
    } else {
      res.status(200).json(galaxy);
    }
  } catch (error) {
    if (req.accepts("html")) {
      res.status(400).render("error", { error: error.message, title: "Error" });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

// Remove a single resource
const remove = async (req, res) => {
  try {
    const galaxy = await Galaxy.findByPk(req.params.id);

    if (!galaxy) {
      if (req.accepts("html")) {
        return res
          .status(404)
          .render("error", { error: "Galaxy not found", title: "Not Found" });
      } else {
        return res.status(404).json({ error: "Galaxy not found" });
      }
    }

    await galaxy.destroy();

    if (req.accepts("html")) {
      res.redirect("/galaxies");
    } else {
      res.status(204).end();
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
  newGalaxy,
  edit,
  upload,
};
