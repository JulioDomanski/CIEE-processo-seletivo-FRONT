import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Curriculos } from './curriculos';

describe('Curriculos', () => {
  let component: Curriculos;
  let fixture: ComponentFixture<Curriculos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Curriculos],
    }).compileComponents();

    fixture = TestBed.createComponent(Curriculos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
