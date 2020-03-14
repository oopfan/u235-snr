import { CalculationService } from './calculation.service';
import { UserCameraService } from './user-camera.service';
import { UserObservatoryService} from './user-observatory.service';
import { UserTargetService } from './user-target.service';
import { UserTelescopeService } from './user-telescope.service';

export const services: any[] = [
    CalculationService,
    UserCameraService,
    UserObservatoryService,
    UserTargetService,
    UserTelescopeService
];
export * from './calculation.service';
export * from './user-camera.service';
export * from './user-observatory.service';
export * from './user-target.service';
export * from './user-telescope.service';
