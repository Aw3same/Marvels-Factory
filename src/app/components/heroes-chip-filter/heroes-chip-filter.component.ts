import { COMMA, ENTER } from '@angular/cdk/keycodes'
import {
  Component,
  EventEmitter,
  Output,
  inject,
} from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {
  MatAutocompleteModule,
} from '@angular/material/autocomplete'
import {
  MatChipEditedEvent,
  MatChipInputEvent,
  MatChipsModule,
} from '@angular/material/chips'
import { MatIconModule } from '@angular/material/icon'
import { AsyncPipe } from '@angular/common'
import { MatFormFieldModule } from '@angular/material/form-field'
import { LiveAnnouncer } from '@angular/cdk/a11y'


@Component({
  selector: 'heroes-chip-filter',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  template: `
    <mat-form-field class="chip-filter-list">
      <mat-label>Search your heroe</mat-label>
      <mat-chip-grid #chipGrid aria-label="Enter heros">
        @for (hero of heros; track hero) {
          <mat-chip-row
            (removed)="remove(hero)"
            [editable]="true"
            (edited)="edit(hero, $event)"
            [aria-description]="'press enter to edit ' + hero">
            {{ hero }}
            <button matChipRemove [attr.aria-label]="'remove ' + hero">
              <mat-icon>cancel</mat-icon>
            </button>
          </mat-chip-row>
        }
        <input
          placeholder="New hero..."
          [matChipInputFor]="chipGrid"
          [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
          [matChipInputAddOnBlur]="true"
          (matChipInputTokenEnd)="add($event)" />
      </mat-chip-grid>
    </mat-form-field>
  `,
  styleUrl: './heroes-chip-filter.component.css',
})
export class HeroesChipFilterComponent {
  @Output() heroesSelected = new EventEmitter<string[]>()
  separatorKeysCodes: number[] = [ENTER, COMMA]
  heros: string[] = []

  announcer = inject(LiveAnnouncer)

  constructor() {}

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim()

    // Add our hero
    if (value) {
      this.heros.push(value)
    }

    // Clear the input value
    event.chipInput!.clear()

    this.heroesSelected.emit(this.heros)
  }

  remove(hero: string): void {
    const index = this.heros.indexOf(hero)

    if (index >= 0) {
      this.heros.splice(index, 1)

      this.announcer.announce(`Removed ${hero}`)
    }

    this.heroesSelected.emit(this.heros)

  }

  edit(hero: string, event: MatChipEditedEvent) {
    const value = event.value.trim()

    // Remove hero if it no longer has a name
    if (!value) {
      this.remove(hero)
      return
    }

    // Edit existing hero
    const index = this.heros.indexOf(hero)
    if (index >= 0) {
      this.heros[index] = value
    }

    this.heroesSelected.emit(this.heros)

  }
}
