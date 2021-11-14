import { getPersonName } from 'src/app/utils/getPersonName';

export class DashboardValidator {
  static invalidDashboardFrom(): { [s: string]: boolean } | null {
    const nameFromLocalStorage = getPersonName();

    if (!!nameFromLocalStorage) {
      return null;
    } else {
      return { invalidDashboardFrom: true };
    }
  }
}
