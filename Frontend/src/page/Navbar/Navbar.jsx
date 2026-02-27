import React from 'react'
import logo from "../../assets/logo.png";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,

} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { DragHandleHorizontalIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';

const Navbar = () => {

  const { auth } = useSelector(store => store)

  return (
    <div className='px-1 py-1 border-b border-b-gray-500 z-50 bg-background bg-opacity-0 sticky top-0 left-0 right-0 flex justify-between items-center'>
      <div className='flex items-center gap-3'>
        <Sheet>
          <SheetTrigger>
            <Button variant="ghost" className="rounded-full h-auto w-auto">
              <DragHandleHorizontalIcon style={{ width: "26px", height: "26px" }} className='text-white' />
            </Button>
          </SheetTrigger>

          <SheetContent className="w-72 bg-[var(--purple)] border-r-0 flex flex-col justify-center" side="left">
            <SheetHeader>
              <SheetTitle>
                <div className='text-3xl flex justify-center items-center gap-1'>
                  <Avatar>
                    <AvatarImage className="h-30 w-30" src={logo} />
                  </Avatar>
                </div>
              </SheetTitle>
            </SheetHeader>
            <Sidebar />
          </SheetContent>

        </Sheet>
        <p className='text-sm lg:text-base cursor-pointer'>
          Tradease
        </p>
        <div className='p-0 ml-9'>
          <Button variant="outline" className="flex w-50 gap-3 hover:bg-[#7c7490]">
            <MagnifyingGlassIcon />
            <span>Search</span>
          </Button>
        </div>
      </div>
      <div className='h-12 w-12 rounded-full bg-gray-500'>
        <Avatar>
          <AvatarFallback className='flex items-center justify-center h-full w-full text-xl'>
            {auth.user?.fullname?.[0]?.toUpperCase?.() ?? "U"}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}

export default Navbar