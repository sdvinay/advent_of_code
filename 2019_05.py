TEST_INPUTS=[
	(8, "3,9,8,9,10,9,4,9,99,-1,8"),
	(8, "3,9,7,9,10,9,4,9,99,-1,8"),
	(8, "3,3,1108,-1,8,3,4,3,99"  ),
    (8, "3,3,1107,-1,8,3,4,3,99"  ),
	(0, "3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9"),
    (0,	"3,3,1105,-1,9,1101,0,0,12,4,12,99,1"),
	(7, "3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31, 1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104, 999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99") ]
INPUT_FILE='input/input_2019_05.txt'

# these are the operations of the diagnostic machine
# for each op code, define the number of inputs, number of outputs, and the function to run on the inputs
# For outputs, -1 is a magic code meaning that the instruction pointer jumps to the output param if the returned value is true
operations = {
	1: (2,  1, lambda args: args[1]+args[2]),
	2: (2,  1, lambda args: args[1]*args[2]),
	3: (0,  1, lambda args: args[0]),
	4: (1,  0, lambda args: args[1]),
	5: (2, -1, lambda args: 1 if args[1]<>0 else 0),
	6: (2, -1, lambda args: 1 if args[1]==0 else 0),
	7: (2,  1, lambda args: 1 if args[1]< args[2] else 0),
	8: (2,  1, lambda args: 1 if args[1]==args[2] else 0) }

def run_program(prog_input, program):
	instr_ptr = 0
	output_value = []
	while program[instr_ptr] != 99: # 99 is the opcode for 'halt'
		opcode = program[instr_ptr]
		instr_ptr += 1

		# right-most two digits are the operation; everything to the left defines parameter modes
		op = opcode % 100
		arg_modes = int(opcode/100)
		if op not in operations.keys():
			print (opcode, instr_ptr, program)
		(num_inputs, num_outputs, fn) = operations[op]
		args = [prog_input]

		for i in range (num_inputs):
			src = program[instr_ptr]
			# check the rightmost digit of arg_modes to see if the parameter is a reference or value
			arg = program[src] if (arg_modes %10 == 0) else src
			arg_modes = int(arg_modes/10)
			args.append(arg)
			instr_ptr += 1

		return_val = fn(args) # execute the function on the arguments

		if num_outputs > 0: # output the return value to the reference in the output parameter
			dest = program[instr_ptr]
			instr_ptr += 1
			program[dest] = return_val
		elif num_outputs < 0: # this is a jump-if instruction.  Update instr_ptr if the return val is true
		 	if (return_val):
				instr_ptr=args[2] # TODO what is this magic?
		elif num_outputs == 0: # this is an output instruction.  Print the return value, and don't modify state
			output_value.append(return_val)
	return output_value

def program_from_str(inputstr):
	program = [int(x) for x in (inputstr.split(','))]
	return program

def test():
	for (inp, program_str) in TEST_INPUTS:
		print(inp, program_str)
		print(run_program(inp, program_from_str(program_str)))

test()

original_program = []
with open(INPUT_FILE) as f:
	original_program = program_from_str(f.read()) 
	
program = list(original_program)
print(run_program(5, program))


