import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface User {
  email: string;
  password: string;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersUrl = 'assets/user.json';
  
  constructor(private http: HttpClient) {}

  authenticate(email: string, password: string): Observable<User | null> {
    return new Observable((observer) => {
      this.http.get<User[]>(this.usersUrl).subscribe((users) => {
        const user = users.find((u) => u.email === email && u.password === password);
        observer.next(user || null);
        observer.complete();
      });
    });
  }
}
