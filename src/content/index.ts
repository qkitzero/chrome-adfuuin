const checkForAds = () => {
  const adShowing = document.querySelector('.ad-showing');
  const videoElement = document.querySelector('video');

  if (adShowing && videoElement) {
    chrome.runtime.sendMessage({ type: 'MUTE_TAB' });

    if (videoElement.playbackRate !== 16.0) {
      videoElement.playbackRate = 16.0;
    }
  } else {
    chrome.runtime.sendMessage({ type: 'UNMUTE_TAB' });

    if (videoElement && videoElement.playbackRate === 16.0) {
      videoElement.playbackRate = 1.0;
    }
  }
};

const observer = new MutationObserver(() => {
  checkForAds();
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
