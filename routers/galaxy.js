// Load in Express framework
const express = require(`express`);

// Load in our controller/action instances
const galaxyCtlr = require(`../controllers/galaxy.js`);

// Create a new Router instance and call it "router"
const router = new express.Router();

// RESTful resource mappings
router.get(`/`, galaxyCtlr.index);
router.get(`/new`, galaxyCtlr.newGalaxy);
router.post(`/`, galaxyCtlr.upload.single("image"), galaxyCtlr.create);
router.get(`/:id`, galaxyCtlr.show);
router.get(`/:id/edit`, galaxyCtlr.edit);
router.put(`/:id`, galaxyCtlr.upload.single("image"), galaxyCtlr.update);
router.delete(`/:id`, galaxyCtlr.remove);

// export "router"
module.exports = router;
