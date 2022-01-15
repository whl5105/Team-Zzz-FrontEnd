import React from 'react';
import { history } from '../redux/configureStore';


const Test = (props)=>{
     const [test, setTest] = React.useState('')
     console.log(history)
  React.useEffect(()=>{

     setTest(history.test)
     console.log(history.test)
  },[])
    return (<>
      <span style={{ position:"absolute", top:"100px",left:"10px", color:"white", width:"100px"}}>
        {test} 
      </span>
    </>)
}

export default Test;