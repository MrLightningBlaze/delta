require('C:/Archives/Code Libs/LBlazeLib.js')();
var config = require('../config.js');
var fs = require('fs');

module.exports = {
    name: 'getChannelStat',
	aliases: ['getChanStat'],
    description: 'Get your own (or another users) channel stats',
    execute(message, args) {
		//*/Make User Data Folder if Needed
		var userID = message.member.user.id;
		var ChannelID = message.channel.id;
		if (args.length==2)
		{
			userID = message.mentions.members.first().id;
		}
		var channelFolder = config.dataLocation + '/CHNL-' + ChannelID
		var userFolder = channelFolder + '/' + userID;
		var statFolder = userFolder + '/stats'
		mkFolderIfNeeded(config.dataLocation);
		mkFolderIfNeeded(channelFolder);
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
				message.reply('Current channel ' + args[0] + ' of <@!' + userID + '> is ' + data);
			});
		}
		else
		{
			message.reply('ERROR, Defaults do not yet exist');
		}
		//*/
    },
};