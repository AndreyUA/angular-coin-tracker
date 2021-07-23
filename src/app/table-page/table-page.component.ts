import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { select, Store } from '@ngrx/store';
import { ITransaction } from '../state/transaction/transaction.reducer';
import {
  setAllTransactions,
  addTransaction,
} from '../state/transaction/transaction.actions';
import { getTransactions } from '../state/transaction/index';

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
  transactions: Array<ITransaction> | [] = [];

  total: number = 0;

  spend: number = 0;

  left: number = 0;

  transactionsForm!: FormGroup;

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

  onSubmit() {
    const newTransaction: ITransaction = {
      person: this.transactionsForm.value.person,
      money: this.transactionsForm.value.money,
      date: new Date(),
    };

    this.store.dispatch(addTransaction({ transaction: newTransaction }));

    this.calcaluateLeft();
  }

  ngOnInit() {
    this.store.dispatch(setAllTransactions({ transactions: MOCK_DATA }));

    this.transactionsForm = new FormGroup({
      money: new FormControl(null, Validators.required),
      person: new FormControl(null, Validators.required),
    });

    this.total = 10000;

    this.calcaluateLeft();
  }
}
