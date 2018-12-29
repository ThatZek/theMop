const Discord = require("discord.js");
const config = require("../../config.json");
const vars = require("./raidstatuses.json");
const endafk = require('./endafk.js')
module.exports.run = async (client, msg, args) => {
    if (args[0] === undefined || args[0] === null) return msg.reply('You need to specify `CULT` or `VOID`!')
    let arg = args[0].toLowerCase();
    if(arg !== 'cult' && arg !== 'void') return msg.reply('You need to specify `CULT` or `VOID`!')
    let testRunLead = msg.author.id;

    //both
    const key = '527306552789696532';
    const knight = '527307396536598550';
    const pally = '527307396977000458';
    const priest = '527307396893376516';
    const warrior = '527307397006491658';
    const plane = '527307560408186880';
    const mseal = '527307649537146910';

    //not both
    const entity = '527306806821912606';
    const malus = '527306731315789836';
    const vial = '527306867760693258';


    //command
    if (arg === 'cult') {
        let keyReacts = [];
        if (vars.currentAfk.id === null) {
            vars.currentAfk.id = "pending";
            vars.currentAfk.commandChan = msg.channel.id;
            if(vars.currentLeads.raid1 === null) {
                vars.currentLeads.raid1 = msg.author.id;
                raidNum = "raid1";
                vars.currentAfk.raidNum = "raid1";
            }else if(vars.currentLeads.raid2 === null) {
                vars.currentLeads.raid2 = msg.author.id;
                raidNum = "raid2";
                vars.currentAfk.raidNum = "raid2";
            }else {
                return msg.reply('Our Raiding servers are already full!')
            }
            vars.currentRaids[raidNum].type = "cult";
            client.channels.get(config.output).send('@here').then(m => {
                m.edit({
                embed: {
                    color: 16711680,
                    title: 'CULT AFK STARTING',
                    description: '<@' + msg.author.id + `> is starting an AFK check!  Join queue then react with ${client.emojis.get(entity)} to join!`
                }
            }).then(async msg => {
                let tempAfk = msg.id;
                vars.currentAfk.id = msg.id;
                const filter = (reaction, user) => reaction.emoji.id === malus && user.id !== '519676168207859722' || reaction.emoji.id === key && user.id !== '519676168207859722'
                const collector = msg.createReactionCollector(filter)
                collector.on('collect', r => {
                    if (vars.currentAfk.id !== tempAfk) return collector.stop();
                    if (r.emoji.id === malus) {
                        let user = r.users.last();
                        vars.currentRaiders[raidNum].push(r.users.last().id)
                    } else if (r.emoji.id === key) {
                        vars.keyReacts[raidNum].push(r.users.last().id)
                    }
                });
                await msg.react(client.emojis.get(malus))
                await msg.react(client.emojis.get(key))
                await msg.react(client.emojis.get(knight))
                await msg.react(client.emojis.get(pally))
                await msg.react(client.emojis.get(warrior))
                await msg.react(client.emojis.get(priest))
                await msg.react(client.emojis.get(mseal))
            })
        })
        } else {
            msg.reply('There is already an afk check up!').catch(console.error)
        }
    }else if (arg === 'void') {
        let keyReacts = [];
        if (vars.currentAfk.id === null) {
            vars.currentAfk.id = "pending";
            vars.currentAfk.commandChan = msg.channel.id;
            if(vars.currentLeads.raid1 === null) {
                vars.currentLeads.raid1 = msg.author.id;
                raidNum = "raid1";
                vars.currentAfk.raidNum = "raid1";
            }else if(vars.currentLeads.raid2 === null) {
                vars.currentLeads.raid2 = msg.author.id;
                raidNum = "raid2";
                vars.currentAfk.raidNum = "raid2";
            }else {
                return msg.reply('Our Raiding servers are already full!')
            }
            vars.currentRaids[raidNum].type = "cult";
            client.channels.get(config.output).send('@here').then(m => {
                m.edit({
                embed: {
                    color: 1769581,
                    title: 'VOID AFK STARTING',
                    description: '<@' + msg.author.id + `> is starting an AFK check!  Join queue then react with ${client.emojis.get(entity)} to join!`
                }
            }).then(async msg => {
                let tempAfk = msg.id;
                vars.currentAfk.id = msg.id;
                const filter = (reaction, user) => reaction.emoji.id === entity && user.id !== '519676168207859722' || reaction.emoji.id === key && user.id !== '519676168207859722' || reaction.emoji.id === vial && user.id !== '519676168207859722'
                const collector = msg.createReactionCollector(filter)
                collector.on('collect', r => {
                    if (vars.currentAfk.id !== tempAfk) return collector.stop();
                    if (r.emoji.id === entity) {
                        let user = r.users.last();
                        vars.currentRaiders[raidNum].push(r.users.last().id)
                    } else if (r.emoji.id === key) {
                        vars.keyReacts[raidNum].push(r.users.last().id)
                    } else if (r.emoji.id === vial) {
                        vars.vialReacts[raidNum].push(r.users.last().id)
                    }
                });
                await msg.react(client.emojis.get(entity))
                await msg.react(client.emojis.get(vial))
                await msg.react(client.emojis.get(key))
                await msg.react(client.emojis.get(knight))
                await msg.react(client.emojis.get(pally))
                await msg.react(client.emojis.get(warrior))
                await msg.react(client.emojis.get(priest))
                await msg.react(client.emojis.get(mseal))
            })
        })
        } else {
            msg.reply('There is already an afk check up!').catch(console.error)
        }
    }
}
module.exports.help = {
    name: 'startafk',
    role: config.leadrole,
    usage: '`Type`',
    desc: `Starts an afk check`,
    example: 'cult'
}