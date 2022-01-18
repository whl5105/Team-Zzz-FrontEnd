export const IdCheck = (id) => {
  let _reg = /^[a-zA-Z0-9]{5,10}$/;
  //받아온 이메일 test 후 trul , false 반환
  return _reg.test(id);
};
export const PwdCheck = (pwd) => {
  let _reg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
  //받아온 이메일 test 후 trul , false 반환
  return _reg.test(pwd);
};

/*
  // : 정규식 표현 시작  
  ^ : 첫글자만 0~9 혹슨 영문 대소문자 만 들어온다._reg
  -_. : 특수문자가 들어올수 있고 
  * : 여러개가 들어올 수 있다 

  .([a-zA-Z]): com ... 무조건 영어만 가능 



  


*/
//
