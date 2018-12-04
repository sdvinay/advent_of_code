import fileinput

frequency = 0
seen_frequencies = {}
with open('input/input2018_01.txt') as f:
	lines = f.readlines()
duplicate_seen = 0
while not duplicate_seen:
	for line in lines:
		frequency += int(line)
		if frequency in seen_frequencies:
			print "Duplicate frequency observed " + str(frequency)
			duplicate_seen = 1
			break
		seen_frequencies[frequency] = 1;


print frequency

