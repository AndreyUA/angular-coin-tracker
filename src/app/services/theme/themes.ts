export interface ITheme {
  name: Partial<ThemesTypes>;
  properties: {
    [key: string]: string;
  };
}

export enum ThemesTypes {
  DARK = 'dark',
  LIGHT = 'light',
}

export const darkTheme: ITheme = {
  name: ThemesTypes.DARK,
  properties: {
    '--main': '#031956',
    '--primary': '#344fa1',
    '--secondary': '#eb2cfe',
    '--secondary-light': '#c34fdd',
    '--font': '#f3fbfd',
    '--black': '#000',
    '--white': '#fff',
  },
};

export const lightTheme: ITheme = {
  name: ThemesTypes.LIGHT,
  properties: {
    '--main': '#ffffff',
    '--primary': '#efefef',
    '--secondary': '#1f64fd',
    '--secondary-light': '#6a97f7',
    '--font': '#282e59',
    '--black': '#000',
    '--white': '#fff',
  },
};
