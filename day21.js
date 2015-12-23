
var boss =   { hit: 104, damage: 8, armor: 1};
var player = { hit: 100, damage: 8, armor: 1};

function calcDamage(p1, p2) {
	return Math.max(p1.damage - p2.armor, 1);
}

// returns true if p1 wins
function playFight(p1, p2) {
	var damage1 = calcDamage(p1, p2);
	var damage2 = calcDamage(p2, p1);
	var turnsToKill1 = Math.ceil(p1.hit / damage2);
	var turnsToKill2 = Math.ceil(p2.hit / damage1);
	debugger;

	return (turnsToKill2 <= turnsToKill1);
}

weapons = [ [8, 4], [10, 5], [25, 6], [40, 7], [74, 8] ];
armors  = [ [0, 0], [13, 1], [31, 2], [53, 3], [75, 4], [102, 5] ];
function enumeratePlayers() {
	var players = [];
	var player = {hit:100, armor:0, cost:0, damage:0};
	for (var i = 0; i < weapons.length; i++) {
		player.cost += weapons[i][0];
		player.damage = weapons[i][1];
		for (var j = 0; j < armors.length; j++) {
			player.cost += armors[j][0];
			player.armor = armors[j][1];
			players.push(JSON.parse(JSON.stringify(player)));
			var player = {hit:100, armor:0, cost:0, damage:0};
		}
	}
	return players;
}

var players = enumeratePlayers();
var lowCost = 10000;
for (var i = 0; i < players.length; i++) {
	var winner = playFight(players[i], boss);
	if (winner) {
		debugger;
		if (players[i].cost < lowCost) lowCost = players[i].cost;
		console.log(players[i]);
	}
}
console.log(lowCost);

