unFragmented = []
stack = []
with open("input.txt", "r") as file:
    pattern = list(file.readline().strip())
    id = 0
    for i in range(len(pattern)):
        addition = ""
        if i % 2 == 0:
            addition = str(id) * int(pattern[i])
            id += 1
        elif i % 2 == 1 and i == len(pattern) - 1:
            continue
        else:
            addition = "." * int(pattern[i])
        unFragmented.extend(list(addition))

fragmented = []
for i in range(len(unFragmented)):
    if unFragmented[i] != ".":
        fragmented.append(unFragmented[i])
    else:
        farthestMember = False
        for j in reversed(range(len(unFragmented))):
            if j <= i:
                break
            elif unFragmented[j] != ".":
                farthestMember = j
                break
        if farthestMember == False:
            break
        fragmented.append(unFragmented[farthestMember])
        unFragmented[farthestMember] = "."

res = 0
for i in range(len(fragmented)):
    res += int(fragmented[i]) * i

print(f"Result: {res}")
