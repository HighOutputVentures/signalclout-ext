import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { ChromeMessage, Sender, MessageType } from "./components/types";
import { useMediaQuery, Box, Heading } from "@chakra-ui/react";
import BitcloutProfileModal from "./components/BitcloutProfileModal";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";

const PROFILE = gql`
  query signalcloutProfile($publicKey: String!) {
    profile(publicKey: $publicKey) {
      id
    }
  }
`;

interface ModalWrapProps {
  qId?: string;
  sendHideDialogMessage: () => void;
}

const ModalWrap: React.FC<ModalWrapProps> = ({ sendHideDialogMessage, qId }) => {
  const { data, loading } = useQuery(PROFILE, {
    fetchPolicy: "network-only",
    variables: {
      publicKey: qId,
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleCloseAction = () => {
    sendHideDialogMessage();
  };

  return (
    <BitcloutProfileModal
      queryId={data?.profile?.id}
      isOpen={true}
      onClose={() => handleCloseAction()}
      setQueryId={(id) => console.log(id)}
    />
  );
};

function App() {
  const [qId, qIdSet] = useState<string>("");
  const [showing, setShowing] = useState<boolean>(false);

  /**
   * Send message to the content script
   */
  const getCreatorKeyMessage = () => {
    const message: ChromeMessage = {
      from: Sender.React,
      message: "get creator key",
    };

    const queryInfo: chrome.tabs.QueryInfo = {
      active: true,
      currentWindow: true,
    };

    chrome.tabs &&
      chrome.tabs.query(queryInfo, (tabs) => {
        const currentTabId = tabs[0].id;
        chrome.tabs.sendMessage(currentTabId || 0, message, (response) => {
          qIdSet(response?.queryId);
        });
      });
  };

  useEffect(() => {
    getCreatorKeyMessage();

    chrome.runtime.sendMessage({ type: "REQ_EXT_STATUS" });

    chrome.runtime.onMessage.addListener((message: MessageType) => {
      switch (message.type) {
        case "EXT_STATUS":
          setShowing(message.showing);
          break;
        default:
          break;
      }
    });
  }, []);

  const sendHideBtnMessage = () => {
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
        chrome.tabs.sendMessage(currentTabId || 0, message);
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
        chrome.tabs.sendMessage(currentTabId || 0, message);
      });
  };

  function handleChange(el: any) {
    chrome.runtime.sendMessage({
      type: "TOGGLE_EXT",
      showing: el.target.checked,
    });

    if (!el.target.checked) {
      sendHideBtnMessage();
    }
  }

  const [isPopupWindow, isBrowserWindow] = useMediaQuery([
    "(max-width: 800px)",
    "(min-width: 801px)",
  ]);

  return (
    <div className="App">
      {isPopupWindow && (
        <Box w="100%">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <Heading as="h5" size="sm">
              Service is
              <label className="switch">
                <input
                  type="checkbox"
                  checked={showing}
                  onChange={(e) => handleChange(e)}
                />
                <span className="slider round"></span>
              </label>
            </Heading>
          </header>
        </Box>
      )}
      {isBrowserWindow && (
        <ModalWrap sendHideDialogMessage={sendHideDialogMessage} qId={qId} />
      )}
    </div>
  );
}

export default App;
