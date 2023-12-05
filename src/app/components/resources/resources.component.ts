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

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatExpansionModule, MatIconModule, MatTooltipModule, MatDividerModule, MatDialogModule],
  templateUrl: './resources.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './resources.component.css',
})
export class ResourcesComponent {

  public dialog = inject(MatDialog)

  rTypeData = ['General Information', 'Academic Resources', 'Important Policies', 'Student Life', 'Computing & Technology', 'Getting Around', 'Campus Resources', 'Administrative Services']
  rDetailData = [{
    heading: 'Shiba Inu',
    tags: 'Dog Breed',
    details: `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
    from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
    originally bred for hunting.`
  }, {
    heading: 'Shiba Inu',
    tags: 'Dog Breed',
    details: `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
    from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
    originally bred for hunting.`
  }]

  addResource() {
    this.dialog.open(AddResourceModalComponent, {
      width: '600px',
      maxHeight: '500px'
    });
  }

}
