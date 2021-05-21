export enum Sender {
    React,
    Content
}

export interface ChromeMessage {
    from: Sender,
    message: any
}

// Popup or content script requesting the current status
interface ExtRequest {
    type: "REQ_EXT_STATUS";
}

// Background script broadcasting current status
interface ExtResponse {
    type: "EXT_STATUS";
    showing: boolean;
}

// Popup requesting background script for status change
interface ExtToggle {
    type: "TOGGLE_EXT";
    showing: boolean;
}

// Popup or content script requesting the current status
interface ExtRequestFromContent {
    type: "REQ_EXT_STATUS_FROM_CONTENT";
}

// Background script broadcasting current status
interface ExtResponseForContent {
    type: "EXT_STATUS_FOR_CONTENT";
    showing: boolean;
}

export type MessageType = ExtRequest | ExtResponse | ExtToggle | ExtRequestFromContent | ExtResponseForContent;