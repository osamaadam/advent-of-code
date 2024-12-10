input = []

with open("input.txt", "r") as file:
    for line in file:
        if not line.strip():
            continue
        result, nums = line.strip().split(": ")
        result = int(result)
        nums = [int(x) for x in nums.split()]
        input.append([result, *nums])


def isSolvable(result, nums, operators):
    if len(nums) == 1:
        return nums[0] == result

    for op in operators:
        if isSolvable(result, [op(nums[0], nums[1]), *nums[2:]], operators):
            return True

    return False


res = 0
for [result, *nums] in input:
    if isSolvable(result, nums, [lambda a, b: a + b, lambda a, b: a * b]):
        res += result

print(f"Result for first part: {res}")

res = 0
for [result, *nums] in input:
    if isSolvable(
        result,
        nums,
        [lambda a, b: a + b, lambda a, b: a * b, lambda a, b: int(str(a) + str(b))],
    ):
        res += result

print(f"Result for second part: {res}")
