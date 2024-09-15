/**
 * @param {import("../inputWrapper").WillhabenJson[]} json
 * @returns {boolean}
 */
export const  isLagacy = (json) =>  {
    return json.reduce((prev, cur) => {
        if (prev) {
            return prev
        }
        const check = (
            isNaN(parseFloat(cur.price))
        || isNaN ( parseFloat(cur.squareMeters))
        )

        if (check) {
            if (isNaN(parseFloat(cur.price))) console.error("price error", cur.price);
            if  ( isNaN ( parseFloat(cur.squareMeters)) ) console.error( "square error", cur.squareMeters )
            
            console.log(cur);
            
        }

        return check
    }, false)
}


/**
 * @param {import("../inputWrapper").WillhabenJson[]} json
 * @returns {boolean}
 */

export const parseLagacy = (json) =>  {
    json.map(ele =>  {
        ele.price = ele.price.replace(".", "")
    
        const tmp = parseFloat( ele.price.split(" ")[1].split(",")[0])
        const squareMeters = parseFloat( ele.teaser.filter(ele => ele.includes("m²"))[0].split("m²")[0])
    
        console.log(ele);
        console.log(tmp);
        
        
        console.log(ele.coords);
        
        return ({
        ...ele,
        squareMeters,
        price: tmp,
        coords: {
            ...ele.coords,
            lat: ele.coords.latitude,
            lng: ele.coords.longitude,
        }
    })})

}
