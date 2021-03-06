const utils = require("../utils");
const colors = require("colors");
const express = require("express");
// const subjectData = require("../subData.json");
const subjectData = require("../subData.json");
global.Files = {
	physics: subjectData.physics,
	chemistry: subjectData.chemistry,
	biology: subjectData.biology,
};

// Paths
// const physicsPath = path.join(__dirname, `../${dirPath}`, "NEET Physics");
// const chemistryPath = path.join(__dirname, `../${dirPath}`, "NEET Chemistry");
// const biologyPath = path.join(__dirname, `../${dirPath}`, "NEET Biology");

// Fields
const Field = {
	physics: "NEET Physics",
	chemistry: "NEET Chemistry",
	biology: "NEET Biology",
	other: "Other",
};
// let physics = [];
// let chemistry = [];
// let biology = [];

// function LoadContent() {
// 	physics = [];
// 	chemistry = [];
// 	biology = [];
// 	// Get all chapters
// 	const physicsChapters = fs.readdirSync(physicsPath);
// 	const chemistryChapters = fs.readdirSync(chemistryPath);
// 	const biologyChapters = fs.readdirSync(biologyPath);

// 	for (const chapter of physicsChapters) {
// 		const chapterMod = {
// 			id: physics.length + 1,
// 			chapter: chapter,
// 			dpps: [],
// 			notes: [],
// 			other: [],
// 		};
// 		const chapterNodes = fs.readdirSync(path.join(physicsPath, chapter));
// 		for (const node of chapterNodes) {
// 			const item = node.toLowerCase();
// 			if (item.includes("separator")) continue;
// 			if (item.includes("notes")) {
// 				// Item is notes
// 				chapterMod.notes.push(node);
// 			} else if (item.includes("dpp")) {
// 				// Item is dpp
// 				chapterMod.dpps.push(node);
// 			} else {
// 				chapterMod.other.push(node);
// 			}
// 		}
// 		physics.push(chapterMod);
// 	}
// 	for (const chapter of chemistryChapters) {
// 		const chapterMod = {
// 			id: chemistry.length + 1,
// 			chapter: chapter,
// 			dpps: [],
// 			notes: [],
// 			other: [],
// 		};
// 		const chapterNodes = fs.readdirSync(path.join(chemistryPath, chapter));
// 		for (const node of chapterNodes) {
// 			const item = node.toLowerCase();
// 			if (item.includes("separator")) continue;
// 			if (item.includes("notes")) {
// 				// Item is notes
// 				chapterMod.notes.push(node);
// 			} else if (item.includes("dpp")) {
// 				// Item is dpp
// 				chapterMod.dpps.push(node);
// 			} else {
// 				chapterMod.other.push(node);
// 			}
// 		}
// 		chemistry.push(chapterMod);
// 	}
// 	for (const chapter of biologyChapters) {
// 		const chapterMod = {
// 			id: biology.length + 1,
// 			chapter: chapter,
// 			dpps: [],
// 			notes: [],
// 			other: [],
// 		};
// 		const chapterNodes = fs.readdirSync(path.join(biologyPath, chapter));
// 		for (const node of chapterNodes) {
// 			const item = node.toLowerCase();
// 			if (item.includes("separator")) continue;
// 			if (item.includes("notes")) {
// 				// Item is notes
// 				chapterMod.notes.push(node);
// 			} else if (item.includes("dpp")) {
// 				// node is dpp
// 				chapterMod.dpps.push(node);
// 			} else {
// 				chapterMod.other.push(node);
// 			}
// 		}
// 		biology.push(chapterMod);
// 	}
// }
// LoadContent();
const homeRouter = express.Router();

homeRouter.get("/", (req, res) => {
	res.redirect("/dashboard");
});

homeRouter.get("/dashboard", (req, res) => {
	// Main dashboard
	res.render("pages/dashboard", {
		physics: subjectData.physics,
		chemistry: subjectData.chemistry,
		biology: subjectData.biology,
		all: {
			physics: subjectData.physics,
			chemistry: subjectData.chemistry,
			biology: subjectData.chemistry,
		},
		subjects: ["Physics", "Chemistry", "Biology"],
		types: ["DPPs", "Notes", "Other"],
	});
});

homeRouter.get("/dashboard/:subject/:chapter/:file", (req, res) => {
	const subject = Field[req.params.subject];
	const chapter = req.params.chapter;
	const file = req.params.file;
	// const filePath = path.join(
	// 	__dirname,
	// 	`../${dirPath}`,
	// 	subject,
	// 	chapter,
	// 	file
	// );
	const filePath = `https://github.com/Shwibi/shwi/tree/content/content/${subject}/${chapter}/${file}`;
	res.redirect(filePath);
});
module.exports = homeRouter;
