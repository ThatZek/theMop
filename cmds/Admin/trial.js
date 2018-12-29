const Discord = require("discord.js");
const config = require("../../config.json");

module.exports.run = async (client, msg, args) => {
    const member = msg.mentions.members.first()
    const trl = msg.guild.roles.get(config.leadrole);
    const rl = msg.guild.roles.get('519587730003460096');
        if (member) {
            if (member.roles.has(trl.id)) {
                msg.reply('That person can\'t be trialed!')
            } else {
                member.addRole(trl)
                let name = member.displayName;
                member.setNickname(','+ name)
                client.channels.get(config.Promotelog).send('Promoted <@' + msg.mentions.users.first().id + '> to Trial Raid Leader', client)
                return msg.react('✅');
            }
        } else {
                return msg.reply(' You need to mention someone!');
        }
}

module.exports.help = {
    name: 'trial',
    role: config.modrole,
    usage: '`User`',
    desc: `Trials mentioned user`,
    example: '@That "One" Turtle#1123'
}