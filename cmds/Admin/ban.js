const Discord = require("discord.js");
const config = require("../../config.json");
module.exports.run = async (client, msg, args) => {
    const user = msg.mentions.users.first();
        args.shift()
        const reason = args.toString(' ')
        if (user) {
            const member = msg.guild.member(user);
            if (member) {
                member.ban(reason).then(() => {
                    msg.reply(`Successfully banned ${user.tag}`);
                    client.channels.get(config.Banlog).send({
                        embed: {
                        color: 16711680,
                        title: '**Action:** Ban',
                        description: 'Reason: ' + reason + '\n User: ' + user.tag,
                        author: {
                            name: msg.author.tag,
                            icon_url: msg.author.icon_url
                        }
                    }
                })
                }).catch(err => {
                    msg.reply('I was unable to ban the member');
                    console.error(err);
                });
            } else {
                msg.reply('That user isn\'t in this server!');
            }
        } else {
            msg.reply('You didn\'t mention the user to ban!');
        }
}
module.exports.help = {
    name: 'ban',
    role: config.modrole,
    usage: '`user`',
    desc: `bans specified user from the discord`,
    example: '@Dyno#3681'
}