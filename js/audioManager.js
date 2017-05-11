

let AudioManager = function() {
    var NUM_SAMPLES = 256;
    var song = "media/MyDogsEyes.mp3";
    var audioElement;
	var analyserNode;
	var canvas
    var ctx;
    var data;

    function AudioManager() {
        //set up the canvas
        canvas = document.querySelector("canvas");
		ctx = canvas.getContext("2d");

        // get reference to <audio> element on page
		audioElement = document.querySelector("audio");

        // call our helper function and get an analyser node
        analyserNode = createWebAudioContextWithAnalyserNode(audioElement);
    }

    function createWebAudioContextWithAnalyserNode(audioElement) {
        var audioCtx, analyserNode, sourceNode;

        audioCtx = new (window.AudioContext || window.webkitAudioContext);
        
        // create an analyser node
        analyserNode = audioCtx.createAnalyser();
        
        //Fast Fourier Transform
        analyserNode.fftSize = NUM_SAMPLES;
        
        // this is where we hook up the <audio> element to the analyserNode
        sourceNode = audioCtx.createMediaElementSource(audioElement); 
        //sourceNode.connect(audioCtx.destination); //Maybe uncomment this?

        sourceNode.connect(analyserNode);
        analyserNode.connect(audioCtx.destination);
        
        return analyserNode;
    }


    AudioManager.prototype.startSong = function(){
        audioElement.src = song;
        audioElement.play();
        audioElement.volume = 1.0;
    }

    AudioManager.prototype.update = function() {
        //create a new array of 8-bit integers (0-255)
	    data = new Uint8Array(NUM_SAMPLES/2);

        analyserNode.getByteFrequencyData(data);
    }

    AudioManager.prototype.getData = function() {
        return data;
    }

    return AudioManager;
}();