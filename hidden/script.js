function updateClock ( )
{
  var currentTime = new Date ( );

  var currentHours = currentTime.getHours ( );
  var currentMinutes = currentTime.getMinutes ( );
  var currentSeconds = currentTime.getSeconds ( );

  // Pad the minutes and seconds with leading zeros, if required
  currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
  currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;

  // Choose either "AM" or "PM" as appropriate
  var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";

  // Convert the hours component to 12-hour format if needed
  currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;

  // Convert an hours component of "0" to "12"
  currentHours = ( currentHours == 0 ) ? 12 : currentHours;

  // Compose the string for display
  var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds + " " + timeOfDay;

  // Update the time display
  document.getElementById("clock").firstChild.nodeValue = currentTimeString;
//   document.getElementById("song").firstChild.nodeValue = currentHours + " " + timeOfDay;

  var currentHour24 = currentHours % 12 +(12*(timeOfDay == 'PM'));
  console.log("curr hour: " + currentHour24);
  console.log("currAudio: " + currentAudio);
  if (currentAudio > 24) {
      console.log("still need to click");
  } else if (currentAudio !== currentHour24){
      console.log("hour and song don't match");
      audios[currentAudio].pause();
      audios[currentHour24].play();
      currentAudio = currentHour24;
  }
}

// Create array of hourly music
let i = 0;
audios = new Array(24);
while (i<24) {
    let timeOfDay = ( i < 12 ) ? "AM" : "PM";
    let hour = ( i > 12 ) ? i - 12 : i;
    hour = ( hour == 0 ) ? 12 : hour;
    
    console.log('anch_songs/' + hour + " " + timeOfDay + ".mp3");
    audios[i] = new Audio('anch_songs/' + hour + " " + timeOfDay + ".mp3");
    audios[i].loop = true;
    i++;
}
audios[24] = new Audio('silence.mp3');  
var currentAudio = 25;
window.onload = () => {
    updateClock(); 
    setInterval('updateClock()', 1000 );

    const clickToAuthorize = document.querySelector('#clock');
    const clickAlert = document.querySelector('#clickAlert');
    clickToAuthorize.onclick = () => {
        clickAlert.style.visibility = "hidden";
        currentAudio = 24;
        audios[currentAudio].play();
    }
}