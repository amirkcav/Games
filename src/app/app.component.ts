import { Component, Renderer2, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    
  title = 'app';
  previousUrl: string;
  date: string;
  
  constructor(private renderer: Renderer2, private router: Router) {
    // adding class according to the active route. from https://arjunphp.com/angular-4-add-dynamic-class-body-based-route/
    this.router.events
    .subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (this.previousUrl) {
          this.renderer.removeClass(document.body, this.previousUrl);
        }
        // remove the first slash (/)
        const currentUrlSlug = event.url.slice(1);
        if (currentUrlSlug) {
          this.renderer.addClass(document.body, currentUrlSlug);
        }
        this.previousUrl = currentUrlSlug;
      }
    });
  }
  
  ngOnInit(): void {
    this.date = new HeDate();
  }
  
}
