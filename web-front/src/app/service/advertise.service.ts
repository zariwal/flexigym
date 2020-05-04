import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';
import {Product} from '../models/product';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {advertiseApi} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdvertiseService {

  //private advertiseUrl = "http://flexigym-advertise-service2:9100/"
  private advertiseUrl = `${advertiseApi}`;

  constructor(private http: HttpClient) {

  }

  getAllPackages(user: User): Observable<any> {
    console.log("this.advertiseUrl " + JSON.stringify(this.advertiseUrl) );
    let url = this.advertiseUrl + "/all"
    let body = JSON.stringify({"email": user.email, "password": user.password, "mobile": user.mobile});
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
        .append('Access-Control-Allow-Origin', '*'),
      mode: 'no-cors'

    }
    console.log("Done");
    return this.http.get<any>(url);
  }

  getDetail(id: String): Observable<any> {
    const url = `${this.advertiseUrl}/packagesApi/${id}`;

    // @ts-ignore
    return this.http.get<any>(url).pipe(
      map(prod => prod.packages),
      catchError(_ => {
        console.log("Get Detail Failed");
        return of(new Product());
      })
    );
  }

}
