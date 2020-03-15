import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TelescopeFormComponent } from './telescope-form.component';
import { By } from '@angular/platform-browser';
import { SharedModule } from '@shared/shared.module';
import { TelescopeParsed } from '@core/services';

describe('TelescopeFormComponent', () => {
  let component: TelescopeFormComponent;
  let fixture: ComponentFixture<TelescopeFormComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ SharedModule ],
      schemas: [ NO_ERRORS_SCHEMA ],
      declarations: [ TelescopeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelescopeFormComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update model', () => {
    expect(component).toBeTruthy();

    const telescopeIn: TelescopeParsed = {
      id: -1,
      name: 'William Optics ZenithStar 71',
      aperture: 71,
      focalLength: 418,
      centralObstruction: 0,
      totalReflectanceTransmittance: 0.99
    };

    const inputs = el.queryAll(By.css('.input'));
    expect(inputs.length).toBe(5, 'Unexpected number of inputs');

    let input = inputs[0].nativeElement;
    input.value = telescopeIn.name;
    input.dispatchEvent(new Event('input'));

    input = inputs[1].nativeElement;
    input.value = telescopeIn.aperture;
    input.dispatchEvent(new Event('input'));

    input = inputs[2].nativeElement;
    input.value = telescopeIn.focalLength;
    input.dispatchEvent(new Event('input'));

    input = inputs[3].nativeElement;
    input.value = telescopeIn.centralObstruction;
    input.dispatchEvent(new Event('input'));

    input = inputs[4].nativeElement;
    input.value = telescopeIn.totalReflectanceTransmittance;
    input.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.telescopeForm.valid).toBeTruthy('Expected form to be valid');

    const telescopeOut: TelescopeParsed = {
      id: -1,
      name: component.telescopeForm.get('name').value,
      aperture: component.telescopeForm.get('aperture').value,
      focalLength: component.telescopeForm.get('focalLength').value,
      centralObstruction: component.telescopeForm.get('centralObstruction').value,
      totalReflectanceTransmittance: component.telescopeForm.get('totalReflectanceTransmittance').value
    };

    expect(telescopeOut.name).toBe(telescopeIn.name);
    expect(telescopeOut.aperture).toBe(telescopeIn.aperture);
    expect(telescopeOut.focalLength).toBe(telescopeIn.focalLength);
    expect(telescopeOut.centralObstruction).toBe(telescopeIn.centralObstruction);
    expect(telescopeOut.totalReflectanceTransmittance).toBe(telescopeIn.totalReflectanceTransmittance);
  });

});
