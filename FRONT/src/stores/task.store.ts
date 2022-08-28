import { CardModel } from 'src/core/models/card.model';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";

export interface TaskState {
    tasks: CardModel[];
}

@Injectable({
    providedIn: 'root'
})
export class TaskStore extends ComponentStore<TaskState> {
    private _tasks: CardModel[] = [];
    public getTasks(): CardModel[] { return this._tasks; }
        
    constructor() {
        super({ tasks: [] });
        this._tasks = [];
    }

    readonly tasks$: Observable<CardModel[]> = this.select(state => state.tasks);

    readonly save = this.updater((state, tasks: CardModel[]) => {
        this._tasks = tasks;
        return ({
            tasks: tasks
        })
    });

    readonly reset = this.updater((state) => ({
        tasks: []
    }));
}