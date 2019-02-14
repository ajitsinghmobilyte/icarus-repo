import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators , FormBuilder, FormArray} from '@angular/forms';
import { trigger, state, style, animate, transition, } from '@angular/animations';
import { CommonService } from '../../service/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
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
export class HeaderComponent implements OnInit {
  showSubmenu:any = false;
  private genres:any;
  private filterData:any;
  private storyList:any;

  constructor(private commonServ : CommonService, fb: FormBuilder) {
    this.filterData = fb.group({
      name:[''],
      ratings: [''],
      videoDuration: [''],
      allgenre:false,
      gen: fb.array([])
    });
  }

  ngOnInit() {
    this.commonServ.genreslist().subscribe( 
        data => this.genres = data,
        error => console.log(error)
    );

    // this.commonServ.storylist().subscribe(
    //   data => {this.storyList = data; console.log(data)},
    //   error => console.log(error)
    // );
  }

  toggle=()=> this.showSubmenu = !this.showSubmenu;

  filterFun=()=>{
    console.log(this.filterData.value);
    this.search();
    // this.commonServ.storyItem(this.filterData.value, 1, 10);
  }

 addGen(name:string, isChecked: boolean) {
    const arrayGen = <FormArray>this.filterData.controls.gen;
    if(isChecked) {
      arrayGen.push(new FormControl(name));
    } else {
      let index = arrayGen.controls.findIndex(x => x.value == name)
      arrayGen.removeAt(index);
    }    
    if(this.filterData.controls.gen.length < this.genres.category.length)
      {
        this.filterData.value.allgenre = false;
      }
  }

  clearfield(val){
    // if(!val)
      this.filterData.value.gen = {}
      this.filterData.controls.gen.value = {}
  }

  search=()=>{
    this.commonServ.storyItem(this.filterData.value, 1, 11);
  }

  clearFilter(){
    // console.log('dsasfsdaf')
    this.filterData.controls.name.value = '';
    this.filterData.controls.ratings.value = '';
    this.filterData.controls.videoDuration.value = '';
    this.filterData.controls.allgenre.value = false;    
    this.filterData.controls.gen.value = {};
    this.toggle;
  }

}
