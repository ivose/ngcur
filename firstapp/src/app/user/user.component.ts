import { Component, computed, signal, Input, input, Output, output, EventEmitter } from '@angular/core';
import { DUMMY_USERS } from '../dummy-users';
import { type User } from './user.model';
import { CardComponent } from '../shared/card/card.component';
const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);
//ng g c user --skip-tests

//type User = { id: string, avatar: string, name: string };
//interface User { id: string, avatar: string, name: string };

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  //selectedUser = signal(DUMMY_USERS[randomIndex]);


  //@Input({required: true}) //required means that <app-user> must have a name attribute
  //avatar!: string;

  //@Input()
  //name!: string;

  //avatar = input.required<string>();
  //name = input.required<string>();//html'is name().

  //@Input({ required: true }) id!: string;
  //@Input({ required: true }) avatar!: string;
  //@Input({ required: true }) name!: string;
  @Input({ required: true }) user!: User;
  //@Output() select = new EventEmitter();
  @Input({required:true}) selected!: boolean;
  @Output() select = new EventEmitter<string>();
  //select = output<string>() //teeb vist sama mis @Output() select = new EventEmitter();

  //get imagePath() {
  //  return `assets/users/${this.selectedUser().avatar}`;//'()' is used to get the value of signal
  //}

  //imagePath = computed(() => `assets/users/${this.selectedUser().avatar}`)
  //get imagePath() {
  //  return `assets/users/${this.avatar}`;
  //}

  //imagePath = computed(() => `assets/users/${this.avatar()}`)

  get imagePath() {
    return `assets/users/${this.user.avatar}`;
  }

  onSelectUser() {
    //const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);
    //this.selectedUser = DUMMY_USERS[randomIndex];
    //this.selectedUser.set(DUMMY_USERS[randomIndex]);
    this.select.emit(this.user.id);
  }
}
