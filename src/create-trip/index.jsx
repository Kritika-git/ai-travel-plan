import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelersList,
} from "@/constants/options";
import { chatSession } from "@/service/AiModel";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { ArrowRight, Check, Minus, Plus } from "lucide-react";
import { useNavigate, useNavigation } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState();

  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const [loading, setLoading] = useState(false);

  const selectStyles = {
    control: (base, state) => ({
      ...base,
      minHeight: 54,
      border: 0,
      borderBottom: `1px solid hsl(var(--border))`,
      borderRadius: 0,
      backgroundColor: "hsl(var(--muted) / 0.45)",
      boxShadow: state.isFocused ? "0 2px 0 hsl(var(--ring))" : "none",
      color: "hsl(var(--foreground))",
      transition: "box-shadow 150ms ease, background-color 150ms ease",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "hsl(var(--popover))",
      border: "1px solid hsl(var(--border))",
      boxShadow: "0 16px 36px hsl(var(--shadow-color) / 0.14)",
      zIndex: 20,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? "hsl(var(--accent))" : state.isFocused ? "hsl(var(--muted))" : "transparent",
      color: "hsl(var(--popover-foreground))",
      cursor: "pointer",
    }),
    placeholder: (base) => ({ ...base, color: "hsl(var(--muted-foreground))" }),
    singleValue: (base) => ({ ...base, color: "hsl(var(--foreground))" }),
    input: (base) => ({ ...base, color: "hsl(var(--foreground))" }),
    indicatorSeparator: () => ({ display: "none" }),
    dropdownIndicator: (base) => ({ ...base, color: "hsl(var(--muted-foreground))" }),
  };

  const navigate=useNavigate()
  const handleInputChange = (name, value) => {
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });
  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      !formData?.location ||
      !formData?.budget ||
      !formData?.noOfDays ||
      !formData?.noOfPeople
    ) {
      toast("Please fill all the fields!");
      return;
    } else if (formData?.noOfDays > 10) {
      toast("Please enter No. of days less than 10");
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{noOfDays}", formData?.noOfDays)
      .replace("{noOfPeople}", formData?.noOfPeople)
      .replace("{budget}", formData?.budget)
      .replace("{noOfDays}", formData?.noOfDays);

    console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log(result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };
  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate('/view-trip/'+docId);
  };

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
        setOpenDialog(false);
        OnGenerateTrip();
      });
  };

  return (
    <main className="mx-auto max-w-[720px] px-5 py-14 sm:px-8 lg:py-20">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Build your itinerary</p>
      <h2 className="text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
        Tell us how you want to travel.
      </h2>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>
      <div className="mt-12 flex flex-col">
        <section className="border-t border-border py-8 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
          <h2 className="mb-4 text-lg font-medium"><span className="mr-4 font-serif text-2xl text-primary">01</span>Destination</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACES_API_KEY}
            selectProps={{
              place,
              placeholder: "Search for a city or place",
              styles: selectStyles,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
          />
        </section>
        <section className="border-t border-border py-8 animate-in fade-in-0 slide-in-from-bottom-2 duration-300 delay-75">
          <h2 className="mb-4 text-lg font-medium"><span className="mr-4 font-serif text-2xl text-primary">02</span>Duration</h2>
          <div className="flex items-center border-b border-border bg-muted/40">
            <button type="button" aria-label="Decrease trip duration" className="h-14 w-14 text-muted-foreground transition-colors hover:text-foreground" onClick={() => handleInputChange("noOfDays", Math.max(1, Number(formData?.noOfDays || 1) - 1))}><Minus className="mx-auto h-4 w-4" /></button>
            <Input
              className="h-14 border-0 bg-transparent text-center font-mono text-xl shadow-none focus-visible:ring-0"
              placeholder={"3"}
              type="number"
              value={formData?.noOfDays || ""}
              onChange={(e) => handleInputChange("noOfDays", e.target.value)}
            />
            <span className="pr-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">days</span>
            <button type="button" aria-label="Increase trip duration" className="h-14 w-14 text-muted-foreground transition-colors hover:text-foreground" onClick={() => handleInputChange("noOfDays", Math.min(10, Number(formData?.noOfDays || 0) + 1))}><Plus className="mx-auto h-4 w-4" /></button>
          </div>
        </section>

        <section className="border-t border-border py-8 animate-in fade-in-0 slide-in-from-bottom-2 duration-300 delay-150">
          <h2 className="mb-4 text-lg font-medium"><span className="mr-4 font-serif text-2xl text-primary">03</span>Budget</h2>
          <div className="grid grid-cols-1 divide-y divide-border border-y border-border">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`group flex cursor-pointer items-center justify-between gap-4 px-4 py-5 transition-colors hover:bg-muted/50 ${formData?.budget == item.title ? "bg-accent/60" : ""}`}
              >
                <div><h2 className="font-medium">{item.title}</h2><h2 className="text-sm text-muted-foreground">{item.desc}</h2></div>
                {formData?.budget == item.title && <Check className="h-4 w-4 text-primary" />}
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-border py-8 animate-in fade-in-0 slide-in-from-bottom-2 duration-300 delay-200">
            <h2 className="mb-4 text-lg font-medium"><span className="mr-4 font-serif text-2xl text-primary">04</span>Travellers</h2>
            <div className="grid grid-cols-2 gap-px overflow-hidden border border-border bg-border sm:grid-cols-4">
              {SelectTravelersList.map((item) => {
                const isSelected = formData?.noOfPeople === item.people;

                return (
                <button
                  type="button"
                  key={item.id}
                  aria-pressed={isSelected}
                  data-selected={isSelected}
                  onClick={() => handleInputChange("noOfPeople", item.people)}
                    className={`relative cursor-pointer bg-background p-4 text-left transition-all hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary sm:min-h-32 ${isSelected ? "!bg-accent !text-accent-foreground ring-1 ring-inset ring-primary" : ""}`}
                >
                  <h2 className="font-serif text-3xl text-primary">{item.people.split(" ")[0].replace("to", "-")}</h2>
                  <h2 className="mt-2 font-medium text-sm">{item.title}</h2>
                  <h2 className="mt-1 text-xs text-muted-foreground">{item.desc}</h2>
                  {isSelected && <Check aria-hidden="true" className="absolute right-3 top-3 h-4 w-4 text-primary" />}
                </button>
                );
              })}
            </div>
        </section>
        <div className="border-t border-border py-8">
          <Button className="group h-14 w-full justify-between rounded-none bg-foreground px-5 text-background hover:bg-foreground/90" disabled={loading} onClick={OnGenerateTrip}>
            {loading ? (
              <span className="h-1 w-full animate-pulse bg-primary/70" />
            ) : (
              <><span>Generate Trip</span><ArrowRight className="h-5 w-5 text-primary transition-transform group-hover:translate-x-1" /></>
            )}
          </Button>
          {loading && (
            <div className="mt-6" role="status" aria-live="polite">
              <p className="mb-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">Crafting your itinerary</p>
              <div className="space-y-2">
                <div className="trip-loader h-3 w-3/4 rounded-sm bg-muted" />
                <div className="trip-loader h-3 w-full rounded-sm bg-muted" />
                <div className="trip-loader h-3 w-1/2 rounded-sm bg-muted" />
              </div>
            </div>
          )}


        </div>
        <Dialog open={openDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <img src="/logo.svg" />
                <h2 className="font-bold text-lg mt-7">Sign in with Google</h2>
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
    </main>
  );
}

export default CreateTrip;
