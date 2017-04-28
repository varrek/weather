import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../weather.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
    city: string;
    selectedCity: string;

    results: any[] = [];
    forecastResults: any;
    error_text = '';
    CITIES: any [] = [
        'London',
        'Amsterdam',
        'Kiev',
        'Prague',
        'Paris'
    ];

    dynamicTable: any;

    constructor(private weatherService: WeatherService) {
    }

    ngOnInit() {
        this.loadWeather();
    }

    loadWeather() {
        for (const city of this.CITIES) {
            this.getWeatherInCity(city);
        }
    }

    getWeatherInCity(place: string) {
        if (place) {
            this.city = place;
            this.weatherService.getWeatherByPlace(place).subscribe(
                weather => {
                    this.results.push(weather);
                },
                error => {
                    this.results = [];
                    this.error_text = 'Sorry!';
                    console.error(error);
                }
            );
        }
    }

    getForecastInCity() {
        if (this.selectedCity) {
            this.weatherService.getForecastByPlace(this.selectedCity).subscribe(
                weather => {
                    this.forecastResults = weather;
                },
                error => {
                    this.error_text = 'Sorry!';
                    console.error(error);
                }
            );
        }
    }


    onSelect(city: string): void {
        this.selectedCity = city;
        this.getForecastInCity();
    }
}
