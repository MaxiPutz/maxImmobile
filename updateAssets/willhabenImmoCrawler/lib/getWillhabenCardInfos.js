import { token } from "../private/token.js"


export async function getWillhaebenCardInfos () {
    var box = [...document.querySelectorAll("[class*=Box]")]
    .filter(ele =>  ele.children.length == 2)
    .filter(ele => ele.children[0].tagName == "DIV" )
    .filter(ele => ele.children[1].tagName == "BUTTON" )



    box[0].innerText

    console.log(box[0])

    const promises = []

    const result = box.map( async  ele => {

        
        const url = ele
        .querySelector("a").href
        
        const destination = ele.
        querySelector("span[class*=Text]").innerText
        
        console.log(destination)
        
        const price = ele.
        querySelector('span[data-testid*="price"]') ?
            ele.querySelector('span[data-testid*="price"]').innerText :
            "not found"

        
        console.log(price)
        
        const teaser = [... ele
        .querySelectorAll("div[class*=Text][data-testid*=teaser]")]
        .map(ele => ele.innerText)
        console.log(teaser )
        

        const coords = await getCoordinates(destination)
        
        return {
            price,
            teaser,
            destination,
            url,
            coords
        }
        
    })

    return Promise.all(result)

    // Promise.all(result).then((ele) => {
    //     console.log("result", ele)   
    // })
}


async function getCoordinates(villageString) {
    
    const query = encodeURIComponent(`${villageString}`);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${token}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.features && data.features.length > 0) {
            const coordinates = data.features[0].center;
            console.log(`Coordinates for ${villageString}: [${coordinates[1]}, ${coordinates[0]}]`);
            return {
                latitude: coordinates[1],
                longitude: coordinates[0]
            };
        } else {
            console.log(`No coordinates found for ${villageString}.`);
            return null;
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error);
    }
}