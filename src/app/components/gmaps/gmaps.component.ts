import { Component, ElementRef, NgZone, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule, NgSelectOption } from '@angular/forms';
import { ApiService } from '../../api.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MapService } from '../../map.service';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';
import { GoogleMap } from '@angular/google-maps';
import { dir } from 'console';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeHtmlPipe } from './safeHtml.pipe';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-gmaps',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule, MatInputModule, MatButtonModule, FlexLayoutModule, FlexLayoutServerModule, NgSelectModule, MatFormFieldModule, FormsModule, GoogleMapsModule, SafeHtmlPipe, MatSelectModule],
  providers: [ApiService],
  templateUrl: './gmaps.component.html',
  styleUrl: './gmaps.component.css'
})
export class GmapsComponent {
  location: GeolocationPosition | undefined;
  private directionsService = new google.maps.DirectionsService();
  private directionsRenderer = new google.maps.DirectionsRenderer();
  markers: google.maps.Marker[] = [];
  locationError!: string;
  fromLocations = []
  toLocations = []
  apiLoaded: any;
  latitude!: number;
  longitude!: number;
  center!: google.maps.LatLngLiteral;
  mapOptions!: google.maps.MapOptions;
  markerPosition!: google.maps.LatLngLiteral;
  searchQuery!: string;
  searchQuery2!: string;
  autocomplete!: google.maps.places.Autocomplete
  selectedMode: 'driving' | 'walking' | 'bicycling' = 'driving';
  private geocoder!: google.maps.Geocoder;
  @ViewChild('placesSearch', { static: true })
  placesSearchElement!: ElementRef;
  @ViewChild('placesSearch2', { static: true })
  placesSearchElement2!: ElementRef;
  @ViewChild('map', { static: true })
  map!: GoogleMap;
  autocomplete2!: google.maps.places.Autocomplete;
  directions: any[] = [];





  constructor(private locationService: ApiService, private mapService: MapService, httpClient: HttpClient, private zone: NgZone, private sanitizer: DomSanitizer) {

  }

