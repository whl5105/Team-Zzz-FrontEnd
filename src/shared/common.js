//-- 아이디 정규식 --
export const IdCheck = (id) => {
  let _reg = /^[a-zA-Z0-9]{5,10}$/;
  return _reg.test(id);
};
//-- 비밀번호 정규식 --
export const PwdCheck = (pwd) => {
  let _reg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
  return _reg.test(pwd);
};
