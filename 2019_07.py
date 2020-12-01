import itertools
import intcode_machine

TEST_INPUTS=[
	((4,3,2,1,0), "3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0", 43210),
	((0,1,2,3,4), "3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0", 54321),
	((1,0,4,3,2), "3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0", 65210)
   	]
NUM_PHASES=5
INPUT_FILE='input/input_2019_07.txt'

def run_circuit(program_str, phase_sequence):
	next_input = 0
	program = intcode_machine.program_from_str(program_str)
	for i in range(NUM_PHASES):
		inputs = [phase_sequence[i], next_input]
		next_input = intcode_machine.run_program(inputs, list(program))

	return next_input

def find_max_phase_sequence(program_str):
	highest_output = 0
	best_seq_seen = None
	SEQUENCES = itertools.permutations(range(NUM_PHASES))
	for seq in SEQUENCES:
		output = run_circuit(program_str, seq)
		if (output > highest_output):
			highest_output = output
			best_seq_seen = seq
	return (best_seq_seen, highest_output)


def test_circuits():
	for (phase_sequence, program_str, expected_output) in TEST_INPUTS:
		print(phase_sequence, program_str)
		output = run_circuit(program_str, phase_sequence)
		print (expected_output, output, expected_output==output)

test_circuits()

def test_finder():
	for (expected_phase_sequence, program_str, expected_output) in TEST_INPUTS:
		print(program_str)
		(output_sequence, output_signal) = find_max_phase_sequence(program_str)
		print (expected_output, output_signal, expected_output==output_signal, expected_phase_sequence, output_sequence, expected_phase_sequence==output_sequence)
	
test_finder()

with open(INPUT_FILE) as f:
	program_str = f.read()
	
print(find_max_phase_sequence(program_str))


