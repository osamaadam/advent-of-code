directions = {"^": (-1, 0), "v": (1, 0), "<": (0, -1), ">": (0, 1)}
nextMove = {(0, 1): (1, 0), (1, 0): (0, -1), (0, -1): (-1, 0), (-1, 0): (0, 1)}

matrix = []
startingPos = (0, 0)

with open("input.txt", "r") as file:
    for line in file:
        elements = list(line.strip())
        matrix.append(elements)
        for i, element in enumerate(elements):
            if element == "^" or element == "v" or element == "<" or element == ">":
                startingPos = (len(matrix) - 1, i)

visited = set()
(row, col) = startingPos
startingDelta = directions[matrix[row][col]]


def navigate(matrix, row, col, delta):
    visitedWithDirs = set()
    while row < len(matrix) and col < len(matrix[0]) and row >= 0 and col >= 0:
        if matrix[row][col] == "#":
            row, col = row - dr, col - dc
            delta = nextMove[delta]
            continue
        elif (row, col, delta) in visitedWithDirs:
            return True
        visited.add((row, col))
        visitedWithDirs.add((row, col, delta))
        (dr, dc) = delta
        (row, col) = (row + dr, col + dc)

    return False


navigate(matrix, row, col, startingDelta)

print(f"Result: {len(visited)}")


uniqueObstacles = set()
visitedCopy = visited.copy()
for row, col in visitedCopy:
    if (row, col) == startingPos:
        continue
    visited.clear()
    matrixCopy = [list(r) for r in matrix]
    matrixCopy[row][col] = "#"
    if navigate(matrixCopy, startingPos[0], startingPos[1], startingDelta):
        uniqueObstacles.add((row, col))

print(f"Unique obstacles: {len(uniqueObstacles)}")
