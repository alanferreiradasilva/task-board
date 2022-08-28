import { Injectable } from '@angular/core';
import { BaseApiService } from './base/baseApi.service';
import { HttpClient } from '@angular/common/http';
import { TaskStore } from 'src/stores/task.store';
import { CardModel } from 'src/core/models/card.model';

@Injectable({
  providedIn: 'root'
})
export class CardService extends BaseApiService {
  constructor(private _httpClient: HttpClient,
    private readonly taskStore: TaskStore) {
    super(_httpClient, 'cards');
  }

  updateStore(): void {
    this.get().subscribe((res: any) => {
      const tasks = res as CardModel[];
      this.taskStore.save(tasks);
    });
  }
}
