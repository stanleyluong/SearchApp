import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  data: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  route() {
    this.router.navigate(['/result'],{queryParams: {term: this.data}});
  }

  search(event) {
    if (event.keyCode === 13) {
      this.route()
    }
  }
}
