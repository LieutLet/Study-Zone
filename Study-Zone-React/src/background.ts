import browser from "webextension-polyfill";
/// <reference types="chrome" />
const webMap = new Map();

// let networkFilters = {
//     urls: ["https://www.youtube.com/*"]
// }

const blockUrls: string[] = [];
const URL_PREFIX: string = "||";

//webMap.set("Youtube", "https://www.youtube.com");

//Purpose: reslove any issues with typescript when trying to catch and print an error message
//Precondition: error
//Postcondition: the error message or a string
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  // Fallback for cases where non-Error values are thrown (e.g., a string or object)
  return String(error);
}

//Purpose: add a new domain name to the list of blocked domains
//Precondition: a valid url of type string
//Postcondition: the list is updated
const updateRules = async (newDomainName: string) => {
  //Ensure validity of url.
  try {
    new URL(newDomainName);
  } catch (error) {
    const message = getErrorMessage(error);
    console.error("invalid url: " + message);
  }

  // ********************************************************************************** //
  // Add all currently blocked urls to a list of new ones
  // then replace all current rules with the new rules.
  // ********************************************************************************** //

  newDomainName = URL_PREFIX + newDomainName;

  const newRules: any[] = [
    {
      id: 1,
      priority: 1,
      action: { type: "block" },
      condition: {
        urlFilter: newDomainName,
        resourceTypes: ["main_frame"],
      },
    },
  ];
  blockUrls.forEach((domain, index) => {
    newRules.push({
      id: index + 2,
      priority: 1,
      action: { type: "block" },
      condition: { urlFilter: domain, resourceTypes: ["main_frame"] },
    });
  });

  try {
    chrome.declarativeNetRequest.getDynamicRules(async (previousRules) => {
      const previousRuleIds = previousRules.map((rule) => rule.id);
      try {
        await chrome.declarativeNetRequest.updateDynamicRules({
          removeRuleIds: previousRuleIds,
          addRules: newRules,
        });
      } catch (err) {
        console.error(`line 70 updateDynamicRules ${err}`);
      }
    });
    console.log("Successfully added rule");
    console.log(await browser.declarativeNetRequest.getDynamicRules());
  } catch (err) {
    console.error("getDynamicRules" + err);
  }
};

// ********************************************************************************************** //
// Purpose: clear all rules                                                                       //
// Precondition: function is ccalled                                                              //
// Postcondition: no rules, nothing should be blocked                                             //
// ********************************************************************************************** //
const clearRules = async () => {
  try {
    chrome.declarativeNetRequest.getDynamicRules(async (previousRules) => {
      const previousRuleIds = previousRules.map((rule) => rule.id);
      try {
        await chrome.declarativeNetRequest.updateDynamicRules({
          removeRuleIds: previousRuleIds,
        });
      } catch (err) {
        console.error(`line 97 updateDynamicRules ${err}`);
      }
    });
    console.log("Successfully cleared rules");
  } catch (err) {
    console.error("getDynamicRules(clearRules)" + err);
  }
};

// ********************************************************************************************** //
// Purpose: Fetch the url and make sure it isn't already blocked                                  //
// Precondition: The add button is clicked                                                        //
// Postcondition: updateRules is called and is passed the url                                     //
// ********************************************************************************************** //
const handleAddWebsite = async (siteName: string, domainName: string) => {
  console.log("add button has been clicked");

  if (siteName.length <= 0) {
    throw new Error(siteName + "name too short");
  }

  try {
    webMap.set(siteName, domainName);
  } catch (error) {
    const message = getErrorMessage(error);
    console.error(message);
  }

  updateRules(domainName);
};

// ********************************************************************************************** //
// Purpose: Completely clear the list of rules and sites from the map                             //
// Precondition: clear sites button clicked                                                       //
// Postcondition: map is empty, rules are empty (through a function call to clearRules)           //
// ********************************************************************************************** //
const handleClear = () => {
  webMap.clear();

  clearRules();
};

export { handleAddWebsite, handleClear };
