import { Injectable } from '@angular/core';

import { darkTheme, lightTheme, ITheme, ThemesTypes } from './themes';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private activeTheme!: ITheme;

  private setActiveTheme(theme: ITheme): void {
    this.activeTheme = theme;

    Object.keys(this.activeTheme.properties).forEach((property) => {
      document.documentElement.style.setProperty(
        property,
        this.activeTheme.properties[property]
      );
    });
  }

  private setThemeToLocalStorage(themeName: Partial<ThemesTypes>): void {
    localStorage.setItem('theme', themeName);
  }

  private getThemeFromLocalStorage(): string | null {
    return localStorage.getItem('theme');
  }

  setDarkTheme(): void {
    this.setActiveTheme(darkTheme);

    this.setThemeToLocalStorage(ThemesTypes.DARK);
  }

  setLightTheme(): void {
    this.setActiveTheme(lightTheme);

    localStorage.setItem('theme', ThemesTypes.LIGHT);
  }

  setDefaultTheme(): boolean {
    const currentTheme = this.getThemeFromLocalStorage();

    switch (currentTheme) {
      case ThemesTypes.DARK:
        this.setActiveTheme(darkTheme);
        return true;
      case ThemesTypes.LIGHT:
        this.setActiveTheme(lightTheme);
        return false;
      default:
        this.setDarkTheme();
        return true;
    }
  }

  getIsDarkTheme(): boolean {
    return this.getThemeFromLocalStorage() === ThemesTypes.DARK ? true : false;
  }
}
