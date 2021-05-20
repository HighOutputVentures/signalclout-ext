import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { ChromeMessage, Sender } from "./types";
import { useMediaQuery, Box, Heading } from "@chakra-ui/react";
import BitcloutProfileModal from "./BitcloutProfileModal";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";

const TEST = gql`
  query signalcloutProfile($publicKey: String!) {
    profile(publicKey: $publicKey) {
      id
    }
  }
`;

function App() {
  const [qId, qIdSet] = useState<string>("");
  const [isEnable, isEnableSet] = useState<boolean>(false);

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
          isEnableSet(response?.isVisible);
          qIdSet(response?.queryId);
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
        // setUrl(url || "");
      });

    checkIsEnableMessage();
  }, []);

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

  const sendHideDialogMessage = () => {
    const message: ChromeMessage = {
      from: Sender.React,
      message: "hide dialog",
    };

    const queryInfo: chrome.tabs.QueryInfo = {
      active: true,
      currentWindow: true,
    };

    chrome.tabs &&
      chrome.tabs.query(queryInfo, (tabs) => {
        const currentTabId = tabs[0].id;
        chrome.tabs.sendMessage(currentTabId || 0, message, (response) => {
          // isEnableSet(response);
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

  const TestApp = () => {
    const [modalIsOpen, modalIsOpenSet] = useState(true);
    const { data, loading } = useQuery(TEST, {
      fetchPolicy: "network-only",
      variables: {
        publicKey: qId,
      },
    });

    if (loading) {
      return <div>Loading...</div>;
    }

    const handleCloseAction = () => {
      // modalIsOpenSet(false);
      sendHideDialogMessage();
    };

    return (
      <BitcloutProfileModal
        queryId={data?.profile?.id}
        isOpen={modalIsOpen}
        onClose={handleCloseAction}
        setQueryId={(id) => console.log(id)}
      />
    );
  };

  const [isPopupWindow, isBrowserWindow] = useMediaQuery([
    "(max-width: 800px)",
    "(min-width: 801px)",
  ]);

  return (
    <div className="App">
          {isPopupWindow && (
            <Box w="100%" p={1}>
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <Heading>
                  Extension is &nbsp;
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={isEnable}
                      onChange={(e) => handleChange(e)}
                    />
                    <span className="slider round"></span>
                  </label>
                </Heading>
              </header>
            </Box>
          )}
          {isBrowserWindow && <TestApp />}
        </div>
    
  );
}

export default App;
