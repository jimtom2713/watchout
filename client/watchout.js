// start slingin' some d3 here.


//if we detect collision -> two objects overlap
  //up collision count by 1
  //stop detection colissions until they don't overlap




//build the game area
d3.select('body').append('svg').attr('class', 'game-area');
var playerXY = {x:400,y:300};
var colisionCount = 0;
var currentScore = 0;
var highScore = 0;

var checkCollision = function () {
  var userX = playerXY.x;
  var userY = playerXY.y;
  var enemyCoordinate = d3.select('svg').selectAll('.enemy');
  for(var i = 0; i < enemyCoordinate[0].length; i++){
    var tempX = Math.pow((userX - enemyCoordinate[0][i].__data__.cx) , 2);
    var tempY = Math.pow((userY - enemyCoordinate[0][i].__data__.cy) , 2);
    var temp = tempX + tempY;
    if(Math.sqrt(temp) < 40 && currentScore > 0){
      //increase collision count
      colisionCount++;
      d3.select('.collisions').select('span').text(colisionCount);
      console.log('Collision');
      currentScore = 0;
      return;
    }
    else{
      increaseScore();
    }
  }
}

function increaseScore(){
  currentScore++;
  d3.select('.current').select('span').text(currentScore);
  if(currentScore > highScore){
    d3.select('.high').select('span').text(currentScore);
    highScore = currentScore;
  }
}
var drag = d3.behavior.drag()  
             .on('dragstart', function() { 
                                            setInterval(checkCollision, 100);
                                          })
             .on('drag', function() { player.attr('cx', d3.event.x)
                                            .attr('cy', d3.event.y)
                                            .attr('x', d3.event.x)
                                            .attr('y', d3.event.y);

                                      playerXY.x = d3.event.x;
                                      playerXY.y = d3.event.y;
                                     })
             .on('dragend', function() {});
 
var player = d3.select('svg').append('svg').attr('class', 'player').append('image')
                  .attr("cx", 400)
                  .attr("cy", 300)
                  .attr("r", 40)
                  .attr("xlink:href", "img/penguin.png")
                  .attr("width", 80)
                  .attr("height", 80)
                  .attr("x", 400)
                  .attr("y", 300)
                  // .attr("fill", 'red' )
                  .call(drag);    


function update(){
  var storageArray = [];
  for (var i = 0; i < 20; i++){
    var x = Math.random()*1400;
    var y = Math.random()*800;
    var enemyCoordinate = {
      cx : x,
      cy : y,
    };
    storageArray.push(enemyCoordinate);
  }

  var existing = d3.select('svg').selectAll('.enemy').data(storageArray);
  existing.enter().append('image')
                  .attr('class', 'enemy');
  existing.transition().duration(500)
                  .attr("cx", function(d) { return d.cx; })
                  .attr("cy", function(d) { return d.cy; })
                  .attr("x", function(d) { return d.cx; })
                  .attr("y", function(d) { return d.cy; })
                  .attr("xlink:href", "img/polarBear.png")
                  .attr("width", 80)
                  .attr("height", 80)
                  .attr("r", 40); 
  // var existing = d3.select('svg').selectAll('.enemy').data(storageArray);
  // existing.enter().append('circle')
  //                 .attr('class', 'enemy');
  // existing.transition().duration(500)
  //                 .attr("cx", function(d) { return d.cx; })
  //                 .attr("cy", function(d) { return d.cy; })
  //                 .attr("r", 20);  

}
// setInterval(increaseScore, 500);
// setInterval(checkCollision, 100);
setInterval(update, 1000);