import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { select, Store } from '@ngrx/store';
import { ITransaction } from 'src/app/state/transaction/transaction.reducer';
import {
  setAllTransactions,
  addTransaction,
  resetAllTransactions,
} from 'src/app/state/transaction/transaction.actions';
import { getTransactions } from 'src/app/state/transaction/index';

const MOCK_DATA: Array<ITransaction> = [
  {
    person: 'Папа',
    money: 600,
    date: new Date(),
  },
  {
    person: 'Мама',
    money: 120,
    date: new Date(),
  },
  {
    person: 'Мама',
    money: 200,
    date: new Date(),
  },
  {
    person: 'Мама',
    money: 400,
    date: new Date(),
  },
  {
    person: 'Мама',
    money: 300,
    date: new Date(),
  },
  {
    person: 'Мама',
    money: 535,
    date: new Date(),
  },
];

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.scss'],
})
export class TablePageComponent implements OnInit {
  @ViewChild('inputRef', { static: false }) inputRef!: ElementRef;

  transactions: Array<ITransaction> | [] = [];

  total: number = 0;

  spend: number = 0;

  left: number = 0;

  transactionsForm!: FormGroup;

  person: string | null = null;

  constructor(
    private store: Store<{ transactions: Array<ITransaction> | [] }>
  ) {
    this.store.pipe(select(getTransactions)).subscribe((transactions) => {
      this.spend = 0;

      this.transactions = transactions;

      transactions.forEach((transaction: ITransaction) => {
        this.spend += transaction.money;
      });
    });
  }

  calcaluateLeft(): void {
    this.left = this.total - this.spend;
  }

  onSubmit(): void {
    if (this.person) {
      const newTransaction: ITransaction = {
        person: this.person,
        money: this.transactionsForm.value.money,
        date: new Date(),
      };
      this.store.dispatch(addTransaction({ transaction: newTransaction }));

      this.calcaluateLeft();

      this.transactionsForm.reset();

      this.inputRef.nativeElement.blur();
    } else {
      return;
    }
  }

  ngOnInit() {
    this.store.dispatch(resetAllTransactions());
    this.store.dispatch(setAllTransactions({ transactions: MOCK_DATA }));

    this.transactionsForm = new FormGroup({
      money: new FormControl(null, Validators.required),
    });

    this.total = 10000;

    this.person = localStorage.getItem('person');

    this.calcaluateLeft();
  }
}
