from collections import defaultdict

left, right = [], []
freq = defaultdict(int)

with open('input.txt', 'r') as f:
    for line in f:
        [l, r] = line.split()
        left.append(int(l))
        right.append(int(r))
        freq[int(r)] += 1

left = sorted(left)
right = sorted(right)

distance = 0
similarity = 0

for i in range(len(left)):
    distance += abs(left[i] - right[i])
    similarity += left[i] * freq[left[i]]

print("Solution for part 1:", distance)
print("Solution for part 2:", similarity)

