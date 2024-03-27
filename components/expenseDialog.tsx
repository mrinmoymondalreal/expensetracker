"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { useRef, useState } from "react";

import useExpenseDialog from "@/lib/states/expenseDialog";
import { addNewExpense, getUser } from "@/lib/pbhook";
import { setToday } from "@/lib/signal";

export default function ExpenseDialog(){
  const [isOpen, setOpenState] = useState<[boolean,string,string,boolean]>([false, "", "", false]);
  useExpenseDialog.g = setOpenState;

  let expenseRef = useRef<HTMLInputElement>(null);

  let date = new Date();
  async function handleSubmit(){
    let user = (await getUser());

    if(expenseRef.current?.value.trim() == "" || !user.model) return false;

    let data = {
      "name": isOpen[2],
      "emoji": isOpen[1],
      "user": user.model.id,
      "time": new Date().getTime(),
      amount: Math.abs(parseFloat(expenseRef.current?.value || '0')),
      "isSpent": isOpen[3]
    };
    addNewExpense(data);
    setToday.value((e: any)=>[...e, data]);
    setOpenState([false, '', '', false]);

  }
  return (
  <Drawer open={isOpen[0]} onOpenChange={(f)=>setOpenState([f, isOpen[1], isOpen[2], isOpen[3]])}>
      <DrawerContent className="h-[70vh]">
        <DrawerHeader>
          <DrawerTitle>Add Expenses</DrawerTitle>
        </DrawerHeader>
        <div className="w-full px-2 py-4 flex flex-col items-center space-y-8">
          <div className="date text-sm">{date.getUTCDate() + " " + date.toLocaleString('default', { month: 'long' }) + " " + date.getUTCFullYear()} {date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }</div>
          <div className="input flex justify-center items-center gap-x-2">
            <div id="currency" className="text-lg">$</div>
            <input ref={expenseRef} type="number" placeholder="0" className="w-[50%] h-fit text-center border-b-2  border-gray-500
            placeholder:font-black placeholder:text-5xl text-5xl font-black outline-none dark:bg-primary-foreground" />
          </div>
          <div className="arrow">
            <ArrowDown className="w-16 h-16 text-gray-500"/>
          </div>
          <div className="icons flex flex-col items-center gap-y-2">
            <div className="icon text-4xl">{isOpen[1]}</div>
            <div className="name font-semibold text-gray-500 dark:text-gray-100">{isOpen[2]}</div>
          </div>
        </div>
        <DrawerFooter>
          <Button onClick={handleSubmit}>Add</Button>
          <DrawerClose>
            <div>Cancel</div>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}