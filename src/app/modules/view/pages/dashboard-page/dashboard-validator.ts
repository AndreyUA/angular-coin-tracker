export class DashboardValidator {
  static invalidDashboardFrom(): { [s: string]: boolean } | null {
    const nameFromLocalStorage = localStorage.getItem('person');

    if (!!nameFromLocalStorage) {
      return null;
    } else {
      return { invalidDashboardFrom: true };
    }
  }
}
