import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError , BehaviorSubject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { ApiService} from './api/api.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json, text/plain, */*',
		'Content-Type': 'application/json',
  })
};


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public list = new BehaviorSubject({});
  public listStory:any = this.list.asObservable();
  public searchItem:any = {};
  public topStory:any;
  public filterupdate:boolean;
  public activeAudio:any;
  public allGenresList:any;

  constructor(public http: HttpClient, public apiLink : ApiService) {
    this.http.get(this.apiLink.topstory).pipe( retry(3), catchError(this.handleError)).subscribe( 
      data => {this.topStory = data;},
      error => console.log(error)
    );
    
    this.http.get(this.apiLink.allGenres).pipe( retry(3), catchError(this.handleError)).subscribe( 
      data => {this.allGenresList = data; console.log(data)},
      error => console.log(error)
    );
  }
  
 
  storyItem=(values, page, count, callby)=>{
    // delete values.allgenre;
    // console.log(values, page, count)

    if (callby === "header")
    {
      this.searchItem.name = values.name || '';      
      const selectedOrderIds =[] ;
      values.gen.map((v, i) => v ? selectedOrderIds.push(this.allGenresList.category[i]._id) : null)
      .filter(v => v !== null);
      //this.searchItem.gen = values.gen[0] == null ? [] : values.gen;
      this.searchItem.gen = selectedOrderIds;

      this.searchItem.ratings = values.ratings || '';
      this.searchItem.count = count;
      this.searchItem.page = page;
      // this.searchItem.genresId = values.genresId || '';
      this.searchItem.videoDuration = values.videoDuration || '';
      this.filterupdate = true;
    }
    else{
      this.searchItem.count = count;
      this.searchItem.page = page;
      this.filterupdate = false;
    }

    let body = this.searchItem; //{name:'', tags:'', ratings:'RESTRICTED', videoDuration:'', count:'', genresId:{} };
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
  // genreslist(){
  //   return this.http.get(this.apiLink.allGenres).pipe(
  //     retry(3),
  //     catchError(this.handleError)
  //   );
  // }

  /*get genrees list*/
  subFun(email){
    return this.http.post(this.apiLink.subscribapi,{email:email}, httpOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  activePlayer(id){
    if(this.activeAudio !== id)
    this.activeAudio = id;
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
