const Discord = require("discord.js");
const config = require("../../config.json");
module.exports.run = async (client, msg, args) => {
    if (msg.author.id !== '293445227501453313') return msg.reply('You are not the bot\'s owner!')
    const user = msg.mentions.users.first();
const dbUser = await client.db.findOne({ where: { id: user.id } });
if (dbUser) {
    return message.channel.send(`${dbUser.id}, ${dbUser.realmName}`);
}
return message.reply(`Could not find tag: ${tagName}`);
    }
module.exports.help = {
    name: 'dbupdate',
    role: config.modrole,
    usage: '',
    desc: `Updates DB to be relevant`,
    example: ''
}