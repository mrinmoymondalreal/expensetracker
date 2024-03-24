import { Button } from "@/components/ui/button";

import { LogOutIcon, SunIcon } from 'lucide-react';
import AddDialog from "@/components/adddailog";
import ExpenseDialog from "@/components/expenseDialog";
import CatDialog from "@/components/newCatDialog";
import { AddButton, AllSpents, TotalSpent } from "@/components/ClientComp";
import { Metadata } from "next";
import { LogOutButton } from "@/components/ClientHeader";

export default function Home() {

  return (
    <div className="flex justify-center w-full max-h-screen min-h-screen relative">
      <div className="max-w-[425px] flex-1 border-2 border-transparent relative overflow-y-scroll">

        <header id="header" className="border-b-2 w-full border-primary h-16 flex items-center px-6">
          <div className="left flex-1 ">
          <Button variant="outline" size="icon">
            <SunIcon className="h-4 w-4" />
          </Button>
          </div>
          <div className="middle flex-[3] flex justify-center">Expense Tracker</div>
          <div className="right flex-1 flex justify-end">
            <LogOutButton/>
          </div>
        </header>

        <main>
          <TotalSpent />
          <div className="sub-main">
            <AllSpents/>
          </div>
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

export const metadata: Metadata = {
  title: {
    template: '%s | Expense Tracker',
    default: 'Expense Tracker',
  },
  description: 'The official Next.js Learn Dashboard built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};
