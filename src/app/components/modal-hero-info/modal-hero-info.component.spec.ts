import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHeroInfoComponent } from './modal-hero-info.component';

describe('ModalHeroInfoComponent', () => {
  let component: ModalHeroInfoComponent;
  let fixture: ComponentFixture<ModalHeroInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalHeroInfoComponent]
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
