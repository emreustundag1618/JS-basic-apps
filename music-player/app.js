// DOM elements
const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const audio = document.querySelector("#audio");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const prev = document.querySelector("#controls #prev");
const play = document.querySelector("#controls #play");
const next = document.querySelector("#controls #next");
const currentTime = document.querySelector("#current-time");
const duration = document.querySelector("#duration");
const progressBar = document.querySelector("#progress-bar");
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar");
const ul = document.querySelector("ul");


const player = new MusicPlayer(musicList);

let music = player.getMusic();

window.addEventListener("load", () => {
    let music = player.getMusic();
    displayMusic(music);
    displayMusicList(player.musicList);
    isPlayingNow();
});

function displayMusic(music) {
    title.innerText = music.getSongName();
    singer.innerText = music.singer;
    image.src = music.img;
    audio.src = music.file;
};

prev.addEventListener("click", () => { prevMusic() });

next.addEventListener("click", () => { nextMusic() });

function prevMusic() {
    player.prev();
    // player.index has been changed so need to get new music with this new index
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayingNow();
}

function nextMusic() {
    player.next();
    // player.index has been changed so need to get new music with this new index
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayingNow();
}

play.addEventListener("click", () => {
    const isMusicPlaying = container.classList.contains("playing");
    isMusicPlaying ? pauseMusic() : playMusic();
});

function pauseMusic() {
    container.classList.remove("playing");
    play.querySelector("i").classList = "fa-solid fa-play";
    audio.pause();
};

function playMusic() {
    container.classList.add("playing");
    play.querySelector("i").classList = "fa-solid fa-pause";
    audio.play();
};

const calculateTime = (seconds) => {
    let minute = Math.floor(seconds / 60);
    let second = Math.floor(seconds % 60);
    second = second < 10 ? "0" + second : second;
    return minute + ":" + second;
}

audio.addEventListener("loadedmetadata", () => {
    duration.textContent = calculateTime(audio.duration);
    progressBar.max = Math.floor(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    progressBar.value = Math.floor(audio.currentTime);
    currentTime.textContent = calculateTime(progressBar.value);
});

progressBar.addEventListener("input", () => {
    currentTime.textContent = calculateTime(progressBar.value);
    audio.currentTime = progressBar.value;
});

let muteState = "unmuted";

volumeBar.addEventListener("input", (e) => {
    let value = e.target.value;
    audio.volume = value / 100;
    if (value == 0) {
        audio.muted = true;
        muteState = "muted";
        volume.classList = "fa-solid fa-volume-xmark";
        volumeBar.value = 0;
    } else {
        audio.muted = false;
        muteState = "unmuted";
        volume.classList = "fa-solid fa-volume-high";
    }
})

volume.addEventListener("click", () => {
    if (muteState === "unmuted") {
        audio.muted = true;
        muteState = "muted";
        volume.classList = "fa-solid fa-volume-xmark";
        volumeBar.value = 0;
    } else {
        audio.muted = false;
        muteState = "unmuted";
        volume.classList = "fa-solid fa-volume-high";
        volumeBar.value = 100;
    }
});

const displayMusicList = (list) => {
    ul.innerHTML = "";
    for (let i = 0; i < list.length; i++) {

        let liTag = `
            <li li-index="${i}" onclick="selectedMusic(this)" class="list-group-item d-flex justify-content-between align-items-center">
                <span>${list[i].getSongName()}</span>
                <span id="music-${i}" class="badge bg-primary rounded-pill"></span>
                <audio id="audio-${i}" src="${list[i].file}"></audio>
            </li>`;

        // ul.innerHTML += liTag için liAudioTag.duration çalışmadı
        ul.insertAdjacentHTML("beforeend", liTag)

        let liAudioDuration = ul.querySelector(`#music-${i}`);
        let liAudioTag = ul.querySelector(`#audio-${i}`);

        liAudioTag.addEventListener("loadeddata", () => {
            liAudioDuration.textContent = calculateTime(liAudioTag.duration);
        });

    }
}

const selectedMusic = (li) => {
    const index = li.getAttribute("li-index");
    player.index = index;
    displayMusic(player.getMusic());
    playMusic();
    isPlayingNow();
}

const isPlayingNow = () => {
    for(let li of ul.querySelectorAll("li")) {
        if(li.classList.contains("playing")) {
            li.classList.remove("playing");
        }

        if(li.getAttribute("li-index") == player.index) {
            li.classList.add("playing")
        }
    }
}

audio.addEventListener("ended", () => {
    nextMusic();
})