import { useEffect, useState } from "react";
import Controls from "../Controls/index";
import Map from "../Map/index";
import useSWR from "swr";

const URL = "https://api.wheretheiss.at/v1/satellites/25544";

async function fetcher(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export default function ISSTracker() {
  const { data, error, isLoading, mutate } = useSWR(URL, fetcher, {
    refreshInterval: 5000,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  /*
  const [coords, setCoords] = useState({
    longitude: 0,
    latitude: 0,
  });*/

  /*
  async function getISSCoords() {
    try {
      const response = await fetch(URL);
      if (response.ok) {
        const data = await response.json();
        setCoords({ longitude: data.longitude, latitude: data.latitude });
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      getISSCoords();
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);
*/
  return (
    <main>
      <Map longitude={data.longitude} latitude={data.latitude} />
      <Controls
        longitude={data.longitude}
        latitude={data.latitude}
        onRefresh={() => mutate()}
      />
    </main>
  );
}
