var room = HBInit(window.config);

room.onRoomLink = function(link) {
  	emit("ready", link);
}

room.onPlayerJoin = function(player) {
	emit("onPlayerJoin", player);
}

room.onTeamVictory = function(scores) {
	emit("onTeamVictory", scores);
}

room.onPlayerChat = function(player, message) {
	emit("onPlayerChat", player, message);
}

room.onPlayerBallKick = function(player) {
	emit("onPlayerBallKick", player);
}

room.onTeamGoal = function(team) {
	emit("onTeamGoal", team);
}

room.onGameStart = function(player) {
	emit("onGameStart", player);
}

room.onGameStop = function(player) {
	emit("onGameStop", player);
}

room.onPlayerTeamChange = function(changed, by) {
	emit("onPlayerTeamChange", changed, by);
}

room.onPlayerAdminChange = function(changed, by) {
	emit("onPlayerAdminChange", changed, by);
}

room.onGameTick = function() {
	emit("onGameTick");
}

room.onGamePause = function(player) {
	emit("onGamePause", player);
}

room.onGameUnpause = function(player) {
	emit("onGameUnpause", player);
}

room.onPositionsReset = function() {
	emit("onPositionsReset");
}

room.onPlayerActivity = function(player) {
	emit("onPlayerActivity", player);
}

room.onStadiumChange = function(newStadiumName, by) {
	emit("onStadiumChange", newStadiumName, by);
}

room.onPlayerLeave = function(player) {
	emit("onPlayerLeave", player);
}

room.onKickRateLimitSet = function(min, rate, burst, by) {
	emit("onKickRateLimitSet", min, rate, burst, by);
}