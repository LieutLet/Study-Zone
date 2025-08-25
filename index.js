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
}