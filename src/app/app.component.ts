import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mxgraph-editor-angular';

  ngOnInit() {
    const array = [
      '../../assets/graphEditorInit.js'
      // '../../assets/deflate/pako.min.js',
      // '../../assets/deflate/base64.js',
      // '../../assets/jscolor/jscolor.js',
      // '../../assets/sanitizer/sanitizer.min.js',
      // '../../assets/mxClient.js',
      // '../../assets/js/EditorUi.js',
      // '../../assets/js/Editor.js',
      // '../../assets/js/Sidebar.js',
      // '../../assets/js/Graph.js',
      // '../../assets/js/Format.js',
      // '../../assets/js/Shapes.js',
      // '../../assets/js/Actions.js',
      // '../../assets/js/Menus.js',
      // '../../assets/js/Toolbar.js',
      // '../../assets/js/Dialogs.js',
      
    ];
    for (let i in array) {
      // console.log(array[i]);
      // const body = document.getElementsByTagName('body')[0];
      // const script = document.createElement('script');
      // script.type = 'text/javascript';
      // script.src = array[i];
      // body.appendChild(script);
    }
    
  }
}
