import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from '@/constants/options';
import { ChatSession } from '@/service/AIModal';
import React, { use, useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
    import { doc, setDoc } from "firebase/firestore"; 
import { db } from '@/service/firebaseconfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';




function CreateTrip() {
  const [place, setPlace] = useState();

  const [formdata, setFormData] = useState([]);

  const [openDailog, setOpenDialog] = useState(false);

  const [loading,setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formdata,
      [name]: value,
    });
  }

  useEffect(() => {
   console.log('Form Data Updated:', formdata);
  }, [formdata]);


  const login =useGoogleLogin({
    onSuccess: (coderesp) =>GetUserDetails(coderesp),
    onError: (error) => {
      console.error('Login Failed:', error);
      toast.error("Login Failed, Please try again");
    },
  })

  const GetUserDetails = (tokeninfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokeninfo?.access_token}`,{
      headers: {
        Authorization: `Bearer ${tokeninfo?.access_token}`,
        Accept: "Application/json", 
      },
    })
      .then((response) => {
        console.log('User Details:', response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        setOpenDialog(false);
        OnGenerateTrip();
        toast.success("Login Successful");
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
        toast.error("Failed to fetch user details");
      });
  }


  const OnGenerateTrip = async () => {
    // toast.loading("Generating Trip, Please wait...")
    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true);
      toast("Please Sign In to Generate Trip");
      return;
    }

    if (formdata?.noofdays > 5&&!formdata?.budget|| !formdata?.traveler|| !formdata?.destination) {
      toast("Please Fill all the fields before generating the trip")
      return; 
    }
    else{
      setLoading(true);
      const FINAL_PROMPT = AI_PROMPT
        .replace('{location}', formdata?.destination?.label)
        .replace('{totalDays}', formdata?.noofdays)
        .replace('{traveler}', formdata?.traveler)
        .replace('{budget}', formdata?.budget)
        .replace('{totalDays}', formdata?.noofdays)
      console.log('Final Prompt:', FINAL_PROMPT);

       try {
        const result = await ChatSession(FINAL_PROMPT); // Pass the prompt
        console.log('AI Response:', result); // Log the AI response
        setLoading(false);
        SaveAiTrip(result);
      } catch (error) {
          console.error("Error generating trip:", error);
      }
    } 
  }

  const SaveAiTrip=async(tripdata) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docID = Date.now().toString();
    await setDoc(doc(db, "AITrips", docID), {
      userSelection: formdata,
      tripData: JSON.parse(tripdata),
      user: {
        name: user?.name,
        email: user?.email,
        picture: user?.picture,
      },
      id: docID,
    }); 
    setLoading(false);
    navigate(`/view-trip/${docID}`);
  }


  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-slate-100 to-slate-200 p-6 md:p-12 text-gray-800">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold text-center text-slate-800">Plan Your Dream Trip with AI ✨</h1>
        <p className="text-center text-lg text-slate-600 max-w-2xl">
          Let our AI craft the perfect travel experience just for you. Fill in a few preferences and get a personalized itinerary.
        </p>

        <div className="w-full mt-10 grid gap-10">
          <section className="w-full flex flex-col gap-4">
            <h2 className="text-xl font-semibold">📍 What is your destination of choice?</h2>
            <div className="bg-white shadow-md rounded-xl p-4">
              <GooglePlacesAutocomplete
                apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
                selectProps={{
                  place,
                  onChange: (v) => {
                    setPlace(v);
                    handleInputChange('destination', v);
                  },
                  styles: {
                    input: (provided) => ({
                      ...provided,
                      fontSize: '16px',
                    }),
                    control: (provided) => ({
                      ...provided,
                      borderRadius: '0.75rem',
                      padding: '0.2rem 0.5rem',
                      borderColor: '#e2e8f0',
                    }),
                  },
                }}
              />
            </div>
          </section>

          <section className="w-full flex flex-col gap-4">
            <h2 className="text-xl font-semibold">🗓️ How many days are you planning your trip?</h2>
            <div className="bg-white shadow-md rounded-xl p-4 w-full max-w-md">
              <Input placeholder="e.g. 5" type="number" className="text-lg" onChange={(e)=>handleInputChange("noofdays",e.target.value)} />
            </div>
          </section>

          <section className="w-full flex flex-col items-center gap-4">
            <h2 className="text-xl font-semibold">💰 What is your Budget?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {SelectBudgetOptions.map((item, index) => (
                <div
                  key={index}
                  className={`bg-white hover:shadow-xl transition rounded-xl p-6 flex flex-col items-center gap-2 border ${formdata.budget === item.title ? 'shadow-lg border-black' : ''}`}
                  onClick={() => handleInputChange('budget', item.title)}
                >
                  <div className="text-3xl">{item.icon}</div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-slate-600 text-center">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="w-full flex flex-col items-center gap-4">
            <h2 className="text-xl font-semibold">🚗 What do you plan to travel on?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {SelectTravelsList.map((item, index) => (
                <div
                  key={index}
                  className={`bg-white hover:shadow-xl transition rounded-xl p-6 flex flex-col items-center gap-2 border  ${formdata.traveler === item.people ? 'shadow-lg border-black' : ''}`}
                  onClick={() => handleInputChange('traveler', item.people)}
                >
                  <div className="text-3xl">{item.icon}</div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-slate-600 text-center">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Button */}
          <div className="w-100% flex items-center justify-center ">
            <Button onClick={OnGenerateTrip} disable={loading} className="px-6 py-3 text-lg rounded-xl bg-indigo-600 hover:bg-indigo-700 transition text-white">
              {loading? <AiOutlineLoading3Quarters className='animate-spin'/> : null}
              Generate My Trip 🚀
            </Button>
          </div>
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
    </div>
  );
}

export default CreateTrip;
