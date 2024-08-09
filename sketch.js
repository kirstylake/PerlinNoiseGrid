var stepSize = 20;

function setup() {
  createCanvas(500, 500);
  angleMode(DEGREES);
}
///////////////////////////////////////////////////////////////////////
function draw() {
  background(125);

  //the position of the mouseY affects the noice detail to draw different versions of the drawing
  noiseDetail(map(mouseY,0,height,0,10));
  colorGrid();
  compassGrid();
}
///////////////////////////////////////////////////////////////////////
function colorGrid(){
  // your code here
  fill(255);
  noStroke( );

  for (var i = 0; i < 26; i++){
    for (var j = 0; j < 26; j++){
      colorMode(RGB);

      var xValue = (width / 25) * i;
      var yValue = (height / 25) * j;

      //adjusting the colour to move faster or slower depending on the mouse movement
      var n = noise(xValue / 100 , yValue / 100 , (frameCount / (50 + ( mouseX ) )));

      //setting the from colour and the to color for the lerp
      var fromColour = color(206, 86, 121);
      var toColour = color(86, 121, 206);
      var c = lerpColor(fromColour, toColour, n);
      fill(c);

      rect(xValue, yValue, stepSize, stepSize);
    }
  }
}
///////////////////////////////////////////////////////////////////////
function compassGrid(){
  // your code here
  //this puts the lines at the center of the block
  translate(stepSize / 2, 0);
  for (var i = 0; i < 26; i++){
    for (var j = 0; j < 26; j++){
      var xValue = (width / 25) * i;
      var yValue = (height / 25) * j;

      //the lines rotate faster or slower depending on the mouse movement
      var n = noise(xValue / 100 , yValue / 100 , (frameCount / (100 + ( mouseX ))));
      var angle = map(n, 0, 1, 0, 720);

      //draw and rotate the lines
      push()
      translate(xValue, yValue);
      rotate(angle);
      translate(-xValue, -yValue);
      stroke(121, 206, 86);

      //The n value affects the length of the line
      line(xValue, yValue, xValue, ( yValue + stepSize ) * n);
      pop();

    }
  }
}
