

const state = {
  backend: 'webgl'
};

let model;


async function main() {
  await tf.setBackend(state.backend);
  model = await handpose.load();

  landmarksRealTime(video);
}

const landmarksRealTime = async (video) => {
  async function frameLandmarks() {

    const predictions = await model.estimateHands(video);
    
    if (predictions.length > 0) {

      const result = predictions[0].landmarks;
      // console.log(result, predictions[0].annotations);
      var length = predictions.length;
            
      for (let i = 0; i < length; i++) {
        const keypoints = predictions[i].landmarks;
        // console.log(predictions)
        magic =true;
        // console.log(magic);
       
    
          const keypointsArray = keypoints;
         
          stillx = x + buffer;
          stilly = y + buffer;
          mousex = keypointsArray[i][0];
          mousey = keypointsArray[i][1];
         
        
          if(mousex>stillx){
          left = false;
          right = true; 
          
        }
          if(mousex<stillx){
          left = true;
          right = false; 
        }
          if(mousey>stilly){
          down = true;
          up = false; 
        }
        
          if(mousey<stilly){
              down = false;
              up = true; 
          }
          
        }
      
    }
    if(predictions.length < 1){
      magic = false;
      // console.log(magic);
      ctx.clearRect(x,y,width,height);
    }

    
    rafID = requestAnimationFrame(frameLandmarks);
  };
  

  frameLandmarks();
};

video.addEventListener("loadeddata", main);

