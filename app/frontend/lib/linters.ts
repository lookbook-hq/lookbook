const linters: Array<LinterInterface> = [];

export function registerLinter(linterFactory: LinterFactoryInterface): void {
  linters.unshift(linterFactory());
}

export function getLinter(lang: string) {
  return linters.find((linter) => linter.lang.includes(lang));
}

export interface LinterFactoryInterface {
  (): LinterInterface;
}

export interface LinterInterface {
  lang: Array<string>;
  lint: Function;
}

export interface LintResult {
  errors: number;
  warnings: number;
  offenses: Array<Object>;
}

export interface LintOffense {
  severity: string;
  message: string;
}
