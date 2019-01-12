const Discord = require("discord.js");
const config = require("../../config.json");
module.exports.run = async (client, msg, args) => {
    
}
module.exports.help = {
    name: 'suspend',
    role: config.modrole,
    usage: '`user` `time` `reason`',
    desc: `Suspends mentioned user for mentioned time`,
    example: ''
}