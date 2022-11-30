#!/usr/bin/env node
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

const ALIASES = path.resolve(__dirname, '../aliases.txt');
const BASE = path.resolve(__dirname, '../');

function error(message) {
	console.error(message);
	process.exit(1);
};

function end() {
	process.exit();
};

function mandatory(input) {
	if (!input) {
		console.log('Mandatory field');
		return false;
	}

	return true;
};

async function aliases() {
	const args = process.argv.slice(2);
	const mainCommand = args[0];

	if (['add', 'new', 'create'].includes(mainCommand)) {
		const aliasConfiguration = await inquirer.prompt([
			{
				name: 'alias',
				message: 'Alias (e.g. react-app)',
				validate: mandatory,
			},
			{
				name: 'origin',
				message: 'Origin (e.g. git@github.com:user/repo.git)',
				validate: mandatory,
			},
			{
				name: 'command',
				message: 'Post-installation command (optional)',
			}
		]);

		const { alias, origin, command} = aliasConfiguration;

		if (!alias || !origin) return error('Alias and Origin are mandatory');

		const file = fs.readFileSync(ALIASES, 'utf8');
		
		const lines = file.split("\n");

		for (let line of lines) {
			line = line.trim();

			if (!line) continue;

			const [lineAlias] = line.split('=');

			if (lineAlias === alias.trim()) return error('Alias already exists');
		}

		const newLine = `${alias.trim()}=${origin.trim()}=${command && command.trim()}`;
		const newFile = file.trim() + "\n" + newLine + "\n";

		const newAliasObject = {
			alias: alias.trim(),
			origin: origin.trim(),
			command: command && command.trim(),
			line: newLine,
		};

		const confirmation = await inquirer.prompt([
			{
				name: 'accept',
				message: JSON.stringify(newAliasObject, null, 2),
				type: 'confirm',
			}
		]);

		if (!confirmation.accept) end();

		fs.unlinkSync(ALIASES);

		fs.writeFileSync(ALIASES, newFile);

		console.log('Alias added to list');

		try {
			await exec(`cd ${BASE}; git commit -am "Add ${alias.trim()}"; git push;`);
		} catch (e) {
			return error('Could not upload to GitHub');
		}

		console.log('Alias uploaded to GitHub');

		end();
	}

	return error('Command not found');
};

module.exports = aliases();
