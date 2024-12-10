input = {}

with open("input.txt", "r") as file:
    for line in file:
        if not line.strip():
            continue
        result, nums = line.strip().split(": ")
        result = int(result)
        input[result] = [int(x) for x in nums.split()]


def isSolvable(result, nums):
    if len(nums) == 1:
        return nums[0] == result

    return isSolvable(result, [nums[0] + nums[1], *nums[2:]]) or isSolvable(
        result, [nums[0] * nums[1], *nums[2:]]
    )


res = 0
for result, nums in input.items():
    if isSolvable(result, nums):
        res += result

print(f"Result: {res}")
