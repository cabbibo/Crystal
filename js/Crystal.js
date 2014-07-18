


var CRYSTALS = [];


function Crystal( params ){

  this.params = _.defaults(  params || {} , {

    height:100,
    width:15,
    numOf:100,
    note:'audio/loops/part1/drums.mp3',
    looper:looper

  });
 

  var p = this.params;

  this.looper           = p.looper;

  this.hovered          = false;
  this.selected         = false;
  this.active           = false;

  this.preparingToPlay  = false;
  this.preparingToStop  = false;
  this.playing          = false;

  this.neutralColor   = this.getRandomColor(); 
  this.hoveredColor   = this.getRandomColor();
  this.selectedColor  = this.getRandomColor();

  this.scene    = new THREE.Object3D();
  this.scene.position.y = 100;
  //this.position = this.scene.position;

  this.geometry = CrystalGeo( p.height , p.width , p.numOf ); 

  this.material = new THREE.MeshLambertMaterial();
  this.material.color = this.neutralColor;


  loader.addLoad();
  this.note = new LoadedAudio( audioController , this.params.note );
  this.note.onLoad = function(){
    
    loader.onLoad();
    this.looper.everyLoop( this.note.play.bind( this.note ) );

  }.bind( this );

  this.gain = this.note.gain.gain;

  this.gain.value = 0;

  this.mesh = new THREE.Mesh( this.geometry , this.material );
  this.mesh.rotation.x = Math.PI/2;

  this.mesh.hoverOver = this.hoverOver.bind( this );
  this.mesh.hoverOut  = this.hoverOut.bind( this );
  this.mesh.select    = this.select.bind( this );

 // this.mesh.position.x = 100

  this.scene.add( this.mesh );

  objectControls.add( this.mesh );

  CRYSTALS.push( this );

}


Crystal.prototype.activate = function(){

  scene.add( this.scene );
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
  this.looper.onNextMeasure( this.play.bind( this ) );


}

Crystal.prototype.play = function(){
  
  this.preparingToPlay = false;
  this.playing = true;
   
  this.gain.value = 1;

}

Crystal.prototype.prepareToStop = function(){

  this.preparingToStop = true;
  this.mesh.material.color = this.hoveredColor;
  this.looper.onNextMeasure( this.stop.bind( this ) );

}

Crystal.prototype.stop = function(){
  
  this.preparingToStop = false;
  this.playing = false;
   
  this.gain.value = 0;

}



Crystal.prototype.getRandomColor = function(){

  var color = new THREE.Color();
  color.r = Math.random();
  color.g = Math.random();
  color.b = Math.random();

  return color;

}
