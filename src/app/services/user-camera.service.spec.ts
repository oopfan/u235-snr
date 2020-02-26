import { TestBed } from '@angular/core/testing';
import { UserCameraService, CameraStored } from './user-camera.service';
import { LocalStorageService } from 'angular-web-storage';

describe('UserCameraService', () => {
  let userCameraService: UserCameraService;
  let storageSpy: any;

  beforeEach(() => {
    storageSpy = jasmine.createSpyObj('LocalStorageService', ['get', 'set']);
    storageSpy.get.and.returnValue({
      list: [
        {
          id: 6,
          name: 'Atik 314E',
          pixelSize: '4.65',
          readNoise: '5.3',
          darkCurrent: '0',
          quantumEfficiency: '43'
        },
        {
          id: 8,
          name: 'Altair 290M',
          pixelSize: '2.9',
          readNoise: '3.3',
          darkCurrent: '0',
          quantumEfficiency: '50'
        }
      ],
      nextid: 9
    });

    TestBed.configureTestingModule({
      providers: [
        UserCameraService,
        { provide: LocalStorageService, useValue: storageSpy }
      ]
    });

    userCameraService = TestBed.get(UserCameraService);
  });

  it('should be created', () => {
    expect(userCameraService).toBeTruthy();
  });

  it('should return two cameras', () => {
    expect(userCameraService).toBeTruthy();
    const list = userCameraService.getAll();
    expect(list).toBeTruthy();
    expect(list.length).toBe(2);
    expect(storageSpy.get).toHaveBeenCalledTimes(1);
  });

  it('should return no cameras', () => {
    expect(userCameraService).toBeTruthy();
    const list = userCameraService.getItem(4);
    expect(list).toBeTruthy();
    expect(list.length).toBe(0);
    expect(storageSpy.get).toHaveBeenCalledTimes(1);
  });

  it('should return one camera', () => {
    expect(userCameraService).toBeTruthy();
    const list = userCameraService.getItem(6);
    expect(list).toBeTruthy();
    expect(list.length).toBe(1);
    const camera = list[0];
    expect(camera.id).toBe(6);
    expect(camera.name).toBe('Atik 314E');
    expect(camera.pixelSize).toBe('4.65');
    expect(camera.readNoise).toBe('5.3');
    expect(camera.darkCurrent).toBe('0');
    expect(camera.quantumEfficiency).toBe('43');
    expect(storageSpy.get).toHaveBeenCalledTimes(1);
  });

  it('should create a camera', () => {
    expect(userCameraService).toBeTruthy();

    const list1 = userCameraService.getAll();
    expect(list1).toBeTruthy();
    expect(list1.length).toBe(2);

    const list2 = userCameraService.create('Test camera', '2.1', '2.5', '0', '60');
    expect(list2).toBeTruthy();
    expect(list2.length).toBe(1, 'check alpha');
    const camera1 = list2[0];
    expect(camera1.id).toBe(9);
    camera1.name = 'fubar camera';

    const list3 = userCameraService.getAll();
    expect(list3).toBeTruthy();
    expect(list3.length).toBe(3);
    expect(list3.length - list1.length).toBe(1, 'check beta');

    const list4 = userCameraService.getItem(camera1.id);
    expect(list4).toBeTruthy();
    expect(list4.length).toBe(1, 'check gamma');
    const camera2 = list4[0];
    expect(camera2.name).toBe('Test camera');
  });

  it('should update a camera', () => {
    expect(userCameraService).toBeTruthy();

    const list1 = userCameraService.getItem(6);
    expect(list1).toBeTruthy();
    expect(list1.length).toBe(1, 'check alpha');

    const result = userCameraService.update(6, 'Test camera', '2.1', '2.5', '0', '60');
    expect(result).toBeTruthy();
    expect(result.length).toBe(1, 'check beta');
    result[0].name = 'Atik 314E';

    const list2 = userCameraService.getItem(6);
    expect(list2).toBeTruthy();
    expect(list2.length).toBe(1, 'check gamma');

    expect(list1[0].name).not.toBe(list2[0].name);
  });

  it('should delete a camera', () => {
    expect(userCameraService).toBeTruthy();

    const list1 = userCameraService.getAll();
    expect(list1).toBeTruthy();
    expect(list1.length).toBe(2);

    const deleted = userCameraService.delete(6);
    expect(deleted).toBeTruthy();
    expect(deleted.length).toBe(1, 'check alpha');
    expect(deleted[0].name).toBe('Atik 314E');
    deleted[0].name = 'fubar camera';
    expect(deleted[0].name).toBe('fubar camera');

    const list2 = userCameraService.getAll();
    expect(list2).toBeTruthy();
    expect(list2.length).toBe(1, 'check beta');
    expect(list2[0].name).not.toBe('fubar camera');
    expect(list2[0].name).toBe('Altair 290M');
  });

});
