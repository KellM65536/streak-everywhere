const DAY_IN_MS = 24 * 60 * 60 * 1000

// Send page visit counts to content script on request
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const today = Math.round(Date.now() / DAY_IN_MS)

  if(message.action == "GET_DATA"){    
    const tabURL = message.hostname

    chrome.storage.sync.get(tabURL).then(async (value) => {
      let newThingy = {}
      let currentEntryValue = value[tabURL]

      if(currentEntryValue){
        // Site visited before
        if(today - currentEntryValue.lastVisit >= 1) {
          // It's been a day since last visit
          
          if(today - currentEntryValue.lastVisit >= 2){
            // Been 2 or more days, end streak
            newThingy[tabURL] = {
              visits: 1,
              lastVisit: today,
            }

          } else {
            // Less than 2 days, streak is fine

            newThingy[tabURL] = {
              visits: currentEntryValue.visits + 1,
              lastVisit: today,
            }
          }

          // Update storage
          await chrome.storage.sync.set(
            newThingy
          )
        }
      } else {
        // Completely new site
        newThingy[tabURL] = 
        {
          visits: 1,
          lastVisit: today,
        }

        // Update storage and send response
        await chrome.storage.sync.set(
          newThingy
        )
      }
      
      sendResponse({data: newThingy})
    })
  } else if (message.action == "GET_DATABASE") {
    chrome.storage.sync.get().then(async (value) => {
      checkForEndedStreaks(today)
      sendResponse({data: value})
    })
  }

  return true
})

// TODO test me
async function checkForEndedStreaks(today){
  chrome.storage.sync.get().then(async (value) => {
    let newThingies = {}

    for([key, item] of Object.entries(value)){
      if(item.visits > 0 && today - item.lastVisit >= 2){
        newThingies[key] = {
          visits: 0,
          lastVisit: item.lastVisit,
        }
      }
    } // end for loop

    await chrome.storage.sync.set(
      newThingies
    )
  })
}