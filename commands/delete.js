exports.use = async (client, message, nothing, args, command) => {
    const discord = require('discord.js');
    const fs = require('fs');
    message.delete();
    const fetched = await message.channel.fetchMessages({limit: 99});
    message.channel.bulkDelete(fetched);
    // clear();

}
