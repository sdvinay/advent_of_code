import intcode_machine

TEST_INPUTS=[
	([8], "3,9,8,9,10,9,4,9,99,-1,8", [1]),   # ==8
	([7], "3,9,8,9,10,9,4,9,99,-1,8", [0]),   # ==8
	([8], "3,9,7,9,10,9,4,9,99,-1,8", [0]),   # <8
	([9], "3,9,7,9,10,9,4,9,99,-1,8", [0]),   # <8
	([7], "3,9,7,9,10,9,4,9,99,-1,8", [1]),   # <8
	([8], "3,3,1108,-1,8,3,4,3,99",   [1]),   # ==8
	([7], "3,3,1108,-1,8,3,4,3,99"  , [0]),   # ==8
    ([8], "3,3,1107,-1,8,3,4,3,99"  , [0]),   # <8
    ([9], "3,3,1107,-1,8,3,4,3,99"  , [0]),   # <8
    ([7], "3,3,1107,-1,8,3,4,3,99",   [1]),   # <8

# The following couple programs have this behavior:
#output 0 if the input was zero or 1 if the input was non-zero
	([0], "3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9", [0]), 
	([1], "3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9", [1]),
	([-1], "3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9", [1]),
    ([0],	"3,3,1105,-1,9,1101,0,0,12,4,12,99,1", [0]),
    ([1],	"3,3,1105,-1,9,1101,0,0,12,4,12,99,1", [1]),
    ([-1],	"3,3,1105,-1,9,1101,0,0,12,4,12,99,1", [1]),

# output 999 if the input value is below 8, 
# output 1000 if the input value is equal to 8, or 
#output 1001 if the input value is greater than 8.
	([7], "3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31, 1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104, 999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99", [999]),
	([8], "3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31, 1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104, 999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99", [1000]),
	([9], "3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31, 1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104, 999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99", [1001]),
   	]
INPUT_FILE='input/input_2019_05.txt'

def test():
	for (inp, program_str, expected_output) in TEST_INPUTS:
		print(inp, program_str)
		output = (intcode_machine.run_program(inp, intcode_machine.program_from_str(program_str)))
		print (expected_output, output, expected_output==output)
	

test()

original_program = []
with open(INPUT_FILE) as f:
	original_program = intcode_machine.program_from_str(f.read()) 
	
program = list(original_program)
print(intcode_machine.run_program([5], program))


