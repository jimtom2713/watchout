// start slingin' some d3 here.


//build the game area
d3.select('body').append('svg').attr('class', 'game-area');

// var generateCoordinates = function () {
//   // console.log('made');
//   var storageArray = [];
//   for (var i = 0; i < 10; i++){
//     var x = Math.random()*800;
//     var y = Math.random()*600;
//     var enemyCoordinate = {
//       cx : x,
//       cy : y,
//       // r : 10
//     };
//     storageArray.push(enemyCoordinate);
//   }
//   // console.log(storageArray)
//   return storageArray;
// };

function update(){
  // console.log('updating');
  var storageArray = [];
  for (var i = 0; i < 10; i++){
    var x = Math.random()*800;
    var y = Math.random()*600;
    var enemyCoordinate = {
      cx : x,
      cy : y,
      // r : 10
    };
    storageArray.push(enemyCoordinate);
  }
  // var existing = gameBoard.selectAll('.enemy')
  //       .data(data);

  d3.select('svg').selectAll('.enemy').data(storageArray).enter().append('circle')
                  .attr('class', 'enemy')
                  .attr("cx", function(d) { return d.cx; })
                  .attr("cy", function(d) { return d.cy; })
                  .attr("r", 10);
  // existing.exit().remove();
  // storageArray = [];
}
// update();
// update(generateCoordinates());

// function keepRunning(){
//   // console.log('here'); 
//   var x = generateCoordinates();
//   update(x); 
// }


setInterval(update, 100);
