import { fetchUrl } from "../../fetchWillhabenImmo/lib/fetchWillHabenDoc.js";

export const getImmoJson =  (url) => {
    return fetchUrl(url)
    .then(document => {

        let script = document.querySelectorAll("script");
        script = [...script].map(ele => ele.text).filter(ele => ele.includes("window.__INITIAL_STATE__="));


        let data = script[0].split("window.__INITIAL_STATE__=")[1];
        data = data.split("window")[0].trim();  // Adjusted split


        data = data.replace(/undefined/g, 'null'); // Replace all 'undefined' with 'null'

        try {
            data = JSON.parse(data);

            const results = data.reduxAsyncConnect.pageData.results.hits


            let tmp = results.filter(ele => ele.headline.toLocaleLowerCase().includes("balkon"))

            return results
            // addressString
            // primaryPrice
            // primaryArea
        } catch (error) {
            console.error("Failed to parse JSON:", error);
        }
    });
} 
