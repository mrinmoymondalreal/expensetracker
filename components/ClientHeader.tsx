"use client";

import { LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";
import { logout } from "@/lib/pbhook";

export function LogOutButton(){
  return (
    <Button variant="outline" size="icon" onClick={()=>logout()}>
      <LogOutIcon className="h-4 w-4" />
    </Button>
  );
}