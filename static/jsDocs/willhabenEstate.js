/**
 * @typedef {Object} WillHabenEstate
 * @property {string} id - Unique identifier for the advert.
 * @property {number} verticalId - Identifier for the vertical category (e.g., real estate).
 * @property {number} adTypeId - Type of the advert (e.g., listing type).
 * @property {number} productId - Identifier for the product associated with the advert.
 * @property {Object} advertStatus - Status of the advert.
 * @property {string} advertStatus.id - Current status ID (e.g., "active").
 * @property {string} advertStatus.description - Description of the status.
 * @property {number} advertStatus.statusId - Numeric identifier for the status.
 * @property {string} description - A short description of the advert.
 * @property {Object} attributes - A list of attributes associated with the advert.
 * @property {Object[]} attributes.attribute - Array of attributes related to the property.
 * @property {string} attributes.attribute[].name - Name of the attribute (e.g., "LOCATION").
 * @property {string[]} attributes.attribute[].values - Array of values for the attribute.
 * @property {Object} advertImageList - List of images related to the advert.
 * @property {Object[]} advertImageList.advertImage - Array of image objects.
 * @property {number} advertImageList.advertImage[].id - Image identifier.
 * @property {string} advertImageList.advertImage[].name - Image file name.
 * @property {string} advertImageList.advertImage[].selfLink - API link to the image.
 * @property {string} advertImageList.advertImage[].description - Description of the image.
 * @property {string} advertImageList.advertImage[].mainImageUrl - URL for the main image.
 * @property {string} advertImageList.advertImage[].thumbnailImageUrl - URL for the thumbnail image.
 * @property {string} advertImageList.advertImage[].referenceImageUrl - URL for the reference image.
 * @property {Object[]} advertImageList.floorPlans - Array of floor plans (empty here).
 * @property {string} selfLink - API link to the full advert details.
 * @property {Object} contextLinkList - List of contextual links related to the advert.
 * @property {Object[]} contextLinkList.contextLink - Array of context link objects.
 * @property {string} contextLinkList.contextLink[].id - Identifier for the context link.
 * @property {string} contextLinkList.contextLink[].description - Description of the context link.
 * @property {string} contextLinkList.contextLink[].uri - Full URL for the context link.
 * @property {string} contextLinkList.contextLink[].relativePath - Relative path for the link.
 * @property {string} contextLinkList.contextLink[].serviceName - Service associated with the link.
 * @property {Object} advertiserInfo - Information about the advertiser.
 * @property {string} advertiserInfo.label - Name of the advertiser.
 * @property {string|null} advertiserInfo.iconSVG - SVG logo for the advertiser (if available).
 * @property {string|null} advertiserInfo.iconPNG - PNG logo for the advertiser (if available).
 * @property {string} advertiserInfo.iconType - Type of icon associated with the advertiser.
 * @property {string} upsellingOrganisationLogo - URL for the organization's logo.
 * @property {Object[]} teaserAttributes - Teaser attributes displayed for the advert.
 * @property {string|null} teaserAttributes.prefix - Optional prefix for the teaser attribute.
 * @property {string} teaserAttributes.value - Value of the teaser attribute.
 * @property {string} teaserAttributes.postfix - Optional postfix for the teaser attribute.
 * @property {null} children - Placeholder for potential child adverts or listings.
 */


/**
 * @typedef {Object} AttributeKeys
 * @property {string} disposed - Maps to the "DISPOSED" attribute.
 * @property {string} location - Maps to the "LOCATION" attribute.
 * @property {string} freeAreaTotal - Maps to the "FREE_AREA/FREE_AREA_AREA_TOTAL" attribute.
 * @property {string} postcode - Maps to the "POSTCODE" attribute.
 * @property {string} state - Maps to the "STATE" attribute.
 * @property {string} bodyDyn - Maps to the "BODY_DYN" attribute.
 * @property {string} orgUuid - Maps to the "ORG_UUID" attribute.
 * @property {string} estateLivingArea - Maps to the "ESTATE_SIZE/LIVING_AREA" attribute.
 * @property {string} district - Maps to the "DISTRICT" attribute.
 * @property {string} heading - Maps to the "HEADING" attribute.
 * @property {string} locationQuality - Maps to the "LOCATION_QUALITY" attribute.
 * @property {string} floor - Maps to the "FLOOR" attribute.
 * @property {string} published - Maps to the "PUBLISHED" attribute.
 * @property {string} country - Maps to the "COUNTRY" attribute.
 * @property {string} locationId - Maps to the "LOCATION_ID" attribute.
 * @property {string} propertyType - Maps to the "PROPERTY_TYPE" attribute.
 * @property {string} numberOfRooms - Maps to the "NUMBER_OF_ROOMS" attribute.
 * @property {string} adTypeId - Maps to the "ADTYPE_ID" attribute.
 * @property {string} propertyTypeId - Maps to the "PROPERTY_TYPE_ID" attribute.
 * @property {string} adId - Maps to the "ADID" attribute.
 * @property {string} orgId - Maps to the "ORGID" attribute.
 * @property {string} seoUrl - Maps to the "SEO_URL" attribute.
 * @property {string} freeAreaType - Maps to the "FREE_AREA_TYPE" attribute.
 * @property {string} allImageUrls - Maps to the "ALL_IMAGE_URLS" attribute.
 * @property {string} publishedString - Maps to the "PUBLISHED_String" attribute.
 * @property {string} estatePreference - Maps to the "ESTATE_PREFERENCE" attribute.
 * @property {string} categoryTreeIds - Maps to the "categorytreeids" attribute.
 * @property {string} rentPerMonth - Maps to the "RENT/PER_MONTH_LETTINGS" attribute.
 * @property {string} productId - Maps to the "PRODUCT_ID" attribute.
 * @property {string} isBumped - Maps to the "IS_BUMPED" attribute.
 * @property {string} mmo - Maps to the "MMO" attribute.
 * @property {string} rooms - Maps to the "ROOMS" attribute.
 * @property {string} adUuid - Maps to the "AD_UUID" attribute.
 * @property {string} coordinates - Maps to the "COORDINATES" attribute.
 * @property {string} price - Maps to the "PRICE" attribute.
 * @property {string} priceForDisplay - Maps to the "PRICE_FOR_DISPLAY" attribute.
 * @property {string} estateSize - Maps to the "ESTATE_SIZE" attribute.
 * @property {string} isPrivate - Maps to the "ISPRIVATE" attribute.
 * @property {string} propertyTypeFlat - Maps to the "PROPERTY_TYPE_FLAT" attribute.
 * @property {string} freeAreaTypeName - Maps to the "FREE_AREA_TYPE_NAME" attribute.
 */

