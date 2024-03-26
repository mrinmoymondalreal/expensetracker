"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUp } from "@/lib/pbhook";
import { LoaderIcon, LogOutIcon, SunIcon } from "lucide-react";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface SignUpForm {
  current: {
    value: string;
  };
}

export default function Page() {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const name = useRef<HTMLInputElement>(null);
  const username = useRef<HTMLInputElement>(null);

  const [isLoading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string>("");

  let router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    
    let response: boolean = await signUp({
      name: name.current?.value,
      email: email.current?.value,
      username: username.current?.value,
      password: password.current?.value,
      passwordConfirm: password.current?.value,
      mobile: "+91 0000000000"
    }, setError);

    if(response) return router.push('/login');

    setLoading(false);
  };

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
          <div className="right flex-1 flex justify-end"></div>
        </header>

        {
          isLoading && (
        <div className="w-full h-full absolute top-0 left-0 bg-primary-foreground/70
                        flex justify-center items-center">
          <div>
            <LoaderIcon size={50} className="animate-spin"/>
          </div>
        </div>
          )
        }

        <main className="flex flex-col gap-y-2 justify-center items-center h-[calc(100%-4rem)]">
          <h2 className="text-2xl font-bold uppercase">SignUp</h2>
          <span id="error" className="text-red-600 ">{error}</span>
          <form className="w-[90%] space-y-4 flex flex-col justify-center" onSubmit={handleSubmit}>
            <Input type="text" placeholder="Name" ref={name} />
            <Input type="email" placeholder="Email" ref={email} />
            <Input type="text" placeholder="username" ref={username} />
            <Input type="password" placeholder="password" ref={password} />
            <Button type="submit">SignUp</Button>
            <div>Already a have Account? <Link href="/login" className="underline">Login</Link></div>
          </form>
        </main>
      </div>
    </div>
  );
}
