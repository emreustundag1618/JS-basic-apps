class Music {
    constructor(title, singer, img, file) {
        this.title = title;
        this.singer = singer;
        this.img = img;
        this.file = file;
    }

    getSongName() {
        return this.title + " - " + this.singer;
    }
}

const musicList = [
    new Music("Interstellar","Hans Zimmer","./img/hanszimmer.jpg","./mp3/interstellar.mp3"),
    new Music("Experience","Ludovico Einaudi","./img/ludovico.jpg","./mp3/experience.mp3"),
    new Music("Remembrance","Balmorhea","./img/rememberance.jpg","./mp3/remembrance.mp3")
]
