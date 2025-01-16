import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SelectBudgetOptions, SelectTravelersList } from "@/constants/options";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

function CreateTrip() {
  const [place, setPlace] = useState();

  const [formData,setFormData]=useState([]);

  const handleInputChange=(name,value)=>{

    
    setFormData({
      ...formData,
      [name]:value
    })
  }

  useEffect(()=>{
    console.log(formData)
  },[formData])

  const OnGenerateTrip=()=>{
    if(formData?.noOfDays > 10){
      return;
    }
  }
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-30 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preferences 🗻🏖️</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>
      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is your destination?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACES_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange('location',v);
              },
            }}
          />
        </div>
        <div >
          <h2 className="text-xl my-3 font-medium">
           What is the duration of your Trip?
          </h2>
          <Input placeholder={'Ex. 3'} type='number' 
          onChange={(e)=>handleInputChange('noOfDays',e.target.value)}/>
          
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
           What is your budget?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            
            {SelectBudgetOptions.map((item,index)=>(
              <div key={index} 
              onClick={()=>handleInputChange('budget',item.title)}
              className={`p-4 border  cursor-pointer rounded-lg hover:shadow-lg
              ${formData?.budget==item.title && `shadow-lg border-black`}
              `}>
                
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>

          <div>
          <h2 className="text-xl my-3 font-medium">
          How many travellers?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelersList.map((item,index)=>(
              <div key={index} 
              onClick={()=>handleInputChange('noOfPeople',item.people)}
              className={`p-4 border  cursor-pointer rounded-lg hover:shadow-lg
              ${formData?.noOfPeople==item.people && `shadow-lg border-black`}
              `}>
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
                <h2 className="text-sm text-gray-500">{item.people}</h2>
              </div>
            ))}
          </div>
          </div>
        </div>
        <div className=" flex my-10 justify-end">
        <Button>Generate Trip</Button>
        </div>
            

      </div>
    </div>
  );
}

export default CreateTrip;
