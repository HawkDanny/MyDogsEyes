

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
let imageData;
let areImagesLoaded;
let numImagesLoaded;
let areImagesPrepped;

//The current state of the project, starting at title
let state;
let songState;

//canvas infomation
let canvas;
let ctx;

//Dynamic information
let fontSizeMin;
let fontSizeMax;
let kerning;
let lineheight;

//Initialize the fields and call set up methods
function init() {
    lyrics = [];
    populateLyrics();

    images = [];
    areImagesLoaded = false;
    numImagesLoaded = 0;
    loadImages();
    imageData = [];
    areImagesPrepped = false;

    state = STATE.TITLE;
    songState = SONG_STATE.INTRO;

    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");

    canvas.width = 800;
    canvas.height = 800;

    fontSizeMin = 8;
    fontSizeMax = 36;
    kerning = 5;
    lineheight = 12;

    //Kick off the project
    update();
}

//Sets all of the data in the lyric array
function populateLyrics() {
    lyrics[0] = "You'll notice yourself smiling with delight over things you once paid no attention to ";
    lyrics[1] = "Streetlights on the river ";
    lyrics[2] = "Smoke rising from a chimney ";
    lyrics[3] = "Red roofs in the trees ";
    lyrics[4] = "My dog's eyes ";
    lyrics[5] = "Water being cut at the bow of a boat ";
    lyrics[6] = "Looking into deep, clear water ";
    lyrics[7] = "Red velvet ";
    lyrics[8] = "The moon in the clouds";
    lyrics[9] = "These were children who hadn't yet lost their sense of wonder ";
    lyrics[10] = "They hadn't become unseeing, and unfeeling ";
    lyrics[11] = "A fast train rushing ";
    lyrics[12] = "If children were asked the same question today ";
    lyrics[13] = "Their answers would reflect a more mechanized world ";
    lyrics[14] = "But I'm sure they'd still have that sense of wonder ";
}

//Loads in all of the images used for the song
function loadImages() {
    images[0] = new Image();
    images[0].src = "media/start.png"
    images[1] = new Image();
    images[1].src = "media/blue.png"
    images[2] = new Image();
    images[2].src = "media/start.png"
    images[3] = new Image();
    images[3].src = "media/blue.png"
    images[4] = new Image();
    images[4].src = "media/start.png"
    images[5] = new Image();
    images[5].src = "media/blue.png"
    images[6] = new Image();
    images[6].src = "media/start.png"
    images[7] = new Image();
    images[7].src = "media/blue.png"
    images[8] = new Image();
    images[8].src = "media/start.png"
    images[9] = new Image();
    images[9].src = "media/blue.png"
    images[10] = new Image();
    images[10].src = "media/start.png"
    images[11] = new Image();
    images[11].src = "media/blue.png"
    images[12] = new Image();
    images[12].src = "media/start.png"
    images[13] = new Image();
    images[13].src = "media/blue.png"
    images[14] = new Image();
    images[14].src = "media/start.png"

    //Add an event listener to increment numImagesLoaded when each image loads
    for (let i = 0; i < images.length; i++) {
        images[i].width = 800;
        images[i].height = 800;

        images[i].addEventListener('load', function() {
            ++numImagesLoaded;
        });
    }
}

//Populates the imageData array with pixel data from each image loaded into the images array
function populateImageData() {

    //In order to get the image data, you have to create a temporary canvas in memory,
    //draw the image to the canvas, and then take the canvas data
    for (let i = 0; i < images.length; i++) {
        let img = images[i];
        let tempCanvas = document.createElement('canvas');
        let tempContext = tempCanvas.getContext('2d');
        tempCanvas.width = img.width;
        tempCanvas.height = img.height;
        tempContext.drawImage(img, 0, 0 );
        let temp = tempContext.getImageData(0, 0, img.width, img.height);
        let temp2 = [];
        //loop through the pixel data and chunk it into objects that contain the rgba data
        for (let j = 0; j < temp.data.length; j+=4) {
            temp2[j / 4] = {
                r: temp.data[j],
                g: temp.data[j + 1], 
                b: temp.data[j + 2],
                a: temp.data[j + 3]
            };
        }
        imageData[i] = temp2;
    }

    areImagesPrepped = true;
}

