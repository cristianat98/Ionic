import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TorneoService {

  ruta = environment.apiURL + "/torneo/"
  constructor(private http: HttpClient) { }

  getTorneos(): Observable<any> {
    return this.http.get<JSON>(this.ruta + 'all');
  }

  getTorneosNearU(coordinates: any): Observable<any> {
    return this.http.post<any>(this.ruta + 'near', coordinates);
  }
  
  getTorneosUser(username: string): Observable<any> {
    return this.http.get<JSON>(this.ruta + 'all/' + username);
  }

  getTorneo(name: string): Observable<any> {
    return this.http.get<JSON>(this.ruta + name);
  }
  
  createTorneo(name: any): Observable<any> {
    return this.http.post<JSON>(this.ruta + 'new', name);
  }
  
  joinTorneo(idTorneo: string): Observable<any> {
    return this.http.post<any>(this.ruta + 'join/' + idTorneo, null);
  }

  leaveTorneo(name: string): Observable<any> {
    return this.http.put<any>(this.ruta + 'leave/' + name, null);
  }

  getVueltas(name: string): Observable<any>{
    return this.http.get<any>(this.ruta + name + "/vueltas");
  }

  getRanking(name: string): Observable<any>{
    return this.http.get<any>(this.ruta + "ranking/" + name);
  }
}
