import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { Housinglocation } from '../models/housinglocation';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  housingLocations: Housinglocation[] = [];
  filteredHousingLocations: Housinglocation[] = [];
  housingService: HousingService = inject(HousingService);

  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocations) => {
      this.housingLocations = housingLocations;
      this.filteredHousingLocations = housingLocations;
    });
  }

  filterResults(text: string) {
    if (!text)
    {
      this.filteredHousingLocations = this.housingLocations;
    }

    this.filteredHousingLocations = this.housingLocations.filter(housingLocation => 
      housingLocation?.city.toLowerCase().includes(text.toLowerCase()));
  }
}
