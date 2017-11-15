var myData,

    img = [ //array collegamenti immagini astronauti
  "https://www.howmanypeopleareinspacerightnow.com/app/biophotos/randy-bresnik.jpg",
  "https://www.howmanypeopleareinspacerightnow.com/app/biophotos/sergey-ryazansky.jpg",
  "https://www.howmanypeopleareinspacerightnow.com/app/biophotos/paolo-nespoli.jpg",
  "https://www.howmanypeopleareinspacerightnow.com/app/biophotos/mark-vande-hei.jpg",
  "https://www.howmanypeopleareinspacerightnow.com/app/biophotos/joseph-acaba.jpg",
  "https://www.howmanypeopleareinspacerightnow.com/app/biophotos/alexander-misurkin.jpg"],
    imgA = [], //array immagini già caricate
    imgIco = [], //array icone già caricate

   FlagUSA,
   FlagRussia,
   FlagItaly,

    buttonA,
    buttonB,
    buttonExit,

    modeTime = false;
    modeCountry = false;

    t=0, //tempo dall'apertura della pagina
    W = 1, //costante ridimensionamento
    alph=255, //alpha intro

    AstroArray = [], //array astronauti
    newPosX=[], //array nuova posizione X astronauti
    newPosY=[]; //array nuova posizione Y astronauti


function preload() {
  myData = loadJSON('assets/peopleinspace.json');
  myFontBold = loadFont('assets/G_P_Bold.otf');
  myFontBook = loadFont('assets/G_P_Book.otf');
  myFontMedium = loadFont('assets/G_P_Medium.otf');
  myFontItalic = loadFont('assets/G_P_Italic.otf');

}

function setup() {
  createCanvas(500,500/*windowWidth,windowHeight*/)
  angleMode(DEGREES);
  textAlign(CENTER);
  rectMode(CENTER)

  textSize(12)
  textFont(myFontMedium)
  fill(255)
  noStroke()

  //if (windowWidth > windowHeight) {W = windowHeight/500} else {W = windowWidth/500}


//Desfinisci le array: AstroArray, newPosX e newPosY.
  for(var i = 0; i < myData.number; i++) {
    var imgW = myData.people[i].biophotowidth/7 ;
    var imgH = myData.people[i].biophotoheight/7 ;

    newPosX.push((150*sin(((360/myData.number)*i)+180))-imgW/2);
    newPosY.push((150*cos(((360/myData.number)*i)+180))-imgH/2);

    AstroArray.push(new Astronaut(i,0,0));

  }

  buttonA = new Button()
  buttonExit = new Button()

//Preload imagini e mettile in un array se necessario.

  /*for (var i = 0; i < myData.number; i++) {
    img[i] = loadImage(myData.people[i].biophoto);
  }*/

  for (var i = 0; i < myData.number; i++) {
    imgA[i] = loadImage(img[i]);
  }

  imgMask = loadImage("assets/mask.png");
  back = loadImage("assets/back.png");
  time = loadImage("assets/time_icon.png");
  retu = loadImage("assets/back_icon.png");

  FlagUSA = loadImage("assets/flag-usa.jpg");
  FlagRussia = loadImage("assets/flag-russia.jpg");
  FlagItaly = loadImage("assets/flag-italy.jpg");


}

function draw() {

  t=millis()/1000;
  if(t>5.5) {alph=alph-5}


  if (t>5.5) {

    push()
      menu()
    pop()

    //Astronauti:

    for (var i=0; i<myData.number; i++) {

      push()
        translate(width/2,(height/2))
        scale(W)

        AstroArray[i].display();
        AstroArray[i].move(newPosX[i],newPosY[i]);

        //AstroArray[i].raise();
      pop()
        }


    if (modeTime == false) {
      push()
        buttonA.display(0,0,time);
      pop()
    }

    if (modeTime == true) {
      push()
        buttonExit.display((((8.5*width/10)/2)*W),(-height/2)+(35*W),retu);
      pop()
    }

      }

  intro();



}

