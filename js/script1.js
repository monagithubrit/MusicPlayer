const mainBox = document.querySelector(".main-box");
const musicImg = document.querySelector(".image-section img");
const musicName = document.querySelector(".song-details .name");
const musicArtist = document.querySelector(".song-details .artist");
const playPauseBtn = document.querySelector(".play-pause");
const mainAudio = document.querySelector(".main-audio");
const prevBtn =  document.querySelector("#prev");
const nextBtn =  document.querySelector("#next");
const progressArea = document.querySelector(".progress-area");
const progressBar = document.querySelector(".progress-bar");


let allMusic= [
    {
      name: "Harley Bird - Home",
      artist: "Jordan Schor",
      img: "music-1",
      src: "music-1"
    },
    {
      name: "Ikson Anywhere – Ikson",
      artist: "Audio Library",
      img: "music-2",
      src: "music-2"
    },
    {
      name: "Beauz & Jvna - Crazy",
      artist: "Beauz & Jvna",
      img: "music-3",
      src: "music-3"
    },
    {
      name: "Hardwind - Want Me",
      artist: "Mike Archangelo",
      img: "music-4",
      src: "music-4"
    },
    {
      name: "Jim - Sun Goes Down",
      artist: "Jim Yosef x Roy",
      img: "music-5",
      src: "music-5"
    },
    {
      name: "Lost Sky - Vision NCS",
      artist: "NCS Release",
      img: "music-6",
      src: "music-6"
    },

]


  
let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);
isMusicPaused = true;

window.addEventListener('load', ()=>{
      loadMusic(musicIndex);//calling music function once window loaded
})
// load music function
function loadMusic(e){
      musicName.innerText = allMusic[e].name;
      musicArtist.innerText = allMusic[e].artist;
      musicImg.src = `images/${allMusic[e].img}.jpg`;
      mainAudio.src = `songs/${allMusic[e].src}.mp3`;
    
}


function playMusic(){
 mainBox.classList.add("paused");
 playPauseBtn.querySelector("i").innerText = "paused";
  mainAudio.play();
}


function pauseMusic(){
   mainBox.classList.remove("paused");
 playPauseBtn.querySelector("i").innerText = "play_arrow";

  mainAudio.pause();
}

function nextMusic(){
  musicIndex++;
  musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
  loadMusic(musicIndex);
  playMusic();
}

function pervMusic(){
  musicIndex--;
  musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
  loadMusic(musicIndex);
  playMusic();
}


playPauseBtn.addEventListener('click' , ()=>{

  const isMusicPaused = mainBox.classList.contains("paused");
  isMusicPaused ? pauseMusic() : playMusic();

});

nextBtn.addEventListener('click', ()=>{
  nextMusic();

});
prevBtn.addEventListener('click', ()=>{
  pervMusic();
});
 

mainAudio.addEventListener("timeupdate", (e)=>{
  const currentTime = e.target.currentTime; //getting playing song currentTime
  const duration = e.target.duration; //getting playing song total duration
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;

  let musicCurrentTime = mainBox.querySelector(".current-time"),
    musicDuartion = mainBox.querySelector(".max-duration");
  mainAudio.addEventListener("loadeddata", ()=>{
    // update song total duration
    let mainAdDuration = mainAudio.duration;
    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec = Math.floor(mainAdDuration % 60);
    if(totalSec < 10){ //if sec is less than 10 then add 0 before it
      totalSec = `0${totalSec}`;
    }
    musicDuartion.innerText = `${totalMin}:${totalSec}`;
  });
  // update playing song current time
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if(currentSec < 10){ //if sec is less than 10 then add 0 before it
    currentSec = `0${currentSec}`;
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

// update playing song currentTime on according to the progress bar width
progressArea.addEventListener("click", (e)=>{
  let progressWidth = progressArea.clientWidth; //getting width of progress bar
  let clickedOffsetX = e.offsetX; //getting offset x value
  let songDuration = mainAudio.duration; //getting song total duration
  
  mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
  playMusic(); //calling playMusic function

});
//change loop, shuffle, repeat icon onclick
const repeatBtn = mainBox.querySelector("#repeat");
repeatBtn.addEventListener("click", ()=>{
  let getText = repeatBtn.innerText; //getting this tag innerText
  switch(getText){
    case "repeat":
      repeatBtn.innerText = "repeat_one";
      repeatBtn.setAttribute("title", "Song looped");
      break;
    case "repeat_one":
      repeatBtn.innerText = "shuffle";
      repeatBtn.setAttribute("title", "Playback shuffled");
      break;
    case "shuffle":
      repeatBtn.innerText = "repeat";
      repeatBtn.setAttribute("title", "Playlist looped");
      break;
  }
});

//code for what to do after song ended
mainAudio.addEventListener("ended", ()=>{
  // we'll do according to the icon means if user has set icon to
  // loop song then we'll repeat the current song and will do accordingly
  let getText = repeatBtn.innerText; //getting this tag innerText
  switch(getText){
    case "repeat":
      nextMusic(); //calling nextMusic function
      break;
    case "repeat_one":
      mainAudio.currentTime = 0; //setting audio current time to 0
      loadMusic(musicIndex); //calling loadMusic function with argument, in the argument there is a index of current song
      playMusic(); //calling playMusic function
      break;
    case "shuffle":
      let randIndex = Math.floor((Math.random() * allMusic.length) + 1); //genereting random index/numb with max range of array length
      do{
        randIndex = Math.floor((Math.random() * allMusic.length) + 1);
      }while(musicIndex == randIndex); //this loop run until the next random number won't be the same of current musicIndex
      musicIndex = randIndex; //passing randomIndex to musicIndex
      loadMusic(musicIndex);
      playMusic();
      
      break;
  }
});

































































