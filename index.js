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
    newWebsite.newDiv();
}

class websiteToBlock{
    constructor(siteName, url){
        this.siteName = siteName;
        this.url = url;
    }

    //creates an div element for the website, with the website name and url, and returns it
    newDiv(){
        //edit icon
        let lvl0Img1 = document.createElement("img");
        lvl0Img1.src = "/images/edit.svg";
        lvl0Img1.className = "item";
        lvl0Img1.id = "icon";
        lvl0Img1.onclick = editWebsite();

        //trash icon
        let lvl0Img2 = document.createElement("img");
        lvl0Img2.src = "/images/trash.svg";
        lvl0Img2.className = "item";
        lvl0Img2.id = "icon";
        lvl0Img2.onclick = deleteWebsite();

        //website name
        let lvl0div1 = document.createElement("div");
        lvl0div1.className = "item";
        lvl0div1.id = "website-name";
        lvl0div1.innerHTML = this.siteName;

        //website icon
        let lvl1div1 = document.createElement("div");
        lvl1div1.className = "item";
        let lvl1div2 = document.createElement("div");
        let lvl1div3 = document.createElement("div");
        let lvl2 = document.createElement("div");
        return newDiv;
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

