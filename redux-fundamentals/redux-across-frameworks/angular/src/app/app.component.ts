import { Component, OnDestroy, OnInit } from '@angular/core';
import store from './reduxState';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Tic Tac Toe';

  unsubRedux;

  ngOnInit(): void {
    // como estava usando function() {}, o 'this' não estava vinculado a isso. Por isso passou a usar o
    // arrow function
    this.unsubRedux = store.subscribe(() => {
      var state = store.getState();

      this.fields = state.fields;
    });
  }

  ngOnDestroy(): void {
    this.unsubRedux();
  }

  // default state
  // fields = Array(9).fill(false); // start with array of 9 with false filled in
  // player1 = "x";
  // player2 = "o";
  // currentPlayer = 1;

  fields = store.getState().fields;

  handlePlay(index) {
    // // clone fields so ng knows when update occurs
    // var fields = this.fields.slice();
    // var piece = this['player' + this.currentPlayer]; //x or o

    // fields[index] = piece;

    // // fill in the current piece, and switch player
    // this.fields = fields;
    // this.currentPlayer = this.currentPlayer === 1 ? 2 : 1; // toggle between player  1 and 2

    store.dispatch({ type: 'MARK_FIELD', data: { fieldIndex: index } });
  }

  handleRestart() {
    // this.fields = Array(9).fill(false); // start with array of 9 with false filled in

    store.dispatch({ type: 'RESET_FIELDS' });
  }
}
