const Discord = require("discord.js");
const config = require("../../config.json");
const vars = require("./raidstatuses.json");
module.exports.run = async (client, msg, args) => {
    if (vars.currentRaids.raid1.type !== null) {
        vars.currentRaids.raid1.type = null;
    } else if(vars.currentRaids.raid1.type !== null){
        vars.currenttRaids.raid1.type = null;
    }else{
        msg.reply('There is not currently a run going!')
    }
}
module.exports.help = {
    name: 'endrun',
    role: config.raidlead,
    usage: '',
    desc: `Gets status of bot`,
    example: ''
}