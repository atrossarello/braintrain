//Code for Video
'use strict';

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const errorMsgElement = document.querySelector('span#errorMsg');

canvas.width = window.innerWidth;
canvas.height =window.innerHeight;

const constraints = {
//  audio: true,
 video: {
    //  width: 1280, height: 720
        width: window.innerWidth,
        height: window.innerHeight
    }

};

// Access webcam
async function init() {
 try {
     const stream = await navigator.mediaDevices.getUserMedia(constraints);
     handleSuccess(stream);
 } catch (e) {
     errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
 }
}

// Success
function handleSuccess(stream) {
 window.stream = stream;
 video.srcObject = stream;
}

// Load init
init();

// //Code for drawing Sprite on Canvas
var image = new Image();
image.src = "Starsprite.png";

var ctx = canvas.getContext("2d");
let magic = false;

var spriteWidth = 187; 
var spriteHeight = 60; 

var rows = 1; 
var cols = 3; 

var width = spriteWidth/cols; 
var height = spriteHeight/rows; 

var curFrame = 0; 
var frameCount = 3; 

// Controller code for sprite position
let x =0;
let y =0; 

let mousex =0;
let mousey =0;
var stillx =0;
var stilly =0;

var srcX=0; 
var srcY=0; 

var left =false;
var right =false;
var up = false;
var down = false;
var speed = 60;
var lift = 30;
var buffer = 100;


function startPosition(e){
    magic =true;
    x =e.clientX;
    y =e.clientY;
    
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function moveDirection(e){
    
    stillx = x + buffer;
    stilly = y + buffer;
    mousex = e.clientX;
    mousey = e.clientY;

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


function endPosition(){
    magic =false;
    ctx.clearRect(x,y,width,height);
}
// canvas.addEventListener("mousedown", startPosition);
// canvas.addEventListener("mousemove",moveDirection);
// canvas.addEventListener("mouseup", endPosition);
// canvas.addEventListener("mousedown",draw);

function moveSprite(){
    if(right && x<canvas.width-width){
        x+=speed; 
        // x+=speed;
        right =false;
    }
    if(left && x>0){
        x-=speed; 
        left=false;
    }
    if(down && y<canvas.height-height){
        y+=lift; 
        down=false;
    }
    if(up && y>0){
        y-=lift; 
        up=false;
    }
}

function updateFrame(){
    curFrame = ++curFrame % frameCount; 				
    srcX = curFrame * width; 
    moveSprite();
   
}

function draw(){
    if (!magic) return;
    ctx.clearRect(x,y,width,height);
    updateFrame();
    ctx.drawImage(image,srcX,srcY,width,height, x,y,width,height);
}

setInterval(draw,200);







