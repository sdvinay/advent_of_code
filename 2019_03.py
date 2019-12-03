from sets import Set

INPUT_FILE='input/input_2019_03.txt'
UNIT_VECTORS = { 'R': (1, 0), 'L': (-1, 0), 'D': (0, -1), 'U': (0, 1)}

def points_in_path(path):
	position = (0, 0)
	step_count = 0
	points = {}
	for vector in path.split(","):
		direction = UNIT_VECTORS[vector[0]]
		distance = int(vector[1:])
		for i in range(distance):
			position = (position[0]+direction[0], position[1]+direction[1])
			step_count+= 1
			points[position]=step_count
	return points
		
def find_nearest_collision(path1, path2):
	p1 = points_in_path(path1)
	p2 = points_in_path(path2)
	collisions = Set(p1.keys()) & Set(p2.keys())
	dists = [abs(pt[0])+abs(pt[1]) for pt in collisions]
	steps = [p1[pt]+p2[pt] for pt in collisions]
	return min(dists), min(steps)


print find_nearest_collision("R75,D30,R83,U83,L12,D49,R71,U7,L72", "U62,R66,U55,R34,D71,R55,D58,R83")
print find_nearest_collision("R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51", "U98,R91,D20,R16,D67,R40,U7,R15,U6,R7")

with open(INPUT_FILE) as f:
	lines = f.readlines()
print find_nearest_collision(lines[0], lines[1])
