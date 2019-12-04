TEST_INPUTS=[111111, 223450, 123789, 112233, 123444, 111122]
INPUT_RANGE=[347312, 805915]

def streaks(input):
	password = str(input)
	streaks = []
	current_streak = 1
	for ptr in range(len(password)-1):
		if password[ptr] == password[ptr+1]:
			current_streak += 1
		else:
			streaks.append(current_streak)
			current_streak = 1
	streaks.append(current_streak)
	return streaks


def non_decreasing(input):
	password = str(input)
	return all([password[i] <= password[i+1] for i in range(len(password)-1)])

def test():
	for input in TEST_INPUTS:
		print(input, non_decreasing(input), streaks(input))

test()

matching_1 = 0
matching_2 = 0
for passwd in range(INPUT_RANGE[0], INPUT_RANGE[1]):
	if non_decreasing(passwd):
		my_streaks = streaks(passwd)
		if any(s>1  for s in my_streaks): matching_1 += 1
		if any(s==2 for s in my_streaks): matching_2 += 1

print (matching_1, matching_2)



