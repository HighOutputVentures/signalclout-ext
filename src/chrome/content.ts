import { ChromeMessage, Sender } from "../types";
import ReactDOM from 'react-dom';
import App from '../App';
import React from 'react';

function showSignalCloutBtn() {
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

  newIframe.onload = function() {
    console.log("The iframe is loaded");
  };

  var closeModalBtn = document.createElement('button')
  closeModalBtn.style.position = 'absolute'
  closeModalBtn.style.height = '30px'
  closeModalBtn.style.width = '50px'
  closeModalBtn.style.top = '10px'
  closeModalBtn.style.right = '20px'
  closeModalBtn.style.background = 'transparent'
  closeModalBtn.style.border = 'none'
  closeModalBtn.style.color = '#131313'
  closeModalBtn.style.textAlign = 'center'
  closeModalBtn.style.textDecoration = 'none'
  closeModalBtn.style.display = 'inline-block'
  closeModalBtn.innerHTML = 'Close'
  closeModalBtn.style.fontSize = '16px'

  closeModalBtn.addEventListener("click", function () {
    // newBtn.innerHTML = "Hello World - Clicked";
    newDialog.close()
  });

  var newDialog = document.createElement('dialog');
  newDialog.id = 'signal-clout-view'
  newDialog.style.width = '100%'
  newDialog.style.border = '1px solid transparent'
  newDialog.style.position = 'sticky'
  newDialog.style.height = '90%'
  newDialog.appendChild(closeModalBtn)

  // newDialog.innerHTML = `${unameTxt} Iframe to be inserted here`;
  const app = document.createElement("div");
  app.id = "root-signal-clout";
  // document.body.append(app);

  newDialog.append(app)

  ReactDOM.render(
    React.createElement(App),
    document.getElementById('root-signal-clout')
  );

  div?.parentNode?.insertBefore(newDialog, div.nextSibling);

  newBtn.addEventListener("click", function () {
    // newBtn.innerHTML = "Hello World - Clicked";
    newDialog.showModal()
  });
}

document.addEventListener("DOMContentLoaded", function () {
  var elExist = false
  var isRendered = false
  setInterval(function () {
    var checkEl = document.querySelector('#syno-nsc-ext-gen3 > app-root > div > app-creator-profile-page > app-page > div > div > div.global__center__width > div > creator-profile-details > div.flex-grow-1 > creator-profile-top-card > div > div.d-flex.flex-column.pl-15px.pr-15px > div.fs-24px.font-weight-bold.d-flex.align-items-center')
    if (checkEl) {
      elExist = true
    } else {
      elExist = false
      isRendered = false
    }

    if(isRendered === false && elExist === true) {
      showSignalCloutBtn()
      isRendered = true
    }
  }, 100); // check every 100ms
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
    showSignalCloutBtn()
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
