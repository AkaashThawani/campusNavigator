import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySearchHistoryComponent } from './my-search-history.component';

describe('MySearchHistoryComponent', () => {
  let component: MySearchHistoryComponent;
  let fixture: ComponentFixture<MySearchHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MySearchHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MySearchHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
