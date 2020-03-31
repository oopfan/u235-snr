import { Component, OnInit } from '@angular/core';
import { UserTargetService, UserTelescopeService, UserCameraService, UserObservatoryService } from '@core/services';

@Component({
  selector: 'app-backup-and-restore',
  templateUrl: './backup-and-restore.component.html',
  styleUrls: ['./backup-and-restore.component.css']
})
export class BackupAndRestoreComponent implements OnInit {
  supported: boolean = true;
  backup: string = null;
  backupBegun: boolean = false;
  restore: string = null;
  restoreBegun: boolean = false;
  restoreComplete: boolean = false;
  restoreError: string = null;
  reader = new FileReader();

  constructor(
    private targetService: UserTargetService,
    private telescopeService: UserTelescopeService,
    private cameraService: UserCameraService,
    private observatoryService: UserObservatoryService
  ) {}

  ngOnInit() {
    this.supported = File && FileReader && FileList && Blob ? true : false;
    if (this.supported) {
      const self = this;
      this.reader.onload = function(e) {
        self.restore = self.reader.result.toString();
      };
      this.reader.onerror = function(e) {
        self.restoreError = 'Error reading file: ' + self.reader.error.message;
      };
      this.reader.onloadend = function(e) {
        self.restoreBegun = true;
      }
    }
  }

  createBackup() {
    const userTargets = this.targetService.backup();
    const userTelescopes = this.telescopeService.backup();
    const userCameras = this.cameraService.backup();
    const userObservatories = this.observatoryService.backup();
    const blob = { userTargets, userTelescopes, userCameras, userObservatories };
    this.backup = JSON.stringify(blob);
    this.backupBegun = true;
  }

  readBackupFile(event: any) {
    const file = event.target.files[0];
    this.reader.readAsText(file);
  }

  restoreBackup() {
    let blob = null;
    try {
      blob = JSON.parse(this.restore);
    }
    catch(e) {
      this.restoreError = 'Invalid format.';
    }
    if (blob) {
      if (!blob.userTargets) {
        this.restoreError = 'Missing targets.';
      }
      if (!blob.userTelescopes) {
        this.restoreError = 'Missing telescopes.';
      }
      if (!blob.userCameras) {
        this.restoreError = 'Missing cameras.';
      }
      if (!blob.userObservatories) {
        this.restoreError = 'Missing observatories.';
      }
      if (!this.restoreError) {
        if (!UserTargetService.validateStorage(blob.userTargets)) {
          this.restoreError = 'Invalid targets.';
        }
        if (!UserTelescopeService.validateStorage(blob.userTelescopes)) {
          this.restoreError = 'Invalid telescopes.';
        }
        if (!UserCameraService.validateStorage(blob.userCameras)) {
          this.restoreError = 'Invalid cameras.';
        }
        if (!UserObservatoryService.validateStorage(blob.userObservatories)) {
          this.restoreError = 'Invalid observatories.';
        }
        if (!this.restoreError) {
          this.targetService.restore(blob.userTargets);
          this.telescopeService.restore(blob.userTelescopes);
          this.cameraService.restore(blob.userCameras);
          this.observatoryService.restore(blob.userObservatories);
          this.restoreComplete = true;
        }
      }
    }
    if (this.restoreError) {
      this.restoreError += ' Restore cancelled.';
    }
  }

}
