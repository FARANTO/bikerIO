import { Link } from "react-router-dom";
import appsData from "../data/apps.json";

function TrendingApps() {
  // Grab only the first 8 for the trending section
  const trendingList = appsData.slice(0, 8);

  const formatDownloads = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
    return num;
  };

  return (
    <section className="py-20 px-4 bg-gray-50/50 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Trending Bikes</h2>
          <p className="text-gray-500">Explore All Trending Bikes on the Market brought by us</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {trendingList.map((app) => (
            <Link 
              to={`/app/${app.id}`} 
              key={app.id} 
              className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow flex flex-col"
            >
              <div className="w-full aspect-square bg-gray-200 rounded-xl overflow-hidden mb-4">
                <img src={app.image} alt={app.title} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-4">{app.title}</h3>
              
              <div className="flex justify-between items-center mt-auto">
                <div className="flex items-center gap-1 bg-green-50 text-emerald-500 px-2 py-1 rounded text-sm font-semibold">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  {formatDownloads(app.downloads)}
                </div>
                <div className="flex items-center gap-1 bg-orange-50 text-orange-500 px-2 py-1 rounded text-sm font-semibold">
                  ★ {app.ratingAvg}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link to="/apps" className="btn bg-[#8344FF] hover:bg-[#6b36d6] text-white border-none px-8 rounded-lg normal-case">
            Show All
          </Link>
        </div>
      </div>
    </section>
  );
}

export default TrendingApps;