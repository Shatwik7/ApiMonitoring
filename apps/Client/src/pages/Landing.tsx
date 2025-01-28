import { useEffect, useState } from "react";
import { Vortex } from "../components/Vortex";
import { useNavigate} from 'react-router-dom';

export function Landing() {
  const words = ['Spot', 'Resolve', 'Prevent'];
  const [currentWord, setCurrentWord] = useState(0);
  const navigate=useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full mx-auto rounded-md  h-screen overflow-hidden">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={500}
        baseHue={120}
        className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-full"
      >
        <section className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat text-white text-center px-6">
          <h1 className="mt-3 hero-text inline-block text-transparent font-semibold tracking-tight text-[60px] sm:text-[100px] lg:text-[115px] leading-[88%]">
            <div className="relative js-slide grid text-white">
              {words.map((word, index) => (
                <span
                  key={index}
                  className={`absolute transition-all duration-700 ease-in-out ${index === currentWord
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-full'
                    }`}
                  style={{ gridArea: '1 / 1' }}
                >
                  {word}
                </span>
              ))}
            </div>
            downtime.
          </h1 >
          <h1 className="hero-text inline-block font-semibold tracking-tight file:text-[60px] sm:text-[100px] lg:text-[115px] leading-[88%]">
            Downtime.
          </h1>
          <p className="text-xl max-w-2xl mt-6">
            Sentinel helps you monitor, spot, and prevent API downtimes with
            real-time insights, alerts, and comprehensive analytics.
          </p>
          {(!localStorage.getItem('token'))?(
            <button onClick={()=>navigate('/dash')} className="mt-8 bg-indigo-500 hover:bg-indigo-600 text-white py-3 px-8 rounded-lg font-semibold shadow-lg">
              Go to Dashboard
            </button>):null
          }
          <button onClick={()=>navigate('/signin')} className="mt-8 bg-indigo-500 hover:bg-indigo-600 text-white py-3 px-8 rounded-lg font-semibold shadow-lg">
            Sign Up Now
          </button>
        </section>
      </Vortex>
    </div>
  );
}
