import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { trigger, state, style, animate, transition, } from '@angular/animations';
import { CommonService } from '../../service/common.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        opacity: 1,
      })),
      state('closed', style({
        height: '0',
        opacity: 0,
      })),
      transition('open => closed', [
        animate('0.5s'),
        //style({ transform: 'translateX(-100%)' }),
      ]),
      transition('closed => open', [
        animate('0.5s'),
        //animate(100, style({ transform: 'translateX(100%)' }))
      ]),
    ]),
  ]
})
export class DetailComponent implements OnInit {
  private storyDetail:any;
  private storyList :any;
  private isOpen = false;
  
  constructor( private commonServ : CommonService, private route: ActivatedRoute,) { }

  ngOnInit() {
    this.storyDetailFun();

    this.commonServ.storyItem({},1,11);
    
    // this.commonServ.storylist().subscribe( 
    //   data => {this.storyList = data; console.log(data)},
    //   error => console.log(error)
    // );

    // this.route.queryParams.subscribe(queryParams => {
    //   // do something with the query params
    // });
    this.route.params.subscribe(routeParams => {
      this.storyDetailFun();
      window.scroll(0,0);
    });
  }

  toggle=()=> this.isOpen = !this.isOpen;

  storyDetailFun(){
    this.commonServ.storydetail(this.route.snapshot.paramMap.get('id')).subscribe( 
      data => {this.storyDetail = data; console.log(data)},
      error => console.log(error)
    );
  }
}
