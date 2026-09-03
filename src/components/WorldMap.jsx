import { useEffect, useMemo, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import { feature } from 'topojson-client';
import wCountries from 'world-countries';
import { Link } from 'react-router-dom';
import { Compass, Clock, MapPin, X, ExternalLink, ChevronRight } from 'lucide-react';
import countriesTopo from 'world-atlas/countries-110m.json';
import { COUNTRY_TO_REGION, REGION_GROUPS, REGULATIONS, COUNTRY_META } from '../data/regions';

const numToAlpha2 = {};
wCountries.forEach(c => {
  if (c.ccn3 && c.cca2) numToAlpha2[String(c.ccn3)] = c.cca2;
});

const REGION_FILL = {
  'Americas': { cap: '#f97316', side: '#c2410c', tile: 'Americas' },
  'EMEA': { cap: '#8b5cf6', side: '#6d28d9', tile: 'EMEA' },
  'Asia': { cap: '#ec4899', side: '#be185d', tile: 'Asia' },
  'Oceania': { cap: '#22c55e', side: '#15803d', tile: 'Oceania' },
};

const SUB_FILL = {
  'North America': '#fb923c', 'South America': '#f97316', 'Latin America & Caribbean': '#fdba74',
  'European Union': '#a78bfa', 'United Kingdom': '#8b5cf6', 'EMEA - Europe': '#c4b5fd', 'Middle East & Africa': '#6d28d9',
  'North Asia': '#f472b6', 'Central Asia': '#f9a8d4', 'East Asia': '#be185d', 'South Asia': '#ec4899', 'South East Asia': '#db2777',
  'Oceania': '#4ade80',
};
function getRegionForCountry(alpha2) {
  return COUNTRY_TO_REGION[alpha2] || 'Other';
}
function getSubForCountry(alpha2) {
  return COUNTRY_TO_REGION[alpha2] || 'Unknown';
}

export default function WorldMap({ height = 560 }) {
  const globeRef = useRef();
  const [activeReg, setActiveReg] = useState(null);
  const [pov, setPov] = useState({ lat: 20, lng: 10, altitude: 2.5 });
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);

  const geo = useMemo(() => {
    try {
      const fc = feature(countriesTopo, countriesTopo.objects.countries);
      return fc.features.map(f => {
        const a2 = numToAlpha2[String(f.id)] || '';
        const region = getRegionForCountry(a2);
        const sub = getSubForCountry(a2);
        const meta = COUNTRY_META[a2] || { flag: '🌐', timezone: '—' };
        return {
          properties: {
            ...f.properties,
            alpha2: a2,
            region,
            sub,
            flag: meta.flag,
            timezone: meta.timezone,
          },
          geometry: f.geometry,
        };
      });
    } catch (e) {
      console.error('globe geojson error', e);
      return [];
    }
  }, []);

  const regMarkers = useMemo(() => REGULATIONS.map(r => {
    const meta = COUNTRY_META[r.countries[0]] || {};
    const c = wCountries.find(c => c.cca2 === r.countries[0]);
    const [lat, lng] = (c && c.latlng) || [r.lat, r.lng];
    return { ...r, lat, lng, flag: meta.flag || r.flag, id: r.id };
  }), []);

  const flagElements = useMemo(() => {
    const el = (d) => {
      const a = document.createElement('a');
      a.href = d.path;
      a.className = 'globe-flag';
      a.title = d.name;
      const span = document.createElement('span');
      span.className = 'waving-flag';
      span.style.background = d.color;
      span.textContent = d.flag;
      const tick = document.createElement('span');
      tick.className = 'tick';
      tick.style.background = d.color;
      a.appendChild(span);
      a.appendChild(tick);
      a.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        setSelected(d);
      });
      return a;
    };
    return regMarkers.map(d => ({ ...d, el: el(d) }));
  }, [regMarkers]);

  const labelData = useMemo(() => REGION_GROUPS.map(g => {
    const subs = g.subCategories;
    let lat = 0, lng = 0;
    const codes = [];
    Object.entries(COUNTRY_TO_REGION).forEach(([a2, sub]) => {
      if (subs.includes(sub) || g.subCategories.includes(sub)) codes.push(a2);
    });
    const countryObjs = wCountries.filter(c => codes.includes(c.cca2));
    if (countryObjs.length) {
      lat = countryObjs.reduce((s, c) => s + c.latlng[0], 0) / countryObjs.length;
      lng = countryObjs.reduce((s, c) => s + c.latlng[1], 0) / countryObjs.length;
    }
    return {
      region: g.region,
      color: g.color,
      timezone: g.tzExample,
      lat, lng, subCategories: g.subCategories,
    };
  }), []);

  useEffect(() => {
    if (globeRef.current && typeof globeRef.current.pointOfView === 'function') {
      globeRef.current.pointOfView({ lat: pov.lat, lng: pov.lng, altitude: pov.altitude }, 400);
    }
    const controls = globeRef.current?.controls?.();
    if (controls) {
      controls.autoRotate = false;
      controls.autoRotateSpeed = 0;
      controls.enableDamping = true;
    }
  }, []);

  const onZoom = ({ lat, lng, altitude }) => setPov({ lat, lng, altitude });

  const onPolygonHover = (p, prev) => {
    if (p !== prev) setHovered(p || null);
  };

  const onPolygonClick = (p) => {
    if (!p || !p.properties || p.properties.region === 'Other') return;
    const reg = p.properties.region;
    const subs = p.properties.sub;
    setActiveReg({ region: reg, sub: subs, flag: p.properties.flag, timezone: p.properties.timezone, country: p.properties.name });
  };

  const regsFor = (region, sub) =>
    REGULATIONS.filter(r => r.region === region || (sub && r.subCategory === sub));

  const flagged = hovered && hovered.properties && hovered.properties.region !== 'Other';

  return (
    <div className="relative w-full rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900" style={{ touchAction: 'none' }}>
      <Globe
        ref={globeRef}
        width="100%"
        height={height}
        backgroundColor="rgba(0,0,0,0)"
        showAtmosphere
        atmosphereColor="#4f46e5"
        atmosphereAltitude={0.18}
        showGraticules
        showGlobe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        polygonsData={geo}
        polygonCapColor={f => SUB_FILL[f.properties.sub] || (REGION_FILL[f.properties.region] && REGION_FILL[f.properties.region].cap) || '#334155'}
        polygonSideColor={f => {
          const c = SUB_FILL[f.properties.sub] || (REGION_FILL[f.properties.region] && REGION_FILL[f.properties.region].side);
          return c || '#1e293b';
        }}
        polygonStrokeColor={f => (hovered && hovered === f) ? '#ffffff' : 'rgba(255,255,255,0.15)'}
        polygonAltitude={f => {
          const region = f.properties.region;
          return f === hovered ? 0.06 : (REGION_FILL[region] ? 0.015 : 0.005);
        }}
        polygonLabel={f => {
          const p = f.properties || {};
          if (p.region === 'Other') return `<div style="padding:8px 12px;background:#0f172a;color:#e2e8f0;border-radius:8px;font-size:13px">${p.name}</div>`;
          return `
            <div style="background:#0f172a;color:#fff;border-radius:10px;padding:10px 14px;min-width:190px;box-shadow:0 8px 24px rgba(0,0,0,.4)">
              <div style="font-weight:700;font-size:15px">${p.flag} ${p.name}</div>
              <div style="color:#a5b4fc;font-size:12px;margin-top:2px">${p.region} · ${p.sub}</div>
              <div style="color:#cbd5e1;font-size:12px;margin-top:4px">🕐 ${p.timezone}</div>
              <div style="color:#34d399;font-size:11px;margin-top:6px">Tap to see regulations</div>
            </div>`;
        }}
        onPolygonHover={onPolygonHover}
        onPolygonClick={onPolygonClick}
        onZoom={onZoom}
        enablePointerInteraction
        labelsData={labelData}
        labelLat="lat"
        labelLng="lng"
        labelText={d => d.region}
        labelSize={1.4}
        labelColor={() => 'rgba(255,255,255,0.9)'}
        labelAltitude={0.03}
        labelResolution={2}
        htmlElementsData={flagElements}
        htmlLat="lat"
        htmlLng="lng"
        htmlElement={d => d.el}
        htmlAltitude={0.02}
      />

      {/* Lat / Lng / Timezone readout */}
      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur rounded-2xl px-4 py-3 text-white text-sm space-y-1.5">
        <div className="flex items-center gap-2 font-semibold text-indigo-200"><Compass className="w-4 h-4" /> View Center</div>
        <div className="grid grid-cols-2 gap-x-4 text-xs">
          <span className="text-gray-400">Latitude</span><span className="font-mono text-emerald-300">{pov.lat.toFixed(2)}°</span>
          <span className="text-gray-400">Longitude</span><span className="font-mono text-emerald-300">{pov.lng.toFixed(2)}°</span>
          <span className="text-gray-400">Altitude</span><span className="font-mono text-emerald-300">{pov.altitude.toFixed(2)}x</span>
        </div>
        {hovered && hovered.properties && hovered.properties.region !== 'Other' && (
          <div className="border-t border-white/10 pt-2 mt-1 flex items-center gap-2 text-xs">
            <MapPin className="w-3.5 h-3.5 text-orange-400" />
            <span>{hovered.properties.flag} {hovered.properties.name}</span>
            <span className="text-indigo-300">{hovered.properties.region}</span>
          </div>
        )}
      </div>

      {/* Region legend */}
      <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur rounded-2xl px-4 py-3 text-white">
        <div className="text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wide">Regions & Time Zones</div>
        <div className="space-y-1.5">
          {REGION_GROUPS.map(g => (
            <div key={g.region} className="flex items-center gap-2 text-xs">
              <span className="w-3 h-3 rounded-full shrink-0" style={{ background: g.color }} />
              <span className="text-gray-100 font-medium">{g.region}</span>
              <span className="text-gray-400 truncate max-w-[180px]">{g.tzExample}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Selected regulation modal */}
      {selected && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4 z-50" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="h-2" style={{ background: selected.color }} />
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-4xl waving-flag inline-block">{selected.flag}</span>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selected.name}</h3>
                    <p className="text-xs text-gray-500">{selected.region} · {selected.subCategory}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-700" onClick={() => setSelected(null)}><X className="w-5 h-5" /></button>
              </div>
              <p className="mt-4 text-sm text-gray-600 leading-relaxed">{selected.blurb}</p>
              <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {selected.timezone}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {selected.lat.toFixed(1)}°, {selected.lng.toFixed(1)}°</span>
              </div>
              <Link to={selected.path}
                onClick={() => setSelected(null)}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 text-white font-semibold px-5 py-3 rounded-xl"
                style={{ background: selected.color }}>
                Open {selected.name} Playbook <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Hover popup panel (bottom-left) with available regs */}
      {activeReg && !selected && (
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur rounded-2xl shadow-xl p-4 max-w-xs w-72 z-40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl waving-flag inline-block">{activeReg.flag || '🌐'}</span>
              <div>
                <div className="font-bold text-gray-900 text-sm">{activeReg.region} <span className="text-gray-400 font-normal">/ {activeReg.sub}</span></div>
                <div className="text-xs text-gray-500">{activeReg.country} · {activeReg.timezone}</div>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-700" onClick={() => setActiveReg(null)}><X className="w-4 h-4" /></button>
          </div>
          <div className="mt-3 space-y-1.5">
            {regsFor(activeReg.region, activeReg.sub).length === 0 && (
              <p className="text-xs text-gray-500">No playbook pinned for this exact sub-region yet.</p>
            )}
            {regsFor(activeReg.region, activeReg.sub).map(r => (
              <Link key={r.id} to={r.path} className="flex items-center gap-2 text-sm font-medium text-white px-3 py-2 rounded-lg hover:opacity-90 transition"
                style={{ background: r.color }}>
                <span>{r.flag}</span> {r.name}
                <ChevronRight className="w-4 h-4 ml-auto" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
