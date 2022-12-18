module.exports = (client) => {
    const cfx = require("@niclqs/cfx-data-fetcher");
    const config = require('./config.json');

    const guild = client.guilds.cache.get(config.guildId)
    const playerCountChannel = guild.channels.cache.get(config.playerCountChannel);
    const serverStateChannel = guild.channels.cache.get(config.serverStateChannel);
    const fivemStateChannel = guild.channels.cache.get(config.fivemStateChannel);

    setInterval(async function(){
        var stateStatus = await cfx.fetchServerData(config.cfxId);
        var cfxStatus = await cfx.fetchCfxStatus();

        if(stateStatus !== undefined){
            serverStateChannel.setName('Gameserver: 🟢');
            fivemStateChannel.setName(cfxStatus.isOnline() ? "Platform: 🟢" : "Platform: 🔴");
            playerCountChannel.setName(`Player: ${stateStatus.getPlayerCount()} / ${stateStatus.getMaxSlots()}`);
        } else {
            serverStateChannel.setName('Gameserver: 🔴');
            fivemStateChannel.setName(cfxStatus.isOnline() ? "Platform: 🟢" : "Platform: 🔴");
        }
    }, 5000);
}