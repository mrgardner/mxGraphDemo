import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import factory, {mxGraph, mxGraphExportObject } from 'mxgraph';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'mxGraphDemo';
  private mx: mxGraphExportObject;
  private graph!: mxGraph;
  private vertexId: number = 1;

  @ViewChild('graphContainer') graphContainer!: ElementRef;

  constructor() {
    this.mx = factory({
      mxBasePath: ''
    });
  }

  ngAfterViewInit() {
    this.graph = new this.mx.mxGraph(this.graphContainer.nativeElement);
    try {
      const parent = this.graph.getDefaultParent();
      this.graph.getModel().beginUpdate();
      const vertex1 = this.graph.insertVertex(parent, this.vertexId.toString(), `Vertex ${this.vertexId}`, 0, 0, 200, 80);
      this.vertexId = this.vertexId + 1;
      const vertex2 = this.graph.insertVertex(parent, this.vertexId.toString(), `Vertex ${this.vertexId}`, 0, 0, 200, 80);
      this.vertexId = this.vertexId + 1;
      this.graph.insertEdge(parent, '', '', vertex1, vertex2);
    } finally {
      this.graph.getModel().endUpdate();
      new this.mx.mxHierarchicalLayout(this.graph).execute(this.graph.getDefaultParent());
    }

    // Creates on click listener
    this.graph.addListener(this.mx.mxEvent.CLICK, (sender:any, evt: any) => {
      const vertexID = evt.getProperty('cell');
      console.log(vertexID);
      if(vertexID ) {
        console.log(`Vertex with id ${vertexID.id} was pressed`)
      } else {
       console.log(`Graph was clicked.`)
      }
    });

    // Allows left clicking a cell or edge to open menu
    this.graph.popupMenuHandler.useLeftButtonForPopup = true;

    // Create popup menu
    this.graph.popupMenuHandler.factoryMethod = function(menu, cell, evt) {
      menu.useLeftButtonForPopup = true;
      if (cell) {
        if(cell.edge){
          menu.addItem('First edge option', '', function() {
            alert('This is the first option of edge ');
          });
          menu.addItem('Second edge option', '', function(){
            alert('This is the second option of edge ');
          });
        }
        if(cell.vertex){
          console.log(cell);
          menu.addItem('First vertex option', '', function() {
            alert('This is the first option of vertex ');
          });
          menu.addItem('Second vertex option', '', function() {
            alert('This is the second option of vertex ');
          });
        }
      }
    }

    // // Disables built-in context menu
    // this.mx.mxEvent.disableContextMenu(document.body);
  }

  drawShape() {
    try {
      const parent = this.graph.getDefaultParent();
      this.graph.getModel().beginUpdate();
      const vertex1 = this.graph.insertVertex(parent, this.vertexId.toString(), `Vertex ${this.vertexId}`, 0, 0, 200, 80);
      this.vertexId = this.vertexId + 1;
    } finally {
      this.graph.getModel().endUpdate();
      new this.mx.mxHierarchicalLayout(this.graph).execute(this.graph.getDefaultParent());
    }
  }
}
