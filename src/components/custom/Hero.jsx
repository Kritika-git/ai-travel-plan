import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import Marquee from '../ui/marquee';

function Hero() {
 
  const images = [
    {
      name: "Chichen Itza",
      src: "/hero/chichen.webp",
      link: "https://en.wikipedia.org/wiki/Chichen_Itza",
    },
    {
      name: "Christ the Redeemer",
      src: "/hero/christ.webp",
      link: "https://en.wikipedia.org/wiki/Christ_the_Redeemer_(statue)",
    },
    {
      name: "Colosseum",
      src: "/hero/colosseum.webp",
      link: "https://en.wikipedia.org/wiki/Colosseum",
    },
    {
      name: "Great Pyramid of Giza",
      src: "/hero/giza.webp",
      link: "https://en.wikipedia.org/wiki/Great_Pyramid_of_Giza",
    },
    {
      name: "Machu Picchu",
      src: "/hero/peru.webp",
      link: "https://en.wikipedia.org/wiki/Machu_Picchu",
    },
    {
      name: "Taj Mahal",
      src: "/hero/taj.webp",
      link: "https://en.wikipedia.org/wiki/Taj_Mahal",
    },
    {
      name: "India Gate",
      src: "/hero/india.webp",
      link: "https://en.wikipedia.org/wiki/India_Gate",
    },
    {
      name: "Great Wall of China",
      src: "/hero/wall.webp",
      link: "https://en.wikipedia.org/wiki/Great_Wall_of_China",
    },
    {
      name: "Eiffel Tower",
      src: "/hero/tower.webp",
      link: "https://en.wikipedia.org/wiki/Eiffel_Tower",
    },
    {
      name: "Statue of Liberty",
      src: "/hero/liberty.webp",
      link: "https://en.wikipedia.org/wiki/Statue_of_Liberty",
    },
    {
      name: "Sydney Opera House",
      src: "/hero/sydney.webp",
      link: "https://en.wikipedia.org/wiki/Sydney_Opera_House",
    },
    {
      name: "Mount Everest",
      src: "/hero/everest.webp",
      link: "https://en.wikipedia.org/wiki/Mount_Everest",
    },
    {
      name: "Stonehenge",
      src: "/hero/stonehenge.webp",
      link: "https://en.wikipedia.org/wiki/Stonehenge",
    },
  ];


  const first = images.slice(0, images.length / 2);
  const second = images.slice(images.length / 2);

  return (
    <main className="relative flex min-h-[calc(100vh-76px)] flex-col items-center justify-center overflow-hidden py-14 text-center sm:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top, hsl(var(--accent)), transparent_52%)] opacity-70" />
      <div className="text px-10 md:px-40 flex flex-col items-center justify-center gap-4">
        <div className="heading p-2 md:py-5">
          <h1 className="font-black text-3xl leading-tight text-foreground md:text-5xl">
          Your Dream Trip <br /> One Click Away with
          </h1>
          <h1 className="bg-gradient-to-r from-primary to-cyan-500 bg-clip-text pb-4 text-5xl font-black text-transparent md:text-8xl">
          JourneyBot
          </h1>
        </div>
        <div className="desc">
          <h5 className="opacity-90 mx-auto text-center text-lg font-medium tracking-tight text-primary/80 md:text-xl">
            Your trusted AI trip planner and adventure guide.
          </h5>
        </div>
        <div className="buttons flex flex-col gap-3 md:flex-row">
          <Link to="/create-trip">
            <Button className="">
               Plan a Trip, It's Free
            </Button>
          </Link>
          
        </div>
        <div className="marquee relative mt-8 flex w-[min(1100px,90vw)] flex-col items-center justify-center overflow-hidden rounded-2xl py-3">
          <Marquee reverse pauseOnHover className="[--duration:60s]">
            {second.map((item, index) => {
              return (
                <Link
                  key={index}
                  to={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="img cursor-pointer overflow-hidden rounded-md transition-all w-[200px] md:w-[250px]"
                >
                  <img
                    src={item.src}
                    alt={item.name}
                    className="h-full hover:scale-110 duration-300"
                    loading="lazy"
                    role="presentation"
                  />
                </Link>
              );
            })}
          </Marquee>
          <Marquee pauseOnHover className="[--duration:60s]">
            {first.map((item, index) => {
              return (
                <Link
                  key={index}
                  to={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="img cursor-pointer overflow-hidden rounded-md transition-all w-[200px] md:w-[250px]"
                >
                  <img
                    src={item.src}
                    alt={item.name}
                    className="h-full hover:scale-110 duration-300"
                    loading="lazy"
                    role="presentation"
                  />
                </Link>
              );
            })}
          </Marquee>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background to-transparent"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background to-transparent"></div>
        </div>
      </div>
    </main>
  );
}

export default Hero;
