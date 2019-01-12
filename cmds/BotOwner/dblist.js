const Discord = require("discord.js");
const config = require("../../config.json");
module.exports.run = async (client, msg, args) => {
    const users = await client.db.findAll({ attributes: ['id'] });
const tagString = users.map(user => user.id).join(', ') || 'No users set.';
return msg.channel.send(`List of tags: ${tagString}`);
}
module.exports.help = {
    name: 'dblist',
    role: config.modrole,
    usage: '',
    desc: `Lists the entire database`,
    example: ''
}