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

    // Check if the browser supports notifications
    if ('Notification' in window) {
      // Request permission to send notifications
      Notification.requestPermission().then(function (permission) {
        if (permission === 'granted') {
          // Permission granted, you can now send notifications
          console.log('Notification permission granted');
          if ('serviceWorker' in navigator) {
            // Register a service worker hosted at the root of the
            // site using the default scope.
            navigator.serviceWorker.register(`/serviceWorker/notification.js`).then(
              registration => {
                console.log('Service worker registration succeeded:', registration);
                // registration.showNotification('Daily Notification', {
                //   body: 'This is your daily reminder!'
                // });
              },
              /*catch*/ error => {
                console.error(`Service worker registration failed: ${error}`);
              }
            );
          } else {
            console.error('Service workers are not supported.');
          }
        } else if (permission === 'denied') {
          // Permission denied
          console.warn('Notification permission denied');
        } else {
          // Permission dismissed (default)
          console.warn('Notification permission dismissed');
        }
      });
    } else {
      console.warn('Notifications are not supported in this browser');
    }

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

        <header id="header" className="border-b-2 w-full border-primary dark:border-gray-900 h-16 flex items-center px-6">
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