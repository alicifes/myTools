//import { flattenObjectToArray } from "./index";
//require = require("esm")(module);
//测试扁平对象
const obj = {
  name: "1",
  children: [
    {
      name: "1-1",
      children: [
        {
          name: "1-1-1",
          children: [
            {
              name: "1-1-1-1",
              children: [
                {
                  name: "1-1-1-1-1",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

console.log(flattenObjectToArray(obj));
