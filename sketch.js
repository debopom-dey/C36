var feedPet,addFood,fedTime,lastFed,foodObj,foodStock,milkBottle,milk;

function preload()
{
  dogImg=loadImage("images/dogImg.png")
  happyDog=loadImage("images/dogImg1.png")
  milkBottle=loadImage("images/Milk.png")
	//load images here
}

function setup() {
  database = firebase.database();
  console.log(database);
	createCanvas(1000, 400);
 
  foodObj=new Food();
  milk=createSprite(720,200,20,20)
  milk.addImage("milkBottle",milkBottle)
  milk.scale=0.15
  milk.visible=false
  dog=createSprite(800,200,100,100)
  dog.addImage(dogImg)
  dog.scale=0.2
  
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  feedPet= createButton("Feed the dog")
  feedPet.position(700,95)
  feedPet.mousePressed(feedDog);
  
 

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods)
}


function draw() {
  background(46,139,87)
  foodObj.display()
  
  
  fedTime=database.ref('lastFedTime');
  fedTime.on("value",function(data){
    lastFed=data.val()  
    });
  fill(255,255,254)
  textSize(15)
 
  if(lastFed>=12){
    text("Last Feed:"+lastFed%12+"PM",350,30)
  }
  else if(lastFed===0){
    text("Last Feed:12 AM",350,30) 
  }
  else{
    text("Last Feed:"+lastFed+"AM",350,30)

  }
  if(mousePressedOver(feedPet)){
 
    milk.visible=true
     }
  drawSprites();
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);

}

function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
  Food:foodObj.getFoodStock(),
  lastFedTime:hour()
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({

  Food:foodS

  })
}