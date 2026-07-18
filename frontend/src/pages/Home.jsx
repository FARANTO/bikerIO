import heroImg from "../assets/images/hero.png";
import googlePlay from "../assets/icons/google-play.png";
import appStore from "../assets/icons/app-store.png";
import Stats from "../components/Stats"; 
import TrendingApps from "../components/TrendingApps";

function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Banner Section */}
      <section className="flex flex-col items-center text-center pt-16 px-4">
      {/* Updated Stacking Heading */}
      <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-8 tracking-tight">
        <span className="block mb-2">We sell</span>
        <span className="bg-gradient-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent">
          trending
        </span> 
        {" "}bikes
      </h1>

      {/* Button Container */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <a 
          href="https://play.google.com" 
          target="_blank" 
          rel="noreferrer"
          className="btn btn-outline border-gray-300 hover:bg-gray-100 flex items-center gap-2 normal-case font-medium px-6"
        >
          <img src={googlePlay} alt="Google Play" className="w-6 h-6" />
          <span className="text-black">Google Play</span>
        </a>

        <a 
          href="https://www.apple.com/app-store/" 
          target="_blank" 
          rel="noreferrer"
          className="btn btn-outline border-gray-300 hover:bg-gray-100 flex items-center gap-2 normal-case font-medium px-6"
        >
          <img src={appStore} alt="App Store" className="w-6 h-6" />
          <span className="text-black">App Store</span>
        </a>
      </div>

      {/* Hero Image */}
      <div className="max-w-4xl w-full">
        <img 
          src={heroImg} 
          alt="App Mockup" 
          className="w-full h-auto drop-shadow-2xl"
        />
      </div>
    </section>

    {/* Stats Section */}
      <Stats />

      {/* Trending Apps Section */}
      <TrendingApps /> 
  </div>
  );
}

export default Home;