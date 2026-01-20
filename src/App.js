import React, { useState, useRef, useEffect } from "react";
import {
  Plane,
  Hotel,
  Utensils,
  Martini,
  Ticket,
  MapPin,
  Camera,
  ShoppingBag,
  Volume2,
  VolumeX,
  ChevronRight,
  ArrowUpRight,
  Info,
  Upload,
  Music,
  LayoutGrid,
  Wallet,
  Clock,
  CheckCircle,
  DollarSign,
  Trophy,
  Flame,
  Dices,
  TrendingUp,
  TrendingDown,
  Plus,
  Minus,
  X,
  Edit2,
  Trash2,
  Save,
  List,
  Home,
  Shuffle,
  LogOut,
  Calendar,
  Star,
  Settings,
  User,
  Pen,
  Navigation,
  Locate,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  ReferenceLine,
  AreaChart,
  Area,
  Cell,
} from "recharts";

// --- HELPERS ---
const dayOrder = {
  "Thu 22": 1,
  "Fri 23": 2,
  "Sat 24": 3,
  "Sun 25": 4,
  "Mon 26": 5,
  "Tue 27": 6,
  "Wed 28": 7,
  "Thu 29": 8,
  "Fri 30": 9,
  "Sat 31": 10,
  "Sun 01": 11,
  "Mon 02": 12,
  "Tue 03": 13,
};

const sortEvents = (events) => {
  return [...events].sort((a, b) => {
    const dayDiff = (dayOrder[a.day] || 99) - (dayOrder[b.day] || 99);
    if (dayDiff !== 0) return dayDiff;
    if (!a.time) return 1;
    if (!b.time) return -1;
    return a.time.localeCompare(b.time);
  });
};

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 9999;
  const R = 6371; // km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// --- CUSTOM COMPONENTS ---
const BarChartIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="12" x2="12" y1="20" y2="10" />
    <line x1="18" x2="18" y1="20" y2="4" />
    <line x1="6" x2="6" y1="20" y2="16" />
  </svg>
);

const Badge = ({ category }) => {
  const colors = {
    Food: "bg-rose-600 text-white shadow-[0_0_10px_rgba(244,63,94,0.6)] border border-rose-400/50",
    Drinks:
      "bg-amber-600 text-white shadow-[0_0_10px_rgba(245,158,11,0.6)] border border-amber-400/50",
    Party:
      "bg-fuchsia-600 text-white shadow-[0_0_10px_rgba(192,38,211,0.6)] border border-fuchsia-400/50",
    Show: "bg-violet-600 text-white shadow-[0_0_10px_rgba(124,58,237,0.6)] border border-violet-400/50",
    Travel:
      "bg-blue-600 text-white shadow-[0_0_10px_rgba(59,130,246,0.6)] border border-blue-400/50",
    Stay: "bg-indigo-600 text-white shadow-[0_0_10px_rgba(79,70,229,0.6)] border border-indigo-400/50",
    Activity:
      "bg-emerald-600 text-white shadow-[0_0_10px_rgba(16,185,129,0.6)] border border-emerald-400/50",
  };
  return (
    <span
      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm ${
        colors[category] || "bg-gray-500"
      }`}
    >
      {category}
    </span>
  );
};

// --- FLIGHT TRACKER ---
const FlightTracker = () => {
  const [status, setStatus] = useState("Scheduled");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const depTime = new Date("2026-01-22T16:00:00Z").getTime();
    const arrTime = new Date("2026-01-23T02:50:00Z").getTime();
    const updateStatus = () => {
      const now = new Date().getTime();
      if (now < depTime) {
        setStatus("Scheduled");
        setProgress(0);
      } else if (now >= depTime && now <= arrTime) {
        setStatus("In Air");
        setProgress(((now - depTime) / (arrTime - depTime)) * 100);
      } else {
        setStatus("Landed");
        setProgress(100);
      }
    };
    updateStatus();
    const interval = setInterval(updateStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-zinc-900/80 border border-cyan-500/30 rounded-xl p-4 mb-6 relative overflow-hidden backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.15)] animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Plane
            className={`w-4 h-4 ${
              status === "In Air"
                ? "text-green-400 animate-pulse"
                : "text-cyan-400"
            }`}
          />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            VS155
          </span>
        </div>
        <div
          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
            status === "In Air"
              ? "bg-green-500/20 text-green-400 border-green-500/50"
              : status === "Landed"
              ? "bg-zinc-800 text-zinc-400 border-zinc-600"
              : "bg-blue-500/20 text-blue-400 border-blue-500/50"
          }`}
        >
          {status}
        </div>
      </div>
      <div className="flex justify-between items-center text-white mb-6 px-2">
        <div className="text-center">
          <div className="text-2xl font-black tracking-tighter text-cyan-50 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">
            LHR
          </div>
          <div className="text-[10px] text-cyan-200 uppercase tracking-widest">
            London
          </div>
        </div>
        <div className="flex-1 mx-4 relative h-8 flex items-center">
          <div className="w-full h-0.5 bg-zinc-700 rounded-full"></div>
          <div
            className="absolute h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-1000"
            style={{ width: `${progress}%` }}
          ></div>
          <div
            className="absolute w-6 h-6 bg-black border-2 border-cyan-400 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.8)] transition-all duration-1000"
            style={{ left: `${progress}%`, transform: "translateX(-50%)" }}
          >
            <Plane className="w-3 h-3 text-white transform rotate-90" />
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-black tracking-tighter text-purple-50 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">
            LAS
          </div>
          <div className="text-[10px] text-purple-200 uppercase tracking-widest">
            Vegas
          </div>
        </div>
      </div>
    </div>
  );
};

// --- COUNTDOWN COMPONENT ---
const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  useEffect(() => {
    const targetDate = new Date(2026, 0, 22, 16, 0, 0).getTime();
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="grid grid-cols-4 gap-3 text-center mb-8 max-w-xs w-full animate-in fade-in zoom-in duration-700">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div
          key={unit}
          className="bg-black/60 border border-pink-500/30 rounded-xl p-3 backdrop-blur-md shadow-[0_0_15px_rgba(236,72,153,0.2)]"
        >
          <div className="text-3xl font-black text-white tabular-nums tracking-tighter">
            {value}
          </div>
          <div className="text-[9px] text-pink-400 uppercase tracking-widest font-bold">
            {unit}
          </div>
        </div>
      ))}
    </div>
  );
};

