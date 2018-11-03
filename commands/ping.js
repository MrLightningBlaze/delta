module.exports = {
    name: 'ping',
    description: 'Basic ping command, responds with `Pong.`',
    execute(message, args) {
        message.channel.send('Pong.');
    },
};