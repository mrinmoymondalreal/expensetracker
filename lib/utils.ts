import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export function giveDate(timestamp: number): string {
//   // Create Date objects for current date and timestamp date
//   const currentDate: Date = new Date();
//   const timestampDate: Date = new Date(timestamp * 1000); // Convert timestamp to milliseconds

//   // Set hours, minutes, seconds, and milliseconds to 0 to compare dates without time
//   currentDate.setHours(0, 0, 0, 0);
//   timestampDate.setHours(0, 0, 0, 0);

//   // Calculate yesterday's date
//   const yesterdayDate: Date = new Date(currentDate);
//   yesterdayDate.setDate(yesterdayDate.getDate() - 1);

//   // Calculate the first day of the week (Sunday)
//   const firstDayOfWeek: Date = new Date(currentDate);
//   firstDayOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

//   // Calculate the first day of the month
//   const firstDayOfMonth: Date = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

//   // Compare dates
//   if (isSameDay(timestampDate, currentDate)) {
//       return "Today";
//   } else if (isSameDay(timestampDate, yesterdayDate)) {
//       return "Yesterday";
//   } else if (timestampDate >= firstDayOfWeek && timestampDate <= currentDate) {
//       return "This week";
//   } else if (timestampDate >= firstDayOfMonth && timestampDate <= currentDate) {
//       return "This month";
//   } else {
//       return "None of these";
//   }
// }

// Helper function to check if two dates are the same day

export function giveDate(timestamp: number): string{
  let givenDate = new Date(timestamp);
  let d = "";
  if(isSameDay(givenDate)) d = "same day";
  else if(isYesterday(givenDate)) d = "yesterday";
  else if(isSameWeek(givenDate)) d = "same week";
  else if(isSameMonth(givenDate)) d = "same month";
  else if(isSameYear(givenDate)) d = "same year";
  else if(isLastMonth(givenDate)) d = "last month";
  else if(isLastYear(givenDate)) d = "last year";
  return d;
}

function isSameDay(date1: Date, date2: Date = new Date()): boolean {
  return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate();
}

function isYesterday(date1: Date, date2: Date = new Date()): boolean {
  return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() + 1 == date2.getDate();
}

function isSameWeek(date1: Date, date2: Date = new Date()): boolean {
  date2.setHours(0, 0, 0);
  date2.setDate(date2.getDate() - date2.getUTCDay());

  let f = new Date();
  f.setHours(0, 0, 0);
  f.setDate(date2.getDate() - date2.getUTCDay() + 7);

  return f.getTime() >= date1.getTime() && date1.getTime() >= date2.getTime();
}

function isSameMonth(date1: Date, date2: Date = new Date()): boolean {
  return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth();
}

function isLastMonth(date1: Date, date2: Date = new Date()): boolean {
  return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() + 1 === date2.getMonth();
}

function isSameYear(date1: Date, date2: Date = new Date()): boolean {
  return date1.getFullYear() === date2.getFullYear();
}

function isLastYear(date1: Date, date2: Date = new Date()): boolean {
  return date1.getFullYear() + 1 === date2.getFullYear();
}


export function filter(arr: Array<any>, func: (x: any) => boolean): [ Array<any>, Array<any> ]{
    let filteredList: any[] = [];
    let restList: any[] = [];

    for(let i = 0;i < arr.length;i++){
        if(func(arr[i])){ 
            filteredList.push(arr[i]);
        }else{
            restList.push(arr[i]);
        }
    }

    return [filteredList, restList]
}

