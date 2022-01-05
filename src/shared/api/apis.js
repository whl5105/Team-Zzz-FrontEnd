import instance from "./instance";
import instanceRecord from "./instanceRecord";

export const apis = {
  //-- user --
  signup: (userId, password) =>
    instance.post("/api/register", { userId, password }), //회원가입
  login: (userId, password) =>
    instance.post("/api/login", { userId, password }), //로그인
  //kakaoLogin: (code) => instance.get("/api/", code), // 카카오로그인 : 백과 이야기 후 api수정 필요함

  getNotice: (userIdx) => instance.get(`/api/notice/${userIdx}`), //수면기록 팝업창 :백과 이야기 후 api수정 필요함
  postNotice: (sleepChk, timePA, hour, min) =>
    instance.post("/api/notice", { sleepChk, timePA, hour, min }),
  putNotice: (sleepChk, timePA, hour, min, userIdx) =>
    instance.put(`/api/notice/${userIdx}`, { sleepChk, timePA, hour, min }),

  //-- main , asmr --
  getAsmr: () => instance.get("/api/asmr"),
  getAsmrCategory: (categoryId) => instance.get(`/api/asmr/${categoryId}`),

  //-- voice --
  getVoice: () => instance.get("/api/voice"),
  postVoice: (voiceFile) => instanceRecord.post("/api/voice", { voiceFile }),

  //-- diary --
  getDiaryList: (userIdx, yearMonth) =>
    instance.get(`/api/diary/${userIdx}/${yearMonth}`), // 월별 다이어리 데이터
  getDiaryScore: (userIdx) => instance.get(`/api/scores/${userIdx}`),
  addDiary: (yearMonth, day, feelScore, sleepScore, comment) =>
    instance.post("/api/diary", {
      yearMonth,
      day,
      feelScore,
      sleepScore,
      comment,
    }),
  editDiaryDB: (userIdx, diaryListInfo) =>
    instance.put(`/api/diary/${userIdx}`, { diaryListInfo }),
  deleteDiary: (userIdx, yearMonth, day) =>
    instance.delete(`/api/diary/${userIdx}`, { yearMonth, day }), //해당일자 다이어리 삭제
};
