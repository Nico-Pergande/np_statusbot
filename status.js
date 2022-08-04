module.exports = (client) => {
    const cfx = require("cfx-api");
    const config = require('./config.json');

    var playerCount;
    var cfxState;

    const guild = client.guilds.cache.get(config.guildId)
    const playerCountChannel = guild.channels.cache.get(config.playerCountChannel);
    const serverStateChannel = guild.channels.cache.get(config.serverStateChannel);
    const fivemStateChannel = guild.channels.cache.get(config.fivemStateChannel);

    setInterval(async function(){
        var stateStatus = await cfx.fetchServer(config.cfxId);
        var cfxStatus = await cfx.fetchStatus();

        if(stateStatus !== undefined){
            serverStateChannel.setName('Gameserver: 🟢');
            if (stateStatus.playersCount !== playerCount){
                playerCount = stateStatus.playersCount;
                playerCountChannel.setName(`Player: ${stateStatus.playersCount} / ${stateStatus.maxPlayers}`);
            }
            if (cfxState !== cfxStatus){
                cfxState = cfxStatus;
                fivemStateChannel.setName(cfxStatus.everythingOk ? "Platform: 🟢" : "Platform: 🔴");
            }
            
        } else {
            serverStateChannel.setName('Gameserver: 🔴');
            if (cfxState !== cfxStatus){
                cfxState = cfxStatus;
                fivemStateChannel.setName(cfxStatus.everythingOk ? "Platform: 🟢" : "Platform: 🔴");
            }
        }
    }, 60000);
}