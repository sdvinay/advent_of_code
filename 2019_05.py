TEST_INPUTS=["1,0,0,0,99", "2,3,0,3,99", "2,4,4,5,99,0", "1,1,1,4,99,5,6,0,99", "3,9,8,9,10,9,4,9,99,-1,8", "3,9,7,9,10,9,4,9,99,-1,8", "3,3,1108,-1,8,3,4,3,99", "3,3,1107,-1,8,3,4,3,99", "3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9", "3,3,1105,-1,9,1101,0,0,12,4,12,99,1", "3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31, 1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104, 999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99"]
INPUT_FILE='input/input_2019_05.txt'
TARGET_OUTPUT=19690720
INPUT=9 #TODO pass different inputs to different executions

# these are the operations of the diagnostic machine
# for each op code, define the number of inputs, number of outputs, and the function to run on the inputs
# For outputs, -1 is a magic code meaning that the instruction pointer jumps to the output param if the returned value is true
operations = {
1: (2, 1, lambda args: args[0]+args[1]),
2: (2, 1, lambda args: args[0]*args[1]),
3: (0, 1, lambda args: INPUT),
4: (1, 0, lambda args: args[0]),
5: (2, -1, lambda args: 1 if args[0]<>0 else 0),
6: (2, -1, lambda args: 1 if args[0]==0 else 0),
7: (2, 1, lambda args: 1 if args[0]<args[1] else 0),
8: (2, 1, lambda args: 1 if args[0]==args[1] else 0) }

def run_program(program):
	instr_ptr = 0
	while program[instr_ptr] != 99: # 99 is the opcode for 'halt'
		opcode = program[instr_ptr]
		instr_ptr += 1

		# right-most two digits are the operation; everything to the left defines parameter modes
		op = opcode % 100
		arg_modes = int(opcode/100)
		if op not in operations.keys():
			print (opcode, instr_ptr, program)
		(num_inputs, num_outputs, fn) = operations[op]
		args = []

		for i in range (num_inputs):
			src = program[instr_ptr]
			# check the rightmost digit of arg_modes to see if the parameter is a reference or value
			arg = program[src] if (arg_modes %10 == 0) else src
			arg_modes = int(arg_modes/10)
			args.append(arg)
			instr_ptr += 1

		# execute the function on the arguments
		return_val = fn(args)
		if num_outputs > 0: # output the return value to the reference in the output parameter
			dest = program[instr_ptr]
			instr_ptr += 1
			program[dest] = return_val
		elif num_outputs < 0: # this is a jump-if instruction.  Update instr_ptr if the return val is true
		 	if (return_val):
				instr_ptr=args[1]
		elif num_outputs == 0: # this is an output instruction.  Print the return value, and don't modify state
			print(return_val)
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


