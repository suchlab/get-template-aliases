#!/usr/bin/env node
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

const ALIASES = path.resolve(__dirname, '../aliases.json');
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

		let { alias, origin, command} = aliasConfiguration;
		
		alias = alias.trim();
		origin = origin.trim();
		command = command && command.trim();

		if (!alias || !origin) return error('Alias and Origin are mandatory');

		const file = fs.readFileSync(ALIASES, 'utf8');

		const aliases = JSON.parse(file);

		const exists = !!aliases.find(a => a.alias === alias);
		if (exists) return error('Alias already exists');

		const newAliasObject = {
			alias,
			origin,
			command,
		};

		const confirmation = await inquirer.prompt([
			{
				name: 'accept',
				message: JSON.stringify(newAliasObject, null, 2),
				type: 'confirm',
			}
		]);

		if (!confirmation.accept) end();

		aliases.push(newAliasObject);

		fs.unlinkSync(ALIASES);

		fs.writeFileSync(ALIASES, JSON.stringify(aliases));

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
