"use client";

import { Button } from "@/components/ui/button";
import { LoaderIcon, SunIcon } from 'lucide-react';
import AddDialog from "@/components/adddailog";
import ExpenseDialog from "@/components/expenseDialog";
import CatDialog from "@/components/newCatDialog";
import { AddButton, AllSpents, TotalSpent } from "@/components/ClientComp";
import { LogOutButton } from "@/components/ClientHeader";
import { useEffect, useState } from "react";
import { getUser } from "@/lib/pbhook";
import { useRouter } from "next/navigation";
import { user } from "@/lib/signal";
import ThemeSwitch from "./ThemeSwitch";


export default function Home() {

  const [isLoading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(()=>{
    let run = async () =>{
      let _user = await getUser();
      if(_user.model && _user.model.id){
        user.value = _user.model;
        setLoading(false);
      }
      else router.push('/login');
    }
    if(isLoading){ run(); }
  }, []);

  return ( isLoading ? (
    <div className="w-full h-full absolute top-0 left-0 bg-primary-foreground/70
            flex justify-center items-center">
      <div>
        <LoaderIcon size={50} className="animate-spin"/>
      </div>
    </div>
  ) :
    <div className="flex justify-center w-full max-h-screen min-h-screen relative">
      <div className="max-w-[425px] flex-1 border-2 border-transparent relative overflow-y-scroll">

        <header id="header" className="border-b-2 w-full border-primary h-16 flex items-center px-6">
          <div className="left flex-1 ">
            <ThemeSwitch />
          </div>
          <div className="middle flex-[3] flex justify-center">Expense Tracker</div>
          <div className="right flex-1 flex justify-end">
            <LogOutButton/>
          </div>
        </header>

        <main className="relative h-full">
          <AllSpents />
          <AddDialog/>
          <ExpenseDialog/>
          <CatDialog/>
        </main>

        <div>
          <div className="fixed bottom-0 right-0 md:right-auto md:left-1/2 md:-translate-x-1/2 z-50">
            <AddButton/>
          </div>
        </div>


      </div>
    </div>
  );
}