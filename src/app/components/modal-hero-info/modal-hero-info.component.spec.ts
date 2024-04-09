import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHeroInfoComponent } from './modal-hero-info.component';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

describe('ModalHeroInfoComponent', () => {
  let component: ModalHeroInfoComponent;
  let fixture: ComponentFixture<ModalHeroInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalHeroInfoComponent, MatDialogModule, MatButtonModule],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} },]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalHeroInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
