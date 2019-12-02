
def run_program(inputstr):
	program = [int(x) for x in (inputstr.split(','))]
	position = 0
	while program[position] != 99:
		opcode = program[position]
		src1 = program[position+1]
		src2 = program[position+2]
		dest = program[position+3]
		arg1 = program[src1]
		arg2 = program[src2]
		val = (arg1+arg2, arg1*arg2)[opcode-1]
		program[dest] = val
		position += 4
	print program

with open('input/input_2019_02.txt') as f:
	run_program(f.read())

run_program("1,0,0,0,99")
run_program("2,3,0,3,99")
run_program("2,4,4,5,99,0")
run_program("1,1,1,4,99,5,6,0,99")
