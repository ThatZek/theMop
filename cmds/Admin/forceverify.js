const Discord = require("discord.js");
const config = require("../../config.json");

module.exports.run = async (client, msg, args) => {
    const member = msg.mentions.members.first()
    const memberRole = msg.guild.roles.get(config.member);
        if (member) {
                member.removeRole(memberRole)
                member.setNickname('')
                client.channels.get('521901399135617054').send('<@' + msg.mentions.users.first().id + '> has to reverify', client)
                return msg.react('✅');
        } else {
                return msg.reply(' You need to mention someone!');
        }
}

module.exports.help = {
    name: 'frv',
    role: config.modrole,
    usage: '`User`',
    desc: `Forces mentioned user to reverify`,
    example: '@That "One" Turtle#1123'
}