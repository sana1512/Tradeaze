import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function maskAccountNumber(accountNumber) {
    if (accountNumber.length > 4) {
      const lastFourDigits = accountNumber.slice(-4);
      const maskedDigits = "*".repeat(accountNumber.length - 4);
      return maskedDigits + lastFourDigits;
    } else {
      return accountNumber;
    }
  }

export const existInWatchlist = (items, coin) => {
  for(let item of items){
    if(item?.id===coin?.id)
      return true;
  }
  return false;
}

export const calculateProfit = (order) => {
  if(order && order.orderItem?.buyPrice && order.orderItem?.sellPrice){
    return order.orderItem?.sellPrice - order.orderItem?.buyPrice
  }
  return "-"
}
