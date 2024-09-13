import { fetchUrl } from "./lib/fetchWillHabenDoc.js"
import { convertAdvertToObject, getValFromAttributeKeys } from "./lib/estateUtil.js"
import fs from "fs"
import { attributeKeys } from "../../static/jsDocs/willhabenEstate.js";

var baseUrl = "https://www.willhaben.at/iad/immobilien/mietwohnungen/mietwohnung-angebote?sfId=3b261340-8744-4ef9-961d-5cebd78fac60&isNavigation=true&rows=90&areaId=101&areaId=102&areaId=103&areaId=106&areaId=107&areaId=108&areaId=301&areaId=302&areaId=304&areaId=305&areaId=306&areaId=307&areaId=308&areaId=310&areaId=312&areaId=313&areaId=314&areaId=316&areaId=317&areaId=318&areaId=319&areaId=321&areaId=323&page=1&PRICE_FROM=0&PRICE_TO=1200&ESTATE_SIZE/LIVING_AREA_FROM=40"

//"https://www.willhaben.at/iad/immobilien/mietwohnungen/mietwohnung-angebote?sfId=3b261340-8744-4ef9-961d-5cebd78fac60&isNavigation=true&rows=90&areaId=101&areaId=102&areaId=103&areaId=106&areaId=107&areaId=301&areaId=302&areaId=304&areaId=305&areaId=306&areaId=307&areaId=308&areaId=312&areaId=313&areaId=316&areaId=317&areaId=318&areaId=321&areaId=323&PRICE_FROM=0&PRICE_TO=1000&ESTATE_SIZE/LIVING_AREA_FROM=40"

//"https://www.willhaben.at/iad/immobilien/mietwohnungen/mietwohnung-angebote?sfId=3b261340-8744-4ef9-961d-5cebd78fac60&isNavigation=true&rows=90&areaId=101&areaId=102&areaId=103&areaId=106&areaId=107&areaId=301&areaId=302&areaId=304&areaId=305&areaId=306&areaId=307&areaId=308&areaId=312&areaId=313&areaId=316&areaId=317&areaId=318&areaId=321&areaId=323&FREE_AREA/FREE_AREA_TYPE=20&FREE_AREA/FREE_AREA_TYPE=40&FREE_AREA/FREE_AREA_TYPE=60&FREE_AREA/FREE_AREA_TYPE=30&FREE_AREA/FREE_AREA_TYPE=10&FREE_AREA/FREE_AREA_TYPE=50&ESTATE_SIZE/LIVING_AREA_FROM=40&ESTATE_SIZE/LIVING_AREA_TO=95&PRICE_FROM=0&PRICE_TO=1000"

// https://www.willhaben.at/iad/immobilien/mietwohnungen/mietwohnung-angebote?sfId=3b261340-8744-4ef9-961d-5cebd78fac60&isNavigation=true&rows=90&areaId=101&areaId=102&areaId=103&areaId=106&areaId=107&areaId=301&areaId=302&areaId=304&areaId=305&areaId=306&areaId=307&areaId=308&areaId=312&areaId=313&areaId=316&areaId=317&areaId=318&areaId=321&areaId=323&FREE_AREA/FREE_AREA_TYPE=20&FREE_AREA/FREE_AREA_TYPE=40&FREE_AREA/FREE_AREA_TYPE=60&FREE_AREA/FREE_AREA_TYPE=30&FREE_AREA/FREE_AREA_TYPE=10&FREE_AREA/FREE_AREA_TYPE=50&page=1&PRICE_FROM=0&PRICE_TO=1000&ESTATE_SIZE/LIVING_AREA_FROM=40
// https://www.willhaben.at/iad/immobilien/mietwohnungen/mietwohnung-angebote?sfId=3b261340-8744-4ef9-961d-5cebd78fac60&isNavigation=true&rows=90&areaId=101&areaId=102&areaId=103&areaId=106&areaId=107&areaId=301&areaId=302&areaId=304&areaId=305&areaId=306&areaId=307&areaId=308&areaId=312&areaId=313&areaId=316&areaId=317&areaId=318&areaId=321&areaId=323&FREE_AREA/FREE_AREA_TYPE=20&FREE_AREA/FREE_AREA_TYPE=40&FREE_AREA/FREE_AREA_TYPE=60&FREE_AREA/FREE_AREA_TYPE=30&FREE_AREA/FREE_AREA_TYPE=10&FREE_AREA/FREE_AREA_TYPE=50&ESTATE_SIZE/LIVING_AREA_FROM=40&ESTATE_SIZE/LIVING_AREA_TO=95&PRICE_FROM=0&PRICE_TO=1000

let page = 1;
let existNext = true;
const result = [];

const detailResult = []

while (existNext) {
  const pageStr = `&page=${page}`;
  const url = `${baseUrl}${pageStr}`;

  const document = await fetchUrl(url);

  if (!document) {
    console.log("Error in fetching the page, exiting.");
    break;
  }

  // Parse JSON from the document using jsdom
  const raw = document.querySelector("#__NEXT_DATA__").textContent;
  const json = JSON.parse(raw);
  const adverts = json.props.pageProps.searchResult.advertSummaryList.advertSummary;

  result.push(...adverts);

  console.log(page, result.length)
  if (adverts.length === 0) {
    existNext = false;
  } else {
    page += 1;
  }
}

const convertedResults = []

for (let i = 0; i < result.length; i++) {
  /**
   * @type {import("../../static/jsDocs/willhabenEstate.js").WillHabenEstate}
   */
  const advert = result[i]

  console.log(i);
  
  let newObj = await convertAdvertToObject(advert)
  if (newObj === undefined) {
    continue
  }
  convertedResults.push({
    ...newObj,
    isGenossenschaft: advert.description.toLocaleLowerCase().includes("genossenschaft"),
    info: getValFromAttributeKeys(attributeKeys.bodyDyn, advert)
  })
  detailResult.push({
    willhabenObj: advert,
    ...newObj
  })
}


fs.writeFileSync("result.json", JSON.stringify(convertedResults, undefined, 4))
fs.writeFileSync("detailResult.json", JSON.stringify(detailResult, undefined, 4))
