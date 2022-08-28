import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            
            const error = err.message || err.statusText;
            const title = 'Falha ao processar requisição!';

            switch (err.status) {
                case 400:
                    const messages = err?.error?.body || err?.error?.title;
                    let formatedMessage = '';

                    if (messages && typeof(messages) == 'object') {
                        formatedMessage = `<small>${messages.join('<br />')}</small>`;
                    } else {
                        formatedMessage = messages == 'One or more validation errors occurred.' 
                            ? 'Ocorreu um erro ao enviar os dados para o servidor.'
                            : messages;
                    }
                    
                    Swal.fire(title, formatedMessage, 'error');
                    break;
                case 401:
                    Swal.fire(title, `<small>Aplicação não autenticada!</small>`, 'error');
                    //location.reload();
                    break;
                case 500:
                    if(err.error?.message){
                        Swal.fire(title, `<small>${err.error?.message}</small>`, 'error');
                    } else {
                        Swal.fire(title, `<small>${error}</small>`, 'error');
                    }
                    break;
                default:    
                    const errorMessage = error;   
                    
                    if (errorMessage.toString().startsWith('Http failure response for')) {
                        Swal.fire(title, `<small>Serviço indisponível!</small>`, 'error');
                    } else {
                        Swal.fire(title, `<small>${error}</small>`, 'error');
                    }
                    break;
            }            

            return throwError(error);
        }));
    }
}
