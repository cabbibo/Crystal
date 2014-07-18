function Halo( height , baseData , audioTexture){

  this.geometry = this.createGeometry( height , baseData );

  this.t_audio = audioTexture;
  this.uniforms = {



  }

  this.material = this.createMaterial();

  this.mesh = new THREE.Line( this.geometry , this.material , THREE.LinePieces );

}

Halo.prototype.createMaterial = function(){

  this.uniforms = {
    t_audio: this.t_audio
  }

  var material = new THREE.ShaderMaterial({

    uniforms: this.uniforms,
    vertexShader: shaders.vertexShaders.halo,
    fragmentShader: shaders.fragmentShaders.halo,

  });

  return material;

}

Halo.prototype.createGeometry = function( height , baseData ){

  var geometry = new THREE.BufferGeometry();

  var numOfMain = 3;

  var totalCircles = numOfMain + 5;//Math.floor( Math.random() * 6 ) + 4 + numOfMain;
  var vertsPerCircle = 1000;

  var totalVerts = totalCircles * vertsPerCircle;
  var total = totalVerts * 3 * 2;
  var uvTot = totalVerts * 2 * 2;

  geometry.addAttribute( 'position', new Float32Array( total ), 3 ); 
  geometry.addAttribute( 'uv' , new Float32Array( uvTot ) , 2 );

  var positions = geometry.getAttribute( 'position' ).array;
  var uvs = geometry.getAttribute( 'uv' ).array;


  // Main
  for( var i = 0; i < numOfMain; i++ ){

    var newH =  -height - (20 * i ) 
    var loc = new THREE.Vector3( 0 , 0 ,  newH );

    var points = this.createCircle( loc ,  (1000 * ( numOfMain - i )) / newH , vertsPerCircle );

    for( var j = 0; j < points.length; j++ ){

      var vert = ( j + (i) * vertsPerCircle );
      var index = vert * 3 * 2;
      var iUV =  vert * 2 * 2;

      var up = j + 1;
      if( up == points.length ) up = 0;

      var vertUp = ( up + (i) * vertsPerCircle );
      

      positions[ index + 0 ] = points[j].x;
      positions[ index + 1 ] = points[j].y;
      positions[ index + 2 ] = points[j].z;

      positions[ index + 3 ] = points[up].x;
      positions[ index + 4 ] = points[up].y;
      positions[ index + 5 ] = points[up].z;

      uvs[ iUV + 0 ]  = Math.random();//vert / totalVerts;  
      uvs[ iUV + 2 ]  = Math.random();//vertUp / totalVerts;  

    }


  }

  // Other Randos
  for( var i = 0; i < totalCircles-numOfMain; i++ ){

    var bd = baseData[i+1];
    var h = bd[1];

    var loc = new THREE.Vector3( bd[0][0] , bd[0][1] ,  h - 20  );

    var points = this.createCircle( loc ,  1000 / h , vertsPerCircle );

    for( var j = 0; j < points.length; j++ ){

      var vert = ( j + (i+numOfMain) * vertsPerCircle );
      var index = vert * 3 * 2;
      var iUV =  vert * 2 * 2;


      var up = j + 1;
      if( up == points.length ) up = 0;

      var vertUp = ( up + (i+numOfMain) * vertsPerCircle );

      positions[ index + 0 ] = points[j].x;
      positions[ index + 1 ] = points[j].y;
      positions[ index + 2 ] = points[j].z;

      positions[ index + 3 ] = points[up].x;
      positions[ index + 4 ] = points[up].y;
      positions[ index + 5 ] = points[up].z;
      
      uvs[ iUV + 0 ]  = Math.random();//vert / totalVerts;  
      uvs[ iUV + 2 ]  = Math.random();//vertUp / totalVerts;  






    }


  }

  return geometry;


}

Halo.prototype.createCircle = function( location , radius , numOf ){

  var points = [];

  for( var i = 0; i < numOf; i++ ){

    var p = i / numOf;
    var t = p * 2 * Math.PI;

    var l = location.clone();

    var x = Math.cos( t ) * radius;
    var y = Math.sin( t ) * radius;
    
    var newP = new THREE.Vector3( x , y , 0 );
    l.add( newP );

    points.push( l );

  }

  return points;

}




