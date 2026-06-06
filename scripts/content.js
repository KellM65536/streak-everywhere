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
    // bigNumber.style.textAlign = "right"
    bigNumber.style.marginTop = "auto"
    bigNumber.style.fontSize = "3.5rem"
    bigNumber.style.marginRight = "0.5rem"

    const middleLabelDiv = document.createElement("div")
    middleLabelDiv.style.display = "flex"
    middleLabelDiv.style.flexDirection = "column"

    const domainText = document.createElement("p")
    domainText.textContent = hostname

    const visitsTextLabel = document.createElement("p")
    visitsTextLabel.textContent = "visits"

    middleLabelDiv.append(domainText, visitsTextLabel)
    mainNumberDiv.append(bigNumber, middleLabelDiv)

    const weekProgress = document.createElement("progress")
    weekProgress.max = 7
    weekProgress.value = numVisits % 8
    weekProgress.style.width = "70%"
    weekProgress.style.position = "relative"
    weekProgress.style.bottom = "50%"
    weekProgress.style.accentColor = "red"
    weekProgress.style.display = "inline-block"
    // weekProgress.style.setProperty('--meter-color', "red");

    popupDiv.appendChild(weekProgress)

    // const weekNumber = document.createElement("h2")
    // const imageUrl = chrome.runtime.getURL("images/full_fire_streak.png")
    // weekNumber.textContent = "0"
    // weekNumber.style.fontSize = "2rem"
    // weekNumber.style.backgroundImage = "url('" + imageUrl + "')"
    // weekNumber.style.backgroundPosition = "center"
    // weekNumber.style.width = "30%"
    // weekNumber.style.display = "inline-block"
    // // bigNumber.style.marginRight = "0.5rem"
    // popupDiv.appendChild(weekNumber)

    const imageDiv = document.createElement("div")
    imageDiv.style.display = "inline-block"
    imageDiv.style.width = "25%"
    imageDiv.style.position = "relative"
    imageDiv.style.bottom = "50%"

    popupDiv.appendChild(imageDiv)

    const streakImage = document.createElement("img")
    const imageUrl = chrome.runtime.getURL("images/full_fire_streak.png")
    // streakImage.src = chrome.runtime.getURL("images/full fire streak.png")
    streakImage.src = imageUrl
    streakImage.alt = "Image of fire";
    // streakImage.style.width = "25%"
    streakImage.style.width = "100%"
    // streakImage.style.position = "relative"
    // streakImage.style.bottom = "50%"

    imageDiv.appendChild(streakImage)

    const weekNumberDiv = document.createElement("div")
    weekNumberDiv.style.position = "absolute"
    weekNumberDiv.style.top = "50%"
    weekNumberDiv.style.left = "50%"
    weekNumberDiv.style.transform = "translate(-50%, -50%)"

    imageDiv.appendChild(weekNumberDiv)

    const weekNumber = document.createElement("h2")
    weekNumber.textContent = "0"
    weekNumber.style.fontSize = "2rem"
    // weekNumber.style.width = "30%"
    // weekNumber.style.display = "inline-block"
    // bigNumber.style.marginRight = "0.5rem"

    weekNumberDiv.appendChild(weekNumber)
    
    

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