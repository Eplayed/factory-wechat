/*
 * @Author: zyj
 * @Date: 2020-09-03 15:09:43
 * @LastEditors: zyj
 * @LastEditTime: 2020-12-14 15:03:55
 * @Description: file content
 * @FilePath: /factorynike-mini/.eslintrc.js
 */
module.exports = {
  "extends": ["taro"],
  "rules": {
    "no-unused-vars": ["error", { "varsIgnorePattern": "Taro" }],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".tsx"] }]
  },
  "parser": "babel-eslint",
  "plugins": ["typescript"]
}
