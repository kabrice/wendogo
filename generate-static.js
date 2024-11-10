const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path"); 

async function generateStaticFiles() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Add the routes you want to pre-render
    const routes = [
        '/',
        '/404',
        '/error',
        '/waitinglist',
        '/verification',
        '/congratulation',
        '/credentialstart',
        '/credentialend',
        '/work-permit-steps',
        '/scholarship-program-canada',
        '/scholarship-program-france',
        '/immigrate-to-canada',
        '/study-in-france',
        '/wendogo-mission',
        '/wendogo-cost',
        '/wendogo-privacy',
        '/about-us',
        '/contact',
        '/legal-notice',
        '/cgu',
        '/simulation/home',
        '/simulation/engine?country=FR',
        '/simulation/engine?country=CA', 
        '/simulation/engine',
        '/simulation/appointment',
        '/simulation/result',
        '/simulation/result#view/SCORE_DETAILLE'
      ];
      
    await page.click('.MuiTypography-root'); // Selector for the clickable element
    await page.waitForNavigation({ waitUntil: "networkidle2" });
    for (const route of routes) {
        console.log(`Rendering route: ${route}`);
        await page.goto(`http://localhost:3000${route}`, { waitUntil: "networkidle2" });
        await page.waitForSelector(".MuiTypography-root"); // Replace with a reliable selector

        await page.goto(`http://localhost:3000${route}`, { waitUntil: "networkidle2" }); // Use the port your app runs on

        const content = await page.content(); // Get the full HTML content
        const filePath = path.join(
            __dirname,
            "build",
            route === "/" ? "index.html" : `${route.replace(/\//g, "")}.html`
        );

        // Ensure the directory exists
        fs.mkdirSync(path.dirname(filePath), { recursive: true });

        // Write the content to the appropriate file
        fs.writeFileSync(filePath, content);
        console.log(`Generated: ${filePath}`);
    }

    await browser.close();
    console.log("Static files generated successfully!");
}

generateStaticFiles().catch((err) => {
    console.error("Error generating static files:", err);
    process.exit(1);
});
