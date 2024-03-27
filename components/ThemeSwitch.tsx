import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { useEffect } from "react";

const SetThemeColor = (props: any) => {
  useEffect(()=>{
    setTimeout(()=>{
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', `hsl(${getComputedStyle(document.body).getPropertyValue('--background')})`);
    }, 0);
  });
  return "";
} 

export default function ThemeSwitch(){
  const { setTheme, theme, systemTheme, resolvedTheme } = useTheme();
  let toggle = (theme == 'system' && systemTheme == 'light' || theme == 'light') ? 'dark' : 'light';

  return (
    <Button variant="outline" size="icon" onClick={()=>setTheme(toggle)}>
      { toggle == 'dark' ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" /> }
      <SetThemeColor theme={resolvedTheme} />
    </Button>
  )
}