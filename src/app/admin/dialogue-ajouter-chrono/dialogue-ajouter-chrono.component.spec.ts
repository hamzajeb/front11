import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueAjouterChronoComponent } from './dialogue-ajouter-chrono.component';

describe('DialogueAjouterChronoComponent', () => {
  let component: DialogueAjouterChronoComponent;
  let fixture: ComponentFixture<DialogueAjouterChronoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogueAjouterChronoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogueAjouterChronoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
