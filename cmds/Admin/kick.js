const Discord = require("discord.js");
const config = require("../../config.json");
module.exports.run = async (client, msg, args) => {
    msg.reply('Pong!')
}
module.exports.help = {
    name: 'kick',
    role: config.modrole,
    usage: '',
    desc: `Gets status of bot`,
    example: ''
}