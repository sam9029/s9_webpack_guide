export function readEnvArguments() {
  // // dev-log >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  console.log(
    `[Dev_Log][${"readEnvArguments-process.env"}_]_>>>`,
    process.env.NODE_ENV,
    process.env.VUE_APP_BASE_URL
  );
}
