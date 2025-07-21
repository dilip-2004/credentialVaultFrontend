import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAllUsersRequest, GetAllUsersResponse, GetUserByIdResponse } from '../interfaces/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly apiUrl = 'http://localhost:5000/api/admin';

  constructor(private http: HttpClient) {}

  getAllUsers(paramsObj: GetAllUsersRequest): Observable<GetAllUsersResponse> {
    let params = new HttpParams();

    Object.entries(paramsObj).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params = params.set(key, value.toString());
      }
    });

    return this.http.get<GetAllUsersResponse>(`${this.apiUrl}/getUsers`, { params });
  }

  getUserById(id: string): Observable<GetUserByIdResponse> {
    return this.http.get<GetUserByIdResponse>(`${this.apiUrl}/getUsersById/${id}`);
  }
}
