from collections import defaultdict
from heapq import heappop, heappush

left, right = [], []
freq = defaultdict(int)
with open('input.txt', 'r') as f:
    for line in f:
        [l, r] = map(int, line.strip().split())
        heappush(left, l)
        heappush(right, r)
        freq[r] += 1

distance, similarity = 0, 0

while left:
    l, r = heappop(left), heappop(right)
    distance += abs(l - r)
    similarity += l * freq[l]

print("Solution for part 1:", distance)
print("Solution for part 2:", similarity)

