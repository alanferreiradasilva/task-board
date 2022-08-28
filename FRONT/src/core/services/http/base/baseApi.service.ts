import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export abstract class BaseApiService {
    constructor(protected http: HttpClient, public controllerName: string) { }

    protected getOptions() {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + ''
        });
      
        return { headers: headers };
    }

    protected url(actionName?: string): string {
        return environment.apiUrl + this.controllerName + (actionName ? `/${actionName}` : '');
    }

    public get = (actionName?: string) => 
        this.http.get(this.url(actionName), this.getOptions());

    public post = (body: any, actionName?: string) => 
        this.http.post(this.url(actionName), body, this.getOptions());

    public put = (body: any, actionName?: string) => 
        this.http.put(this.url(actionName), body, this.getOptions());

    public delete = (actionName?: string) => 
        this.http.delete(this.url(actionName), this.getOptions());
}