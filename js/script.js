class Game {
  constructor(size){
    this.size = +size;
    this.startNewGame();
  }

  startNewGame() {
    this.currentPlayer = 'X';
    this.moves = new Array(this.size);
    for(var i = 0; i < this.size; i ++) {
      this.moves[i] = new Array(this.size);
    }
    this.renderFieldHtml();
    this.addCellClickEventListener();
  }

  currentPlayerHtml() {
    return `<div id='game_current_player'>${this.currentPlayer}</div>`;
  }

  cellHtml(x, y) {
    return `<td data-vertical="${y}" data-horizontal="${x}" class="move-input" disabled='disabled'></td>`
  }

  renderFieldHtml() {
    var field = $('#field');

    field.empty();
    field.append(`Current Player is ${this.currentPlayerHtml()}`);
    field.append('<table>');
    for(var y = 0; y < this.size; y++) {
      field.append('<tr>');
        for(var x = 0; x < this.size; x++) {
          field.append(this.cellHtml(x,y));
        }
      field.append('<tr/>');
    }
    field.append('</table>');
  }

  addCellClickEventListener() {
    var game = this;
    $('.move-input').click(function(){
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
    this.moves[y][x] = move;
    console.log(this.moves);
    if(this.isFinished(move)) {
      this.renderWinner();
      this.startNewGame();
    }

    this.changeCurrentPlayer();
  }

  isFinished(move) {
    var win = true;
    
    // for(var i =0; i < this.size; i++) {
    //   var subjectCell = this.moves[i][move.horizontal];
    //   if(!subjectCell || (subjectCell.player != move.player)) {
    //     win = false
    //     break;
    //   }
    // }

    // for(var i = 0; i < this.size; i++) {
    //   if(win) break;
    //   var subjectCell = this.moves[move.vertical][i];
    //   console.log(subjectCell);
    //   if(!subjectCell || (subjectCell.player != move.player)) {
    //     win = false
    //     break;
    //   }
    // }

    // for(var i = 0; i < this.size; i++) {
    //   //if(win) break;
    //   var subjectCell = this.moves[i][i];
    //   console.log(subjectCell);
    //   if(!subjectCell || (subjectCell.player != move.player)) {
    //     win = false
    //     break;
    //   }
    // }

    for(var i = 0; i < this.size; i++) {
      var subjectCell = this.moves[this.size - 1 - i][i];
      if(!subjectCell || (subjectCell.player != move.player)) {
        win = false
        break;
      }
    }


    return win;
  }

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

