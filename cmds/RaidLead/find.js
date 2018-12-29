const Discord = require("discord.js");
const config = require("../../config.json");
module.exports.run = async (client, msg, args) => {
    if (args[0] === null) return msg.reply('You need to specify a user!')
    let member = msg.guild.members.find('displayName', args[0])
    if (member === null) {
        let arg = ',' + args[0]
        member = msg.guild.members.find('displayName', arg)
        if (member === null) {
            arg = "'" + args[0]
            member = msg.guild.members.find('displayName', arg)
            if (member === null) {
                arg = "#" + args[0]
                member = msg.guild.members.find('displayName', arg)
                if (member === null) {
                    arg = "!" + args[0]
                    member = msg.guild.members.find('displayName', arg)
                    if (member === null) return msg.reply('I could not find the user!')
                }
            }
        }
    }
    channel = msg.channel
    client.channels.get(channel).send({
        embed: {
            title: 'User Found!',
            description: '<@' + member.user.id + '>'
        }
    })
}
module.exports.help = {
    name: 'find',
    role: config.leadrole,
    usage: '`username`',
    desc: `Retrieves discord id by their ign`,
    example: 'Zekhersas'
}