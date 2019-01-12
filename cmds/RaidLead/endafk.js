const Discord = require("discord.js");
const config = require("../../config.json");
const vars = require("./raidstatuses.json")

module.exports.run = async (client, msg, args) => {
    console.log(vars.keyReacts)
    let vialMsg;
    let keyMsg;
        if (vars.currentAfk.id !== null) {
                let thisAfk = vars.currentAfk.id;
                vars.currentAfk.id = null;
                let raidNum = vars.currentAfk.raidNum;
                let keyArray = vars.keyReacts[raidNum];
                let vialArray = vars.keyReacts[raidNum];
                console.log(raidNum)
                client.channels.get(config.output).fetchMessage(thisAfk).then(m => {
                    m.edit({
                        embed: {
                            color: 3447003,
                            title: `THIS RUN IS UNDERWAY`,
                            description: 'You missed the AFK check!  Make sure to join queue and react next time!'
                        }
                    }).then(m => {
                        vars.currentRaids[raidNum].afkid = m.id
                    })
                })
                for (var i = 0; i < vars.currentRaiders[raidNum].length; i++) {
                    msg.guild.members.get(vars.currentRaiders[raidNum][i]).setVoiceChannel(config[raidNum]);
                }
                if (keyArray.length > 0) {
                    for (var i = 0; i < keyArray.length; i++) {
                        if (i === 0) {
                            keyMsg = '<@' + keyArray[i - 1] + '>'
                        }else {
                        keyMsg = keyMsg + '\n' + '<@' + keyArray[i - 1] + '>'
                        }
                    }
                } else {
                    keyMsg = 'There were no key reacts';
                }

                client.channels.get(config.sysconfig).send({embed:{
                    title: `Key reacts:`,
                    description: keyMsg
                }
            });
        if (vars.currentRaids[raidNum].type === 'void') {
            if (vialArray.length > 0) {
                for (var i = 0; i < vialArray.length; i++) {
                    if (i === 1) {
                        vialMsg = '<@' + vialArray[i - 1] + '>'
                    }else {
                    vialMsg = vialMsg + '\n' + '<@' + vialArray[i - 1] + '>'
                    }
                }
            } else {
                vialMsg = 'There were no vial reacts';
            }

            client.channels.get(config.sysconfig).send({embed:{
                 title: `Vial reacts:`,
                 description: vialMsg
                }
            });
        }
            vars.currentAfk.commandChan = null;
            vars.currentAfk.raidNum = null;
            }else {
                msg.reply('There is no afk check currently up!')
            }
}
module.exports.help = {
    name: 'endafk',
    role: config.leadrole,
    usage: '',
    desc: `Ends the current afk check`,
    example: ''
}