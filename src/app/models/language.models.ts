export interface ILanguageConfig {
  name: string;
  displayName: string;
  isRtl: boolean;
}

export const appLanguages: ILanguageConfig[] = [
  {
    name: 'he',
    displayName: 'עברית',
    isRtl: true
  },
  {
    name: 'en',
    displayName: 'English',
    isRtl: false
  }
]

