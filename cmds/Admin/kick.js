const Discord = require("discord.js");
const config = require("../../config.json");
module.exports.run = async (client, msg, args) => {
    const user = msg.mentions.users.first();
        args.shift()
        const reason = args.toString(' ')
        if (user) {
            const member = msg.guild.member(user);
            if (member) {
                member.kick(reason).then(() => {
                    msg.reply(`Successfully kicked ${user.tag}`);
                    client.channels.get(config.Banlog).send({
                        embed: {
                        color: 16312092,
                        title: '**Action:** Kick',
                        description: 'Reason: ' + reason + '\n User: ' + user.tag,
                        author: {
                            name: msg.author.tag,
                            icon_url: msg.author.avatarURL
                        }
                    }
                })
                }).catch(err => {
                    msg.reply('I was unable to kick the member');
                    console.error(err);
                });
            } else {
                msg.reply('That user isn\'t in this server!');
            }
        } else {
            msg.reply('You didn\'t mention the user to kick!');
        }
}
module.exports.help = {
    name: 'kick',
    role: config.modrole,
    usage: '`user`',
    desc: `kicks specified user from the discord`,
    example: '@Dyno#3681'
}