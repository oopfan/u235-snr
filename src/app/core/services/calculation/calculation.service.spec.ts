import { TestBed } from '@angular/core/testing';

import { CalculationService } from './calculation.service';
import { TargetParsed } from '../user-target/user-target.service';
import { TelescopeParsed } from '../user-telescope/user-telescope.service';
import { CameraParsed } from '../user-camera/user-camera.service';
import { ObservatoryParsed } from '../user-observatory/user-observatory.service';

function createTarget(surfaceBrightness: number): TargetParsed {
  return {
    id: 0,
    name: 'n/a',
    surfaceBrightness
  };
}

function createTelescope(aperture: number, focalLength: number, centralObstruction: number, totalReflectanceTransmittance: number): TelescopeParsed {
  return {
    id: 0,
    name: 'n/a',
    aperture,
    focalLength,
    centralObstruction,
    totalReflectanceTransmittance
  };
}

function createCamera(pixelSize: number, readNoise: number, darkCurrent: number, quantumEfficiency: number): CameraParsed {
  return {
    id: 0,
    name: 'n/a',
    pixelSize,
    readNoise,
    darkCurrent,
    quantumEfficiency
  };
}

function createObservatory(skyBrightness: number): ObservatoryParsed {
  return {
    id: 0,
    name: 'n/a',
    bortleClass: 'n/a',
    skyBrightness
  };
}

describe('CalculationService', () => {
  const M51 = createTarget(21.7);
  const WO71 = createTelescope(71, 418, 0, 0.99);
  const A314E = createCamera(4.65, 5.3, 0, 43);
  const Bortle5 = createObservatory(20.02);

  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalculationService = TestBed.get(CalculationService);
    expect(service).toBeTruthy();
  });

  it('should calculate SNR 14.85 for M51, WO71, A314E, Bortle5, 2.5h, 180s', () => {
    const service: CalculationService = TestBed.get(CalculationService);
    const result = service.calculateSNR(M51, WO71, A314E, Bortle5, 2.5, 180);
    expect(result.totalSignalToNoiseOfStack).toBeCloseTo(14.85, 2);
  });

  it('should calculate 7.09h for M51, WO71, A314E, Bortle5, SNR 25, 180s', () => {
    const service: CalculationService = TestBed.get(CalculationService);
    const result = service.calculateFC(M51, WO71, A314E, Bortle5, 25, 180);
    expect(result.totalIntegrationTime).toBeCloseTo(7.09, 2);
  });

});
