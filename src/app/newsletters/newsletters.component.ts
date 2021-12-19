import { Component, OnInit } from '@angular/core';
import { Newsletter } from '../newsletter';
import { NewsletterService } from '../newsletter.service';
import { MessageService } from '../message.service';
import { AppRoutingModule } from '../app-routing.module';

@Component({
  selector: 'app-newsletters',
  templateUrl: './newsletters.component.html',
  styleUrls: ['./newsletters.component.css']
})
export class NewslettersComponent implements OnInit {

  newsletters: Newsletter[] = [];
  selectedNewsletter?: Newsletter;

  constructor(private newsletterService: NewsletterService
    //, private messageService: MessageService
    ) { }

  ngOnInit(): void {
    this.getNewsletters();
  }

  // Method to get data injection from the newsletterService
  getNewsletters(): void {
    this.newsletterService.getNewsletters().subscribe(newsletters => this.newsletters = newsletters);
  }

  // Method used to add a new subscriber to the newsletter list
  add(name: string, email: string): void {
    name = name.trim();
    email = email.trim();
    if (!name) { return; }
    if (!email) { return; }
    this.newsletterService.addNewsletter({ name, email } as Newsletter)
      .subscribe(newsletter => {
        this.newsletters.push(newsletter);
      });

      return;
  }

}
