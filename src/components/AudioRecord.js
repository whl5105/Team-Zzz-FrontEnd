import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { actionCreators as voiceActions } from "../redux/modules/voice";

const AudioRecord = () => {
  // 오디오 녹음
  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [audioUrl, setAudioUrl] = useState();
  const [sound, setSound] = useState();

  // 타이머
  const [count, setCount] = useState(0);
  const [currentMinutes, setCurrentMinutes] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const intervalRef = useRef(null);

  const [disabled, setDisabled] = useState(true);

  // --------------- 타이머 ---------------

  const start = () => {
    intervalRef.current = setInterval(async () => {
      setCount((c) => c + 1);
    }, 1000);
  };

  const end = () => {
    clearInterval(intervalRef.current);
  };

  const timer = () => {
    const checkMinutes = Math.floor(count / 60);
    const minutes = checkMinutes & 60;
    const seconds = count % 60;

    setCurrentMinutes(minutes);
    setCurrentSeconds(seconds);
  };

  // count의 변화에 따라 timer 함수 렌더링
  useEffect(timer, [count]);

  // --------------- 녹음 ---------------

  const onRecAudio = () => {
    setCount(0); // 재녹음 시 타이머 초기화
    start(); // 타이머 시작
    setDisabled(true);

    // 음원정보를 담은 노드를 생성하거나 음원을 실행또는 디코딩 시키는 일을 한다
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    // 자바스크립트를 통해 음원의 진행상태에 직접접근에 사용된다.
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);

    function makeSound(stream) {
      // 내 컴퓨터의 마이크나 다른 소스를 통해 발생한 오디오 스트림의 정보를 보여준다.
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }
    // 마이크 사용 권한 획득
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);

      analyser.onaudioprocess = function (e) {
        // 3분(180초) 지나면 자동으로 음성 저장 및 녹음 중지
        if (e.playbackTime > 180) {
          stream.getAudioTracks().forEach(function (track) {
            track.stop();
          });
          mediaRecorder.stop();
          // 메서드가 호출 된 노드 연결 해제
          analyser.disconnect();
          audioCtx.createMediaStreamSource(stream).disconnect();

          mediaRecorder.ondataavailable = function (e) {
            setAudioUrl(e.data);
            setOnRec(true);
          };
        } else {
          setOnRec(false);
        }
      };
    });
  };

  // 사용자가 음성 녹음을 중지 했을 때
  const offRecAudio = () => {
    end();

    // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
    media.ondataavailable = function (e) {
      setAudioUrl(e.data);
      setOnRec(true);
    };

    // 모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
    stream.getAudioTracks().forEach(function (track) {
      track.stop();
    });

    // 미디어 캡처 중지
    media.stop();

    // 메서드가 호출 된 노드 연결 해제
    analyser.disconnect();
    source.disconnect();

    if (audioUrl) {
      URL.createObjectURL(audioUrl); // 출력된 링크에서 녹음된 오디오 확인 가능
    }

    // File 생성자를 사용해 파일로 변환
    const sound = new File([audioUrl], "soundBlob", {
      lastModified: new Date().getTime(),
      type: "audio",
    });

    setDisabled(false);
    setSound(sound); // File 정보 출력
  };

  const play = () => {
    const audio = new Audio(URL.createObjectURL(audioUrl));
    audio.loop = false;
    audio.volume = 1;
    audio.play();
  };

  const dispatch = useDispatch();

  const send = () => {
    setCount(0);
    dispatch(voiceActions.voiceRecordDB(sound));
  };

  return (
    <>
      <h1>
        {currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes} :{" "}
        {currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds}
      </h1>
      <div>
        <button onClick={play} disabled={disabled}>
          재생
        </button>
        <button onClick={onRec ? onRecAudio : offRecAudio}>녹음</button>
        <button onClick={send} disabled={disabled}>
          전송
        </button>
      </div>
    </>
  );
};

export default AudioRecord;
