import { UserService } from 'src/app/services/user.service';
import { ComponentsService } from './../services/components.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { EventsService } from '../services/events.service';

// Para inyectar en constructores
@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router, private components: ComponentsService, private userService: UserService, private events: EventsService) {}

    // Modifica la petición HTTP añadiendole la cabecera con el jwt
    intercept(req: HttpRequest<any>, next: HttpHandler){
        if(localStorage.getItem("ACCESS_TOKEN") != null){
            const authToken = localStorage.getItem("ACCESS_TOKEN")
            const authReq = req.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + authToken
                }
            });

            return next.handle(authReq).pipe(
                catchError((err: HttpErrorResponse) => {
                    if(err.status === 401) {
                        this.components.dismissLoading();
                        this.userService.user = undefined;
                        this.userService.i = 0;
                        this.components.presentAlert("Sesión caducada :( Por favor, inicia sesión de nuevo");
                        this.events.disconnectSocket();
                        this.router.navigateByUrl("auth/login");
                    }
                    else if(err.status === 500 || err.status == 0) {
                        this.components.dismissLoading();
                        this.userService.user = undefined;
                        this.userService.i = 0;
                        this.components.presentAlert("No se ha podido conectar con el servidor. Serás redirigido a la página de login");
                        this.events.disconnectSocket();
                        this.router.navigateByUrl("auth/login");
                    }
                    return throwError(err);
                }));
        }
        return next.handle(req).pipe(
            catchError((err: HttpErrorResponse) => {
                if(err.status === 500 || err.status == 0){
                    this.components.dismissLoading();
                    this.components.presentAlert("No se ha podido conectar con el servidor");
                }
                return throwError(err);
            })
        );
    }
}