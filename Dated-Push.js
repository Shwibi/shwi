const { exec } = require("child_process");

exec("git add .", (error, stdout, stderr) => {
	console.log(`ADDING`);
	if (error) {
		console.log(`[ERROR]`, error);
		return;
	}

	if (stderr) {
		console.log(`[STDERR]`, stderr);
	}

	console.log(`[STDOUT]`, stdout);

	exec(`git commit -m "${new Date().toLocaleString()}`, (error, stdout, stderr) => {
		console.log(`COMMITING`);
		if (error) {
			console.log(`[ERROR]`, error);
			return;
		}

		if (stderr) {
			console.log(`[STDERR]`, stderr);
		}

		console.log(`[STDOUT]`, stdout);

		exec("git push", (error, stdout, stderr) => {
			console.log(`PUSHING`);
			if (error) {
				console.log(`[ERROR]`, error);
				return;
			}

			if (stderr) {
				console.log(`[STDERR]`, stderr);
			}

			console.log(`[STDOUT]`, stdout);

		})

	})

})