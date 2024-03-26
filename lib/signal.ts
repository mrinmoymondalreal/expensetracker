function signal(v: any){
  let value = v;
  return {
    set value(v){ value = v },
    get value(){ return value; }
  };
}

export const user = signal(null);
export const expense_data = signal(null);
export const categories = signal(null);
export const expense_sum = signal(null);
export const setToday = signal(null);