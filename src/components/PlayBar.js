import React, { useEffect, useState } from "react";
import { history } from "../redux/configureStore";
import { deleteSong } from "../pages/Asmr"

const PlayBar =  (props)=>{
  
    const [song1, setSong] = React.useState()
    const [toggle, setToggle] =React.useState(false);
   

    const reset = () =>{
        history.audio.pause();
        if(history.location.pathname=== '/asmr'){
            deleteSong(history.state);
            history.setSong1(new Audio());
            console.log("여기")
        }
    
        //이곳에 플레이바 사라지게 하는 조건 변수 바뀌는거 추가,
        history.state = "";
history.audio = "";
history.title = "";
history.icon = "";

console.log(history);
    }


    React.useEffect(()=>{
     setSong(history.audio)
    }, [history.audio] )

    return(
        <React.Fragment>
            <div style={{
                 position: "absolute",
                 display: "flex",
                    // width:"100%",
                    // alignItems:"center",
                    justifyContent: "space-evenly"   ,
                    // verticalAlign:"center",
                 top:"680px",
                 left:"40px",
                width:"300px",
                height:"50px",
                background:"rgba(100,100,100,0.6)",
            }}>
                {/* <div style={{
                    display: "flex",
                    width:"100%",
                    alignItems:"center",
                    justifyContent:"center",
                    verticalAlign:"center"
                }}> */}
            {toggle?<button style={{ 
               width: "50px",
               height:"50px",
               
           }}  onClick={()=>(
               // setSong(history.audio),
               console.log(history.audio),
               history.audio.play(),
               setToggle(!toggle)
               )}>{`>`}</button>:<button style={{ 
               
                width: "50px",
                height:"50px",
            }}  onClick={()=>(
                // setSong(history.audio),
                history.audio.pause(),
                setToggle(!toggle)
                
                )}>||</button>}
                {/* </div> */}
                <button style={{ 
               width: "50px",
               height:"50px",
               
           }}  onClick={()=>(
               // setSong(history.audio),
               reset()
    
               )}>{`x`}</button>
                </div>
        </React.Fragment>
    )
}

export default PlayBar;