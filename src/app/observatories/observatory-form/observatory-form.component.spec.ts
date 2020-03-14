import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ObservatoryFormComponent } from './observatory-form.component';
import { By } from '@angular/platform-browser';
import { ControlsModule } from '../../controls/controls.module';
import { ObservatoryParsed } from '@core/services';

describe('ObservatoryFormComponent', () => {
  let component: ObservatoryFormComponent;
  let fixture: ComponentFixture<ObservatoryFormComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ControlsModule ],
      schemas: [ NO_ERRORS_SCHEMA ],
      declarations: [ ObservatoryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservatoryFormComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update model', () => {
    expect(component).toBeTruthy();

    const observatoryIn: ObservatoryParsed = {
      id: -1,
      name: 'Bortle 5',
      bortleClass: '5',
      skyBrightness: 20.02
    };

    const inputs = el.queryAll(By.css('.input'));
    expect(inputs.length).toBe(3, 'Unexpected number of inputs');

    let input = inputs[0].nativeElement;
    input.value = observatoryIn.name;
    input.dispatchEvent(new Event('input'));

    input = inputs[1].nativeElement;
    input.value = observatoryIn.bortleClass;
    input.dispatchEvent(new Event('input'));

    input = inputs[2].nativeElement;
    input.value = observatoryIn.skyBrightness;
    input.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.observatoryForm.valid).toBeTruthy('Expected form to be valid');

    const observatoryOut: ObservatoryParsed = {
      id: -1,
      name: component.observatoryForm.get('name').value,
      bortleClass: component.observatoryForm.get('bortleClass').value,
      skyBrightness: component.observatoryForm.get('skyBrightness').value
    };

    expect(observatoryOut.name).toBe(observatoryIn.name);
    expect(observatoryOut.bortleClass).toBe(observatoryIn.bortleClass);
    expect(observatoryOut.skyBrightness).toBe(observatoryIn.skyBrightness);
  });

});
