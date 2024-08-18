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

const visited: Record<string, number> = {};

let ans = 0;

function dfs(cave: string, numOfVisits = 1) {
  if (cave === "end") {
    ans++;
    return;
  }

  if (cave === cave.toLowerCase()) {
    if (!(cave in visited)) {
      visited[cave] = 0;
    }
    visited[cave]++;
    if (visited[cave] > numOfVisits) {
      visited[cave]--;
      return;
    }
  }

  let numOfViolations = 0;
  for (const freq of Object.values(visited)) {
    if (freq > 1) {
      numOfViolations++;
    }
  }

  if (numOfViolations > 1) {
    visited[cave]--;
    return;
  }

  for (const next of map[cave]) {
    if (next === "start") continue;
    dfs(next, numOfVisits);
  }

  if (cave === cave.toLowerCase()) {
    visited[cave]--;
  }
}

dfs("start", 1);

console.log(`Answer for part 1: ${ans}`);

ans = 0;

dfs("start", 2);

console.log(`Answer for part 2: ${ans}`);
