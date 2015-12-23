
var boss =   { hit: 71, damage: 10, armor: 0};
var player = { hit: 50, damage: 0, armor: 0, mana: 500};

function calcDamage(p1, p2) {
	return Math.max(p1.damage - p2.armor, 1);
}

var MagicMissile = { mana: 53, type: 'immediate', damage: 4};
var Drain = { mana: 73, type: 'immediate', damage: 2, heal: 2};

function makePlayerDecision(p1, p2) {
	// TODO
	return Drain;
	return MagicMissile;
}

// returns mana spent if p1 wins
// or negative mana spent if p1 loses
function playFight(p1, p2) {
	var manaSpent = 0;
	while (true) {
		// player turn
		// run effects TODO
		// age/expire effects TODO
		// get decision
		console.log(p1, p2);
		var decision = makePlayerDecision(p1, p2);
		console.log(decision);
		if (decision.mana > p1.mana)
			return -manaSpent;
		manaSpent += decision.mana;
		p1.mana -= decision.mana;
		if (decision.type === 'immediate') {
			// perform damage/heal/etc TODO
			if (decision.damage) { p2.hit -= decision.damage; }
			if (decision.heal) { p1.hit += decision.damage; }
		} else if (decision.type === 'effect') {
			// OR add effect TODO
		}
		// check for death TODO
		if (p1.hit <= 0) return -manaSpent;

		// boss turn
		// run effects TODO
		// age/expire effects TODO
		// attack 
		p1.hit -= calcDamage(p2, p1);

		// check for death
		if (p2.hit <= 0) return manaSpent;
	}
	if (true) {
		console.log(manaSpent);
	}
}

console.log(playFight(player, boss));
