import { ChromeMessage, Sender, MessageType } from "../types";

// setInterval(() => {
//   var xs = window.matchMedia("(max-width: 575.98px)")
//   if (xs.matches) {
//     console.log("xs!")
//     var btnEl = document.getElementById('trigger-btn')
//     btnEl?.setAttribute("style", "width: 30px; height: 30px; background: transparent; border: none; color: white; text-decoration: none; display: inline-block; font-size: 16px; position: absolute;  margin-left: auto; margin-right: auto; left: 0; right: 0; text-align: center; z-index: 2; top: 7rem; right: 40%;");
//   }

//   var sm = window.matchMedia("(min-width:576px) and (max-width: 767.98px)")
//   if (sm.matches) {
//     console.log("sm!")
//     var btnEl = document.getElementById('trigger-btn')
//     btnEl?.setAttribute("style", "width: 30px; height: 30px; background: transparent; border: none; color: white; text-decoration: none; display: inline-block; font-size: 16px; position: absolute;  margin-left: auto; margin-right: auto; left: 0; right: 0; text-align: center; z-index: 2; top: 7rem; right: 60%;");
//   }
//   var md = window.matchMedia("(min-width:768px) and (max-width: 991.98px)")
//   if (md.matches) {
//     console.log("md!")
//     var btnEl = document.getElementById('trigger-btn')
//     btnEl?.setAttribute("style", "width: 30px; height: 30px; background: transparent; border: none; color: white; text-decoration: none; display: inline-block; font-size: 16px; position: absolute;  margin-left: auto; margin-right: auto; left: 0; right: 0; text-align: center; z-index: 2; top: 7rem; right: 70%;");
//   }

//   var lg = window.matchMedia("(min-width:992px) and (max-width: 1199.98px)")
//   if (lg.matches) {
//     console.log("lg!")
//     var btnEl = document.getElementById('trigger-btn')
//     btnEl?.setAttribute("style", "width: 30px; height: 30px; background: transparent; border: none; color: white; text-decoration: none; display: inline-block; font-size: 16px; position: absolute;  margin-left: auto; margin-right: auto; left: 0; right: 0; text-align: center; z-index: 2; top: 5.5rem; right: 30%;");
//   }
//   var xl = window.matchMedia("(min-width:1200px)")
//   if (xl.matches) {
//     console.log("xl!")
//     var btnEl = document.getElementById('trigger-btn')
//     btnEl?.setAttribute("style", "width: 30px; height: 30px; background: transparent; border: none; color: white; text-decoration: none; display: inline-block; font-size: 16px; position: absolute;  margin-left: auto; margin-right: auto; left: 0; right: 0; text-align: center; z-index: 2; top: 5.5rem; right: 30%;");
//   }
// }, 1000)

function showSignalCloutBtn() {
  var bodyEl = document.body;
  var newBtn = document.createElement('button');
  newBtn.id = 'trigger-btn'
  newBtn.style.cssText = 'width: 30px; height: 30px; background: transparent; border: none; color: white; text-decoration: none; display: inline-block; font-size: 16px; position: absolute;  margin-left: auto; margin-right: auto; left: 0; right: 0; text-align: center; z-index: 2;'

  var newBtnImg = document.createElement('img')
  newBtnImg.src = 'https://www.signalclout.com/search-signalclout-brand.svg'
  newBtnImg.style.height = 'inherit'
  newBtnImg.style.height = 'inherit'
  newBtn.appendChild(newBtnImg)
  // bodyEl?.parentNode?.insertBefore(newBtn, bodyEl.nextSibling);
  bodyEl.prepend(newBtn)

  var modalDialog = document.createElement('dialog');
  modalDialog.id = 'signal-clout-view'
  modalDialog.style.margin = '0px'
  modalDialog.style.display = 'flex'
  modalDialog.style.minWidth = '100%'
  modalDialog.style.minHeight = '100%'
  modalDialog.style.height = '100%'
  modalDialog.style.padding = '0px'
  modalDialog.style.border = '0px solid'

  modalDialog.innerHTML = `<iframe id="iframe-sc" style="height:100%;width: 100%;border: 1px solid transparent;"></iframe>`;

  document.body.appendChild(modalDialog);

  const dialogInstance = document.getElementsByTagName("dialog")[0];

  const iframe = document.getElementById("iframe-sc");

  newBtn.addEventListener("click", function () {
    iframe?.setAttribute('src', chrome.extension.getURL("index.html"));
    dialogInstance?.showModal();
  });
}

chrome.runtime.sendMessage({ type: "REQ_EXT_STATUS_FROM_CONTENT" });

chrome.runtime.onMessage.addListener((message: MessageType) => {
  switch (message.type) {
    case "EXT_STATUS_FOR_CONTENT":
      if (message.showing === true) {
        var isExist = document.getElementById('trigger-btn')

        if (!isExist) {
          showSignalCloutBtn()
        }
      }
      break;
    default:
      break;
  }
});

const messagesFromReactAppListener = (
  message: ChromeMessage,
  sender: any,
  response: any
) => {
  console.log("[content.js]. Message received", {
    message,
    sender,
  });

  if (
    sender.id === chrome.runtime.id &&
    message.from === Sender.React &&
    message.message === "hide dialog"
  ) {

    document.querySelector("dialog")?.close()
    const iframe = document.getElementById("iframe-sc");
    iframe?.setAttribute('src', '');

    response(true);
  }

  if (
    sender.id === chrome.runtime.id &&
    message.from === Sender.React &&
    message.message === "get creator key"
  ) {
    var creatorKey = document.getElementsByClassName('creator-profile__ellipsis-restriction')[0]?.textContent?.trim()

    if (creatorKey) {
      response({ queryId: creatorKey })
    } else {
      response({ queryId: '' })
    }
  }

  if (
    sender.id === chrome.runtime.id &&
    message.from === Sender.React &&
    message.message === "hide button"
  ) {
    var dialogInstance = document.getElementById('signal-clout-view');
    var btnInstance = document.getElementById('trigger-btn');
    btnInstance?.parentNode?.removeChild(btnInstance);
    dialogInstance?.parentNode?.removeChild(dialogInstance);
  }
};

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
