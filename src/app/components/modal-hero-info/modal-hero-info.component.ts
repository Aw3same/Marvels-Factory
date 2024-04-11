import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { Hero } from '../../types/hero'

@Component({
  selector: 'modal-hero-info',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './modal-hero-info.component.html',
  styleUrl: './modal-hero-info.component.css',
})
export class ModalHeroInfoComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Hero) {}
}
