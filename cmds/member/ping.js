const Discord = require("discord.js");
const config = require("../../config.json");
module.exports.run = async (client, msg, args) => {
    msg.channel.send('PENDING').then(pendingMsg => {
        let ping = pendingMsg.createdTimestamp - msg.createdTimestamp;
        return pendingMsg.edit({
            embed: {
                author: {
                    name: msg.author.tag,
                    icon_url: msg.author.avatarURL
                  },
                  timestamp: new Date(Date.now()),
                footer: {
                icon_url: client.users.get('293445227501453313').avatarURL,
                text: 'Created by ' + client.users.get('293445227501453313').tag
                },
                fields: [
                      {
                        name: "Ping Time",
                        value: '```css\n' + ping + 'ms\n```',
                      }
                ]
            }
        })
    })
}
module.exports.help = {
    name: 'ping',
    role: config.member,
    usage: '',
    desc: `Gets status of bot`,
    example: ''
}