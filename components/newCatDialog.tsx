"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import EmojiPicker, { EmojiStyle } from 'emoji-picker-react';


import useCatDialog from "@/lib/states/catDialog";
import { addNewCategory, getUser } from "@/lib/pbhook";

export default function CatDialog(){
  const [isOpen, setOpenState] = useState(false);
  useCatDialog.g = setOpenState;

  let [isSpent, setIsSpent] = useState(true);
  let [emoji, setEmoji] = useState("⛽");
  let [isEmojiOpen, setEmojiOpen] = useState(false);

  let nameRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(){

    let user = (await getUser());

    if(nameRef.current?.value.trim() == "" || !user.model) return false;

    let data = await addNewCategory({
      name: nameRef.current?.value,
      emoji,
      isSpent,
      user: user.model?.id
    });

    if(data) setOpenState(false);
  }

  return (
  <Drawer open={isOpen} onOpenChange={(f)=>setOpenState(f)}>
      <DrawerContent className="h-[70vh]">
        <DrawerHeader>
          <DrawerTitle>Add New Category</DrawerTitle>
        </DrawerHeader>
        <div className="w-fit px-2 py-4 flex flex-col items-center justify-center space-y-8">
          <div className="flex gap-2">
          <span className={isSpent ? "line-through" : ""}>Credit</span>
            <Switch className="data-[state=unchecked]:bg-green-600 data-[state=checked]:bg-red-600" defaultChecked={true} onCheckedChange={setIsSpent} />
            <span className={!isSpent ? "line-through" : ""}>Debit</span>
          </div>
          <div className="date text-sm">Tap on Emoji to Change</div>
          <Dialog open={isEmojiOpen} onOpenChange={setEmojiOpen}>
            <DialogTrigger className="p-0 text-5xl">{emoji}</DialogTrigger>
            <DialogContent>
              <EmojiPicker emojiStyle={EmojiStyle.NATIVE} searchDisabled={false} autoFocusSearch={true} onEmojiClick={function(obj){
                setEmojiOpen(false);
                setEmoji(obj.emoji);
              }} lazyLoadEmojis={true} />
            </DialogContent>
          </Dialog>
          <input type="text" ref={nameRef} placeholder="Name" className="flex-1 w-full text-center border-b-2 py-2 border-gray-500
          placeholder:font-black placeholder:text-3xl text-3xl font-black outline-none" />
        </div>
        <DrawerFooter>
          <Button onClick={handleSubmit}>Create</Button>
          <DrawerClose>
            <div>Cancel</div>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}