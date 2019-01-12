const Discord = require("discord.js");
const config = require("../../config.json");

module.exports.run = async (client, msg, args) => {
    let body;
    for (var i = 0; i < args.length; i++) {
        if (i === 0) {
            body = args[i]
        }else {
            body = body + ` ${args[i]}`
        }
    }
    msg.channel.send({
        embed: {
            title: body
         }
    });
}
module.exports.help = {
    name: 'saye',
    role: config.modrole,
    usage: '`Text`',
    desc: `Says specified thing in a message`,
    example: 'ur mum gay'
}
