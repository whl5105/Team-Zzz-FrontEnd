import React from 'react';


const Push = (props) =>{
    var button = document.getElementById("notifications");
    button.addEventListener('click', function(e) {
        Notification.requestPermission().then(function(result) {
            if(result === 'granted') {
                // randomNotification();
            }
        });
    });
 

    return(<></>)
}

export default Push;