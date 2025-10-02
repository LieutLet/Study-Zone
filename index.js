//map to hold the websites that need to be blocked
const webMap = new Map();

function getDomainName(url) {
  try {
    const urlObject = new URL(url);
    return urlObject.hostname;
  } catch (error) {
    console.error("Invalid URL:", error);
    window.alert("The URL provided is invalid. Please enter a valid URL.");
    return null; // Or handle the error as appropriate for your application
  }
}

function addWebsitePage(){
    window.location.href = "addPage.html";
}

function editWebsite(){
    windoow.location.href = "editPage.html";
}

function deleteWebsite(){
    //Delete the website from the map

    //Delete the website from index.html
}

function homePage(){
    window.location.href = "index.html";
}

function addWebsite(){
    let siteName = document.getElementById("webName").value;
    let url = document.getElementById("URL").value;

    url = getDomainName(url);

    //Check for if the website is already in the list
    /*for (let i = 0; i < websites.length; i++) {
        if (websites[i].getName() === siteName) {
            window.alert(siteName + " is already in the list of blocked websites.");
            return;
        }*/
    
    try{
        if (webMap.has(url))  {
            throw new Error(url + " is already in the list of blocked websites.");
        }
    }
    catch(error){
        window.alert(error.message);
        return;
    }

    let newWebsite = new websiteToBlock(siteName, url);
    webMap.set(url, newWebsite);

    //Clear the input fields
    document.getElementById("webName").value = "";
    document.getElementById("URL").value = "";
    window.alert(siteName + " has been added to the list of blocked websites.");

    //Add to new website to index.html
    let newDiv = document.createElement("div");
    newDiv.className = "website";

    newDiv.innerHTML = 
}

class websiteToBlock{
    constructor(siteName, url){
        this.siteName = siteName;
        this.url = url;
    }

    editName(newName){
        if (this.siteName != newName) {
            this.siteName = newName;
        } else {
            window.alert( newName + " is already the name of this website.");
        }
    }

    editUrl(newUrl){
        if (this.url != newUrl) {
            this.url = newUrl;
        } else {
            window.alert( newUrl + " is already the address for this website.");
        }
    }

    getName(){
        return this.siteName;
    }

    getUrl(){
        return this.url;
    }
}

