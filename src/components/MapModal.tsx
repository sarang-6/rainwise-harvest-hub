import React, { useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin, X } from "lucide-react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  location: string;
}

const MapModal = ({ isOpen, onClose, location }: MapModalProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);

  // Mock coordinates for demo purposes
  const getCoordinates = (location: string): [number, number] => {
    const mockCoordinates: { [key: string]: [number, number] } = {
      'mumbai': [19.0760, 72.8777],
      'delhi': [28.6139, 77.2090],
      'bangalore': [12.9716, 77.5946],
      'chennai': [13.0827, 80.2707],
      'kolkata': [22.5726, 88.3639],
      'hyderabad': [17.3850, 78.4867],
      'pune': [18.5204, 73.8567],
      'ahmedabad': [23.0225, 72.5714],
      'jaipur': [26.9124, 75.7873],
      'lucknow': [26.8467, 80.9462],
      'kanpur': [26.4499, 80.3319],
      'nagpur': [21.1458, 79.0882],
      'indore': [22.7196, 75.8577],
      'thane': [19.2183, 72.9781],
      'bhopal': [23.2599, 77.4126],
      'visakhapatnam': [17.6868, 83.2185],
      'patna': [25.5941, 85.1376],
      'vadodara': [22.3072, 73.1812],
      'ghaziabad': [28.6692, 77.4538],
      'ludhiana': [30.9010, 75.8573]
    };

    const key = location.toLowerCase().split(',')[0].trim();
    return mockCoordinates[key] || [20.5937, 78.9629]; // Default to India center
  };

  useEffect(() => {
    if (isOpen && mapContainer.current && !map.current) {
      const coordinates = getCoordinates(location);
      
      map.current = L.map(mapContainer.current).setView(coordinates, 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map.current);

      // Add a marker for the location
      const marker = L.marker(coordinates).addTo(map.current);
      marker.bindPopup(`
        <div style="text-align: center; padding: 8px;">
          <h3 style="margin: 0 0 8px 0; color: #2563eb;">${location}</h3>
          <p style="margin: 0; color: #666; font-size: 14px;">Rainwater Harvesting Assessment Location</p>
          <div style="margin-top: 8px; padding: 8px; background: #f0f9ff; border-radius: 4px;">
            <strong style="color: #1e40af;">Optimal Zone for Water Harvesting</strong>
          </div>
        </div>
      `).openPopup();

      // Add a circle to show the area of influence
      L.circle(coordinates, {
        color: '#3b82f6',
        fillColor: '#3b82f6',
        fillOpacity: 0.1,
        radius: 500
      }).addTo(map.current);
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [isOpen, location]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="text-primary" size={20} />
            Location Map - {location}
          </DialogTitle>
          <DialogDescription>
            Your property location and optimal placement area for rainwater harvesting system
          </DialogDescription>
        </DialogHeader>
        
        <div className="relative">
          <div ref={mapContainer} className="h-96 w-full rounded-lg border" />
          
          <div className="absolute top-4 right-4 z-[1000]">
            <Button
              variant="secondary"
              size="icon"
              onClick={onClose}
              className="rounded-full shadow-lg"
            >
              <X size={16} />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span>Assessment Location</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary/20 border border-primary rounded-full"></div>
            <span>Optimal Coverage Area</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>High Efficiency Zone</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MapModal;