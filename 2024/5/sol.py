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


result = 0
for update in updates:
    mid = followsRules(update)
    result += mid

print(f"Result: {result}")
