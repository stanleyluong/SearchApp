import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoogleService } from '../google.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  searchTerm: string;
  loggedIn = false;
  image: string;
  results;
  
  constructor(private route: ActivatedRoute, private google: GoogleService) { 
    this.route.queryParams.subscribe(data => this.searchTerm = data.term) 
    this.googleSearch(this.searchTerm);
  }

  ngOnInit(): void {
    this.checkIfLoggedIn();
    this.google.$result.subscribe(res => this.results = res)
  }

  googleAuth() { this.google.googleAuthentication(); }

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

  signOut(){
    this.google.signOut()
  }

  googleSearch(term: string) {
    this.google.searchGoogle(term)
  }

  search(event) {
    if (event.keyCode === 13) {
      this.google.searchGoogle(this.searchTerm)
    }
  }
}
