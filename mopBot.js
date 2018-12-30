//modules
const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require('node-fetch')
const config = require("./config.json")
const v = require('./verify.js')
const fs = require("fs")
const runVars = require('./cmds/RaidLead/raidstatuses.json')
const Git = require('simple-git');

//vars
var prefix = config.prefix;
var output = config.output;
var veriRole = config.member;

//command loader
client.commands = new Discord.Collection();
fs.readdir("./cmds/", (err, folders) => {
	if (err) throw err;

	for (let i = 0; i < folders.length; i++) {
		fs.readdir(`./cmds/${folders[i]}`, (e, files) => {
			let jsfiles = files.filter(f => f.split(".").pop() === 'js');
			if (jsfiles.length < 1) {
				console.log(`No commands in ${folders[i]}`);
				return;
			}

			jsfiles.forEach((file) => {
                let properties = require(`./cmds/${folders[i]}/${file}`);
				console.log(`Loaded ${file}`);
				client.commands.set(properties.help.name, properties);
			})
		})
	}
})

//init
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log('Current prefix is: ' + prefix)
    console.log('Current output chanel is:' + output)
    client.user.setActivity('WITH MOPS', { type: "PLAYING" });
});

//functions
client.on('message', msg => {
    const args = msg.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
	if (msg.channel.id === '520093819228651549') {
    if (msg.content.toLowerCase() === 'verify') {
        if (!msg.member.roles.has(veriRole)) {
			v.verify(msg.author, msg.guild, msg.member, client)
		}
		msg.delete();
	}else {
		msg.delete();
	}
}	
if (!msg.content.startsWith(config.prefix)) return;
    const cmd = client.commands.get(command);
    if (cmd) {
		if (cmd.help.role) {
			if (cmd.help.role === 'owner') {
				if (msg.author.id !== msg.guild.ownerID && msg.author.id !== '340867390541922304') {
					return msg.reply(`Only server owner can use this command.`);
				}
			} else {
                const role = msg.guild.roles.get(cmd.help.role);
                //console.log(role)
                const member = msg.member;
                //console.log(member.highestRole.position)
				if (role) {
					if (role.position > member.highestRole.position) return msg.reply(`You cannot use this command as you do not have the ${role} role`);
				}
			}
		}
        cmd.run(client, msg, args);
        //msg.react('✅');
	}
});

client.login(config.token)