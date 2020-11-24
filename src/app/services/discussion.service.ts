import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8000/discussions';

@Injectable({providedIn: 'root'})
export class DiscussionService {

  constructor(private http: HttpClient) { }

  getAllDiscussions(): Observable<any> {
    return this.http.get(baseUrl);
  }

  getOneDiscussion(id): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  createDiscussion(data): Observable<any> {
    return this.http.post('http://localhost:8000/discussions/add', data);
  }

  updateDiscussion(id, data): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  deleteOneDiscussion(id): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAllDiscussions(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findDiscussionByUser(username): Observable<any> {
    return this.http.get(`${baseUrl}?title=${username}`);
  }
}
