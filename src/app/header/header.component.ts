import { Component, OnInit } from '@angular/core';
import { GoogleService } from '../google.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean;
  image: string;
  constructor(private google: GoogleService) { }

  ngOnInit(): void { this.checkIfLoggedIn() }

  googleAuth() { this.google.googleAuthentication() }

  checkIfLoggedIn() {
    this.google.authState().subscribe(user => {
      if(user) {
        this.loggedIn = true;
        this.image = user.photoURL;
      }else {
        this.loggedIn = false
      }
    });
  }

  signOut(){ this.google.signOut() }
}
