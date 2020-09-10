//globals for script file
  let  scene, camera, renderer, controls, light, testing;
  var w =window.innerWidth;
  var h = window.innerHeight;

  //globals for camera motion
    var mouse = new THREE.Vector2();
    //coordinates for camera.lookAt (updated by events)
    var cx= 0;
    var cy= 0;
    var cz= 0;
    //direction to move camera
    var left =false;
    var right =false;
    var up = false;
    var down = false;
    // speed to move camera
    var speed = 0.1;
    //area to point/look to change camera view(Outer 10%)
    var upzone =  h * 0.9;
    var downzone = h * 0.1;
    var leftzone = w * 0.1;
    var rightzone = w * 0.9;
    let moving = false;
    //upper and lower limits for camera motion
    let ul = 10;
    let ll = -10;

//function to build scene
  function init() {
    // adds scene, and soft white light so you can see
    scene = new THREE.Scene(); 
    light = new THREE.AmbientLight( 0x404040 );

    // adds a camera, positions it, and sets initial lookat target. Target updates
    //upon mousemove
    camera = new THREE.PerspectiveCamera (55,w/h, 45, 30000);
    camera.position.set (0,10,-50);
    
    camera.lookAt(cx,cy,cz);
    prevX = cx;
    prevY = cy;
    document.addEventListener('mousemove', onZoneDetect, false);
    window.addEventListener('resize', onResize, false);
    
    // adds a helper grid. Used this while testing view controls
    var gridXZ = new THREE.GridHelper(100, 100, 0xff0000, 0xffffff);

  // hidden section
       /*   
        OLD SECTION, shows successful code for orbital controls with three.js. Needed 
          to make custom controls to follow mouse, and then webgazer inputs.
            controls = new THREE.OrbitControls( camera, renderer.domElement );
            controls.update();

          OLD SECTION, shows successful code for skybox.
            let materialArray = [];
            let texture_ft = new THREE.TextureLoader().load( '../sky/fieldft.jpg');
            let texture_bk = new THREE.TextureLoader().load( '../sky/fieldbk.jpg');
            let texture_up = new THREE.TextureLoader().load( '../sky/fieldup.jpg');
            let texture_dn = new THREE.TextureLoader().load( '../sky/fielddn.jpg');
            let texture_rt = new THREE.TextureLoader().load( '../sky/fieldrt.jpg');
            let texture_lf = new THREE.TextureLoader().load( '../sky/fieldlf.jpg');
              
            materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
            materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
            materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
            materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
            materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
            materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));

            for (let i = 0; i < 6; i++)
               materialArray[i].side = THREE.BackSide;
            let skyboxGeo = new THREE.BoxGeometry( 10000, 10000, 10000);
            let skybox = new THREE.Mesh( skyboxGeo, materialArray );
            scene.add( skybox );   
              */


    //Code for Skydome in Scene
    var skyGeo = new THREE.SphereGeometry(10000, 25, 25); 
    let skypic = new THREE.TextureLoader().load( '../sky/sky.jpg' );
    var material = new THREE.MeshBasicMaterial({ map: skypic});
    var sky = new THREE.Mesh(skyGeo, material);
    //projects image on inside of sphere instead of outside
    sky.material.side = THREE.BackSide;

    //Code to render Scene, and add items to it.
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(w,h);
    document.body.appendChild(renderer.domElement);
    scene.add(gridXZ,sky,light);
  
    animate();
  }

  function animate() {
    //renders scene at the animation rate of the browser and updates the camera
  
    updateCamera();
    renderer.render(scene,camera);
    requestAnimationFrame(animate);
  }
  function onResize() {
    //updates window size and adjusts camera and scene on resize
    w = window.innerWidth;
    h = window.innerHeight;
    upzone =  h * 0.9;
    downzone = h * 0.1;
    leftzone = w * 0.1;
    rightzone = w * 0.9;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

function updateCamera() {
  if (!moving) return; //only runs if moving = true
      //OLD SECTION
          //offset the camera.lookAt x/y based on the mouse's position in the window
          // cx = prevX + (cameraHorzLimit * mouse.x);
           // cy = prevY + (cameraVertLimit * mouse.y);

  //logic to move the camera smoothly         
  if(right){ 
      cx +=  (speed * mouse.x);
      right =false;
      moving = false;
  }
  if(left){
      cx += (speed * mouse.x);
      left=false;
      moving = false;
  }
  if(down){
      cy += (speed * mouse.y);
      down=false;
      moving = false;
  }
  if(up){
      cy += (speed * mouse.y);
      up=false;
      moving = false;
  }
    camera.lookAt(cx,cy,cz);
   
    
}

      //OLD SECTION. moved camera based on ALL mouse movements
        // function onDocumentMouseMove(event) {
        //     event.preventDefault();
        //     //added '-' to mouse.x calc to fix x-axis inversion
        //     mouse.x = -((event.clientX / w) * 2 - 1);
        //     mouse.y = -(event.clientY / h) * 2 + 1;
            
        // }


function onZoneDetect(e){
  event.preventDefault();  
  mouse.x = -((e.clientX / w) * 2 - 1);
  mouse.y = -(e.clientY / h) * 2 + 1;
 
//turns on and specifies directional movement based on mouse position with a limit

  if(e.clientX>rightzone && cx>=ll){
      moving = true;
      left = false;
      right = true; 
  
}
  if(e.clientX<leftzone && cx<=ul){
    moving = true;
    left = true;
    right = false; 
}
  if(e.clientY>upzone && cy >=ll){
    moving = true; 
    down = false;
    up = true; 
}

  if( e.clientY<downzone && cy <=ul){
    moving = true;
    down = true;
    up = false; 
  }

  
}


  
  init();
