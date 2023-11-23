// export default defineEventHandler(async (event) => {
//   try {
//     const response = await fetch("https://huggingface.co/stabilityai/stable-video-diffusion-img2vid-xt");
//     const body = await response.text();

//     // 在这里，您可以添加任何必要的逻辑来处理或修改获取的内容
//     // 例如，过滤掉不必要的部分、修改链接等

//     return body;
//   } catch (error) {
//     // 处理错误
//     return { error: error.message };
//   }
// });

// import puppeteer from 'puppeteer';

// export default defineEventHandler(async (event) => {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto('https://huggingface.co/stabilityai/stable-video-diffusion-img2vid-xt');
    
//     const content = await page.content(); // 获取完整的页面 HTML，包括动态内容
//     await browser.close();

//     return content;
// });

