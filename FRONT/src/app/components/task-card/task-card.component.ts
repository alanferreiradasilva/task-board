import { FormGroup, FormControl } from '@angular/forms';
import { CardModel } from 'src/core/models/card.model';
import { Component, Input, OnInit } from '@angular/core';
import { TaskStore } from 'src/stores/task.store';
import { CardService } from 'src/core/services/http/card.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {
  @Input() title: string = '';
  @Input() model: CardModel = {} as CardModel;

  tasks$ = this.taskStore.tasks$;
  tasks: CardModel[] = [];

  isEditMode = false;

  states: string[] = ['To Do', 'Doing', 'Done'];

  form = new FormGroup({
    id: new FormControl(''),
    titulo: new FormControl(''),
    conteudo: new FormControl(''),
    lista: new FormControl(''),
  });

  constructor(private readonly taskStore: TaskStore,
    private cardService: CardService
  ) { }

  ngOnInit(): void {
    this.form.patchValue(this.model, {onlySelf: true});
  }

  changeState(e: any) {
    this.form.patchValue({lista: e.target.value}, {onlySelf: true});
  }

  newState(state: string){
    this.form.patchValue({lista: state}, {onlySelf: true});
    this.save();
  }

  save(): void {
    const task = this.form.value as CardModel;

    if (task) {
      this.cardService.put(task, task.id.toString()).subscribe((res: any) => {
        this.cardService.updateStore();

        Swal.fire(
          'Editar Tarefa',
          'Tarefa editada com sucesso!',
          'success'
        ).then(x => this.isEditMode = !this.isEditMode)
      });  
    }else {
        Swal.fire(
          'Editar Tarefa',
          'Erro ao atualizar a task!',
          'error'
        ).then(x => this.isEditMode = !this.isEditMode);
    }
  }

  delete(id: string) {
    const task = this.taskStore.getTasks().find(x => x.id == id);

    if (task) {
      this.cardService.delete(task.id.toString()).subscribe((res: any) => {
        this.cardService.updateStore();

        Swal.fire(
          'Remover Tarefa',
          'Tarefa removida com sucesso!',
          'success'
        ).then(x => this.isEditMode = !this.isEditMode);
      });  
    } else {
      Swal.fire(
        'Remover Tarefa',
        'Erro ao remover a tarefa!',
        'error'
      ).then(x => this.isEditMode = !this.isEditMode);
    }
  }

  undo(){
    this.isEditMode = !this.isEditMode;  
    this.tasks = [];
    this.tasks = this.taskStore.getTasks().filter(x => x.lista === this.title).map(x => x);
  }
}