//Checks if all of the images are loaded, and if they are, kicks off populateImageData
function checkImages() {
    if (numImagesLoaded === images.length) {
        areImagesLoaded = true;
    } else { return; }


    //If the images have been loaded in, then get their data
    if (areImagesLoaded && !areImagesPrepped) {
        populateImageData();
    }
}

//Called once per frame
function update() {
    //Call update once per frame
    window.requestAnimationFrame(update);

    //Clear the screen at the beginning of each frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Check the current state, and run the appropriate code per frame
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

    checkImages();

    //Move to the next state
    if (myKeys.keydown[32]) {
        if (areImagesPrepped) {
            state = STATE.SONG;
        } else {
            state = STATE.LOADING;
        }
    }
};

//Called only if the images are not done loading when exiting the title state
function updateLoading() {
    ctx.baseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText("LOADING", canvas.width / 2, canvas.height / 2);

    checkImages();

    //If the images have been prepped, then change state
    if (areImagesPrepped) {
        state = STATE.SONG;
    }
}

//Called by update when the song is the current state
function updateSong() {
    //Switch statement that controls which part of the song is currently being played
    switch (songState) {
        case 0:
            renderTextAsImage(images[songState], imageData[songState]);
            break;
        case 1:
            renderTextAsImage(images[songState], imageData[songState]);
            break;
        case 2:
            renderTextAsImage(images[songState], imageData[songState]);
            break;
        case 3:
            renderTextAsImage(images[songState], imageData[songState]);
            break;
        case 4:
            renderTextAsImage(images[songState], imageData[songState]);
            break;
        case 5:
            renderTextAsImage(images[songState], imageData[songState]);
            break;
        case 6:
            renderTextAsImage(images[songState], imageData[songState]);
            break;
        case 7:
            renderTextAsImage(images[songState], imageData[songState]);
            break;
        case 8:
            renderTextAsImage(images[songState], imageData[songState]);
            break;
        case 9:
            renderTextAsImage(images[songState], imageData[songState]);
            break;
        case 10:
            renderTextAsImage(images[songState], imageData[songState]);
            break;
        case 11:
            renderTextAsImage(images[songState], imageData[songState]);
            break;
        case 12:
            renderTextAsImage(images[songState], imageData[songState]);
            break;
        case 13:
            renderTextAsImage(images[songState], imageData[songState]);
            break;
        case 14:
            renderTextAsImage(images[songState], imageData[songState]);
            break;
    }

    if (myKeys.keydown[32]) {
        ++songState;
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

function renderTextAsImage(img, imgDat) {
    ctx.textAlign = "left";

    //The starting coordinates for the text to be drawn
    let x = 0;
    let y = 10
    let letterCounter = 0;


    while (y < canvas.height) {
        //Get the pixel data from the image based on 
        let imgX = map_range(x, 0, canvas.width, 0, img.width);
        let imgY = map_range(y, 0, canvas.height, 0, img.height);

        //Create an object that contains the pixel's data
        let c = imgDat[imgY * img.width + Math.floor(imgX)];

        let grayValue = Math.floor((c.r * 0.222) + (c.g * 0.707) + (c.b * 0.071));

        //Get the font size from the minimum and maximum font size, controleld by the music
        let fontSize = map_range(grayValue, 0, 255, fontSizeMin, fontSizeMax);
        fontSize = Math.max(fontSize, 1); //Make sure the text is there

        ctx.font = fontSize + "px Courier";
        ctx.fillStyle = "rgb(" + c.r + ", " + c.g + ", " +  c.b + ")";

        let currentLetter = getCurrentLetter(letterCounter);

        ctx.fillText(currentLetter, x, y);

        let letterWidth = ctx.measureText(currentLetter).width + kerning;

        x = x + letterWidth;

        //handle linebreaks
        if (x >= canvas.width)
        {
            x = 0;
            y = y + lineheight; //new line
        }

        ++letterCounter;
    }
}

//Returns the current letter in the lyrics, where counter is an int increasing once per frame
function getCurrentLetter(counter) {
    let currentLyrics = lyrics[songState];
    return currentLyrics[counter % currentLyrics.length];
}

//Function from stack overflow, URL http://stackoverflow.com/questions/5649803/remap-or-map-function-in-javascript
function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}



//Start the project on window load.
//Init calls the first frame of update
window.onload = init;