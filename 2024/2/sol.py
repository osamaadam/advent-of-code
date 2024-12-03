safeReports = 0
with open("input.txt", "r") as f:
  for line in f:
    level = [int(x) for x in line.strip().split()]
    isSafe = True
    isIncreasing = False
    isDecreasing = False
    for i in range(1, len(level)):
      diff = abs(level[i] - level[i - 1])
      if diff < 1 or diff > 3:
        isSafe = False
        break
      if level[i] - level[i - 1] > 0:
        isIncreasing = True
      else:
        isDecreasing = True
    if isSafe and isIncreasing != isDecreasing:
      safeReports += 1

print(f"Safe reports: {safeReports}")
