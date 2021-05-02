const config = require('../config.json');
exports.use = async (client, message, nothing, args, command) => {
    const discord = require('discord.js');
    const fs = require('fs');

    let id = message.author.id.toString().substr(0, 1) + message.author.discriminator;
    let chan = `ticket-${id}`;

    if (message.channel.id === '658240727435706389') {
        message.delete()
        if (message.guild.channels.some(channel => chan.includes(channel.name))) {
            if (config.embeds) {
                const dr = new discord.RichEmbed()
                    .setColor("#cc522b")
                    .setDescription(`:x: You already have an open ticket.`)
                return message.channel.send(dr)
            } else {
                message.channel.send(`:x: You already have an open ticket.`)
            }
        };
       message.guild.createChannel(`ticket-${id}`, {
            type: "text"
        }).then(async c => {
           c.setParent(config.ticketsCat);
           let supportRole1 = message.guild.roles.get(config.supportRole1)
           let member = message.author
           c.overwritePermissions(message.guild.defaultRole, {
               VIEW_CHANNEL: false,
               SEND_MESSAGES: false
           })
           c.overwritePermissions(member, {
               VIEW_CHANNEL: true,
               SEND_MESSAGES: true
           })
           c.overwritePermissions(supportRole1, {
               VIEW_CHANNEL: true,
               SEND_MESSAGES: true
           })
       })
    }
};