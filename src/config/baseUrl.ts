/*
 * @Author: zyj
 * @Date: 2020-09-18 09:08:00
 * @LastEditors: zyj
 * @LastEditTime: 2020-09-18 09:08:27
 * @Description: file content
 * @FilePath: /factorynike-mini/src/config/baseUrl.ts
 */
const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://ip-30-ica-api.coralcodes.com"
    : "https://user.pq-ai.online";

export const baseUrl = BASE_URL;