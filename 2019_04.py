TEST_INPUTS=[111111, 223450, 123789, 112233, 123444, 111122]
INPUT_RANGE=[347312, 805915]

# count repeating digits (e.g., find "streaks")
def get_streak_lengths(input):
	password = str(input)
	lengths = []
	current_streak = 1
	for i in range(len(password)-1):
		if password[i] == password[i+1]:
			current_streak += 1
		else:
			lengths.append(current_streak)
			current_streak = 1
	lengths.append(current_streak)
	return lengths


def is_non_decreasing(input):
	password = str(input)
	return all([password[i] <= password[i+1] for i in range(len(password)-1)])

def test():
	for input in TEST_INPUTS:
		print(input, is_non_decreasing(input), get_streak_lengths(input))

test()

matching_1 = 0
matching_2 = 0
for password in range(INPUT_RANGE[0], INPUT_RANGE[1]):
	if is_non_decreasing(password):
		my_streaks = get_streak_lengths(password)
		if any(s>1  for s in my_streaks): matching_1 += 1
		if any(s==2 for s in my_streaks): matching_2 += 1

print (matching_1, matching_2)



