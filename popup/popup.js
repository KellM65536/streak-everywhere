let streakTableBody = document.getElementById("streak-table")

// Request all page visit counts from service worker
chrome.runtime.sendMessage({action: "GET_DATABASE"}, (response) => {
    for (const [key, value] of Object.entries(response.data)){
        // Create and add table rows
        const newRow = document.createElement("tr")
        const newURL = document.createElement("td")
        newURL.textContent = key
        const newVisists = document.createElement("td")
        newVisists.textContent = value.visits
        
        newRow.appendChild(newURL)
        newRow.appendChild(newVisists)
        streakTableBody.appendChild(newRow)
    }
})