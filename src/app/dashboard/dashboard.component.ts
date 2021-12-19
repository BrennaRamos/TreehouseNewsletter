import { Component, OnInit } from '@angular/core';
import { Newsletter } from '../newsletter';
import { NewsletterService } from '../newsletter.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  newsletters: Newsletter[] = [];

  constructor(private newsletterService: NewsletterService) { }

  ngOnInit(): void {
    this.getNewsletters();
    this.sortNewsletters;
  }

  // Gets the list of current subscribers from the API server
  getNewsletters(): void {
    this.newsletterService.getNewsletters()
      .subscribe(newsletters => this.newsletters = newsletters);
  }

  // Sorts the list of current subscribers by date so display can show from newest to oldest additions
  get sortNewsletters() {
    return this.newsletters.sort((a, b) => {
      return <any>new Date(b.created_on) - <any>new Date(a.created_on);
    });
  };

 };
