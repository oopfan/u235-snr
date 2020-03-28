import { CalculationService } from './calculation/calculation.service';
import { UserCameraService } from './user-camera/user-camera.service';
import { UserObservatoryService} from './user-observatory/user-observatory.service';
import { UserTargetService } from './user-target/user-target.service';
import { UserTelescopeService } from './user-telescope/user-telescope.service';
import { LocalStorageGuard } from './local-storage-guard/local-storage-guard';
import { QuickStartGuard } from './quick-start-guard/quick-start-guard';
import { UtilityService } from './utility/utility.service';
import { AtmosphericExtinctionService } from './atmospheric-extinction/atmospheric-extinction.service';

export const services: any[] = [
    CalculationService,
    UserCameraService,
    UserObservatoryService,
    UserTargetService,
    UserTelescopeService,
    LocalStorageGuard,
    QuickStartGuard,
    UtilityService,
    AtmosphericExtinctionService
];
export * from './calculation/calculation.service';
export * from './user-camera/user-camera.service';
export * from './user-observatory/user-observatory.service';
export * from './user-target/user-target.service';
export * from './user-telescope/user-telescope.service';
export * from './local-storage-guard/local-storage-guard';
export * from './utility/utility.service';
export * from './atmospheric-extinction/atmospheric-extinction.service';
export * from './quick-start-guard/quick-start-guard';
