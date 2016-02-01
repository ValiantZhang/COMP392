/// <reference path="../../typings/tsd.d.ts"/>
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        function Control(rotationSpeedX, rotationSpeedY, rotationSpeedZ, planeWidth, planeHeight) {
            this.rotationSpeedX = rotationSpeedX;
            this.rotationSpeedY = rotationSpeedY;
            this.rotationSpeedZ = rotationSpeedZ;
            this.numberOfObjects = scene.children.length;
            this._planeWidth = planeWidth;
            this._planeHeight = planeHeight;
        }
        //PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++
        /*public colorPicker(): void{
            var Configuration=function(){
                this.color = "#ffae23";
            }
            var conf = new Configuration();
    
            var controlador = gui.addColor( conf, 'color');
            controlador.onChange( function( changeColor  )
                {
          //the return value by the chooser is like as: #ffff so
          //remove the # and replace by 0x
          changeColor=changeColor.replace( '#','0x' );
          //create a Color
          var changeColor = new THREE.Color( changeColor ) ;
                });
        }
        
        // Remove Cube Method +++++++++++++++++++++++++++++++++
        public removeCube(): void {
            var allChildren: THREE.Object3D[] = scene.children;
            var lastObject = allChildren[allChildren.length - 1];
            if (lastObject instanceof THREE.Mesh) {
                scene.remove(lastObject);
                this.numberOfObjects = scene.children.length;
            }
        }*/
        // Add Cube Method
        Control.prototype.addCube = function () {
            var cubeSize = Math.ceil((Math.random() * 3));
            var cubeGeometry = new THREE.CubeGeometry(cubeSize, cubeSize, cubeSize);
            var cubeMaterial = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });
            var cube = new gameObject(cubeGeometry, cubeMaterial, -30 + Math.round((Math.random() * this._planeWidth)), Math.round((Math.random() * 5)), -20 + Math.round((Math.random() * this._planeHeight)));
            scene.add(cube);
            this.numberOfObjects = scene.children.length;
        };
        // show scene objects
        Control.prototype.outputObjects = function () {
            console.log(scene.children);
        };
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));
