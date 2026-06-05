async function updateStreaks(tabId, changeInfo, tab){
  const tabURL = new URL(tab.url).hostname
  const tabLastAccess = tab.lastAccessed

  chrome.storage.session.get(tabURL).then(
    async function(value) {
      newThingy = {}

      if(value[tabURL]){
        // Site visited before
        // console.log("visited")
        // console.log(tabURL)
        newThingy[tabURL] = {
          visits: value[tabURL].visits + 1,
          lastVisit: tabLastAccess
        }

      } else {
        // Completely new site
        // console.log("not visited")
        newThingy[tabURL] = 
        {
          visits: 1,
          lastVisit: tabLastAccess
        }
      }

      // Update storage
      await chrome.storage.session.set(
        newThingy
      )
    }
  )

  // Printing for debugging
  console.log(await chrome.storage.session.get())
}

chrome.tabs.onUpdated.addListener(updateStreaks)