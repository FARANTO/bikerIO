import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "react-toastify";
import axios from "axios";
import AppError from "../assets/images/App-Error.png";

function AppDetails() {
  const { id } = useParams();
  const [app, setApp] = useState(null);
  const [isOrdered, setIsOrdered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdatingOrder, setIsUpdatingOrder] = useState(false);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const fetchApp = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/apps/${id}`);
        setApp(response.data);

        const savedApps = JSON.parse(localStorage.getItem("installedApps") || "[]");
        const isSaved = savedApps.some((savedApp) => savedApp.id === response.data.id);
        setIsOrdered(isSaved);

        try {
          const orderResponse = await axios.get(`${apiUrl}/api/orders/${response.data.id}`);
          setIsOrdered(orderResponse.data.isOrdered || isSaved);
        } catch (orderError) {
          console.error("Failed to fetch order state", orderError);
        }
      } catch (error) {
        console.error("Failed to fetch app details", error);
        setApp(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApp();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-lg text-gray-500">Loading bike details...</p>
      </div>
    );
  }

  if (!app) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
        <div className="max-w-md w-full mb-8">
          <img src={AppError} alt="Not Found" className="w-full" />
        </div>
        <h1 className="text-4xl font-extrabold text-[#0B1B3D] mb-4 text-center">OPPS!! Bike NOT FOUND</h1>
        <Link to="/apps" className="btn text-white border-none px-10 rounded-lg bg-gradient-to-r from-[#632EE3] to-[#9F62F2]">
          Go Back!
        </Link>
      </div>
    );
  }

  const handleOrderToggle = async () => {
    if (!app) return;

    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const action = isOrdered ? "remove" : "add";

    try {
      setIsUpdatingOrder(true);
      const response = await axios.post(`${apiUrl}/api/orders`, {
        appId: app.id,
        action,
      });

      const savedApps = JSON.parse(localStorage.getItem("installedApps") || "[]");
      const updatedApps = action === "add"
        ? savedApps.some((savedApp) => savedApp.id === app.id)
          ? savedApps
          : [...savedApps, app]
        : savedApps.filter((savedApp) => savedApp.id !== app.id);

      localStorage.setItem("installedApps", JSON.stringify(updatedApps));
      setIsOrdered(response.data.isOrdered ?? action === "add");

      toast.success(
        action === "add"
          ? `Successfully ordered ${app.title}!`
          : `Removed ${app.title} from your orders.`
      );
    } catch (error) {
      console.error("Failed to update order status", error);
      toast.error("Unable to update your order right now.");
    } finally {
      setIsUpdatingOrder(false);
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num;
  };

  const chartData = [...app.ratings].reverse();

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12 px-4 pt-28">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-48 h-48 flex-shrink-0 bg-gray-50 rounded-2xl p-4 border border-gray-100">
            <img src={app.image} alt={app.title} className="w-full h-full object-contain rounded-xl" />
          </div>
          <div className="flex-grow">
            <h1 className="text-3xl font-bold text-[#0B1B3D] mb-1">{app.title}</h1>
            <p className="text-gray-500 mb-6">Developed by <span className="text-[#8344FF] font-medium">{app.companyName}</span></p>
            
            <div className="flex gap-8 mb-8">
               {/* Stats remain the same */}
               <div>
                 <p className="text-xs font-semibold text-gray-400 uppercase">Orders</p>
                 <p className="text-2xl font-bold text-[#0B1B3D]">{formatNumber(app.downloads)}</p>
               </div>
               <div>
                 <p className="text-xs font-semibold text-gray-400 uppercase">Rating</p>
                 <p className="text-2xl font-bold text-[#0B1B3D]">{app.ratingAvg}</p>
               </div>
            </div>

            <button 
              onClick={handleOrderToggle} 
              disabled={isUpdatingOrder}
              className={`btn border-none px-8 text-white ${isOrdered ? "bg-gray-400" : "bg-[#00D084] hover:bg-[#00b573]"}`}
            >
              {isUpdatingOrder ? "Updating..." : isOrdered ? "Remove Order" : `Order Now (${app.size} ft)`}
            </button>
          </div>
        </div>

        <hr className="my-10 border-gray-100" />
        
        {/* Chart and Description sections remain the same */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-[#0B1B3D] mb-6">Bike Review Chart</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={chartData}> 
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={80} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="count" fill="#F97316" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <hr className="my-10 border-gray-100" />
        <div>
          <h2 className="text-xl font-bold text-[#0B1B3D] mb-4">Description</h2>
          <p className="text-gray-500 leading-relaxed">{app.description}</p>
        </div>
      </div>
    </div>
  );
}

export default AppDetails;