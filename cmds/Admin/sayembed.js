const Discord = require("discord.js");
const config = require("../../config.json");

module.exports.run = async (client, msg, args) => {

}

module.exports.help = {
    name: 'saye',
    role: config.modrole,
    usage: '`Text`',
    desc: `Says specified thing in a message`,
    example: 'ur mum gay'
}