const DEFAULT_NUM_ROWS = 10
let streakTableBody = document.getElementById("streak-table")
let showAllButton = document.getElementById("show-all-button")
let clearAllButton = document.getElementById("clear-all-button")
let urlSearchBar = document.getElementById("url-search")
let deleteConfirmationLightBox = document.getElementById("delete-confirmation-lightbox")
let deconfirmDeletionButton = document.getElementById("close-delete-confirmation-button")
let confirmDeletionButton = document.getElementById("confirm-deletion-button")
let deletionConfirmationText = document.getElementById("deletion-confirmation-text")
let allShown = false
let responseData

function entryMore(a, b) {
    return b[1].visits - a[1].visits
}

function displayResponseAsTable(numRows){
    let count = 1
    for (const [key, value] of Object.entries(responseData).sort(entryMore).slice(0, numRows)){
        // Create and add table rows
        const newRow = document.createElement("tr")
        newRow.className = count % 2 == 0 ? "even-table-row" : "odd-table-row"

        const newURL = document.createElement("td")
        newURL.textContent = key
        const newVisists = document.createElement("td")
        newVisists.textContent = value.visits
        
        newRow.appendChild(newURL)
        newRow.appendChild(newVisists)
        streakTableBody.appendChild(newRow)

        count += 1
    }
}

// Request all page visit counts from service worker and update the table
function getDataAndUpdateTable(){
    chrome.runtime.sendMessage({action: "GET_DATABASE"}, (response) => {
        responseData = response.data
        displayResponseAsTable(DEFAULT_NUM_ROWS)
    })
}

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

clearAllButton.addEventListener("click", () => {
    deleteConfirmationLightBox.style.display = "flex"
})

deconfirmDeletionButton.addEventListener("click", () => {
    deleteConfirmationLightBox.style.display = "none"
})

confirmDeletionButton.addEventListener("click", () => {
    deletionConfirmationText.textContent = "Clearing all streaks..."
    chrome.runtime.sendMessage({action: "CLEAR_ALL"}, (response) => {
        streakTableBody.replaceChildren()
        getDataAndUpdateTable()
        deleteConfirmationLightBox.style.display = "none"
        deletionConfirmationText.textContent = "Are you sure you want to clear all history?"
    })
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

getDataAndUpdateTable()