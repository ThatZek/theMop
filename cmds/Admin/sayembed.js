const Discord = require("discord.js");
const config = require("../../config.json");

module.exports.run = async (client, msg, args) => {
    
    //const body = msg;
    //msg.channel.send({
        //embed: {
            //description: body
         //}
    //});

module.exports.help = {
    name: 'saye',
    role: config.modrole,
    usage: '`Text`',
    desc: `Says specified thing in a message`,
    example: 'ur mum gay'
}
