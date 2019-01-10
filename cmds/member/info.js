const Discord = require("discord.js");
const config = require("../../config.json");
module.exports.run = async (client, msg, args) => {
    const playerID = msg.mentions.members.first().user.id;
    const player = await client.db.findOne({ where: { id: playerID } });
    if (server) {
        return msg.channel.send({
            embed:{
                author: {
                    name: msg.author.tag,
                    icon_url: msg.author.avatarURL
                  },
                  timestamp: new Date(Date.now()),
                footer: {
                icon_url: client.users.get('293445227501453313').avatarURL,
                text: 'Created by ' + client.users.get('293445227501453313').tag
                },
                title: playerID,
                description: 'This is what I found in the database',
                fields: [
                    {
                        name: 'username',
                        value: '```css\n' + player.realmName + '\n```',
                        inline: false
                    },
                    {
                        name: 'Runs Completed',
                        value: '```css\n' + player.raidRuns + '\n```',
                        inline: true
                    },
                    {
                        name: 'Keys Popped',
                        value: '```css\n' + player.leadRuns + '\n```'
                    }
                ]
            }
        });
    }
    return ('That user is not in my database. If you think this is an error, please contact Zekhersas')
}
module.exports.help = {
    name: 'info',
    role: config.member,
    usage: '',
    desc: `Displays stats for a member`,
    example: ''
}