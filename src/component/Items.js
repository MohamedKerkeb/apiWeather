import React from "react";

const Item = ({ c, t, h, co, d, e }) => {
  return (
    <div>
      {c && <p className="weather_key">Ville: {c} </p>}
      {co && <p className="weather_key">Pays: {co} </p>}
      {t && <p className="weather_key">Temperature : {t}</p>}
      {h && <p className="weather_key">Humidite: {h}</p>}
      {d && <p className="weather_key">description: {d}</p>}
      {e && <p className="weather_key">{e}</p>}
    </div>
  );
};

export default Item;
