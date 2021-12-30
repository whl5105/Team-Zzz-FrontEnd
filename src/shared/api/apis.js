import instance from "./instance";
import instanceRecord from "./instanceRecord";

export const apis = {
  //-- user --
  signup: (id, password) =>
    instance.post("/api/auth/register", { id, password }), //회원가입
  login: (id, password) => instance.post("/api/auth/login", { id, password }), //로그인
  //kakaoLogin: (code) => instance.get("/api/", code), // 카카오로그인 : 백과 이야기 후 api수정 필요함

  getNotice: () => instance.get("/api/notice"), //수면기록 팝업창 :백과 이야기 후 api수정 필요함
  postNotice: (sleepChk, timePA, hour, min) =>
    instance.post("/api/notice", { sleepChk, timePA, hour, min }),

  //-- main , asmr --
  getAsmr: () => instance.get("/api/asmr"),
  getAsmrCategory: (categoryId) => instance.get(`/api/asmr/${categoryId}`),

  //-- voice --
  getVoice: () => instance.get("/api/voice"),
  postVoice: (voiceFile) => instanceRecord.post("/api/voice", { voiceFile }),

  //-- diary --
  getDiary: (userIdx, yearMonth) =>
    instance.get(`/api/diary/${userIdx}`, { yearMonth }), //월별 다이어리 데이터
  postDiary: (
    year,
    month,
    day,
    feelingScore,
    enoughSleep,
    comment //해당일자 다이어리 등록(생성)
  ) =>
    instance.post("/api/diary", {
      year,
      month,
      day,
      feelingScore,
      enoughSleep,
      comment,
    }),
  putDiary: (
    year,
    month,
    day,
    feelingScore,
    enoughSleep,
    comment //해당일자 다이어리 수정
  ) =>
    instance.put("/api/diary", {
      year,
      month,
      day,
      feelingScore,
      enoughSleep,
      comment,
    }),
};
