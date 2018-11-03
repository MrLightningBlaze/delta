require('C:/Archives/Code Libs/LBlazeLib.js')();
var config = require('../config.js');
var fs = require('fs');

module.exports = {
    name: 'setStat',
    description: 'Set your own stat',
    execute(message, args) {
		//*/Make User Data Folder if Needed
		var userID = message.member.user.id;
		var userFolder = config.dataLocation + '/' + userID;
		var statFolder = userFolder + '/stats'
		mkFolderIfNeeded(config.dataLocation);
		mkFolderIfNeeded(userFolder);
		mkFolderIfNeeded(statFolder);
		//*/
		
		//*/Get User Data if it exists
		var dataSet = args[1];
		var i = 2
		while(i<args.length)
		{
			dataSet = dataSet + " " + args[i];
			i++
		}
		var dataFile = statFolder + '/' + args[0];
		if (fs.existsSync(dataFile)){
			fs.writeFileSync(dataFile,dataSet)
			message.reply("Set " + args[0] + " to " + dataSet)
		}
		else
		{
			message.reply('ERROR, Defaults do not yet exist');
		}
		//*/
    },
};