// --- NEARBY DEALS (REPLACED LUCKY DIP) ---
const NearbyDeals = () => {
  const defaultDeals = [
    {
      id: 1,
      name: "Ocean Prime",
      deal: "50% off Oysters 4-6pm",
      lat: 36.1079,
      lng: -115.1743,
    },
    {
      id: 2,
      name: "Chandelier Bar",
      deal: "Verbena is a must try",
      lat: 36.1098,
      lng: -115.1739,
    },
    {
      id: 3,
      name: "Blondie's",
      deal: "$20 All You Can Drink 3-6pm",
      lat: 36.1103,
      lng: -115.1719,
    },
    {
      id: 4,
      name: "Ellis Island",
      deal: "$9.99 Steak Special",
      lat: 36.1126,
      lng: -115.1636,
    },
    {
      id: 5,
      name: "Bird Bar",
      deal: "50 cent beers 5-6pm",
      lat: 36.1154,
      lng: -115.1723,
    },
    {
      id: 6,
      name: "Casino Royale",
      deal: "$3 Michelob",
      lat: 36.1206,
      lng: -115.1717,
    },
    {
      id: 7,
      name: "Peppermill",
      deal: "Huge portions, great lounge",
      lat: 36.1336,
      lng: -115.1631,
    },
    {
      id: 8,
      name: "Stage Door",
      deal: "$1 Hot Dogs & Beer",
      lat: 36.1158,
      lng: -115.165,
    },
  ];

  const [deals, setDeals] = useState(() => {
    const saved = localStorage.getItem("vegasDealsV3");
    return saved ? JSON.parse(saved) : defaultDeals;
  });

  const [userLat, setUserLat] = useState(null);
  const [userLng, setUserLng] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState(null);

  const [newPlace, setNewPlace] = useState("");
  const [newDeal, setNewDeal] = useState("");

  useEffect(
    () => localStorage.setItem("vegasDealsV3", JSON.stringify(deals)),
    [deals]
  );

  const refreshLocation = () => {
    setIsLocating(true);
    setLocationError(null);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLat(position.coords.latitude);
          setUserLng(position.coords.longitude);
          setIsLocating(false);
        },
        (error) => {
          setLocationError("Location denied/unavailable. Using fallback.");
          setIsLocating(false);
          // Fallback for preview
          setUserLat(36.1126);
          setUserLng(-115.1767);
        }
      );
    } else {
      setIsLocating(false);
      setLocationError("Geolocation not supported.");
    }
  };

  const addDeal = () => {
    if (!newPlace) return;
    const newItem = {
      id: Date.now(),
      name: newPlace,
      deal: newDeal || "Added manually",
      lat: userLat || 36.1147,
      lng: userLng || -115.1728,
    };
    setDeals([newItem, ...deals]);
    setNewPlace("");
    setNewDeal("");
  };

  const deleteDeal = (id) => {
    if (window.confirm("Delete this deal?"))
      setDeals(deals.filter((d) => d.id !== id));
  };

  const simulateLocation = (loc) => {
    setLocationError(null);
    if (loc === "Bellagio") {
      setUserLat(36.1126);
      setUserLng(-115.1767);
    }
    if (loc === "Fremont") {
      setUserLat(36.1699);
      setUserLng(-115.1455);
    }
  };

  const visibleDeals = deals
    .map((d) => ({
      ...d,
      distance: userLat
        ? calculateDistance(userLat, userLng, d.lat, d.lng)
        : 999,
    }))
    .sort((a, b) => a.distance - b.distance);

  return (
    <div className="p-4 pt-24 pb-24 min-h-screen bg-black text-center">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 italic tracking-tighter">
          NEARBY GEMS
        </h2>
        <button
          onClick={refreshLocation}
          className={`p-2 rounded-full border ${
            isLocating
              ? "animate-spin border-cyan-500 text-cyan-500"
              : "border-zinc-700 text-zinc-400"
          }`}
        >
          <Locate className="w-5 h-5" />
        </button>
      </div>

      {locationError && (
        <div className="mb-4 p-2 bg-red-900/20 border border-red-500/50 rounded-lg text-[10px] text-red-300">
          {locationError}
        </div>
      )}

      <div className="mb-4 flex gap-2 justify-center text-[10px] text-zinc-500">
        <span>SIMULATE:</span>
        <button
          onClick={() => simulateLocation("Bellagio")}
          className="underline hover:text-white"
        >
          At Bellagio
        </button>
        <button
          onClick={() => simulateLocation("Fremont")}
          className="underline hover:text-white"
        >
          At Fremont
        </button>
      </div>

      <div className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800 mb-6 text-left">
        <h3 className="text-[10px] font-bold text-zinc-500 uppercase mb-2">
          Found a spot? Add it!
        </h3>
        <div className="space-y-2">
          <input
            value={newPlace}
            onChange={(e) => setNewPlace(e.target.value)}
            placeholder="Place Name"
            className="w-full bg-black border border-zinc-700 rounded-lg p-2 text-sm text-white focus:border-cyan-500 outline-none"
          />
          <div className="flex gap-2">
            <input
              value={newDeal}
              onChange={(e) => setNewDeal(e.target.value)}
              placeholder="Deal / Happy Hour info"
              className="flex-1 bg-black border border-zinc-700 rounded-lg p-2 text-sm text-white focus:border-cyan-500 outline-none"
            />
            <button
              onClick={addDeal}
              className="bg-cyan-600 text-white p-2 rounded-lg"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {visibleDeals.map((item) => {
          const isClose = item.distance < 0.5; // 500m
          // If we have a location, strictly filter by distance (500m)
          if (!isClose && userLat) return null;

          return (
            <div
              key={item.id}
              className={`relative overflow-hidden rounded-2xl p-4 border text-left transition-all ${
                isClose
                  ? "bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                  : "bg-zinc-900 border-zinc-800 opacity-60"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-black text-lg text-white leading-tight">
                    {item.name}
                  </div>
                  <div className="text-sm text-cyan-300 font-bold mt-1">
                    {item.deal}
                  </div>
                </div>
                {userLat && (
                  <div className="text-right">
                    <div className="text-xs font-mono text-zinc-400">
                      {item.distance.toFixed(2)} km
                    </div>
                    {isClose && (
                      <div className="text-[10px] font-bold text-green-400 uppercase tracking-wide animate-pulse">
                        Nearby
                      </div>
                    )}
                  </div>
                )}
              </div>
              <button
                onClick={() => deleteDeal(item.id)}
                className="absolute top-2 right-2 p-2 text-zinc-600 hover:text-red-500"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          );
        })}
        {userLat &&
          visibleDeals.filter((d) => d.distance < 0.5).length === 0 && (
            <div className="py-12 text-zinc-500 text-sm italic">
              No known deals within 500m.
              <br />
              Try adding one yourself!
            </div>
          )}
        {!userLat && (
          <div className="py-12 text-zinc-500 text-sm italic animate-pulse">
            Waiting for location...
          </div>
        )}
      </div>
    </div>
  );
};

// --- BINGO (5x5 WITH FORFEIT CYCLE & LIST EDITING) ---
const ListEditor = ({ title, items, onSave, onClose }) => {
  const [list, setList] = useState(items);
  const handleChange = (idx, val) => {
    const newList = [...list];
    newList[idx] = val;
    setList(newList);
  };
  return (
    <div className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-zinc-900 border border-pink-500/30 w-full max-w-md rounded-3xl p-6 shadow-2xl relative h-[80vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
          <Edit2 className="w-5 h-5 text-pink-500" /> EDIT {title}
        </h2>
        <div className="flex-1 overflow-y-auto pr-2 space-y-2 no-scrollbar">
          {list.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="text-xs text-zinc-500 font-mono w-6 text-right">
                {idx + 1}.
              </span>
              <input
                value={item}
                onChange={(e) => handleChange(idx, e.target.value)}
                className="flex-1 bg-black/50 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:border-pink-500 outline-none"
              />
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-zinc-800">
          <button
            onClick={() => onSave(list)}
            className="w-full bg-pink-600 text-white font-bold py-3 rounded-xl hover:bg-pink-500 flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" /> SAVE CHANGES
          </button>
        </div>
      </div>
    </div>
  );
};

const ShotOverlay = ({ type, forfeit, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, type === "single" ? 2000 : 5000);
    return () => clearTimeout(timer);
  }, [onClose, type]);
  const isLine = type === "line";
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in zoom-in duration-200"
      onClick={onClose}
    >
      <div className="relative w-full max-w-md p-8 text-center">
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial ${
            isLine ? "from-pink-500/40" : "from-blue-500/40"
          } to-transparent opacity-0 animate-[ping_1s_ease-out_infinite]`}
        ></div>
        <div className="relative z-10 animate-bounce">
          <div className="flex justify-center gap-4 mb-6">
            <div className="relative">
              <div
                className={`absolute inset-0 blur-xl opacity-50 animate-pulse ${
                  isLine ? "bg-amber-400" : "bg-blue-400"
                }`}
              ></div>
              <Martini
                className={`w-24 h-24 drop-shadow-2xl ${
                  isLine
                    ? "text-amber-400 animate-[spin_3s_linear_infinite]"
                    : "text-blue-400 animate-wiggle"
                }`}
              />
            </div>
            {isLine && (
              <div className="relative">
                <div className="absolute inset-0 bg-amber-400 blur-xl opacity-50 animate-pulse"></div>
                <Martini className="w-24 h-24 text-amber-400 drop-shadow-2xl animate-[spin_3s_linear_infinite_reverse]" />
              </div>
            )}
          </div>
          <h2 className="text-5xl font-black italic text-white mb-4 tracking-tighter uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
            {isLine ? "BINGO!" : "FOUND IT!"}
          </h2>
          {isLine ? (
            <div className="bg-gradient-to-r from-pink-600 to-purple-600 border-4 border-white p-6 rounded-3xl shadow-[0_0_60px_rgba(236,72,153,0.6)] transform -rotate-2">
              <p className="text-3xl font-black text-white uppercase animate-pulse leading-none mb-2">
                DOUBLE SHOT
              </p>
              <div className="w-full h-1 bg-white/30 mb-4"></div>
              <p className="text-sm text-pink-200 font-bold uppercase tracking-wider mb-1">
                FORFEIT:
              </p>
              <p className="text-xl text-yellow-300 font-black uppercase tracking-wide">
                {forfeit}
              </p>
            </div>
          ) : (
            <div className="bg-zinc-800/80 border-2 border-blue-400 p-4 rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.4)]">
              <p className="text-2xl font-black text-blue-400 uppercase">
                SINGLE SHOT
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const BingoCard = () => {
  const defaultItemsMartyn = [
    "Hand Pay",
    "Celebrity",
    "Elvis",
    "Low Roller",
    "Saloon Doors",
    "Street Dancer",
    "Robot Car",
    "Open Carry",
    "Couple Fight",
    "Arrest",
    "Nipple Slip",
    "Jackpot",
    "FREE SPACE",
    "Carnival Shot",
    "Slapper Card",
    "Penny Slot",
    "Sports Bet",
    "Trophy Wife",
    "Walk Shame",
    "Team Bride",
    "Asleep Slot",
    "Tito > $1",
    "Influencer",
    "Zipline",
    "Crying",
  ];
  const defaultItemsSarah = [
    "Tito > $1",
    "Influencer",
    "Zipline",
    "Crying",
    "Hand Pay",
    "Street Dancer",
    "Robot Car",
    "Open Carry",
    "Couple Fight",
    "Arrest",
    "Asleep Slot",
    "Celebrity",
    "FREE SPACE",
    "Elvis",
    "Low Roller",
    "Nipple Slip",
    "Jackpot",
    "England Shirt",
    "Carnival Shot",
    "Slapper Card",
    "Penny Slot",
    "Sports Bet",
    "Trophy Wife",
    "Walk Shame",
    "Team Bride",
  ];
  const defaultForfeits = [
    "Buy a round of shots",
    "Do a shot of tequila",
    "Put $20 on Red",
    "Buy the next snack",
    "Ask a stranger for a selfie",
    "Dance on a table",
  ];

  const [activePlayer, setActivePlayer] = useState("Martyn");
  const [editingList, setEditingList] = useState(null);

  const [itemsMartyn, setItemsMartyn] = useState(
    () =>
      JSON.parse(localStorage.getItem("bingoItemsMartynV2")) ||
      defaultItemsMartyn
  );
  const [itemsSarah, setItemsSarah] = useState(
    () =>
      JSON.parse(localStorage.getItem("bingoItemsSarahV2")) || defaultItemsSarah
  );
  const [checkedMartyn, setCheckedMartyn] = useState(
    () =>
      JSON.parse(localStorage.getItem("bingoCheckedMartynV2")) || { 12: true }
  );
  const [checkedSarah, setCheckedSarah] = useState(
    () =>
      JSON.parse(localStorage.getItem("bingoCheckedSarahV2")) || { 12: true }
  );
  const [forfeits, setForfeits] = useState(
    () => JSON.parse(localStorage.getItem("bingoForfeitsV2")) || defaultForfeits
  );
  const [currentForfeitIndex, setCurrentForfeitIndex] = useState(
    () => parseInt(localStorage.getItem("bingoForfeitIndexV2")) || 0
  );
  const [wonLinesMartyn, setWonLinesMartyn] = useState(
    () => JSON.parse(localStorage.getItem("bingoWonLinesMartynV2")) || []
  );
  const [wonLinesSarah, setWonLinesSarah] = useState(
    () => JSON.parse(localStorage.getItem("bingoWonLinesSarahV2")) || []
  );
  const [showShot, setShowShot] = useState(null);

  useEffect(() => {
    localStorage.setItem("bingoItemsMartynV2", JSON.stringify(itemsMartyn));
    localStorage.setItem("bingoItemsSarahV2", JSON.stringify(itemsSarah));
    localStorage.setItem("bingoCheckedMartynV2", JSON.stringify(checkedMartyn));
    localStorage.setItem("bingoCheckedSarahV2", JSON.stringify(checkedSarah));
    localStorage.setItem("bingoForfeitsV2", JSON.stringify(forfeits));
    localStorage.setItem("bingoForfeitIndexV2", currentForfeitIndex);
    localStorage.setItem(
      "bingoWonLinesMartynV2",
      JSON.stringify(wonLinesMartyn)
    );
    localStorage.setItem("bingoWonLinesSarahV2", JSON.stringify(wonLinesSarah));
  }, [
    itemsMartyn,
    itemsSarah,
    checkedMartyn,
    checkedSarah,
    forfeits,
    currentForfeitIndex,
    wonLinesMartyn,
    wonLinesSarah,
  ]);

  const items = activePlayer === "Martyn" ? itemsMartyn : itemsSarah;
  const setItems = activePlayer === "Martyn" ? setItemsMartyn : setItemsSarah;
  const checked = activePlayer === "Martyn" ? checkedMartyn : checkedSarah;
  const setChecked =
    activePlayer === "Martyn" ? setCheckedMartyn : setCheckedSarah;
  const wonLines = activePlayer === "Martyn" ? wonLinesMartyn : wonLinesSarah;
  const setWonLines =
    activePlayer === "Martyn" ? setWonLinesMartyn : setWonLinesSarah;

  const handleTileClick = (index) => {
    if (index === 12) return;
    if (checked[index]) {
      if (window.confirm("Are you sure you want to uncheck this spot?")) {
        const newChecked = { ...checked };
        delete newChecked[index];
        setChecked(newChecked);
      }
    } else {
      const newChecked = { ...checked, [index]: true };
      setChecked(newChecked);
      setShowShot({ type: "single" });
      checkWinCondition(newChecked);
    }
  };

  const checkWinCondition = (currentChecked) => {
    const newWonLines = [];
    for (let i = 0; i < 5; i++) {
      if ([0, 1, 2, 3, 4].every((c) => currentChecked[i * 5 + c]))
        newWonLines.push(`r${i}`);
      if ([0, 1, 2, 3, 4].every((r) => currentChecked[r * 5 + i]))
        newWonLines.push(`c${i}`);
    }
    if ([0, 6, 12, 18, 24].every((i) => currentChecked[i]))
      newWonLines.push("d1");
    if ([4, 8, 12, 16, 20].every((i) => currentChecked[i]))
      newWonLines.push("d2");
    const freshLines = newWonLines.filter((line) => !wonLines.includes(line));
    if (freshLines.length > 0) {
      setWonLines([...wonLines, ...freshLines]);
      setTimeout(() => setShowShot({ type: "line" }), 500);
    }
  };
  const handleShotDismiss = () => {
    if (showShot?.type === "line")
      setCurrentForfeitIndex((prev) => (prev + 1) % forfeits.length);
    setShowShot(null);
  };
  const score = Object.values(checked).filter(Boolean).length;

  return (
    <div className="p-2 pt-24 pb-24 min-h-screen bg-black text-center">
      {showShot && (
        <ShotOverlay
          type={showShot.type}
          onClose={handleShotDismiss}
          forfeit={forfeits[currentForfeitIndex]}
        />
      )}
      {editingList === "items" && (
        <ListEditor
          title={`${activePlayer}'s Card`}
          items={items}
          onSave={(l) => {
            setItems(l);
            setEditingList(null);
          }}
          onClose={() => setEditingList(null)}
        />
      )}
      {editingList === "forfeits" && (
        <ListEditor
          title="Forfeits"
          items={forfeits}
          onSave={(l) => {
            setForfeits(l);
            setEditingList(null);
          }}
          onClose={() => setEditingList(null)}
        />
      )}
      <div className="flex justify-between items-start mb-4 px-2">
        <div>
          <h2 className="text-4xl font-black text-white italic tracking-tighter drop-shadow-[0_0_10px_rgba(255,0,255,0.8)]">
            BINGO
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setEditingList("forfeits")}
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 font-bold uppercase hover:text-white"
          >
            Edit Forfeits
          </button>
          <button
            onClick={() => setEditingList("items")}
            className="p-2 rounded-lg bg-pink-600/20 border border-pink-500/50 text-pink-500"
          >
            <Pen className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="mb-4 px-2 py-2 bg-zinc-900/50 border border-zinc-800 rounded-lg flex items-center justify-between">
        <span className="text-[10px] text-zinc-500 font-bold uppercase">
          Current Forfeit:
        </span>
        <span className="text-xs font-bold text-yellow-400 uppercase truncate ml-2">
          {forfeits[currentForfeitIndex]}
        </span>
      </div>
      <div className="flex bg-zinc-900 p-1 rounded-xl mb-6 max-w-xs mx-auto border border-zinc-800">
        <button
          onClick={() => setActivePlayer("Martyn")}
          className={`flex-1 py-3 rounded-lg text-sm font-black uppercase transition-all ${
            activePlayer === "Martyn"
              ? "bg-cyan-600 text-white shadow-[0_0_20px_rgba(8,145,178,0.6)]"
              : "text-zinc-500"
          }`}
        >
          Martyn
        </button>
        <button
          onClick={() => setActivePlayer("Sarah")}
          className={`flex-1 py-3 rounded-lg text-sm font-black uppercase transition-all ${
            activePlayer === "Sarah"
              ? "bg-pink-600 text-white shadow-[0_0_20px_rgba(236,72,153,0.6)]"
              : "text-zinc-500"
          }`}
        >
          Sarah
        </button>
      </div>
      <div className="grid grid-cols-5 gap-1.5 max-w-md mx-auto">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => handleTileClick(index)}
            className={`aspect-square p-0.5 rounded-md flex flex-col items-center justify-center relative overflow-hidden transition-all active:scale-95 ${
              checked[index]
                ? activePlayer === "Martyn"
                  ? "bg-cyan-900 border-2 border-cyan-400 text-white shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                  : "bg-pink-900 border-2 border-pink-400 text-white shadow-[0_0_15px_rgba(244,114,182,0.4)]"
                : "bg-zinc-900 border border-zinc-800 text-zinc-500 hover:bg-zinc-800"
            }`}
          >
            <span
              className={`font-bold leading-tight ${
                item.length > 10 ? "text-[8px]" : "text-[9px]"
              }`}
            >
              {item}
            </span>
            {index === 12 && (
              <Star className="w-3 h-3 text-yellow-400 absolute opacity-50" />
            )}
          </button>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <div className="px-6 py-2 bg-zinc-900 rounded-full border border-zinc-800">
          <span className="text-xs font-bold text-zinc-500 uppercase mr-2">
            Total Spots
          </span>
          <span className="text-xl font-black text-white">{score}</span>
        </div>
      </div>
    </div>
  );
};

// --- EDITOR MODAL ---
const EventEditor = ({ event, onSave, onClose, onDelete }) => {
  const initialCategories =
    event?.categories || (event?.category ? [event.category] : ["Activity"]);
  const [formData, setFormData] = useState({
    id: event?.id || Date.now(),
    title: event?.title || "",
    day: event?.day || "Thu 22",
    time: event?.time || "",
    location: event?.location || "",
    categories: initialCategories,
    details: event?.details || "",
    image: event?.image || "",
    status: event?.status || "Plan",
  });
  const availableCategories = [
    "Food",
    "Drinks",
    "Party",
    "Show",
    "Activity",
    "Travel",
    "Stay",
  ];
  const toggleCategory = (cat) => {
    setFormData((prev) => {
      const cats = prev.categories.includes(cat)
        ? prev.categories.filter((c) => c !== cat)
        : [...prev.categories, cat];
      return { ...prev, categories: cats };
    });
  };
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-zinc-900 border border-pink-500/30 w-full max-w-md rounded-3xl p-6 shadow-[0_0_50px_rgba(236,72,153,0.3)] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-black text-white mb-6 flex items-center gap-2 tracking-tighter italic">
          {event ? (
            <Edit2 className="w-5 h-5 text-pink-500" />
          ) : (
            <Plus className="w-5 h-5 text-pink-500" />
          )}
          {event ? "EDIT EVENT" : "ADD EVENT"}
        </h2>
        <div className="space-y-4 h-[60vh] overflow-y-auto pr-2 no-scrollbar">
          <div>
            <label className="text-xs text-pink-400 font-bold uppercase block mb-1 tracking-wider">
              Title
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-black/50 border border-zinc-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-pink-500 outline-none"
              placeholder="Event Name"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-pink-400 font-bold uppercase block mb-1 tracking-wider">
                Day
              </label>
              <select
                name="day"
                value={formData.day}
                onChange={handleChange}
                className="w-full bg-black/50 border border-zinc-800 rounded-lg p-3 text-white outline-none"
              >
                {[
                  "Thu 22",
                  "Fri 23",
                  "Sat 24",
                  "Sun 25",
                  "Mon 26",
                  "Tue 27",
                  "Wed 28",
                  "Thu 29",
                  "Fri 30",
                  "Sat 31",
                  "Sun 01",
                  "Mon 02",
                  "Tue 03",
                ].map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-pink-400 font-bold uppercase block mb-1 tracking-wider">
                Time
              </label>
              <input
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full bg-black/50 border border-zinc-800 rounded-lg p-3 text-white outline-none"
                placeholder="e.g. 19:00"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-pink-400 font-bold uppercase block mb-2 tracking-wider">
              Categories
            </label>
            <div className="flex flex-wrap gap-2">
              {availableCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    formData.categories.includes(cat)
                      ? "bg-pink-600 text-white shadow-[0_0_10px_rgba(236,72,153,0.5)]"
                      : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs text-pink-400 font-bold uppercase block mb-1 tracking-wider">
              Image URL
            </label>
            <input
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full bg-black/50 border border-zinc-800 rounded-lg p-3 text-white outline-none"
              placeholder="https://..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-pink-400 font-bold uppercase block mb-1 tracking-wider">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full bg-black/50 border border-zinc-800 rounded-lg p-3 text-white outline-none"
              >
                <option value="Plan">Plan</option>
                <option value="Booked">Booked</option>
                <option value="Move">Move</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-pink-400 font-bold uppercase block mb-1 tracking-wider">
                Location
              </label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full bg-black/50 border border-zinc-800 rounded-lg p-3 text-white outline-none"
                placeholder="e.g. Bellagio"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-pink-400 font-bold uppercase block mb-1 tracking-wider">
              Details
            </label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              className="w-full bg-black/50 border border-zinc-800 rounded-lg p-3 text-white h-24 outline-none"
              placeholder="Notes..."
            />
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          {event && (
            <button
              onClick={() => onDelete(event.id)}
              className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 border border-red-500/20"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={() => onSave(formData)}
            className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold rounded-xl py-3 hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(236,72,153,0.4)]"
          >
            <Save className="w-4 h-4" /> SAVE EVENT
          </button>
        </div>
      </div>
    </div>
  );
};

// --- DASHBOARD (2x5 GRID) ---
const Dashboard = ({ onChangeTab, onLogout }) => {
  const buttons = [
    {
      label: "Hotels",
      icon: <Hotel className="w-8 h-8 text-cyan-400" />,
      border: "border-cyan-500",
      shadow: "shadow-cyan-500/40",
      action: () => onChangeTab("timeline", "Stay"),
    },
    {
      label: "Itinerary",
      icon: <LayoutGrid className="w-8 h-8 text-purple-400" />,
      border: "border-purple-500",
      shadow: "shadow-purple-500/40",
      action: () => onChangeTab("timeline", "All"),
    },
    {
      label: "Food Bookings",
      icon: <Utensils className="w-8 h-8 text-rose-400" />,
      border: "border-rose-500",
      shadow: "shadow-rose-500/40",
      action: () => onChangeTab("timeline", "Food"),
    },
    {
      label: "Shows",
      icon: <Ticket className="w-8 h-8 text-fuchsia-400" />,
      border: "border-fuchsia-500",
      shadow: "shadow-fuchsia-500/40",
      action: () => onChangeTab("timeline", "Show"),
    },
    {
      label: "Activities",
      icon: <MapPin className="w-8 h-8 text-emerald-400" />,
      border: "border-emerald-500",
      shadow: "shadow-emerald-500/40",
      action: () => onChangeTab("timeline", "Activity"),
    },
    {
      label: "Bingo Card",
      icon: <Trophy className="w-8 h-8 text-yellow-400" />,
      border: "border-yellow-500",
      shadow: "shadow-yellow-500/40",
      action: () => onChangeTab("bingo"),
    },
    {
      label: "Bucket List",
      icon: <Star className="w-8 h-8 text-amber-400" />,
      border: "border-amber-500",
      shadow: "shadow-amber-500/40",
      action: () => onChangeTab("bucketlist"),
    },
    {
      label: "Nearby Deals",
      icon: <Navigation className="w-8 h-8 text-blue-400" />,
      border: "border-blue-500",
      shadow: "shadow-blue-500/40",
      action: () => onChangeTab("nearby"),
    },
    {
      label: "Budget",
      icon: <Wallet className="w-8 h-8 text-zinc-200" />,
      border: "border-zinc-500",
      shadow: "shadow-zinc-500/40",
      action: () => onChangeTab("wallet"),
    },
    {
      label: "Win/Loss Tracker",
      icon: <Dices className="w-8 h-8 text-green-400" />,
      border: "border-green-500",
      shadow: "shadow-green-500/40",
      action: () => onChangeTab("gambling"),
    },
  ];

  return (
    <div className="min-h-screen bg-black p-4 pt-16 animate-in fade-in zoom-in duration-500">
      <div className="mb-8 text-center">
        <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400 mb-1 tracking-tighter drop-shadow-[0_0_25px_rgba(255,255,255,0.5)]">
          VEGAS
        </h1>
        <div className="text-lg font-bold text-pink-500 tracking-[0.6em] uppercase drop-shadow-[0_0_10px_rgba(236,72,153,0.8)] animate-pulse">
          2026
        </div>
      </div>

      <FlightTracker />

      <div className="grid grid-cols-2 gap-4 pb-24 max-w-lg mx-auto">
        {buttons.map((btn, i) => (
          <button
            key={i}
            onClick={btn.action}
            className={`relative overflow-hidden rounded-2xl p-4 border ${btn.border} bg-zinc-900/80 h-28 group transition-all active:scale-95 hover:shadow-[0_0_30px_rgba(0,0,0,0.6)] shadow-xl`}
          >
            <div
              className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity bg-${
                btn.border.split("-")[1]
              }-500`}
            ></div>
            <div
              className={`absolute -bottom-8 -right-8 w-24 h-24 bg-${
                btn.border.split("-")[1]
              }-500/20 rounded-full blur-xl`}
            ></div>

            <div className="relative z-10 h-full flex flex-col items-center justify-center gap-2">
              <div
                className={`p-2 rounded-full bg-black/50 border ${btn.border} ${btn.shadow} shadow-lg`}
              >
                {btn.icon}
              </div>
              <div className="font-black text-white text-xs uppercase tracking-widest">
                {btn.label}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// --- BUCKET LIST (5 COLUMN BINGO STYLE) ---
const BucketList = () => {
  const initialItems = [
    "Oyster Rockefeller",
    "Steak & Lobster",
    "Hush Puppies",
    "Clam Chowder",
    "French Onion Soup",
    "Key Lime Pie",
    "Gumbo",
    "Twinkies",
    "Smores",
    "Spam Musubi",
    "Viral Milkshake",
    "Fleetwood Mac Daddy",
    "Propa Jerky",
    "Lobster Roll",
    "Box of Donuts",
    "Cobbler",
    "Seafood Boil",
    "Frozen Baileys",
    "Giant Bloody Mary",
    "Yardsticks",
    "Whisky Sour",
    "Verbena Cocktail",
    "Moonshine",
    "Tacos",
    "Pizza",
  ];
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("vegasBucketListV3");
    return saved
      ? JSON.parse(saved)
      : initialItems.map((t) => ({ text: t, checked: false }));
  });
  useEffect(
    () => localStorage.setItem("vegasBucketListV3", JSON.stringify(items)),
    [items]
  );

  const toggleItem = (idx) => {
    if (items[idx].checked && !window.confirm("Uncheck this item?")) return;
    const newItems = [...items];
    newItems[idx].checked = !newItems[idx].checked;
    setItems(newItems);
  };

  return (
    <div className="p-2 pt-24 pb-24 min-h-screen text-center bg-black">
      <h2 className="text-3xl font-black text-yellow-400 mb-2 tracking-tighter italic drop-shadow-[0_0_15px_rgba(250,204,21,0.6)]">
        BUCKET LIST
      </h2>
      <p className="text-xs text-zinc-500 uppercase tracking-widest mb-6">
        5x5 Grid Challenge
      </p>

      <div className="grid grid-cols-5 gap-1 max-w-md mx-auto">
        {items.map((item, idx) => (
          <div
            key={idx}
            onClick={() => toggleItem(idx)}
            className={`aspect-square p-1 rounded border flex flex-col items-center justify-center cursor-pointer transition-all relative overflow-hidden ${
              item.checked
                ? "bg-green-500 border-green-400 text-black"
                : "bg-zinc-900 border-zinc-800 text-zinc-500"
            }`}
          >
            <span className="font-bold text-[8px] uppercase leading-tight text-center">
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- GAMBLING & WALLET ---
const GamblingTracker = () => {
  const DAILY_BUDGET = 300;
  const days = [
    "Thu 22",
    "Fri 23",
    "Sat 24",
    "Sun 25",
    "Mon 26",
    "Tue 27",
    "Wed 28",
    "Thu 29",
    "Fri 30",
    "Sat 31",
    "Sun 01",
    "Mon 02",
    "Tue 03",
  ];
  const [logs, setLogs] = useState(() => {
    const saved = localStorage.getItem("vegasGamblingLogsV5");
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedDay, setSelectedDay] = useState(days[0]);
  const [amount, setAmount] = useState("");
  const [isWin, setIsWin] = useState(true);
  useEffect(() => {
    localStorage.setItem("vegasGamblingLogsV5", JSON.stringify(logs));
  }, [logs]);
  const addLog = () => {
    if (!amount) return;
    const val = parseFloat(amount);
    const newLog = {
      id: Date.now(),
      day: selectedDay,
      amount: isWin ? val : -val,
      note: isWin ? "Win" : "Loss",
      timestamp: new Date().toISOString(),
    };
    setLogs([newLog, ...logs]);
    setAmount("");
  };
  const removeLog = (id) => setLogs(logs.filter((l) => l.id !== id));
  const currentDayPnL = logs
    .filter((l) => l.day === selectedDay)
    .reduce((acc, curr) => acc + curr.amount, 0);
  const currentDayBalance = DAILY_BUDGET + currentDayPnL;
  const totalPnL = logs.reduce((acc, curr) => acc + curr.amount, 0);
  return (
    <div className="p-4 pt-24 pb-24 animate-fadeIn min-h-screen bg-zinc-950">
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
          <div className="text-xs text-zinc-500 font-bold uppercase">
            Total P&L
          </div>
          <div
            className={`text-3xl font-black ${
              totalPnL >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {totalPnL >= 0 ? "+" : ""}${totalPnL}
          </div>
        </div>
        <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
          <div className="text-xs text-zinc-500 font-bold uppercase">
            {selectedDay} Budget
          </div>
          <div
            className={`text-3xl font-black ${
              currentDayBalance < 0 ? "text-red-500" : "text-white"
            }`}
          >
            ${currentDayBalance}
          </div>
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
        {days.map((d) => (
          <button
            key={d}
            onClick={() => setSelectedDay(d)}
            className={`flex-shrink-0 px-4 py-2 rounded-lg text-xs font-bold border ${
              selectedDay === d
                ? "bg-purple-600 border-purple-500 text-white shadow-[0_0_15px_rgba(147,51,234,0.5)]"
                : "bg-zinc-900 border-zinc-800 text-zinc-500"
            }`}
          >
            {d}
          </button>
        ))}
      </div>
      <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800 mb-8 shadow-xl">
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setIsWin(true)}
            className={`flex-1 py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all ${
              isWin
                ? "bg-green-500 text-black shadow-[0_0_20px_rgba(34,197,94,0.5)]"
                : "bg-zinc-800 text-zinc-500"
            }`}
          >
            <TrendingUp className="w-4 h-4" /> WIN
          </button>
          <button
            onClick={() => setIsWin(false)}
            className={`flex-1 py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all ${
              !isWin
                ? "bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)]"
                : "bg-zinc-800 text-zinc-500"
            }`}
          >
            <TrendingDown className="w-4 h-4" /> LOSS
          </button>
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 font-bold">
              $
            </span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="w-full bg-zinc-800 text-white font-bold pl-6 pr-3 py-3 rounded-xl focus:outline-none"
            />
          </div>
          <button
            onClick={addLog}
            className="bg-white text-black p-3 rounded-xl font-bold active:scale-95 transition-transform"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="space-y-2">
        {logs
          .filter((l) => l.day === selectedDay)
          .map((log) => (
            <div
              key={log.id}
              className="flex justify-between items-center bg-zinc-900 p-3 rounded-xl border border-zinc-800"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-1 h-8 rounded-full ${
                    log.amount >= 0 ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                <div>
                  <div className="font-bold text-white text-sm">{log.note}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`font-mono font-bold ${
                    log.amount >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {log.amount >= 0 ? "+" : ""}
                  {log.amount}
                </span>
                <button onClick={() => removeLog(log.id)}>
                  <X className="w-4 h-4 text-zinc-600" />
                </button>
              </div>
            </div>
          ))}
      </div>
      <div className="mt-8 space-y-8">
        <div>
          <h3 className="text-xs text-zinc-400 font-bold uppercase tracking-wider mb-3 pl-1 flex items-center gap-2">
            <BarChartIcon className="w-3 h-3" /> Daily P&L
          </h3>
          <div className="h-48 w-full bg-zinc-900/50 rounded-xl border border-zinc-800/50 p-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyData}>
                <ReferenceLine y={0} stroke="#444" />
                <Bar dataKey="pnl" radius={[2, 2, 0, 0]}>
                  {dailyData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.pnl >= 0 ? "#22c55e" : "#ef4444"}
                    />
                  ))}
                </Bar>
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 9, fill: "#555" }}
                  axisLine={false}
                  tickLine={false}
                  interval={0}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const WalletView = () => {
  const defaultExpenses = [
    { id: 1, item: "Absinthe", cost: 86, status: "Paid" },
    { id: 2, item: "Mad Apple", cost: 41, status: "Paid" },
    { id: 3, item: "Wicked Spoon", cost: 41, status: "Paid" },
    { id: 4, item: "Caramella", cost: 55, status: "To Pay" },
    { id: 5, item: "Palms", cost: 79, status: "To Pay" },
    { id: 6, item: "Oscar's Steak", cost: 100, status: "To Pay" },
  ];
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("vegasWalletV5");
    return saved ? JSON.parse(saved) : defaultExpenses;
  });
  const [newItem, setNewItem] = useState("");
  const [newCost, setNewCost] = useState("");
  useEffect(() => {
    localStorage.setItem("vegasWalletV5", JSON.stringify(expenses));
  }, [expenses]);
  const toggleStatus = (id) =>
    setExpenses(
      expenses.map((e) =>
        e.id === id
          ? { ...e, status: e.status === "Paid" ? "To Pay" : "Paid" }
          : e
      )
    );
  const deleteExpense = (id) => {
    if (window.confirm("Delete?"))
      setExpenses(expenses.filter((e) => e.id !== id));
  };
  const addExpense = () => {
    if (!newItem || !newCost) return;
    setExpenses([
      ...expenses,
      {
        id: Date.now(),
        item: newItem,
        cost: parseFloat(newCost),
        currency: "$",
        status: "To Pay",
        category: "Other",
      },
    ]);
    setNewItem("");
    setNewCost("");
  };
  const toPayTotal = expenses
    .filter((e) => e.status === "To Pay")
    .reduce((acc, curr) => acc + curr.cost, 0);
  return (
    <div className="p-4 pt-24 pb-24 animate-fadeIn max-w-md mx-auto">
      <div className="bg-gradient-to-br from-zinc-900 to-black p-6 rounded-3xl border border-zinc-800 mb-8">
        <div className="text-xs text-zinc-400 font-bold uppercase">
          Liability
        </div>
        <div className="text-5xl font-black text-white">${toPayTotal}</div>
      </div>
      <div className="flex gap-2 mb-6">
        <input
          className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 w-full text-sm text-white outline-none"
          placeholder="Expense Name"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <input
          type="number"
          className="bg-zinc-900 border border-zinc-800 rounded-xl pl-4 pr-2 py-3 w-24 text-sm text-white outline-none"
          placeholder="0"
          value={newCost}
          onChange={(e) => setNewCost(e.target.value)}
        />
        <button
          onClick={addExpense}
          className="bg-pink-600 text-white p-3 rounded-xl"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      <div className="space-y-3">
        {expenses.map((exp) => (
          <div
            key={exp.id}
            onClick={() => toggleStatus(exp.id)}
            className="flex justify-between bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800/50 cursor-pointer hover:border-zinc-600 transition-all"
          >
            <div
              className={`font-bold ${
                exp.status === "Paid"
                  ? "text-zinc-500 line-through"
                  : "text-white"
              }`}
            >
              {exp.item}
            </div>
            <div
              className={`font-mono font-bold ${
                exp.status === "To Pay" ? "text-amber-400" : "text-zinc-600"
              }`}
            >
              ${exp.cost}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- MAIN APP ---
const ItineraryApp = () => {
  const [viewState, setViewState] = useState("intro");
  const [filter, setFilter] = useState("All");
  const [expandedId, setExpandedId] = useState(null);
  const [activeDay, setActiveDay] = useState("Thu 22");
  const [viewMode, setViewMode] = useState("cards");
  const [isEditing, setIsEditing] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [activeDayScroll, setActiveDayScroll] = useState("Thu 22");

  const handleEnter = () => {
    setViewState("flyby");
    setTimeout(() => setViewState("dashboard"), 2500);
  };
  const handleTabChange = (tab, categoryFilter = "All") => {
    setFilter(categoryFilter);
    setViewState(tab);
  };

  useEffect(() => {
    if (viewState === "timeline") {
      const handleScroll = () => {
        const dayHeaders = document.querySelectorAll("[data-day-header]");
        let current = "";
        dayHeaders.forEach((header) => {
          if (
            header.getBoundingClientRect().top >= 0 &&
            header.getBoundingClientRect().top <= 300
          )
            current = header.getAttribute("data-day-header");
        });
        if (current && current !== activeDayScroll) setActiveDayScroll(current);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [viewState, activeDayScroll]);

  // Data Setup (With Array Categories) - RESTORED ALL EVENTS
  const initialData = [
    {
      id: 1,
      day: "Thu 22",
      time: "16:00",
      title: "Flight VS155",
      location: "LHR to LAS",
      categories: ["Travel"],
      icon: "plane",
      details: "Booking Ref: FBWYLV. Land 18:50.",
      status: "Booked",
    },
    {
      id: 2,
      day: "Thu 22",
      time: "19:30",
      title: "Check-in: Bellagio",
      location: "Bellagio",
      categories: ["Stay"],
      icon: "hotel",
      details: "Base 1.",
      status: "Booked",
    },
    {
      id: 3,
      day: "Thu 22",
      time: "20:00",
      title: "Get On It",
      location: "Strip",
      categories: ["Party"],
      icon: "martini",
      details: "First night vibes.",
      status: "Plan",
    },
    {
      id: 4,
      day: "Thu 22",
      time: "23:00",
      title: "Birthday @ Peppermill",
      location: "Peppermill",
      categories: ["Food", "Drinks"],
      icon: "utensils",
      details: "Midnight Birthday.",
      status: "Plan",
    },
    {
      id: 5,
      day: "Fri 23",
      time: "12:00",
      title: "Donuts & Lobster",
      location: "Off-Strip",
      categories: ["Activity", "Food"],
      icon: "map-pin",
      details: "St Honoré, Lobster Roll.",
      status: "Plan",
    },
    {
      id: 6,
      day: "Fri 23",
      time: "17:00",
      title: "The Vault",
      location: "Bellagio",
      categories: ["Drinks"],
      icon: "martini",
      details: "Start of crawl.",
      status: "Plan",
    },
    {
      id: 7,
      day: "Fri 23",
      time: "18:30",
      title: "Vanderpump à Paris",
      location: "Paris",
      categories: ["Food", "Drinks"],
      icon: "utensils",
      details: "Starters.",
      status: "Plan",
    },
    {
      id: 8,
      day: "Fri 23",
      time: "20:00",
      title: "Pinky's",
      location: "Flamingo",
      categories: ["Food", "Drinks"],
      icon: "martini",
      details: "Main.",
      status: "Plan",
    },
    {
      id: 9,
      day: "Fri 23",
      time: "21:30",
      title: "Cocktail Garden",
      location: "Caesars",
      categories: ["Drinks"],
      icon: "martini",
      details: "Dessert.",
      status: "Plan",
    },
    {
      id: 10,
      day: "Fri 23",
      time: "23:00",
      title: "Absinthe",
      location: "Caesars",
      categories: ["Show"],
      icon: "ticket",
      details: "#1 Show.",
      status: "Booked",
    },
    {
      id: 11,
      day: "Sat 24",
      time: "12:00",
      title: "AVN Expo",
      location: "Virgin",
      categories: ["Activity"],
      icon: "ticket",
      details: "The Expo.",
      status: "Booked",
    },
    {
      id: 12,
      day: "Sat 24",
      time: "16:30",
      title: "Beer Park",
      location: "Paris",
      categories: ["Drinks"],
      icon: "martini",
      details: "Rooftop beer.",
      status: "Plan",
    },
    {
      id: 13,
      day: "Sat 24",
      time: "19:00",
      title: "Rollin Smoke BBQ",
      location: "Near Strip",
      categories: ["Food"],
      icon: "utensils",
      details: "Authentic BBQ.",
      status: "Plan",
    },
    {
      id: 14,
      day: "Sun 25",
      time: "11:00",
      title: "Move to Circa",
      location: "Downtown",
      categories: ["Stay", "Travel"],
      icon: "hotel",
      details: "Drop bags.",
      status: "Move",
    },
    {
      id: 15,
      day: "Sun 25",
      time: "13:00",
      title: "Downtown Crawl",
      location: "Fremont",
      categories: ["Party"],
      icon: "martini",
      details: "Atomic, Lucky Day.",
      status: "Plan",
    },
    {
      id: 17,
      day: "Mon 26",
      time: "19:00",
      title: "Oscar's Steakhouse",
      location: "Plaza",
      categories: ["Food"],
      icon: "utensils",
      details: "Dinner in dome.",
      status: "Booked",
    },
    {
      id: 18,
      day: "Mon 26",
      time: "21:30",
      title: "Neon Museum",
      location: "North LV",
      categories: ["Activity"],
      icon: "camera",
      details: "Night Boneyard.",
      status: "Booked",
    },
    {
      id: 19,
      day: "Tue 27",
      time: "11:00",
      title: "Move to Cosmo",
      location: "Mid-Strip",
      categories: ["Stay", "Travel"],
      icon: "hotel",
      details: "Check-in Cosmo.",
      status: "Move",
    },
    {
      id: 20,
      day: "Tue 27",
      time: "17:00",
      title: "Beauty & Essex",
      location: "Cosmo",
      categories: ["Food", "Drinks"],
      icon: "utensils",
      details: "Happy Hour.",
      status: "Plan",
    },
    {
      id: 21,
      day: "Wed 28",
      time: "18:00",
      title: "Ski Lodge",
      location: "Cosmo",
      categories: ["Drinks"],
      icon: "martini",
      details: "Pre-show.",
      status: "Plan",
    },
    {
      id: 22,
      day: "Wed 28",
      time: "19:00",
      title: "Superfrico",
      location: "Cosmo",
      categories: ["Show", "Food", "Party"],
      icon: "ticket",
      details: "The Party.",
      status: "Booked",
    },
    {
      id: 23,
      day: "Wed 28",
      time: "21:00",
      title: "Cosmo Crawl",
      location: "Cosmo",
      categories: ["Party"],
      icon: "martini",
      details: "Barbershop, Ghost Donkey.",
      status: "Plan",
    },
    {
      id: 24,
      day: "Thu 29",
      time: "12:00",
      title: "Eggslut",
      location: "Cosmo",
      categories: ["Food"],
      icon: "utensils",
      details: "Breakfast.",
      status: "Plan",
    },
    {
      id: 25,
      day: "Thu 29",
      time: "13:00",
      title: "Shopping",
      location: "Fashion Show",
      categories: ["Activity"],
      icon: "shopping-bag",
      details: "Walmart run.",
      status: "Plan",
    },
    {
      id: 26,
      day: "Thu 29",
      time: "18:30",
      title: "Lobster Night",
      location: "Palms",
      categories: ["Food"],
      icon: "utensils",
      details: "Palms Buffet.",
      status: "Plan",
    },
    {
      id: 27,
      day: "Fri 30",
      time: "11:00",
      title: "Wicked Spoon",
      location: "Cosmo",
      categories: ["Food"],
      icon: "utensils",
      details: "Brunch.",
      status: "Booked",
    },
    {
      id: 28,
      day: "Fri 30",
      time: "13:45",
      title: "The Sphere",
      location: "Sphere",
      categories: ["Show"],
      icon: "ticket",
      details: "Wizard of Oz.",
      status: "Booked",
    },
    {
      id: 29,
      day: "Fri 30",
      time: "16:30",
      title: "Black Tap",
      location: "Venetian",
      categories: ["Food"],
      icon: "utensils",
      details: "Milkshakes.",
      status: "Plan",
    },
    {
      id: 30,
      day: "Sat 31",
      time: "11:00",
      title: "Move to NYNY",
      location: "South Strip",
      categories: ["Stay", "Travel"],
      icon: "hotel",
      details: "Check-in NYNY.",
      status: "Move",
    },
    {
      id: 31,
      day: "Sat 31",
      time: "12:00",
      title: "South Strip Walk",
      location: "Mandalay-MGM",
      categories: ["Activity"],
      icon: "map-pin",
      details: "Slumming it.",
      status: "Plan",
    },
    {
      id: 32,
      day: "Sat 31",
      time: "17:00",
      title: "Rock N Potato",
      location: "NYNY",
      categories: ["Food", "Party"],
      icon: "utensils",
      details: "Dinner/Drinks.",
      status: "Plan",
    },
    {
      id: 33,
      day: "Sat 31",
      time: "21:00",
      title: "Mad Apple",
      location: "NYNY",
      categories: ["Show"],
      icon: "ticket",
      details: "Cirque du Soleil.",
      status: "Booked",
    },
    {
      id: 34,
      day: "Sun 01",
      time: "13:00",
      title: "Caramella",
      location: "Planet Hollywood",
      categories: ["Food"],
      icon: "utensils",
      details: "Brunch.",
      status: "Booked",
    },
    {
      id: 35,
      day: "Mon 02",
      time: "20:00",
      title: "Zombie Burlesque",
      location: "Miracle Mile",
      categories: ["Show"],
      icon: "ticket",
      details: "Show.",
      status: "Booked",
    },
    {
      id: 36,
      day: "Mon 02",
      time: "22:00",
      title: "Nacho Daddy",
      location: "Miracle Mile",
      categories: ["Food"],
      icon: "utensils",
      details: "Late night.",
      status: "Booked",
    },
    {
      id: 37,
      day: "Tue 03",
      time: "13:00",
      title: "Guy Fieri's",
      location: "Horseshoe",
      categories: ["Food"],
      icon: "utensils",
      details: "Farewell Brunch.",
      status: "Booked",
    },
    {
      id: 38,
      day: "Tue 03",
      time: "20:45",
      title: "Flight Home",
      location: "LAS to LHR",
      categories: ["Travel"],
      icon: "plane",
      details: "Flight VS156.",
      status: "Booked",
    },
  ];

  const [itineraryData, setItineraryData] = useState(() => {
    const saved = localStorage.getItem("vegasItineraryDataV9");
    return saved ? JSON.parse(saved) : sortEvents(initialData);
  });
  useEffect(() => {
    localStorage.setItem(
      "vegasItineraryDataV9",
      JSON.stringify(sortEvents(itineraryData))
    );
  }, [itineraryData]);

  const handleSaveEvent = (newEvent) => {
    let updatedData;
    if (itineraryData.find((e) => e.id === newEvent.id))
      updatedData = itineraryData.map((e) =>
        e.id === newEvent.id ? newEvent : e
      );
    else updatedData = [...itineraryData, newEvent];
    setItineraryData(sortEvents(updatedData));
    setIsEditing(false);
    setEditingEvent(null);
  };
  const handleDeleteEvent = (id) => {
    if (window.confirm("Delete?")) {
      setItineraryData(itineraryData.filter((e) => e.id !== id));
      setIsEditing(false);
      setEditingEvent(null);
    }
  };

  const filteredData =
    filter === "All"
      ? itineraryData
      : itineraryData.filter(
          (item) => item.categories && item.categories.includes(filter)
        );
  const groupedData = filteredData.reduce((acc, item) => {
    if (!acc[item.day]) acc[item.day] = { fullDay: item.day, items: [] };
    acc[item.day].items.push(item);
    return acc;
  }, {});

  const getIcon = (iconName) => {
    switch (iconName) {
      case "plane":
        return <Plane className="w-4 h-4" />;
      case "hotel":
        return <Hotel className="w-4 h-4" />;
      case "utensils":
        return <Utensils className="w-4 h-4" />;
      case "martini":
        return <Martini className="w-4 h-4" />;
      case "ticket":
        return <Ticket className="w-4 h-4" />;
      case "map-pin":
        return <MapPin className="w-4 h-4" />;
      case "camera":
        return <Camera className="w-4 h-4" />;
      default:
        return <Ticket className="w-4 h-4" />;
    }
  };

  // --- SUB-VIEWS ---
  const TimelineView = () => (
    <div className="px-4 max-w-md mx-auto pb-24 pt-20">
      <div className="fixed top-16 left-0 right-0 z-30 bg-black/90 backdrop-blur-md border-b border-zinc-800 p-4 flex justify-between items-center">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-pink-500" /> {filter.toUpperCase()}
        </h2>
        <div className="bg-zinc-900 p-1 rounded-lg border border-zinc-800 flex">
          <button
            onClick={() => setViewMode("cards")}
            className={`p-2 rounded-md ${
              viewMode === "cards" ? "bg-zinc-700 text-white" : "text-zinc-500"
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-md ${
              viewMode === "list" ? "bg-zinc-700 text-white" : "text-zinc-500"
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="pt-6">
        {Object.entries(groupedData).map(([day, group]) => (
          <div
            key={day}
            id={`day-${day}`}
            data-day-header={day}
            className="mb-8 scroll-mt-[120px]"
          >
            <div
              className={`flex items-center gap-3 mb-4 sticky top-[130px] z-20 py-2 transition-all duration-300 ${
                activeDayScroll === day ? "scale-105" : "opacity-70"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full shadow-[0_0_10px_currentColor] ${
                  activeDayScroll === day ? "bg-pink-500" : "bg-zinc-600"
                }`}
              ></div>
              <h2
                className={`font-bold text-sm tracking-widest uppercase bg-black/90 backdrop-blur px-3 py-1 rounded-full border ${
                  activeDayScroll === day
                    ? "text-white border-pink-500"
                    : "text-zinc-500 border-transparent"
                }`}
              >
                {group.fullDay}
              </h2>
            </div>
            <div className="space-y-4">
              {group.items.map((item) =>
                viewMode === "cards" ? (
                  <article
                    key={item.id}
                    onClick={() =>
                      setExpandedId(expandedId === item.id ? null : item.id)
                    }
                    className={`group relative bg-zinc-900 rounded-2xl overflow-hidden border transition-all duration-500 cursor-pointer ${
                      expandedId === item.id
                        ? "border-pink-500/50 shadow-[0_0_30px_rgba(236,72,153,0.3)] ring-1 ring-pink-500/30 z-10"
                        : "border-zinc-800 hover:border-zinc-600"
                    }`}
                  >
                    {item.image && (
                      <div
                        className={`relative w-full overflow-hidden transition-all duration-500 ${
                          expandedId === item.id ? "h-48" : "h-32"
                        }`}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>
                      </div>
                    )}
                    <div className="p-4 relative">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg text-white mb-1 leading-tight">
                            {item.title}
                          </h3>
                          <div className="flex items-center text-zinc-400 text-xs gap-3">
                            <span className="font-mono text-pink-400">
                              {item.time || "TBD"}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" /> {item.location}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          {item.categories.slice(0, 1).map((c) => (
                            <Badge key={c} category={c} />
                          ))}
                        </div>
                      </div>
                      {expandedId === item.id && (
                        <div className="mt-4 pt-4 border-t border-zinc-800 text-sm text-zinc-300 animate-fadeIn">
                          <p className="mb-4">{item.details}</p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingEvent(item);
                              setIsEditing(true);
                            }}
                            className="w-full bg-zinc-800 flex text-white p-2.5 rounded-lg hover:bg-zinc-700 items-center justify-center gap-2"
                          >
                            <Edit2 className="w-4 h-4" /> EDIT EVENT
                          </button>
                        </div>
                      )}
                    </div>
                  </article>
                ) : (
                  <div
                    key={item.id}
                    onClick={() =>
                      setExpandedId(expandedId === item.id ? null : item.id)
                    }
                    className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex gap-4 items-start hover:bg-zinc-800 transition-colors cursor-pointer"
                  >
                    <div className="text-xs font-mono text-zinc-500 pt-1 whitespace-nowrap">
                      {item.time}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white text-sm truncate">
                        {item.title}
                      </div>
                      <div className="text-xs text-zinc-400 truncate">
                        {item.location}
                      </div>
                      {expandedId === item.id && (
                        <div className="mt-2 text-xs text-zinc-300 pt-2 border-t border-zinc-700">
                          {item.details}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingEvent(item);
                              setIsEditing(true);
                            }}
                            className="mt-2 w-full bg-zinc-700 py-1 rounded text-[10px] font-bold"
                          >
                            EDIT
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          setEditingEvent(null);
          setIsEditing(true);
        }}
        className="fixed bottom-6 right-6 z-30 w-14 h-14 bg-pink-500 rounded-full shadow-[0_0_20px_rgba(236,72,153,0.6)] flex items-center justify-center text-white hover:scale-110 transition-transform"
      >
        <Plus className="w-8 h-8" />
      </button>
    </div>
  );

  // --- RENDER ---
  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans pb-safe selection:bg-pink-500/30 flex flex-col overflow-hidden">
      {isEditing && (
        <EventEditor
          event={editingEvent}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
          onClose={() => setIsEditing(false)}
        />
      )}

      {viewState === "intro" && (
        <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 opacity-60 bg-cover bg-center animate-[zoomIn_20s_infinite_alternate]"
            style={{
              backgroundImage: `url('https://loremflickr.com/1080/1920/lasvegas,night,neon/all')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black"></div>
          <div className="relative z-10 text-center p-8 w-full max-w-md">
            <h1 className="text-6xl font-black text-white mb-2 tracking-tighter drop-shadow-2xl">
              VEGAS
            </h1>
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mb-8 tracking-widest">
              2026
            </div>
            <Countdown />
            <FlightTracker />
            <button
              onClick={handleEnter}
              className="mt-8 group relative px-10 py-4 bg-white text-black font-bold text-lg rounded-full overflow-hidden hover:scale-105 transition-all shadow-2xl w-full"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                ENTER VEGAS <ChevronRight className="w-5 h-5" />
              </span>
            </button>
          </div>
        </div>
      )}

      {viewState === "flyby" && (
        <div className="fixed inset-0 z-[90] bg-black flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://loremflickr.com/1920/1080/sky,clouds/all')] bg-cover opacity-50 animate-[pulse_3s_infinite]"></div>
          <Plane className="w-32 h-32 text-white animate-[flyRight_2s_ease-in-out_forwards] drop-shadow-2xl" />
          <div className="absolute bottom-20 text-2xl font-black text-white tracking-widest animate-pulse">
            WELCOME TO LAS VEGAS
          </div>
        </div>
      )}

      {/* HEADER & NAV (Visible in all internal states) */}
      {viewState !== "intro" && viewState !== "flyby" && (
        <>
          <header className="fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-xl border-b border-zinc-800 shadow-2xl px-4 py-3 flex justify-between items-center">
            <button
              onClick={() => setViewState("dashboard")}
              className="flex items-center gap-2 group"
            >
              {viewState !== "dashboard" && (
                <Home className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
              )}
              <div className="flex flex-col">
                <span className="text-sm font-black italic tracking-tighter text-white">
                  VEGAS '26
                </span>
                <span className="text-[8px] text-zinc-500 font-bold tracking-wide uppercase">
                  Jan 22-Feb 03
                </span>
              </div>
            </button>
          </header>

          <main className="pt-16 h-full overflow-auto">
            {viewState === "dashboard" && (
              <Dashboard
                onChangeTab={handleTabChange}
                onLogout={() => setViewState("intro")}
              />
            )}
            {viewState === "timeline" && <TimelineView />}
            {viewState === "bingo" && <BingoCard />}
            {viewState === "wallet" && <WalletView />}
            {viewState === "gambling" && <GamblingTracker />}
            {viewState === "bucketlist" && <BucketList />}
            {viewState === "nearby" && <NearbyDeals />}
          </main>
        </>
      )}
    </div>
  );
};

export default ItineraryApp;
