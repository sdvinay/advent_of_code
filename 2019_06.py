TEST_INPUT_FILE='input/input_2019_06_test.txt'
INPUT_FILE='input/input_2019_06.txt'

orbits = {}
with open(INPUT_FILE) as f:
	lines = f.readlines()

for orbit in lines:
	args = orbit.rstrip().split(')')
	orbits[args[1]]=args[0]
	
def find_orbits(planet):
	if planet == 'COM': return []
	inner = orbits[planet]
	val = [inner] + find_orbits(inner)
	return val


#print(orbits)

total_orbits=0
for planet in orbits.keys():
	orbs = find_orbits(planet)
	print (planet, orbs)
	total_orbits += len(orbs)
print(total_orbits)

path1 = set(find_orbits('YOU'))
path2 = set(find_orbits('SAN'))

uni = path1.union(path2)
inters = path1.intersection(path2)

print (len(uni)-len(inters))

