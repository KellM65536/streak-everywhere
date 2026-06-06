const DAY_IN_MS = 1000 * 3//24 * 60 * 60 * 1000

// Send page visit counts to content script on request
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if(message.action == "GET_DATA"){
    console.log("Recieved signal")
    
    // START BLOCK

    const tabURL = message.hostname
    // const tabLastAccess = tab.lastAccessed

    chrome.storage.session.get(tabURL).then(async (value) => {
      const today = Math.round(Date.now() / DAY_IN_MS)

      newThingy = {}

      if(value[tabURL]){
        // Site visited before
        console.log("visited site")
        if(today - value[tabURL].lastVisit >= 1) {
          // It's been a day since last visit
          
          if(today - value[tabURL].lastVisit >= 2){
            // Been 2 or more days, end streak
            newThingy[tabURL] = {
              visits: 1,
              lastVisit: today,
            }

          } else {
            // Less than 2 days, streak is find

            newThingy[tabURL] = {
              visits: value[tabURL].visits + 1,
              lastVisit: today,
            }
          }

          // Update storage
          await chrome.storage.session.set(
            newThingy
          )
          
          // console.log(newThingy)
          // sendResponse({data: newThingy})
        }
      } else {
        // Completely new site
        console.log("new site")
        newThingy[tabURL] = 
        {
          visits: 1,
          lastVisit: today,
        }

        // Update storage and send response
        await chrome.storage.session.set(
          newThingy
        )

        // console.log(newThingy)
        // sendResponse({data: newThingy})

      }
      
      sendResponse({data: newThingy})
    })

    // Printing for debugging
    // console.log(await chrome.storage.session.get())

    // END BLOCK

    // chrome.storage.session.get().then((value) => {
    //     sendResponse({data: value})
    //   }
    // )
  }

  return true
})

// async function updateStreaks(tabId, changeInfo, tab){
//   const tabURL = new URL(tab.url).hostname
//   // const tabLastAccess = tab.lastAccessed

//   chrome.storage.session.get(tabURL).then(async (value) => {
//       newThingy = {}
//       const today = Math.round(Date.now() / DAY_IN_MS)

//       if(value[tabURL]){
//         // Site visited before
        
//         if(today - value[tabURL].lastVisit >= 1) {
//           // It's been a day since last visit
          
//           if(today - value[tabURL].lastVisit >= 2){
//             // Been 2 or more days, end streak
//             newThingy[tabURL] = {
//               visits: 1,
//               lastVisit: today,
//             }

//           } else {
//             // Less than 2 days, streak is find

//             newThingy[tabURL] = {
//               visits: value[tabURL].visits + 1,
//               lastVisit: today,
//             }
//           }

//           // Update storage
//           await chrome.storage.session.set(
//             newThingy
//           )
//         }
//       } else {
//         // Completely new site

//         newThingy[tabURL] = 
//         {
//           visits: 1,
//           lastVisit: today,
//         }

//         // Update storage
//         await chrome.storage.session.set(
//           newThingy
//         )
//       }
//     }
//   )

//   // Printing for debugging
//   console.log(await chrome.storage.session.get())
// }

// chrome.tabs.onUpdated.addListener(updateStreaks)