import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoryPosterItemComponent } from './story-poster-item/story-poster-item.component';
import { RouterModule, Routes } from '@angular/router';
import { PlayerComponent } from './player/player.component';

@NgModule({
  declarations: [ StoryPosterItemComponent, PlayerComponent],
  exports: [StoryPosterItemComponent],
  imports: [
    CommonModule, RouterModule
  ]
})
export class ComponentModule { }
