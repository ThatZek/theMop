const Discord = require("discord.js");
const config = require("../../config.json");
const Git = require('simple-git');

module.exports.run = async (client, msg, args) => {
    if (msg.author.id !== '293445227501453313') return;
    msg.reply('IN PROGRESS!');
}
module.exports.help = {
    name: 'update',
    role: config.modrole,
    usage: '',
    desc: `updates bot to the latest git repo`,
    example: ''
}