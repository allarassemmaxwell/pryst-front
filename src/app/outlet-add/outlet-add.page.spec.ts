import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OutletAddPage } from './outlet-add.page';

describe('OutletAddPage', () => {
  let component: OutletAddPage;
  let fixture: ComponentFixture<OutletAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutletAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OutletAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
