//*/Main Setup
const fs = require('fs');
const Discord = require('discord.js');
const Sequelize = require('sequelize');
require('C:/Archives/Code Libs/LBlazeLib.js')();
var config = require('./config.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();
var commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
//*/

//*/ TODO PLEASE MOVE

const responseObject = {
  "Delta, Help": "Please gain voice command list by saying \"Delta, Command List\" and say a command with \"Delta,\" Followed by the command to use, or `d!help` for my terminal commands",
  "Delta, Command List": "Command List: \"Who made you?\",\"Who are you?\"",
  "Delta, Who made you?": "I was created by <@!95645688938893312>",
  "Delta, Who are you?": "I am an Extremely Basic AI System"
};

//*/

/*/Setup for SQLite Storage
const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    operatorsAliases: false,
    storage: 'database.sqlite',
});
const Tags = sequelize.define('tags', {
    UserID: {
        type: Sequelize.STRING,
        unique: true,
    },
    Comments: Sequelize.TEXT,
});
//*/

//*/On client ready up
client.on('ready', () => {
	console.log('\033c')
	console.log('Loading Delta Systems...');
	console.log('    Loading Commands...');
	for (const file of commandFiles) {
		var command = require(`./commands/${file}`);
		client.commands.set(command.name, command);
		console.log('        Loading ' + file);
	}
	console.log('    All Commands Loaded!');
	console.log('');
	console.log('Delta Systems Ready');
});
//*/


/*/Dynamic User Data Systems

//*/


//*/On Client Get Message
client.on('message', message => {
	if(responseObject[message.content]) {
		message.channel.send(responseObject[message.content]);
	}
	else if (message.content.startsWith(config.prefix + "reload"))
	{
		commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
		for (const file of commandFiles) {
			command = require(`./commands/${file}`);
			client.commands.set(command.name, command);
		}
		console.log('');
		console.log("New Commands Loaded");
	}
	else if (message.content.startsWith(config.prefix))
	{
		const args = message.content.slice(config.prefix.length).split(/ +/);
		const commandName = args.shift();

		const command = client.commands.get(commandName)
			|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
		
		if (!command) return;

		if (command.guildOnly && message.channel.type !== 'text') {
			return message.reply('I can\'t execute that command inside DMs!');
		}

		if (command.args && !args.length) {
			let reply = `You didn't provide any arguments, ${message.author}!`;

			if (command.usage) {
				reply += `\nThe proper usage would be: \`${config.prefix}${command.name} ${command.usage}\``;
			}

			return message.channel.send(reply);
		}

		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Discord.Collection());
		}

		const now = Date.now();
		const timestamps = cooldowns.get(command.name);
		const cooldownAmount = (command.cooldown || 3) * 1000;

		if (!timestamps.has(message.author.id)) {
			timestamps.set(message.author.id, now);
			setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
		}
		else {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
			}

			timestamps.set(message.author.id, now);
			setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
		}

		try {
			command.execute(message, args);
		}
		catch (error) {
			console.error(error);
			message.reply('there was an error trying to execute that command!');
		}
	}
	var x = 0;
	while(x < config.toDelete.length)
	{
		if(message.content.startsWith(config.toDelete[x]))
		{
			sleep(10)
			message.delete()
		}
	x++;
	}
});
//*/

//*/Actually Run Bot
client.login(config.token);
//*/