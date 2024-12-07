from re import findall

result = 0
shouldSkip = False
with open("input.txt", "r") as file:
  for line in file:
    matches = findall(r"(mul\(\d+,\d+\)|do\(\)|don't\(\))", line)
    if matches:
      for match in matches:
        if (match == "don't()"):
          shouldSkip = True
        elif (match == "do()"):
          shouldSkip = False
          continue

        if shouldSkip:
          continue

        a, b = map(int, findall(r"\d+", match))
        result += a * b

print(f"Result: {result}")

