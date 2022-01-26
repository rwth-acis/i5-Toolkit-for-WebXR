(function (exports, THREE) {
    'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var THREE__namespace = /*#__PURE__*/_interopNamespace(THREE);

    class LoadingIndicator {
        constructor(xPos, yPos, zPos) {
            this.xPos = xPos;
            this.yPos = yPos;
            this.zPos = zPos;
            this.cube = new THREE__namespace.Mesh(new THREE__namespace.BoxBufferGeometry(this.xPos, this.yPos, this.zPos), new THREE__namespace.MeshLambertMaterial({ color: 'red' }));
        }
        addToScene(scene) {
            this.cube.position.set(this.xPos, this.yPos, this.zPos);
            scene.add(this.cube);
        }
        render(time) {
            this.cube.rotation.y = time / 1000;
        }
    }

    const Greeter = (name) => `Hi ${name}`;
    const HelloGreeter = (name) => `Hello ${name}`;

    exports.Greeter = Greeter;
    exports.HelloGreeter = HelloGreeter;
    exports.LoadingIndicator = LoadingIndicator;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, THREE);