  ngOnInit() {

    this.locationService.getLocations().subscribe((res) => {
      console.log("res", res)
    })

    this.directionsRenderer.setMap(this.map?.googleMap as any);
    console.log(this.map)
    console.log(this.directionsRenderer)

    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      // this.markerPosition = { ...this.center };
      // this.mapOptions = {
      //   zoom: 15,
      //   center: this.center,
      // };
    });
    this.geocoder = new google.maps.Geocoder();
    console.log('ngOnInit called');
    if (!this.placesSearchElement || !(this.placesSearchElement.nativeElement instanceof HTMLInputElement)) {
      console.error('Input element not found or is not an HTMLInputElement.');
      return;
    }

    this.geocoder = new google.maps.Geocoder();

    this.autocomplete = new google.maps.places.Autocomplete(this.placesSearchElement.nativeElement, {
      types: ['geocode'], // You can adjust the types based on your needs
    });
    this.autocomplete2 = new google.maps.places.Autocomplete(this.placesSearchElement2.nativeElement, {
      types: ['geocode'], // You can adjust the types based on your needs
    });

    console.log('Autocomplete instance:', this.autocomplete);

    this.autocomplete.addListener('place_changed', () => {
      this.zone.run(() => {
        const place = this.autocomplete?.getPlace();
        if (place?.geometry) {
          console.log('Place selected:', place);
          this.fromLocationName = place.name || null;
          var p = place.geometry.location as any
          this.handlePlaceSelection(p, true)
        }
      });
    });

    this.autocomplete2.addListener('place_changed', () => {
      this.zone.run(() => {
        const place = this.autocomplete2?.getPlace();
        if (place?.geometry) {
          console.log('Place selected:', place);
          this.toLocationName = place.name || null;
          var p = place.geometry.location as any
          this.handlePlaceSelection(p, false)
        }
      });
    });

    // Additional debug logs
    console.log('Initialization completed.');
    console.log('Autocomplete input element:', this.placesSearchElement.nativeElement);
    console.log('Search query:', this.searchQuery);


  }

  private fromLocation: google.maps.LatLng | null = null;
  private toLocation: google.maps.LatLng | null = null;
  private fromLocationName: string | null = null;
  private toLocationName: string | null = null;

  apiKey = environment.googleMapsApiKey;

  saveLocation() {
    if (this.fromLocation && this.toLocation) {
      const locationData = {
        from_location: {
          name: this.fromLocationName, // Replace with the actual name or leave it empty
          lat: this.fromLocation.lat().toString(),
          lng: this.fromLocation.lng().toString()
        },
        to_location: {
          name: this.toLocationName, // Replace with the actual name or leave it empty
          lat: this.toLocation.lat().toString(),
          lng: this.toLocation.lng().toString()
        },
        "travel_mode": this.selectedMode.toUpperCase(),
        "search_by": "ANON" 
      };

      this.locationService.saveLocation(locationData).subscribe(
        response => {
          console.log('Location saved successfully:', response);
          // Optionally, you can perform additional actions after a successful save
          this.calculateAndDisplayRoute();
          this.clearMarkers();
        },
        error => {
          console.error('Error saving location:', error);
        }
      );
    } else {
      console.error('Both fromLocation and toLocation must be set before saving.');
    }
  }

  toggleMode(mode: 'driving' | 'walking' | 'bicycling') {
    this.selectedMode = mode;
    this.calculateAndDisplayRoute();
  }

  private handlePlaceSelection(location: google.maps.LatLng, isFromLocation: boolean) {
    this.clearMarkers()
    // Create a new marker at the selected location
    if (isFromLocation) {
      this.markers[0] = new google.maps.Marker({
        position: location,
        map: this.map?.googleMap, // Use optional chaining to avoid errors if map is not available
        title: isFromLocation ? 'From Location' : 'To Location',
      });
    } else {
      this.markers[1] = new google.maps.Marker({
        position: location,
        map: this.map?.googleMap, // Use optional chaining to avoid errors if map is not available
        title: isFromLocation ? 'From Location' : 'To Location',
      });

    }



    // Update the corresponding location variable
    if (isFromLocation) {
      this.fromLocation = location;
    } else {
      this.toLocation = location;
    }

    // Center the map on the selected location
    if (this.map?.googleMap) {
      this.map.googleMap.panTo(location); // Use panTo to center the map
      this.map.googleMap.setZoom(15); // You can adjust the zoom level as needed
    }
  }
  clearMarkers() {
    this.markers.forEach(marker => {
      marker.setMap(null); // Remove the marker from the map
    });
  }
  private calculateAndDisplayRoute() {
    const origin = this.markers[0]?.getPosition();
    const destination = this.markers[1]?.getPosition();

    if (origin && destination) {
      console.log('both loc')
      const request = {
        origin,
        destination,
        travelMode: this.selectedMode.toUpperCase() as google.maps.TravelMode,
      };
      console.log(request)
      this.directionsService.route(request, (response, status) => {
        console.log(status, response)
        if (status === 'OK') {
          this.directionsRenderer.setDirections(response)
          this.directionsRenderer.setMap(this.map.googleMap as any)
          this.directions = this.extractDirections(response as any);
        } else {
          console.error('Directions request failed:', status);
        }
      });
    }
  }
  private extractDirections(response: google.maps.DirectionsResult): google.maps.DirectionsStep[] {
    const directions: google.maps.DirectionsStep[] = [];
    if (response.routes && response.routes.length > 0) {
      const legs = response.routes[0].legs;
      legs.forEach((leg) => {
        leg.steps.forEach((step) => {
          directions.push(step);
        });
      });
    }
    console.log(directions)
    return directions;
  }



  getMarkerPosition(marker: google.maps.Marker): google.maps.LatLngLiteral {
    return marker?.getPosition()?.toJSON() as any;
  }
  calculateDistance(): number {
    if (this.markers.length === 2) {
      const position1 = new google.maps.LatLng(this.markers[0].getPosition() as any);
      const position2 = new google.maps.LatLng(this.markers[1].getPosition() as any);

      // Calculate distance in meters
      const distance = google.maps.geometry.spherical.computeDistanceBetween(position1, position2);
      return distance;
    }

    return 0; // Default distance if markers are not available or not enough
  }
}

