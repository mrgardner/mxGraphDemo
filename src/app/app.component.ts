import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import factory from 'mxgraph';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'mxGraphDemo';
  private graph: any;
  private mx: any;
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
      const vertex1 = this.graph.insertVertex(parent, this.vertexId, `Vertex ${this.vertexId}`, 0, 0, 200, 80);
      this.vertexId = this.vertexId + 1;
      const vertex2 = this.graph.insertVertex(parent, this.vertexId, `Vertex ${this.vertexId}`, 0, 0, 200, 80);
      this.vertexId = this.vertexId + 1;
      this.graph.insertEdge(parent, '', '', vertex1, vertex2);
    } finally {
      this.graph.getModel().endUpdate();
      new this.mx.mxHierarchicalLayout(this.graph).execute(this.graph.getDefaultParent());
    }
    this.graph.addListener(this.mx.mxEvent.CLICK, (sender:any, evt: any) => {
      const vertexID = evt.getProperty('cell');
      console.log(vertexID);
      if(vertexID ) {
      console.log(`Vertex with id ${vertexID.id} was pressed`)
      } else {
      console.log(`Graph was clicked.`)
      }
    });
  }

  drawShape() {
    try {
      const parent = this.graph.getDefaultParent();
      this.graph.getModel().beginUpdate();
      const vertex1 = this.graph.insertVertex(parent, this.vertexId, `Vertex ${this.vertexId}`, 0, 0, 200, 80);
      this.vertexId = this.vertexId + 1;
    } finally {
      this.graph.getModel().endUpdate();
      new this.mx.mxHierarchicalLayout(this.graph).execute(this.graph.getDefaultParent());
    }
  }
}
