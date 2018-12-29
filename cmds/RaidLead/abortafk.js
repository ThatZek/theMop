const Discord = require("discord.js");
const config = require("../../config.json");
const vars = require("./raidstatuses.json");
module.exports.run = async (client, msg, args) => {
    if(vars.currentAfk.id !== null) {
        client.channels.get(output).fetchMessage(currentAfk).then(msg => {
            msg.edit({
                embed: {
                    color: 3447003,
                    title: 'THIS AFK HAS BEEN ABORTED',
                    description: `This is most likely due to no one reacting with a key/vial!`
                }
            });
        });
        vars.currentAfk.id = null;
        vars.currentAfk.type = null;
        vars.currentAfk.commandChan = null;
}else return msg.reply('There is no AFK check currently up!')
}
module.exports.help = {
    name: 'abortafk',
    role: config.leadrole,
    usage: '',
    desc: `Gets status of bot`,
    example: ''
}