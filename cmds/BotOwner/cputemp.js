const Discord = require("discord.js");
const config = require("../../config.json");
const sysinfo = require('systeminformation')
module.exports.run = async (client, msg, args) => {
    if (msg.author.id !== '293445227501453313') return;
    sysinfo.cpuTemperature()
    .then(data => {
        msg.channel.send({
            embed: {
                title: 'CPU Temp',
                description: data
            }
        })
    }).catch(error => console.error(error));
    
}
module.exports.help = {
    name: 'cputemp',
    role: config.modrole,
    usage: '',
    desc: `Gets cpu temp from pi`,
    example: ''
}