import dayjs from "dayjs";

export const getDay = () => {
  const today = dayjs().format("YYYY-MM-DD");
  // // dev-log >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  console.log(`[Dev_Log][${"today"}_]_>>>`, today);
};

getDay();
