const DAY_IN_MS = 1000 * 10 // 24 * 60 * 60 * 1000

// chrome.storage.session.get().then(
//   function(value) {
//     if(value){
//       chrome.runtime.sendMessage(
//         extensionId?: string,
//         message: any,
//         options?: object,
//       ): Promise<any>
//     } else {
//       chrome.offscreen.createDocument({
//         url: 'off_screen.html',
//         reasons: ['LOCAL_STORAGE'],
//         justification: 'Need to store domain names that the user has visited',
//       });
//     }
//   }
// )

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if(message.action == "GET_DATA"){
    console.log("Recieved signal")

    chrome.storage.session.get().then(
      (value) => {
        sendResponse({data: value})

        // ???
        // chrome.tabs.sendMessage(
        //   0,
        //   {
        //     action: "SEND_DATA",
        //     data: value 
        //   }
        // )

      }
    )

    // sendResponse({data: await chrome.storage.session.get()})
  }

  return true
})

async function updateStreaks(tabId, changeInfo, tab){
  const tabURL = new URL(tab.url).hostname
  const tabLastAccess = tab.lastAccessed

  chrome.storage.session.get(tabURL).then(
    async function(value) {
      newThingy = {}
      const today = Math.round(Date.now() / DAY_IN_MS)

      if(value[tabURL]){
        // Site visited before
        
        if(today - value[tabURL].lastVisit >= 1) {
          // It's been a day since last visit
                  
          newThingy[tabURL] = {
            visits: value[tabURL].visits + 1,
            lastVisit: today
          }

          // Update storage
          await chrome.storage.session.set(
            newThingy
          )
        }
      } else {
        // Completely new site

        newThingy[tabURL] = 
        {
          visits: 1,
          lastVisit: today
        }

        // Update storage
        await chrome.storage.session.set(
          newThingy
        )
      }
    }
  )

  // Printing for debugging
  console.log(await chrome.storage.session.get())
}

chrome.tabs.onUpdated.addListener(updateStreaks)