const Discord = require("discord.js");
const config = require("../../config.json");
const vars = require("./raidstatuses.json");
module.exports.run = async (client, msg, args) => {
    let raidNum;
    if (args[0] === '1') {
        raidNum = 'raid1';
    } else if(args[0] === '2'){
        raidNum = 'raid2';
    }else return msg.reply('You need to specify a channel!')
    if (vars.currentRaids[raidNum].type !== null) {
        vars.currentRaids[raidNum].type = null;
        vars.currentRaiders = [];
        vars.keyReacts[raidNum] = [];
        vars.vialReacts[raidNum] = [];
        client.channels.get(config[raidNum]).fetchMessage(vars.currentRaids[raidNum].afkid).then(m => {
            m.edit({
                embed: {
                    color: 3447003,
                    title: `THIS RUN HAS BEEN COMPLETED`,
                    description: 'This run is over. Please wait for an rl to start another afk check.'
                }
            })
        })
        vars.currentRaids[raidNum].afkid = null;
        let vc = client.channels.get(config[raidNum])
        vc.members.setVoiceChannel(config.queue)
    }else {
        msg.reply('There is not currently a run going in that channel!')
    }
}
module.exports.help = {
    name: 'endrun',
    role: config.raidlead,
    usage: '`channel #`',
    desc: `End's the specified run`,
    example: '1'
}