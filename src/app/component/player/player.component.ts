import { Component, OnInit,  Input } from '@angular/core';
declare var IcarusAudioPlayer: any;

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @Input() data: any;
  
  constructor() {}
  ngOnInit() {
    var optionItem		 = null;
		var optionPathTag    = null;
		var optionPathAudio  = null;
		var optionPathPoster = null;
		var optionScheme 	 = "default";
    var optionDisplayName= "Untitled";
    
      console.log(this.data)
      optionItem		   = "example1";
      // optionPathTag     = "../fable.mobilytedev.com/upload/storyAudio/"+this.data._id+'/'+this.data.audioName;

      optionPathTag    = "../"+this.data.audio.replace(/^https?:\/\//,'');

			optionPathAudio  = this.data.audio; //"https://sample-videos.com/audio/mp3/crowd-cheering.mp3?";
      optionPathPoster = this.data.posterImage;
      optionDisplayName = "The story of the most interesting man in the world";

    console.log(optionItem && optionPathTag && optionPathAudio && optionPathPoster && optionScheme )
    if( optionItem && optionPathTag && optionPathAudio && optionPathPoster && optionScheme )
      (<any>window).player = new IcarusAudioPlayer(document.querySelector(".playerContainer"), optionPathTag, optionPathAudio, "assets/js/assets/", optionItem, this.InIframe()? optionPathPoster : null, optionDisplayName);

  }

  play(){ console.log('play') }
  share(){ console.log('share') }
  InIframe()
  {
    console.log(window.self  !==  window.top)
      try { return false/*window.self !== window.top;*/ } 
      catch(e) { 
        console.log(e)
        return true; 
      }
  }

}
