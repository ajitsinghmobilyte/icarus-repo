import { Component, OnInit,  Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-story-poster-item',
  templateUrl: './story-poster-item.component.html',
  styleUrls: ['./story-poster-item.component.scss']
})
export class StoryPosterItemComponent implements OnInit {
  @Input() data: any;
  private show:any;
  
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {}

  // urlcorrect(val){
  //   console.log(val)
  //   console.log('after encode',encodeURI(val))
  //   let url = encodeURI(val);
  //   // return url.trim();
  //   return val;
  // }

  showPlayer=(id)=>  {this.show = id; }
  hidePlayer=()=> {
    this.show = false;
    if((<any>window).player !== "undefined") 
    (<any>window).player.audio.Pause();
  }
}