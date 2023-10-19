import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-email-link-sent',
  templateUrl: './email-link-sent.component.html',
  styleUrls: ['./email-link-sent.component.css'],
})
export class EmailLinkSentComponent implements OnInit {
  email: any;

  ngOnInit(): void {
    if (history.state.email) {
      this.email = history.state.email;
      sessionStorage.setItem('SentToEmail', JSON.stringify(this.email));
    } else {
      this.email = JSON.parse(sessionStorage.getItem('SentToEmail'));
    }
  }
}
