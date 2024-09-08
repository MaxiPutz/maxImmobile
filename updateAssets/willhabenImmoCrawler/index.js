import puppeteer from "puppeteer";
import { getWillhaebenCardInfos } from "./lib/getWillhabenCardInfos.js"; // Assuming this is your custom function
import {getCoordinates} from "./lib/getCoordinates.js"

import fs from "fs";
import { addCoordsToInfo } from "./addCoordsToInfo.js";

const allInfos = [];

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    //const url = 'https://www.willhaben.at/iad/immobilien/mietwohnungen/mietwohnung-angebote';
    const url = 'https://www.willhaben.at/iad/immobilien/mietwohnungen/mietwohnung-angebote?sfId=3b261340-8744-4ef9-961d-5cebd78fac60&isNavigation=true&rows=90&areaId=101&areaId=102&areaId=103&areaId=106&areaId=107&areaId=301&areaId=302&areaId=304&areaId=305&areaId=306&areaId=307&areaId=308&areaId=312&areaId=313&areaId=316&areaId=317&areaId=318&areaId=321&areaId=323&FREE_AREA/FREE_AREA_TYPE=20&FREE_AREA/FREE_AREA_TYPE=40&FREE_AREA/FREE_AREA_TYPE=60&FREE_AREA/FREE_AREA_TYPE=30&FREE_AREA/FREE_AREA_TYPE=10&FREE_AREA/FREE_AREA_TYPE=50&page=1&ESTATE_SIZE/LIVING_AREA_FROM=40&ESTATE_SIZE/LIVING_AREA_TO=95&PRICE_FROM=0&PRICE_TO=1000';

    await page.goto(url, { waitUntil: 'networkidle2' });

    await page.click("#didomi-notice-agree-button");


        async function autoScroll(page) {
            await page.evaluate(async () => {
                await new Promise((resolve, reject) => {
                    let totalHeight = 0;
                    const distance = 100; // should be less than or equal to window.innerHeight
                    const timer = setInterval(() => {
                        const scrollHeight = document.body.scrollHeight;
                        window.scrollBy(0, distance);
                        totalHeight += distance;

                        if (totalHeight >= scrollHeight) {
                            clearInterval(timer);
                            resolve();
                        }
                    }, 100);
                });
            });
    }

    async function scrollToBottom(page) {
        let previousHeight;
        let currentHeight = await page.evaluate(() => document.body.scrollHeight);
        

        // Execute the function within the browser context
        const result = await page.evaluate(() => {
            const box = [...document.querySelectorAll("[class*=Box]")]
                .filter(ele => ele.children.length == 2)
                .filter(ele => ele.children[0].tagName == "DIV")
                .filter(ele => ele.children[1].tagName == "BUTTON");

            const data = box.map(ele => {
                const url = ele.querySelector("a").href;
                const destination = ele.querySelector("span[class*=Text]").innerText;
                const price = ele.querySelector('span[data-testid*="price"]') ?
                    ele.querySelector('span[data-testid*="price"]').innerText :
                    "not found";
                const teaser = [...ele.querySelectorAll("div[class*=Text][data-testid*=teaser]")]
                    .map(ele => ele.innerText);

                return {
                    price,
                    teaser,
                    destination,
                    url
                };
            });

            return data;
        });

        return result;
    }

    async function clickNextPage() {

        const nextButton = await page.evaluate(() => {


            const nav = document.querySelector("nav[data-testid=pagination-bottom]");
            const weiterLink = [...nav.querySelectorAll("a")]
                .filter(ele => ele.innerText.includes("Weiter"))[0];
            return weiterLink ? weiterLink.href : null;
        });

        if (nextButton) {
            await page.goto(nextButton, { waitUntil: 'networkidle2' });
            return true;
        } else {
            return false;
        }
    }

    let hasNextPage = true;

    while (hasNextPage) {
        await autoScroll(page)
        const infos = await scrollToBottom(page);
        console.log('Infos:', infos);

        allInfos.push(...infos);
        console.log(allInfos.length);
        
        fs.writeFileSync("infos.json", JSON.stringify(allInfos, undefined, 4));

        // Click the next page button and continue if another page is available
        await delay(3000)
        hasNextPage = await clickNextPage();
    }

    // Close the browser
    await browser.close();

    addCoordsToInfo()

    const result =  await Promise.all( allInfos.map (async ele => {
        const coords = await getCoordinates(ele.destination)

        return {
            ...ele,
            coords
        }
    }))

    fs.writeFileSync("infos2.json", JSON.stringify(result, undefined, 4))





})();


function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }