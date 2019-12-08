import intcode_machine

TEST_INPUTS=[
	([4,3,2,1,0], "3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0", 43210),
	([0,1,2,3,4], "3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0", 54321),
	([1,0,4,3,2], "3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0", 65210)
   	]
NUM_PHASES=5

def run_circuit(program_str, phase_sequence):
	next_input = 0
	program = intcode_machine.program_from_str(program_str)
	for i in range(NUM_PHASES):
		inputs = [phase_sequence[i], next_input]
		next_input = intcode_machine.run_program(inputs, list(program))[0]

	return next_input

def test_circuits():
	for (phase_sequence, program_str, expected_output) in TEST_INPUTS:
		print(phase_sequence, program_str)
		output = run_circuit(program_str, phase_sequence)
		print (expected_output, output, expected_output==output)

test_circuits()
