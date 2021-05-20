chrome.contextMenus.create({ 
    id: 'HeadlineFetcher',
    title: 'View Signalclout Profile',
    contexts: ['all']
  });

chrome.contextMenus.onClicked.addListener(() => {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, {type: 'viewScProfile'});
    });
});