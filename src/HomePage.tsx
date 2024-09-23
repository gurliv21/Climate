import { Button } from '@mantine/core'

import Particles from "@/components/magicui/particles";
import ShinyButton from "@/components/magicui/shiny-button";
import { useNavigate } from 'react-router-dom';
function HomePage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/Home')
  }
  const handleClickGithub = () => {
    window.location.href = "https://github.com/gurliv21/NotesAi";
  };
  return (
    <main className='relative text-white bg-black overflow-hidden'>
      {/* Particles Background */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={100}
        ease={80}
        color='#FFFFFF'
        refresh
      />
      <section className='flex justify-between p-5 z-10 relative '>
        <h2 className='font-bold text-2xl'>InkSolve</h2>
        <Button className='font-bold bg-[#1041d6] rounded-lg' onClick= {handleClickGithub}>Code</Button>
      </section>
      <hr className='border-gray-600 my-4 z-10 relative' />
      <div className='text-center flex flex-col items-center m-4 md:m-8 z-10 relative'>
        <h1 className='font-semibold text-2xl lg:text-5xl md:text-3xl  pt-12 md:pb-4'>
          <span className="hidden sm:inline">
          <span className='border-color-text '>Transform your sketches into answers with AI:</span><br/> draw anything and get instant solutions!!
          </span>
          {/* For small screens */}
          <span className="sm:hidden text-lg ">
          <span className='border-color-text ' >Transform your sketches into answers with AI draw anything and get instant solutions!!</span>
          </span>
        </h1>
        <p className="text-gray-400 text-sm lg:px-80 p-6">
          {/* For medium and large screens */}
          <span className="hidden sm:inline">
            Bring Your Imagination to Life Draw, Sketch, and Let Our AI Reveal the Answers
            <br />
            Instantly. Experience the Future of Problem Solving with Just a Simple Drawing.
          </span>
          {/* For small screens */}
          <span className="sm:hidden text-xs ">
            Bring Your Imagination to Life Draw,<br /> Sketch, and Let Our AI Reveal the Answers
          </span>
        </p>

      </div>
      <div className='text-center z-10 relative m-2 md:m-12 '>
        <ShinyButton text="Get Started" className="bg-white" onClick={handleClick} />
      </div>
      <div className='flex items-center justify-center  h-auto md:h-auto lg:h-screen bg-black'>
        <div className='text-center z-10 relative'>
          <img src={'img.png'} alt="Illustration" className="image-with-shadow" />
        </div>
      </div>


    </main>
  )
}

export default HomePage

