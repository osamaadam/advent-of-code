def isLevelSafe(level: list[int], tolerance: int = 0):
  if tolerance > 1:
    return False

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
    return True
  else:
    tolerance += 1

  for i in range(len(level)):
    if isLevelSafe(level[:i] + level[i+1:], tolerance):
      return True

  return False

safeReports = 0
with open("input.txt", "r") as f:
  for line in f:
    level = [int(x) for x in line.strip().split()]
    if isLevelSafe(level):
      safeReports += 1

print(f"Safe reports: {safeReports}")
