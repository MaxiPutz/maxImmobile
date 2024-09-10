/**
 * import { AttributeKeys, WillHabenEstate, attributeKeys } from "../../../static/jsDocs/willhabenEstate.js"
 * 
*/
import { } from "../../../static/jsDocs/index.js"
import {getCoordinates, isInEurope} from "./getCoordinates.js"
import fs from "fs"

/**
 * 
 * @param {AttributeKeys} attributeKey 
 * @param {WillHabenEstate} obj 
 * @returns 
 */
export const getValFromAttributeKeys = (attributeKey, obj) => {
    const attribute = obj.attributes.attribute.filter((ele) => ele.name === attributeKey);
    return attribute.length > 0 ? attribute[0].values : "";
};

/**
 * 
 * @param {WillHabenEstate} advert 
 * @returns 
 */
export const convertAdvertToObject = async (advert) => {
    const destination = `${getValFromAttributeKeys('POSTCODE', advert)} ${getValFromAttributeKeys('LOCATION', advert)} ${getValFromAttributeKeys('ADDRESS', advert)}`;

    let coords;
    try {
        coords = getValFromAttributeKeys("COORDINATES", advert )[0].split(",")
        
    } catch {
        const tmp = await getCoordinates(destination)
        coords = [tmp.latitude, tmp.longitude]
        
        if (!isInEurope({lat: coords[0], lng: coords[1]})) {
            const tmp2 =   await getCoordinates(getValFromAttributeKeys('POSTCODE', advert)[0] + ", AUT") 
            coords = [tmp2.latitude, tmp2.longitude]
            fs.appendFileSync("ERROR_NoCoords.log", `no coords foumd ${coords} \n ${getValFromAttributeKeys('POSTCODE', advert)[0] + ", AUT"} \n ${ JSON.stringify(advert, undefined, 4)}`)
        } 
        
    }


    let teaser = [
        ...advert.teaserAttributes.map(ele => `${ele.prefix ? ele.prefix : ""} ${ele.value} ${ele.postfix ? ele.postfix : ""}`)
    ]
    if (teaser.length === 0 ) {
        try {
            advert = advert.children[0]
        } catch {
            fs.appendFileSync("ERROR.log", "no child and no teaser" +"\n" + JSON.stringify(advert, undefined, 4))
            return undefined
        }
        teaser = [
            ...advert.teaserAttributes.map(ele => `${ele.prefix ? ele.prefix : ""} ${ele.value} ${ele.postfix ? ele.postfix : ""}`)
        ]
    }

    return {
        price: getValFromAttributeKeys('PRICE_FOR_DISPLAY', advert)[0] || undefined,
        teaser: teaser,
        destination: destination,
        url: `https://www.willhaben.at/iad/${getValFromAttributeKeys('SEO_URL', advert)}`,
        coords: {
            latitude: coords[0],
            longitude: coords[1]
        },
        postcode: getValFromAttributeKeys('POSTCODE', advert)[0]
    };
};