import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TargetFormComponent } from './target-form.component';
import { By } from '@angular/platform-browser';
import { SharedModule } from '@shared/shared.module';
import { TargetParsed } from '@core/services';

describe('TargetFormComponent', () => {
  let component: TargetFormComponent;
  let fixture: ComponentFixture<TargetFormComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ SharedModule ],
      schemas: [ NO_ERRORS_SCHEMA ],
      declarations: [ TargetFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetFormComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update model', () => {
    expect(component).toBeTruthy();

    const targetIn: TargetParsed = {
      id: -1,
      name: "M81 Bode's Galaxy",
      surfaceBrightness: 21.7
    };

    const inputs = el.queryAll(By.css('.input'));
    expect(inputs.length).toBe(2, 'Unexpected number of inputs');

    let input = inputs[0].nativeElement;
    input.value = targetIn.name;
    input.dispatchEvent(new Event('input'));

    input = inputs[1].nativeElement;
    input.value = targetIn.surfaceBrightness;
    input.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.targetForm.valid).toBeTruthy('Expected form to be valid');

    const targetOut: TargetParsed = {
      id: -1,
      name: component.targetForm.get('name').value,
      surfaceBrightness: component.targetForm.get('surfaceBrightness').value
    };

    expect(targetOut.name).toBe(targetIn.name);
    expect(targetOut.surfaceBrightness).toBe(targetIn.surfaceBrightness);
  });

});
