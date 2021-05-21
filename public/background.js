const sendExtStatus = (showing) => {
  chrome.runtime.sendMessage({ type: "EXT_STATUS", showing });
  console.log(
    "🚀 ~ file: background.js ~ line 5 ~ sendExtStatus ~ sendExtStatus",
    showing
  );
};

const sendExtStatusToContent = (showing) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      type: "EXT_STATUS_FOR_CONTENT",
      showing,
    });
  });
};

let showing = false;

// Get locally stored value
chrome.storage.local.get("showing", (res) => {
  if (res["showing"]) {
    showing = true;
  } else {
    showing = false;
  }
});

chrome.runtime.onMessage.addListener((message) => {
  switch (message.type) {
    case "REQ_EXT_STATUS_FROM_CONTENT":
      sendExtStatusToContent(showing);
      break;
    case "REQ_EXT_STATUS":
      sendExtStatus(showing);
      break;
    case "TOGGLE_EXT":
      showing = message.showing;
      chrome.storage.local.set({ showing: showing });
      sendExtStatus(showing);
      sendExtStatusToContent(showing);
      break;
    default:
      break;
  }
});
