import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];

  // Adds a message to the array above
  add(message: string)
  {
    this.messages.push(message);
  }
  // Clears the array above
  clear()
  {
    this.messages = [];
  }
}
