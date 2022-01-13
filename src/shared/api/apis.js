// import instance from "./instance";

// export const apis = {
//   //-- user --
//   signup: (userId, password) =>
//     instance.post("/api/register", { userId, password }), //회원가입
//   login: (userId, password) =>
//     instance.post("/api/login", { userId, password }), //로그인
//   //kakaoLogin: (code) => instance.get("/api/", code), // 카카오로그인 : 백과 이야기 후 api수정 필요함

//   getNotice: (userIdx) => instance.get(`/api/notice/${userIdx}`), //수면기록 팝업창 :백과 이야기 후 api수정 필요함
//   postNotice: (sleepChk, timePA, hour, min) =>
//     instance.post("/api/notice", { sleepChk, timePA, hour, min }),
//   putNotice: (sleepChk, timePA, hour, min, userIdx) =>
//     instance.put(`/api/notice/${userIdx}`, { sleepChk, timePA, hour, min }),

//   //-- main , asmr --
//   getAsmr: () => instance.get("/api/asmr"),
//   getAsmrCategory: (categoryId) => instance.get(`/api/asmr/${categoryId}`),

//   //-- diary --
//   getDiaryList: (userIdx, yearMonth) =>
//     instance.get(`/api/diary/${userIdx}/${yearMonth}`), // 월별 다이어리 데이터
//   getDiaryScore: (userIdx) => instance.get(`/api/scores/${userIdx}`),
//   addDiary: (yearMonth, day, feelScore, sleepScore, comment) =>
//     instance.post("/api/diary", {
//       yearMonth,
//       day,
//       feelScore,
//       sleepScore,
//       comment,
//     }),
//   editDiaryDB: (userIdx, feelScore, sleepScore, comment) =>
//     instance.put(`/api/diary/${userIdx}`, { feelScore, sleepScore, comment }),
//   deleteDiary: (userIdx, yearMonth, day) =>
//     instance.delete(`/api/diary/${userIdx}`, { yearMonth, day }), //해당일자 다이어리 삭제

//   getPlayList: (userIdx) => instance.get(`/api/playlists/users/${userIdx}`),
//   postPlayList: (playList) => instance.post(`/api/playlists`, { playList }),
//   editPlayList: (userIdx, playListIdx, mixTitle) =>
//     instance.put(`/api/playlists/${playListIdx}/uesr/${userIdx}`, {
//       mixTitle: mixTitle,
//     }),
//   deletePlayList: (userIdx, playListIdx) =>
//     instance.delete(`/api/playlists/${playListIdx}/users/${userIdx}`),
// };

import instance from "./instance";

export const apis = {
  // -- 사용자 --
  signup: (userId, password) =>
    instance.post("/api/register", { userId, password }), //회원가입
  login: (userId, password) =>
    instance.post("/api/login", { userId, password }), //로그인
  //kakaoLogin: (code) => instance.get("/api/", code), // 카카오로그인 : 백과 이야기 후 api수정 필요함

  getNotice: (userIdx) => instance.get(`/api/notice/users/${userIdx}`), //수면기록 팝업창 :백과 이야기 후 api수정 필요함
  postNotice: (sleepChk, timePA, hour, min) =>
    instance.post("/api/notice", { sleepChk, timePA, hour, min }),
  putNotice: (sleepChk, timePA, hour, min, userIdx) =>
    instance.put(`/api/notice/users/${userIdx}`, {
      sleepChk,
      timePA,
      hour,
      min,
    }),

  // -- ASMR --
  getAsmr: () => instance.get("/api/asmrTracks"),
  getAsmrCategory: (categoryId) =>
    instance.get(`/api/asmrTracks/categories/${categoryId}`),

  // -- 다이어리 --
  getDiaryList: (userIdx, yearMonth) =>
    instance.get(`/api/diaries/${yearMonth}/users${userIdx}/`), // 월별 다이어리 데이터
  getDiaryScore: (userIdx) => instance.get(`/api/scores/users/${userIdx}`),
  addDiary: (yearMonth, day, feelScore, sleepScore, comment) =>
    instance.post("/api/diaries", {
      yearMonth,
      day,
      feelScore,
      sleepScore,
      comment,
    }),
  editDiaryDB: (userIdx, feelScore, sleepScore, comment) =>
    instance.put(`/api/diaries/${userIdx}`, { feelScore, sleepScore, comment }),
  deleteDiary: (userIdx, yearMonth, day) =>
    instance.delete(`/api/diaries/${userIdx}`, { yearMonth, day }), //해당일자 다이어리 삭제

  // -- 찜하기 --
  getPlayList: (userIdx) => instance.get(`/api/playlists/users/${userIdx}`),
  postPlayList: (playList) => instance.post(`/api/playlists`, { playList }),
  editPlayList: (userIdx, playListIdx, mixTitle) =>
    instance.put(`/api/playlists/${playListIdx}/uesr/${userIdx}`, {
      mixTitle: mixTitle,
    }),
  deletePlayList: (userIdx, playListIdx) =>
    instance.delete(`/api/playlists/${playListIdx}/users/${userIdx}`),
};