/**
 * @typedef {'DISPOSED' | 'LOCATION' | 'FREE_AREA/FREE_AREA_AREA_TOTAL' | 'POSTCODE' | 'STATE' | 'BODY_DYN' | 'ORG_UUID' | 'ESTATE_SIZE/LIVING_AREA' | 'DISTRICT' | 'HEADING' | 'LOCATION_QUALITY' | 'FLOOR' | 'PUBLISHED' | 'COUNTRY' | 'LOCATION_ID' | 'PROPERTY_TYPE' | 'NUMBER_OF_ROOMS' | 'ADTYPE_ID' | 'PROPERTY_TYPE_ID' | 'ADID' | 'ORGID' | 'SEO_URL' | 'FREE_AREA_TYPE' | 'ALL_IMAGE_URLS' | 'PUBLISHED_String' | 'ESTATE_PREFERENCE' | 'categorytreeids' | 'RENT/PER_MONTH_LETTINGS' | 'PRODUCT_ID' | 'IS_BUMPED' | 'MMO' | 'ROOMS' | 'AD_UUID' | 'COORDINATES' | 'PRICE' | 'PRICE_FOR_DISPLAY' | 'ESTATE_SIZE' | 'ISPRIVATE' | 'PROPERTY_TYPE_FLAT' | 'FREE_AREA_TYPE_NAME'} AttributeKey
 * Represents one of the possible attribute keys.
 */



export const attributeKeys = {
  disposed: 'DISPOSED',
  location: 'LOCATION',
  freeAreaTotal: 'FREE_AREA/FREE_AREA_AREA_TOTAL',
  postcode: 'POSTCODE',
  state: 'STATE',
  bodyDyn: 'BODY_DYN',
  orgUuid: 'ORG_UUID',
  estateLivingArea: 'ESTATE_SIZE/LIVING_AREA',
  district: 'DISTRICT',
  heading: 'HEADING',
  locationQuality: 'LOCATION_QUALITY',
  floor: 'FLOOR',
  published: 'PUBLISHED',
  country: 'COUNTRY',
  locationId: 'LOCATION_ID',
  propertyType: 'PROPERTY_TYPE',
  numberOfRooms: 'NUMBER_OF_ROOMS',
  adTypeId: 'ADTYPE_ID',
  propertyTypeId: 'PROPERTY_TYPE_ID',
  adId: 'ADID',
  orgId: 'ORGID',
  seoUrl: 'SEO_URL',
  freeAreaType: 'FREE_AREA_TYPE',
  allImageUrls: 'ALL_IMAGE_URLS',
  publishedString: 'PUBLISHED_String',
  estatePreference: 'ESTATE_PREFERENCE',
  categoryTreeIds: 'categorytreeids',
  rentPerMonth: 'RENT/PER_MONTH_LETTINGS',
  productId: 'PRODUCT_ID',
  isBumped: 'IS_BUMPED',
  mmo: 'MMO',
  rooms: 'ROOMS',
  adUuid: 'AD_UUID',
  coordinates: 'COORDINATES',
  price: 'PRICE',
  priceForDisplay: 'PRICE_FOR_DISPLAY',
  estateSize: 'ESTATE_SIZE',
  isPrivate: 'ISPRIVATE',
  propertyTypeFlat: 'PROPERTY_TYPE_FLAT',
  freeAreaTypeName: 'FREE_AREA_TYPE_NAME'
};

/**
 * @param {AttributeKey} attributeKey 
 * @param {WillHabenEstate} obj
 */
export const getValFromAttributeKeys = (attributeKey, obj) => {
  console.log(obj)
  const attribute = ( obj.attributes.attribute ).filter( (ele) => ele.name === (attributeKey) )

  console.log(attribute)
  return attribute[0].values
}


export{}