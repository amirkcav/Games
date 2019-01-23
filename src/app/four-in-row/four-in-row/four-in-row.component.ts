import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as io from 'socket.io-client';

import { GamePosition } from '../../../models/game-position';
import { Enums, positionState } from '../../../models/enums';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-four-in-row',
  templateUrl: './four-in-row.component.html',
  styleUrls: ['./four-in-row.component.css']
})
export class FourInRowComponent implements OnInit {

  @ViewChild('startGameModal') private modal: ElementRef;
  modalRef: BsModalRef;
  
  private url = 'http://localhost:5000';     
  private socket;
  playerId: number;
  anotherPlayerWaiting = false;
  waitingForAnotherPlayer = false;
  yourTurn: boolean;
  multiPlayer = false;
  youWon: boolean;

  columns = 7;
  rows = 6;
  positions: GamePosition[][];
  players = ['green', 'red'];
  turn = 0;
  // turns count.
  turns = 0;
  
  winner = -1;
  isGameOver = false;

  constructor(private modalService: BsModalService) { 
  }
  
  ngOnInit() {
    this.playerId = Math.ceil(Math.random() * 1000);
    this.initBoard();
    this.initSocket();    
    // opening the modal is in timeout to prevent ExpressionChangedAfterItHasBeenCheckedError.
    // https://github.com/angular/material2/issues/5268#issuecomment-416686390
    setTimeout(() => {
      this.modalRef = this.modalService.show(this.modal, { class: 'start-game-modal', ignoreBackdropClick: true });
    });
  }

  getArray(size: number) {
    return Array(size);
  }

  initBoard() {
    this.positions = new Array(this.rows);
    for (let row = 0; row < this.rows; row++) {
      this.positions[row] = new Array<GamePosition>(this.columns);
      for (let col = 0; col < this.columns; col++) {
        this.positions[row][col] = new GamePosition();
        this.positions[row][col].state = row === this.rows - 1 ? positionState.available : positionState.free;
        this.positions[row][col].row = row;
        this.positions[row][col].column = col;
      }
    }
  }
  
  initSocket() {
    this.socket = io(this.url);

    this.socket.on('player-join', (data) => {
      if (data.playerId !== this.playerId) {
        console.log('player-join');
        this.anotherPlayerWaiting = true;
      }
    });

    this.socket.on('position-taken', (data) => {
      if (this.playerId !== data.positionData.playerId) {
        this.setPosition(data.positionData.position);
      }
      this.yourTurn = !this.yourTurn;
    });

    this.socket.on('start-game', (data) => {
      this.modalRef.hide();
      if (this.playerId === data.playerId) {
        this.yourTurn = false;
        this.playerId = 1;

      }
      else {
        this.yourTurn = true;
        this.playerId = 0;
      }
    });
  }

  positionClick(position) {

    if (this.socket) {
      this.socket.emit('position-taken', { position: position, playerId: this.playerId });
    }
    this.setPosition(position);
    
  }

  setPosition(position) {
    this.turns++;
    this.positions[position.row][position.column].state = positionState.taken;
    this.positions[position.row][position.column].takenBy = this.players[this.turn];   
    if (position.row > 0) { 
      this.positions[position.row - 1][position.column].state = positionState.available;
    }
    // is board full
    if (this.rows * this.columns === this.turns) { 
      this.isGameOver = true;
      // this.gameOverMessage = 'Game Over';
    }
    // did player win
    else if (this.didPlayerWin(position.row, position.column)) {
      this.isGameOver = true;
      this.youWon = this.turn === this.playerId;
      this.winner = this.turn;
    }
    else {
      this.turn = 1 - this.turn;
    }
  }

  didPlayerWin(row, column) {
    let xInRow = 1;
    // vertical
    let rowHolder = row;
    let colHolder = column;
    while (rowHolder < this.rows - 1 && this.positions[rowHolder + 1][colHolder].takenBy === this.players[this.turn] && xInRow < 4) {
      xInRow++;
      rowHolder++;
    }
    // horizontal ltr
    if (xInRow < 4) {
      xInRow = 1;
      colHolder = column;
      rowHolder = row;
      while (colHolder < this.columns - 1 && this.positions[rowHolder][colHolder + 1].takenBy === this.players[this.turn] && xInRow < 4) {
        xInRow++;
        colHolder++;
      }
    }
    // horizontal rtl
    if (xInRow < 4) {
      xInRow = 1;
      colHolder = column;
      rowHolder = row;
      while (colHolder > 0 && this.positions[rowHolder][colHolder - 1].takenBy === this.players[this.turn] && xInRow < 4) {
        xInRow++;
        colHolder--;
      }
    }
    // diagonal from top left
    if (xInRow < 4) {
      xInRow = 1;
      colHolder = column;
      rowHolder = row;
      while (colHolder < this.columns - 1 && rowHolder < this.rows - 1 && 
             this.positions[rowHolder + 1][colHolder + 1].takenBy === this.players[this.turn] && xInRow < 4) {
        xInRow++;
        rowHolder++;
        colHolder++;
      }
    }
    // diagonal from top right
    if (xInRow < 4) {
      xInRow = 1;
      colHolder = column;
      rowHolder = row;
      while (colHolder > 0 && rowHolder < this.rows - 1 && 
             this.positions[rowHolder + 1][colHolder - 1].takenBy === this.players[this.turn] && xInRow < 4) {
        xInRow++;
        rowHolder++;
        colHolder--;
      }
    }
    // diagonal from bottom left
    if (xInRow < 4) {
      xInRow = 1;
      colHolder = column;
      rowHolder = row;
      while (colHolder < this.columns - 1 && rowHolder > 0 && 
             this.positions[rowHolder - 1][colHolder + 1].takenBy === this.players[this.turn] && xInRow < 4) {
        xInRow++;
        rowHolder--;
        colHolder++;
      }
    }
    // diagonal from bottom right
    if (xInRow < 4) {
      xInRow = 1;
      colHolder = column;
      rowHolder = row;
      while (colHolder > 0 && rowHolder > 0 && 
             this.positions[rowHolder - 1][colHolder - 1].takenBy === this.players[this.turn] && xInRow < 4) {
        xInRow++;
        rowHolder--;
        colHolder--;
      }
    }

    return xInRow === 4;
  }

  restart() {
    this.turn = 0;
    this.turns = 0;
    this.isGameOver = false;
    this.winner = -1;
    this.yourTurn = this.playerId === 0;
    this.initBoard();
  }

  waitFroPlayer() {
    // this.initSocket();        
    this.socket.emit('player-join', this.playerId );
    this.waitingForAnotherPlayer = true;
    this.multiPlayer = true;
  }

  playWithPlayer() {
    this.multiPlayer = true;
    this.socket.emit('start-game', this.playerId );
  }

}
