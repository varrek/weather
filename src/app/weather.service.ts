import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherService {

    private weatherAtCityEndPoint = 'http://api.openweathermap.org/data/2.5/weather?appid=3d28d07c52e91bc4d30b6af29082e4e1&units=metric&q=';
    private forecastAtCityEndPoint = 'http://api.openweathermap.org/data/2.5/forecast?mode=json&appid=3d28d07c52e91bc4d30b6af29082e4e1&units=metric&q=';

    constructor(private http: Http) {
    }

    getWeatherByPlace(place: string) {
        let url;
        url = `${this.weatherAtCityEndPoint}${place}`;
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getForecastByPlace(place: string) {
        let url;
        url = `${this.forecastAtCityEndPoint}${place}`;
        return this.http.get(url)
            .map(this.extractDataForecast)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body;
    }

    private extractDataForecast(res: Response) {
        let body = res.json();
        const result: any[] = [];
        for (let i = 0; i < body.list.length; i++) {
            if (body.list[i]['dt_txt'].includes('12:00:00')) {
                result.push(body.list[i]);
            }
        }
        return result;
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}
