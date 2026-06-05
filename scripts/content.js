console.log("Testing, testing, 1 2 3")

// Request page visit counts from service worker
chrome.runtime.sendMessage({action: "GET_DATA"}, (response) => {
    console.log(response.data)
})

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