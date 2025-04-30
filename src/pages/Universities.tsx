import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Search, SlidersHorizontal } from 'lucide-react';
import type { University } from '../types';
import { supabase } from '../lib/supabase';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Mock data for fallback
const mockUniversities = [
  {
    id: '1',
    name: 'University of Texas at Austin',
    location_state: 'Texas',
    location_lat: 30.2849,
    location_lng: -97.7341,
    ranking: 10,
    acceptance_rate: 32.0,
    tuition_min: 38000,
    tuition_max: 48000,
    description: 'The University of Texas at Austin is a public research university and the flagship institution of the University of Texas System.'
  },
  {
    id: '2',
    name: 'Texas A&M University',
    location_state: 'Texas',
    location_lat: 30.6188,
    location_lng: -96.3365,
    ranking: 25,
    acceptance_rate: 63.0,
    tuition_min: 35000,
    tuition_max: 45000,
    description: 'Texas A&M University is a public land-grant research university known for its engineering and agriculture programs.'
  },
  {
    id: '3',
    name: 'Rice University',
    location_state: 'Texas',
    location_lat: 29.7174,
    location_lng: -95.4018,
    ranking: 15,
    acceptance_rate: 11.0,
    tuition_min: 52000,
    tuition_max: 62000,
    description: 'Rice University is a private research university known for its science and engineering programs.'
  },
  {
    id: '4',
    name: 'University of Oklahoma',
    location_state: 'Oklahoma',
    location_lat: 35.2058,
    location_lng: -97.4451,
    ranking: 35,
    acceptance_rate: 80.0,
    tuition_min: 32000,
    tuition_max: 42000,
    description: 'The University of Oklahoma is a public research university known for its meteorology and energy programs.'
  },
  {
    id: '5',
    name: 'Tulane University',
    location_state: 'Louisiana',
    location_lat: 29.9407,
    location_lng: -90.1209,
    ranking: 30,
    acceptance_rate: 13.0,
    tuition_min: 54000,
    tuition_max: 64000,
    description: 'Tulane University is a private research university in New Orleans, known for its medical and business programs.'
  },
  {
    id: '6',
    name: 'Louisiana State University',
    location_state: 'Louisiana',
    location_lat: 30.4133,
    location_lng: -91.1800,
    ranking: 45,
    acceptance_rate: 75.0,
    tuition_min: 28000,
    tuition_max: 38000,
    description: 'LSU is a public land-grant research university and the flagship institution of Louisiana.'
  }
];

const Universities: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    state: '',
    course: '',
    ranking: '',
    tuition: '',
  });
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [mapCenter, setMapCenter] = useState<[number, number]>([31.9686, -99.9018]); // Center of Texas
  const [mapZoom, setMapZoom] = useState(5); // Closer zoom level for better view of TX, OK, LA
  const [mapKey, setMapKey] = useState(Date.now()); // Key for forcing map re-render

  useEffect(() => {
    fetchUniversities();
  }, []);

  useEffect(() => {
    if (filters.state) {
      // Update map center based on selected state
      const centerMap: { [key: string]: [number, number] } = {
        'Texas': [31.9686, -99.9018],
        'Oklahoma': [35.5677, -97.5164],
        'Louisiana': [30.9843, -91.9623]
      };
      if (centerMap[filters.state]) {
        setMapCenter(centerMap[filters.state]);
        setMapZoom(6);
        setMapKey(Date.now()); // Force map re-render with new center
      }
    } else {
      // Reset to default view showing all three states
      setMapCenter([31.9686, -99.9018]);
      setMapZoom(5);
      setMapKey(Date.now()); // Force map re-render with new center
    }
  }, [filters.state]);

  const fetchUniversities = async () => {
    try {
      const { data, error } = await supabase
        .from('universities')
        .select('*')
        .order('ranking', { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        setUniversities(data);
      } else {
        // Fallback to mock data if no data returned
        console.log('No universities found in database, using mock data');
        setUniversities(mockUniversities);
      }
    } catch (error) {
      console.error('Error fetching universities:', error);
      // Fallback to mock data on error
      console.log('Using mock university data due to fetch error');
      setUniversities(mockUniversities);
    } finally {
      setLoading(false);
    }
  };

  const filteredUniversities = universities.filter((university) => {
    const matchesSearch = university.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      university.location_state.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesState = !filters.state || university.location_state === filters.state;
    
    return matchesSearch && matchesState;
  });

  const states = Array.from(new Set(universities.map(u => u.location_state))).sort();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold mb-6">University Database</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Explore our comprehensive database of U.S. universities and find the perfect match for
              your academic journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search universities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={filters.state}
                onChange={(e) => setFilters({ ...filters, state: e.target.value })}
                className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">All States</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              <button
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <SlidersHorizontal className="w-4 h-4" />
                More Filters
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Map and University List */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Map */}
            <div className="h-[600px] bg-gray-100 rounded-lg overflow-hidden shadow-md">
              {!loading && (
                <MapContainer
                  key={mapKey}
                  center={mapCenter}
                  zoom={mapZoom}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {filteredUniversities.map((university) => (
                    <Marker
                      key={university.id}
                      position={[university.location_lat, university.location_lng]}
                    >
                      <Popup>
                        <div className="p-2">
                          <h3 className="font-semibold text-lg">{university.name}</h3>
                          <p className="text-sm text-gray-600">Ranking: #{university.ranking}</p>
                          <p className="text-sm text-gray-600">State: {university.location_state}</p>
                          <p className="text-sm text-gray-600">
                            Tuition: ${university.tuition_min.toLocaleString()} - ${university.tuition_max.toLocaleString()}
                          </p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              )}
            </div>

            {/* University List */}
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading universities...</p>
                </div>
              ) : (
                filteredUniversities.map((university) => (
                  <motion.div
                    key={university.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white p-6 rounded-lg shadow-md"
                  >
                    <h3 className="text-xl font-semibold mb-2">{university.name}</h3>
                    <p className="text-gray-600 mb-2">
                      Location: {university.location_state}
                    </p>
                    <p className="text-gray-600 mb-2">
                      Ranking: #{university.ranking}
                    </p>
                    <p className="text-gray-600 mb-4">
                      Tuition: ${university.tuition_min.toLocaleString()} - $
                      {university.tuition_max.toLocaleString()} per year
                    </p>
                    <p className="text-gray-600 mb-4">
                      {university.description}
                    </p>
                    <button className="text-indigo-600 hover:text-indigo-700 font-medium">
                      View Details
                    </button>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Universities;