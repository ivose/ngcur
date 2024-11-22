import { Component } from '@angular/core';
import { SafeLinksDirective } from '../safe-links.directive';

@Component({
  selector: 'app-learning-resources',
  templateUrl: './learning-resources.component.html',
  styleUrl: './learning-resources.component.css',
  standalone: true,
  imports: [SafeLinksDirective]
})
export class LearningResourcesComponent {}
