import Navbar from '../components/Navbar';
import FeatureSection from '../components/FeatureSection';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import ParkingSearch from '../components/ParkingSearch';

const Index = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      {/* Inject styles for text and car animation */}
      <style>{`
        /* Keyframes for text color sweep */
        @keyframes text-color-sweep {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animated-text-gradient {
          background-image: linear-gradient(
            to right,
            #ffffff, /* Start color (white) */
            #a7f3d0, /* Mid color (light green/teal) */
            #60a5fa, /* Mid color (light blue) */
            #ffffff  /* End color (white) */
          );
          background-size: 300% 100%; /* Make background wider than text for sweep effect */
          -webkit-background-clip: text;
          -moz-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: text-color-sweep 8s linear infinite;
        }
        
        .animated-text-gradient-secondary {
          background-image: linear-gradient(
            to right,
            #e0e7ff, /* Start color (light indigo) */
            #c7d2fe, /* Mid color (lighter indigo) */
            #a5b4fc, /* Mid color (even lighter indigo) */
            #e0e7ff  /* End color (light indigo) */
          );
          background-size: 300% 100%;
          -webkit-background-clip: text;
          -moz-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: text-color-sweep 8s linear infinite;
          animation-delay: 0.5s; /* Slight delay for the second line */
        }


        /* Keyframes for the car driving across */
        @keyframes drive-in {
          0% {
            transform: translateX(-150vw);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(150vw);
            opacity: 0;
          }
        }

        /* Keyframes for the subtle car bounce */
        @keyframes car-bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }

        /* Keyframes for the road lines moving */
        @keyframes move-road {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100px); /* This should be the width of one dash + gap */
          }
        }
        
        /* Keyframes for headlight glow */
        @keyframes headlight-glow {
            0%, 100% {
                opacity: 0.7;
                box-shadow: 0 0 10px 5px #fff, 0 0 15px 10px #f0e68c;
            }
            50% {
                opacity: 0.5;
                box-shadow: 0 0 8px 4px #fff, 0 0 12px 8px #f0e68c;
            }
        }

        /* Animation container for positioning */
        .animation-container {
            margin-top: 2rem;
            position: relative;
            height: 100px; /* Give space for the road and car */
        }
        
        /* The car body */
        .car-body {
          position: absolute;
          bottom: 25px; /* Position car on top of the road base line */
          left: 50%; /* Start from center for transform */
          width: 130px;
          height: auto;
          animation: drive-in 9s ease-in-out infinite, car-bounce 1s ease-in-out infinite;
          animation-delay: 1.5s, 1.5s;
          opacity: 0;
          z-index: 10;
        }

        /* Headlights container */
        .headlights {
            position: absolute;
            bottom: 45px; /* Position relative to car body */
            left: 50%;
            width: 120px; /* Match car width */
            animation: drive-in 9s ease-in-out infinite;
            animation-delay: 1.5s;
            opacity: 0;
            z-index: 9;
        }
        
        /* The headlight beam */
        .headlight-beam {
            position: absolute;
            right: -10px; /* Position at the front of the car */
            top: 5px;
            width: 30px;
            height: 1px;
            background: #f0e68c;
            border-radius: 50%;
            opacity: 0.7;
            animation: headlight-glow 2s linear infinite;
        }
        
        /* The road container */
        .road {
          position: absolute;
          bottom: 20px;
          left: 0;
          right: 0;
          height: 5px;
          background: #4a5568; /* A dark gray for the road */
          overflow: hidden;
        }

        /* The moving dashed lines on the road */
        .road-lines {
          position: absolute;
          top: 0;
          left: 0;
          width: 200%; /* Make it wider than the screen to hide looping */
          height: 100%;
          background-image: linear-gradient(to right, white 50%, transparent 50%);
          background-size: 50px 3px; /* width of dash, height of line */
          background-repeat: repeat-x;
          animation: move-road 0.5s linear infinite;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .car-body {
            width: 100px;
          }
          .headlights {
              width: 95px;
          }
          .animated-text-gradient, .animated-text-gradient-secondary {
            font-size: 2.5rem; /* Adjust font size for smaller screens if needed */
          }
        }
         @media (max-width: 480px) {
          .animated-text-gradient, .animated-text-gradient-secondary {
            font-size: 2rem; /* Further adjust font size for mobile */
          }
        }
      `}</style>

      <Navbar />

      {/* Hero section */}
      <div className='pt-16 pb-20 bg-gradient-to-br from-indigo-600 to-blue-900 min-h-screen overflow-x-hidden'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h1 className='text-4xl font-extrabold tracking-wider sm:text-5xl md:text-7xl mt-16 sm:mt-24'>
            <span className='block animated-text-gradient leading-tight'>Parking made simple</span>
            <span className='block animated-text-gradient-secondary'>anytime, anywhere</span>
          </h1>
          <p className='text-base mt-6 max-w-lg mx-auto sm:text-xl text-gray-200 sm:max-w-3xl font-light'>
            Find and book available parking spaces in seconds. Save time, money and eliminate the stress of finding parking.
          </p>
          
          <ParkingSearch />

          <div className='mt-8 text-sm text-white'>
            Over 50,000 parking spots available in more than 200 cities
          </div>
        </div>
      </div>

      <FeatureSection />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
