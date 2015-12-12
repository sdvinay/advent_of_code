function hasStraight(passwd) {
	debugger;
	var last = passwd[0];
	var counter = 0;
	for (var i = 1; i < passwd.length; i++)
	{
		if (passwd[i].charCodeAt() - last.charCodeAt() === 1) {
			counter++;
			if (counter === 2)
				return true;
		} else {
			counter = 0;
		}
		last = passwd[i];
	}
	return false;
}

function hasNoUnambiguousChars(passwd) {
	return passwd.search(/[iol]/) === -1;

}

function hasTwoPairs(passwd) {
	return passwd.search(/(.)\1.*(.)\2/) > -1;
}

function checkPassword(passwd) {
	return hasStraight(passwd) && hasNoUnambiguousChars(passwd) && hasTwoPairs(passwd);
}

function increment(passwd) {
	var lastChar = passwd[passwd.length-1];
	if (lastChar !== 'z') {
		return passwd.substr(0, passwd.length-1).concat(String.fromCharCode(lastChar.charCodeAt() + 1));

	} else {
		return increment(passwd.substr(0, passwd.length-1)).concat('a');
	}
}

function findNextGoodPassword(passwd) {
	while (checkPassword(passwd) === false) {
		passwd = increment(passwd);
	}
	return passwd;
}

console.log(increment('yy'));
console.log(increment('yz'));
console.log(increment('yzp'));
console.log(increment('yzz'));

console.log(hasTwoPairs('aa'));
console.log(hasTwoPairs('aabb'));
console.log(hasTwoPairs('aaa'));
console.log(hasTwoPairs('aaaa'));

console.log(hasStraight('ab'));
console.log(hasStraight('abc'));
console.log(hasStraight('aac'));
console.log(hasStraight('abbc'));
console.log(hasStraight('abcd'));


console.log(findNextGoodPassword('aahhz'));
console.log(findNextGoodPassword(increment('aahhz')));
console.log(findNextGoodPassword(increment('hxbxwxba')));
console.log(findNextGoodPassword(increment('ghijklmn')));
