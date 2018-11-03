require('C:/Archives/Code Libs/LBlazeLib.js')();
var config = require('../config.js');
var fs = require('fs');

module.exports = {
    name: 'getStat',
    description: 'Get your own stat',
    execute(message, args) {
		//*/Make User Data Folder if Needed
		var userID = message.member.user.id;
		if (args.length==2)
		{
			userID = message.mentions.members.first().id;
		}
		var userFolder = config.dataLocation + '/' + userID;
		var statFolder = userFolder + '/stats'
		mkFolderIfNeeded(config.dataLocation);
		mkFolderIfNeeded(userFolder);
		mkFolderIfNeeded(statFolder);
		//*/
		
		//*/Get User Data if it exists
		var dataFile = statFolder + '/' + args[0];
		if (fs.existsSync(dataFile)){
			fs.readFile(dataFile, 'utf8', function (err,data) {
			if (err) {
				console.log(err);
			}
				message.reply('Current ' + args[0] + ' of <@!' + userID + '> is ' + data);
			});
		}
		else
		{
			message.reply('ERROR, Defaults do not yet exist');
		}
		//*/
    },
};