const video = document.querySelector('video');
var newImg = document.createElement("img"); // create img tag

// Method to delay execution.
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

//Check if the device has a camera.
if (navigator.mediaDevices) {
    // Not adding `{ audio: true }` since we only want video for now.
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {

        // video.src = window.URL.createObjectURL(stream);
        // video.play();

        // Create a MediaStream Object to send to the ImageCapture constructor.
	    const mediaStreamTrack = stream.getVideoTracks()[0];
  		const imageCapture = new ImageCapture(mediaStreamTrack);

  		// Take a photo and use it as the src for the img tag
  		imageCapture.takePhoto().then(function(blob) {
  			console.log(blob);
  			newImg.src = URL.createObjectURL(blob);
  		});

  		// Add the image to the page.
  		document.body.appendChild(newImg);

  		// This process takes 0.957 seconds to complete. Close the stream after.
  		sleep(957).then(() => {
  			mediaStreamTrack.stop();
		});

    });
}


