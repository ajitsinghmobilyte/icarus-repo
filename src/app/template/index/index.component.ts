import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../../service/common.service';
import { empty } from 'rxjs';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  private datalist:any;
  private firstitem:any;
  private listitem:any;
  private storyList :any;
  private item:any;

  private currentPage:number=0;
  private count:number=11;
  private Math:any;

  constructor( private commonServ : CommonService) {
    
    // this.commonServ.listStory.subscribe(message => {this.item = message; console.log('index const',message)});
  }

  ngOnInit() {
    window.scroll(0,0);
    this.commonServ.storyItem({},1,this.count);

    // this.listitem = this.commonServ.getList().subscribe( 
    //   data => console.log(data),
    //   error => console.log(error)
    // );
    
    // this.commonServ.storylist().subscribe(
    //   data => {this.storyList = data; console.log(data)},
    //   error => console.log(error)
    // );

    // this.commonServ.listStory.subscribe(message => {
    //   this.item = message;
    //   console.log('index',message)
    // });   
  }

  pagination(page){
    // console.log(page+1)
    this.currentPage = page;
    this.commonServ.storyItem({},page+1,this.count);
  }
  pageChange(page,action){
    // console.log(page, action)
    if(action === 'prev')
      {
        this.currentPage = this.currentPage-1;
        this.commonServ.storyItem({},this.currentPage-1,this.count);
      }
    else{
      this.currentPage = this.currentPage+1;
      this.commonServ.storyItem({},this.currentPage+1,this.count);
    }
  }

  cal=(no)=> {
    // console.log(Math.round(no/11)+1,'<', (no/11))
    if(Math.round(no/this.count) < (no/this.count))
      return Math.round(no/this.count)+1;
    else
      return Math.round(no/this.count)
  }


}
