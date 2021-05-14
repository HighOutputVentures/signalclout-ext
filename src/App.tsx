import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { ChromeMessage, Sender } from "./types";
import { EOL } from "os";

function App() {
  const [url, setUrl] = useState<string>("");
  const [isEnable, isEnableSet] = useState<boolean>(true);

  /**
   * Send message to the content script
   */
  const checkIsEnableMessage = () => {
    const message: ChromeMessage = {
      from: Sender.React,
      message: "check button",
    };

    const queryInfo: chrome.tabs.QueryInfo = {
      active: true,
      currentWindow: true,
    };

    /**
     * We can't use "chrome.runtime.sendMessage" for sending messages from React.
     * For sending messages from React we need to specify which tab to send it to.
     */
    chrome.tabs &&
      chrome.tabs.query(queryInfo, (tabs) => {
        const currentTabId = tabs[0].id;
        /**
         * Sends a single message to the content script(s) in the specified tab,
         * with an optional callback to run when a response is sent back.
         *
         * The runtime.onMessage event is fired in each content script running
         * in the specified tab for the current extension.
         */
        chrome.tabs.sendMessage(currentTabId || 0, message, (response) => {
          isEnableSet(response);
        });
      });
  };

  /**
   * Get current URL
   */
  useEffect(() => {
    const queryInfo = { active: true, lastFocusedWindow: true };

    chrome.tabs &&
      chrome.tabs.query(queryInfo, (tabs) => {
        const url = tabs[0].url;
        setUrl(url || "");
      });

    checkIsEnableMessage()
    sendShowMessage()
  });

  const sendShowMessage = () => {
    const message: ChromeMessage = {
      from: Sender.React,
      message: "show button",
    };

    const queryInfo: chrome.tabs.QueryInfo = {
      active: true,
      currentWindow: true,
    };

    chrome.tabs &&
      chrome.tabs.query(queryInfo, (tabs) => {
        const currentTabId = tabs[0].id;
        chrome.tabs.sendMessage(currentTabId || 0, message, (response) => {
          isEnableSet(response);
        });
      });
  };

  const sendHideMessage = () => {
    const message: ChromeMessage = {
      from: Sender.React,
      message: "hide button",
    };

    const queryInfo: chrome.tabs.QueryInfo = {
      active: true,
      currentWindow: true,
    };

    chrome.tabs &&
      chrome.tabs.query(queryInfo, (tabs) => {
        const currentTabId = tabs[0].id;
        chrome.tabs.sendMessage(currentTabId || 0, message, (response) => {
          isEnableSet(response);
        });
      });
  };

  function handleChange(el: any) {
    if (el.target.checked) {
      sendShowMessage();
    } else {
      sendHideMessage();
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>URL:</p>
        <p>{url}</p>
        <label className="switch">
          <input
            type="checkbox"
            checked={isEnable}
            onChange={(e) => handleChange(e)}
          />
          <span className="slider round"></span>
        </label>
      </header>
    </div>
  );
}

export default App;
