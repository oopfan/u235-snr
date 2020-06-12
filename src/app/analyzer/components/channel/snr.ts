import { Observable, combineLatest, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const mag0flux = 879000;

function square(value: number): number {
    return value * value;
}

function squareRoot(value: number): number {
    return Math.sqrt(value);
}

export function colorFluxAttenuation([colorBalance, extinction]: number[]): number {
    return 1 / 3 / colorBalance / extinction;
}

export function luminanceFluxAttenuation([redFluxAttenuation, greenFluxAttenuation, blueFluxAttenuation]: number[]): number {
    return redFluxAttenuation + greenFluxAttenuation + blueFluxAttenuation;
}

function imageResolution([pixelSize, binning, focalLength]: number[]): number {
    return 206.3 * pixelSize * binning / focalLength;
}

function electronsPerSecond([clearApertureEquivalent, fluxAttenuation, brightness, pixelSurface, quantumEfficiency]: number[]): number {
    return clearApertureEquivalent * mag0flux * fluxAttenuation / Math.pow(10, 0.4 * brightness) * pixelSurface * quantumEfficiency / 100;
}

function totalNoise([readNoise, shotNoise, skyNoise, darkNoise]: number[]) : number {
    return Math.sqrt(readNoise * readNoise + shotNoise * shotNoise + skyNoise * skyNoise + darkNoise * darkNoise);
}

export class U235AstroSNR {
    // Inputs:
    fluxAttenuation$: Observable<number>;
    aperture$: Observable<number>;
    focalLength$: Observable<number>;
    centralObstruction$: Observable<number>;
    totalReflectanceTransmittance$: Observable<number>;
    pixelSize$: Observable<number>;
    binning$: Observable<number>;
    surfaceBrightness$: Observable<number>;
    readNoise$: Observable<number>;
    darkCurrent$: Observable<number>;
    quantumEfficiency$: Observable<number>;
    skyBrightness$: Observable<number>;
    exposure$: Observable<number>;

    // Outputs:
    clearApertureEquivalent$: Observable<number>;
    imageResolution$: Observable<number>;
    pixelSurface$: Observable<number>;
    targetElectronsPerSecond$: Observable<number>;
    targetElectronsPerSub$: Observable<number>;
    shotNoise$: Observable<number>;
    skyElectronsPerSecond$: Observable<number>;
    skyElectronsPerSub$: Observable<number>;
    skyNoise$: Observable<number>;
    darkSignalPerSub$: Observable<number>;
    darkNoise$: Observable<number>;
    totalNoisePerSub$: Observable<number>;
    signalToNoisePerSub$: Observable<number>;

    constructor() {
        const message = 'Please call init() before accessing calculated Observables';
        this.clearApertureEquivalent$ = throwError(new Error(message));
        this.imageResolution$ = throwError(new Error(message));
        this.pixelSurface$ = throwError(new Error(message));
        this.targetElectronsPerSecond$ = throwError(new Error(message));
        this.targetElectronsPerSub$ = throwError(new Error(message));
        this.shotNoise$ = throwError(new Error(message));
        this.skyElectronsPerSecond$ = throwError(new Error(message));
        this.skyElectronsPerSub$ = throwError(new Error(message));
        this.skyNoise$ = throwError(new Error(message));
        this.darkSignalPerSub$ = throwError(new Error(message));
        this.darkNoise$ = throwError(new Error(message));
        this.totalNoisePerSub$ = throwError(new Error(message));
        this.signalToNoisePerSub$ = throwError(new Error(message));
    }

    init() {
        if (this.aperture$ === undefined || this.centralObstruction$ === undefined || this.totalReflectanceTransmittance$ === undefined) {
            this.clearApertureEquivalent$ = throwError(new Error('Requires aperture$, centralObstruction$, and totalReflectanceTransmittance$'));
        }
        else {
            this.clearApertureEquivalent$ = combineLatest(
                this.aperture$,
                this.centralObstruction$,
                this.totalReflectanceTransmittance$
            ).pipe(
                map(([ap, co, trt]) => (ap * ap - co * co) * Math.PI * trt / 400)
            );
        }

        if (this.pixelSize$ === undefined || this.binning$ === undefined || this.focalLength$ === undefined) {
            this.imageResolution$ = throwError(new Error('Requires pixelSize$, binning$, and focalLength$'));
        }
        else {
            this.imageResolution$ = combineLatest(
                this.pixelSize$,
                this.binning$,
                this.focalLength$
            ).pipe(
                map(imageResolution)
            );
        }

        this.pixelSurface$ = this.imageResolution$.pipe(map(square));

        if (this.fluxAttenuation$ === undefined || this.surfaceBrightness$ === undefined || this.quantumEfficiency$ === undefined) {
            this.targetElectronsPerSecond$ = throwError(new Error('Requires fluxAttentuation$, surfaceBrightness$ and quantumEfficiency$'));
        }
        else {
            this.targetElectronsPerSecond$ = combineLatest(
                this.clearApertureEquivalent$,
                this.fluxAttenuation$,
                this.surfaceBrightness$,
                this.pixelSurface$,
                this.quantumEfficiency$
            ).pipe(
                map(electronsPerSecond)
            );
        }

        if (this.exposure$ === undefined) {
            this.targetElectronsPerSub$ = throwError(new Error('Requires exposure$'));
        }
        else {
            this.targetElectronsPerSub$ = combineLatest(
                this.targetElectronsPerSecond$,
                this.exposure$
            ).pipe(
                map(([electronsPerSecond, exposure]) => electronsPerSecond * exposure)
            );
        }

        this.shotNoise$ = this.targetElectronsPerSub$.pipe(map(squareRoot));

        if (this.fluxAttenuation$ === undefined || this.skyBrightness$ === undefined || this.quantumEfficiency$ === undefined) {
            this.skyElectronsPerSecond$ = throwError(new Error('Requires fluxAttentuation$, skyBrightness$ and quantumEfficiency$'));
        }
        else {
            this.skyElectronsPerSecond$ = combineLatest(
                this.clearApertureEquivalent$,
                this.fluxAttenuation$,
                this.skyBrightness$,
                this.pixelSurface$,
                this.quantumEfficiency$
            ).pipe(
                map(electronsPerSecond)
            );
        }

        if (this.exposure$ === undefined) {
            this.skyElectronsPerSub$ = throwError(new Error('Requires exposure$'));
        }
        else {
            this.skyElectronsPerSub$ = combineLatest(
                this.skyElectronsPerSecond$,
                this.exposure$
            ).pipe(
                map(([electronsPerSecond, exposure]) => electronsPerSecond * exposure)
            );
        }

        this.skyNoise$ = this.skyElectronsPerSub$.pipe(map(squareRoot));

        if (this.darkCurrent$ === undefined || this.exposure$ === undefined) {
            this.darkSignalPerSub$ = throwError(new Error('Requires darkCurrent$ and exposure$'));
        }
        else {
            this.darkSignalPerSub$ = combineLatest(
                this.darkCurrent$,
                this.exposure$
            ).pipe(
                map(([darkCurrent, exposure]) => darkCurrent * exposure)
            );
        }

        this.darkNoise$ = this.darkSignalPerSub$.pipe(map(squareRoot));

        if (this.readNoise$ === undefined) {
            this.totalNoisePerSub$ = throwError(new Error('Requires readNoise$'));
        }
        else {
            this.totalNoisePerSub$ = combineLatest(
                this.readNoise$,
                this.shotNoise$,
                this.skyNoise$,
                this.darkNoise$
            ).pipe(
                map(totalNoise)
            );
        }

        this.signalToNoisePerSub$ = combineLatest(
            this.targetElectronsPerSub$,
            this.totalNoisePerSub$
        ).pipe(
            map(([targetElectronsPerSub, totalNoisePerSub]) => targetElectronsPerSub / totalNoisePerSub)
        );

    }
}
