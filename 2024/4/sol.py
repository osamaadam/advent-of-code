word = "XMAS"

matrix = []
with open("input.txt", "r") as file:
    for line in file:
        matrix.append(list(line.strip()))

dirs = [(1, 0), (-1, 0), (0, 1), (0, -1), (1, 1), (-1, -1), (1, -1), (-1, 1)]


def findNext(row, col, prevMove, index=0, word=word):
    if index == len(word):
        return True

    if row < 0 or row >= len(matrix) or col < 0 or col >= len(matrix[0]):
        return False

    if matrix[row][col] == word[index]:
        dr, dc = prevMove
        return findNext(row + dr, col + dc, prevMove, index + 1, word)

    return False


findings = []
for row in range(len(matrix)):
    for col in range(len(matrix[0])):
        for dr, dc in dirs:
            if findNext(row, col, (dr, dc)):
                findings.append((row, col))

print(f"Result: {len(findings)}")
