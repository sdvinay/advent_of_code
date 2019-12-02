import fileinput

def fuel_required(mass):
	if mass < 6: return 0
	return int(mass/3)-2

def total_fuel_required(mass):
	total_fuel = 0
	fuel = fuel_required(mass)
	while (fuel>0):
		total_fuel += fuel
		fuel = fuel_required(fuel)
	return total_fuel

print(fuel_required(4))
print(fuel_required(12))
print(fuel_required(14))
print(fuel_required(1969))
print(fuel_required(100756))

print(total_fuel_required(4))
print(total_fuel_required(12))
print(total_fuel_required(14))
print(total_fuel_required(1969))
print(total_fuel_required(100756))

total1 = 0
total2 = 0
with open('input/input_2019_01.txt') as f:
	lines = f.readlines()
for line in lines:
	total1 += fuel_required(int(line))
	total2 += total_fuel_required(int(line))

print(total1, total2)

