import { InputNumberComponent } from './input-number/input-number.component';
import { InputTextComponent } from './input-text/input-text.component';
import { LatitudeComponent} from './latitude/latitude.component';
import { LongitudeComponent } from './longitude/longitude.component';
import { RightAscensionComponent } from './right-ascension/right-ascension.component';
import { DeclinationComponent } from './declination/declination.component';

export const components: any[] = [
    InputNumberComponent,
    InputTextComponent,
    LatitudeComponent,
    LongitudeComponent,
    RightAscensionComponent,
    DeclinationComponent
];

export * from './input-number/input-number.component';
export * from './input-text/input-text.component';
export * from './latitude/latitude.component';
export * from './longitude/longitude.component';
export * from './right-ascension/right-ascension.component';
export * from './declination/declination.component';
