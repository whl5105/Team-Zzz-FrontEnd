//---- Cookie 요청 ----
const getCookie = (name) => {
  let value = ";" + document.cookie;
  let parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
};

//---- Cookie 생성 ----
const setCookie = (name, value, exp = 5) => {
  let date = new Date();
  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}`;
};
//---- Cookie 삭제 ----
const deleteCookie = (name) => {
  console.log(name);
  let date = new Date("2020-01-01").toUTCString();
  document.cookie = name + "=; expires=" + date;
};

export { setCookie, deleteCookie, getCookie };
