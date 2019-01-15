import { Component, OnInit, Input, TemplateRef, ViewChild, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';

import { Card } from '../../../models/card';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-memory-game',
  templateUrl: './memory-game.component.html',
  styleUrls: ['./memory-game.component.css'],
  providers: [BsModalService]
})
export class MemoryGameComponent implements OnInit, OnDestroy {
  
  // @Input() rows;
  // @Input() cols;
  rows: number;
  cols: number;
  cards: Card[];
  numberOfCards: number;
  numberOfValues: number;
  cardHeight = 165;
  cardWidth = 110;
  selectedCards = new Array<number>();
  gotPairEffect = false;
  turns = 0;
  gameOver = false;

  modalRef: BsModalRef;
  @ViewChild('startGameModal') private modal: ElementRef;
  startGameForm: FormGroup;
  gameStarted = false;

  @ViewChild('rows') rowsInput: ElementRef;
  
  constructor(private modalService: BsModalService, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.startGameForm = new FormGroup({
      'rows': new FormControl(this.rows, [Validators.required]),
      'cols': new FormControl(this.cols, [Validators.required])
    }, { validators: [ this.isNumberOfCardsEven ] });
    this.modalService.onShown.subscribe(() => {
      // set initial focus on rows input. from https://stackoverflow.com/questions/34522306/focus-on-newly-added-input-element#answer-34573219
      this.renderer.selectRootElement('#rows').focus();
    });
    // opening the modal is in timeout to prevent ExpressionChangedAfterItHasBeenCheckedError.
    // https://github.com/angular/material2/issues/5268#issuecomment-416686390
    setTimeout(() => {
      this.modalRef = this.modalService.show(this.modal, { class: 'start-game-modal', ignoreBackdropClick: true });
    });
  }

  ngOnDestroy(): void {
    this.modalRef.hide();
  }

  arrayOne(n: number): any[] {
    return Array(n);
  }

  initCards() {
    this.cards = new Array<Card>(this.numberOfCards);
    for (let i = 0; i < this.numberOfValues; i++) {
      const value = i;
      // set 2 cards with current value
      for (let j = 0; j < 2; j++) {
        // get random position
        let pos = Math.floor(Math.random() * this.numberOfCards);
        while (this.cards[pos] !== undefined) {
          pos = Math.floor(Math.random() * this.numberOfCards);
        }
        this.cards[pos] = new Card(pos, value);
      }
    }
    this.modalRef.hide();
  }

  cardClick(card: Card) {
    if (!card.isSelected) {
      // can't select more cards when two cards are already selected.
      if (this.selectedCards.length >= 2) {
        return;
      }
      this.selectedCards.push(card.position);
      if (this.selectedCards.length === 2) {
        this.turns++;
        if (this.cards[this.selectedCards[0]].value === this.cards[this.selectedCards[1]].value) {
          this.gotPair();
        }
        else {
          this.wrongPair();
        }
      }
    }
    else {
      const index = this.selectedCards.indexOf(card.position);
      this.selectedCards.splice(index, 1);
    }
    card.isSelected = !card.isSelected;
  }

  gotPair() {
    this.gotPairEffect = true;
    setTimeout(() => {
      this.cards[this.selectedCards[0]].inPair = true;
      this.cards[this.selectedCards[1]].inPair = true;
      this.selectedCards.length = 0;
      this.gotPairEffect = false;

      if (this.isGameOver()) {
        this.gameOver = true;
      }
    }, 1500);
  }

  wrongPair() {
    setTimeout(() => {
      this.cards[this.selectedCards[0]].isSelected = false;
      this.cards[this.selectedCards[1]].isSelected = false;
      this.selectedCards.length = 0;
    }, 1000);
  }

  restart() {
    this.turns = 0;
    this.gameOver = false;
    this.selectedCards.length = 0;

    this.modalRef = this.modalService.show(this.modal, { class: 'start-game-modal' });
    this.renderer.selectRootElement('#rows').focus();
  }

  isGameOver() {
    const t = this.cards.filter((c) => !c.inPair);
    return t.length === 0;
  }

  startGame(/*rows, columns*/) {
    this.rows = this.startGameForm.value.rows;
    this.cols = this.startGameForm.value.cols;
    this.numberOfCards = this.rows * this.cols;
    this.numberOfValues = this.numberOfCards / 2;
    this.initCards();
    this.gameStarted = true;
  }

  isNumberOfCardsEven(form: FormGroup) {
    return (form.value.rows && form.value.cols) && form.value.rows * form.value.cols % 2 !== 0 ? { 'numberOfCardsEven': true } : null;
  }

}
