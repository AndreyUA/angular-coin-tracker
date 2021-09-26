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
    '--main': 'purple',
    '--primary': 'black',
    '--secondary': 'grey',
  },
};

export const lightTheme: ITheme = {
  name: ThemesTypes.LIGHT,
  properties: {
    '--main': 'white',
    '--primary': 'white',
    '--secondary': 'white',
  },
};
