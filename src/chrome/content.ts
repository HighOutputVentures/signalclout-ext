import { ChromeMessage, Sender, MessageType } from "../components/types";

window.addEventListener("load", function load(event) {
  // chrome.runtime.sendMessage({ type: "TOGGLE_EXT", showing: true });
  chrome.runtime.sendMessage({ type: "REQ_EXT_STATUS_FROM_CONTENT" });

  setInterval(() => {
    var checkBtn = document.getElementById('trigger-btn')
    var checkEl = document.getElementsByClassName('js-creator-profile-top-card-container')[0]

    if (checkEl && checkBtn) {
      checkBtn.style.cssText = 'width: 30px; height: 30px; background: transparent; border: none; color: white; text-decoration: none; display: inline-block; font-size: 16px; position: absolute;  margin-left: auto; margin-right: auto; left: 0; right: 60%; text-align: center; visibility: visible;'
      checkEl.appendChild(checkBtn)
    }
  }, 1000)

  window.addEventListener('popstate', function (e) {
    console.log('url changed')
    chrome.runtime.sendMessage({ type: "REQ_EXT_STATUS_FROM_CONTENT" });
  });

  let url = window.location.href;
  document.body.addEventListener('click', () => {
    requestAnimationFrame(() => {
      if (url !== window.location.href) {
        chrome.runtime.sendMessage({ type: "REQ_EXT_STATUS_FROM_CONTENT" });
      };
      url = window.location.href;
    });
  }, true);
}, false);

function showSignalCloutBtn() {
  var bodyEl = document.body;
  var newBtn = document.createElement('button');
  newBtn.id = 'trigger-btn'
  newBtn.style.cssText = 'width: 30px; height: 30px; background: transparent; border: none; color: white; text-decoration: none; display: inline-block; font-size: 16px; position: absolute;  margin-left: auto; margin-right: auto; left: 0; right: 60%; text-align: center; visibility: hidden;'

  var newBtnImg = document.createElement('img')
  newBtnImg.src = 'https://www.signalclout.com/search-signalclout-brand.svg'
  newBtnImg.style.height = 'inherit'
  newBtnImg.style.height = 'inherit'
  newBtn.appendChild(newBtnImg)
  bodyEl.append(newBtn)

  var checkModalIsExist = document.getElementById('signal-clout-view')
  if (checkModalIsExist) {
    checkModalIsExist?.parentNode?.removeChild(checkModalIsExist);
  }

  var modalDialog = document.createElement('dialog');
  modalDialog.id = 'signal-clout-view'
  modalDialog.style.margin = '0px'
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
    newBtn.style.cssText = 'width: 30px; height: 30px; background: transparent; border: none; color: white; text-decoration: none; display: inline-block; font-size: 16px; position: absolute;  margin-left: auto; margin-right: auto; left: 0; right: 60%; text-align: center; visibility: hidden;'
    iframe?.setAttribute('src', chrome.extension.getURL("index.html"));
    dialogInstance?.showModal();
  });
}

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
    document?.getElementById('trigger-btn')?.setAttribute('style', 'width: 30px; height: 30px; background: transparent; border: none; color: white; text-decoration: none; display: inline-block; font-size: 16px; position: absolute;  margin-left: auto; margin-right: auto; left: 0; right: 60%; text-align: center; visibility: hidden;')
    document.querySelector("dialog")?.close()
    const iframe = document.getElementById("iframe-sc");
    iframe?.setAttribute('src', '');
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
