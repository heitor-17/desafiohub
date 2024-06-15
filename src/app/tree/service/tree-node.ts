import { Injectable } from '@angular/core';
import { TreeNode } from '../model/tree.model';

@Injectable({
  providedIn: 'root'
})
export class TreeService {
  private nodes: TreeNode[] = [];

  getNodes(): TreeNode[] {
    return this.nodes;
  }

  addNode(parentId: number | null, newNode: TreeNode): void {
    if (parentId === null) {
      this.nodes.push(newNode);
    } else {
      const parent = this.findNodeById(this.nodes, parentId);
      if (parent) {
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(newNode);
      }
    }
  }

  removeNode(nodeId: number): void {
    this.nodes = this.removeNodeById(this.nodes, nodeId);
  }

  private findNodeById(nodes: TreeNode[], id: number): TreeNode | null {
    for (let node of nodes) {
      if (node.id === id) {
        return node;
      } else if (node.children) {
        const found = this.findNodeById(node.children, id);
        if (found) {
          return found;
        }
      }
    }
    return null;
  }

  private removeNodeById(nodes: TreeNode[], id: number): TreeNode[] {
    return nodes.filter(node => {
      if (node.id === id) {
        return false;
      } else if (node.children) {
        node.children = this.removeNodeById(node.children, id);
      }
      return true;
    });
  }
}
