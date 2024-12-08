from collections import deque


rules = []
updates = []
with open("input.txt", "r") as file:
    for line in file:
        line = line.strip()
        if "|" in line:
            rules.append([int(x) for x in line.split("|")])
        elif not line:
            continue
        else:
            updates.append([int(x) for x in line.split(",")])


def followsRules(update):
    map = {}
    for i, page in enumerate(update):
        map[page] = i

    for l, r in rules:
        if l in map and r in map and map[l] > map[r]:
            return 0

    return update[len(update) // 2]


def sortCorrectly(update):
    while True:
        isSorted = True
        for i in range(1, len(update)):
            if [update[i], update[i - 1]] in rules:
                isSorted = False
                update[i], update[i - 1] = update[i - 1], update[i]

        if isSorted:
            return update


result = 0
incorrectResult = 0
for update in updates:
    mid = followsRules(update)
    result += mid
    if mid == 0:
        update = sortCorrectly(update)
        incorrectResult += followsRules(update)

print(f"Result: {result}")
print(f"Incorrect result: {incorrectResult}")
