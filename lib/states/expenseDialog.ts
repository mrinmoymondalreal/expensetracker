function useExpenseDialog(){
  let _func: any = null;
  return {
    set g(f){ _func = f; },
    get g(){ return _func; }
  }
}

export default useExpenseDialog();