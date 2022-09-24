// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require("body-parser");
/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");

app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

//get the info for Temp, Date, and content
app.get("/getWeatherData", (req, res) => {
	console.log(projectData);
	res.send(projectData);
});
app.post("/saveWeatherData", (req, res) => {
	projectData = { ...req.body };
	console.log(projectData);
	res.send(projectData);
});

const port = 4000;
// Setup Server
const Server = app.listen(port, listening);

function listening() {
	console.log("server running");
	console.log(`running on localhost: ${port}`);
}
