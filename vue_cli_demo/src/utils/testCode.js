import { readEnvArguments } from "@/utils/tools.js";
readEnvArguments();

/** 模板字符串测试 */
const handleSayHi = (_name) => {
  // // dev-log >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  console.log(`[HI]${_name}`);
};

handleSayHi("SAM9029");

/** 异步语句测试 */

const handleAsync = () => {
  new Promise((resolve) => {
    resolve();
  })
    .then((res) => {
      // // dev-log >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      console.log(`[Dev_Log][${"Promise__OK"}_]_>>>`, res);
    })
    .catch((err) => {
      throw err;
    })
    .finally(() => {});
};

handleAsync();
