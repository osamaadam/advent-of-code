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
visited.add(startingPos)


def navigate(row, col, delta):
    while row < len(matrix) and col < len(matrix[0]) and row >= 0 and col >= 0:
        if matrix[row][col] == "#":
            row, col = row - dr, col - dc
            delta = nextMove[delta]
            continue
        visited.add((row, col))
        (dr, dc) = delta
        (row, col) = (row + dr, col + dc)


(row, col) = startingPos
delta = directions[matrix[row][col]]

navigate(row, col, delta)

print(f"Result: {len(visited)}")

# for row, col in visited:
#     matrix[row][col] = "X"

# print("\n".join(["".join(row) for row in matrix]))
