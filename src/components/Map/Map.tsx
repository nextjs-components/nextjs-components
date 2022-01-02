import React, { useState, useCallback, useMemo } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Polygon } from "@react-google-maps/api";
import * as h3 from "h3-js";
import clamp from "lodash/clamp";

import useSWR from "swr";

import { UL, LI } from "components/List";
import Window from "components/Window";
import { LoadingDots } from "components/LoadingDots";
import { Spacer } from "components/Spacer";
import { Note } from "components/Note";
import { Container } from "components/Container";
import { Label } from "components/Label";
import { Button } from "components/Button";
import { TextField } from "components/Input/TextField";
import { PlusIcon, MinusIcon } from "icons";

import { useTheme } from "contexts/ThemeContext";

import { SILVER, DARK } from "./mapstyles";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const CENTER = {
  lng: -73.78036233456201,
  lat: 40.7561876376991,
};

export interface LocationsApiResponse {
  Count: number;
  Items: {
    accuracy: number | null;
    altitude: number | null;
    altitudeAccuracy: number | null;
    date: string;
    h3: string;
    heading: number | null;
    latitude: number;
    longitude: number;
    // prettier-ignore
    resolution: 0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15;
    speed: number | null;
    timestamp: number;
    username: string;
  }[];
  ScannedCount: number;
}

const URL = "https://d3r8oexwb1ojdd.cloudfront.net/api/locations2";
const QS = "?limit=750";
// const API_GW =
//   "https://d273zyz2qk.execute-api.us-east-1.amazonaws.com/prod/api/locations";

