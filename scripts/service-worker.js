async function updateStreaks(tabId, changeInfo, tab){
  chrome.storage.session.get(tab.url).then(
    async function(value) {
      newThingy = {}
      
      if(value[tab.url]){
        // Site visited before
        newThingy[tab.url] = value[tab.url] + 1
      } else {
        // Completely new site
        newThingy[tab.url] = 1
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