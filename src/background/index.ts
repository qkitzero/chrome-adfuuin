chrome.runtime.onMessage.addListener(
  (
    message: { type: string; payload?: any },
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void,
  ) => {
    if (!sender.tab || sender.tab.id === undefined) {
      return;
    }

    const tabId = sender.tab.id;

    switch (message.type) {
      case 'MUTE_TAB':
        chrome.tabs.update(tabId, { muted: true }).catch((err) => {
          console.error('Failed to mute tab:', err);
        });
        break;
      case 'UNMUTE_TAB':
        chrome.tabs.update(tabId, { muted: false }).catch((err) => {
          console.error('Failed to unmute tab:', err);
        });
        break;
    }
  },
);
