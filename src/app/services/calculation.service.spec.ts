import { TestBed } from '@angular/core/testing';

import { CalculationService } from './calculation.service';

interface TargetParsed {
  id: number,
  name: string,
  surfaceBrightness: number
}

function createTarget(surfaceBrightness: number): TargetParsed {
  return {
    id: 0,
    name: 'n/a',
    surfaceBrightness
  };
}

interface TelescopeParsed {
  id: number,
  name: string,
  aperture: number,
  focalLength: number,
  centralObstruction: number,
  totalReflectanceTransmittance: number
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

interface CameraParsed {
  id: number,
  name: string,
  pixelSize: number,
  readNoise: number,
  darkCurrent: number,
  quantumEfficiency: number
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

interface ObservatoryParsed {
  id: number,
  name: string,
  bortleClass: string,
  skyBrightness: number
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

  it('should have correct SNR for M51, WO71, A314E, Bortle5, 2.5TIT, 180s', () => {
    const service: CalculationService = TestBed.get(CalculationService);
    const result = service.calculateSNR(M51, WO71, A314E, Bortle5, 2.5, 180);
    expect(result.totalSignalToNoiseOfStack).toBeCloseTo(14.85, 2);
  });

});
