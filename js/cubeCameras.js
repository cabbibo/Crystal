
    cubeCamera = new THREE.CubeCamera(1, 1000, 256); // parameters: near, far, resolution
    cubeCamera.renderTarget.minFilter = THREE.LinearMipMapLinearFilter; // mipmap filter

    scene.add(cubeCamera);

    // create a mesh with cubeCamera.renderTarget as a value of envMap
    sphere = new THREE.Mesh(
      new THREE.SphereGeometry(20, 30, 15),
      new THREE.MeshBasicMaterial({
        envMap: cubeCamera.renderTarget,
      })
    );

    cubeCamera.position = sphere.position;

    objectControls.add( sphere );

    scene.add( sphere );
    sphere.position.x = -200;
    sphere.position.y = -50;

    
    var light = new THREE.PointLight( 0xffcc66 , 2 , 300 );
    scene.add( light );

    light.position = sphere.position;



    cubeCamera1 = new THREE.CubeCamera(1, 1000, 256); // parameters: near, far, resolution
    cubeCamera1.renderTarget.minFilter = THREE.LinearMipMapLinearFilter; // mipmap filter

    scene.add(cubeCamera1);

    // create a mesh with cubeCamera.renderTarget as a value of envMap
    sphere1 = new THREE.Mesh(
      new THREE.SphereGeometry(20, 30, 15),
      new THREE.MeshBasicMaterial({
        envMap: cubeCamera1.renderTarget,
      })
    );

    cubeCamera1.position = sphere1.position;


    objectControls.add( sphere1 );
    scene.add( sphere1 );
    sphere1.position.y = -50;


    var light1 = new THREE.PointLight( 0x66ffcc , 2 , 300);
    scene.add( light1 );

    light1.position = sphere1.position;



    cubeCamera2 = new THREE.CubeCamera(1, 1000, 256); // parameters: near, far, resolution
    cubeCamera2.renderTarget.minFilter = THREE.LinearMipMapLinearFilter; // mipmap filter

    scene.add(cubeCamera2);

    // create a mesh with cubeCamera.renderTarget as a value of envMap
    sphere2 = new THREE.Mesh(
      new THREE.SphereGeometry(20, 30, 15),
      new THREE.MeshBasicMaterial({
        envMap: cubeCamera2.renderTarget,
      })
    );


    cubeCamera2.position = sphere2.position;
    objectControls.add( sphere2 );
    scene.add( sphere2 );
    sphere2.position.x = 200;
    sphere2.position.y = -50;

    var light2 = new THREE.PointLight( 0xff66cc , 2 , 300 );
    scene.add( light2 );

    light2.position = sphere2.position;

          


    groundMirror = new THREE.Mirror( renderer, camera, { clipBias: 0.003, textureWidth: window.innerWidth, textureHeight: window.innerHeight, color: 0x777777 } );
		
	var planeGeo = new THREE.PlaneGeometry( 300, 3000, 100 , 100 );

    mirrorMesh = new THREE.Mesh( planeGeo, groundMirror.material );
    mirrorMesh.add( groundMirror );
    mirrorMesh.rotateX( -Math.PI / 2 );
    scene.add( mirrorMesh );
    mirrorMesh.position.y = -190;


