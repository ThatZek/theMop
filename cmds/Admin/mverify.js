const Discord = require("discord.js");
const config = require("../../config.json");
module.exports.run = async (client, msg, args) => {
    const user = msg.mentions.users.first();
    const member = msg.mentions.members.first();
        args.shift()
        const username = args[0];
        member.setNickname(username);
 
}
module.exports.help = {
    name: 'mverify',
    role: config.modrole,
    usage: '`user` `Realm Name`',
    desc: `manually verifies mentioned user`,
    example: '@That "One" Turtle#1123 Zekhersas'
}
