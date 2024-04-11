import { Component, EventEmitter, Input, Output } from '@angular/core'
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { Hero } from '../../types/hero'

interface NewHero {
  name: FormControl<string>
  gender: FormControl<string>
  citizenship: FormControl<string>
  skills: FormControl<string>
  occupation: FormControl<string>
  memberOf: FormControl<string>
  creator: FormControl<string>
}
@Component({
  selector: 'hero-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.css',
})
export class HeroFormComponent {
  @Input() set heroInformation(hero: Hero | undefined) {
    if (hero) {
      this.heroForm.setValue({
        name: hero.nameLabel,
        gender: hero.genderLabel,
        citizenship: hero.citizenshipLabel,
        skills: hero.skillsLabel,
        occupation: hero.occupationLabel,
        memberOf: hero.memberOfLabel,
        creator: hero.creatorLabel,
      })
      this.buttonLabel = 'Update'
    }
  }

  @Output() hero = new EventEmitter<Hero>()

  buttonLabel = 'Create'

  heroForm = new FormGroup<NewHero>({
    name: new FormControl(this.heroInformation?.nameLabel || '', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    gender: new FormControl(this.heroInformation?.genderLabel || '', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    citizenship: new FormControl(this.heroInformation?.citizenshipLabel || '', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    skills: new FormControl(this.heroInformation?.skillsLabel || '', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    occupation: new FormControl(this.heroInformation?.occupationLabel || '', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    memberOf: new FormControl(this.heroInformation?.memberOfLabel || '', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    creator: new FormControl(this.heroInformation?.creatorLabel || '', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  })

  onSubmit() {
    if (!this.heroForm.valid) {
      return
    }

    const heroInformation: Hero = {
      nameLabel: this.heroForm.get('name')?.value ?? '',
      genderLabel: this.heroForm.get('gender')?.value ?? '',
      citizenshipLabel: this.heroForm.get('citizenship')?.value ?? '',
      skillsLabel: this.heroForm.get('skills')?.value ?? '',
      occupationLabel: this.heroForm.get('occupation')?.value ?? '',
      memberOfLabel: this.heroForm.get('memberOf')?.value ?? '',
      creatorLabel: this.heroForm.get('creator')?.value ?? '',
    }
    this.hero.emit(heroInformation)
  }
}
