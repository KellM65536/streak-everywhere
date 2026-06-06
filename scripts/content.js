console.log("Testing, testing, 1 2 3")



// Request page visit counts from service worker
chrome.runtime.sendMessage({action: "GET_DATA"}, (response) => {
    const hostname = window.location.hostname
    const numVisits = response.data[hostname].visits

    console.log(hostname)
    console.log(numVisits)

    // Create elements for popup
    const popupDiv = document.createElement("div")
    popupDiv.style.width = "20rem" 
    popupDiv.style.height = "5rem"
    popupDiv.style.backgroundColor = "white"
    popupDiv.style.color = "black"
    popupDiv.style.position = "fixed"
    popupDiv.style.top =  "20px"
    popupDiv.style.left =  "20px"
    // popupDiv.style.overflow = "scroll"

    const mainNumberDiv = document.createElement("div")
    // mainNumberDiv.style.gridTemplateColumns = "repeat(4, 1fr)"
    // mainNumberDiv.style.gridTemplateRows = "repeat(2, 1fr)"
    mainNumberDiv.style.display = "flex"

    popupDiv.appendChild(mainNumberDiv)

    const bigNumber = document.createElement("h1")
    bigNumber.textContent = numVisits
    // bigNumber.style.gridRow = "span 3 / span 3"
    bigNumber.style.textAlign = "right"
    // bigNumber.style.display = "block"
    // bigNumber.style.alignSelf = "end"
    // bigNumber.style.verticalAlign = "bottom"
    // bigNumber.style.display = "inline"
    // bigNumber.style.width = "100%"
    bigNumber.style.marginTop = "auto"
    // bigNumber.style.flexShrink = "2"
    bigNumber.style.fontSize = "5rem"

    const middleLabelDiv = document.createElement("div")
    middleLabelDiv.style.display = "flex"
    middleLabelDiv.style.flexDirection = "column"

    const domainText = document.createElement("p")
    domainText.textContent = hostname
    // domainText.style.gridColumn = "span 3 / span 3"
    // domainText.style.gridColumnStart = "2"
    // domainText.style.gridRowStart = "2"
    // domainText.style.display = "block"
    // domainText.style.display = "inline"

    const visitsTextLabel = document.createElement("p")
    visitsTextLabel.textContent = "visits"
    // visitsTextLabel.style.gridColumn = "span 3 / span 3"
    // visitsTextLabel.style.gridColumnStart = "2"
    // visitsTextLabel.style.gridRowStart = "1"
    // visitsTextLabel.style.display = "block"
    // visitsTextLabel.style.display = "inline"
    // visitsTextLabel.style.position = "relative"

    middleLabelDiv.append(domainText, visitsTextLabel)
    mainNumberDiv.append(bigNumber, middleLabelDiv)

    // popupDiv.appendChild(bigNumber)
    // popupDiv.appendChild(visitsTextLabel)

    // popupDiv.innerHTML = "<p> hello this guy got " + numVisits + " visits</p>"

    // Adds the popup
    const mainBody = document.body
    mainBody.appendChild(popupDiv);
})



// Adds the popup
// const mainBody = document.body
// mainBody.appendChild(popupDiv);