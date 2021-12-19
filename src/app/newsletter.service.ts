import { Injectable } from '@angular/core';
import { Newsletter } from './newsletter';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';                 // Used to display troubleshooting messages
import { HttpClient, HttpHeaders } from '@angular/common/http';     // Used to communicate with servers
import { catchError, map, tap } from 'rxjs/operators';              // Error handling for server get() errors and whatnot.

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  private newslettersUrl = 'https://treehousechallenge.contractornation.com/newsletter';       // URL to make the API calls to

  private httpOptions = { headers: new HttpHeaders().set('Authorization', '8c35ac50-52ec-11ec-9560-4f60e8db92cb')};      // Authentication Key

  /** GET: Retrieve all subscribers from API server */
  getNewsletters(): Observable<Newsletter[]> {
    //this.messageService.add('NewsletterService: successfully fetched subscribers.');      // For troubleshooting purposes
    return this.http.get<Newsletter[]>(this.newslettersUrl, this.httpOptions
      )
                    .pipe(
                    tap(_ => this.log('fetched newsletters')),
                    catchError(this.handleError<Newsletter[]>('getNewsletters', []))
    );
  }

  /** GET: Retrieve a subscriber from API server. In reality, it grabs all but is used to generate a specified one by id. */
  getNewsletter(id: string): Observable<Newsletter> {
    return this.http.get<Newsletter>(this.newslettersUrl, this.httpOptions).pipe(
      tap(_ => this.log(`fetched newsletter id=${id}`)),
      catchError(this.handleError<Newsletter>(`getNewsletter id=${id}`))
    );

 }

  /** DELETE: delete the selected subscriber on the API server */
  updateNewsletter(id: string): Observable<any> {
    //const id = newsletter.id;
    const url = `${this.newslettersUrl}/${id}`;
  return this.http.delete(url, this.httpOptions).pipe(
    tap(_ => this.log(`Deleted newsletter id=${id}`)),
    catchError(this.handleError<any>('updateNewsletter'))
  );
  }

/** POST: add a new subscriber to the server */
addNewsletter(newsletter: Newsletter): Observable<Newsletter> {
  return this.http.post<Newsletter>(this.newslettersUrl, newsletter, this.httpOptions).pipe(
    tap((newNewsletter: Newsletter) => this.log(`Added subscriber with new id=${newNewsletter.id}`)),
    catchError(this.handleError<Newsletter>('addNewsletter'))
  );
}

  private log(message: string) {
    this.messageService.add(`NewsletterService: ${message}`);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

  constructor(private http: HttpClient, private messageService: MessageService) { }
}
