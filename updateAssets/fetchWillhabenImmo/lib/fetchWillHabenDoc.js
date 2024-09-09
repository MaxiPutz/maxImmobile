import fetch from 'node-fetch'; 
import { JSDOM } from 'jsdom';

export const fetchUrl = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.text();

    // Parse HTML using jsdom
    const dom = new JSDOM(data);
    const document = dom.window.document;

    return document;
  } catch (error) {
    console.error('Error fetching the URL:', error);
    return null;
  }
};