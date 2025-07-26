const SUFFIXES = [
  { digits: 7, suffix: ["Cr", "Crore"] },
  { digits: 5, suffix: ["L", "Lakh"] },
  { digits: 3, suffix: ["K", "K"] },
];

export function getFormattedCurrency(value: number, actual: boolean = false) {
  const isNegative = value < 0;
  let strValue = value.toString();
  if (isNegative) strValue = strValue.slice(1);

  const n = strValue.length;
  if (n < 4) return `${isNegative ? "-" : ""}` + strValue;

  if (n == 4)
    return (
      `${isNegative ? "-" : ""}` +
      strValue.substring(0, 1) +
      "," +
      strValue.substring(1)
    );

  if (!actual && n !== 4)
    for (const { digits, suffix } of SUFFIXES) {
      if (digits < n) {
        const afterDecimal = strValue.substring(n - digits, n - digits + 2);
        return (
          `${isNegative ? "-" : ""}` +
          strValue.substring(0, n - digits) +
          (afterDecimal == "00" ? "" : "." + afterDecimal) +
          " " +
          suffix[0]
        );
      }
    }

  let result = strValue.substring(n - 3);
  let i = 5;
  while (i <= n) {
    result = strValue.substring(n - i, n - i + 2) + "," + result;
    i += 2;
  }
  return `${isNegative ? "-" : ""}` + result;
}

export function getFormattedCurrencyAmount(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    // style: "currency",
    // currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
}
