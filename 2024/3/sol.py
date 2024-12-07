from re import findall

result = 0
with open("input.txt", "r") as file:
  for line in file:
    matches = findall(r"mul\(\d+,\d+\)", line)
    if matches:
      for match in matches:
        a, b = map(int, findall(r"\d+", match))
        result += a * b

print(f"Result: {result}")
