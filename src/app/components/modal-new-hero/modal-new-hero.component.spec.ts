import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNewHeroComponent } from './modal-new-hero.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { HeroesService } from '../../services/heroes.service';
import { HeroFormComponent } from '../hero-form/hero-form.component';

describe('ModalNewHeroComponent', () => {
  let component: ModalNewHeroComponent;
  let fixture: ComponentFixture<ModalNewHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalNewHeroComponent, MatDialogModule, MatButtonModule, HeroFormComponent, HttpClientModule, MatDialogModule],
      providers: [HeroesService],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalNewHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
