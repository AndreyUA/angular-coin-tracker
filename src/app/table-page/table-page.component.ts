import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

const MOCK_DATA = [
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

interface ITransaction {
  person: string;
  money: number;
  date: Date;
}

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.scss'],
})
export class TablePageComponent implements OnInit {
  total: number = 0;

  spend: number = 0;

  left: number = 0;

  transactions: Array<ITransaction> | null = null;

  transactionsForm!: FormGroup;

  ngOnInit() {
    this.transactionsForm = new FormGroup({
      money: new FormControl(null, Validators.required),
      person: new FormControl(null, Validators.required),
    });

    this.total = 10000;

    this.transactions = MOCK_DATA;

    if (this.transactions) {
      let sum: number = 0;

      this.transactions.forEach((transaction) => {
        sum += transaction.money;
      });

      this.spend = sum;
    }

    this.left = this.total - this.spend;
  }

  onSubmit() {
    const newTransaction: ITransaction = {
      person: this.transactionsForm.value.person,
      money: this.transactionsForm.value.money,
      date: new Date(),
    };

    this.transactions?.unshift(newTransaction);
  }
}
