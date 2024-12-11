pattern = []
with open("input.txt", "r") as file:
    pattern = list(map(int, list(file.readline().strip())))


def constructFS(pattern):
    fs = []
    id = 0
    for i, num in enumerate(pattern):
        if i % 2 == 0:
            fs.extend([id] * num)
            id += 1
        else:
            fs.extend([None] * num)

    return fs


def defragment(fs):
    i = 0
    while i < len(fs):
        if fs[i] is None:
            while (popped := fs.pop()) is None:
                pass
            fs[i] = popped
            if i == len(fs):
                break
        i += 1

    return fs


def calculateChecksum(fs):
    return sum([i * num for i, num in enumerate(fs)])


fs = constructFS(pattern)
fs = defragment(fs)
print(f"Checksum: {calculateChecksum(fs)}")
