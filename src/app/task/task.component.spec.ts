import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskComponent } from './task.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { debug } from 'util';
import { Task } from '../models/task.model';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let realComponen: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskComponent ],
      imports: [
        NgxPaginationModule,
        Ng2OrderModule,
        HttpClientModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change "reverse" and "key" variables', () => {
    expect(component.reverse).toBe(false);
    expect(component.key).toBe('name');
    component.sort('description');
    expect(component.reverse).toBe(true);
    expect(component.key).toBe('description');
  });

  it('should add Task, return it and add to tasks array', () => {
    //let sizeBefore: number = component.tasks.length;
    component.addNewTask('testTask','task for tests');
    //let sizeAfter: number = component.tasks.length;
    // expect(task.name).toEqual('Name');
    // expect(task.description).toEqual('task for tests');
    // //component.removeTask(tasks[0].id);
  });

  /*
  Problemy:
  1. wykonywanie operacji na obiekcie component nie sprawia, że obiekt pojawia się bazie lub w component.tasks
  2. logowanie w task.component rozmiaru tasks daje taki sam wynik przed i po dodaniu nowego taska. Tak jakby to dodawanie było lazy
  i realnie wykonywało się dopiero po wyjściu z metody. To (oraz punkt 1.) uniemożliwia mi sprawdzenie, czy tablica tasks się powiększa
  oraz czy został dodany task o przekazanych do metody parametrach (bo sam task także przekazywany jest dopiero po wyjściu z metody
    lub przy wejściu w tę metodę przy następnej okazji)
  3. na polu tasks w componencie nie mogę wykonywać operacji charakterystycznych dla tablicy. 
   */

  it('should add task and then remove it', () => {
    
  });

  it('should start processing task', () => {
    
  });

  it('should cancel processing task', () => {
    
  });
});
