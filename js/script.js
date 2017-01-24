class Game {
  constructor(size){
    this.size = +size;
    this.moves = [];

  }
  
  prepareField() {
    var x,y;
    var field = $('#field');
    
    field.empty();
    
      for( y = 0; y < this.size; y++) {
        
          for( x = 0; x < this.size; x++) {
            
            var cell =`<input type="text" data-horizontal="${x}" data-vertical="${y}" class="move-input"></input>`;
            
            field.append(cell);  
          }
        
        field.append('<br/>');
        
      }
 
  };

  currentPlayer() {
    return $(this).val();
  };

  addMove(move) {
      this.moves.push(move);
      console.log(this.moves)
  };

  isFinished() {

  };
}

class Move {

  constructor(){
    this.player = null;
    this.horizontal = null;
    this.vertical = null;
  };

} 

$(document).ready(function(){

  var game; 

  $('#start').click(function(){

    var size = $('#size').val(); 
    
    if( isNaN(size) ) {

        return alert('Enter valid size!');

    }
    
    game = new Game(size);
      
    game.prepareField();

    $('.move-input').keyup(function(){

      var move = new Move();

      move.player = game.currentPlayer();

      move.vertical = +$(this).data('vertical');
      move.horizontal = +$(this).data('horizontal'); 

      game.addMove(move);

      game.isFinished();

    });
    
  });

});

