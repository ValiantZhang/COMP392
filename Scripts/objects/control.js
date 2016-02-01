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
        // Remove Cube Method +++++++++++++++++++++++++++++++++
        Control.prototype.removeCube = function () {
            var allChildren = scene.children;
            var lastObject = allChildren[allChildren.length - 1];
            if (lastObject instanceof THREE.Mesh) {
                scene.remove(lastObject);
                this.numberOfObjects = scene.children.length;
            }
        };
        Control.prototype. = ;
        return Control;
    })();
    objects.Control = Control;
    /;
    addCube();
    void {
        var: cubeSize, number: number,
        var: cubeGeometry, CubeGeometry: CubeGeometry,
        var: cubeMaterial, LambertMaterial: LambertMaterial,
        var: cube = new gameObject(cubeGeometry, cubeMaterial, -30 + Math.round((Math.random() * this._planeWidth)), Math.round((Math.random() * 5)), -20 + Math.round((Math.random() * this._planeHeight))),
        scene: .add(cube),
        this: .numberOfObjects = scene.children.length
    };
    outputObjects();
    void {
        console: .log(scene.children)
    };
})(objects || (objects = {}));
