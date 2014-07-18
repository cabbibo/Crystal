function Particles( height , audioTexture ){

  this.size = 128;
  this.s2  =  this.size * this.size;

  this.position = new THREE.Vector3( 0 , height  , 0);
  
  console.log('NPSD');
  console.log( this.position );
 // console.log( baseData );

  this.t_audio = audioTexture;

  this.dpr = window.devicePixelRatio || 1;


  this.material = this.createParticleMaterial();
  this.geometry = this.createParticleGeometry();

  this.particles = new THREE.ParticleSystem( this.geometry , this.material );

  var sim = shaders.simulationShaders.particles;
  this.physicsRenderer = new PhysicsRenderer( this.size , sim , renderer ); 
 
  this.physicsRenderer.addBoundTexture( this.particles , 't_pos' , 'output' );
 
  this.physicsRenderer.setUniform( 'uPos' , {
    type:"v3" , value: this.position
  });

  this.physicsRenderer.setUniform( 't_audio' , this.t_audio );

  var mesh = new THREE.Mesh( new THREE.SphereGeometry( 50 ) );

  var pTexture = ParticleUtils.createPositionsTexture( this.size , mesh );
  this.physicsRenderer.reset( pTexture );


}

Particles.prototype.update = function(){

  this.physicsRenderer.update();

}

Particles.prototype.createParticleMaterial = function(){

    this.uniforms = {

      position:{ type:"t" , value: this.position },
      t_pos:{type:"t", value:null },
      
      map:{ type:"t" , value:null},
      size:{ type:"f" , value:this.size},
      sprite:{type:"t" , value:null },
      audio:{type:"t" , value:audioController.texture },
      time: timer,
      timeSpeed:{type:"f"  , value:2},
      timePower:{type:"f"  , value:.5},

      dpr:{ type:"f" , value:this.dpr },
      particleSize:{ type:"f" , value:4000 },
      noiseSize:{ type:"f" , value:.01 },
      noisePower:{ type:"f" , value:10. },
      audioSizePower:{ type:"f" , value:.1 },
      positionPower:{ type:"f" , value:.4 },
      spritePower:{ type:"f" , value:.1 },
      audioPower:{ type:"v3" , value:new THREE.Vector3( .5 , 0 , 0 ) },
      colorPower:{ type:"f" , value:.1 },
      weirdPower:{ type:"f" , value:100 },
      finalDivision:{ type:"f" , value:2 },
      color:{ type:"v3" , value: new THREE.Vector3( .5 , .9 , 2. ) },

    }

    console.log( shaders.vertexShaders );

    var material = new THREE.ShaderMaterial({
      uniforms:this.uniforms,
      vertexShader: shaders.vertexShaders.particles,
      fragmentShader: shaders.fragmentShaders.particles,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    return material;

}

Particles.prototype.createParticleGeometry = function(){

  var geo = new THREE.BufferGeometry();

  geo.addAttribute( 'position', new Float32Array( this.s2 * 3 ), 3 );
 
  var positions = geo.attributes.position.array;

  for( var i = 0; i < this.size; i++ ){

    for( var j = 0; j < this.size; j++ ){

      var index = (( i * this.size ) + j ) * 3;

      positions[ index + 0 ] = i / this.size;
      positions[ index + 1 ] = j / this.size;

    }

  }

  return geo;

}

