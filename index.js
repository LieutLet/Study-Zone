//array to hold the websites that need to be blocked
let websites = [];


function addWebsitePage(){
    window.location.href = "addPage.html";
}

function editWebsite(){

}

function deleteWebsite(){
    
}

function homePage(){
    window.location.href = "index.html";
}

function addWebsite(){
    let siteName = document.getElementById("webName").value;
    let url = document.getElementById("URL").value;

    //Check for if the website is already in the list
    for (let i = 0; i < websites.length; i++) {
        if (websites[i].getName() === siteName) {
            window.alert(siteName + " is already in the list of blocked websites.");
            return;
        }
    let newWebsite = new websiteToBlock(siteName, url);
    websites.push(newWebsite);

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

