

//An object literal that contains the states that the project can be in
const STATE = {
    TITLE: 0,
    SONG: 1,
    END: 2
}


//The current state of the project, starting at title
let state = STATE.SONG;

//Called once per frame
function update() {

    //The switch statement that is controleld by the current state of the project
    switch (state) {
        case 0:
            updateTitle();
            break;
        case 1:
            updateSong();
            break;
        case 2:
            updateEnd();
            break;
    }
}

//Called by update when the title screen is the current state
function updateTitle() {

}

//Called by update when the song is the current state
function updateSong() {

}

//Called by update when the end screen is the current state
function updateEnd() {

}