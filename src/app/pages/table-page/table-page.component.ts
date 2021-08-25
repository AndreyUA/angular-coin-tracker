import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// Store
import { Store, select } from '@ngrx/store';
import { getFamily } from 'src/app/state/family';
import { getArrayOfBudgets, getCurrentBudget } from 'src/app/state/budgets';

// Services
import { ApiService } from 'src/app/api.service';

// Interfaces
import { ITransaction } from 'src/app/state/budgets/budgets.reducer';
import { IFamily } from 'src/app/state/family/family.reducer';
import { IBudgetInfo, IBudget } from 'src/app/state/budgets/budgets.reducer';

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.scss'],
})
export class TablePageComponent implements OnInit {
  @ViewChild('inputRef', { static: false }) inputRef!: ElementRef;

  budgets: Array<IBudgetInfo> | [] = [];

  transactions: Array<ITransaction> | [] = [];

  currentBudget: IBudget | {} = {};

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

  onSubmit(): void {
    if (this.person) {
      this.apiService.addNewTransAction(
        (this.currentBudget as IBudget)._id,
        this.person,
        this.transactionsForm.value.money
      );

      this.transactionsForm.reset();

      this.inputRef.nativeElement.blur();
    } else {
      return;
    }
  }

  handleBudgetSubmit(): void {
    localStorage.setItem('budget', this.changeBudgetForm.value.changeBudget);

    this.fetchCurrentBudget(this.changeBudgetForm.value.changeBudget);
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

    // TODO: make MULTIPLE selector!!!
    this.store.pipe(select(getCurrentBudget)).subscribe((budget) => {
      this.currentBudget = {};
      this.transactions = [];
      this.total = 0;
      this.spend = 0;
      this.left = 0;

      if (Object.keys(budget).length > 0) {
        this.currentBudget = budget;
        this.total = budget.total;

        if (budget.transactions.length > 0) {
          this.spend = budget.transactions.reduce(
            (sum, transaction) => +sum + +transaction.money,
            0
          );

          this.transactions = budget.transactions;
        }

        this.left = this.total - this.spend;
      }
    });

    this.store.pipe(select(getFamily)).subscribe((family) => {
      this.family = family;
    });

    this.store.pipe(select(getArrayOfBudgets)).subscribe((budgets) => {
      if (budgets.length > 0) {
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
      }
    });

    this.transactionsForm = new FormGroup({
      money: new FormControl(null, Validators.required),
    });

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

    this.newBudgetForm = new FormGroup({
      newBudgetName: new FormControl(''),
      newBudgetSumm: new FormControl(''),
    });
  }
}
