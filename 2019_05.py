TEST_INPUTS=["1,0,0,0,99", "2,3,0,3,99", "2,4,4,5,99,0", "1,1,1,4,99,5,6,0,99"]
INPUT_FILE='input/input_2019_05.txt'
TARGET_OUTPUT=19690720
INPUT=1

operations = {
1: [2, 1, lambda args: args[0]+args[1]],
2: [2, 1, lambda args: args[0]*args[1]],
3: [0, 1, lambda args: INPUT],
4: [1, 0, lambda args: args[0]] }

def run_program(program):
	instr_ptr = 0
	while program[instr_ptr] != 99:
		opcode = program[instr_ptr]
		op = opcode % 100
		arg_modes = int(opcode/100)
		if op == 0:
			print (op, instr_ptr)
		num_inputs = operations[op][0]
		num_outputs = operations[op][1]
		args = []
		for i in range (num_inputs):
			instr_ptr += 1
			src = program[instr_ptr]
			arg = program[src] if (arg_modes %10 == 0) else src
			arg_modes = int(arg_modes/10)
			args.append(arg)
		instr_ptr += 1
		val = operations[op][2](args)
		if num_outputs > 0:
			dest = program[instr_ptr]
			instr_ptr += 1
			program[dest] = val
		else:
			print(val)
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
run_program(program)


