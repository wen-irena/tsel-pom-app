define(["ojs/ojcore","text!./view.html","./viewModel","text!./component.json","css!./styles","ojs/ojcomposite"],function(e,o,t,s){e.Composite.register("masonry-tile",{view:o,viewModel:t,metadata:JSON.parse(s)})});