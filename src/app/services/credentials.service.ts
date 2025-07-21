import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { 
  CredentialsGetResponse, 
  CredentialsGetRequest, 
  CredentialsPostRequest, 
  CredentialsUpdateRequest, 
  CredentialsGetResponseByID, 
  DecryptCredentialRequest, 
  DecryptCredentialResponse 
} from '../interfaces/credentials';

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {
  private apiUrl = 'http://localhost:5000/api/credentials';

  constructor(private http: HttpClient) {}

  getCredentials(userId: string, request: CredentialsGetRequest): Observable<CredentialsGetResponse> {
    let params = new HttpParams()
      .set('page', request.page.toString())
      .set('limit', request.limit.toString());
    
    if (request.search) {
      params = params.set('search', request.search);
    }
    
    if (request.sort) {
      params = params.set('sort', request.sort);
    }

    return this.http.get<CredentialsGetResponse>(`${this.apiUrl}/user/${userId}`, { params });
  }

  getCredentialsByID(id: string): Observable<CredentialsGetResponseByID> {
    return this.http.get<CredentialsGetResponseByID>(`${this.apiUrl}/${id}`);
  }

  postCredentials(data: CredentialsPostRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
  }

  updateCredentials(id: string, data: CredentialsUpdateRequest): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteCredentials(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  decryptCredential(data: DecryptCredentialRequest): Observable<DecryptCredentialResponse> {
    return this.http.post<DecryptCredentialResponse>(`${this.apiUrl}/decrypt`, data, {withCredentials:true});
  }
}

