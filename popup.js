let streakTableBody = document.getElementById("streak-table")

console.log("i ran!")

// Request all page visit counts from service worker
chrome.runtime.sendMessage({action: "GET_DATABASE"}, (response) => {
    console.log("I got a response! (I think)")
    console.log(response.data)

    for (const [key, value] of Object.entries(response.data)){
        const newRow = document.createElement("tr")
        const newURL = document.createElement("td")
        newURL.textContent = key
        const newVisists = document.createElement("td")
        newVisists.textContent = value.visits
        
        newRow.appendChild(newURL)
        newRow.appendChild(newVisists)
        streakTableBody.appendChild(newRow)
    }
    
    // if(window.location.hostname in response.data){
    //     const hostname = window.location.hostname
    //     const numVisits = response.data[hostname].visits

    //     createStreakPopup(hostname, numVisits)
    // }
})