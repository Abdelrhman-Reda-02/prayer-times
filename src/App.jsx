import { useEffect, useState } from "react";
import Prayer from "./assets/component/prayer";

function App() {
  const [prayerTimes, setPrayerTimes] = useState({});
  const [dateTime, setDateTime] = useState("");
  const [city, setCity] = useState("cairo");
  const cities = [
    { name: "القاهرة", value: "Cairo" },
    { name: "الجيزة", value: "Giza" },
    { name: "الإسكندرية", value: "Alexandria" },
    { name: "أسوان", value: "Aswan" },
    { name: "المنصورة", value: "Mansoura" },
    { name: "الأقصر", value: "Luxor" },
    { name: "دمياط", value: "damietta" },
    { name: "الشرقية", value: "sharqia" },
  ];
  console.log(city);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch(
          `https://api.aladhan.com/v1/timingsByCity/03-09-2024?city=Eg&country=${city}`
        );
        const dataPrayer = await response.json();
        setPrayerTimes(dataPrayer.data.timings);
        setDateTime(dataPrayer.data.date.gregorian.date);
        console.log(dataPrayer);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPrayerTimes();
  }, [city]);

  function formatTimeTo12Hour(time) {
    if (!time) return ""; // لو الوقت فاضي
    const [hour, minute] = time.split(":");
    let h = parseInt(hour);
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12; // تحويل 0 لـ 12
    return `${h}:${minute} ${ampm}`;
  }

  return (
    <section>
      <div className="container">
        <div className="top-section">
          <div className="city">
            <h3>المدينة</h3>
            <select onChange={(e) => setCity(e.target.value)}>
              {cities.map((city) => (
                <option key={city.value} value={city.value}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
          <div className="date">
            <h3>التاريخ</h3>
            <h4>{dateTime}</h4>
            {/* //تاريخ اليوم */}
            {/* <h4>{new Date().toLocaleDateString("ar-EG")}</h4> */}
          </div>
        </div>
        <Prayer name="الفجر" time={formatTimeTo12Hour(prayerTimes.Fajr)} />
        <Prayer name="الظهر" time={formatTimeTo12Hour(prayerTimes.Dhuhr)} />
        <Prayer name="العصر" time={formatTimeTo12Hour(prayerTimes.Asr)} />
        <Prayer name="المغرب" time={formatTimeTo12Hour(prayerTimes.Maghrib)} />
        <Prayer name="العشاء" time={formatTimeTo12Hour(prayerTimes.Isha)} />
      </div>
    </section>
  );
}

export default App;
