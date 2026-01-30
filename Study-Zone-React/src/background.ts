//Use a map and a array because the onBeforeRequest.addListener can only accept a string array into the filters argument
//Need the map for other purposes, like checking if the user already added that site to the filter, and dynamically displaying
//the name of the site.

import browser from "webextension-polyfill";
const webMap = new Map();
const filter: string[] = [];

let networkFilters = {
    urls: ["https://www.youtube.com/*"]
}

const handleAddWebsite = () => {
  console.log("add button has been clicked");

  //grab site info
  let url: string = "https://www.youtube.com";
  let siteName: string = "YouTube";

  //check if it already exists in the map
  //networkFilters.urls.push(url);


  webMap.set(url, siteName);
  console.log(webMap);
  console.log(filter);
};
//listener fuction

//webRequest

browser.webRequest.onBeforeRequest.addListener((details) => {
  console.log(`Blocking: ${details.url}`);
}, networkFilters, ["blocking"]);

export {handleAddWebsite, webMap};

