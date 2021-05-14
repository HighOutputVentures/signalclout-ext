import { ChromeMessage, Sender } from "../types";

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
    message.message === "check button"
  ) {
    var elInstance = document.getElementById('trigger-btn');

    if (elInstance) {
      response(true)
    } else {
      response(false)
    }
  }

  if (
    sender.id === chrome.runtime.id &&
    message.from === Sender.React &&
    message.message === "show button"
  ) {
    var unameEl = document.querySelector('#syno-nsc-ext-gen3 > app-root > div > app-creator-profile-page > app-page > div > div > div.global__center__width > div > creator-profile-details > div.flex-grow-1 > creator-profile-top-card > div > div.d-flex.flex-column.pl-15px.pr-15px > div.fs-24px.font-weight-bold.d-flex.align-items-center')
    var unameTxt = unameEl?.textContent

    var div = document.querySelector('#syno-nsc-ext-gen3 > app-root > div > app-creator-profile-page > app-page > div > div > div.global__center__width > div > creator-profile-details > div.flex-grow-1 > creator-profile-top-card > div > div.creator-profile__avatar');
    var newBtn = document.createElement('button');
    newBtn.id = 'trigger-btn'
    newBtn.style.width = '30px'
    newBtn.style.height = '30px'
    newBtn.style.background = 'transparent'
    newBtn.style.border = 'none'
    newBtn.style.color = 'white'
    newBtn.style.textAlign = 'center'
    newBtn.style.textDecoration = 'none'
    newBtn.style.display = 'inline-block'
    newBtn.style.fontSize = '16px'
    newBtn.style.position = 'absolute'
    newBtn.style.margin = '10px'
    newBtn.style.left = '100px'

    var newBtnImg = document.createElement('img')
    newBtnImg.src = 'https://www.signalclout.com/search-signalclout-brand.svg'
    newBtnImg.style.height = 'inherit'
    newBtnImg.style.height = 'inherit'
    newBtn.appendChild(newBtnImg)
    div?.parentNode?.insertBefore(newBtn, div.nextSibling);

    var newIframe = document.createElement('IFRAME')
    newIframe.id = 'iframe-sc'
    newIframe.setAttribute('src', `https://www.signalclout.com/profile-analyzer?search=${unameTxt?.replace('@', "").trim()}&history=true`)
    newIframe.style.border = '1px solid transparent'
    newIframe.style.width = '100%'
    newIframe.style.height = '100%'

    var newDialog = document.createElement('dialog');
    newDialog.id='signal-clout-view'
    newDialog.style.width='100%'
    newDialog.style.border = '1px solid transparent'
    newDialog.style.position='sticky'
    newDialog.style.height='75%'

    var iframe: HTMLIFrameElement = newIframe as HTMLIFrameElement
    var tmpEl = iframe?.contentWindow?.document.querySelector('/html/body/div[1]/div/div[2]/div/div/div[2]/div[1]/div/div/div[2]/div[5]/div[1]')
    console.log("iframe", iframe)
    console.log("TMPEL", tmpEl)

    // newDialog.innerHTML = `${unameTxt} Iframe to be inserted here`;
    newDialog.append(newIframe)
    div?.parentNode?.insertBefore(newDialog, div.nextSibling);
    
    newBtn.addEventListener("click", function() {
      // newBtn.innerHTML = "Hello World - Clicked";
      newDialog.showModal()
    });

    response(true);
  }

  if (
    sender.id === chrome.runtime.id &&
    message.from === Sender.React &&
    message.message === "hide button"
  ) {
    var elInstance = document.getElementById('trigger-btn');
    elInstance?.parentNode?.removeChild(elInstance);

    response(false);
  }
};

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
