import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import * as i0 from '@angular/core';

export declare class ApiService {

    constructor(httpClient: HttpClient); 
    get<T>(path: string, params?: HttpParams, showErrors?: boolean): Observable<T>;
    put<T>(path: string, body?: object, showErrors?: boolean): Observable<T>;
    post<T>(path: string, body?: object, showErrors?: boolean): Observable<T>;
    delete<T>(path: any, body?: object, showErrors?: boolean): Observable<T>;
    // static ɵfac: i0.ɵɵFactoryDeclaration<ApiService, never>;
    // static ɵprov: i0.ɵɵInjectableDeclaration<ApiService>;

}