function prayer({ name, time }) {
  return (
    <div className="prayer">
      <p className="prayer_name">{name}</p>
      <p className="prayer_time">{time}</p>
    </div>
  );
}

export default prayer;
