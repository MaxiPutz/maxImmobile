/**
 * import { AttributeKeys, WillHabenEstate, attributeKeys } from "../../../public/jsDocs/willhabenEstate.js"
 * 
*/
import { } from "../../../public/jsDocs/index.js"

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
export const convertAdvertToObject = (advert) => {
    const destination = `${getValFromAttributeKeys('POSTCODE', advert)} ${getValFromAttributeKeys('LOCATION', advert)} ${getValFromAttributeKeys('ADDRESS', advert)}`;

    let coords;
    try {
        coords = getValFromAttributeKeys("COORDINATES", advert)[0].split(",");
    } catch {
        coords = [null, null]; // Handle missing coordinates
    }

    const teaser = [
        ...advert.teaserAttributes.map(ele => `${ele.prefix || ""} ${ele.value} ${ele.postfix || ""}`)
    ];

    return {
        price: getValFromAttributeKeys('PRICE_FOR_DISPLAY', advert)[0] || undefined,
        teaser: teaser,
        destination: destination,
        url: `https://www.willhaben.at/iad/${getValFromAttributeKeys('SEO_URL', advert)}`,
        coords: {
            latitude: coords[0],
            longitude: coords[1]
        }
    };
};