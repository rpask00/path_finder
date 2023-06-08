import {icon, IconOptions, Marker} from "leaflet";


// Fix leaflet icons import
const iconRetinaUrl = 'assets/leaflet/marker-icon-2x.png';
const iconUrl = 'assets/leaflet/marker-icon-blue.png';
const shadowUrl = 'assets/leaflet/marker-shadow.png';

const iconDefaultOptions: IconOptions = {
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [32, 32],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
}

export const iconActive = icon({
    ...iconDefaultOptions,
    iconUrl: 'assets/leaflet/marker-icon-red.png',
    iconSize: [40, 40],
  }
)

export const iconDefault = icon({
    ...iconDefaultOptions,
  }
)
Marker.prototype.options.icon = (icon(iconDefaultOptions));