function Astronaut(i,posX,posY) {

    this.i = i;

    this.posX = posX;
    this.posY = posY;
    this.S = 50;
    this.ease = 0.05;
    this.imgW = (myData.people[this.i].biophotowidth/7)*W ;
    this.imgH = (myData.people[this.i].biophotoheight/7)*W ;
    this.alphB = 0;

    this.launchDate = Date.parse(myData.people[this.i].launchdate);
    this.timeInSpace = Date.now() - this.launchDate;
    this.date = floor(this.timeInSpace / (1000 * 60 * 60 * 24));

    if (myData.people[this.i].location=="International Space Station"){this.loc="ISS"} else {myData.people[this.i].location}

    this.display = function () {

    if (this.alph <= 255) {this.alph+=2.5}
    if (modeTime==false) {this.alph=0}

    if ((this.alphB >= 0)&&(modeTime==true)) {this.alphB-=10}

      textFont(myFontMedium)
      imgA[this.i].mask(imgMask);

      image(imgA[this.i],this.posX,this.posY,this.imgW,this.imgH)

      if (modeTime==true) {
        this.imgW = (myData.people[this.i].biophotowidth/12)*W ;
        this.imgH = (myData.people[this.i].biophotoheight/12)*W ;


        newPosX[i]=(width/10)-(width/2)
        newPosY[i]=(i*height/(myData.number+1))+40*W-(height/2)

        fill(255,this.alph)
        textSize(10)
        textAlign(LEFT)
        text(myData.people[this.i].name,(2.5*width/10)-(width/2),(i*height/(myData.number+1))+15*W-(height/2)+(this.imgH/2))
        text("Title: "+myData.people[this.i].title+"     Location: "+ this.loc+"     Country: "+myData.people[this.i].country,(2.5*width/10)-(width/2),(i*height/(myData.number+1))+32.5*W-(height/2)+(this.imgH/2))
        text("Launch date: "+myData.people[this.i].launchdate+" - "+this.date+" days in space",(2.5*width/10)-(width/2),(i*height/(myData.number+1))+50*W-(height/2)+(this.imgH/2))

        textAlign(CENTER)
        fill(255,this.alphB)
        text(myData.people[this.i].name,this.posX+(this.imgW/2),this.posY+(9*this.imgH/10)) //qua si puo usare anche la array people che contiene gli oggetti astronauti
        textFont(myFontMedium)
        text(myData.people[this.i].title,this.posX+(this.imgW/2),this.posY+(9*this.imgH/10)+13) //qua si puo usare anche la array people che contiene gli oggetti astronauti

      }

      if (modeTime == false) {


        if ((this.alphB <= 255)&&(modeTime==false)) {this.alphB+=10}

        textFont(myFontBold)
        this.imgW = myData.people[this.i].biophotowidth/7 ;
        this.imgH = myData.people[this.i].biophotoheight/7 ;

        newPosX[i]=((150*sin(((360/myData.number)*i)+180))-this.imgW/2);
        newPosY[i]=((150*cos(((360/myData.number)*i)+180))-this.imgH/2);

        fill(255,this.alphB)
        text(myData.people[this.i].name,this.posX+(this.imgW/2),this.posY+(9*this.imgH/10)) //qua si puo usare anche la array people che contiene gli oggetti astronauti
        textFont(myFontMedium)
        text(myData.people[this.i].title,this.posX+(this.imgW/2),this.posY+(9*this.imgH/10)+13) //qua si puo usare anche la array people che contiene gli oggetti astronauti
        //text("on "+myData.people[this.i].location,this.posX+(this.imgW/2),this.posY+(9*this.imgH/10)+26) //qua si puo usare anche la array people che contiene gli oggetti astronauti
      }
    }

    this.move = function (newXIni,newYIni) {

      this.newX = newXIni;
      this.newY = newYIni;

      this.dx = (this.newX - this.posX);
      this.posX += this.dx * this.ease;


      this.dy = (this.newY - this.posY);
      this.posY += this.dy * this.ease;

    }

    /*this.raise = function () {
      this.d = dist(mouseX-(width/2), mouseY-(height/2), this.posX, this.posY)
      if (this.d < this.imgW) {scale(1.25)}
    }*/

/*
    this.launchDate = Date.parse(launchDate);
    var timeInSpace = Date.now() - this.launchDate;
    this.radius = floor(timeInSpace / (1000 * 60 * 60 * 24)) / 5;
*/


}

function Button () {

this.display = function(posX,posY,img) {

    this.img=img;
    this.posX=posX;
    this.posY=posY;

    translate(width/2,(height/2))
    scale(W)

    this.d = dist(mouseX, mouseY, this.posX+(width/2), this.posY+(height/2));
    tint(255, 150);

    if (this.d > 25*W) {image(this.img,this.posX-25*W,this.posY-20*W,40*W,40*W)}
    else {{image(this.img,this.posX-35*W,this.posY-30*W,60*W,60*W)}}
  }



}

function intro() {
  push()
    background(0,alph)

    translate(width/2,(height/2))
    scale(W)

    fill(255,255,255,alph)
    textFont(myFontBold)
    textSize(30)
    text("People in Space right now",0,0)
    textFont(myFontItalic)
    textSize(15)
    text('"the earth is the cradle of humanity,',0,35)
    text('but humankind cannot stay in the cradle forever"',0,58)
    text("(Tsiolkovsky)",0/*168*/,84)
  pop()
}

function menu() {
push()

  push()
    scale(W)
    background(0)
    translate(0,25*W)
    image(back,0,0);
  pop()

  translate(width/2,(height/2))
  scale(W)

  //scrivere qui se si vuole una scritta al centro dei ritratti

pop()
}

function mousePressed() { //
  if ((buttonA.d < 25)&&(modeTime==false)) {modeTime=!modeTime}
  else if ((buttonExit.d < 25)&&(modeTime==true)) {modeTime=!modeTime}
}

function windowResized() { //redi la finestra Responsive
  resizeCanvas(windowWidth, windowHeight);

/*if (windowWidth<500) {
 if (windowWidth > windowHeight) {W = windowHeight/500} else {W = windowWidth/500};
/*  }
else {if (windowWidth > windowHeight) {W = windowHeight/750} else {W = windowWidth/750};}
*/}
