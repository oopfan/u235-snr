import { TestBed } from '@angular/core/testing';
import { UserTelescopeService, TelescopeStored } from './user-telescope.service';
import { LocalStorageService } from 'angular-web-storage';

describe('UserCameraService', () => {
  let userTelescopeService: UserTelescopeService;
  let storageSpy: any;

  beforeEach(() => {
    storageSpy = jasmine.createSpyObj('LocalStorageService', ['get', 'set']);
    storageSpy.get.and.returnValue({
      list: [
        {
          id: 3,
          name: 'William Optics ZenithStar 71',
          aperture: '71',
          focalLength: '418',
          centralObstruction: '0',
          totalReflectanceTransmittance: '0.99'
        },
        {
          id: 7,
          name: 'Ascension 127mm f/7.5',
          aperture: '127',
          focalLength: '952.5',
          centralObstruction: '0',
          totalReflectanceTransmittance: '0.99'
        }
      ],
      nextid: 8
    });

    TestBed.configureTestingModule({
      providers: [
        UserTelescopeService,
        { provide: LocalStorageService, useValue: storageSpy }
      ]
    });

    userTelescopeService = TestBed.get(UserTelescopeService);
  });

  it('should be created', () => {
    expect(userTelescopeService).toBeTruthy();
  });

  it('should return two telescopes', () => {
    expect(userTelescopeService).toBeTruthy();
    const list = userTelescopeService.getAll();
    expect(list).toBeTruthy();
    expect(list.length).toBe(2);
    expect(storageSpy.get).toHaveBeenCalledTimes(1);
  });

  it('should return no telescopes', () => {
    expect(userTelescopeService).toBeTruthy();
    const list = userTelescopeService.getItem(5);
    expect(list).toBeTruthy();
    expect(list.length).toBe(0);
    expect(storageSpy.get).toHaveBeenCalledTimes(1);
  });

  it('should return one telescope', () => {
    expect(userTelescopeService).toBeTruthy();
    const list = userTelescopeService.getItem(3);
    expect(list).toBeTruthy();
    expect(list.length).toBe(1);
    const telescope = list[0];
    expect(telescope.id).toBe(3);
    expect(telescope.name).toBe('William Optics ZenithStar 71');
    expect(telescope.aperture).toBe('71');
    expect(telescope.focalLength).toBe('418');
    expect(telescope.centralObstruction).toBe('0');
    expect(telescope.totalReflectanceTransmittance).toBe('0.99');
    expect(storageSpy.get).toHaveBeenCalledTimes(1);
  });

  it('should create a telescope', () => {
    expect(userTelescopeService).toBeTruthy();

    const list1 = userTelescopeService.getAll();
    expect(list1).toBeTruthy();
    expect(list1.length).toBe(2);

    const list2 = userTelescopeService.create('Test telescope', '100', '500', '20', '0.97');
    expect(list2).toBeTruthy();
    expect(list2.length).toBe(1, 'check alpha');
    const telescope1 = list2[0];
    expect(telescope1.id).toBe(8);
    telescope1.name = 'fubar telescope';

    const list3 = userTelescopeService.getAll();
    expect(list3).toBeTruthy();
    expect(list3.length).toBe(3);
    expect(list3.length - list1.length).toBe(1, 'check beta');

    const list4 = userTelescopeService.getItem(telescope1.id);
    expect(list4).toBeTruthy();
    expect(list4.length).toBe(1, 'check gamma');
    const telescope2 = list4[0];
    expect(telescope2.name).toBe('Test telescope');
  });

  it('should update a telescope', () => {
    expect(userTelescopeService).toBeTruthy();

    const list1 = userTelescopeService.getItem(3);
    expect(list1).toBeTruthy();
    expect(list1.length).toBe(1, 'check alpha');

    const result = userTelescopeService.update(3, 'Test telescope', '100', '500', '20', '0.97');
    expect(result).toBeTruthy();
    expect(result.length).toBe(1, 'check beta');
    result[0].name = 'Skywatcher 130PDS';

    const list2 = userTelescopeService.getItem(3);
    expect(list2).toBeTruthy();
    expect(list2.length).toBe(1, 'check gamma');

    expect(list1[0].name).not.toBe(list2[0].name);
    expect(list2[0].name).toBe('Test telescope');
  });

  it('should delete a telescope', () => {
    expect(userTelescopeService).toBeTruthy();

    const list1 = userTelescopeService.getAll();
    expect(list1).toBeTruthy();
    expect(list1.length).toBe(2);

    const deleted = userTelescopeService.delete(3);
    expect(deleted).toBeTruthy();
    expect(deleted.length).toBe(1, 'check alpha');
    expect(deleted[0].name).toBe('William Optics ZenithStar 71');
    deleted[0].name = 'fubar telescope';
    expect(deleted[0].name).toBe('fubar telescope');

    const list2 = userTelescopeService.getAll();
    expect(list2).toBeTruthy();
    expect(list2.length).toBe(1, 'check beta');
    expect(list2[0].name).not.toBe('fubar telescope');
    expect(list2[0].name).toBe('Ascension 127mm f/7.5');
  });

});
