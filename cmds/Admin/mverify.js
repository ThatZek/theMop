const Discord = require("discord.js");
const config = require("../../config.json");
module.exports.run = async (client, msg, args) => {
    const user = msg.mentions.users.first();
    const member = msg.mentions.members.first();
    const veriRole = msg.guild.roles.get(config.member);
        args.shift()
        const username = args[0];
        member.setNickname(username);
        member.addRole(veriRole)
        veriLog(user.id);
        try {
            const player = await client.db.create({
                id: user.id,
                realmName: username,
                keyPops: 0,
                leadRuns: 0,
                raidRuns: 0,
            });
            return console.log(`${user.id} was added to the database`)
            }
            catch (e) {
               if (e.name === 'SequelizeUniqueConstraintError') {
                  return console.log('That id already exists.');
               }
               return console.log(e);
               }
 
}
module.exports.help = {
    name: 'mverify',
    role: config.modrole,
    usage: '`user` `Realm Name`',
    desc: `manually verifies mentioned user`,
    example: '@That "One" Turtle#1123 Zekhersas'
}

function veriLog(user, username, client) {
    client.channels.get('532751770234126347').send(user + ' was manually verified successfully! Their Realmeye: https://www.realmeye.com/player/' + username)
}

function veriErr(user, username, client) {
    client.channels.get('532751770234126347').send(user + ' was verified unsuccessfully! Their Realmeye: https://www.realmeye.com/player/' + username)
}
