import logo from "../assets/icons/logo.png";

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-20 w-full">
      <div className="relative flex items-center justify-center mb-6">
        {/* daisyUI Spinner - Sized Up */}
        <span className="loading loading-spinner text-error w-28 h-28"></span>
        
        {/* Logo positioned inside with 360 rotation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src={logo} 
            alt="Loading..." 
            className="w-14 h-14 animate-spin-slow" 
          />
        </div>
      </div>
      
      <h2 className="text-2xl font-black tracking-[0.4em] text-[#0B1B3D] animate-pulse">
        LOADING
      </h2>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 2s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default Loading;