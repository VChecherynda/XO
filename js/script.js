class Game {
  constructor(size){
    this.size = +size;
    this.startNewMove();
  }

  startNewMove() {
    this.currentPlayer = 'X';
    this.moves = new Array(this.size);
    for(var i = 0; i < this.size; i++) {
      this.moves[i] = new Array(this.size);
    }
    this.renderFieldHtml();
    this.addCellClickEventListener();
  }

  currentPlayerHtml() {
    return `<div id='game_current_player'>${this.currentPlayer}</div>`;
  }

  cellHtml(x, y) {
    return `<td data-horizontal="${x}" data-vertical="${y}" class="move-input" disabled='disabled'></td>`
  }

  renderFieldHtml() {
    var field = $('#field');

    field.empty();
    field.append(`Current Player is ${this.currentPlayerHtml()}`);
    field.append('<table>');
    for(var x = 0; x < this.size; x++) {
      field.append('<tr>');
        for(var y = 0; y < this.size; y++) {
          field.append(this.cellHtml(x,y));
        }
      field.append('<tr/>');
    }
    field.append('</table>');
  }

  addCellClickEventListener() {
    var game = this;
    $('.move-input').one('click',function(event){
        event.preventDefault();
        var x = +$(this).data('horizontal');  
        var y = +$(this).data('vertical');
        $(this).html(game.currentPlayer);
        game.addMove(x,y);
     
    });
  }

  addMove(x, y) {
    var move = new Move();
    move.player = this.currentPlayer;
    move.horizontal = x; 
    move.vertical = y;
    this.moves[x][y] = move;
    this.isFinal(move);
    this.changeCurrentPlayer();
  }

  isFinal(move) {
    if( this.checkHorizontal(move) || this.checkVertical(move) || this.checkMainDiagonal(move) || this.checkSecondaryDiagonal(move)) {
      this.renderWinner();
      this.startNewMove();
    }  
  }

  checkHorizontal(move) {
    var win = true;
    console.log(this.moves);

    for(var i = 0; i < this.size; i++) {

      var subjectCell = this.moves[move.horizontal][i];
      console.log(subjectCell);

      if(!subjectCell || (subjectCell.player != move.player)) {
        win = false
        break;
      }

    }  

    return win;  
  
  }

  checkVertical(move) {
    var win = true;
    console.log(this.moves);

    for(var i = 0; i < this.size; i++) {

      var subjectCell = this.moves[i][move.vertical];
      console.log(subjectCell);

      if(!subjectCell || (subjectCell.player != move.player)) {
        win = false
        break;
      }

    }  

    return win;  
  
  }

  checkMainDiagonal(move) {
    var win = true;
    console.log(this.moves);

    for(var i = 0; i < this.size; i++) {

      var subjectCell = this.moves[i][i];
      console.log(subjectCell);

      if(!subjectCell || (subjectCell.player != move.player)) {
        win = false
        break;
      }

    }  

    return win;  
  
  }

  checkSecondaryDiagonal(move) {
    var win = true;
    console.log(this.moves);

    for(var i = 0; i < this.size; i++) {

      var subjectCell = this.moves[i][this.size- 1 - i];
      console.log(subjectCell);

      if(!subjectCell || (subjectCell.player != move.player)) {
        win = false
        break;
      }

    }  

    return win;  
  
  }

    // for(var i = 0; i < this.size; i++) {
    //   var subjectCell = this.moves[this.size - 1 - i][i];
    //   if(!subjectCell || (subjectCell.player != move.player)) {
    //     win = false
    //     break;
    //   }
    // }


  //   return win;
  // }

  changeCurrentPlayer() {
    this.currentPlayer = (this.currentPlayer == 'X') ? 'O' : 'X'
  }

  renderWinner() {
    alert(`${this.currentPlayer} has won`);
  }
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
    if( isNaN(size) ) return alert('Enter valid size!');
    game = new Game(size);
  });
});

