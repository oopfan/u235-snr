import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  constructor() { }

  calculateFC(targetObj: any, telescopeObj: any, cameraObj: any, observatoryObj: any, totalSignalToNoiseOfStack: any, singleSubExposure: any) {
    let totalIntegrationTime = 0;
    let result = this.calculateSNR(targetObj,telescopeObj, cameraObj, observatoryObj, totalIntegrationTime, singleSubExposure);
    let error1 = result.totalSignalToNoiseOfStack - totalSignalToNoiseOfStack;
    console.log(error1);
    let endpointA = totalIntegrationTime;
    
    totalIntegrationTime = 200;   // Double of max value of number input control
    result = this.calculateSNR(targetObj,telescopeObj, cameraObj, observatoryObj, totalIntegrationTime, singleSubExposure);
    let error2 = result.totalSignalToNoiseOfStack - totalSignalToNoiseOfStack;
    console.log(error2);
    let endpointB = totalIntegrationTime;

    if (Math.sign(error1) == Math.sign(error2)) {
      console.log(`Could not find suitable endpoint for desired SNR: ${totalSignalToNoiseOfStack}`);
      console.log(`Endpoint SNR: ${result.totalSignalToNoiseOfStack}`);
      return { totalIntegrationTime: Number.NaN, numberOfSubs: Number.NaN };
    }

    let errorA = error1;
    const tolerance = 0.01;
    const maxIterations = 100;

    let N = 1;
    while (N <= maxIterations) {
      let midpointC = (endpointA + endpointB) / 2;
      console.log(`Midpoint C: ${midpointC}`);
      const result = this.calculateSNR(targetObj,telescopeObj, cameraObj, observatoryObj, midpointC, singleSubExposure);
      let errorC = result.totalSignalToNoiseOfStack - totalSignalToNoiseOfStack;
      console.log(errorC);
      if (errorC == 0 || (endpointB - endpointA) / 2 < tolerance) {
        console.log(`Solution found after ${N} iterations.`);
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

    console.log(`Failed to find a solution in ${maxIterations} iterations.`);
    return { totalIntegrationTime: Number.NaN, numberOfSubs: Number.NaN };
  }

  calculateSNR(targetObj: any, telescopeObj: any, cameraObj: any, observatoryObj: any, totalIntegrationTime: any, singleSubExposure: any) {
    const totalExposureSeconds = totalIntegrationTime * 3600;
    const numberOfSubs = totalExposureSeconds / singleSubExposure;
    const clearApertureEquivalent = (telescopeObj.aperture * telescopeObj.aperture - telescopeObj.centralObstruction * telescopeObj.centralObstruction) * Math.PI * telescopeObj.totalReflectanceTransmittance / 400;
    const imageResolution = 206.3 * cameraObj.pixelSize / telescopeObj.focalLength;
    const pixelSurface = imageResolution * imageResolution;
    const skyElectronsPerSecond = clearApertureEquivalent * 880000 / Math.pow(2.515, observatoryObj.skyBrightness) * pixelSurface * cameraObj.quantumEfficiency / 100;
    const skyElectronsPerSub = skyElectronsPerSecond * singleSubExposure;
    const skyNoise = Math.sqrt(skyElectronsPerSub);
    const targetElectronsPerSecond = clearApertureEquivalent * 880000 / Math.pow(2.515, targetObj.surfaceBrightness) * pixelSurface * cameraObj.quantumEfficiency / 100;
    const targetElectronsPerSub = targetElectronsPerSecond * singleSubExposure;
    const shotNoise = Math.sqrt(targetElectronsPerSub);
    const darkSignalPerSub = cameraObj.darkCurrent * singleSubExposure;
    const darkNoise = Math.sqrt(darkSignalPerSub);
    const totalSignalPerSub = targetElectronsPerSub + skyElectronsPerSub + darkSignalPerSub;
    const totalNoisePerSub = Math.sqrt(cameraObj.readNoise * cameraObj.readNoise + shotNoise * shotNoise + skyNoise * skyNoise + darkNoise * darkNoise);
    const signalToNoisePerSub = targetElectronsPerSub / totalNoisePerSub;
    const totalSignalToNoiseOfStack = signalToNoisePerSub * Math.sqrt(numberOfSubs);
    /*
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
    return { totalSignalToNoiseOfStack, numberOfSubs };
  }
}
