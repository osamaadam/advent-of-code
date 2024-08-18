import { parseInput } from "../../2023/util/parseInput.mjs";

const input = await parseInput("./input.txt");

const map: Record<string, Set<string>> = {};

for (const line of input) {
  const [a, b] = line.split("-");
  if (!map[a]) map[a] = new Set();
  if (!map[b]) map[b] = new Set();

  map[a].add(b);
  map[b].add(a);
}

const visited = new Set<string>();

let ans = 0;

function dfs(cave: string) {
  if (cave === "end") {
    ans++;
    return;
  }

  if (visited.has(cave)) {
    return;
  }

  if (cave === cave.toLowerCase()) {
    visited.add(cave);
  }

  for (const next of map[cave]) {
    if (next === "start") continue;
    dfs(next);
  }

  if (cave === cave.toLowerCase()) {
    visited.delete(cave);
  }
}

dfs("start");

console.log(`Answer for part 1: ${ans}`);
