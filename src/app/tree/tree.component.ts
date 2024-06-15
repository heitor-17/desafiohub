import { CdkTreeModule, FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common'; // Adicione esta linha
import { FormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { TreeNodeComponent } from './component/node.component';
import { TreeNode } from './model/tree.model';
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
  expandable?: boolean;
}

const TREE_DATA: FoodNode[] = [
  {
    name: '"package"',
    children: [{
      name: '< T> "Document"[,]',
      children: [{ name: 'prop' }]

    },
    ],

  },

];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

/**
 * Update Type
 */
export interface UpType {
  index: number[];
  item: FoodNode;
}
/**  

 * @title Tree with flat nodes
 */


interface SearchResult {
  node: FoodNode;
  index: number[];
}
@Component({
  selector: 'tree',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTreeModule, MatButtonModule, MatIconModule, MatMenuModule, CdkTreeModule, TreeNodeComponent],
  templateUrl: 'tree.component.html',
  styleUrl: 'tree.component.css',
})

export class TreeComponent {
  public nodes: TreeNode[] = [
    {
      id: 1,
      name: 'Root 1',
      children: [
        {
          id: 2,
          name: 'Child 1.1',
          children: [
            { id: 3, name: 'Child 1.1.1' },
            { id: 4, name: 'Child 1.1.2' }
          ]
        },
        { id: 5, name: 'Child 1.2' }
      ]
    },
    {
      id: 6,
      name: 'Root 2',
      children: [
        { id: 7, name: 'Child 2.1' },
        { id: 8, name: 'Child 2.2' }
      ]
    }
  ];
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  // addChildren(node: ExampleFlatNode) {
  //   const newNode = {TREE_DATA
  //     name: "novo",
  //     children: [],
  // node.children.push({ newNode });

  //   };

  // }

  searchTree(node: FoodNode, target: string, currentIndex: number[]): SearchResult | null {
    if (node.name === target) {
      return { node, index: currentIndex };
    }

    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        const result = this.searchTree(node.children[i], target, [...currentIndex, i]);
        if (result) {
          return result;
        }
      }
    }

    return null;
  }

  searchTreeData(treeData: FoodNode[], target: string): SearchResult | null {
    for (let i = 0; i < treeData.length; i++) {
      const result = this.searchTree(treeData[i], target, [i]);
      if (result) {
        return result;
      }
    }

    return null;
  }

  addChildren(node: FoodNode, name: string) {
    console.log('CURRENT NODE', this.dataSource);
    const currentElement = this.searchTreeData(TREE_DATA, node.name);
    console.log('CURRENT INDEX', currentElement);
    if (currentElement) {
      const updateAction = {
        index: currentElement?.index!,
        item: { name: 'Fruit', children: [] }
      };
      this.dataSource.data = this.updateObjectInArray(this.dataSource.data, updateAction);
    }

    // node.children = node.children ?? [];

    // console.log('CURRENT NODE', node);
    // const newNode: FoodNode = {
    //   name: "xaropinho"
    // }
    // this.dataSource.data.push({
    //   name: "xaropinho"
    // })

    // node.children.push(newNode);
    // node.expandable = true;
    // this.isDivVisible = !this.isDivVisible;
  }

  /**
     * Immutable update
     * @param array array to be updated
     * @param action UpType
     * @returns MenuItem[] updated array
     */

  private updateObjectInArray(array: FoodNode[], action: UpType): FoodNode[] {
    const [currentIndex, ...remainingIndexPath] = action.index;

    return array.map((item, index) => {
      if (index !== currentIndex) {
        // Este não é o item que nos importa - mantenha-o como está
        return item;
      }

      if (remainingIndexPath.length === 0) {
        // Se não houver mais índices, este é o item que queremos atualizar
        return {
          ...item,
          children: item.children
            ? [...item.children, action.item]
            : [action.item]
        };
      }

      // Caso contrário, continue descendo na árvore
      return {
        ...item,
        children: item.children
          ? this.updateObjectInArray(item.children, { index: remainingIndexPath, item: action.item })
          : item.children
      };
    });
  }

  isDivVisible = false;

  toggleDiv() {
    this.isDivVisible = !this.isDivVisible;
  }


}
