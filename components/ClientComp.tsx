"use client";

import { ExpenseData, TotalExpense } from "@/lib/atoms";
import { filter, giveDate } from "@/lib/utils";
import { Separator } from "@radix-ui/react-separator";
import { useAtom } from "jotai";
import { Button } from "./ui/button";
import { BarChartBig, LoaderIcon, PlusIcon } from "lucide-react";
import useAddDialog from "@/lib/states/addDialog";
import { memo, useEffect, useState } from "react";
import { getAllExpenses } from "@/lib/pbhook";
import { expense_data, setToday } from "@/lib/signal";

export function TotalSpent({ sum, setAmount }: any){
  const [ amount, _setAmount ] = useState<number>(sum);
  setAmount = _setAmount;
  useEffect(()=>{
    setAmount(sum);
  }, [sum]);
  let color = amount < 0 ? "text-red-500" : "text-green-500";
  return (
    <div className="total-spent w-full h-64 relative
    flex justify-center items-center flex-col gap-y-2">
    <div className="analytics absolute right-0 top-0 mt-4 mr-2">
      <Button variant="link">
        <BarChartBig className="mr-2 h-4 w-4" /> Analytics
      </Button>
    </div>
    <div className="sub-heading text-sm text-gray-400">Spent this month</div>
    <div className={"amt flex text-2xl font-bold " + color}>
      <div className="currency mr-1">₹</div>
      <div className="total-amt text-4xl">{amount.toString().split('.')[0]}</div>
      <div className="decimal-val">{amount.toString().split('.')[1] && "." + amount.toString().split('.')[1]}</div>
    </div>
    </div>
  )
}

export function AddButton(){
  return (
    <Button className="rounded-full aspect-square w-14 h-14 p-0 border-2 border-black
              mr-6 md:mr-0 mb-8 md:mb-4" size="lg"
              onClick={()=>useAddDialog.g((e:boolean)=>!e)}>
      <PlusIcon className="h-8 w-8" />
    </Button>
  )
}

const Spent = memo(function ({ amount, name, emoji, time, isSpent, showDate }: any){
  let color = isSpent ? "text-red-500" : "text-green-500";

  let date = new Date(time);

  return (
    <>
    <div className="spent-item flex items-center p-2 relative">
      <div className="icon flex-shrink text-4xl">{emoji}</div>
      <div className="spent-name flex-[4] px-4 flex flex-col justify-center -gap-y-4">
        <div className="name">{name}</div>
        <div className="time text-xs font-semibold text-gray-400">{showDate && date.getDate() + " " + date.toLocaleString('default', { month: 'long' }) + " " + date.getUTCFullYear()} {date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
      </div>
      <div className={"spent-amt px-4 " + color}>{isSpent?"-":"+"} ₹ {new Number(amount).toLocaleString('en-IN')}</div>
    </div>
    <Separator className="my-4" />
    </>
  );
});

const SpentsDiv = function ({ data, name, showDate }: any){
  if(!data || data.length <= 0) return ""; 
  let spentToName = data.map(({ amount, isSpent }: any)=>(isSpent ? -1 : 1) * Number(amount)).reduce((current: number, acc: number)=>{
    return current + acc;
  });


  return (
    <>
    <div className="sub-heading sticky bg-primary-foreground z-40 top-0 flex px-4 mt-4 text-sm text-gray-400">
      <div className="date flex-1 capitalize">{name}</div>
      <div className="total-spent-date flex-1 flex justify-end">{spentToName.toString()[0] == "-" ? "-" : "+"} ₹ {spentToName.toString().replace("-", "")}</div>
    </div>

    <div className="spents mt-4 space-y-2">
      {data.map(({ amount, name, emoji, time, isSpent }: any, i: number)=><Spent key={i} name={name} amount={amount} time={time} emoji={emoji} isSpent={isSpent} showDate={showDate} />)}
    </div>
    </>
  )
};

export function AllSpents(){
  const expenses = expense_data;
  const [data, setData] = useState<any>(null);

  useEffect(()=>{
    async function run(){
      let g = await getAllExpenses();
      expenses.value = g;
      setData(g);
    }
    run();
  }, []);

  
  let setAmount, sum = 0;
  
  let [today, rest1] = filter(data || [], ({ time })=>giveDate(time) == "same day");
  let [yesterday, rest2] = filter(rest1, ({ time })=>giveDate(time) == "yesterday");
  let [thisweek, rest3] = filter(rest2, ({ time })=>giveDate(time) == "same week");
  let [thismonth, rest4] = filter(rest3, ({ time })=>giveDate(time) == "same month");
  
  let [_today, _setToday] = useState(today);
  setToday.value = _setToday;
  
  useEffect(()=>setToday.value(today),[today.length]);

  sum = [..._today, ...yesterday, ...thismonth, ...thisweek].reduce((a, { isSpent, amount: b }) =>{
    if(isSpent) b = -b;
    return a+b;
  }, 0);

  return ( !data ? (
    <div className="w-full h-full absolute top-0 left-0 bg-primary-foreground/70
            flex justify-center items-center">
      <div>
        <LoaderIcon size={50} className="animate-spin"/>
      </div>
    </div>
  ) :
    <>
    <TotalSpent sum={sum} setAmount={setAmount} />
    <div className="sub-main">
      <SpentsDiv data={_today.sort((a, b)=>b.time - a.time)} name="Today" showDate={false}/>
      <SpentsDiv data={yesterday.sort((a, b)=>b.time - a.time)} name="Yesterday" showDate={false}/>
      <SpentsDiv data={thisweek.sort((a, b)=>b.time - a.time)} name="This Week" showDate={true}/>
      <SpentsDiv data={thismonth.sort((a, b)=>b.time - a.time)} name="This Month" showDate={true}/>
      <SpentsDiv date={rest4.sort((a, b)=>b.time - a.time)} name="Others" showDate={true}/>
    </div>
    </>
  );
}