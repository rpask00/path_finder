import {Component, Output} from '@angular/core';
import {LocationsService} from "../../services/locations.service";

@Component({
  selector: 'app-locations-types',
  templateUrl: './locations-types.component.html',
  styleUrls: ['./locations-types.component.scss']
})
export class LocationsTypesComponent {

  constructor(
    private _locationService: LocationsService
  ) {
  }

  readonly options = [
    {label: 'Lotnisko', type: 'airport'},
    {label: 'Akwarium', type: 'aquarium'},
    {label: 'Galeria sztuki', type: 'art_gallery'},
    {label: 'Piekarnia', type: 'bakery'},
    {label: 'Bank', type: 'bank'},
    {label: 'Kręgielnia', type: 'bowling_alley'},
    {label: 'Stacja autobusowa', type: 'bus_station'},
    {label: 'Kawiarnia', type: 'cafe'},
    {label: 'Myjnia samochodowa', type: 'car_wash'},
    {label: 'Kasyno', type: 'casino'},
    {label: 'Kościół', type: 'church'},
    {label: 'Sąd', type: 'courthouse'},
    {label: 'Dentysta', type: 'dentist'},
    {label: 'Lekarz', type: 'doctor'},
    {label: 'Elektryk', type: 'electrician'},
    {label: 'Kwiaciarnia', type: 'florist'},
    {label: 'Stacja benzynowa', type: 'gas_station'},
    {label: 'Siłownia', type: 'gym'},
    {label: 'Salon fryzjerski', type: 'hair_care'},
    {label: 'Sklep z narzędziami', type: 'hardware_store'},
    {label: 'Szpital', type: 'hospital'},
    {label: 'Agencja ubezpieczeniowa', type: 'insurance_agency'},
    {label: 'Pralnia', type: 'laundry'},
    {label: 'Biblioteka', type: 'library'},
    {label: 'Muzeum', type: 'museum'},
    {label: 'Klub nocny', type: 'night_club'},
    {label: 'Sklep zoologiczny', type: 'pet_store'},
    {label: 'Apteka', type: 'pharmacy'},
    {label: 'Hydraulik', type: 'plumber'},
    {label: 'Policja', type: 'police'},
    {label: 'Poczta', type: 'post_office'},
    {label: 'Restauracja', type: 'restaurant'},
    {label: 'Szkoła', type: 'school'},
    {label: 'Szkoła średnia', type: 'secondary_school'},
    {label: 'Centrum handlowe', type: 'shopping_mall'},
    {label: 'Stadion', type: 'stadium'},
    {label: 'Sklep', type: 'store'},
    {label: 'Stacja metra', type: 'subway_station'},
    {label: 'Uniwersytet', type: 'university'},
    {label: 'Opieka weterynaryjna', type: 'veterinary_care'},
    {label: 'Zoo', type: 'zoo'},
  ];
  selected: string[] = [
    'airport',
    'laundry',
    'gym',
  ]

  changed() {
    this._locationService.autocompleteTypes$.next(this.selected)
  }
}


