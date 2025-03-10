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
    <div className="p-2 shadow-sm flex justify-between items-center px-5">
      <a href="/">
        <img src="/logo_new.png" className="h-[55px] w-[290px]" />
      </a>
      <div className="flex items-center gap-5">
        <ThemeToggle />
        {user ? (
          <div className="flex items-center gap-5">
            <a href="/create-trip">
              <Button variant="outline" className="rounded-full">
                + Create Trip
              </Button>
            </a>
            <a href="/my-trips">
              <Button variant="outline" className="rounded-full">
                My Trips
              </Button>
            </a>
            <Popover open={openPopover} onOpenChange={setOpenPopover}>
              <PopoverTrigger className="bg-transparent">
                <img src={user?.picture} className="h-[45px] w-[45px] rounded-full" />
              </PopoverTrigger>
              <PopoverContent className="text-center">
                <h2 className="cursor-pointer" onClick={handleLogout}>
                  Log Out
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
  <DialogContent>
    <DialogHeader>
      <DialogDescription>
        <img src="/logo_new.png" className="h-[40px] w-[175px]"/>
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

    </div>
  );
}

export default Header;
