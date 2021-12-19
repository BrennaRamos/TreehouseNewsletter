import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Newsletter } from '../newsletter';
import { NewsletterService } from '../newsletter.service';

@Component({
  selector: 'app-newsletter-detail',
  templateUrl: './newsletter-detail.component.html',
  styleUrls: ['./newsletter-detail.component.css'],

})
export class NewsletterDetailComponent implements OnInit {

  newsletter: Newsletter | undefined;

  constructor(
    private route: ActivatedRoute,
    private newsletterService: NewsletterService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getNewsletter();
  }

  getNewsletter(): void
  {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.newsletterService.getNewsletter(id)
    .subscribe(newsletter => this.newsletter = newsletter);
  }

  goBack(): void {
    this.location.back();
  }

  delete(): void {

    const id = String(this.route.snapshot.paramMap.get('id'));
    if (this.newsletter) {
      this.newsletterService.updateNewsletter(id)
        .subscribe(() => this.goBack());
    }

  }

}
