import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CardModel } from 'src/core/models/card.model';
import { CardService } from 'src/core/services/http/card.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-card-modal',
  templateUrl: './task-card-modal.component.html',
  styleUrls: ['./task-card-modal.component.scss']
})
export class TaskCardModalComponent implements OnInit, AfterViewInit {
  @ViewChild('btnOpenModal') btnOpenModal: ElementRef | undefined;
  @Input() model: CardModel = {} as CardModel;

  form = new FormGroup({
    id: new FormControl(''),
    titulo: new FormControl(''),
    conteudo: new FormControl(''),
    lista: new FormControl(''),
  });

  constructor(private cardService: CardService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {    
  }

  resetForm(): void {
    this.form.patchValue({ titulo: '', conteudo: '', lista: 'To Do' }, { onlySelf: true });
  }

  save(): void {
    if (this.form.valid) {
      const model = this.form.value as CardModel;
      
      if (!this.model.id) {
        const data = {
          titulo : model.titulo, 
          conteudo: model.conteudo, 
          lista: 'To Do'
        };
  
        this.cardService.post(data).subscribe((x: any) => {
          this.cardService.updateStore();
  
          Swal.fire(
            'New Task',
            'Task added successfully!',
            'success'
          ).then(x => this.btnOpenModal?.nativeElement.click())
        });
      } else {
        this.cardService.put(model, model.id).subscribe((x: any) => {
          this.cardService.updateStore();
  
          Swal.fire(
            'Edit Task',
            'Task updated successfully!',
            'success'
          ).then(x => this.btnOpenModal?.nativeElement.click())
        });
      }
    }
  }
}
