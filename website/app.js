/* Global Variables */

// Create a new Date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();
const apiKey = "bbb4cdebe8e94612807b2ee1d421aae2";
// Event listener to add function to existing HTML DOM element
// Function called by event listener

const generateButton = document.querySelector("#generate");
generateButton.addEventListener("click", async () => {
	//try and catch method to see what error needs debugging and where the error is coming from
	try {
		const zipCode = document.querySelector("#zip").value;
		const content = document.querySelector("#feelings").value;
		//check if Zipcode is entered
		if (!zipCode) {
			alert("Zip Code Missing");
			return;
		}
		//check if Feelings are entered
		if (!content) {
			alert("Feelings Missing");
			return;
		}
		// Function to POST data
		const wholeUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`;
		const res = await fetch(wholeUrl);
		const getWeatherInfo = await res.json();
		const temp = getWeatherInfo.main.temp;

		await fetch("/saveWeatherData", {
			method: "POST",
			credentials: "same-origin",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				date: newDate,
				temp,
				content,
			}),
		});
		await updateUI();
		// Function to GET data
	} catch (err) {
		console.log("err", err);
		// appropriately handle the error
	}
});
//update the UI

const updateUI = async () => {
	const request = await fetch("/getWeatherData");
	try {
		// Transform into JSON
		const jsonData = await request.json();
		console.log(jsonData);
		// Write updated data to DOM elements
		document.getElementById("date").innerHTML = `Date: ${jsonData.date}`;
		document.getElementById("temp").innerHTML = `Temperature: ${jsonData.temp}`;
		document.getElementById(
			"content"
		).innerHTML = `Feeling: ${jsonData.content}`;
	} catch (error) {
		console.log("err", error);
		// appropriately handle the error
	}
};
