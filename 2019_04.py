TEST_INPUTS=[111111, 223450, 123789, 112233, 123444, 111122]
INPUT_START=347312
INPUT_END=805915

def has_repeat(input):
	password = str(input)
	return any([password[i] == password[i+1] for i in range(len(password)-1)])

def non_decreasing(input):
	password = str(input)
	return all([password[i] <= password[i+1] for i in range(len(password)-1)])

def test():
	for input in TEST_INPUTS:
		print(has_repeat(input), non_decreasing(input))

test()

matching = 0
for i in range(INPUT_START, INPUT_END):
	if (has_repeat(i) and non_decreasing(i)): matching += 1

print matching



