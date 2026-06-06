function animatePopIn(element){
    const SECOND_IN_FRAMES = 200
    let animationFrame = 0
    let id = null
    let y = -10.0
    let yVel = 6.0

    clearInterval(id);
    id = setInterval(stepPopIn, 5);

    element.addEventListener("click", () => {
        clearInterval(id);
        element.remove()
    })

    function stepPopIn(){
        if(animationFrame < SECOND_IN_FRAMES * 0.3){
            y += yVel
            yVel *= 0.5
            element.style.top = y + "rem"
        } else if (animationFrame < SECOND_IN_FRAMES * 3.3) {
            yVel = -6.0
        } else if (animationFrame < SECOND_IN_FRAMES * 3.6) {
            y += yVel
            yVel *= 0.5
            element.style.top = y + "rem"
        } else {
            clearInterval(id)
            element.remove()
        }

        animationFrame += 1
    }
}

function createStreakPopup(hostname, numVisits) {
    const popupDiv = document.createElement("div")
    popupDiv.style.all = "revert"
    popupDiv.style.width = "20rem" 
    popupDiv.style.height = "7rem"
    popupDiv.style.backgroundColor = "white"
    popupDiv.style.color = "black"
    popupDiv.style.position = "fixed"
    popupDiv.style.left =  "1rem"
    popupDiv.style.padding = "1rem"
    popupDiv.style.borderRadius = "1.5rem"
    popupDiv.style.borderWidth = "1rem"
    popupDiv.style.borderColor = "#666666"
    popupDiv.style.zIndex = "999999"

    const mainNumberDiv = document.createElement("div")
    mainNumberDiv.style.all = "revert"
    mainNumberDiv.style.display = "flex"
    mainNumberDiv.style.height = "75%"
    mainNumberDiv.style.width = "80%"

    popupDiv.appendChild(mainNumberDiv)

    const bigNumber = document.createElement("h1")
    bigNumber.style.all = "revert"
    bigNumber.textContent = numVisits
    bigNumber.style.marginTop = "auto"
    bigNumber.style.fontSize = "3.5rem"
    bigNumber.style.marginRight = "0.5rem"

    const middleLabelDiv = document.createElement("div")
    middleLabelDiv.style.all = "revert"
    middleLabelDiv.style.display = "flex"
    middleLabelDiv.style.flexDirection = "column"

    const domainText = document.createElement("p")
    domainText.style.all = "revert"
    domainText.textContent = hostname

    const visitsTextLabel = document.createElement("p")
    visitsTextLabel.style.all = "revert"
    visitsTextLabel.textContent = "visits"

    middleLabelDiv.append(domainText, visitsTextLabel)
    mainNumberDiv.append(bigNumber, middleLabelDiv)

    const weekProgress = document.createElement("progress")
    weekProgress.style.all = "revert"
    weekProgress.max = 7
    weekProgress.value = numVisits % 7 == 0 ? 7 : numVisits % 7
    weekProgress.style.width = "70%"
    weekProgress.style.position = "relative"
    weekProgress.style.bottom = "50%"
    weekProgress.style.accentColor = "red"
    weekProgress.style.display = "inline-block"
    popupDiv.appendChild(weekProgress)

    const imageDiv = document.createElement("div")
    imageDiv.style.all = "revert"
    imageDiv.style.display = "inline-block"
    imageDiv.style.width = "25%"
    imageDiv.style.position = "relative"
    imageDiv.style.bottom = "50%"

    popupDiv.appendChild(imageDiv)

    const streakImage = document.createElement("img")
    streakImage.style.all = "revert"

    // Change image based on week streak
    const imageUrl = numVisits % 7 == 0 ? chrome.runtime.getURL("images/full_fire_streak.png"):
        numVisits > 6 ? chrome.runtime.getURL("images/dim_fire_streak.png"):
        chrome.runtime.getURL("images/no_fire_streak.png")

    streakImage.src = imageUrl
    streakImage.alt = "Image of fire";
    streakImage.style.width = "100%"

    imageDiv.appendChild(streakImage)

    const weekNumberDiv = document.createElement("div")
    weekNumberDiv.style.all = "revert"
    weekNumberDiv.style.position = "absolute"
    weekNumberDiv.style.top = "50%"
    weekNumberDiv.style.left = "50%"
    weekNumberDiv.style.transform = "translate(-50%, -50%)"

    imageDiv.appendChild(weekNumberDiv)

    const weekNumber = document.createElement("h2")
    weekNumber.style.all = "revert"
    weekNumber.textContent = Math.floor(numVisits / 7)
    weekNumber.style.fontSize = "2rem"
    weekNumberDiv.appendChild(weekNumber)

    // Adds the popup
    const mainBody = document.body
    mainBody.appendChild(popupDiv);

    animatePopIn(popupDiv)
}

// Request page visit counts from service worker
chrome.runtime.sendMessage({action: "GET_DATA"}, (response) => {
    const hostname = window.location.hostname
    const numVisits = response.data[hostname].visits

    console.log(hostname)
    console.log(numVisits)

    // Create elements for popup
    createStreakPopup(hostname, numVisits)
})