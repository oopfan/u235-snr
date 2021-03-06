import { Injectable } from '@angular/core';
import { TargetParsed } from '../user-target/user-target.service';
import { TelescopeParsed } from '../user-telescope/user-telescope.service';
import { CameraParsed } from '../user-camera/user-camera.service';
import { ObservatoryParsed } from '../user-observatory/user-observatory.service';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  constructor() { }

  calculateFC(targetObj: TargetParsed, telescopeObj: TelescopeParsed, cameraObj: CameraParsed, observatoryObj: ObservatoryParsed, totalSignalToNoiseOfStack: any, singleSubExposure: any) {
    let totalIntegrationTime = 0;
    let result = this.calculateSNR(targetObj, telescopeObj, cameraObj, observatoryObj, totalIntegrationTime, singleSubExposure);
    let error1 = result.totalSignalToNoiseOfStack - totalSignalToNoiseOfStack;
    //console.log(error1);
    let endpointA = totalIntegrationTime;
    
    totalIntegrationTime = 1000;
    result = this.calculateSNR(targetObj,telescopeObj, cameraObj, observatoryObj, totalIntegrationTime, singleSubExposure);
    let error2 = result.totalSignalToNoiseOfStack - totalSignalToNoiseOfStack;
    //console.log(error2);
    let endpointB = totalIntegrationTime;

    if (Math.sign(error1) == Math.sign(error2)) {
      //console.error(`Could not find suitable endpoint for desired SNR: ${totalSignalToNoiseOfStack}`);
      //console.error(`Endpoint SNR: ${result.totalSignalToNoiseOfStack}`);
      return { totalIntegrationTime: Number.NaN, numberOfSubs: Number.NaN };
    }

    let errorA = error1;
    const tolerance = 0.01;
    const maxIterations = 100;

    let N = 1;
    while (N <= maxIterations) {
      let midpointC = (endpointA + endpointB) / 2;
      //console.log(`Midpoint C: ${midpointC}`);
      const result = this.calculateSNR(targetObj,telescopeObj, cameraObj, observatoryObj, midpointC, singleSubExposure);
      let errorC = result.totalSignalToNoiseOfStack - totalSignalToNoiseOfStack;
      //console.log(errorC);
      if (errorC == 0 || (endpointB - endpointA) / 2 < tolerance) {
        //console.log(`Solution found after ${N} iterations.`);
        return { totalIntegrationTime: midpointC, numberOfSubs: result.numberOfSubs };
      }
      N++;
      if (Math.sign(errorC) == Math.sign(errorA)) {
        endpointA = midpointC;
      }
      else {
        endpointB = midpointC;
      }
    }

    console.error(`Failed to find a solution in ${maxIterations} iterations.`);
    return { totalIntegrationTime: Number.NaN, numberOfSubs: Number.NaN };
  }

  calculateSnrPerSub(
    filter: string,
    redBalance: number,
    greenBalance: number,
    blueBalance: number,
    redExtinction: number,
    greenExtinction: number,
    blueExtinction: number,
    binning: number,
    singleSubExposure: number,
    targetObj: TargetParsed,
    telescopeObj: TelescopeParsed,
    cameraObj: CameraParsed,
    observatoryObj: ObservatoryParsed) {

    const mag0flux = 879000;  // photons per second per cm^2 of magnitude 0 standard star
    const oneThird = 1 / 3;
    let fluxAttenuation = 0.0000001;

    if (filter === 'L') {
      fluxAttenuation = oneThird / (1 / (1 / redBalance + 1 / greenBalance + 1 / blueBalance)) / Math.pow((redExtinction * greenExtinction * blueExtinction), oneThird);
    }
    if (filter === 'R') {
      fluxAttenuation = oneThird / redBalance / redExtinction;
    }
    if (filter === 'G') {
      fluxAttenuation = oneThird / greenBalance / greenExtinction;
    }
    if (filter === 'B') {
      fluxAttenuation = oneThird / blueBalance / blueExtinction;
    }

    const clearApertureEquivalent = (telescopeObj.aperture * telescopeObj.aperture - telescopeObj.centralObstruction * telescopeObj.centralObstruction) * Math.PI * telescopeObj.totalReflectanceTransmittance / 400;
    const imageResolution = 206.3 * cameraObj.pixelSize * binning / telescopeObj.focalLength;
    const pixelSurface = imageResolution * imageResolution;
    const skyElectronsPerSecond = clearApertureEquivalent * mag0flux * fluxAttenuation / Math.pow(10, 0.4 * observatoryObj.skyBrightness) * pixelSurface * cameraObj.quantumEfficiency / 100;
    const skyElectronsPerSub = skyElectronsPerSecond * singleSubExposure;
    const skyNoise = Math.sqrt(skyElectronsPerSub);
    const targetElectronsPerSecond = clearApertureEquivalent * mag0flux * fluxAttenuation / Math.pow(10, 0.4 * targetObj.surfaceBrightness) * pixelSurface * cameraObj.quantumEfficiency / 100;
    const targetElectronsPerSub = targetElectronsPerSecond * singleSubExposure;
    const shotNoise = Math.sqrt(targetElectronsPerSub);
    const darkSignalPerSub = cameraObj.darkCurrent * singleSubExposure;
    const darkNoise = Math.sqrt(darkSignalPerSub);
    const totalSignalPerSub = targetElectronsPerSub + skyElectronsPerSub + darkSignalPerSub;
    const totalNoisePerSub = Math.sqrt(cameraObj.readNoise * cameraObj.readNoise + shotNoise * shotNoise + skyNoise * skyNoise + darkNoise * darkNoise);
    const signalToNoisePerSub = targetElectronsPerSub / totalNoisePerSub;

    return signalToNoisePerSub;
  }

  calculateSNR(targetObj: TargetParsed, telescopeObj: TelescopeParsed, cameraObj: CameraParsed, observatoryObj: ObservatoryParsed, totalIntegrationTime: any, singleSubExposure: any) {
    const mag0flux = 879000;  // photons per second per cm^2 of magnitude 0 standard star
    const totalExposureSeconds = totalIntegrationTime * 3600;
    const numberOfSubs = totalExposureSeconds / singleSubExposure;
    const clearApertureEquivalent = (telescopeObj.aperture * telescopeObj.aperture - telescopeObj.centralObstruction * telescopeObj.centralObstruction) * Math.PI * telescopeObj.totalReflectanceTransmittance / 400;
    const imageResolution = 206.3 * cameraObj.pixelSize / telescopeObj.focalLength;
    const pixelSurface = imageResolution * imageResolution;
    const skyElectronsPerSecond = clearApertureEquivalent * mag0flux / Math.pow(10, 0.4 * observatoryObj.skyBrightness) * pixelSurface * cameraObj.quantumEfficiency / 100;
    const skyElectronsPerSub = skyElectronsPerSecond * singleSubExposure;
    const skyNoise = Math.sqrt(skyElectronsPerSub);
    const targetElectronsPerSecond = clearApertureEquivalent * mag0flux / Math.pow(10, 0.4 * targetObj.surfaceBrightness) * pixelSurface * cameraObj.quantumEfficiency / 100;
    const targetElectronsPerSub = targetElectronsPerSecond * singleSubExposure;
    const shotNoise = Math.sqrt(targetElectronsPerSub);
    const darkSignalPerSub = cameraObj.darkCurrent * singleSubExposure;
    const darkNoise = Math.sqrt(darkSignalPerSub);
    const totalSignalPerSub = targetElectronsPerSub + skyElectronsPerSub + darkSignalPerSub;
    const totalNoisePerSub = Math.sqrt(cameraObj.readNoise * cameraObj.readNoise + shotNoise * shotNoise + skyNoise * skyNoise + darkNoise * darkNoise);
    const signalToNoisePerSub = targetElectronsPerSub / totalNoisePerSub;
    const totalSignalToNoiseOfStack = signalToNoisePerSub * Math.sqrt(numberOfSubs);
    return { totalSignalToNoiseOfStack, numberOfSubs };

    /*
    console.log('Target', targetObj);
    console.log('Telescope', telescopeObj);
    console.log('Camera', cameraObj);
    console.log('Observatory', observatoryObj);
    console.log(`\nTarget: ${targetObj.name}`);
    console.log(`Telescope: ${telescopeObj.name}`);
    console.log(`Camera: ${cameraObj.name}`);
    console.log(`Observatory: ${observatoryObj.name}`);
    console.log(`Total Integration Time: ${totalIntegrationTime}`);
    console.log(`Single Sub Exposure: ${singleSubExposure}`);
    console.log(`Total exposure(s): ${totalExposureSeconds}`);
    console.log(`Number of subs: ${numberOfSubs}`);
    console.log(`Clear aperture equivalent(cm^2): ${clearApertureEquivalent}`);
    console.log(`Image resolution(arcsec/pixel): ${imageResolution}`);
    console.log(`Pixel surface(arcsec^2/pixel): ${pixelSurface}`);
    console.log(`Sky signal(e-/s): ${skyElectronsPerSecond}`);
    console.log(`Sky signal(e-/sub): ${skyElectronsPerSub}`);
    console.log(`Sky noise(e-): ${skyNoise}`);
    console.log(`Target signal(e-/s): ${targetElectronsPerSecond}`);
    console.log(`Target signal(e-/sub): ${targetElectronsPerSub}`);
    console.log(`Shot noise(e-): ${shotNoise}`);
    console.log(`Dark signal(e-/sub): ${darkSignalPerSub}`);
    console.log(`Dark noise(e-): ${darkNoise}`);
    console.log(`Total signal(e-/sub): ${totalSignalPerSub}`);
    console.log(`Total noise(e-/sub): ${totalNoisePerSub}`);
    console.log(`Signal-to-noise per sub: ${signalToNoisePerSub}`);
    console.log(`Total signal-to-noise of stack: ${totalSignalToNoiseOfStack}`);
    */
  }
}
