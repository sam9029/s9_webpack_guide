import { sum1 } from "./math.js";


// // dev-log >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
var nono = "test";
let one = 10;

// 模板字符串
const str = `${one}hihi`;

// 解构
const { hihi } = {
  hihi: "hihi",
};

console.log(`[Dev_Log][${"nono"}_]_>>>`, nono);
console.log(`[Dev_Log][${"one"}_]_>>>`, one);
console.log(`[Dev_Log][${"hi"}_]_>>>`, str);
console.log(`[Dev_Log][${"hihi"}_]_>>>`, hihi);

export const intt = (a, b) => {
  return a + b;
};

export function intt2(list = []) {
  // // dev-log >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  sum1();
  return list.reduce((p, c) => p + c, 0);
}

export function testFind() {
  const list = ["i", "a", "u"];
  list.find((item) => item === "i");
}

export function testIncludes() {
  [1, 2, 3].includes(2); // true
}


