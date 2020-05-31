const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");

function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    // alert("clicked");
  } else {
    videoPlayer.pause();
    // alert("clicked");
  }
}

function init() {
  playBtn.addEventListener("click", handlePlayClick);
}

if (videoContainer) {
  init();
}
