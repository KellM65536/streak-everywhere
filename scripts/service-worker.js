async function updateStreaks(tabId, changeInfo, tab){
  const tabURL = new URL(tab.url).hostname
  // const tabURLString = tab.url
  chrome.storage.session.get(tabURL).then(
    async function(value) {
      newThingy = {}

      
      if(value[tabURL]){
        // Site visited before
        newThingy[tabURL] = value[tabURL] + 1
      } else {
        // Completely new site
        newThingy[tabURL] = 1
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