import { TotalExpense } from "@/lib/atoms";
import { useAtom } from "jotai";
import { useEffect } from "react";

export default function setAmount(sum: number){
  const [amt, setAmt] = useAtom(TotalExpense);
  useEffect(()=>{
    setAmt(sum);
  });
}