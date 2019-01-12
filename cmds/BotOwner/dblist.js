const Discord = require("discord.js");
const config = require("../../config.json");
module.exports.run = async (client, msg, args) => {
    let members = []
    let body;
    msg.guild.members.forEach(async member => {
        const user = member.user;
        const person = await client.db.findOne({ where: { id: user.id } });
        if (person) {
            members.push(person.get('realmName'))
        }
        return config.log(`Could not find ID: ${user.id}`);
    })
    for (var i = 0; i < members.length; i++) {
        if (i === 0) {
            body = members[i]
        }else {
            body =body + `\n${members[i]}`
        }
    }
    msg.channel.send({
        embed: {
            title: body
        }
    })
}
module.exports.help = {
    name: 'dblist',
    role: config.modrole,
    usage: '',
    desc: `Lists the entire database`,
    example: ''
}