class Game {
  constructor(size){
    this.size = +size;
    this.totalCellamount = size * size;
    this.currentPlayer = 'X';
    this.startNewGame();
  }

  startNewGame() {
    this.renderFieldHtml();
    this.totalCellamount = this.size * this.size;
    
    this.moves = new Array(this.size);
    for(var i = 0; i < this.size; i++) {
      this.moves[i] = new Array(this.size);
    }
    
    this.addCellClickEventListener();
  }

  currentPlayerHtml() {
    var player = $('#currentPlayer');
    player.empty();
    player.append(`Current player is ${this.currentPlayer}`);
  }

  cellHtml(x, y) {
    return `<td data-horizontal="${x}" data-vertical="${y}" class="move-input" disabled='disabled'></td>`
  }

  renderFieldHtml() {
    var field = $('#field');

    field.empty();
    this.currentPlayerHtml();
    field.append('<table>');

    var table = $('table');

    for(var x = 0; x < this.size; x++) {

        var row = $('<tr>');

          for(var y = 0; y < this.size; y++) {
            var rowData = this.cellHtml(x,y);
            row.append(rowData);
          };
       
        table.append(row)

      }

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
    this.isDraw();
    this.isFinal(move);
    this.changeCurrentPlayer();
    this.currentPlayerHtml();
  }

  isDraw() {
    this.totalCellamount -= 1;
    if(this.totalCellamount === 0) {
      alert('Draw !');
      this.startNewGame();
    }
  }

  isFinal(move) {
    if( this.checkHorizontal(move) || this.checkVertical(move) || this.checkMainDiagonal(move) || this.checkSecondaryDiagonal(move)) {
      this.renderWinner();
      this.startNewGame();
    } 
  }

  checkHorizontal(move) {
    var win = true;

    for(var i = 0; i < this.size; i++) {

      var subjectCell = this.moves[move.horizontal][i];

      if(!subjectCell || (subjectCell.player != move.player)) {
        win = false
        break;
      }

    }  

    return win;  
  
  }

  checkVertical(move) {
    var win = true;

    for(var i = 0; i < this.size; i++) {

      var subjectCell = this.moves[i][move.vertical];

      if(!subjectCell || (subjectCell.player != move.player)) {
        win = false
        break;
      }

    }  

    return win;  
  
  }

  checkMainDiagonal(move) {
    var win = true;

    for(var i = 0; i < this.size; i++) {

      var subjectCell = this.moves[i][i];

      if(!subjectCell || (subjectCell.player != move.player)) {
        win = false
        break;
      }

    }  

    return win;  
  
  }

  checkSecondaryDiagonal(move) {
    var win = true;

    for(var i = 0; i < this.size; i++) {

      var subjectCell = this.moves[i][this.size- 1 - i];

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

