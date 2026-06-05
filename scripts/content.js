console.log("Testing, testing, 1 2 3")

chrome.runtime.sendMessage({action: "GET_DATA"}, (response) => {
    console.log(response.data)
})

// chrome.runtime.onMessage.addListener( () => {
    
// }
// )

// chrome.storage.session.get("www.google.com").then(
//     function(value){
//         console.log(value["www.google.com"])
//     }
// )

const popupDiv = document.createElement("div")
popupDiv.style = "width: 100px; " + 
    "height: 100px; " + 
    "background-color: white; " +
    "position: fixed; " +
    "top: 0px;"

popupDiv.innerHTML = ""

// Adds the popup
// const mainBody = document.body
// mainBody.appendChild(popupDiv);