import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError , BehaviorSubject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { ApiService} from './api/api.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private list = new BehaviorSubject({});
  public listStory:any = this.list.asObservable();
  public searchItem:any = {};
  public topStory:any;

  constructor(private http: HttpClient, private apiLink : ApiService) {
    this.http.get(this.apiLink.topstory).pipe( retry(3), catchError(this.handleError)).subscribe( 
      data => {
        //console.log(data)
        this.topStory = data;
      },
      error => console.log(error)
    );
  }
  
 
  storyItem=(values, page, count)=>{
    // delete values.allgenre;
    // console.log(values, page, count)
    this.searchItem.name = values.name || this.searchItem.name;
    this.searchItem.tags = values.tags || this.searchItem.tags;
    this.searchItem.ratings = values.ratings || this.searchItem.ratings;
    this.searchItem.count = count;
    this.searchItem.page = page;
    this.searchItem.genresId = values.genresId || this.searchItem.genresId;

    let body = this.searchItem;//{name:'', tags:'', ratings:'RESTRICTED', videoDuration:'', count:'', genresId:{} };
    this.http.post(this.apiLink.getStoryList,body, httpOptions).pipe(
      retry(3),
      catchError(this.handleError)
    ).subscribe( 
      data => {
        // console.log(data)
        this.listStory = data;
        // console.log(this.listStory)
        return this.listStory;
      },
      error => console.log(error)
    )
  }





  /*get story Detail*/
  storydetail(id){
    return this.http.get(this.apiLink.storyDetail+id).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  /*get genrees list*/
  genreslist(){
    return this.http.get(this.apiLink.allGenres).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  /*get genrees list*/
  subFun(email){
    return this.http.post(this.apiLink.subscribapi,{email:email}, httpOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  private handleError(error) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  };
}
