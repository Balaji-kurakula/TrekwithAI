import React, { use, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';



function Header() {
  const user = JSON.parse(localStorage.getItem('user'));

  const [openDailog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log('User data:', user);
  }, [user]);

  const login = useGoogleLogin({
    onSuccess: (coderesp) => GetUserDetails(coderesp),
    onError: (error) => {
      console.error('Login Failed:', error);
      toast.error("Login Failed, Please try again");
    },
  })

  const GetUserDetails = (tokeninfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokeninfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokeninfo?.access_token}`,
        Accept: "Application/json",
      },
    })
      .then((response) => {
        console.log('User Details:', response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        setOpenDialog(false);
        window.location.reload();
        toast.success("Login Successful");
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
        toast.error("Failed to fetch user details");
      });
  }

  return (
    <div className="px-6 py-3 shadow-md bg-white/70 backdrop-blur-md border-b border-gray-200 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img src="./logo.png" alt="TrekwithAI Logo" className="w-12 h-12 rounded-xl shadow-sm" />
        <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-700 to-sky-400 text-transparent bg-clip-text">
          TrekwithAI
        </h1>
      </div>

      <div>
        {user ? (
          <div className="flex items-center gap-4">
            <a href='/my-trips'>
              <Button
                variant="outline"
                className="rounded-full border-blue-500 text-blue-600 hover:bg-blue-50 transition duration-200"
              >
                My Trips
              </Button>
            </a>


            <Popover>
              <PopoverTrigger> <img
                src={user?.picture}
                alt="user"
                className="w-10 h-10 rounded-full border cursor-pointer border-gray-300 shadow-sm hover:scale-105 transition-transform"
              /></PopoverTrigger>
              <PopoverContent>
                <h2 onClick={
                  () => {
                    googleLogout();
                    localStorage.removeItem('user');
                    window.location.reload();
                  }
                }>Logout</h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)} className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white rounded-full px-6">
            Sign In
          </Button>
        )}
        <Dialog open={openDailog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <img src="./logo.png" alt="TrecwithAI Logo" className="w-16 h-16 mx-auto mb-4" />
                <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2>
                <p>Sign in to the App with Google authentification securely</p>
                <Button onClick={login} className='w-full mt-5'><FcGoogle />Sign In With Google</Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default Header;
