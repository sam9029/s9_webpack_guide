import Request from "@/utils/request/index.js";

export function testGetApi() {
  return Request({
    url: "/hi",
    method: "get",
    data: {
      hi: "hi",
    },
  });
}

export function testPostApi() {
  return Request({
    url: `/hi`,
    method: "post",
    data: {
      hi: "hi",
    },
  });
}
