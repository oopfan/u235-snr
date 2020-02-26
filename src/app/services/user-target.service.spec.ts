import { TestBed } from '@angular/core/testing';
import { UserTargetService, TargetStored } from './user-target.service';
import { LocalStorageService } from 'angular-web-storage';

describe('UserTargetService', () => {
  let userTargetService: UserTargetService;
  let storageSpy: any;

  beforeEach(() => {
    storageSpy = jasmine.createSpyObj('LocalStorageService', ['get', 'set']);
    storageSpy.get.and.returnValue({
      list: [
        {
          id: 24,
          name: 'M27 Dumbbell Nebula',
          surfaceBrightness: '20.2'
        },
        {
          id: 2,
          name: "M81 Bode's Galaxy",
          surfaceBrightness: '21.7'
        }
      ],
      nextid:30
    });

    TestBed.configureTestingModule({
      providers: [
        UserTargetService,
        { provide: LocalStorageService, useValue: storageSpy }
      ]
    });

    userTargetService = TestBed.get(UserTargetService);
  });

  it('should be created', () => {
    expect(userTargetService).toBeTruthy();
  });

  it('should return two targets', () => {
    expect(userTargetService).toBeTruthy();
    const list = userTargetService.getAll();
    expect(list).toBeTruthy();
    expect(list.length).toBe(2);
    expect(storageSpy.get).toHaveBeenCalledTimes(1);
  });

  it('should return no targets', () => {
    expect(userTargetService).toBeTruthy();
    const list = userTargetService.getItem(16);
    expect(list).toBeTruthy();
    expect(list.length).toBe(0);
    expect(storageSpy.get).toHaveBeenCalledTimes(1);
  });

  it('should return one target', () => {
    expect(userTargetService).toBeTruthy();
    const list = userTargetService.getItem(2);
    expect(list).toBeTruthy();
    expect(list.length).toBe(1);
    const camera = list[0];
    expect(camera.id).toBe(2);
    expect(camera.name).toBe("M81 Bode's Galaxy");
    expect(camera.surfaceBrightness).toBe('21.7');
    expect(storageSpy.get).toHaveBeenCalledTimes(1);
  });

  it('should create a target', () => {
    expect(userTargetService).toBeTruthy();

    const list1 = userTargetService.getAll();
    expect(list1).toBeTruthy();
    expect(list1.length).toBe(2);

    const list2 = userTargetService.create('NGC 7331', '22.2');
    expect(list2).toBeTruthy();
    expect(list2.length).toBe(1, 'check alpha');
    const target1 = list2[0];
    expect(target1.id).toBe(30);
    target1.name = 'fubar target';

    const list3 = userTargetService.getAll();
    expect(list3).toBeTruthy();
    expect(list3.length).toBe(3);
    expect(list3.length - list1.length).toBe(1, 'check beta');

    const list4 = userTargetService.getItem(target1.id);
    expect(list4).toBeTruthy();
    expect(list4.length).toBe(1, 'check gamma');
    const target2 = list4[0];
    expect(target2.name).toBe('NGC 7331');
  });

  it('should update a target', () => {
    expect(userTargetService).toBeTruthy();

    const list1 = userTargetService.getItem(24);
    expect(list1).toBeTruthy();
    expect(list1.length).toBe(1, 'check alpha');

    const result = userTargetService.update(24, 'Test target', '99');
    expect(result).toBeTruthy();
    expect(result.length).toBe(1, 'check beta');
    result[0].name = 'NGC 4656';

    const list2 = userTargetService.getItem(24);
    expect(list2).toBeTruthy();
    expect(list2.length).toBe(1, 'check gamma');

    expect(list1[0].name).not.toBe(list2[0].name);
    expect(list2[0].name).toBe('Test target');
  });

  it('should delete a target', () => {
    expect(userTargetService).toBeTruthy();

    const list1 = userTargetService.getAll();
    expect(list1).toBeTruthy();
    expect(list1.length).toBe(2);

    const deleted = userTargetService.delete(2);
    expect(deleted).toBeTruthy();
    expect(deleted.length).toBe(1, 'check alpha');
    expect(deleted[0].name).toBe("M81 Bode's Galaxy");
    deleted[0].name = 'fubar target';
    expect(deleted[0].name).toBe('fubar target');

    const list2 = userTargetService.getAll();
    expect(list2).toBeTruthy();
    expect(list2.length).toBe(1, 'check beta');
    expect(list2[0].name).not.toBe('fubar target');
    expect(list2[0].name).toBe('M27 Dumbbell Nebula');
  });

});
