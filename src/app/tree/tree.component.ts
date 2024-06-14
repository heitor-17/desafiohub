import {FlatTreeControl} from '@angular/cdk/tree';
import {Component} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: '"package"',
    children: [{name: '< T> "Document"[,]',
                children:[{name:'prop'}]
  
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

 * @title Tree with flat nodes
 */
@Component({
  selector: 'tree',
  standalone: true,
  imports: [MatTreeModule, MatButtonModule, MatIconModule,MatMenuModule],
  templateUrl: 'tree.component.html',
  styleUrl: 'tree.component.css',
})

export class TreeComponent{
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

  // create(node: ExampleFlatNode) {
  //   const newNode = {
  //     name: "novo",
  //     children: [],
  //   };
   
  // }
  addChildren(node: FoodNode, name: string) {
    node.children = node.children ?? [];
    node.children.push({ name });
  }

 
}
