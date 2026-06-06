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
    popupDiv.style.height = "7rem"
    popupDiv.style.backgroundColor = "white"
    popupDiv.style.color = "black"
    popupDiv.style.position = "fixed"
    popupDiv.style.top =  "20px"
    popupDiv.style.left =  "20px"
    popupDiv.style.padding = "0.1rem"

    const mainNumberDiv = document.createElement("div")
    mainNumberDiv.style.display = "flex"
    mainNumberDiv.style.height = "75%"
    mainNumberDiv.style.width = "80%"

    popupDiv.appendChild(mainNumberDiv)

    const bigNumber = document.createElement("h1")
    bigNumber.textContent = numVisits
    bigNumber.style.textAlign = "right"
    bigNumber.style.marginTop = "auto"
    bigNumber.style.fontSize = "3.5rem"

    const middleLabelDiv = document.createElement("div")
    middleLabelDiv.style.display = "flex"
    middleLabelDiv.style.flexDirection = "column"

    const domainText = document.createElement("p")
    domainText.textContent = hostname

    const visitsTextLabel = document.createElement("p")
    visitsTextLabel.textContent = "visits"

    middleLabelDiv.append(domainText, visitsTextLabel)
    mainNumberDiv.append(bigNumber, middleLabelDiv)

    const weekMeter = document.createElement("meter")
    weekMeter.max = 7
    weekMeter.value = numVisits % 8
    weekMeter.style.width = "70%"
    weekMeter.style.position = "relative"
    weekMeter.style.bottom = "50%"

    popupDiv.appendChild(weekMeter)

    const streakImage = document.createElement("img")
    const imageUrl = chrome.runtime.getURL("images/full_fire_streak.png")
    // streakImage.src = chrome.runtime.getURL("images/full fire streak.png")
    streakImage.src = imageUrl
    streakImage.alt = "Image of fire";
    streakImage.style.width = "25%"
    streakImage.style.position = "relative"
    streakImage.style.bottom = "50%"

    popupDiv.appendChild(streakImage)
    
    

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