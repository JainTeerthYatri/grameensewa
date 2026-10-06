import React, { useState, useEffect } from 'react';
import { ScreenType, SupportedLanguage } from '../types';
import { LandingIntroSlider } from '../components/LandingIntroSlider';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  useMap,
} from '@vis.gl/react-google-maps';

interface GatewayScreenProps {
  onNavigate: (screen: ScreenType) => void;
  currentLanguage: SupportedLanguage;
  onSelectLanguage?: (lang: SupportedLanguage) => void;
  onShowToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
}

interface LocationInfo {
  village: string;
  block: string;
  district: string;
  state: string;
  pincode: string;
  lat: number;
  lng: number;
  source: 'gps' | 'ip' | 'pincode' | 'search' | 'default';
}

interface HotspotItem {
  id: string;
  titleHi: string;
  titleEn: string;
  category: 'dairy' | 'mandi' | 'bank' | 'service' | 'market';
  lat: number;
  lng: number;
  distance: string;
  demandScore: number;
  descHi: string;
  descEn: string;
  icon: string;
  color: string;
  badge: string;
}

interface BusinessOpportunity {
  id: string;
  titleHi: string;
  titleEn: string;
  descHi: string;
  descEn: string;
  category: string;
  investmentHi: string;
  investmentEn: string;
  minInvestment: number;
  maxInvestment: number;
  demandScore: number;
  profitMargin: string;
  icon: string;
  badge: string;
  recommendedSubsidy: string;
  stepsHi: string[];
  stepsEn: string[];
  equipmentHi: string[];
  equipmentEn: string[];
}

// Controller component to smoothly pan map when coordinates change
const MapController: React.FC<{ targetLat: number; targetLng: number; zoomLevel: number }> = ({
  targetLat,
  targetLng,
  zoomLevel,
}) => {
  const map = useMap();
  useEffect(() => {
    if (map) {
      map.panTo({ lat: targetLat, lng: targetLng });
      map.setZoom(zoomLevel);
    }
  }, [map, targetLat, targetLng, zoomLevel]);

  return null;
};

