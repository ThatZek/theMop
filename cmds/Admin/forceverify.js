const Discord = require("discord.js");
const config = require("../../config.json");

module.exports.run = async (client, msg, args) => {
    const member = msg.mentions.members.first()
    const memberRole = msg.guild.roles.get(config.member);
        if (member) {
                member.removeRole(memberRole)
                member.setNickname('')
                client.channels.get(config.Verifylog).send('Promoted <@' + msg.mentions.users.first().id + '> to reverify', client)
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