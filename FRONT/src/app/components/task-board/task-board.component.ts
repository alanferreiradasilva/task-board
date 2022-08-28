import { Component, OnInit } from '@angular/core';
import { CardModel } from 'src/core/models/card.model';
import { AuthService } from 'src/core/services/http/auth.service';
import { CardService } from 'src/core/services/http/card.service';
import { environment } from 'src/environments/environment';
import { TaskStore } from 'src/stores/task.store';
import { TokenStore } from 'src/stores/token/token.store';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss'],
  providers: [],
})
export class TaskBoardComponent implements OnInit {
  token$ = this.tokenStore.token$;
  tasks$ = this.taskStore.tasks$;
  tasks: CardModel[] = [];

  get todoList(): CardModel[] {
    return this.tasks.filter(x => x.lista == 'To Do');
  }
  get doingList(): CardModel[] {
    return this.tasks.filter(x => x.lista == 'Doing');
  }
  get doneList(): CardModel[] {
    return this.tasks.filter(x => x.lista == 'Done');
  }

  constructor(private authService: AuthService,
    private readonly tokenStore: TokenStore,
    private readonly taskStore: TaskStore,
    private cardService: CardService
  ) { }

  ngOnInit(): void {
    this.tokenStore.reset();

    this.authService.login(environment.apiCredencials).subscribe((token: any) => {
      this.tokenStore.save(token);
      this.readCards();
    });
  }

  readCards(){
    this.cardService.get().subscribe((res: any) => {
      if (res) {
        this.tasks = res as CardModel[];
        this.taskStore.save(this.tasks);

        this.tasks$.subscribe(x => {
          this.tasks = x as CardModel[];
        });
      }
    });
  }
}
