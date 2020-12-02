import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from '../../shared/alert.service';
import { Item } from '../models/item';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-management',
  templateUrl: './todo-management.component.html',
  styleUrls: ['./todo-management.component.scss']
})
export class TodoManagementComponent implements OnInit {

  // item$: Observable<Item>;
  form: FormGroup;
  loading = true;
  isNew = false;

  constructor(private todoSvc: TodoService,
              private alertSvc: AlertService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.isNew = true;
      this.form = this.createForm(null);
      this.loading = false;
    } else {
      this.todoSvc.getItem(+id).subscribe((result: Item) => {
        this.form = this.createForm(result);
        this.loading = false;
      });
    }
  }

  public submit(item: Item): void {
    if (this.isNew) {
      this.todoSvc.register(item).subscribe((result: Item) => {
        this.alertSvc.info(`[${item.name}] successfully registered`);
        this.router.navigate(['..'], { relativeTo: this.route});
      }, error => {
        this.alertSvc.error(`[${item.name}] could not be registered`);
      });
    } else {
      this.todoSvc.update(item).subscribe((result: Item) => {
        this.alertSvc.info(`[${result.name}] successfully updated!`);
        this.router.navigate(['..'], { relativeTo: this.route});
      }, error => {
        this.alertSvc.error(`[${item.name}] could not be updated (${error})`);
      });
    }
  }

  private createForm(item: Item): FormGroup {
    return this.formBuilder.group({
      id: item?.id,
      name: [item?.name, Validators.required],
      dueDate: [item?.dueDate, Validators.required],
      completed: [item?.completed]
    });
  }
}
