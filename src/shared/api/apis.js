import instance from "./instance";

export const apis = {
  // -- user --
  signup: (userId, password) =>
    instance.post("/api/register", { userId, password }),
  login: (userId, password) =>
    instance.post("/api/login", { userId, password }),
  kakaoLogin: (id) => instance.post("/api/kakaologin", { id }),
  //-- 알림 --
  getNotice: (userIdx) => instance.get(`/api/notice/users/${userIdx}`),
  postNotice: (sleepChk, timePA, hour, min, pushToken) =>
    instance.post("/api/notice", {
      sleepChk,
      timePA,
      hour,
      min,
      pushToken,
    }),
  putNotice: (sleepChk, timePA, hour, min, userIdx, pushToken) =>
    instance.put(`/api/notice/users/${userIdx}`, {
      sleepChk,
      timePA,
      hour,
      min,
      pushToken,
    }),
  // -- ASMR --
  getAsmr: () => instance.get("/api/asmrTracks"),
  getAsmrCategory: (categoryId) =>
    instance.get(`/api/asmrTracks/categories/${categoryId}`),

  // -- 다이어리 --
  getDiaryList: (userIdx, yearMonth) =>
    instance.get(`/api/diaries/${yearMonth}/users/${userIdx}`), // 월별 다이어리 데이터
  getDiaryScore: (userIdx) => instance.get(`/api/scores/users/${userIdx}`),
  addDiary: (yearMonth, day, feelScore, sleepScore, comment) =>
    instance.post("/api/diaries/", {
      yearMonth,
      day,
      feelScore,
      sleepScore,
      comment,
    }),
  editDiaryDB: (userIdx, feelScore, sleepScore, comment) =>
    instance.put(`/api/diaries/${userIdx}`, { feelScore, sleepScore, comment }),
  deleteDiary: (userIdx, yearMonth, day) =>
    instance.delete(`/api/diaries/${userIdx}`, { yearMonth, day }),
  // -- ASMR Mix --
  getPlayList: (userIdx) => instance.get(`/api/playlists/users/${userIdx}`),
  postPlayList: (mixTitle, mixList) =>
    instance.post(`/api/playlists`, { mixTitle, mixList }),
  editPlayList: (playListIdx, userIdx, mixTitle) =>
    instance.put(`/api/playlists/${playListIdx}/users/${userIdx}`, {
      mixTitle,
    }),
  deletePlayList: (playListIdx, userIdx) =>
    instance.delete(`/api/playlists/${playListIdx}/users/${userIdx}`),
};
