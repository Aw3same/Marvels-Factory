import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdateHeroComponent } from './modal-update-hero.component';

describe('ModalUpdateHeroComponent', () => {
  let component: ModalUpdateHeroComponent;
  let fixture: ComponentFixture<ModalUpdateHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalUpdateHeroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalUpdateHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
