import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// Store
import { Store, select } from '@ngrx/store';
import { ITransaction } from 'src/app/state/transaction/transaction.reducer';
import {
  setAllTransactions,
  addTransaction,
  resetAllTransactions,
} from 'src/app/state/transaction/transaction.actions';
import { getTransactions } from 'src/app/state/transaction';
import { getFamily } from 'src/app/state/family';
import { getArrayOfBudgets } from 'src/app/state/budgets';

// Services
import { ApiService } from 'src/app/api.service';

// Interfaces
import { IFamily } from 'src/app/state/family/family.reducer';
import { IBudgetInfo } from 'src/app/state/budgets/budgets.reducer';

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

  // TODO: add interface
  budgets: Array<IBudgetInfo> | [] = [];

  transactions: Array<ITransaction> | [] = [];

  total: number = 0;

  spend: number = 0;

  left: number = 0;

  transactionsForm!: FormGroup;

  changeBudgetForm!: FormGroup;

  newBudgetForm!: FormGroup;

  person: string | null = null;

  family!: IFamily;

  constructor(
    private store: Store<{ transactions: Array<ITransaction> | [] }>,
    private apiService: ApiService
  ) {}

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

  handleBudgetSubmit(): void {
    localStorage.setItem('budget', this.changeBudgetForm.value.changeBudget);

    this.fetchCurrentBudget(this.changeBudgetForm.value.changeBudget);
    // TODO: request to server for choosen budget
    console.log('submit!');
  }

  fetchCurrentBudget(id: string): void {
    this.apiService.getBudget(id);
  }

  handleCreateBudgetSubmit(): void {
    this.apiService.createNewBudget(
      this.newBudgetForm.value.newBudgetName,
      this.newBudgetForm.value.newBudgetSumm
    );
  }

  ngOnInit() {
    // Fetch array of budgets
    this.apiService.getAllBudgets();

    this.store.dispatch(resetAllTransactions());
    this.store.dispatch(setAllTransactions({ transactions: MOCK_DATA }));

    // TODO: make MULTIPLE selector!!!
    this.store.pipe(select(getTransactions)).subscribe((transactions) => {
      this.spend = 0;

      this.transactions = transactions;

      transactions.forEach((transaction: ITransaction) => {
        this.spend += transaction.money;
      });
    });

    this.store.pipe(select(getFamily)).subscribe((family) => {
      this.family = family;
    });

    this.store
      .pipe(select(getArrayOfBudgets))
      .subscribe((budgets: Array<IBudgetInfo>) => {
        this.budgets = budgets;

        // Check budgets and render correct form
        const budgetFromLocalStorage = localStorage.getItem('budget');

        if (
          budgets?.length &&
          budgetFromLocalStorage &&
          this.budgets?.findIndex(
            (budget: IBudgetInfo) => budget.id === budgetFromLocalStorage
          ) !== -1
        ) {
          this.changeBudgetForm = new FormGroup({
            changeBudget: new FormControl(budgetFromLocalStorage),
          });

          // Get current budget if it is correct
          this.fetchCurrentBudget(budgetFromLocalStorage);
        } else {
          this.changeBudgetForm = new FormGroup({
            changeBudget: new FormControl('default'),
          });
        }
      });

    this.transactionsForm = new FormGroup({
      money: new FormControl(null, Validators.required),
    });

    this.total = 10000;

    const personFromLocalStorage = localStorage.getItem('person');

    if (
      // Check if person exist in localStorage
      personFromLocalStorage &&
      // and if existing person exist in this family
      this.family.persons.findIndex(
        (person) => person.name.toString() === personFromLocalStorage
      ) !== -1
    ) {
      this.person = localStorage.getItem('person');
    }

    this.calcaluateLeft();

    this.newBudgetForm = new FormGroup({
      newBudgetName: new FormControl(''),
      newBudgetSumm: new FormControl(''),
    });
  }
}
