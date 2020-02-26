import { TestBed } from '@angular/core/testing';
import { UserObservatoryService, ObservatoryStored } from './user-observatory.service';
import { LocalStorageService } from 'angular-web-storage';

fdescribe('UserObservatoryService', () => {
  let userObservatoryService: UserObservatoryService;
  let storageSpy: any;

  beforeEach(() => {
    storageSpy = jasmine.createSpyObj('LocalStorageService', ['get', 'set']);
    storageSpy.get.and.returnValue({
      list: [
        {
          id: 1,
          name: 'Bortle 4',
          bortleClass: '4',
          skyBrightness: '21.51'
        },
        {
          id: 4,
          name: 'Bortle 6',
          bortleClass: '6',
          skyBrightness: '19.23'
        }
      ],
      nextid: 5
    });

    TestBed.configureTestingModule({
      providers: [
        UserObservatoryService,
        { provide: LocalStorageService, useValue: storageSpy }
      ]
    });

    userObservatoryService = TestBed.get(UserObservatoryService);
  });

  it('should be created', () => {
    expect(userObservatoryService).toBeTruthy();
  });

  it('should return two observatories', () => {
    expect(userObservatoryService).toBeTruthy();
    const list = userObservatoryService.getAll();
    expect(list).toBeTruthy();
    expect(list.length).toBe(2);
    expect(storageSpy.get).toHaveBeenCalledTimes(1);
  });

  it('should return no observatories', () => {
    expect(userObservatoryService).toBeTruthy();
    const list = userObservatoryService.getItem(5);
    expect(list).toBeTruthy();
    expect(list.length).toBe(0);
    expect(storageSpy.get).toHaveBeenCalledTimes(1);
  });

  it('should return one observatory', () => {
    expect(userObservatoryService).toBeTruthy();
    const list = userObservatoryService.getItem(4);
    expect(list).toBeTruthy();
    expect(list.length).toBe(1);
    const observatory = list[0];
    expect(observatory.id).toBe(4);
    expect(observatory.name).toBe('Bortle 6');
    expect(observatory.bortleClass).toBe('6');
    expect(observatory.skyBrightness).toBe('19.23');
    expect(storageSpy.get).toHaveBeenCalledTimes(1);
  });

  it('should create an observatory', () => {
    expect(userObservatoryService).toBeTruthy();

    const list1 = userObservatoryService.getAll();
    expect(list1).toBeTruthy();
    expect(list1.length).toBe(2);

    const list2 = userObservatoryService.create('Bortle 8', '8', '18.09');
    expect(list2).toBeTruthy();
    expect(list2.length).toBe(1, 'check alpha');
    const observatory1 = list2[0];
    expect(observatory1.id).toBe(5);
    observatory1.name = 'fubar observatory';

    const list3 = userObservatoryService.getAll();
    expect(list3).toBeTruthy();
    expect(list3.length).toBe(3);
    expect(list3.length - list1.length).toBe(1, 'check beta');

    const list4 = userObservatoryService.getItem(observatory1.id);
    expect(list4).toBeTruthy();
    expect(list4.length).toBe(1, 'check gamma');
    const observatory2 = list4[0];
    expect(observatory2.name).toBe('Bortle 8');
  });

  it('should update an observatory', () => {
    expect(userObservatoryService).toBeTruthy();

    const list1 = userObservatoryService.getItem(4);
    expect(list1).toBeTruthy();
    expect(list1.length).toBe(1, 'check alpha');

    const result = userObservatoryService.update(4, 'Test observatory', '3.14', '999');
    expect(result).toBeTruthy();
    expect(result.length).toBe(1, 'check beta');
    result[0].name = 'Bortle 6';

    const list2 = userObservatoryService.getItem(4);
    expect(list2).toBeTruthy();
    expect(list2.length).toBe(1, 'check gamma');

    expect(list1[0].name).not.toBe(list2[0].name);
  });

  it('should delete an observatory', () => {
    expect(userObservatoryService).toBeTruthy();

    const list1 = userObservatoryService.getAll();
    expect(list1).toBeTruthy();
    expect(list1.length).toBe(2);

    const deleted = userObservatoryService.delete(4);
    expect(deleted).toBeTruthy();
    expect(deleted.length).toBe(1, 'check alpha');
    expect(deleted[0].name).toBe('Bortle 6');
    deleted[0].name = 'fubar observatory';
    expect(deleted[0].name).toBe('fubar observatory');

    const list2 = userObservatoryService.getAll();
    expect(list2).toBeTruthy();
    expect(list2.length).toBe(1, 'check beta');
    expect(list2[0].name).not.toBe('fubar observatory');
    expect(list2[0].name).toBe('Bortle 4');
  });

});
