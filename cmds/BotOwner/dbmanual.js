const Discord = require("discord.js");
const config = require("../../config.json");
module.exports.run = async (client, msg, args) => {
    if (msg.author.id !== '293445227501453313') return msg.reply('You are not the bot\'s owner!')
    const member = msg.mentions.members.first();
    const user = member.user;
    args.shift();
    let username = args[0];
    try {
        const player = await client.db.create({
            id: user.id,
            realmName: username,
            keyPops: 0,
            leadRuns: 0,
            raidRuns: 0,
            vials: 0,
        });
        return msg.reply(`${user.id} was added to the database`)
    }
    catch (e) {
        if (e.name === 'SequelizeUniqueConstraintError') {
            return console.log('That id already exists.');
        }
        return console.log(e);
    }
    }
module.exports.help = {
    name: 'dbmanual',
    role: config.modrole,
    usage: '',
    desc: `Manually addes mentioned user to database`,
    example: ''
}