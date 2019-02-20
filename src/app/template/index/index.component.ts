import { Component, OnInit , OnChanges } from '@angular/core';
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
  public datalist:any;
  public firstitem:any;
  public listitem:any;
  public storyList :any;
  public item:any;
  public currentPage:number=0;
  public count:number=11;
  public Math:any;
  private pageupdate:number;

  constructor( public commonServ : CommonService, ) {}

  ngOnInit() {
    window.scroll(0,0);
    this.commonServ.storyItem({},1,this.count , 'page');    
  }

  ngDoCheck(){
    if(this.commonServ.filterupdate){ this.pagination(0)}
  }
  pagination(page){
    this.currentPage = page;
    this.commonServ.storyItem({},page+1,this.count, 'page');
  }
  pageChange(page,action){
    if(action === 'prev')
      {
        this.currentPage = this.currentPage-1;
        this.commonServ.storyItem({},this.currentPage-1,this.count, 'page');
      }
    else{
      this.currentPage = this.currentPage+1;
      this.commonServ.storyItem({},this.currentPage+1,this.count, 'page');
    }
  }

  cal=(no)=> {
    if(Math.round(no/this.count) < (no/this.count))
      return Math.round(no/this.count)+1;
    else
      return Math.round(no/this.count)
  }


}