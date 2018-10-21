var mySong;
var analyzer;
var mCanvas;
var myImg;

function preload(){
  mySong = loadSound("./assets/edCastle.mp3");
  myImg = loadImage('./assets/flamingo.jpg');

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Two lines of magic code. The "analyzer" is a sort of "function"
  // able to perform measurements on the song and give back values
  analyzer = new p5.Amplitude();
  analyzer.setInput(mySong);
}

function draw() {
    mCanvas = createCanvas(windowWidth,windowHeight);
    push();
    image(myImg,0,0,0);
    pop();
  var volume = 0;

    //background(0,255,0);


    volume = analyzer.getLevel();
    volume = map(volume,0,1,0,height/2);




  mCanvas.mouseClicked(function(){
    if(mySong.isPlaying()==true){
        mySong.pause();
    }else{
        mySong.play();
    }
});


  ellipse(width/2,height/2, volume, volume);



}


function windowResized(){
  resizeCanvas(windowWidth,windowWidth);
}
