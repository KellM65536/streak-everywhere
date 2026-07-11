const DEFAULT_NUM_ROWS = 10
let streakTableBody = document.getElementById("streak-table")
let showAllButton = document.getElementById("show-all-button")
let urlSearchBar = document.getElementById("url-search")
let allShown = false
let responseData

function entryMore(a, b) {
    return b[1].visits - a[1].visits
}

function displayResponseAsTable(numRows){
    for (const [key, value] of Object.entries(responseData).sort(entryMore).slice(0, numRows)){
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
}

// Request all page visit counts from service worker
chrome.runtime.sendMessage({action: "GET_DATABASE"}, (response) => {
    responseData = response.data
    displayResponseAsTable(DEFAULT_NUM_ROWS)
})

showAllButton.addEventListener("click", () => {
    streakTableBody.replaceChildren()

    if(allShown){
        displayResponseAsTable(DEFAULT_NUM_ROWS)
        showAllButton.textContent = "Load All"
        allShown = false
    } else {
        displayResponseAsTable()
        showAllButton.textContent = "Load Less"
        allShown = true
    }
})

// Search bar functionality
urlSearchBar.addEventListener("keyup", () => {
    let query = urlSearchBar.value.toLowerCase()

    for(row of streakTableBody.getElementsByTagName("tr")){
        let urlName = row.getElementsByTagName("td")[0].textContent.toLowerCase()
        console.log(urlName)

        row.style.display = urlName.includes(query) ? "" : "none"
    }
})