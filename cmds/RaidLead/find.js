const Discord = require("discord.js");
const config = require("../../config.json");
module.exports.run = async (client, msg, args) => {
    
    client.msg.members.map(member => {
        
    })
}
module.exports.help = {
    name: 'find',
    role: config.leadrole,
    usage: '`username`',
    desc: `Retrieves discord id by their ign`,
    example: 'Zekhersas'
}