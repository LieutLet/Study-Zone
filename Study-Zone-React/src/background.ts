/// <reference types="chrome" />
import { webMap } from "./Map";
//const webMap = new Map();

//const blockUrls: string[] = [];
const URL_PREFIX: string = "||";

// ********************************************************************************************** //
//Purpose: reslove any issues with typescript when trying to catch and print an error message
//Precondition: error
//Postcondition: the error message or a string
// ********************************************************************************************** //
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  // Fallback for cases where non-Error values are thrown (e.g., a string or object)
  return String(error);
}

// ********************************************************************************************** //
//Purpose: update all rules from the webMap
//Precondition: webMap is updated
//Postcondition: rules are updated to match webMap
// ********************************************************************************************** //
const updateRules = async () => {
  const domains = Array.from(webMap.values());
  const newRules: any[] = domains.map((domain, index) => ({
    id: index + 1,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: URL_PREFIX + domain,
      resourceTypes: ["main_frame"],
    },
  }));

  try {
    chrome.declarativeNetRequest.getDynamicRules(async (previousRules) => {
      const previousRuleIds = previousRules.map((rule) => rule.id);
      try {
        await chrome.declarativeNetRequest.updateDynamicRules({
          removeRuleIds: previousRuleIds,
          addRules: newRules,
        });
      } catch (err) {
        console.error(`updateDynamicRules ${err}`);
      }
    });
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
      console.log("previousRulesIds: " + previousRuleIds);
      try {
        await chrome.declarativeNetRequest.updateDynamicRules({
          removeRuleIds: previousRuleIds,
        });
      } catch (err) {
        console.error(`line 97 updateDynamicRules ${err}`);
      }
    });
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
  if (!siteName || typeof siteName !== "string" || siteName.length <= 0) {
    throw new Error("Site name is required and must be a non-empty string");
  }
  if (!domainName || typeof domainName !== "string" || domainName.length <= 0) {
    throw new Error("Domain name is required and must be a non-empty string");
  }

  try {
    webMap.set(siteName, domainName);
  } catch (error) {
    const message = getErrorMessage(error);
    console.error(message);
  }

  //Add new webcard to the dom

  updateRules();
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

// ********************************************************************************************** //
// Purpose: to delete a site from the rules                                                       //
// Precondition: rule exists                                                                      //
// Postcondition: rule is removed                                                                 //
// ********************************************************************************************** //
const handleDelete = (siteName: string) => {
  if (webMap.has(siteName)) {
    webMap.delete(siteName);
    updateRules();
  } else {
    throw new Error(`${siteName} does not exist`);
  }
};

// ********************************************************************************************** //
// Purpose: allow user to edit the rule                                                           //
// Precondition: rules exist                                                                      //
// Postcondition: rules is changed                                                                //
// ********************************************************************************************** //
const handleEdit = (
  oldSiteName: string,
  newSiteName: string,
  newDomainName: string,
) => {
  if (!webMap.has(oldSiteName)) {
    throw new Error(`${oldSiteName} does not exist`);
  }

  if (newSiteName.length <= 0) {
    throw new Error("new site name too short");
  }

  webMap.delete(oldSiteName);
  webMap.set(newSiteName, newDomainName);
  updateRules();
};

/* const getRules = async () => {
  let rules: any;
  rules = await chrome.declarativeNetRequest.getDynamicRules();
};
getRules(); */

export { handleAddWebsite, handleClear, handleDelete, handleEdit };
