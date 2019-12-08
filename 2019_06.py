TEST_INPUT_FILE='input/input_2019_06_test.txt'
INPUT_FILE='input/input_2019_06.txt'

orbits = {}
with open(INPUT_FILE) as f:
	for line in f.readlines():
		values = line.rstrip().split(')')
		orbits[values[1]]=values[0]
	
def find_orbit_path(planet):
	if planet == 'COM': return []
	inner = orbits[planet]
	val = [inner] + find_orbit_path(inner)
	return val

total_orbits=0
for planet in orbits.keys():
	orbs = find_orbit_path(planet)
	print (planet, orbs)
	total_orbits += len(orbs)
print(total_orbits)

def find_common_delta(item1, item2):
	path1 = set(find_orbit_path(item1))
	path2 = set(find_orbit_path(item2))

	uni = path1.union(path2)
	inters = path1.intersection(path2)
	return (len(uni)-len(inters))

print(find_common_delta('YOU', 'SAN'))

