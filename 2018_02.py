import fileinput

twos = 0
threes = 0
for line in fileinput.input():
	letters = {}
	for char in list(line):
		if char in letters:
			letters[char] += 1
		else:
			letters[char] = 1
	two = 0
	three = 0
	for char in letters:
	 	if letters[char] == 2:
	 		two = 1
	 	if letters[char] == 3:
	 		three = 1

	twos += two
	threes += three


print twos, threes, twos*threes


