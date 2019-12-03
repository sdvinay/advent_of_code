TEST_INPUTS=["1,0,0,0,99", "2,3,0,3,99", "2,4,4,5,99,0", "1,1,1,4,99,5,6,0,99"]
INPUT_FILE='input/input_2019_02.txt'
TARGET_OUTPUT=19690720

def run_program(program):
	instr_ptr = 0
	while program[instr_ptr] != 99:
		opcode = program[instr_ptr]
		src1 = program[instr_ptr+1]
		src2 = program[instr_ptr+2]
		dest = program[instr_ptr+3]
		arg1 = program[src1]
		arg2 = program[src2]
		val = (arg1+arg2, arg1*arg2)[opcode-1]
		program[dest] = val
		instr_ptr += 4
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

