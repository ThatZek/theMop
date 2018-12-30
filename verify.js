const Discord = require("discord.js");
const fetch = require('node-fetch');
const config = require("./config.json");
const bot = require("./mopBot.js")
const cverify = require("./currentverifications.json")

module.exports = {
    verify: function verify(user, server, member, client) {
        cverify.list.push(user.id)
        const veriRole = server.roles.get(config.member);
        let string = "MOP" + Math.floor(Math.random(11111) * 99999);
        user.send('Please put the following code ALONE in any of your realmeye description lines!')
            .then(user.send({
                embed: {
                    color: 3447003,
                    title: string,
                }
            })
                .then(user.send('Please reply with your ROTMG username once your description has been updated!')
                )).then(message => {
                    const collector = new Discord.MessageCollector(message.channel, m => m.author.id === user.id);
                    collector.on('collect', msg => {
                        let username = msg.content
                        msg.channel.send("I will now finish the verification process!");
                        fetch('http://www.tiffit.net/RealmInfo/api/user?u=' + username + '&f=c')
                            .then(res => res.json())
                            .then(account => {
                                if (account.rank <= 40) return msg.channel.send('You do not meet the requirements!');
                                if (account.description.contains(string)) {
                                    collector.stop();
                                    member.addRole(veriRole)
                                    member.setNickname(account.name)
                                        .catch(console.error);
                                    msg.channel.send('You are now verified!')
                                    veriLog(user, username, client)
                                    veriConfirm(user.id);
                                } else {
                                    return veriErr(user, username, client);
                                }
                            })
                    });
                }
                )
    }
}

function veriLog(user, username, client) {
    client.channels.get('521901399135617054').send(user + ' was verified successfully! Their Realmeye: https://www.realmeye.com/player/' + username)
}

function veriErr(user, username, client) {
    client.channels.get('521901399135617054').send(user + ' was verified unsuccessfully! Their Realmeye: https://www.realmeye.com/player/' + username)
}
function veriConfirm(element) {
    const index = array.indexOf(element);
    if (index !== -1) {
      cverify.list.splice(index, 1);
    }
}