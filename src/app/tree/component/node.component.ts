import { Component, Input } from '@angular/core';
import { TreeNode } from '../model/tree.model';
import { TreeService } from '../service/tree-node';
import { CommonModule } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'


@Component({
  selector: 'app-node',
  standalone: true,
  template: `
    <div>
      <span>{{ node.name }}</span>
      <button (click)="addNode()">Add</button>
      <button (click)="removeNode()">Remove</button>
      <div *ngIf="node.children">
        <app-node
          *ngFor="let child of node.children"
          [node]="child"
        ></app-node>
      </div>
    </div>
  `,
  styleUrls: ['./node.component.css'],
  imports: [CommonModule]
})
export class TreeNodeComponent {
  @Input() node!: TreeNode;

  constructor(private treeService: TreeService) {}

  addNode(): void {
    const newNode: TreeNode = {
      id: uuidv4(), // Use a better method to generate unique IDs
      name: 'New Node'
    };
    this.treeService.addNode(this.node.id as number, newNode);
  }

  removeNode(): void {
    this.treeService.removeNode(this.node.id as number);
  }
}
