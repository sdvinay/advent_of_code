INPUT_FILE='input/input_2019_01.txt'
TEST_INPUTS=[4, 12, 14, 1969, 100756] #inputs provided in problem

# fuel burned to transport mass (Part 1)
def fuel_burned(mass):
	return ((int(mass/3)-2) if mass >= 6 else 0)

# fuel_required accounts iteratively for including the fuel in the mass (Part 2)
def fuel_required(mass):
	total_fuel = 0
	incremental_fuel = fuel_burned(mass)
	while (incremental_fuel>0):
		total_fuel += incremental_fuel
		incremental_fuel = fuel_burned(incremental_fuel)
	return total_fuel

# these are the test inputs provided in the problem
# TODO: Actually check the outputs, rather than just print them
def test():
	for input in TEST_INPUTS:
		print(fuel_burned(input), fuel_required(input))

test()

# The instructions explicitly say to compute fuel requirements on an item-by-item
# basis (including on fuel amounts in Part 2), rather than on total mass :shrug:
total1 = 0
total2 = 0
with open(INPUT_FILE) as f:
	lines = f.readlines()
for line in lines:
	mass = int(line)
	total1 += fuel_burned(mass)
	total2 += fuel_required(mass)
print(total1, total2)

