import Globe from "@/components/ui/globe";

 


import Particles from "@/components/magicui/particles";

import { useNavigate } from 'react-router-dom';
import { Button } from "@mantine/core";

function HomePage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/Climate')
  }
  
  return (
    <>
    <div className="bg-black">
     <Particles
        className="absolute inset-0 z-0"
        quantity={100}
        ease={80}
        color='#FFFFFF'
        refresh
      />
    <div className="relative flex size-full h-screen w-screen items-center justify-center overflow-hidden rounded-lg border bg-background px-40 pb-40 pt-8 md:pb-60 md:shadow-xl">
  <span className="pointer-events-none absolute top-20 whitespace-pre-wrap bg-gradient-to-b from-gray-700 to-gray-300/80 bg-clip-text text-center text-6xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10 ">
  Visualizing Climate Change Effects on Ecosystems
  </span>
  <div className="flex text-centers m-12">
  <Button className="bg-white text-black font-bold" onClick={handleClick}>GET STARTED</Button>
  </div>
  <Globe className="top-96" />
  <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
</div>
</div>

    </>
  )
}

export default HomePage

