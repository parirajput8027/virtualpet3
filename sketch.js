var dog;
var foodS;
var database;
var foodstock;
var happydogImg;
var dogImg;

var food;
var addfood,feedfood;
var fedTime,lastFed;

var bedroomImg,washroomImg,gardenImg;

var gameState;
var readGamestate;

var currentTime;

function preload()
{
	happydogImg=loadImage("images/dogImg1.png")
  dogImg=loadImage("images/dogImg.png")
  bedroomImg = loadImage("images/Bed Room.png")
  washroomImg = loadImage("images/Wash Room.png")
  gardenImg = loadImage("images/Garden.png")
}

function setup() 
{
	createCanvas(550, 600);

  dog = createSprite(400,350)
  dog.addImage(dogImg)
  dog.scale=0.2

  database=firebase.database()

  foodstock=database.ref('Food')
  foodstock.on("value",readStock)

  

  food = new Food()

  
  feedfood = createButton("Feed Food")
  feedfood.position(600,70)
  feedfood.mousePressed(feedDog)

   addfood = createButton("Add Food")
   addfood.position(500,70)
   addfood.mousePressed(addFood)
  

   readGamestate = database.ref('gameState')
   readGamestate.on("value",function(data){
    gameState = data.val()
   })
   
   
}


function draw() 
{  
  background("lightblue")

  fedTime=database.ref('feedTime')
  fedTime.on("value",function(data)
  {
  lastFed = data.val();
  })

  fill("black")
  textSize(15)
  if(lastFed>=12){
  text("LAST FEED :" +lastFed%12 + "PM",350,35)}
  else if(lastFed===0)
  {
   text("LAST FEED: 12AM",350,35)
  }
  else
  {
  text("LAST FEED:" +lastFed +"AM",350,35)
  }

 

  if(gameState!=="hungry")
  {
  feedfood.hide()
  addfood.hide()
  }else{
    feedfood.show();
    addfood.show();
    food.display()
    drawSprites();
  }

  currentTime = hour()
  if(currentTime==(lastFed+1))
  {
   update("playing")
   food.garden()
  }
  else if(currentTime==(lastFed+2))
  {
  update("sleeping")
  food.bedroom()
  }
  else if(currentTime>(lastFed+2)&& currentTime<=(lastFed+4))
  {
   update("bathing")
   food.washroom()
  }
  else{
    update("hungry")
    food.display()
  }
}

function readStock(data)
{
  foodS = data.val();
  food.updateFood(foodS)
}

function writeStock(x)
{
  if(x<=0){
   x=0
  }else{
   x=x-1}
  database.ref('/').update({
    Food:x
  })
}

function addFood()
{
 foodS++
 dog.addImage(dogImg)
 database.ref('/').update({
 Food: foodS
 })
}

function feedDog()
{
  foodS--
 dog.addImage(happydogImg)

 database.ref('/').update({
  Food: foodS
 })
}

function update(state)
{
 database.ref('/').update({
   gameState:state
 })
}