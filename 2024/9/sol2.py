pattern = []
with open("input.txt", "r") as file:
    pattern = list(map(int, list(file.readline().strip())))


def defragment(pattern):
    blocks = []
    for i, num in enumerate(pattern):
        if i % 2 == 0:
            blocks.append((i // 2, num))
        else:
            blocks.append((None, num))

    for i in reversed(range(len(blocks))):
        (id, num) = blocks[i]
        if id is None:
            continue
        found = False
        for j in range(i):
            (emptyId, n) = blocks[j]
            if emptyId is None and n >= num:
                found = j
                break

        if found is not False:
            diff = abs(blocks[found][1] - num)
            blocks[found] = (id, num)
            blocks[i] = (None, num)
            if diff > 0:
                blocks.insert(found + 1, (None, diff))
                i += 1

    fs = []
    for id, num in blocks:
        if id is not None:
            fs.extend([id] * num)
        else:
            fs.extend([None] * num)

    return fs


def calculateChecksum(fs):
    return sum([i * num for i, num in enumerate(fs) if num is not None])


fs = defragment(pattern)
print(f"Checksum: {calculateChecksum(fs)}")