export const GatewayScreen: React.FC<GatewayScreenProps> = ({
  onNavigate,
  currentLanguage,
  onShowToast,
}) => {
  const isHindi = currentLanguage === 'hi';
  const mapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  // Live Location & Pincode State - defaults to IIMT Greater Noida / Knowledge Park
  const [location, setLocation] = useState<LocationInfo>({
    village: 'IIMT College / Knowledge Park III',
    block: 'Greater Noida',
    district: 'Gautam Buddha Nagar',
    state: 'Uttar Pradesh',
    pincode: '201310',
    lat: 28.4744,
    lng: 77.4915,
    source: 'default',
  });

  const [searchInput, setSearchInput] = useState('201310');
  const [isLocatingGPS, setIsLocatingGPS] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBusiness, setSelectedBusiness] = useState<string>('dairy');
  const [mapTypeId, setMapTypeId] = useState<'roadmap' | 'satellite' | 'hybrid' | 'terrain'>('roadmap');
  const [activeMarkerId, setActiveMarkerId] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(14);

  // Dynamic Hotspots surrounding the detected location
  const getHotspotsForLocation = (lat: number, lng: number): HotspotItem[] => [
    {
      id: 'spot-dairy',
      titleHi: `${location.village} मिल्क चिलिंग व वैल्यू-ऐड हब`,
      titleEn: `${location.village} Bulk Milk Chilling Hub`,
      category: 'dairy',
      lat: lat + 0.0075,
      lng: lng - 0.0062,
      distance: '0.8 km',
      demandScore: 96,
      descHi: 'स्थानीय डेयरी पशुपालक, 8.5 किमी में कोई चिलिंग प्लांट नहीं। PMEGP में 35% सब्सिडी उपलब्ध।',
      descEn: 'Local dairy cluster with high demand for chilling and paneer making. 35% grant under PMEGP.',
      icon: 'local_drink',
      color: '#0284c7', // Sky blue
      badge: isHindi ? 'अत्यधिक मांग 96%' : 'Top Demand 96%',
    },
    {
      id: 'spot-mandi',
      titleHi: 'थोक कृषि अनाज व सरसों मंडी लिंक',
      titleEn: 'Agro Grain & Food Processing Link',
      category: 'mandi',
      lat: lat - 0.0088,
      lng: lng + 0.0095,
      distance: '1.4 km',
      demandScore: 92,
      descHi: 'दैनिक आवक - मिनी आटा चक्की, सरसों तेल एक्सपेलर व फूड प्रोसेसिंग के लिए उत्तम।',
      descEn: 'Agro supply link - optimal for cold press oil expeller and flour mill units.',
      icon: 'agriculture',
      color: '#d97706', // Amber
      badge: isHindi ? 'स्थिर मांग 92%' : 'High Turnover 92%',
    },
    {
      id: 'spot-bank',
      titleHi: 'HDFC & SBI बैंक रूरल ब्रांच (मुद्रा व PMEGP डेस्क)',
      titleEn: 'HDFC & SBI Bank Rural Mudra Desk',
      category: 'bank',
      lat: lat + 0.0042,
      lng: lng + 0.0084,
      distance: '1.1 km',
      demandScore: 99,
      descHi: 'बिना गारंटी 10 लाख तक मुद्रा लोन व PMEGP 35% सब्सिडी का क्लेम नोडल बैंक।',
      descEn: 'Direct sanctioning branch for Mudra 0% collateral loans and PMEGP subsidy.',
      icon: 'account_balance',
      color: '#059669', // Emerald
      badge: isHindi ? 'लोन स्वीकृति केंद्र' : 'Loan Desk',
    },
    {
      id: 'spot-csc',
      titleHi: 'डिजिटल सेवा केंद्र व सोलर कियोस्क',
      titleEn: 'Solar CSC Seva Kiosk & Digital Hub',
      category: 'service',
      lat: lat - 0.0055,
      lng: lng - 0.0048,
      distance: '0.6 km',
      demandScore: 89,
      descHi: 'दैनिक 150+ लोग आते हैं। AEPS कैश निकासी, बिल, फॉर्म व फोटोकॉपी हेतु उत्तम।',
      descEn: '150+ daily footfall. High demand for Aadhaar cash out, bill payments & xerox.',
      icon: 'solar_power',
      color: '#7c3aed', // Purple
      badge: isHindi ? 'डिजिटल सेवा 89%' : 'Digital Hub 89%',
    },
    {
      id: 'spot-market',
      titleHi: 'स्थानीय मुख्य बाजार चौराहा (किराना व बही-खाता)',
      titleEn: 'Main Local Market Crossroad (Retail & Khata)',
      category: 'market',
      lat: lat + 0.0018,
      lng: lng + 0.0035,
      distance: '0.3 km',
      demandScore: 94,
      descHi: 'दैनिक ग्राहक भीड़। स्मार्ट डिजिटल किराना स्टोर व हार्डवेयर टूल रेंटल हेतु आदर्श स्थल।',
      descEn: 'Daily buyers. Ideal hub for modern general store & equipment rental.',
      icon: 'storefront',
      color: '#16a34a', // Green
      badge: isHindi ? 'मुख्य बाजार' : 'Prime Spot',
    },
  ];

  const hotspots = getHotspotsForLocation(location.lat, location.lng);
  const activeSpot = hotspots.find((h) => h.id === activeMarkerId);

  // Indian Pincode Directory Database
  const pincodeDB: Record<
    string,
    { village: string; block: string; district: string; state: string; lat: number; lng: number }
  > = {
    '201310': {
      village: 'IIMT College / Knowledge Park III',
      block: 'Greater Noida',
      district: 'Gautam Buddha Nagar',
      state: 'Uttar Pradesh',
      lat: 28.4744,
      lng: 77.4915,
    },
    '201306': {
      village: 'Greater Noida Alpha / Beta Area',
      block: 'Greater Noida',
      district: 'Gautam Buddha Nagar',
      state: 'Uttar Pradesh',
      lat: 28.4722,
      lng: 77.5036,
    },
    '201308': {
      village: 'Surajpur / Ecotech Area',
      block: 'Dadri',
      district: 'Gautam Buddha Nagar',
      state: 'Uttar Pradesh',
      lat: 28.5323,
      lng: 77.4764,
    },
    '201301': {
      village: 'Sector 15 / Noida Main',
      block: 'Noida',
      district: 'Gautam Buddha Nagar',
      state: 'Uttar Pradesh',
      lat: 28.5833,
      lng: 77.3167,
    },
    '226301': {
      village: 'Mohanlalganj / Rampur',
      block: 'Mohanlalganj',
      district: 'Lucknow',
      state: 'Uttar Pradesh',
      lat: 26.6841,
      lng: 80.9928,
    },
    '302001': {
      village: 'Sanganer Rural Area',
      block: 'Sanganer',
      district: 'Jaipur',
      state: 'Rajasthan',
      lat: 26.9124,
      lng: 75.7873,
    },
    '800001': {
      village: 'Phulwari Sharif Area',
      block: 'Phulwari',
      district: 'Patna',
      state: 'Bihar',
      lat: 25.5941,
      lng: 85.1376,
    },
    '462001': {
      village: 'Berasia Rural Hub',
      block: 'Berasia',
      district: 'Bhopal',
      state: 'Madhya Pradesh',
      lat: 23.2599,
      lng: 77.4126,
    },
    '380001': {
      village: 'Sanand / Dholka Belt',
      block: 'Sanand',
      district: 'Ahmedabad',
      state: 'Gujarat',
      lat: 23.0225,
      lng: 72.5714,
    },
    '560001': {
      village: 'Anekal Rural Cluster',
      block: 'Anekal',
      district: 'Bengaluru Rural',
      state: 'Karnataka',
      lat: 12.9716,
      lng: 77.5946,
    },
    '500001': {
      village: 'Shadnagar / Chevella',
      block: 'Chevella',
      district: 'Ranga Reddy',
      state: 'Telangana',
      lat: 17.385,
      lng: 78.4867,
    },
    '600001': {
      village: 'Sriperumbudur Hub',
      block: 'Sriperumbudur',
      district: 'Kanchipuram',
      state: 'Tamil Nadu',
      lat: 13.0827,
      lng: 80.2707,
    },
    '700001': {
      village: 'Barasat / Rajarhat',
      block: 'Barasat',
      district: 'North 24 Parganas',
      state: 'West Bengal',
      lat: 22.5726,
      lng: 88.3639,
    },
    '141001': {
      village: 'Samrala Rural Mandi',
      block: 'Samrala',
      district: 'Ludhiana',
      state: 'Punjab',
      lat: 30.901,
      lng: 75.8573,
    },
    '110001': {
      village: 'Najafgarh / Alipur Belt',
      block: 'Alipur',
      district: 'North Delhi',
      state: 'Delhi',
      lat: 28.6139,
      lng: 77.209,
    },
  };

  // Reverse Geocoding via Google Maps API or OpenStreetMap
  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      // 1. First try Google Geocoding API if key is available
      const gRes = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${mapsApiKey}`
      );
      if (gRes.ok) {
        const gData = await gRes.json();
        if (gData.results && gData.results.length > 0) {
          const first = gData.results[0];
          const comps = first.address_components || [];

          let villageName = '';
          let sublocality = '';
          let district = '';
          let state = '';
          let postcode = '';

          for (const c of comps) {
            if (c.types.includes('sublocality') || c.types.includes('neighborhood')) {
              sublocality = c.long_name;
            }
            if (c.types.includes('locality') || c.types.includes('administrative_area_level_3')) {
              villageName = c.long_name;
            }
            if (c.types.includes('administrative_area_level_2')) {
              district = c.long_name;
            }
            if (c.types.includes('administrative_area_level_1')) {
              state = c.long_name;
            }
            if (c.types.includes('postal_code')) {
              postcode = c.long_name;
            }
          }

          const resolvedName = sublocality
            ? `${sublocality}, ${villageName || district}`
            : villageName || district || first.formatted_address.split(',')[0];

          return {
            village: resolvedName,
            block: villageName || district || 'Local Area',
            district: district || 'Gautam Buddha Nagar',
            state: state || 'Uttar Pradesh',
            pincode: postcode || 'Detected',
          };
        }
      }
    } catch {
      // ignore
    }

    try {
      // 2. Fallback to BigDataCloud / OSM
      const bdcRes = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
      );
      if (bdcRes.ok) {
        const data = await bdcRes.json();
        return {
          village: data.locality || data.city || data.principalSubdivision || 'Local Area',
          block: data.locality || 'Block Area',
          district: data.city || data.principalSubdivision || 'District',
          state: data.principalSubdivision || 'State',
          pincode: data.postcode || 'Detected',
        };
      }
    } catch {
      // ignore
    }

    return null;
  };

  // Robust Multi-Layer GPS / Geolocation Trigger
  const handleGetLiveGPS = () => {
    setIsLocatingGPS(true);
    onShowToast(
      isHindi
        ? 'लाइव GPS सैटेलाइट व नेटवर्क से लोकेशन खोजी जा रही है...'
        : 'Acquiring live satellite & network coordinates...',
      'info'
    );

    // Layer 1: Browser GPS
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;

          const geo = await reverseGeocode(lat, lng);

          if (geo) {
            setLocation({
              village: geo.village,
              block: geo.block,
              district: geo.district,
              state: geo.state,
              pincode: geo.pincode,
              lat,
              lng,
              source: 'gps',
            });
            if (geo.pincode && geo.pincode !== 'Detected') {
              setSearchInput(geo.pincode);
            }
            setZoomLevel(16);
            setIsLocatingGPS(false);
            onShowToast(
              isHindi
                ? `GPS लोकेशन लॉक: ${geo.village}, ${geo.district} (${geo.state})`
                : `Live GPS mapped: ${geo.village}, ${geo.district}`,
              'success'
            );
          } else {
            setLocation((prev) => ({
              ...prev,
              lat,
              lng,
              village: `GPS Location (${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E)`,
              source: 'gps',
            }));
            setZoomLevel(15);
            setIsLocatingGPS(false);
            onShowToast(
              isHindi
                ? `GPS निर्देशांक सक्रिय: ${lat.toFixed(4)}, ${lng.toFixed(4)}`
                : `GPS coordinates locked: ${lat.toFixed(4)}, ${lng.toFixed(4)}`,
              'success'
            );
          }
        },
        async () => {
          // Layer 2: IP Geolocation Fallback (for iframes / restricted permissions)
          await fallbackIPGeolocation();
        },
        { timeout: 6000, enableHighAccuracy: true, maximumAge: 0 }
      );
    } else {
      fallbackIPGeolocation();
    }
  };

  // IP-based Geolocation fallback
  const fallbackIPGeolocation = async () => {
    try {
      const res = await fetch('https://ipapi.co/json/');
      if (res.ok) {
        const data = await res.json();
        const lat = data.latitude || 28.4744;
        const lng = data.longitude || 77.4915;
        const village = data.city || 'Greater Noida / IIMT Belt';
        const district = data.region || 'Gautam Buddha Nagar';
        const state = data.region || 'Uttar Pradesh';
        const pincode = data.postal || '201310';

        setLocation({
          village,
          block: village,
          district,
          state,
          pincode,
          lat,
          lng,
          source: 'ip',
        });
        setSearchInput(pincode);
        setZoomLevel(14);
        setIsLocatingGPS(false);
        onShowToast(
          isHindi
            ? `नेटवर्क द्वारा लोकेशन पहचानी गई: ${village}, ${district}`
            : `Network location detected: ${village}, ${district}`,
          'success'
        );
        return;
      }
    } catch {
      // ignore
    }

    // Default to IIMT Greater Noida
    setLocation({
      village: 'IIMT College / Knowledge Park III',
      block: 'Greater Noida',
      district: 'Gautam Buddha Nagar',
      state: 'Uttar Pradesh',
      pincode: '201310',
      lat: 28.4744,
      lng: 77.4915,
      source: 'search',
    });
    setSearchInput('201310');
    setZoomLevel(15);
    setIsLocatingGPS(false);
    onShowToast(
      isHindi
        ? 'लोकेशन सेट: IIMT नॉलेज पार्क, ग्रेटर नोएडा (201310)'
        : 'Location mapped: IIMT Knowledge Park, Greater Noida (201310)',
      'info'
    );
  };

  // Universal Search Handler (Accepts Pincode OR Landmark/City name like "IIMT Greater Noida")
  const handleUniversalSearch = async (customQuery?: string) => {
    const query = (customQuery || searchInput).trim();
    if (!query) return;

    // Check if 6-digit pincode in local DB
    if (/^\d{6}$/.test(query) && pincodeDB[query]) {
      const match = pincodeDB[query];
      setLocation({
        ...match,
        pincode: query,
        source: 'pincode',
      });
      setZoomLevel(15);
      onShowToast(
        isHindi
          ? `पिनकोड ${query} मिला: ${match.village}, ${match.district}`
          : `PIN ${query} loaded: ${match.village}, ${match.district}`,
        'success'
      );
      return;
    }

    // Forward Geocode via Google Maps API
    try {
      onShowToast(isHindi ? `मैप पर खोज रहे हैं: "${query}"...` : `Locating "${query}" on Map...`, 'info');
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          query + ', India'
        )}&key=${mapsApiKey}`
      );

      if (res.ok) {
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          const first = data.results[0];
          const lat = first.geometry.location.lat;
          const lng = first.geometry.location.lng;

          const comps = first.address_components || [];
          let village = first.formatted_address.split(',')[0];
          let district = '';
          let state = '';
          let pin = '201310';

          for (const c of comps) {
            if (c.types.includes('locality') || c.types.includes('sublocality')) {
              village = c.long_name;
            }
            if (c.types.includes('administrative_area_level_2')) {
              district = c.long_name;
            }
            if (c.types.includes('administrative_area_level_1')) {
              state = c.long_name;
            }
            if (c.types.includes('postal_code')) {
              pin = c.long_name;
            }
          }

          setLocation({
            village: query.toLowerCase().includes('iimt') ? 'IIMT College / Knowledge Park III' : village,
            block: district || 'Greater Noida',
            district: district || 'Gautam Buddha Nagar',
            state: state || 'Uttar Pradesh',
            pincode: pin,
            lat,
            lng,
            source: 'search',
          });
          setZoomLevel(15);
          onShowToast(
            isHindi
              ? `मैप पर मिला: ${first.formatted_address.slice(0, 45)}...`
              : `Found on map: ${first.formatted_address.slice(0, 45)}...`,
            'success'
          );
          return;
        }
      }
    } catch {
      // ignore
    }

    // If query contains greater noida / iimt
    if (query.toLowerCase().includes('iimt') || query.toLowerCase().includes('greater noida') || query.toLowerCase().includes('noida')) {
      setLocation({
        village: 'IIMT College / Knowledge Park III',
        block: 'Greater Noida',
        district: 'Gautam Buddha Nagar',
        state: 'Uttar Pradesh',
        pincode: '201310',
        lat: 28.4744,
        lng: 77.4915,
        source: 'search',
      });
      setZoomLevel(15);
      onShowToast(
        isHindi
          ? 'लोकेशन मैप पर लॉक की गई: IIMT ग्रेटर नोएडा (201310)'
          : 'Location locked on map: IIMT Greater Noida (201310)',
        'success'
      );
    }
  };

  // Attempt live GPS / IP location on initial mount
  useEffect(() => {
    handleGetLiveGPS();
  }, []);

  // Business Opportunities
  const businessOpportunities: BusinessOpportunity[] = [
    {
      id: 'dairy',
      titleHi: 'मिनी मिल्क चिलिंग व डेयरी वैल्यू-ऐड सेंटर',
      titleEn: 'Mini Milk Chilling & Dairy Value-Add Center',
      descHi: 'गांव के पशुपालकों से सीधा दूध संग्रहण, चिलिंग, पनीर, खोया, दही व घी बनाकर पास के कस्बे में 40% अधिक मुनाफे पर बेचें।',
      descEn: 'Collect raw milk from village cattle owners, chill to 4°C, process into Paneer, Curd, Ghee and supply to local sweet shops with 35-40% profit.',
      category: 'agro',
      investmentHi: '₹2.5 लाख - ₹7.5 लाख',
      investmentEn: '₹2.5 Lakh - ₹7.5 Lakh',
      minInvestment: 250000,
      maxInvestment: 750000,
      demandScore: 96,
      profitMargin: '30% - 42%',
      icon: 'local_drink',
      badge: isHindi ? 'अत्यधिक मांग' : 'Top Demand',
      recommendedSubsidy: 'PMEGP 35% + NABARD AHIDF 3%',
      stepsHi: [
        '1. ग्राम पंचायत में 300-500 वर्ग फीट जगह व 3-फेज बिजली कनेक्शन लें',
        '2. udyamregistration.gov.in पर मुफ्त MSME (उद्यम) सर्टिफिकेट बनाएं',
        '3. FSSAI Basic Food License ऑनलाइन ₹100 में रजिस्टर करें',
        '4. HDFC / SBI बैंक से PMEGP 35% सब्सिडी के साथ 5 लाख का मुद्रा लोन लें',
        '5. 500 लीटर बल्क मिल्क कूलर (BMC), फैट टेस्टर व क्रीम सेपरेटर लगाएं',
      ],
      stepsEn: [
        '1. Arrange 300-500 sq.ft. space in village with electricity connection',
        '2. Register free Udyam MSME Certificate at udyamregistration.gov.in',
        '3. Get FSSAI Basic Food License online (Govt fee ₹100/yr)',
        '4. Apply for ₹5L Mudra/PMEGP Loan at HDFC/SBI for 35% subsidy',
        '5. Install 500L Bulk Milk Cooler (BMC), Fat tester and cream separator',
      ],
      equipmentHi: ['500L बल्क मिल्क कूलर (BMC)', 'इलेक्ट्रॉनिक फैट व डेंसिटी टेस्टर', 'स्टेनलेस स्टील केन व डीप फ्रीजर', 'ऑटोमैटिक पैकिंग सीलर मशीन'],
      equipmentEn: ['500L Bulk Milk Cooler (BMC)', 'Electronic Milk Fat & Density Tester', 'Stainless Steel Cans & Deep Freezer', 'Pouch Sealing Machine'],
    },
    {
      id: 'kirana',
      titleHi: 'स्मार्ट ग्रामीण किराना, जनरल स्टोर व डिजिटल खाता',
      titleEn: 'Smart Rural Kirana & Super Mini Store',
      descHi: 'दैनिक राशन, तेल, साबुन, पशु आहार, स्टेशनरी के साथ ऑनलाइन QR पेमेंट व डिजिटल बही-खाता से ग्राहकों की उधारी नियंत्रित करें।',
      descEn: 'Daily grocery, spices, cattle feed, stationery with digital UPI QR payment and instant Bahi-Khata ledger tracking.',
      category: 'retail',
      investmentHi: '₹1.5 लाख - ₹5 लाख',
      investmentEn: '₹1.5 Lakh - ₹5.0 Lakh',
      minInvestment: 150000,
      maxInvestment: 500000,
      demandScore: 92,
      profitMargin: '18% - 28%',
      icon: 'shopping_bag',
      badge: isHindi ? 'सदाबहार' : 'Evergreen',
      recommendedSubsidy: 'PM Mudra Shishu / Kishor (0% Collateral)',
      stepsHi: [
        '1. गांव के मुख्य चौराहे या पक्की सड़क पर 200 वर्ग फीट दुकान तय करें',
        '2. Udyam Registration (मुफ्त) और स्थानीय ग्राम पंचायत ट्रेड परमिशन लें',
        '3. पास के थोक मंडी डिस्ट्रीब्यूटर से 15-20% मार्जिन पर माल लाएं',
        '4. ICICI या HDFC बैंक से ₹2 लाख का मुद्रा लोन बिना गारंटी प्राप्त करें',
        '5. ग्राममित्र दुकान खाता टूल पर हर ग्राहक की उधारी व नकद का हिसाब रखें',
      ],
      stepsEn: [
        '1. Secure a 200 sq.ft. shop at village central crossroad or main road',
        '2. Complete free Udyam MSME registration and Panchayat trade slip',
        '3. Connect with district wholesale distributors for 15-20% margin stock',
        '4. Get ₹2 Lakh collateral-free Mudra loan from ICICI or HDFC Bank',
        '5. Use GramMitra Bahi-Khata tool to record customer credit & cash',
      ],
      equipmentHi: ['डिस्प्ले रैक व काउंटर', 'डिजिटल वेइंग स्केल (कांटा)', 'QR कोड स्कैनर व बिल प्रिंटर', 'रेफ्रिजरेटर / कोल्ड ड्रिंक कूलर'],
      equipmentEn: ['Display Steel Racks & Counter', 'Certified Digital Weighing Scale', 'UPI Soundbox & Bill Printer', 'Beverage Refrigerator'],
    },
    {
      id: 'solar',
      titleHi: 'सोलर CSC डिजिटल सेवा केंद्र व फोटोकॉपी कियोस्क',
      titleEn: 'Solar CSC Digital Seva & Cyber Kiosk',
      descHi: 'बिजली कटने पर भी सोलर बैकअप के साथ सरकारी फॉर्म, पेंशन, आधार प्रिंट, फोटोकॉपी, बैंकिंग मनी ट्रांसफर व टिकट बुकिंग।',
      descEn: 'Uninterrupted solar-powered digital center for govt forms, Aadhaar print, banking BC cash withdrawal, online bills & xerox.',
      category: 'service',
      investmentHi: '₹80 हजार - ₹2.2 लाख',
      investmentEn: '₹80,000 - ₹2.2 Lakh',
      minInvestment: 80000,
      maxInvestment: 220000,
      demandScore: 89,
      profitMargin: '45% - 65%',
      icon: 'solar_power',
      badge: isHindi ? 'कम लागत' : 'Low Cost',
      recommendedSubsidy: 'PM Vishwakarma / Mudra Shishu',
      stepsHi: [
        '1. csc.gov.in पर VLE आईडी या बैंकिंग कॉरेस्पोंडेंट (BC) एजेंट आईडी बनाएं',
        '2. 1kW से 2kW का सोलर रूफटॉप पैनल व इन्वर्टर बैटरी लगाएं',
        '3. लैपटॉप, ऑल-इन-वन प्रिंटर/स्कैनर और बायोमैट्रिक फिंगरप्रिंट डिवाइस खरीदें',
        '4. गांव के लोगों को आधार कैश निकासी (AEPS), बिल भुगतान व फॉर्म सेवा दें',
        '5. प्रति फॉर्म ₹30 - ₹100 और कैश निकासी पर कमीशन से रोजाना ₹1000+ कमाएं',
      ],
      stepsEn: [
        '1. Apply for CSC VLE ID or Bank BC CSP Agent ID at csc.gov.in',
        '2. Install 1kW-2kW Solar Rooftop system with battery backup',
        '3. Setup Laptop, Heavy-duty Xerox Printer and Biometric Scanner',
        '4. Provide Aadhaar cash withdrawal (AEPS), electricity bills & job forms',
        '5. Earn daily ₹1,000+ through form fees and cash out commissions',
      ],
      equipmentHi: ['1.5kW सोलर रूफटॉप व इन्वर्टर', 'हाई-स्पीड लेजर प्रिंटर व लैमिनेटर', 'लैपटॉप / डेस्कटॉप कंप्यूटर', 'बायोमैट्रिक फिंगरप्रिंट व आइरिस स्कैनर'],
      equipmentEn: ['1.5kW Solar Panels & Hybrid Inverter', 'Heavy Duty Laser All-in-One Printer', 'Laptop / Desktop Core i5', 'Morpho Biometric Fingerprint Scanner'],
    },
    {
      id: 'agro_mill',
      titleHi: 'मिनी आटा चक्की, सरसों तेल एक्सपेलर व मसाला पिसाई',
      titleEn: 'Mini Flour Mill, Mustard Oil & Spice Expeller',
      descHi: 'गांव के किसानों के गेहूं, सरसों व मसालों की पिसाई करके शुद्ध तेल और चोकर बेचें। गांव में साल भर चलने वाला स्थिर बिजनेस।',
      descEn: 'Process farmers wheat, mustard seed and local spices with a compact combined expeller machine and sell fresh pure edible oil.',
      category: 'agro',
      investmentHi: '₹3 लाख - ₹8.5 लाख',
      investmentEn: '₹3.0 Lakh - ₹8.5 Lakh',
      minInvestment: 300000,
      maxInvestment: 850000,
      demandScore: 94,
      profitMargin: '35% - 50%',
      icon: 'agriculture',
      badge: isHindi ? 'उच्च मुनाफा' : 'High Profit',
      recommendedSubsidy: 'PMFME 35% Food Processing Subsidy',
      stepsHi: [
        '1. 400 वर्ग फीट पक्का शेड व 7.5 HP कमर्शियल बिजली कनेक्शन लें',
        '2. PMFME योजना में 35% क्रेडिट-लिंक्ड कैपिटल सब्सिडी के लिए आवेदन करें',
        '3. 6-बोल्ट या 9-बोल्ट कॉम्पैक्ट ऑयल एक्सपेलर व 24-इंच आटा चक्की लगाएं',
        '4. पिसाई शुल्क प्रति किलो लेने के साथ-साथ अपनी ब्रांडेड सरसों तेल बोतलें बेचें',
        '5. तेल की खली (Mustard Cake) डेयरी पशुपालकों को बेचकर अतिरिक्त कमाई करें',
      ],
      stepsEn: [
        '1. Arrange 400 sq.ft. shed with 7.5 HP commercial electrical meter',
        '2. Apply for 35% subsidy under PMFME Food Processing Scheme',
        '3. Install 6-bolt cold press oil expeller and commercial flour pulverizer',
        '4. Charge grinding service fee plus sell packaged bottled pure mustard oil',
        '5. Sell byproduct oil cakes (Khali) to local dairy farmers for extra cash',
      ],
      equipmentHi: ['6-बोल्ट कोल्ड प्रेस ऑयल एक्सपेलर', '24-इंच कमर्शियल आटा चक्की (Stone Pulverizer)', 'मसाला ग्राइंडर व वाइब्रेटिंग छलनी', 'ऑयल फिल्टर प्रेस व स्टोरेज टैंक'],
      equipmentEn: ['6-Bolt Cold Press Oil Expeller', 'Commercial Heavy Flour Pulverizer', 'Spice Grinding Cyclone Machine', 'Oil Filter Press & Food Grade Tanks'],
    },
    {
      id: 'poultry',
      titleHi: 'देसी व ब्रायलर पोल्ट्री फार्म व फीड वितरण',
      titleEn: 'Poultry Farm & Animal Feed Distribution',
      descHi: '1000-2000 पक्षियों के शेड से 40-45 दिनों के चक्र में चिकन और देसी अंडों का उत्पादन। स्थानीय ढाबों व बाजारों में सीधी आपूर्ति।',
      descEn: '1,000 to 2,000 birds cycle poultry shed producing broiler chicken & country eggs with direct wholesale supply to local dhabas.',
      category: 'agro',
      investmentHi: '₹2.5 लाख - ₹6 लाख',
      investmentEn: '₹2.5 Lakh - ₹6.0 Lakh',
      minInvestment: 250000,
      maxInvestment: 600000,
      demandScore: 88,
      profitMargin: '25% - 38%',
      icon: 'egg',
      badge: isHindi ? 'तेज रिटर्न' : 'Fast Cycles',
      recommendedSubsidy: 'NABARD Poultry Venture Capital (25-33%)',
      stepsHi: [
        '1. गांव के किनारे 1200 वर्ग फीट हवादार शेड का निर्माण करें',
        '2. NABARD पोल्ट्री वेंचर योजना में 25% से 33% सब्सिडी के लिए बैंक प्रस्ताव दें',
        '3. प्रमाणित हैचरी से 1-दिन पुराने चूजे (DOC) और ऑटोमैटिक फीडर लगाएं',
        '4. स्थानीय पशु चिकित्सक से टीकाकरण और बायो-सिक्योरिटी प्रोटोकॉल का पालन करें',
        '5. 40 दिन में तैयार माल को स्थानीय पोल्ट्री व्यापारियों को सीधे नकद बेचें',
      ],
      stepsEn: [
        '1. Construct a 1,200 sq.ft. ventilated semi-covered shed on village outskirts',
        '2. Avail 25-33% capital subsidy through NABARD Poultry Venture Scheme',
        '3. Source Day-Old Chicks (DOC) from certified hatchery and auto drinkers',
        '4. Implement vaccination schedule with local veterinary supervisor',
        '5. Sell matured 2kg birds directly to block wholesale traders for cash',
      ],
      equipmentHi: ['ऑटोमैटिक निप्पल ड्रिंकर व फीडर', 'गैस ब्रूडर व टेम्परेचर हीटर', 'फॉगिंग व वेंटिलेशन पंखे', 'इलेक्ट्रॉनिक बर्ड वेइंग मशीन'],
      equipmentEn: ['Automatic Nipple Drinkers & Feeders', 'Infrared Gas Brooders & Thermostat', 'Fogger Cooling & Ventilation Fans', 'Digital Hanging Bird Weighing Scale'],
    },
    {
      id: 'hardware',
      titleHi: 'हार्डवेयर, सेनेटरी, बोरवेल पाइप व कृषि उपकरण किराया',
      titleEn: 'Agro Hardware, Pipes & Tool Rental Hub',
      descHi: 'सीमेंट, सरिया, PVC बोरवेल पाइप, सोलर पंप एक्सेसरीज व रोटावेटर/पावर टिलर को प्रति घंटा किराए पर देकर भारी मुनाफा।',
      descEn: 'Supply construction cement, PVC irrigation pipes, solar pump fittings and rent out power tillers/sprayers on daily hourly rates.',
      category: 'retail',
      investmentHi: '₹3.5 लाख - ₹9 लाख',
      investmentEn: '₹3.5 Lakh - ₹9.0 Lakh',
      minInvestment: 350000,
      maxInvestment: 900000,
      demandScore: 85,
      profitMargin: '22% - 35%',
      icon: 'home_repair_service',
      badge: isHindi ? 'स्थिर व्यापार' : 'High Asset Value',
      recommendedSubsidy: 'PMEGP 25% - 35% Service Subsidy',
      stepsHi: [
        '1. मुख्य मार्ग पर 400 वर्ग फीट दुकान व गोदाम स्पेस सुरक्षित करें',
        '2. Udyam MSME रजिस्ट्रेशन व GST नंबर ऑनलाइन मुफ्त में बनाएं',
        '3. प्रमुख पाइप व सेनेटरी कंपनियों से सब-डीलरशिप प्राप्त करें',
        '4. SBI या Bank of Baroda से 5-7 लाख का PMEGP/Mudra लोन प्राप्त करें',
        '5. 2 पावर टिलर और 4 स्प्रे मशीन किराए पर चलाकर रोजाना ₹1,500 अतिरिक्त कमाएं',
      ],
      stepsEn: [
        '1. Secure a 400 sq.ft. shop with storage space along link road',
        '2. Obtain free Udyam registration and GST number for dealership',
        '3. Secure sub-dealership from regional PVC pipe & sanitary brands',
        '4. Avail ₹5-7 Lakh PMEGP loan from SBI or Bank of Baroda',
        '5. Add 2 power sprayers & mini power tiller for daily rental income',
      ],
      equipmentHi: ['हैवी स्टोरेज रैक व पाइप स्टैंड', 'पावर टिलर व बैटरी स्प्रेयर (किराए हेतु)', 'पाइप थ्रेडिंग व कटिंग मशीन', 'लोडिंग ट्रॉली व वेइंग कांटा'],
      equipmentEn: ['Heavy Duty Steel Storage Pipe Racks', 'Power Tillers & Battery Sprayers (For Rent)', 'PVC Pipe Threading & Cutting Kit', 'Hand Pallet Truck & Digital Scale'],
    },
  ];

  const currentBiz =
    businessOpportunities.find((b) => b.id === selectedBusiness) || businessOpportunities[0];

  const filteredBusinesses =
    selectedCategory === 'all'
      ? businessOpportunities
      : businessOpportunities.filter((b) => b.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-8 pb-24">
      {/* Animated Landing Introduction Slider */}
      <LandingIntroSlider onGetStarted={() => { window.scrollTo({ top: 480, behavior: 'smooth' }); }} />

      {/* Hero Header with Location & Pincode Bar */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-emerald-700/50">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              {isHindi ? '📍 मॉड्यूल 1: बिजनेस सेटअप व रियल Google Maps गाइड' : '📍 Module 1: Business Setup & Live Google Maps Guide'}
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              {isHindi
                ? 'अपने क्षेत्र में नया बिजनेस शुरू करने की रियल मैप गाइड'
                : 'Real Interactive Map Guide to Launch Your Business'}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              {isHindi
                ? 'अपनी लाइव GPS लोकेशन, ग्रेटर नोएडा IIMT कॉलेज या पिनकोड से असली सैटेलाइट और रोड मैप पर देखें कि आपके क्षेत्र में कौन सा व्यवसाय सबसे ज्यादा चलेगा, कौन सा बैंक लोन देगा और कितनी सरकारी सब्सिडी मिलेगी।'
                : 'Explore real live Google Satellite & Street Maps for your GPS, Greater Noida IIMT or PIN to see local demand hotspots, nearby bank branches, and step-by-step setup roadmap.'}
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex flex-row lg:flex-col gap-4 text-center shrink-0">
            <div>
              <div className="text-xs text-emerald-200 font-medium">
                {isHindi ? 'मैप प्रकार' : 'Map Engine'}
              </div>
              <div className="text-xl font-black text-white">Google Maps</div>
            </div>
            <div className="border-l lg:border-l-0 lg:border-t border-white/20 pl-4 lg:pl-0 lg:pt-3">
              <div className="text-xs text-emerald-200 font-medium">
                {isHindi ? 'सब्सिडी सहायता' : 'Max Subsidy'}
              </div>
              <div className="text-xl font-black text-amber-300">Up to 35%</div>
            </div>
          </div>
        </div>

        {/* Live Location / GPS & Search Bar */}
        <div className="mt-6 pt-6 border-t border-white/20 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Detected Location Display */}
          <div className="md:col-span-6 bg-black/20 rounded-2xl p-3.5 border border-white/15 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shrink-0">
                <span className="material-symbols-outlined text-2xl">
                  {location.source === 'gps' ? 'my_location' : 'pin_drop'}
                </span>
              </div>
              <div>
                <div className="text-[11px] text-emerald-200 uppercase font-bold flex items-center gap-1.5">
                  <span>{isHindi ? 'पहचाना गया क्षेत्र' : 'Mapped Area'}:</span>
                  <span className="bg-emerald-500/30 text-emerald-100 px-1.5 py-0.2 rounded text-[10px]">
                    {location.source === 'gps' ? 'Live GPS Sat' : location.source === 'ip' ? 'Network GPS' : 'Live Verified'}
                  </span>
                </div>
                <div className="text-sm font-black text-white truncate max-w-[280px]">
                  {location.village}, {location.district} ({location.state})
                </div>
                <div className="text-[10px] text-emerald-200 font-mono">
                  PIN: {location.pincode} • {location.lat.toFixed(4)}°N, {location.lng.toFixed(4)}°E
                </div>
              </div>
            </div>

            {/* GPS Locate Button */}
            <button
              onClick={handleGetLiveGPS}
              disabled={isLocatingGPS}
              className="px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer shrink-0 disabled:opacity-50"
              title="Detect Live GPS Location"
            >
              <span className={`material-symbols-outlined text-sm ${isLocatingGPS ? 'animate-spin' : ''}`}>
                {isLocatingGPS ? 'refresh' : 'near_me'}
              </span>
              <span className="hidden sm:inline">
                {isLocatingGPS
                  ? isHindi
                    ? 'खोज रहे हैं...'
                    : 'Locating...'
                  : isHindi
                  ? 'लाइव GPS'
                  : 'Live GPS'}
              </span>
            </button>
          </div>

          {/* Search Box with Search Support for Pincode OR Landmark (e.g. IIMT Greater Noida) */}
          <div className="md:col-span-6 bg-black/20 rounded-2xl p-2 border border-white/15 flex items-center gap-2">
            <div className="relative flex-1 flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-white/60 text-lg">search</span>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleUniversalSearch()}
                placeholder={
                  isHindi
                    ? 'पिनकोड या जगह खोजें (उदा: IIMT Greater Noida, 201310)...'
                    : 'Enter PIN or Place (e.g. IIMT Greater Noida, 201310)...'
                }
                className="w-full pl-10 pr-3 py-2 bg-transparent text-white placeholder-white/50 text-xs font-bold focus:outline-none"
              />
            </div>
            <button
              onClick={() => handleUniversalSearch()}
              className="px-4 py-2 rounded-xl bg-white text-emerald-900 font-extrabold text-xs hover:bg-emerald-100 transition-colors cursor-pointer shrink-0 shadow-sm"
            >
              {isHindi ? 'मैप खोजें' : 'Search Map'}
            </button>
          </div>
        </div>

        {/* Quick Location Chips */}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-white/60 text-[11px] font-medium">{isHindi ? 'त्वरित स्थान:' : 'Quick Locations:'}</span>
          <button
            onClick={() => {
              setSearchInput('201310');
              handleUniversalSearch('IIMT Greater Noida Knowledge Park');
            }}
            className="px-2.5 py-1 rounded-lg bg-white/15 hover:bg-white/25 text-white font-bold text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>📍 IIMT / Knowledge Park Greater Noida (201310)</span>
          </button>
          <button
            onClick={() => {
              setSearchInput('201306');
              handleUniversalSearch('Greater Noida Alpha Beta');
            }}
            className="px-2.5 py-1 rounded-lg bg-white/15 hover:bg-white/25 text-white font-bold text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>📍 Greater Noida Main (201306)</span>
          </button>
          <button
            onClick={() => {
              setSearchInput('226301');
              handleUniversalSearch('226301');
            }}
            className="px-2.5 py-1 rounded-lg bg-white/15 hover:bg-white/25 text-white font-bold text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>📍 Mohanlalganj Lucknow (226301)</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: Real Interactive Google Map with Tiles & Hotspot Markers */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-1">
              <span className="material-symbols-outlined text-sm">map</span>
              {isHindi ? 'रियल टाइम इंटरएक्टिव Google Maps' : 'Real-Time Interactive Google Map'}
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900">
              {location.village} {isHindi ? 'लाइव मैप व बिजनेस क्लस्टर' : 'Live Business & Opportunity Map'}
            </h2>
            <p className="text-xs text-stone-500">
              {isHindi
                ? 'नक्शे पर असली सैटेलाइट/रोड व्यू देखें और किसी भी मार्कर पर क्लिक करके मांग व नजदीकी बैंक विवरण देखें।'
                : 'Pan, zoom & switch between Satellite and Road View. Click any hotspot marker to view real demand metrics.'}
            </p>
          </div>

          {/* Map View Mode Switcher (Roadmap vs Satellite vs Hybrid) */}
          <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl text-xs font-bold text-stone-700">
            <span className="text-[11px] px-2 text-stone-500">{isHindi ? 'व्यू:' : 'View:'}</span>
            {[
              { id: 'roadmap', labelHi: 'रोड मैप', labelEn: 'Map' },
              { id: 'satellite', labelHi: 'सैटेलाइट', labelEn: 'Satellite' },
              { id: 'hybrid', labelHi: 'हाइब्रिड', labelEn: 'Hybrid' },
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => setMapTypeId(mode.id as any)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  mapTypeId === mode.id
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'hover:bg-stone-200 text-stone-700'
                }`}
              >
                {isHindi ? mode.labelHi : mode.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Real Google Map Canvas & Insight Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Real Google Map Container (7 Cols) */}
          <div className="lg:col-span-7 bg-stone-100 rounded-2xl overflow-hidden border border-stone-300 shadow-md relative min-h-[460px] h-[460px]">
            <APIProvider apiKey={mapsApiKey}>
              <Map
                mapId="DEMO_MAP_ID"
                style={{ width: '100%', height: '100%' }}
                defaultCenter={{ lat: location.lat, lng: location.lng }}
                defaultZoom={zoomLevel}
                mapTypeId={mapTypeId}
                gestureHandling="greedy"
                fullscreenControl={true}
                streetViewControl={true}
                zoomControl={true}
                mapTypeControl={false}
                internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
              >
                <MapController targetLat={location.lat} targetLng={location.lng} zoomLevel={zoomLevel} />

                {/* User's Center Location Pin */}
                <AdvancedMarker
                  position={{ lat: location.lat, lng: location.lng }}
                  title={location.village}
                  onClick={() => setActiveMarkerId('user-center')}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-black flex items-center justify-center shadow-2xl ring-4 ring-white border-2 border-emerald-900 animate-bounce">
                      <span className="material-symbols-outlined text-xl">person_pin_circle</span>
                    </div>
                    <div className="mt-1 px-2 py-0.5 rounded-md bg-stone-900 text-white text-[10px] font-bold shadow-md whitespace-nowrap">
                      {location.village}
                    </div>
                  </div>
                </AdvancedMarker>

                {/* Hotspot Markers */}
                {hotspots.map((spot) => (
                  <AdvancedMarker
                    key={spot.id}
                    position={{ lat: spot.lat, lng: spot.lng }}
                    title={spot.titleEn}
                    onClick={() => setActiveMarkerId(spot.id)}
                  >
                    <div className="flex flex-col items-center cursor-pointer group">
                      <div
                        style={{ backgroundColor: spot.color }}
                        className="w-8 h-8 rounded-full text-white font-black flex items-center justify-center shadow-lg ring-2 ring-white group-hover:scale-125 transition-transform"
                      >
                        <span className="material-symbols-outlined text-sm">{spot.icon}</span>
                      </div>
                      <div className="mt-0.5 px-1.5 py-0.2 rounded bg-stone-900/90 text-white text-[9px] font-bold whitespace-nowrap hidden group-hover:block shadow">
                        {isHindi ? spot.titleHi.slice(0, 18) + '...' : spot.titleEn.slice(0, 18) + '...'}
                      </div>
                    </div>
                  </AdvancedMarker>
                ))}

                {/* InfoWindow Popup on Marker Click */}
                {activeSpot && (
                  <InfoWindow
                    position={{ lat: activeSpot.lat, lng: activeSpot.lng }}
                    onCloseClick={() => setActiveMarkerId(null)}
                  >
                    <div className="p-2 max-w-[220px] text-stone-900 space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-900 uppercase">
                          {activeSpot.badge}
                        </span>
                        <span className="text-[10px] font-bold text-stone-500">{activeSpot.distance}</span>
                      </div>
                      <div className="font-extrabold text-xs text-stone-900 leading-tight">
                        {isHindi ? activeSpot.titleHi : activeSpot.titleEn}
                      </div>
                      <p className="text-[11px] text-stone-600 leading-snug">
                        {isHindi ? activeSpot.descHi : activeSpot.descEn}
                      </p>
                    </div>
                  </InfoWindow>
                )}
              </Map>
            </APIProvider>

            {/* Map Overlay Quick Legend */}
            <div className="absolute bottom-3 left-3 bg-stone-950/85 backdrop-blur-md rounded-xl p-2.5 border border-white/15 text-[10px] text-white space-y-1 z-10 shadow-lg pointer-events-auto">
              <div className="font-bold text-emerald-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">pin_drop</span>
                <span>{isHindi ? 'मैप मार्कर (क्लिक करें):' : 'Map Hotspots:'}</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                  <span>{isHindi ? 'डेयरी चिलर' : 'Dairy'}</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span>{isHindi ? 'अनाज मंडी' : 'Mandi'}</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>{isHindi ? 'बैंक शाखा' : 'Bank'}</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                  <span>{isHindi ? 'CSC सेंटर' : 'CSC Seva'}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Hotspot Detailed Insight Card (5 Cols) */}
          <div className="lg:col-span-5 bg-stone-50 rounded-2xl p-5 border border-stone-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                <span className="material-symbols-outlined text-emerald-700 text-base">insights</span>
                {isHindi ? 'रियल टाइम लोकल अवसर रिपोर्ट' : 'Live Local Opportunity Report'}
              </div>
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                PIN {location.pincode}
              </span>
            </div>

            {/* List of hotspots clickable to pan map */}
            <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
              {hotspots.map((spot) => (
                <div
                  key={spot.id}
                  onClick={() => {
                    setActiveMarkerId(spot.id);
                    setLocation((prev) => ({ ...prev, lat: spot.lat, lng: spot.lng }));
                    setZoomLevel(16);
                  }}
                  className={`p-3 rounded-xl border transition-all cursor-pointer text-xs space-y-1 ${
                    activeMarkerId === spot.id
                      ? 'bg-emerald-50 border-emerald-600 shadow-xs'
                      : 'bg-white border-stone-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900 flex items-center gap-1.5">
                      <span
                        style={{ color: spot.color }}
                        className="material-symbols-outlined text-sm"
                      >
                        {spot.icon}
                      </span>
                      <span className="truncate max-w-[190px]">
                        {isHindi ? spot.titleHi : spot.titleEn}
                      </span>
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-stone-100 text-stone-600">
                      {spot.distance}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-600 leading-snug">
                    {isHindi ? spot.descHi : spot.descEn}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick Button to Calculator */}
            <button
              onClick={() => onNavigate('calculator')}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <span>
                {isHindi ? '2. लोन व 35% सब्सिडी चेक करें' : '2. Check Loan & 35% Subsidy for This Area'}
              </span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 2: Step-by-Step Business Setup Guide & Checklist */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-1">
            <span className="material-symbols-outlined text-sm">checklist</span>
            {isHindi ? 'स्टेप-बाय-स्टेप बिजनेस सेटअप गाइड' : 'Step-by-Step Business Setup Guide'}
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900">
            {isHindi ? '1. अपने क्षेत्र के लिए व्यवसाय चुनें' : '1. Select Your Business Model'}
          </h2>
          <p className="text-xs text-stone-500">
            {isHindi
              ? 'नीचे दिए गए किसी भी व्यवसाय पर क्लिक करें और उसकी पूरी सेटअप गाइड, मशीनरी सूची और आवश्यक कागजी प्रक्रिया देखें।'
              : 'Select any business below to see its exact setup roadmap, equipment requirement, and legal checklist.'}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 pb-2">
          {[
            { id: 'all', labelHi: 'सभी व्यवसाय (6)', labelEn: 'All Businesses (6)' },
            { id: 'agro', labelHi: 'कृषि व डेयरी (3)', labelEn: 'Agro & Dairy (3)' },
            { id: 'retail', labelHi: 'दुकान व रिटेल (2)', labelEn: 'Retail & Store (2)' },
            { id: 'service', labelHi: 'डिजिटल व सर्विस (1)', labelEn: 'Service & Solar (1)' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {isHindi ? cat.labelHi : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Business Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBusinesses.map((biz) => {
            const isSelected = selectedBusiness === biz.id;
            return (
              <div
                key={biz.id}
                onClick={() => setSelectedBusiness(biz.id)}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                  isSelected
                    ? 'bg-emerald-50/70 border-emerald-700 shadow-md ring-2 ring-emerald-600/30'
                    : 'bg-white border-stone-200 hover:border-emerald-300 hover:bg-stone-50'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isSelected ? 'bg-emerald-800 text-white' : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      <span className="material-symbols-outlined text-2xl">{biz.icon}</span>
                    </div>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
                      {biz.badge}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-stone-900 text-base leading-snug">
                    {isHindi ? biz.titleHi : biz.titleEn}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-2">
                    {isHindi ? biz.descHi : biz.descEn}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-200/80 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-stone-500">{isHindi ? 'अनुमानित लागत:' : 'Est. Investment:'}</span>
                    <span className="font-extrabold text-stone-900">
                      {isHindi ? biz.investmentHi : biz.investmentEn}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-stone-500">{isHindi ? 'मांग स्कोर:' : 'Demand Score:'}</span>
                    <span className="font-black text-emerald-700">{biz.demandScore}% High</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-stone-500">{isHindi ? 'मुनाफा मार्जिन:' : 'Profit Margin:'}</span>
                    <span className="font-bold text-emerald-800">{biz.profitMargin}</span>
                  </div>

                  <div className="pt-1">
                    <span
                      className={`w-full py-1.5 px-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 ${
                        isSelected ? 'bg-emerald-800 text-white' : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      <span>
                        {isSelected
                          ? isHindi
                            ? 'चयनित (नीचे गाइड देखें)'
                            : 'Selected (See Guide Below)'
                          : isHindi
                          ? 'गाइड व मशीनरी देखें'
                          : 'View Setup Plan'}
                      </span>
                      <span className="material-symbols-outlined text-xs">
                        {isSelected ? 'check_circle' : 'arrow_forward'}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Business In-Depth Roadmap & Equipment Checklist */}
        <div className="mt-8 pt-8 border-t border-stone-200 bg-stone-50 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-stone-200">
            <div>
              <div className="text-xs text-emerald-800 font-bold uppercase tracking-wider">
                {isHindi ? 'विस्तृत बिजनेस प्लान:' : 'Selected Blueprint:'}
              </div>
              <h3 className="text-2xl font-black text-stone-900 flex items-center gap-2 mt-0.5">
                <span className="material-symbols-outlined text-emerald-700">{currentBiz.icon}</span>
                {isHindi ? currentBiz.titleHi : currentBiz.titleEn}
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300">
                {isHindi ? 'अनुशंसित सब्सिडी:' : 'Govt Subsidy:'} {currentBiz.recommendedSubsidy}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Step-by-Step Setup Steps (6 Cols) */}
            <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-stone-200 space-y-3">
              <div className="font-extrabold text-stone-900 text-sm flex items-center gap-2 text-emerald-900">
                <span className="material-symbols-outlined text-base">format_list_numbered</span>
                {isHindi ? '5-स्टेप्स में बिजनेस शुरू करने का तरीका' : '5 Step Execution Roadmap'}
              </div>
              <div className="space-y-2.5">
                {(isHindi ? currentBiz.stepsHi : currentBiz.stepsEn).map((step, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-stone-50 rounded-xl text-xs font-medium text-stone-800 flex items-start gap-2.5 border border-stone-100"
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-800 text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step.replace(/^\d+\.\s*/, '')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Machinery & Legal Checklist (6 Cols) */}
            <div className="lg:col-span-6 space-y-4">
              {/* Equipment Box */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-3">
                <div className="font-extrabold text-stone-900 text-sm flex items-center gap-2 text-stone-800">
                  <span className="material-symbols-outlined text-base text-amber-600">
                    precision_manufacturing
                  </span>
                  {isHindi ? 'आवश्यक मशीनरी व उपकरण' : 'Required Machinery & Equipment'}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(isHindi ? currentBiz.equipmentHi : currentBiz.equipmentEn).map((eq, idx) => (
                    <div
                      key={idx}
                      className="p-2 bg-emerald-50/50 rounded-lg text-xs text-stone-800 flex items-center gap-2 border border-emerald-100"
                    >
                      <span className="material-symbols-outlined text-emerald-700 text-sm shrink-0">
                        check_box
                      </span>
                      <span className="truncate">{eq}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Free Legal Registration Box */}
              <div className="bg-emerald-900 text-white p-5 rounded-2xl space-y-2.5 shadow-sm">
                <div className="font-extrabold text-sm flex items-center gap-2 text-emerald-200">
                  <span className="material-symbols-outlined text-base">verified</span>
                  {isHindi ? 'मुफ्त सरकारी रजिस्ट्रेशन गाइड (100% Free)' : 'Free Online Govt Registrations'}
                </div>
                <p className="text-xs text-emerald-100 leading-relaxed">
                  {isHindi
                    ? 'किसी दलाल को पैसे न दें! उद्यम रजिस्ट्रेशन (udyamregistration.gov.in) बिल्कुल मुफ्त है। FSSAI फूड लाइसेंस मात्र ₹100 सरकारी फीस में बनता है।'
                    : 'Do not pay any agent. Udyam MSME registration is 100% free online. Basic FSSAI is only ₹100 govt fee.'}
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
                  <span className="bg-white/10 px-2.5 py-1 rounded-lg">✅ Udyam MSME (Free)</span>
                  <span className="bg-white/10 px-2.5 py-1 rounded-lg">✅ FSSAI (₹100/yr)</span>
                  <span className="bg-white/10 px-2.5 py-1 rounded-lg">✅ Gram Panchayat Trade NOC</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Bridges to Tabs 2 and 3 */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-200">
            <div className="text-xs text-stone-600">
              {isHindi ? 'तैयार हैं? अगला कदम उठाएं:' : 'Ready to start? Take the next step:'}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('calculator')}
                className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">account_balance</span>
                <span>{isHindi ? '2. लोन व 35% सब्सिडी चेक करें' : '2. Check Loan & Subsidies'}</span>
              </button>

              <button
                onClick={() => onNavigate('khata')}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">menu_book</span>
                <span>{isHindi ? '3. दुकान बही-खाता खोलें' : '3. Open Shop Bahi-Khata'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
