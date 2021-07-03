const { exec } = require("child_process");

exec(`node reader.js -r -d -p`, (error, stdout, stderr) => {
	if (error) {
		console.log(`error: ${error.message}`);
		return;
	}
	if (stderr) {
		console.log(`stderr: ${stderr}`);
		return;
	}
	console.log(`stdout: ${stdout}`);




	exec(`git add .`, (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
		}
		console.log(`stdout: ${stdout}`);




		exec(
			`git commit -m "${new Date().toLocaleString()}"`,
			(error, stdout, stderr) => {
				if (error) {
					console.log(`error: ${error.message}`);
					return;
				}
				if (stderr) {
					console.log(`stderr: ${stderr}`);
				}
				console.log(`stdout: ${stdout}`);



				
				exec(`git push`, (error, stdout, stderr) => {
					if (error) {
						console.log(`error: ${error.message}`);
						return;
					}
					if (stderr) {
						console.log(`stderr: ${stderr}`);
					}
					console.log(`stdout: ${stdout}`);
				});
			}
		);
	});
});
