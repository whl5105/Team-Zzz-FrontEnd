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

//-- 모바일 디바이스 --
const isMobile = detectMobileDevice(window.navigator.userAgent);
//-- 아이폰 디바이스 --
const isIPhone = detectIphoneDevice(window.navigator.userAgent);

export { isMobile, isIPhone };
