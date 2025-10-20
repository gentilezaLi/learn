import express from "express";
import { renderToString } from "vue/server-renderer";
// import { createApp } from "./client-entry.js";
import { createApp } from "vue";
const app = express();
/**
 *   如果只创建了一个vue的单例对象，它将被每次发来的请求共享，这是不符合实际实际需求的，因此我们需要为每个请求重新生成一个vue实例，避免相互影响
 * @param {*} msg
 */

function getHtmlStrWrap(contentStr) {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>

    </head>
    <body>
        <h3><a href="/home">Home</a></h3>
        <h3><a href="/about">About</a></h3>
        <h3><a href="/test">error path</a></h3>
        <div id="app">${contentStr}</div>
    </body>
    </html>`;
}

// Home Page
app.get("/home", async (request, response) => {
  const vueStr = await renderToString(createApp("Hello, Vue!"));
  // const htmlStr = getHtmlStrWrap(vueStr);
  // response.send(htmlStr);
  console.log(vueStr);
});
// app.get("/about", async (request, response) => {
//   const vueStr = await renderToString(createApp("Hello, About!"));
//   const htmlStr = getHtmlStrWrap(vueStr);
//   response.send(htmlStr);
// });
// app.get("*", async (request, response) => {
//   const vueStr = await renderToString(createApp("Hello, 404!"));
//   const htmlStr = getHtmlStrWrap(vueStr);
//   response.send(htmlStr);
// });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
