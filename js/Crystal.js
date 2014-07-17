function Crystal( height , width , numOf , params ){

  this.params = _.defaults(  params || {} , {

    height:100,
    width:15,
    numOf:100,
    note:'loop/crystal/1.mp3'

  });
 

  var p = this.params;


  this.hovered = false;
  this.selected = false;
  this.active = false;

  this.neutralColor   = this.getRandomColor(); 
  this.hoveredColor   = this.getRandomColor();
  this.selectedColor  = this.getRandomColor();

  this.geometry = CrystalGeo( p.height , p.width , p.numOf ); 

  this.material = new THREE.MeshLambertMaterial();
  this.material.color = this.neutralColor;

  this.note = new LoadedAudio( audioController , this.params.note );
  this.note.onLoad = loader.onLoad;

  this.mesh = new THREE.Mesh( this.geometry , this.material );
  this.mesh.rotation.x = Math.PI/2;

  this.mesh.hoverOver = this.hoverOver.bind( this );
  this.mesh.hoverOut  = this.hoverOut.bind( this );
  this.mesh.select    = this.select.bind( this );

  objectControls.add( this.mesh );

}


Crystal.prototype.activate = function(){

  scene.add( this.mesh );
  this.active = true;

}

Crystal.prototype.update = function(){

  if( !this.active ) return;

}

Crystal.prototype.hoverOver = function(){

  if( !this.selected ){
    this.mesh.material.color = this.hoveredColor;
  }
  
  this.hovered = true;


}

Crystal.prototype.hoverOut = function(){

  if( !this.selected ){
    this.mesh.material.color = this.neutralColor;
  }
  this.hovered = true;


}

Crystal.prototype.select = function(){

  
  this.selected = !this.selected;

  if( this.selected ){
    
    this.prepareToPlay();

  }else{
    
    this.prepareToStop();

  }


}


Crystal.prototype.prepareToPlay = function(){

  this.preparingToPlay = true;
  this.mesh.material.color = this.selectedColor;


}

Crystal.prototype.prepareToStop = function(){

  this.preparingToStop = true;
      this.mesh.material.color = this.hoveredColor;


}


Crystal.prototype.getRandomColor = function(){

  var color = new THREE.Color();
  color.r = Math.random();
  color.g = Math.random();
  color.b = Math.random();

  return color;

}
