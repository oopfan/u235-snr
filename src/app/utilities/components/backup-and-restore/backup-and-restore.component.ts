import { Component, OnInit } from '@angular/core';
import { UserTargetService, UserTelescopeService, UserCameraService, UserObservatoryService } from '@core/services';

@Component({
  selector: 'app-backup-and-restore',
  templateUrl: './backup-and-restore.component.html',
  styleUrls: ['./backup-and-restore.component.css']
})
export class BackupAndRestoreComponent implements OnInit {
  backup: string = null;
  restore: string = null;
  restoreComplete: boolean = false;
  supported: boolean = true;

  constructor(
    private targetService: UserTargetService,
    private telescopeService: UserTelescopeService,
    private cameraService: UserCameraService,
    private observatoryService: UserObservatoryService
  ) {}

  ngOnInit() {
    this.supported = File && FileReader && FileList && Blob ? true : false;
  }

  createBackup() {
    const userTargets = this.targetService.backup();
    const userTelescopes = this.telescopeService.backup();
    const userCameras = this.cameraService.backup();
    const userObservatories = this.observatoryService.backup();
    const blob = { userTargets, userTelescopes, userCameras, userObservatories };
    this.backup = JSON.stringify(blob);
  }

  readBackupFile(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    const self = this;
    reader.onload = function(e) {
      self.restore = reader.result.toString();
    }
    reader.readAsText(file);
  }

  restoreBackup() {
    const blob = JSON.parse(this.restore);

    const userTargets = blob.userTargets;
    const userTelescopes = blob.userTelescopes;
    const userCameras = blob.userCameras;
    const userObservatories = blob.userObservatories;

    this.targetService.restore(userTargets);
    this.telescopeService.restore(userTelescopes);
    this.cameraService.restore(userCameras);
    this.observatoryService.restore(userObservatories);

    this.restoreComplete = true;
  }

}
