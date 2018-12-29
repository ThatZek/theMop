const Discord = require("discord.js");
const config = require("../../config.json");
const vars = require("./raidstatuses.json");
module.exports.run = async (client, msg, args) => {
    let raidNum;
    const lead = msg.author.id;
    if (args[0] === '1') {
        raidNum = 'raid1';
    } else if(args[0] === '2'){
        raidNum = 'raid2';
    }else return msg.reply('You need to specify a channel!')
    if (vars.currentRaids[raidNum].type !== null) {
        vars.currentRaids[raidNum].type = null;
        vars.keyReacts[raidNum] = [];
        vars.vialReacts[raidNum] = [];
        client.channels.get(config.output).fetchMessage(vars.currentRaids[raidNum].afkid).then(m => {
            m.edit({
                embed: {
                    color: 3447003,
                    title: `THIS RUN HAS BEEN COMPLETED`,
                    description: 'This run is over. Please wait for an rl to start another afk check.'
                }
            })
        })
        vars.currentRaiders[raidNum] = [];
        vars.currentLeads[raidNum] = [];
        vars.currentRaids[raidNum].afkid = null;
        let vc = client.channels.get(config[raidNum])
        let toMention = [];
        vc.members.map(member => toMention.push('<@' + member.user.id + '>'))
        client.channels.get('528696742569574411').send(toMention.toString()).then(m => { 
            m.edit({
                embed: {
                    title: `Leader Vote`,
                    description: '<@' + lead + '> organized the last run. Please vote on how he did. If you have any negative feedback please let us know what it is in #leader-feedback'
                }
            }).then(async msg => {
                await msg.react('⬆')
                await msg.react('⬇')
            })
        })
        vc.members.map(member => member.setVoiceChannel(config.queue))
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