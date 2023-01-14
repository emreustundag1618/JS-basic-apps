class MusicPlayer  {
    constructor(musicList) {
        this.musicList = musicList;
        this.index = 0; // for next song, this has to be changed
    }

    getMusic() {
        return this.musicList[this.index];
    }

    next() {
        if (this.index + 1 < this.musicList.length) {
            this.index++;
        } else {
            this.index = 0; // başa dön
        }
    }

    prev() {
        if (this.index > 0) {
            this.index--;
        } else {
            this.index = this.musicList.length - 1; // sona dön
        }
    }
}