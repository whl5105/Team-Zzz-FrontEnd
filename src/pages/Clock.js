import React from "react";

const Clock = (props) => {
  const [ampm, setampm] = React.useState("");
  const [wakeup_hour, setwakeup_hour] = React.useState(0);
  const [wakeup_min, setwakeup_min] = React.useState(0);
  const [ampm2, setampm2] = React.useState("");
  const [wakeup_hour2, setwakeup_hour2] = React.useState(0);
  const [wakeup_min2, setwakeup_min2] = React.useState(0);
  const [ampm3, setampm3] = React.useState("");
  const [wakeup_hour3, setwakeup_hour3] = React.useState(0);
  const [wakeup_min3, setwakeup_min3] = React.useState(0);
  const [ampm4, setampm4] = React.useState("");
  const [wakeup_hour4, setwakeup_hour4] = React.useState(0);
  const [wakeup_min4, setwakeup_min4] = React.useState(0);

  // const [wakeup_time, setwakeup_time] =React.useState(0);

  function search() {
    const datetb = document.getElementById("date");
    const dateindex = document.getElementById("date").options.selectedIndex;
    const date = datetb.options[dateindex].value;

    const hourtb = document.getElementById("hour");
    const hourindex = document.getElementById("hour").options.selectedIndex;
    const hour = hourtb.options[hourindex].value / 1;

    const minutetb = document.getElementById("minute");
    const minuteindex = document.getElementById("minute").options.selectedIndex;
    const minute = minutetb.options[minuteindex].value / 1;
    
if(date==='오후'){
  let setTime = new Date(2021, 11,27, hour+12, minute);
  // setTime.setMinutes(0);
  console.log(setTime)
  let res4 = new Date(setTime.getTime() - 270*60000);
  let res3 = new Date(res4.getTime() - 90*60000);
  let res2 = new Date(res3.getTime() - 90*60000);
  let res1 = new Date(res2.getTime() - 90*60000); 

  let restime1 = res1.getHours()
    setwakeup_hour(res1.getHours())
    setwakeup_min(res1.getMinutes())
    if(restime1>=12){
      if(restime1===12){
        setampm("오후");
        setwakeup_hour(restime1)
      }
      else{
      setampm("오후");
      restime1-=12;
      setwakeup_hour(restime1)
      }
    }
    else{
      setampm("오전")
      setwakeup_hour(restime1)
    }

    let restime2 = res2.getHours()
    setwakeup_hour2(res2.getHours())
    setwakeup_min2(res2.getMinutes())
    if(restime2>=12){
      if(restime2===12){
        setampm2("오후");
        setwakeup_hour2(restime2)
      }
      else{
      setampm2("오후");
      restime2-=12;
      setwakeup_hour2(restime2)
      }
    }
    else{
      setampm2("오전")
      setwakeup_hour2(restime2)
    }

    let restime3 = res3.getHours()
    setwakeup_hour3(res3.getHours())
    setwakeup_min3(res3.getMinutes())
    if(restime3>=12){
      if(restime3===12){
        setampm3("오후");
        setwakeup_hour3(restime3)
      }
      else{
      setampm3("오후");
      restime3-=12;
      setwakeup_hour3(restime3)
      }
    }
    else{
      setampm3("오전")
      setwakeup_hour3(restime3)
    }

    let restime4 = res4.getHours()
    setwakeup_hour4(res4.getHours())
    setwakeup_min4(res4.getMinutes())
    if(restime4>=12){
      if(restime4===12){
        setampm4("오후");
        setwakeup_hour4(restime4)
      }
      else{
      setampm4("오후");
      restime4-=12;
      setwakeup_hour4(restime4)
      }
    }
    else{
      setampm4("오전")
      setwakeup_hour4(restime4)
    }

    console.log(ampm ,wakeup_hour, wakeup_min)
}
else{

  var setTime = new Date(2021, 11,27, hour, minute);
  // setTime.setMinutes(0);
  console.log(setTime)
  let res4 = new Date(setTime.getTime() - 270*60000);
  let res3 = new Date(res4.getTime() - 90*60000);
  let res2 = new Date(res3.getTime() - 90*60000);
  let res1 = new Date(res2.getTime() - 90*60000); 

    let restime1 = res1.getHours()
    setwakeup_hour(res1.getHours())
    setwakeup_min(res1.getMinutes())
    if(restime1>=12){
      setampm("오후");
      restime1-=12;
      setwakeup_hour(restime1)
    }
    else{
      setampm("오전")
      setwakeup_hour(restime1)
    }

    let restime2 = res2.getHours()
    setwakeup_hour2(res2.getHours())
    setwakeup_min2(res2.getMinutes())
    if(restime2>=12){
      setampm2("오후");
      restime2-=12;
      setwakeup_hour2(restime2)
    }
    else{
      setampm2("오전")
      setwakeup_hour2(restime2)
    }

    let restime3 = res3.getHours()
    setwakeup_hour3(res3.getHours())
    setwakeup_min3(res3.getMinutes())
    if(restime3>=12){
      setampm3("오후");
      restime3-=12;
      setwakeup_hour3(restime3)
    }
    else{
      setampm3("오전")
      setwakeup_hour3(restime3)
    }

    let restime4 = res4.getHours()
    setwakeup_hour4(res4.getHours())
    setwakeup_min4(res4.getMinutes())
    if(restime4>=12){
      setampm4("오후");
      restime4-=12;
      setwakeup_hour4(restime4)
    }
    else{
      setampm4("오전")
      setwakeup_hour4(restime4)
    }

    console.log(ampm ,wakeup_hour, wakeup_min)

  }




  
  }
  return (
    <React.Fragment>
      <select id="date" style={{ margin: "5px" }}>
        <option value="오전">오전</option>
        <option value="오후">오후</option>
      </select>
      <select id="hour" style={{ margin: "5px" }}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
      </select>
      <select id="minute" style={{ margin: "5px" }}>
        <option value="00">00</option>
        <option value="05">05</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="25">25</option>
        <option value="30">30</option>
        <option value="35">35</option>
        <option value="40">40</option>
        <option value="45">45</option>
        <option value="50">50</option>
        <option value="55">55</option>
      </select>
     
      <input
        type="button"
        value="계산하기"
        onClick={() => search()}
        style={{ margin: "5px" }}
      ></input>
      <div>
        <text style={{margin: "5px"}}>{`${ampm}  ${wakeup_hour}시 ${wakeup_min}분`}</text>
       <text style={{margin: "5px"}}>{`${ampm2}  ${wakeup_hour2}시 ${wakeup_min2}분`}</text>
       <text style={{margin: "5px"}}>{`${ampm3}  ${wakeup_hour3}시 ${wakeup_min3}분`}</text>
       <text style={{margin: "5px"}}>{`${ampm4}  ${wakeup_hour4}시 ${wakeup_min4}분`}</text>
      </div>
    </React.Fragment>
  );
};

export default Clock;
