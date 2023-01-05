import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxBalancerComponent } from './ngx-balancer.component';

describe('NgxBalancerComponent', () => {
  let component: NgxBalancerComponent;
  let fixture: ComponentFixture<NgxBalancerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgxBalancerComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NgxBalancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
