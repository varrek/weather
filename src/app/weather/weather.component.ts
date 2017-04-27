import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../weather.service';

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
    place: string;

    results: any[] = [];
    error_text: string = '';
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

    loadWeather(){
        for (let city of this.CITIES) {
            console.log(this.getWeatherInPlace(city));
        }
    }

    getWeatherInPlace(place: string) {
        if (place) {
            this.place = place;
            this.weatherService.getWeatherByPlaceAndLanguage(place).subscribe(
                weather => {
                    this.results = weather;
                },
                error => {
                    this.results = [];
                    this.error_text = "Sorry!";
                    console.error(error);
                }
            )
        }
    }
}
