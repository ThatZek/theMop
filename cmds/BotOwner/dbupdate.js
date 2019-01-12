const Discord = require("discord.js");
const config = require("../../config.json");
module.exports.run = async (client, msg, args) => {
    msg.guild.members.get().then(members => {
        if (msg.author.id !== 293445227501453313) return msg.reply('You are not the bot\'s owner!')
        members.map(member => {
            const user = member.user;
            let tempUsername = member.displayName.toLowerCase();
            let prefix = typeof tempUsername.slice(1);
            if (prefix !== string){
                let username = member.displayName.toLowerCase();
                username.slice(1)
            }else {
                username = member.displayName.toLowerCase();
            }
            try {
                const player = await client.db.create({
                    id: user.id,
                    realmName: username,
                    keyPops: 0,
                    leadRuns: 0,
                    raidRuns: 0,
                    vials: 0,
                });
                return console.log(`${user.id} was added to the database`)
            }
            catch (e) {
                if (e.name === 'SequelizeUniqueConstraintError') {
                    return console.log('That id already exists.');
                }
                return console.log(e);
            }
        })
    })
}
module.exports.help = {
    name: 'dbupdate',
    role: config.modrole,
    usage: '',
    desc: `Updates DB to be relevant`,
    example: ''
}