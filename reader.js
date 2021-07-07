const fs = require("fs");
const path = require("path");
const { Command } = require("commander");
const shwijs = require("shwi-js");
const readline = require("readline");
let rl;
// Paths
const dirPath = path.join(__dirname, "../", "content", "shwi", "content");
const physicsPath = path.join(dirPath, "NEET Physics");
const chemistryPath = path.join(dirPath, "NEET Chemistry");
const biologyPath = path.join(dirPath, "NEET Biology");

// Fields
const Field = {
	physics: "NEET Physics",
	chemistry: "NEET Chemistry",
	biology: "NEET Biology",
	other: "Other",
};
let physics = [];
let chemistry = [];
let biology = [];

function LoadContent(save = SaveToFile, debug = false, isPushing = false) {
	physics = [];
	chemistry = [];
	biology = [];
	// Get all chapters
	const physicsChapters = fs.readdirSync(physicsPath);
	const chemistryChapters = fs.readdirSync(chemistryPath);
	const biologyChapters = fs.readdirSync(biologyPath);
	if (debug)
		console.log(`Chapter paths`, {
			physicsChapters,
			chemistryChapters,
			biologyChapters,
		});

	for (const chapter of physicsChapters) {
		const chapterMod = {
			id: physics.length + 1,
			chapter: chapter,
			dpps: [],
			notes: [],
			other: [],
		};
		const chapterNodes = fs.readdirSync(path.join(physicsPath, chapter));
		if (debug) console.log({ subject: "physics", chapterNodes });
		for (const node of chapterNodes) {
			const item = node.toLowerCase();
			if (item.includes("separator")) continue;
			if (item.includes("notes")) {
				// Item is notes
				if (debug) info(`${item} is notes.`);
				chapterMod.notes.push(node);
			} else if (item.includes("dpp")) {
				// Item is dpp
				if (debug) info(`${item} is dpp`);
				chapterMod.dpps.push(node);
			} else {
				if (debug) info(`${item} is other`);
				chapterMod.other.push(node);
			}
		}
		if (debug)
			success(`Chapter nodes finished loading for Physics/${chapter}.`, {
				chapterMod,
			});
		physics.push(chapterMod);
	}
	for (const chapter of chemistryChapters) {
		const chapterMod = {
			id: chemistry.length + 1,
			chapter: chapter,
			dpps: [],
			notes: [],
			other: [],
		};
		const chapterNodes = fs.readdirSync(path.join(chemistryPath, chapter));
		for (const node of chapterNodes) {
			const item = node.toLowerCase();
			if (item.includes("separator")) continue;
			if (item.includes("notes")) {
				// Item is notes
				if (debug) info(`${item} is notes.`);
				chapterMod.notes.push(node);
			} else if (item.includes("dpp")) {
				// Item is dpp
				if (debug) info(`${item} is dpp.`);
				chapterMod.dpps.push(node);
			} else {
				if (debug) info(`${item} is other.`);
				chapterMod.other.push(node);
			}
		}
		if (debug)
			success(`Chapter nodes finished loading for Chemistry/${chapter}.`, {
				chapterMod,
			});
		chemistry.push(chapterMod);
	}
	for (const chapter of biologyChapters) {
		const chapterMod = {
			id: biology.length + 1,
			chapter: chapter,
			dpps: [],
			notes: [],
			other: [],
		};
		const chapterNodes = fs.readdirSync(path.join(biologyPath, chapter));
		for (const node of chapterNodes) {
			const item = node.toLowerCase();
			if (item.includes("separator")) continue;
			if (item.includes("notes")) {
				// Item is notes
				if (debug) info(`${item} is notes.`);
				chapterMod.notes.push(node);
			} else if (item.includes("dpp")) {
				// node is dpp
				if (debug) info(`${item} is dpp.`);
				chapterMod.dpps.push(node);
			} else {
				if (debug) info(`${item} is other.`);
				chapterMod.other.push(node);
			}
		}
		if (debug)
			success(`Chapter nodes finished loading for Biology/${chapter}.`, {
				chapterMod,
			});
		biology.push(chapterMod);
	}
	if (debug) success(`All chapter nodes finished loading, saving to file.`);

	if (debug) info("LOADING SPECIALS");
	LoadSpecials(debug);
	save(debug);
	if (debug) success(`All loads saved! Running commandline...`);
	if (!isPushing) {
		setTimeout(() => {
			question();
		}, 1000);
	}
}

let Specials = [];
function LoadSpecials(debug = false) {
	const specialsPath = path.join(dirPath, "Specials");
	const specials = fs.readdirSync(specialsPath);
	for (const special of specials) {
		if (debug) info(`Loading ${special} from specials.`);
		const specialFile = require(path.join(specialsPath, special));
		Specials.push({
			name: specialFile.name,
			url: specialFile.url,
		});
		if (debug) success(`Loaded ${special} from specials!`);
	}
}

function SaveToFile(debug = false) {
	// Saves data to json
	const dataObject = {
		physics,
		chemistry,
		biology,
		last_update: new Date().toLocaleDateString(),
		specials: Specials,
	};
	if (debug) info("Saving files...");
	const jsonData = JSON.stringify(dataObject, undefined, 2);
	if (debug) success("Data converted to json!");
	fs.writeFile(
		path.join(__dirname, "subData.json"),
		jsonData,
		"utf8",
		(err) => {
			if (err) {
				fail("An error occurred!");
				throw err;
			}
			if (debug) success("Complete!");
		}
	);
}

function success(message = "") {
	return console.log(
		shwijs.Colorize(`[SUCCESS] `, "Bright", "green") + message
	);
}

function fail(message = "") {
	return console.error(
		shwijs.Colorize(`[SUCCESS] `, "Bright", "red") + message
	);
}

function info(message = "") {
	return console.info(shwijs.Colorize("[INFO] ", "Bright", "cyan") + message);
}
// working

module.exports = { LoadContent, SaveToFile };

const program = new Command();
program.version("210620.2");
program
	.option("-r, --run", "Run the loader")
	.option("-d, --debug", "Output extra information")
	.option("-p, --pushing", "Pushing?");

if (process.argv) {
	program.parse(process.argv);
	const opts = program.opts();
	if (opts.run) {
		console.log("Running");
		if (opts.debug) LoadContent(SaveToFile, true, opts.pushing || false);
		else LoadContent(SaveToFile, false);
	}
}

function question() {
	if (rl) rl.close();
	rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	rl.question("> ", (answer) => {
		if (answer == "exit") {
			rl.close();
			process.exit();
		}
		if (answer.includes("r")) {
			if (answer.includes("d")) LoadContent(SaveToFile, true);
			else LoadContent(SaveToFile, false);
			return;
		}
	});
}
