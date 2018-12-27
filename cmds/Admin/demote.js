const Discord = require("discord.js");
const config = require("../../config.json");

module.exports.run = async (client, msg, args) => {
    const member = msg.mentions.members.first();
    const trl = msg.guild.roles.get(config.leadrole);
    const rl = msg.guild.roles.get('519587730003460096');
        if (member) {
            if (!member.roles.has(trl.id) && !member.roles.has(rl.id)) {
                msg.reply('That person can\'t be demoted!')
            } else if (member.roles.has(trl.id)) {
                member.removeRole(trl)
                client.channels.get(config.Promotelog).send('Promoted <@' + msg.mentions.users.first().id + '> to scout', client)
                return msg.react('✅');
            }else if (member.roles.has(rl.id)) {
                member.removeRole(rl)
                member.addRole(trl)
                client.channels.get(config.Promotelog).send('Promoted <@' + msg.mentions.users.first().id + '> to scout', client)
                return msg.react('✅');
            }
        } else {
                return msg.reply(' You need to mention someone!');
        }
}

module.exports.help = {
    name: 'demote',
    role: config.modrole,
    usage: '`User`',
    desc: `Demotes mentioned user`,
    example: '@That "One" Turtle#1123'
}