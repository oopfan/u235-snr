import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  constructor() { }

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
