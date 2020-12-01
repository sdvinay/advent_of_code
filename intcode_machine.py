from dataclasses import dataclass

# these are the operations of the diagnostic machine
# for each op code, define the number of inputs, number of outputs, and the function to run on the inputs
# For outputs, -1 is a magic code meaning that the instruction pointer jumps to the output param if the returned value is true
operations = {
	1: (2,  1, lambda args: args[1]+args[2]), # sum
	2: (2,  1, lambda args: args[1]*args[2]), # multiply
	3: (0,  1, lambda args: args[0].pop(0)),  # input
	4: (1,  0, lambda args: args[1]),         # output
	5: (2, -1, lambda args: 1 if args[1]!=0 else 0),  # jump-if-true
	6: (2, -1, lambda args: 1 if args[1]==0 else 0),  # jump-if-false
	7: (2,  1, lambda args: 1 if args[1]< args[2] else 0),   # less-than
	8: (2,  1, lambda args: 1 if args[1]==args[2] else 0) }  # equals

# define what 'machine state' is
# then create_machine() can create that state
# run_program can take that state as an input
# the client can manage the state ownership

@dataclass
class Machine:
    program : list
    instr_ptr: int


def create_machine(program):
		return Machine(program, 0)


# prog_input is a list of inputs to be used by instruction 3 (input).
# returns a list of values outputted by instruction 4 (output)
def run_program(prog_input, program):
	machine = create_machine(program)
	output_value = None
	while machine.program[machine.instr_ptr] != 99: # 99 is the opcode for 'halt'
		opcode = machine.program[machine.instr_ptr]
		machine.instr_ptr += 1

		# right-most two digits are the operation; everything to the left defines parameter modes
		op = opcode % 100
		arg_modes = int(opcode/100)
		if op not in operations.keys():
			print (opcode, machine.instr_ptr, machine.program)
		(num_inputs, num_outputs, fn) = operations[op]
		args = [prog_input]

		for i in range (num_inputs):
			src = machine.program[machine.instr_ptr]
			# check the rightmost digit of arg_modes to see if the parameter is a reference or value
			arg = machine.program[src] if (arg_modes %10 == 0) else src
			arg_modes = int(arg_modes/10)
			args.append(arg)
			machine.instr_ptr += 1

		return_val = fn(args) # execute the function on the arguments

		if num_outputs > 0: # output the return value to the reference in the output parameter
			dest = program[machine.instr_ptr]
			machine.instr_ptr += 1
			program[dest] = return_val
		elif num_outputs < 0: # this is a jump-if instruction.  Update machine.instr_ptr if the return val is true
			if (return_val):
				machine.instr_ptr=args[2] # TODO what is this magic?
		elif num_outputs == 0: # this is an output instruction.  Print the return value, and don't modify state
			output_value = return_val
	return output_value

def program_from_str(inputstr):
	program = [int(x) for x in (inputstr.split(','))]
	return program
