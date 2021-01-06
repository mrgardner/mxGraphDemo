import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import factory from 'mxgraph';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'mxGraphDemo';

  @ViewChild('graphContainer') graphContainer!: ElementRef;

  ngAfterViewInit() {
    const mx = factory({
      mxBasePath: ''
    });

    const newGraph = new mx.mxGraph(this.graphContainer.nativeElement);
    try {
      const parent = newGraph.getDefaultParent();
      newGraph.getModel().beginUpdate();
      const vertex1 = newGraph.insertVertex(parent, '1', 'Vertex 1', 0, 0, 200, 80);
      const vertex2 = newGraph.insertVertex(parent, '2', 'Vertex 2', 0, 0, 200, 80);
      newGraph.insertEdge(parent, '', '', vertex1, vertex2);
    } finally {
      newGraph.getModel().endUpdate();
      new mx.mxHierarchicalLayout(newGraph).execute(newGraph.getDefaultParent());
    }
    newGraph.addListener(mx.mxEvent.CLICK, (sender:any, evt: any) => {
      const vertexID = evt.getProperty('cell');
      if(vertexID ) {
      console.log(`Vertex with id ${vertexID.id} was pressed`)
      } else {
      console.log(`Graph was clicked.`)
      }
    });
  }
}
