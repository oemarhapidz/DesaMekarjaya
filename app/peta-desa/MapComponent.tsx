"use client";

import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import feather from "feather-icons";
import { MapPin } from "react-feather";
import "leaflet/dist/leaflet.css";
import { PetaLokasiData, jenisConfig, JenisLokasiIcon } from "./mockData";

// Fix untuk Leaflet default marker icon yang tidak berfungsi di Next.js/webpack
// karena leaflet tidak bisa resolve path icon default secara otomatis
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const featherIconNames: Record<JenisLokasiIcon, string> = {
  trash: "trash-2",
  refresh: "refresh-cw",
  truck: "truck",
  home: "archive",
};

function featherSvg(icon: JenisLokasiIcon, options: { size: number; color?: string }) {
  return feather.icons[featherIconNames[icon]].toSvg({
    width: options.size,
    height: options.size,
    color: options.color || "currentColor",
    "stroke-width": 2.5,
    "aria-hidden": "true",
  });
}

// Fungsi helper untuk membuat custom SVG icon per jenis lokasi
function buatSvgIcon(jenis: keyof typeof jenisConfig): L.DivIcon {
  const cfg = jenisConfig[jenis];
  const markerIcon = featherSvg(cfg.icon, { size: 16, color: "white" });
  const svgHtml = `
    <div style="
      width: 36px;
      height: 36px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      background-color: ${cfg.color};
      border: 3px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.4);
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <span style="
        transform: rotate(45deg);
        font-size: 16px;
        display: block;
        line-height: 1;
        margin-top: 2px;
      ">${markerIcon}</span>
    </div>`;
  return L.divIcon({
    html: svgHtml,
    className: "",
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -38],
  });
}

// Sub-komponen untuk mereset view ke koordinat default
function ResetViewButton({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  return (
    <button
      onClick={() => map.setView(center, zoom)}
      title="Reset ke tampilan awal"
      style={{
        position: "absolute",
        bottom: "20px",
        right: "10px",
        zIndex: 1000,
        background: "white",
        border: "2px solid rgba(0,0,0,0.2)",
        borderRadius: "8px",
        padding: "6px 10px",
        cursor: "pointer",
        fontSize: "12px",
        fontWeight: "bold",
        color: "#374151",
        boxShadow: "0 1px 5px rgba(0,0,0,0.2)",
      }}
    >
      <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
        <MapPin size={13} aria-hidden="true" />
        Reset Peta
      </span>
    </button>
  );
}

interface MapComponentProps {
  lokasi: PetaLokasiData[];
}

// Koordinat pusat Desa Mekarjaya, Kec. Purwasari, Kab. Karawang
const DEFAULT_CENTER: [number, number] = [-6.3941, 107.3944];
const DEFAULT_ZOOM = 14;

export default function MapComponent({ lokasi }: MapComponentProps) {
  // Pastikan Leaflet CSS sudah termuat di client
  useEffect(() => {
    // Leaflet CSS sudah di-import secara statis di atas
  }, []);

  return (
    <MapContainer
      center={DEFAULT_CENTER}
      zoom={DEFAULT_ZOOM}
      style={{ height: "100%", width: "100%" }}
      className="rounded-xl"
      zoomControl={true}
    >
      {/* Layer peta dari OpenStreetMap (gratis, tidak butuh API key) */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Render setiap marker lokasi yang tersaring oleh filter */}
      {lokasi.map((item) => (
        <Marker
          key={item.id}
          position={[item.latitude, item.longitude]}
          icon={buatSvgIcon(item.jenis)}
        >
          <Popup maxWidth={280} className="peta-popup">
            <div style={{ fontFamily: "system-ui, sans-serif", minWidth: "220px" }}>
              {/* Foto lokasi jika ada */}
              {item.foto_url && (
                <div style={{ marginBottom: "10px", borderRadius: "8px", overflow: "hidden", height: "120px" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.foto_url}
                    alt={item.nama}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              )}

              {/* Badge jenis lokasi */}
              <div style={{ marginBottom: "6px" }}>
                <span style={{
                  display: "inline-block",
                  fontSize: "10px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  padding: "2px 8px",
                  borderRadius: "9999px",
                  backgroundColor: jenisConfig[item.jenis].bgColor,
                  color: jenisConfig[item.jenis].textColor,
                  border: `1px solid ${jenisConfig[item.jenis].borderColor}`,
                  letterSpacing: "0.05em",
                }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: featherSvg(jenisConfig[item.jenis].icon, {
                          size: 11,
                          color: jenisConfig[item.jenis].textColor,
                        }),
                      }}
                    />
                    {jenisConfig[item.jenis].label}
                  </span>
                </span>
              </div>

              {/* Nama lokasi */}
              <h3 style={{
                margin: "0 0 6px 0",
                fontSize: "14px",
                fontWeight: "800",
                color: "#111827",
                lineHeight: "1.3",
              }}>
                {item.nama}
              </h3>

              {/* Deskripsi */}
              {item.deskripsi && (
                <p style={{
                  margin: "0 0 10px 0",
                  fontSize: "12px",
                  color: "#6b7280",
                  lineHeight: "1.5",
                }}>
                  {item.deskripsi}
                </p>
              )}

              {/* Koordinat & Tombol Google Maps */}
              <div style={{
                padding: "8px",
                backgroundColor: "#f9fafb",
                borderRadius: "8px",
                border: "1px solid #f3f4f6",
              }}>
                <div style={{ fontSize: "10px", color: "#9ca3af", marginBottom: "6px" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    <MapPin size={11} aria-hidden="true" />
                    {item.latitude.toFixed(5)}, {item.longitude.toFixed(5)}
                  </span>
                </div>
                <a
                  href={`https://www.google.com/maps?q=${item.latitude},${item.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block",
                    textAlign: "center",
                    fontSize: "11px",
                    fontWeight: "bold",
                    padding: "5px 10px",
                    backgroundColor: jenisConfig[item.jenis].color,
                    color: "white",
                    borderRadius: "6px",
                    textDecoration: "none",
                  }}
                >
                  Buka di Google Maps →
                </a>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}

      <ResetViewButton center={DEFAULT_CENTER} zoom={DEFAULT_ZOOM} />
    </MapContainer>
  );
}
