import { parseInput } from "../../2023/util/parseInput.mjs";
import { join } from "path";

const lines = await parseInput("input.txt");

const map = {};

let curDir = "/";
for (const line of lines) {
  const segments = line.split(" ");
  switch (segments[0]) {
    case "$":
      const instr = segments[1];
      const arg = segments[2];
      switch (instr) {
        case "cd":
          curDir = join(curDir, arg);
          break;
        case "ls":
          continue;
      }
      break;
    case "dir":
      continue;
    default:
      const size = parseInt(segments[0], 10);
      const fileName = segments[1];
      const path = join(curDir, fileName);
      map[path] = size;
      break;
  }
}

const sizeMap = {};

for (const [path, size] of Object.entries(map)) {
  const segments = ["/", ...path.split("/").slice(1, -1)];
  while (segments.length) {
    const curPath = join(...segments);
    if (curPath in sizeMap) {
      sizeMap[curPath] += size;
    } else {
      sizeMap[curPath] = size;
    }
    segments.pop();
  }
}

const partOne = Object.values(sizeMap)
  .filter((dirSize) => dirSize <= 100_000)
  .reduce((prev, cur) => prev + cur, 0);

console.log(`The solution to part one is: ${partOne}`);

const spaceNeeded = 30000000 - (70000000 - sizeMap["/"]);

const dirToBeDeleted = Object.values(sizeMap)
  .filter((dirSize) => dirSize >= spaceNeeded)
  .sort((a, b) => a - b)[0];

console.log(`The solution to part two is: ${dirToBeDeleted}`);
