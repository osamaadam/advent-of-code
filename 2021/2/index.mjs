import { parseInput } from "../../2023/util/parseInput.mjs";

const lines = await parseInput("input.txt");

const pos = [0, 0];

for (const line of lines) {
  const [dir, val] = line.split(" ");

  switch (dir) {
    case "forward":
      pos[1] += +val;
      break;
    case "up":
      pos[0] -= +val;
      break;
    case "down":
      pos[0] += +val;
      break;
  }
}

const prod = pos.reduce((prev, cur) => prev * cur, 1);
console.log(`The solution to the first part is: ${prod}`);

const posAim = [0, 0, 0];

for (const line of lines) {
  const [dir, val] = line.split(" ");

  switch (dir) {
    case "forward":
      posAim[1] += +val;
      posAim[0] += +val * posAim[2];
      break;
    case "up":
      posAim[2] -= +val;
      break;
    case "down":
      posAim[2] += +val;
      break;
  }
}

const secondProd = posAim.slice(0, -1).reduce((prev, cur) => prev * cur, 1);
console.log(`The solution to the second part is: ${secondProd}`);
