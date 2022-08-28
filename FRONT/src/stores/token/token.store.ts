import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";

export interface TokenState {
    token: string;
}

@Injectable({
    providedIn: 'root'
})
export class TokenStore extends ComponentStore<TokenState> {
    private _token: string;
    public getToken(): string { return this._token; }
    
    constructor() {
        super({ token: '' });

        this._token = '';
    }

    readonly token$: Observable<string> = this.select(state => state.token);

    readonly save = this.updater((state, token: string) => {
        this._token = token;
        return ({
            token: token
        })
    });

    readonly reset = this.updater((state) => ({
        token: ''
    }));
}