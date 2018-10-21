var mySong;
var analyzer;
var mCanvas;
var myImg;
var maskImage;
var a;
var mic;
var fft;



function preload(){
  mySong = loadSound("./assets/edCastle.mp3");
  myImg = loadImage('./assets/beach.jpg');
  maskImage = loadImage('./assets/forma.png');


  stop = loadImage("./assets/stop.png");
play = loadImage("./assets/play.png")



}

function setup() {
  mic = new p5.AudioIn();
 mic.start();
 fft = new p5.FFT();
 fft.setInput(mic);

  createCanvas(windowWidth, windowHeight);

  // Two lines of magic code. The "analyzer" is a sort of "function"
  // able to perform measurements on the song and give back values
  analyzer = new p5.Amplitude();
  //analyzer = new
  analyzer.setInput(mySong);
  myImg.filter("invert");




}

function draw() {
 var a=0;



    mCanvas = createCanvas(windowWidth,windowHeight);
    background(255,255,255);
    myImg.mask(maskImage,0,0);
    imageMode(CENTER);
  image(myImg,width/2 , height/2, myImg.width/8, myImg.height/8);

  var volume = 0;

if (mySong.isPlaying()) {
image(stop,width/2,height/2 + 270,stop.width/18, stop.height/18); } else {image(play,width/2,height/2 + 270,stop.width/18, stop.height/18)}


var spectrum = fft.analyze();



push();
translate(width/2,height/2);
//amp = ampiezza dello spettro.

for (var i = 0; i < spectrum.length; i++) {
    var angle = map(i, 200, spectrum.length, 300, 360);
    var amp = spectrum[i];
    var r = map(amp, 0, 256, 0, 290);
    var x = r * cos(angle);
    var y = r * sin(angle);
    stroke(255, i, i);
    line(0, 0, x, y);

};
pop();


    volume = analyzer.getLevel();
    volume = map(volume,0,1,0,height/2);


function changeit() {
  background(0,0,0);
}




  mCanvas.mouseClicked(function(){
    if(mySong.isPlaying()==true){
        mySong.pause();
        //myImg.filter("POSTERIZE", 3);
        myImg.filter("invert");


    //changeit();


    }else{
        //background(0,255,0);
        mySong.play();
        myImg.filter("invert");
        //changeit();



    }
});

strokeWeight(0);
fill(255,0,0);
  ellipse(width/2,height/2, volume, volume);


for ( var i = 0; i<50; i =i+1) {
  fill('red');
  ellipse(random()*width,random()*height, volume/14, volume/14);
}







}


function windowResized(){
  resizeCanvas(windowWidth,windowWidth);
}
