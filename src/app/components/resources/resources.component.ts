import { Component, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddResourceModalComponent } from '../../dialogs/add-resource-modal/add-resource-modal.component';
import { ApiService } from '../../api.service';
import { SafeUrlPipe } from './safeUrl.pipe';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatExpansionModule, MatIconModule, MatTooltipModule, MatDividerModule, MatDialogModule, SafeUrlPipe, FlexLayoutServerModule, FlexLayoutModule,SlickCarouselModule],
  templateUrl: './resources.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './resources.component.css',
})
export class ResourcesComponent {

  public dialog = inject(MatDialog)
  slideIndex = 1;
  buildings: any[] = [];
  currentBuildingIndex = 0;
  carouselConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    dots: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: true
        }
      }
    ]
  };


  showBuilding(index: number): void {
    this.currentBuildingIndex = index;
  }

  nextBuilding(): void {
    this.currentBuildingIndex = (this.currentBuildingIndex + 1) % this.buildings.length;
  }

  prevBuilding(): void {
    this.currentBuildingIndex = (this.currentBuildingIndex - 1 + this.buildings.length) % this.buildings.length;
  }

  constructor(private apiService: ApiService) {

  }
  
  ngOnInit() {
    this.getBuildigs()
  }

  getBuildigs() {
    this.apiService.getBuildings().subscribe((res: any) => {
      this.buildings = res
      this.getImage(res)
      console.log(res)
    })
  }

  getImage(data) {
    data.forEach(element => {
      var imgUrl: string = element.build_img_url;
      imgUrl = imgUrl.slice(1, imgUrl.length)
      this.apiService.getCampusImage({ 'image_filename': imgUrl }).subscribe((res: any) => {
        let blob = new Blob([res], { type: res.type });
        let url = URL.createObjectURL(blob)
        element.image = url;
        this.showBuilding(this.slideIndex);
      })
    });
  }
 
  
  plusSlides(n) {
    if(n>this.slideIndex){
      this.nextBuilding();
    }else{
      this.prevBuilding()
    }
    
  }


  showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides") as any;
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { this.slideIndex = 1 }
    if (n < 1) { this.slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[this.slideIndex - 1].style.display = "block";
    dots[this.slideIndex - 1].className += " active";
  }
}
