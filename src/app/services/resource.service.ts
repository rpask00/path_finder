import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";


export interface Response<T> {
  data: T[];
  totalItems: number;
}

export interface Pager {
  page: number;
  size: number;
}

export interface Sorter {
  [key: string]: 'asc' | 'desc';
}

export interface Filter {
  [key: string]: string;
}


@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  private _apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient
  ) {
  }

  private _query(
    pager?: Pager,
    sorters?: Sorter,
    filters?: Filter
  ) {
    const pageQuery = pager ? `page=${pager.page}&size=${pager.size}` : '';
    const sortQuery = sorters ? Object.keys(sorters).map(key => `sort[${key}]=${sorters[key]}`).join('&') : '';
    const filterQuery = filters ? Object.keys(filters).map(key => `filter[${key}]=${filters[key]}`).join('&') : '';
    return [pageQuery, sortQuery, filterQuery].filter(q => q).join('&');
  }

  get<T>(
    resource: string,
    pager?: Pager,
    sorters?: Sorter,
    filters?: Filter
  ) {
    const query = this._query(pager, sorters, filters);
    return this.http.get<Response<T>>(`${this._apiUrl}${resource}?${query}`);
  }

  create<T>(resource: string, value: Partial<T>) {
    return this.http.post<Response<T>>(`${this._apiUrl}${resource}`, value);
  }

  put<T>(resource: string, _id: string, value: Partial<T>) {
    return this.http.put<Response<T>>(`${this._apiUrl}${resource}/${_id}`, value);
  }

  delete(resource: string, _id: string) {
    return this.http.delete(`${this._apiUrl}${resource}/${_id}`);
  }
}
