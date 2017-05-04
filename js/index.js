

//An object literal that contains the states that the project can be in
const STATE = {
    TITLE: 0,
    LOADING: 1,
    SONG: 2,
    END: 3
}

//An object literal used to track the portion the song is currently in
const SONG_STATE = {
    INTRO: 0,
    STREETLIGHTS: 1,
    CHIMNEY: 2,
    REDROOFS: 3,
    DOGSEYES: 4,
    BOAT: 5,
    WATER: 6,
    VELVET: 7,
    MOON: 8,
    WONDER: 9,
    UNSEEING: 10,
    TRAIN: 11,
    QUESTION: 12,
    MECHANIZED: 13,
    IM_SURE: 14
}

//An array of the lyrics, to be used in the image generation
let lyrics;

//An array of the images used
let images;
let areImagesLoaded;
let numImagesLoaded;

//The current state of the project, starting at title
let state;
let songState;

//canvas infomation
let canvas;
let ctx;


//Initialize the fields
function init() {
    lyrics = [];
    populateLyrics();

    images = [];
    areImagesLoaded = false;
    numImagesLoaded = 0;
    loadImages();

    state = STATE.TITLE; //TODO: change this to title, song currently for debugging
    songState = SONG_STATE.INTRO;

    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");

    canvas.width = 800;
    canvas.height = 800;


    //Kick off the project
    update();
}

//Sets all of the data in the lyric array
function populateLyrics() {
    lyrics[0] = "You'll notice yourself smiling with delight over things you once paid no attention to";
    lyrics[1] = "Streetlights on the river";
    lyrics[2] = "Smoke rising from a chimney";
    lyrics[3] = "Red roofs in the trees";
    lyrics[4] = "My dog's eyes";
    lyrics[5] = "Water being cut at the bow of a boat";
    lyrics[6] = "Looking into deep, clear water";
    lyrics[7] = "Red velvet";
    lyrics[8] = "The moon in the clouds";
    lyrics[9] = "These were children who hadn't yet lost their sense of wonder";
    lyrics[10] = "They hadn't become unseeing, and unfeeling";
    lyrics[11] = "A fast train rushing";
    lyrics[12] = "If children were asked the smae question today";
    lyrics[13] = "Their answers would reflect a more mechanized world";
    lyrics[14] = "But I'm sure they'd still have that sense of wonder";
}

//Loads in all of the images used for the song
function loadImages() {
    images[0] = new Image();
    images[0].src = "media/smiling.jpg"
    images[1] = new Image();
    images[1].src = "media/smiling.jpg"
    images[2] = new Image();
    images[2].src = "media/smiling.jpg"
    images[3] = new Image();
    images[3].src = "media/smiling.jpg"
    images[4] = new Image();
    images[4].src = "media/smiling.jpg"
    images[5] = new Image();
    images[5].src = "media/smiling.jpg"
    images[6] = new Image();
    images[6].src = "media/smiling.jpg"
    images[7] = new Image();
    images[7].src = "media/smiling.jpg"
    images[8] = new Image();
    images[8].src = "media/smiling.jpg"
    images[9] = new Image();
    images[9].src = "media/smiling.jpg"
    images[10] = new Image();
    images[10].src = "media/smiling.jpg"
    images[11] = new Image();
    images[11].src = "media/smiling.jpg"
    images[12] = new Image();
    images[12].src = "media/smiling.jpg"
    images[13] = new Image();
    images[13].src = "media/smiling.jpg"
    images[14] = new Image();
    images[14].src = "media/smiling.jpg"

    //Add an event listener to increment numImagesLoaded when each image loads
    for (let i = 0; i < images.length; i++) {
        images[i].addEventListener('load', function() {
            ++numImagesLoaded;
        });
    }
}

//Called once per frame
function update() {
    //Call update once per frame
    window.requestAnimationFrame(update);

    //The switch statement that is controleld by the current state of the project
    switch (state) {
        case STATE.TITLE:
            updateTitle();
            break;
        case STATE.LOADING:
            updateLoading();
            break;
        case STATE.SONG:
            updateSong();
            break;
        case STATE.END:
            updateEnd();
            break;
    }
}

//Called by update when the title screen is the current state
function updateTitle() {
    ctx.baseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText("MY DOG'S EYES", canvas.width / 2, canvas.height / 2);

    //Move to the next state
    if (myKeys.keydown[32]) {
        if (numImagesLoaded === images.length)
            state = STATE.SONG;
        else
            state = STATE.LOADING;
    }
};

//Called only if the images are not done loading when exiting the title state
function updateLoading() {
    ctx.baseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText("LOADING", canvas.width / 2, canvas.height / 2);

    if (numImagesLoaded === images.length)
        state = STATE.SONG;
}

//Called by update when the song is the current state
function updateSong() {
    //Switch statement that controls which part of the song is currently being played
    switch (songState) {
        case 0:
            renderImage(images[0]);
            break;
        case 1:
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
        case 5:
            break;
        case 6:
            break;
        case 7:
            break;
        case 8:
            break;
        case 9:
            break;
        case 10:
            break;
        case 11:
            break;
        case 12:
            break;
        case 13:
            break;
        case 14:
            break;
    }
};

//Called by update when the end screen is the current state
function updateEnd() {
    ctx.baseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText("THE END", canvas.width / 2, canvas.height / 2);

    //Move to the next state
    if (myKeys.keydown[32]) {
        state = STATE.TITLE;
    }
};

function renderImage(img) {
    ctx.drawImage(img, 0, 0);
}


//Start the project on window load.
//Init calls the first frame of update
window.onload = init;