const Discord = require("discord.js");
const fetch = require('node-fetch');
const config = require("./config.json");
const bot = require("./mopBot.js")
const cverify = require("./currentverifications.json")

module.exports.verify = async (user, server, member, client) => {
        if (cverify.idlist.includes(user.id)) return (user.send('Please finish the message above!'))
        cverify.idlist.push(user.id)
        cverify.timelist.push(new Date(Date.now()));
        const veriRole = server.roles.get(config.member);
        let string = "CG" + Math.floor(Math.random(11111) * 99999);
        user.send('Please put the following code ALONE in any of your realmeye description lines!')
            .then(user.send({
                embed: {
                    color: 3447003,
                    title: string,
                }
            })
                .then(user.send('Please reply with your ROTMG username once your description has been updated!')
                )).then(async message => {
                    const collector = new Discord.MessageCollector(message.channel, m => m.author.id === user.id);
                    collector.on('collect', msg => {
                        let username = msg.content
                        msg.channel.send("I will now finish the verification process!");
                        fetch('http://www.tiffit.net/RealmInfo/api/user?u=' + username + '&f=c')
                            .then(res => res.json())
                            .then(async account => {
                                if (account.rank < 20) return msg.channel.send('You do not meet the requirements!');
                                const description = account.description
                                if (description.includes(string)) {
                                    collector.stop();
                                    member.addRole(veriRole)
                                    member.setNickname(account.name)
                                        .catch(console.error);
                                    msg.channel.send('You are now verified!')
                                    veriLog(user, username, client)
                                    veriConfirm(user.id);
                                    console.log(client.db)
                                    try {
                                        const player = await client.db.create({
                                            id: user.id,
                                            realmName: username,
                                            keyPops: 0,
                                            leadRuns: 0,
                                            raidRuns: 0,
                                            vials: 0,
                                        });
                                        return console.log(`${user.id} was added to the database`)
                                    }
                                    catch (e) {
                                        if (e.name === 'SequelizeUniqueConstraintError') {
                                            return console.log('That id already exists.');
                                        }
                                        return console.log(e);
                                    }
                                }else {
                                    return veriErr(user, username, client);
                                }
                            })
                    });
                }
                )
    }

function veriLog(user, username, client) {
    client.channels.get('532751770234126347').send(user + ' was verified successfully! Their Realmeye: https://www.realmeye.com/player/' + username)
}

function veriErr(user, username, client) {
    client.channels.get('532751770234126347').send(user + ' was verified unsuccessfully! Their Realmeye: https://www.realmeye.com/player/' + username)
}
function veriConfirm(element, client) {
    const index = cverify.idlist.indexOf(element);
    if (index !== -1) {
      cverify.idlist.splice(index, 1);
      cverify.timelist.splice(index, 1)
    }
}
function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return day + ":" + hour + ":" + min + ":" + sec;

}