import { ChromeMessage, Sender } from "../types";
import React from 'react'
import ReactDOM from 'react-dom'

chrome.runtime.onMessage.addListener(request => {
  if (request.type === 'viewScProfile') {

    var modalDialog = document.createElement('dialog');
    modalDialog.id = 'signal-clout-view'
    modalDialog.style.width = '100%'
    modalDialog.style.border = '1px solid transparent'
    modalDialog.style.position = 'sticky'
    modalDialog.style.height = '100%'
    modalDialog.style.background = 'transparent'

    // modalDialog.setAttribute("style", "height:40%");
    modalDialog.innerHTML = `<iframe id="headlineFetcher"style="height:100%;width: 100%;border: 1px solid transparent;"></iframe>`;

    document.body.appendChild(modalDialog);

    const dialogInstance = document.querySelector("dialog");
    dialogInstance?.showModal();

    const iframe = document.getElementById("headlineFetcher");

    iframe?.setAttribute('src', chrome.extension.getURL("index.html"));
    iframe?.setAttribute('frameBorder', "0")

    dialogInstance?.querySelector("button")?.addEventListener("click", () => {
      dialogInstance.close();
    });
  }
});

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

    if (isRendered === false && elExist === true) {
      showSignalCloutBtn()
      isRendered = true
    }
  }, 100); // check every 100ms
});

function showSignalCloutBtn() {
  var div = document.getElementsByClassName('creator-profile__avatar')[0];
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

  var modalDialog = document.createElement('dialog');
  modalDialog.id = 'signal-clout-view'
  modalDialog.style.width = '100%'
  modalDialog.style.border = '1px solid transparent'
  modalDialog.style.position = 'sticky'
  modalDialog.style.height = '100%'
  modalDialog.style.background = 'transparent'

  // modalDialog.setAttribute("style", "height:40%");
  modalDialog.innerHTML = `<iframe id="headlineFetcher"style="height:100%;width: 100%;border: 1px solid transparent;"></iframe>`;

  document.body.appendChild(modalDialog);

  const dialogInstance = document.querySelector("dialog");

  const iframe = document.getElementById("headlineFetcher");

  iframe?.setAttribute('src', chrome.extension.getURL("index.html"));
  iframe?.setAttribute('frameBorder', "0")

  dialogInstance?.querySelector("button")?.addEventListener("click", () => {
    dialogInstance.close();
  });

  newBtn.addEventListener("click", function () {
    dialogInstance?.showModal();
  });
}

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

    response(true);
  }

  if (
    sender.id === chrome.runtime.id &&
    message.from === Sender.React &&
    message.message === "check button"
  ) {
    var elInstance = document.getElementById('trigger-btn');

    var creatorKey = document.getElementsByClassName('creator-profile__ellipsis-restriction')[0].textContent?.trim()
    console.log("🚀 ~ file: content.ts ~ line 108 ~ creatorKey", creatorKey)

    if (elInstance && creatorKey) {
      response({isVisible: true, queryId: creatorKey})
    } else {
      response({isVisible: false, queryId: ''})
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
