const express = require("express");
const apiRouter = express.Router();
require("dotenv").config();
const stc = {
	invalid_req: 409,
};
const DOCS = {
	entry: "/api/*",
	get_files: {
		root: "/api/files",
	},
};

// Home of api (docs)
apiRouter.get("/", (req, res) => {
	// Send documentation*
	res.send(DOCS);
});
const { physics, chemistry, biology } = global.Files;
const fileCheck = /(DPP|NOTES|OTHER)\d+/;
apiRouter.get("/files/:subject/:chapter/:fileId", (req, res) => {
	const { subject, chapter, fileId } = req.params;
	switch (subject) {
		case "physics": {
			if (isNaN(chapter)) {
				res.status(stc.invalid_req).send({
					message: "Invalid chapter id; Must be a number!",
					request: chapter,
				});
				return;
			}
			const chapFetch = physics[chapter - 1];
			if (!chapFetch) {
				// Invalid req
				res.status(stc.invalid_req).send({
					message: "Invalid chapter id; Chapter does not exist!",
					id: chapter,
				});
				return;
			}
			// Got the chapter, now fetch file from chapter
			if (!fileId.toUpperCase().match(fileCheck)) {
				res.status(stc.invalid_req).send({
					message: "Invalid file request; Must match " + fileCheck.source,
					fileId,
				});
				return;
			}
			if (fileId.toUpperCase().includes("DPP")) {
				let toFindNum = fileId.toUpperCase().slice(3);
				toFindNum = Number.parseInt(toFindNum);
				for (let i = 0; i < chapFetch.dpps.length; i++) {
					if (i == toFindNum - 1) {
						res.redirect(
							`/dashboard/${subject}/${chapFetch.chapter}/${chapFetch.dpps[i]}`
						);
					}
				}
			}
		}
	}
});

module.exports = apiRouter;
