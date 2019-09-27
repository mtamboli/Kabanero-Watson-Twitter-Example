const express = require("express");
const path = require("path");
const app = express();
const Analyze = require("./src/Analyze");

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")))

app.set("views", path.join(__dirname, "public"));
app.set("view engine", "ejs");

const SEARCH_TERM = "@Delta";

app.get("/", (req, res) => {
	Analyze.getSentimentFromTwitter(SEARCH_TERM, true, 20)
	.then(results => {
		let worst = Analyze.getWorst(results);
		res.render("index", {results, worst});
	})
	.catch(error => {
		console.error(error);
		res.status(500).json({msg: error})
	});
});

module.exports.app = app;
