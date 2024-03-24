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
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";

import useAddDialog from "@/lib/states/addDialog";
import useExpenseDialog from "@/lib/states/expenseDialog";
import useCatDialog from "@/lib/states/catDialog";
import { getAllCategory } from "@/lib/pbhook";
import { useAtom } from "jotai";
import { Categories } from "@/lib/atoms";

export default function AddDialog(){
  const [isOpen, setOpenState] = useState(false);
  useAddDialog.g = setOpenState;

  let [cat, setCategories] = useAtom(Categories);


  useEffect(()=>{
   async function getData(){
    setCategories(await getAllCategory() as any);
   } 

   getData();
  }, []);

  return (
  <Drawer open={isOpen} onOpenChange={(f)=>setOpenState(f)}>
      <DrawerContent className="h-[70vh]">
        <DrawerHeader>
          <DrawerTitle>Expenses Categories</DrawerTitle>
        </DrawerHeader>
        <div className="w-full h-fit px-2 py-4 grid grid-cols-4 gap-y-8">
          <div className="flex justify-center">
            <Button onClick={()=>{
              setOpenState(false);
              useCatDialog.g(true);
              }}>
              <PlusIcon className="h-6 w-6"/>
            </Button>
          </div>
          {cat.map(({ name, emoji, isSpent }: any, i)=>(
            <Button key={i} onClick={()=>{
              setOpenState(false);
              useExpenseDialog.g([true, emoji, name, isSpent]);
            }} variant="ghost" className="icon-container h-16 flex flex-col items-center">
              <div className="icon text-2xl">{emoji}</div>
              <div className="name">{name}</div>
            </Button>
          ))}
        </div>
        <DrawerFooter>
          <DrawerClose>
            <div>Cancel</div>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}