import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  api_url = 'http://172.15.3.76/client?command=record';

  constructor(private http: HttpClient) {}

  // Add this method to your service's class
  createScriptTag(url: string): Observable<any> {
    return new Observable((observer: any) => {
      const script = document.createElement('script');
      script.src = url;
      document.body.appendChild(script);

      const handleData = (data: any) => {
        observer.next(data);
        observer.complete();
      };

      (window as any)['myCallback'] = handleData;

      const handleError = (error: any) => {
        observer.error(error);
      };

      script.onerror = handleError;

      return () => {
        document.body.removeChild(script);
        delete (window as any)['myCallback'];
      };
    });
  }

  service_get_data_live(): Observable<any> {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //   }),
    // };

    // return this.http.get(this.api_url, httpOptions).pipe(
    //   catchError((error) => {
    //     return throwError(error);
    //   })
    // );

    // Replace the code above with this code
    const url = `${this.api_url}&callback=myCallback`;
    return this.createScriptTag(url).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
