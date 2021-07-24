class Food
{
 constructor()
 {
  this.image = loadImage("images/Milk.png")
  this.foodStock=0;
 }

 getfedTime(lastFed)
 {
   this.lastFed = lastFed
 }

 deductFood()
 {
  if(this.foodStock>0)
  {
   this.foodStock = this.foodStock-1
  }
 }

 getfoodStock()
 {
  return this.foodStock;
 }

 updateFood(foodStock)
 {
  this.foodStock = foodStock;
 }

 bedroom()
 {
  background(bedroomImg,550,600)
 }

 garden()
 {
  background(gardenImg,550,600)
 }

 washroom()
 {
  background(washroomImg,550,600)
 }


 display()
 {
   var x = 80;
   var y = 100;
  imageMode(CENTER)
  image(this.image,800,300,90,90)

   if(this.foodStock!=0)
   {
   for(var i=0;i<this.foodStock;i++)
   {
    if(i%10==0)
    {
    x=80
    y = y+50
  }
   image(this.image,x,y,50,50)
  x=x+30
  }
   }
  }
 }