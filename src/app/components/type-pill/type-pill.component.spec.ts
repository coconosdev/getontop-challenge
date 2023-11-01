import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypePillComponent } from './type-pill.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('TypePillComponent', () => {
  let component: TypePillComponent;
  let fixture: ComponentFixture<TypePillComponent>;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypePillComponent],
    });
    fixture = TestBed.createComponent(TypePillComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the type pill with correct background color and text', () => {
    const type = 'fire';
    component.type = type;
    fixture.detectChanges();

    const pillElement = debugElement.query(By.css('.type-pill-wrapper'));
    expect(pillElement).toBeTruthy();

    const backgroundColor = pillElement.nativeElement.style.backgroundColor;
    expect(backgroundColor).toContain(`var(--type-${type})`);

    expect(pillElement.nativeElement.textContent).toContain(type);
  });
});
