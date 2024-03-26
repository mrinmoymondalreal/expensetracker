import { LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";
import { logout } from "@/lib/pbhook";
import { useRouter } from "next/navigation";

export function LogOutButton(){
  const router = useRouter();
  return (
    <Button variant="outline" size="icon" onClick={()=>{
      router.push('/login');
      logout();
    }}>
      <LogOutIcon className="h-4 w-4" />
    </Button>
  );
}