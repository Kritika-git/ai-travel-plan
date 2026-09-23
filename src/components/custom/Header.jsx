// import React, { useEffect, useState } from 'react'
// import { Button } from '../ui/button'
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"
// import { googleLogout, useGoogleLogin } from '@react-oauth/google';
// import { useNavigation } from 'react-router-dom';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { FcGoogle } from "react-icons/fc";
// import axios from "axios";
// import ThemeToggle from './ThemeToggle';

// function Header() {

//   const user=JSON.parse(localStorage.getItem('user'));
//   const [openDialog, setOpenDialog] = useState(false);
//   useEffect(()=>{
//     console.log(user);
//   },[])
//   const login = useGoogleLogin({
//     onSuccess: (codeResp) => GetUserProfile(codeResp),
//     onError: (error) => console.log(error),
//   });
//   const GetUserProfile = (tokenInfo) => {
//     axios
//       .get(
//         `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
//         {
//           headers: {
//             Authorization: `Bearer ${tokenInfo?.access_token}`,
//             Accept: `Application/json`,
//           },
//         }
//       )
//       .then((resp) => {
//         console.log(resp);
//         localStorage.setItem("user", JSON.stringify(resp.data));
//         setOpenDialog(false);
//         window.location.reload();
//       });
//   };

//   return (
//     <div className='p-2 shadow-sm flex justify-between items-center px-5'>
//       <a href='/'>
//         <img src="/logo_new.png"  className="h-[55px] w-[290px]"/>
//         </a>
//         <div className='flex items-center gap-5'>
//           <ThemeToggle/>
//             {user?
//             <div className='flex items-center gap-5'>
//               <a href='/create-trip'>
//               <Button varient="outline" className="rounded-full">+ Create Trip</Button>
//               </a>
//               <a href='/my-trips'>
//               <Button varient="outline" className="rounded-full">My Trips</Button>
//               </a>
//               <Popover >
//               <PopoverTrigger className="bg-transparent ">
//                 <img src={user?.picture} className='h-[45px] w-[45px] rounded-full '/>
//               </PopoverTrigger>
//               <PopoverContent>
//               <h2 className='cursor-pointer'
//               onClick={()=>{
//                 googleLogout();
//                 localStorage.clear();
//                 window.location.reload();
//                 window.location.href = "/";
                
//               }}> Log Out</h2>
//               </PopoverContent>
//               </Popover>

              
//             </div>:<Button onClick={()=>setOpenDialog(true)}>Sign In</Button>
//           }
//         </div>
//         <Dialog open={openDialog} onOpenChange={setOpenDialog}>
//           <DialogContent>
//             <DialogHeader>
//               <DialogDescription>
//                 <img src="/logo.svg" />
//                 <h2 className="font-bold text-lg mt-7">Sign in with Google</h2>
//                 <p className="mt-3">
//                   Sign In to the App with Google authentication securely.
//                 </p>
//                 <Button
//                   className="w-full mt-5 flex gap-4 items-center"
//                   onClick={login}
//                 >
//                   <FcGoogle className="h-8 w-8" />
//                   Sign In With Google
//                 </Button>
//               </DialogDescription>
//             </DialogHeader>
//           </DialogContent>
//         </Dialog>
//     </div>
//   )
// }

// export default Header
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import ThemeToggle from "./ThemeToggle";

function Header() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));
  const [openDialog, setOpenDialog] = useState(false);
  const [openPopover, setOpenPopover] = useState(false); // New state for Popover

  useEffect(() => {
    console.log(user);
  }, [user]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: `Application/json`,
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setUser(resp.data); // Update user state
        setOpenDialog(false);
      });
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    setUser(null); // Update state immediately
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  };

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border/70 bg-background/85 px-4 py-3 backdrop-blur-xl sm:px-8">
      <a href="/">
        <span className="font-serif text-2xl font-semibold tracking-[-0.04em] text-primary sm:text-3xl">
          Journey<span className="text-foreground">Bot</span>
        </span>
      </a>
      <div className="flex items-center gap-2 sm:gap-4">
        <a
          href="/"
          className="hidden rounded-none border-b border-transparent px-2 py-2 text-sm font-medium transition-colors hover:border-primary hover:text-primary sm:inline-flex"
        >
          Home
        </a>
        <ThemeToggle />
        {user ? (
          <div className="flex items-center gap-2 sm:gap-3">
            <a href="/create-trip">
              <Button variant="ghost" className="hidden rounded-none border-b border-transparent px-2 text-sm hover:border-primary hover:bg-transparent sm:inline-flex">
                Create Trip
              </Button>
            </a>
            <a href="/my-trips">
              <Button variant="ghost" className="hidden rounded-none border-b border-transparent px-2 text-sm hover:border-primary hover:bg-transparent md:inline-flex">
                My Trips
              </Button>
            </a>
            <Popover open={openPopover} onOpenChange={setOpenPopover}>
              <PopoverTrigger className="rounded-full border-2 border-primary/30 bg-transparent p-0.5 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <img src={user?.picture} alt="Open account menu" className="h-10 w-10 rounded-full object-cover" />
              </PopoverTrigger>
              <PopoverContent className="text-center">
                <h2 className="cursor-pointer" onClick={handleLogout}>
                  Log Out
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button className="rounded-full px-5" onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
  <DialogContent>
    <DialogHeader>
      <DialogDescription>
        <span className="font-serif text-3xl font-semibold tracking-[-0.04em] text-primary">
          Journey<span className="text-foreground">Bot</span>
        </span>
        <h2 className="font-bold text-lg mt-5">Sign in with Google</h2>
        <p className="mt-3">
          Sign In to the App with Google authentication securely.
        </p>
        <Button
          className="w-full mt-5 flex gap-4 items-center"
          onClick={login}
        >
          <FcGoogle className="h-8 w-8" />
          Sign In With Google
        </Button>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </header>
  );
}

export default Header;
