export const uuidGen = (): string =>
  [8, 4, 4, 4, 12]
    .map((n) => (Math.random() * (36 ** n - 1)).toString(36))
    .join("-");
