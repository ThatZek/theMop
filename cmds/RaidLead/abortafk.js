const Discord = require("discord.js");
const config = require("../../config.json");
const vars = require("./raidstatuses.json");
module.exports.run = async (client, msg, args) => {
    if(testAfk === true) {
        msg.react('✅')
        client.channels.get(output).fetchMessage(currentAfk).then(msg => {
            msg.edit({
                embed: {
                    color: 3447003,
                    title: 'TEST AFK ABORTED',
                    description: `This is most likely due to no one reacting with a key!`
                }
            });
        });
        testAfk = false;
}
}
module.exports.help = {
    name: 'abortafk',
    role: config.leadrole,
    usage: '',
    desc: `Gets status of bot`,
    example: ''
}