TEST_INPUTS=["1,0,0,0,99", "2,3,0,3,99", "2,4,4,5,99,0", "1,1,1,4,99,5,6,0,99"]
INPUT_FILE='input/input_2019_02.txt'
TARGET_OUTPUT=19690720
INPUT=1

operations = {
1: [2, 1, lambda a, b : a+b],
2: [2, 1, lambda a,b: a*b],
3: [0, 1, lambda: INPUT],
4: [1, 0, lambda a: a]}

def run_program(program):
	instr_ptr = 0
	while program[instr_ptr] != 99:
		opcode = program[instr_ptr]
		op = opcode % 100
		num_inputs = operations[op][0]
		num_outputs = operations[op][1]
		args = []
		for i in range (num_inputs):
			instr_ptr += 1
			src = program[instr_ptr]
			arg = program[src]
			args.append(arg)
		instr_ptr += 1
		dest = program[instr_ptr]
		instr_ptr += 1
		val = operations[op][2](args[0], args[1])
		program[dest] = val
	return program

def program_from_str(inputstr):
	program = [int(x) for x in (inputstr.split(','))]
	return program

def test():
	for input in TEST_INPUTS:
		print(run_program(program_from_str(input)))

test()

original_program = []
with open(INPUT_FILE) as f:
	original_program = program_from_str(f.read()) 
	
program = list(original_program)
print run_program(program)

for noun in range(99):
	for verb in range(99):
		program = list(original_program)
		program[1] = noun
		program[2] = verb
		output = run_program(program)[0]
		if output == TARGET_OUTPUT:
			print (100*noun+verb)

