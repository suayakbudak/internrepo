import { formatNumberLocale } from "src/assets/locales";

const DEFAULT_LOCALE = { code: "en-US", currency: "USD" };

function processInput(inputValue) {
  if (inputValue == null || Number.isNaN(inputValue)) return null;
  return Number(inputValue);
}

// ----------------------------------------------------------------------

export function fNumber(inputValue, options) {
  const locale = formatNumberLocale() || DEFAULT_LOCALE;
  const number = processInput(inputValue);
  if (number === null) return "";
  const fm = new Intl.NumberFormat(locale.code, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options,
  }).format(number);
  return fm;
}

// ----------------------------------------------------------------------

export function fCurrency(inputValue, options = {}, isUSD = false, exchangeRate = 1) {
  let number = processInput(inputValue);
  if (number === null) return "";

  // Eğer dolarsa tl ye çevir.
  if (isUSD) {
    number = convertToTRY(number, exchangeRate);
  }

  // tr ülke kodu ve sembolü
  const locale = { code: "tr-TR", currency: "TRY" };

  // Burada Intl.NumberFormat formatı kullan
  const formattedCurrency = new Intl.NumberFormat(locale.code, {
    style: "currency",
    currency: locale.currency,
    minimumFractionDigits: 0, // Basamak sayısı
    maximumFractionDigits: 0,
    ...options,
  }).format(number);
  const formattedWithSymbolAtEnd = `${formattedCurrency.replace("₺", "").trim()} ₺`;
  return formattedWithSymbolAtEnd;
}

// ----------------------------------------------------------------------

// Yüzdeleri hesapla
export function fPercent(inputValue, options) {
  const locale = formatNumberLocale() || DEFAULT_LOCALE;
  const number = processInput(inputValue);
  if (number === null) return "";
  const fm = new Intl.NumberFormat(locale.code, {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
    ...options,
  }).format(number / 100);
  return fm;
}

// ----------------------------------------------------------------------

// Büyük ücretleri kısalt.
export function fShortenNumber(inputValue, options) {
  const locale = formatNumberLocale() || DEFAULT_LOCALE;
  const number = processInput(inputValue);
  if (number === null) return "";
  const fm = new Intl.NumberFormat(locale.code, {
    notation: "compact",
    maximumFractionDigits: 2,
    ...options,
  }).format(number);
  return fm.replace(/[A-Z]/g, (match) => match.toLowerCase());
}

// ----------------------------------------------------------------------

// Fonksiyon formatları
export function fData(inputValue) {
  const number = processInput(inputValue);
  if (number === null || number === 0) return "0 bytes";
  const units = ["bytes", "Kb", "Mb", "Gb", "Tb", "Pb", "Eb", "Zb", "Yb"];
  const decimal = 2;
  const baseValue = 1024;
  const index = Math.floor(Math.log(number) / Math.log(baseValue));
  const fm = `${parseFloat((number / baseValue ** index).toFixed(decimal))} ${units[index]}`;
  return fm;
}

// ----------------------------------------------------------------------

// Ücreti dolardan tl ye çevir
export function convertToTRY(amountInUSD, exchangeRate) {
  return amountInUSD * exchangeRate;
}

// ----------------------------------------------------------------------

// Ücreti dolardan tl ye günceller
export function updatePrices(prices, exchangeRate) {
  return prices.map((price) => fCurrency(price, {}, true, exchangeRate));
}
