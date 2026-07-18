import { Link } from "react-router-dom";
import notFoundImage from "../assets/images/error-404.png"; 

function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        
        {/* 404 Image */}
        <div className="mb-8 flex justify-center">
          <img 
            src={notFoundImage} 
            alt="404 Not Found" 
            className="w-full max-w-md h-auto drop-shadow-lg"
          />
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-black text-[#0B1B3D] mb-4">
          Oops, page not found!
        </h1>

        {/* Subheading */}
        <p className="text-gray-500 text-lg mb-8">
          The page you are looking for is not available.
        </p>

        {/* Go Back Button */}
        <Link
          to="/"
          className="inline-block btn text-white border-none px-8 py-3 rounded-lg font-semibold transition-transform hover:scale-105 active:scale-95"
          style={{
            background: "linear-gradient(to right, #632EE3, #9F62F2)",
          }}
        >
          Go Back
        </Link>
      </div>
    </div>
  );
}

export default NotFound;