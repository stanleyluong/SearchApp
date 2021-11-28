import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/internal/Subject';
import * as firebase from 'firebase/app';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {
  result = new Subject<any>();
  $result = this.result.asObservable();

  constructor(private afAuth: AngularFireAuth, private http: HttpClient) { }

  /**
   * Search Google 
   */

  searchGoogle(term: string) {
    this.http.get(`https://www.googleapis.com/customsearch/v1?key=${environment.searchKey}&cx=dd0eaa07daad14445&q=${term}`)
    .subscribe((data: any) =>  this.updateResult(data))
  }

  /**
  **  Update Google Search Results
  **/
  
  updateResult(data: any) {
    this.result.next(data);
  }

  /**
   * Google Login and Sign Up
   */

  googleAuthentication() {
    return this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
  }

  /**
   * Monitor if a user has logged in
   */

  authState() {
    return this.afAuth.authState;
  }

  /**
   * Sign out a currently logged in user
   */

  signOut() {
    return this.afAuth.signOut()
  }
}
