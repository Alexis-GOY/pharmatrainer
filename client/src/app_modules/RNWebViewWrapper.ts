import EventEmitter from 'events';

declare global {
    interface Window {
        isReactNativeWebView: boolean,
        ReactNativeWebView: any,
        webViewManager: RNWebViewManager,
    }
}

let isReactNativeWebView: boolean = window.hasOwnProperty("ReactNativeWebView");
window.isReactNativeWebView = isReactNativeWebView;

if (!isReactNativeWebView) {
    window.ReactNativeWebView = {
        postMessage: (message: string) => {
        },
    };
}

export class RNWebViewManager extends EventEmitter {
    emitToRNApp(message: string, data: Object) {
        window.ReactNativeWebView.postMessage(JSON.stringify({message: message, data: data}));
    }
}

function fnc_exec(fnc: Function) {
    fnc();
}

let fnc_noexec = () => {
};

if (!window.webViewManager) {
    window.webViewManager = new RNWebViewManager();
    if (isReactNativeWebView) window.postMessage = window.ReactNativeWebView.postMessage;
}

let execIfWV = window.isReactNativeWebView ? fnc_exec : fnc_noexec;
let execIfNotWV = !window.isReactNativeWebView ? fnc_exec : fnc_noexec;

export {execIfWV, execIfNotWV};
