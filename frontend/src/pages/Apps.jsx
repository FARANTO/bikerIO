import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import 'react-toastify/dist/ReactToastify.css';

function Apps() {
  const [appsData, setAppsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // 1. Handle Search with manual Loading trigger
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Only show loader if there is a search value
    if (value.trim() !== "") {
      setIsLoading(true);
      
      // Debounce the loading state to turn off after 500ms
      const timeoutId = setTimeout(() => {
        setIsLoading(false);
      }, 500);

      // Clean up timeout if user types again quickly
      return () => clearTimeout(timeoutId);
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const fetchApps = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/apps`);
        setAppsData(response.data);
      } catch (error) {
        console.error("Failed to fetch apps", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApps();
  }, []);

  const filteredApps = appsData.filter((app) =>
    app.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDownloads = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(0) + "M";
    if (num >= 1000) return (num / 1000).toFixed(0) + "K";
    return num;
  };

  return (
    
    <div className="min-h-screen bg-[#F9FAFB] py-12 px-4">
      <div className="max-w-7xl mx-auto pt-10">
        
        {/* Title Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0B1B3D] mb-4">
            Our available Bikes
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Explore All Bikes on the Market from by us. We sell to Millions
          </p>
        </div>

        {/* Search and States Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="text-xl font-bold text-[#0B1B3D]">
            ({filteredApps.length}) Bikes Found
          </div>
          
          <div className="relative w-full md:w-80">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="search Bikes"
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md outline-none focus:border-[#8344FF] focus:ring-1 focus:ring-[#8344FF] bg-transparent transition-all"
              value={searchQuery}
              onChange={handleSearch} // UPDATED HERE
            />
          </div>
        </div>

        {/* Logic: Show Loading OR Results OR No Found Message */}
        {isLoading ? (
          <Loading />
        ) : filteredApps.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredApps.map((app) => (
              <Link 
                to={`/app/${app.id}`} 
                key={app.id} 
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                  <img 
                    src={app.image} 
                    alt={app.title} 
                    className="w-full h-full object-contain p-4" 
                  />
                </div>
                
                <h3 className="font-bold text-[#0B1B3D] text-lg mb-4 truncate">
                  {app.title}
                </h3>
                
                <div className="flex justify-between items-center mt-auto">
                  <div className="flex items-center gap-1 bg-green-50 text-emerald-500 px-2 py-1 rounded text-xs font-bold">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    {formatDownloads(app.downloads)}
                  </div>
                  
                  <div className="flex items-center gap-1 bg-orange-50 text-orange-500 px-2 py-1 rounded text-xs font-bold">
                    ★ {app.ratingAvg}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-[#0B1B3D]">No Bike Found</h3>
            <p className="text-gray-500 mt-2">
              We couldn't find any bike matching "{searchQuery}"
            </p>
          </div>
        )}
        
      </div>
    </div>
  );
}

export default Apps;