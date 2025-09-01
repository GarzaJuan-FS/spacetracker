// Load in our Express framework
const express = require(`express`);
const path = require("path");
const methodOverride = require("method-override");

// Create a new Express instance called "app"
const app = express();

// Set view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Method override for PUT/DELETE from HTML forms
app.use(methodOverride("_method"));

// Test database connection
const { sequelize } = require("./models/index.js");

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testConnection();

// Load in our RESTful routers
const routers = require("./routers/index.js");

// Home page welcome middleware
app.get("/", (req, res) => {
  if (req.accepts("html")) {
    res.render("index", { title: "Star Tracker Library" });
  } else {
    res.status(200).json({ message: "Welcome to Star Tracker Library" });
  }
});

// Register our RESTful routers with our "app"
app.use(`/planets`, routers.planet);
app.use(`/stars`, routers.star);
app.use(`/galaxies`, routers.galaxy);

// Set our app to listen on port 3000
app.listen(3000);
