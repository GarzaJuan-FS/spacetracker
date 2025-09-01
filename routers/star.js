// Load in Express framework
const express = require(`express`);

// Load in our controller/action instances
const starCtlr = require(`../controllers/star.js`);

// Create a new Router instance and call it "router"
const router = new express.Router();

// RESTful resource mappings
router.get(`/`, starCtlr.index);
router.get(`/new`, starCtlr.newStar);
router.post(`/`, starCtlr.upload.single("image"), starCtlr.create);
router.get(`/:id`, starCtlr.show);
router.get(`/:id/edit`, starCtlr.edit);
router.put(`/:id`, starCtlr.upload.single("image"), starCtlr.update);
router.delete(`/:id`, starCtlr.remove);

// export "router"
module.exports = router;