function MyComponent({ hideDescription = false }) {
  const [map, setMap] = useState<google.maps.Map>(undefined);
  const { isDarkMode } = useTheme();

  const { data, error } = useSWR<LocationsApiResponse>(
    [URL, map],
    (url: string, map: google.maps.Map) => {
      if (!map) {
        throw 0;
      }
      // fetch data after map is loaded.
      // then set the map bounds to data bounds
      return fetch(`${url}`)
        .then((res) => res.json())
        .then((data) => {
          const { n, e, s, w } = (data as LocationsApiResponse).Items.reduce(
            ({ n, e, s, w }, next) => {
              // const [lng, lat] = next.lnglat;
              const { latitude: lat, longitude: lng } = next;
              if (!lat || !lng) return { n, e, s, w };

              n = Math.max(n ?? lat, lat);
              e = Math.max(e ?? lng, lng);
              s = Math.min(s ?? lat, lat);
              w = Math.min(w ?? lng, lng);

              return { n, e, s, w };
            },
            { n: null, e: null, s: null, w: null }
          );
          // console.log("FITTING BOUNDS", { n, e, s, w });
          map.fitBounds(
            { north: n, east: e, south: s, west: w }
            // { top: -200, bottom: -70, left: 0, right: 0 }
          );
          return data;
        });
    },
    {
      refreshInterval: 0,
      refreshWhenHidden: false,
      refreshWhenOffline: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["visualization"],
    preventGoogleFontsLoading: true,
  });

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    // console.log("map", map);
    // const bounds = new window.google.maps.LatLngBounds();
    // map.fitBounds(bounds);
    // map.setOptions({ zoom: 15 });
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  const title = data ? (
    `${new Date(
      data?.Items.slice(-1)[0].timestamp
    ).toLocaleDateString()} — ${new Date(
      data?.Items[0].timestamp
    ).toLocaleDateString()}`
  ) : (
    <LoadingDots size={4} />
  );

  // https://stackoverflow.com/questions/12875486/what-is-the-algorithm-to-create-colors-for-a-heatmap
  const heatMapColorforValue = useCallback((value) => {
    const h = (1.0 - value) * 240;
    const l = 50;
    return `hsla(${h}, 100%, ${l}%)`;
  }, []);
  const [resolution, setResolution] = useState(7);

  const polygonDataReducer = useCallback(
    (dict, { latitude, longitude }: LocationsApiResponse["Items"][number]) => {
      // const [lng, lat] = lnglat;
      const hash = h3.geoToH3(latitude, longitude, resolution);
      dict[hash] = (dict[hash] ?? 0) + 1;
      return dict;
    },
    [resolution]
  );

  const faulhabersFormula = useCallback((n: number) => (n * (n + 1)) / 2, []);
  const getTotalHexesForResolution = useCallback(
    (n: number) =>
      1 + 6 * faulhabersFormula(clamp(MAX_LEVEL - n, 1, MAX_LEVEL)),
    []
  );
  const generatePolygon = useCallback(
    ([hash, count]) => {
      const bounds = h3.h3ToGeoBoundary(hash);
      const fixed = bounds?.map(([lat, lng]) => ({ lat, lng }));

      const hexCount = getTotalHexesForResolution(resolution);
      const divisor = hexCount * DENSITY;

      return (
        <Polygon
          key={hash}
          path={fixed}
          options={{
            strokeWeight: 0.5,
            strokeOpacity: 0.5,
            fillColor: heatMapColorforValue(clamp(count / divisor, 1)),
            // fillOpacity: clamp(count / divisor, 0.4, 0.75),
            fillOpacity: 0.5,
            geodesic: true,
            zIndex: clamp(count, 100),
          }}
        />
      );
    },
    [resolution, DENSITY]
  );

  /** key optimization! */
  const generatedPolygons = useMemo(
    () =>
      Object.entries(data?.Items.reduce(polygonDataReducer, {}) ?? {}).map(
        generatePolygon
      ),
    [data, polygonDataReducer, generatePolygon]
  );

  return isLoaded ? (
    <>
      <Window title={title}>
        <Container
          style={{
            padding: "var(--geist-gap-half)",
            position: "absolute",
            zIndex: 100,
            bottom: 0,
          }}
        >
          <Label label="Resolution">
            <Container direction={"row"}>
              <TextField
                size="small"
                style={{ width: 70, textAlign: "center" }}
                aria-label="Adjust resolution of hexgonal geospatial data"
                value={resolution}
                disabled
                prefix={
                  <span style={{ padding: 0, marginRight: 0 }}>
                    <Button
                      size="small"
                      style={{
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      }}
                      onClick={() => setResolution((r) => clamp(r - 1, 0, 15))}
                    >
                      <div style={{ display: "flex" }}>
                        <MinusIcon color="currentColor" />
                      </div>
                    </Button>
                  </span>
                }
                suffix={
                  <span style={{ padding: 0, marginLeft: 0 }}>
                    <Button
                      size="small"
                      style={{
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                      }}
                      onClick={() => setResolution((r) => clamp(r + 1, 15))}
                    >
                      <div style={{ display: "flex" }}>
                        <PlusIcon color="currentColor" />
                      </div>
                    </Button>
                  </span>
                }
                prefixStyling={false}
                suffixStyling={false}
                prefixContainer={false}
                suffixContainer={false}
              />
            </Container>
          </Label>
        </Container>

        <GoogleMap
          options={{
            styles: isDarkMode ? DARK : SILVER,
          }}
          {...map}
          mapContainerStyle={containerStyle}
          center={CENTER}
          zoom={12}
          onLoad={onLoad}
        >
          {generatedPolygons}
        </GoogleMap>
      </Window>
      {!hideDescription && (
        <>
          <Spacer />
          <Note label="Description:" variant={"contrast"}>
            <UL>
              <LI>
                GPS Data is published when my iPhone GPS location changes by x
                meters
              </LI>
              <LI>
                GPS data is hashed and indexed with{" "}
                <code className={"code"}>h3</code> and with a default resolution
                of 0 and stored in <code className={"code"}>DynamoDB</code> and
                served via <code className={"code"}>CloudFront</code>
              </LI>
              <LI>
                Data is converted from lat/lng to hexagonal bounds using{" "}
                <code className={"code"}>h3</code>
              </LI>
            </UL>
          </Note>
        </>
      )}
    </>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);

const DENSITY = 1;
const MAX_LEVEL = 12;
