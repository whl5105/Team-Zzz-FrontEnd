function detectMobileDevice(agent) {
  const mobileRegex = [
    /Android/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];
  return mobileRegex.some((mobile) => agent.match(mobile));
}

function detectIphoneDevice(agent) {
  const mobileRegex = [/iPhone/i, /iPad/i, /iPod/i];
  return mobileRegex.some((mobile) => agent.match(mobile));
}
function detectInAppBrowser(agent) {
  const inappRegex = [
    /KAKAOTALK/i,
    /Instagram/i,
    /NAVER/i,
    /zumapp/i,
    /Whale/i,
    /Snapchat/i,
    /Line/i,
    /everytimeApp/i,
    /WhatsApp/i,
    /Electron/i,
    /wadiz/i,
    /AliApp/i,
    /FB_IAB/i,
    /FB4A/i,
    /FBAN/i,
    /FBIOS/i,
    /FBSS/i,
    /SamsungBrowser/i,
  ];
  return inappRegex.some((mobile) => agent.match(mobile));
}
const isInapp = detectInAppBrowser(window.navigator.userAgent);

const isMobile = detectMobileDevice(window.navigator.userAgent);
const isIPhone = detectIphoneDevice(window.navigator.userAgent);


export { isMobile, isIPhone, isInapp };
