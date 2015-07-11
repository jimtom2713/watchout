// start slingin' some d3 here.


//build the game area
d3.select('body').append('svg').attr('class', 'game-area');

// console.log(player);

var drag = d3.behavior.drag()  
             .on('dragstart', function() { player.style('fill', 'blue'); })
             .on('drag', function() { player.attr('cx', d3.event.x)
                                            .attr('cy', d3.event.y); })
             .on('dragend', function() { player.style('fill', 'red'); });

var player = d3.select('svg').append('svg').attr('class', 'player').append('circle')
                  .attr("cx", 400)
                  .attr("cy", 300)
                  .attr("r", 20)
                  .attr("fill", 'red' )
                  .call(drag);    
// var player = d3.select('.player').call(drag);


// var drag = d3.behavior.drag();
// player.call(drag);

function update(){
  var storageArray = [];
  for (var i = 0; i < 25; i++){
    var x = Math.random()*800;
    var y = Math.random()*600;
    var enemyCoordinate = {
      cx : x,
      cy : y,
    };
    storageArray.push(enemyCoordinate);
  }
  var existing = d3.select('svg').selectAll('.enemy').data(storageArray);
  existing.enter().append('circle')
                  .attr('class', 'enemy');
  existing.transition().duration(1000)
                  .attr("cx", function(d) { return d.cx; })
                  .attr("cy", function(d) { return d.cy; })
                  .attr("r", 10);             
}



setInterval(update, 1000);


//Make a differently-colored dot to represent the player. Make it draggable.
//Detect when a enemy touches you.
//Keep track of the user's score, and display it.
//Use css3 animations to make the enemies whirling shuriken.