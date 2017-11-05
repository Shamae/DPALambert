! function(t) {
    
    function e(i) {
        if (n[i]) return n[i].exports;
        var r = n[i] = {
            i: i,
            l: !1,
            exports: {}
        };
        return t[i].call(r.exports, r, r.exports, e), r.l = !0, r.exports
    }
    var n = {};
    e.m = t, e.c = n, e.d = function(t, n, i) {
        e.o(t, n) || Object.defineProperty(t, n, {
            configurable: !1,
            enumerable: !0,
            get: i
        })
    }, e.n = function(t) {
        var n = t && t.__esModule ? function() {
            return t.default
        } : function() {
            return t
        };
        return e.d(n, "a", n), n
    }, e.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, e.p = "", e(e.s = 7)
}([function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = n(4),
        r = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(i),
        s = L.Class.extend({
            includes: [r.default],
            options: {
                snappable: !0,
                snapDistance: 20,
                cursorMarker: !0,
                finishOnDoubleClick: !1,
                finishOn: null,
                allowSelfIntersection: !0,
                templineStyle: {},
                hintlineStyle: {
                    dashArray: [5, 5]
                },
                markerStyle: {
                    draggable: !0
                }
            },
            initialize: function(t) {
                var e = this;
                this._map = t, this.shapes = ["Marker", "Line", "Poly", "Rectangle", "Circle", "Cut"], this.shapes.forEach(function(t) {
                    e[t] = new L.PM.Draw[t](e._map)
                })
            },
            setPathOptions: function(t) {
                this.options.pathOptions = t
            },
            getShapes: function() {
                return this.shapes
            },
            enable: function(t, e) {
                if (!t) throw new Error("Error: Please pass a shape as a parameter. Possible shapes are: " + this.getShapes().join(","));
                this.disable(), this[t].enable(e)
            },
            disable: function() {
                var t = this;
                this.shapes.forEach(function(e) {
                    t[e].disable()
                })
            },
            addControls: function() {
                var t = this;
                this.shapes.forEach(function(e) {
                    t[e].addButton()
                })
            }
        });
    e.default = s
}, function(t, e, n) {
    "use strict";

    function i(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = n(4),
        s = i(r),
        o = n(27),
        a = i(o),
        u = L.Class.extend({
            includes: [a.default, s.default],
            options: {
                snappable: !0,
                snapDistance: 20,
                allowSelfIntersection: !0,
                draggable: !0
            },
            isPolygon: function() {
                return this._layer instanceof L.Polygon
            }
        });
    e.default = u
}, function(t, e) {
    function n(t, e, n, i) {
        if (void 0 === t) throw new Error("geometry is required");
        if (e && e.constructor !== Object) throw new Error("properties must be an Object");
        if (n && 4 !== n.length) throw new Error("bbox must be an Array of 4 numbers");
        if (i && -1 === ["string", "number"].indexOf(typeof i)) throw new Error("id must be a number or a string");
        var r = {
            type: "Feature"
        };
        return i && (r.id = i), n && (r.bbox = n), r.properties = e || {}, r.geometry = t, r
    }

    function i(t, e, n) {
        if (!t) throw new Error("type is required");
        if (!e) throw new Error("coordinates is required");
        if (!Array.isArray(e)) throw new Error("coordinates must be an Array");
        if (n && 4 !== n.length) throw new Error("bbox must be an Array of 4 numbers");
        var i;
        switch (t) {
            case "Point":
                i = r(e).geometry;
                break;
            case "LineString":
                i = o(e).geometry;
                break;
            case "Polygon":
                i = s(e).geometry;
                break;
            case "MultiPoint":
                i = l(e).geometry;
                break;
            case "MultiLineString":
                i = u(e).geometry;
                break;
            case "MultiPolygon":
                i = h(e).geometry;
                break;
            default:
                throw new Error(t + " is invalid")
        }
        return n && (i.bbox = n), i
    }

    function r(t, e, i, r) {
        if (!t) throw new Error("No coordinates passed");
        if (void 0 === t.length) throw new Error("Coordinates must be an array");
        if (t.length < 2) throw new Error("Coordinates must be at least 2 numbers long");
        if (!I(t[0]) || !I(t[1])) throw new Error("Coordinates must contain numbers");
        return n({
            type: "Point",
            coordinates: t
        }, e, i, r)
    }

    function s(t, e, i, r) {
        if (!t) throw new Error("No coordinates passed");
        for (var s = 0; s < t.length; s++) {
            var o = t[s];
            if (o.length < 4) throw new Error("Each LinearRing of a Polygon must have 4 or more Positions.");
            for (var a = 0; a < o[o.length - 1].length; a++) {
                if (0 === s && 0 === a && !I(o[0][0]) || !I(o[0][1])) throw new Error("Coordinates must contain numbers");
                if (o[o.length - 1][a] !== o[0][a]) throw new Error("First and last Position are not equivalent.")
            }
        }
        return n({
            type: "Polygon",
            coordinates: t
        }, e, i, r)
    }

    function o(t, e, i, r) {
        if (!t) throw new Error("No coordinates passed");
        if (t.length < 2) throw new Error("Coordinates must be an array of two or more positions");
        if (!I(t[0][1]) || !I(t[0][1])) throw new Error("Coordinates must contain numbers");
        return n({
            type: "LineString",
            coordinates: t
        }, e, i, r)
    }

    function a(t, e, n) {
        if (!t) throw new Error("No features passed");
        if (!Array.isArray(t)) throw new Error("features must be an Array");
        if (e && 4 !== e.length) throw new Error("bbox must be an Array of 4 numbers");
        if (n && -1 === ["string", "number"].indexOf(typeof n)) throw new Error("id must be a number or a string");
        var i = {
            type: "FeatureCollection"
        };
        return n && (i.id = n), e && (i.bbox = e), i.features = t, i
    }

    function u(t, e, i, r) {
        if (!t) throw new Error("No coordinates passed");
        return n({
            type: "MultiLineString",
            coordinates: t
        }, e, i, r)
    }

    function l(t, e, i, r) {
        if (!t) throw new Error("No coordinates passed");
        return n({
            type: "MultiPoint",
            coordinates: t
        }, e, i, r)
    }

    function h(t, e, i, r) {
        if (!t) throw new Error("No coordinates passed");
        return n({
            type: "MultiPolygon",
            coordinates: t
        }, e, i, r)
    }

    function c(t, e, i, r) {
        if (!t) throw new Error("geometries is required");
        if (!Array.isArray(t)) throw new Error("geometries must be an Array");
        return n({
            type: "GeometryCollection",
            geometries: t
        }, e, i, r)
    }

    function f(t, e) {
        if (void 0 === t || null === t || isNaN(t)) throw new Error("num is required");
        if (e && !(e >= 0)) throw new Error("precision must be a positive number");
        var n = Math.pow(10, e || 0);
        return Math.round(t * n) / n
    }

    function g(t, e) {
        if (void 0 === t || null === t) throw new Error("radians is required");
        var n = N[e || "kilometers"];
        if (!n) throw new Error("units is invalid");
        return t * n
    }

    function d(t, e) {
        if (void 0 === t || null === t) throw new Error("distance is required");
        var n = N[e || "kilometers"];
        if (!n) throw new Error("units is invalid");
        return t / n
    }

    function p(t, e) {
        return v(d(t, e))
    }

    function m(t) {
        if (null === t || void 0 === t) throw new Error("bearing is required");
        var e = t % 360;
        return e < 0 && (e += 360), e
    }

    function v(t) {
        if (null === t || void 0 === t) throw new Error("radians is required");
        return t % (2 * Math.PI) * 180 / Math.PI
    }

    function y(t) {
        if (null === t || void 0 === t) throw new Error("degrees is required");
        return t % 360 * Math.PI / 180
    }

    function E(t, e, n) {
        if (null === t || void 0 === t) throw new Error("distance is required");
        if (!(t >= 0)) throw new Error("distance must be a positive number");
        return g(d(t, e), n || "kilometers")
    }

    function x(t, e, n) {
        if (null === t || void 0 === t) throw new Error("area is required");
        if (!(t >= 0)) throw new Error("area must be a positive number");
        var i = C[e || "meters"];
        if (!i) throw new Error("invalid original units");
        var r = C[n || "kilometers"];
        if (!r) throw new Error("invalid final units");
        return t / i * r
    }

    function I(t) {
        return !isNaN(t) && null !== t && !Array.isArray(t)
    }
    var N = {
            miles: 3960,
            nauticalmiles: 3441.145,
            degrees: 57.2957795,
            radians: 1,
            inches: 250905600,
            yards: 6969600,
            meters: 6373e3,
            metres: 6373e3,
            centimeters: 6373e5,
            centimetres: 6373e5,
            kilometers: 6373,
            kilometres: 6373,
            feet: 20908792.65
        },
        C = {
            kilometers: 1e-6,
            kilometres: 1e-6,
            meters: 1,
            metres: 1,
            centimetres: 1e4,
            millimeter: 1e6,
            acres: 247105e-9,
            miles: 3.86e-7,
            yards: 1.195990046,
            feet: 10.763910417,
            inches: 1550.003100006
        };
    t.exports = {
        feature: n,
        geometry: i,
        featureCollection: a,
        geometryCollection: c,
        point: r,
        multiPoint: l,
        lineString: o,
        multiLineString: u,
        polygon: s,
        multiPolygon: h,
        radiansToDistance: g,
        distanceToRadians: d,
        distanceToDegrees: p,
        radians2degrees: v,
        degrees2radians: y,
        bearingToAngle: m,
        convertDistance: E,
        convertArea: x,
        round: f,
        isNumber: I
    }
}, function(t, e, n) {
    "use strict";

    function i(t, e, n) {
        if (null !== t) {
            var r, s, o, a, u, l, h, c, f, g, d = 0,
                p = 0,
                m = t.type,
                v = "FeatureCollection" === m,
                y = "Feature" === m,
                E = v ? t.features.length : 1;
            for (r = 0; r < E; r++)
                for (f = v ? t.features[r].geometry : y ? t.geometry : t, g = !!f && "GeometryCollection" === f.type, h = g ? f.geometries.length : 1, s = 0; s < h; s++) {
                    var x = 0;
                    if (null !== (l = g ? f.geometries[s] : f)) {
                        c = l.coordinates;
                        var I = l.type;
                        switch (d = !n || "Polygon" !== I && "MultiPolygon" !== I ? 0 : 1, I) {
                            case null:
                                break;
                            case "Point":
                                e(c, p, r, x), p++, x++;
                                break;
                            case "LineString":
                            case "MultiPoint":
                                for (o = 0; o < c.length; o++) e(c[o], p, r, x), p++, "MultiPoint" === I && x++;
                                "LineString" === I && x++;
                                break;
                            case "Polygon":
                            case "MultiLineString":
                                for (o = 0; o < c.length; o++) {
                                    for (a = 0; a < c[o].length - d; a++) e(c[o][a], p, r, x), p++;
                                    "MultiLineString" === I && x++
                                }
                                "Polygon" === I && x++;
                                break;
                            case "MultiPolygon":
                                for (o = 0; o < c.length; o++) {
                                    for (a = 0; a < c[o].length; a++)
                                        for (u = 0; u < c[o][a].length - d; u++) e(c[o][a][u], p, r, x), p++;
                                    x++
                                }
                                break;
                            case "GeometryCollection":
                                for (o = 0; o < l.geometries.length; o++) i(l.geometries[o], e, n);
                                break;
                            default:
                                throw new Error("Unknown Geometry Type")
                        }
                    }
                }
        }
    }

    function r(t, e, n, r) {
        var s = n;
        return i(t, function(t, i, r, o) {
            s = 0 === i && void 0 === n ? t : e(s, t, i, r, o)
        }, r), s
    }

    function s(t, e) {
        var n;
        switch (t.type) {
            case "FeatureCollection":
                for (n = 0; n < t.features.length; n++) e(t.features[n].properties, n);
                break;
            case "Feature":
                e(t.properties, 0)
        }
    }

    function o(t, e, n) {
        var i = n;
        return s(t, function(t, r) {
            i = 0 === r && void 0 === n ? t : e(i, t, r)
        }), i
    }

    function a(t, e) {
        if ("Feature" === t.type) e(t, 0);
        else if ("FeatureCollection" === t.type)
            for (var n = 0; n < t.features.length; n++) e(t.features[n], n)
    }

    function u(t, e, n) {
        var i = n;
        return a(t, function(t, r) {
            i = 0 === r && void 0 === n ? t : e(i, t, r)
        }), i
    }

    function l(t) {
        var e = [];
        return i(t, function(t) {
            e.push(t)
        }), e
    }

    function h(t, e) {
        var n, i, r, s, o, a, u, l, h = 0,
            c = "FeatureCollection" === t.type,
            f = "Feature" === t.type,
            g = c ? t.features.length : 1;
        for (n = 0; n < g; n++) {
            for (a = c ? t.features[n].geometry : f ? t.geometry : t, l = c ? t.features[n].properties : f ? t.properties : {}, u = !!a && "GeometryCollection" === a.type, o = u ? a.geometries.length : 1, r = 0; r < o; r++)
                if (null !== (s = u ? a.geometries[r] : a)) switch (s.type) {
                    case "Point":
                    case "LineString":
                    case "MultiPoint":
                    case "Polygon":
                    case "MultiLineString":
                    case "MultiPolygon":
                        e(s, h, l);
                        break;
                    case "GeometryCollection":
                        for (i = 0; i < s.geometries.length; i++) e(s.geometries[i], h, l);
                        break;
                    default:
                        throw new Error("Unknown Geometry Type")
                } else e(null, h, l);
            h++
        }
    }

    function c(t, e, n) {
        var i = n;
        return h(t, function(t, r, s) {
            i = 0 === r && void 0 === n ? t : e(i, t, r, s)
        }), i
    }

    function f(t, e) {
        h(t, function(t, n, i) {
            var r = null === t ? null : t.type;
            switch (r) {
                case null:
                case "Point":
                case "LineString":
                case "Polygon":
                    return void e(m(t, i), n, 0)
            }
            var s;
            switch (r) {
                case "MultiPoint":
                    s = "Point";
                    break;
                case "MultiLineString":
                    s = "LineString";
                    break;
                case "MultiPolygon":
                    s = "Polygon"
            }
            t.coordinates.forEach(function(t, r) {
                e(m({
                    type: s,
                    coordinates: t
                }, i), n, r)
            })
        })
    }

    function g(t, e, n) {
        var i = n;
        return f(t, function(t, r, s) {
            i = 0 === r && 0 === s && void 0 === n ? t : e(i, t, r, s)
        }), i
    }

    function d(t, e) {
        f(t, function(t, n, i) {
            var s = 0;
            if (t.geometry) {
                var o = t.geometry.type;
                "Point" !== o && "MultiPoint" !== o && r(t, function(r, o) {
                    var a = v([r, o], t.properties);
                    return e(a, n, i, s), s++, o
                })
            }
        })
    }

    function p(t, e, n) {
        var i = n,
            r = !1;
        return d(t, function(t, s, o, a) {
            i = !1 === r && void 0 === n ? t : e(i, t, s, o, a), r = !0
        }), i
    }

    function m(t, e) {
        if (void 0 === t) throw new Error("No geometry passed");
        return {
            type: "Feature",
            properties: e || {},
            geometry: t
        }
    }

    function v(t, e) {
        if (!t) throw new Error("No coordinates passed");
        if (t.length < 2) throw new Error("Coordinates must be an array of two or more positions");
        return {
            type: "Feature",
            properties: e || {},
            geometry: {
                type: "LineString",
                coordinates: t
            }
        }
    }

    function y(t, e) {
        if (!t) throw new Error("geojson is required");
        var n = t.geometry ? t.geometry.type : t.type;
        if (!n) throw new Error("invalid geojson");
        if ("FeatureCollection" === n) throw new Error("FeatureCollection is not supported");
        if ("GeometryCollection" === n) throw new Error("GeometryCollection is not supported");
        var i = t.geometry ? t.geometry.coordinates : t.coordinates;
        if (!i) throw new Error("geojson must contain coordinates");
        switch (n) {
            case "LineString":
                return void e(i, 0, 0);
            case "Polygon":
            case "MultiLineString":
                for (var r = 0, s = 0; s < i.length; s++) "MultiLineString" === n && (r = s), e(i[s], s, r);
                return;
            case "MultiPolygon":
                for (var o = 0; o < i.length; o++)
                    for (var a = 0; a < i[o].length; a++) e(i[o][a], a, o);
                return;
            default:
                throw new Error(n + " geometry not supported")
        }
    }

    function E(t, e, n) {
        var i = n;
        return y(t, function(t, r, s) {
            i = 0 === r && void 0 === n ? t : e(i, t, r, s)
        }), i
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.coordEach = i, e.coordReduce = r, e.propEach = s, e.propReduce = o, e.featureEach = a, e.featureReduce = u, e.coordAll = l, e.geomEach = h, e.geomReduce = c, e.flattenEach = f, e.flattenReduce = g, e.segmentEach = d, e.segmentReduce = p, e.feature = m, e.lineString = v, e.lineEach = y, e.lineReduce = E
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = {
        _initSnappableMarkers: function() {
            this.options.snapDistance = this.options.snapDistance || 30, this.isPolygon() ? this._markers.map(this._assignEvents, this) : this._assignEvents(this._markers), this._layer.off("pm:dragstart", this._unsnap, this), this._layer.on("pm:dragstart", this._unsnap, this)
        },
        _assignEvents: function(t) {
            var e = this;
            t.forEach(function(t) {
                t.off("drag", e._handleSnapping, e), t.on("drag", e._handleSnapping, e), t.off("dragend", e._cleanupSnapping, e), t.on("dragend", e._cleanupSnapping, e)
            })
        },
        _unsnap: function() {
            delete this._snapLatLng
        },
        _cleanupSnapping: function() {
            delete this._snapList, this._map.off("pm:remove", this._handleSnapLayerRemoval, this), this.debugIndicatorLines && this.debugIndicatorLines.forEach(function(t) {
                t.remove()
            })
        },
        _handleSnapLayerRemoval: function(t) {
            var e = t.layer,
                n = this._snapList.findIndex(function(t) {
                    return t._leaflet_id === e._leaflet_id
                });
            this._snapList.splice(n, 1)
        },
        _handleSnapping: function(t) {
            var e = this;
            if (t.originalEvent.altKey) return !1;
            if (void 0 === this._snapList && this._createSnapList(t), this._snapList.length <= 0) return !1;
            var n = t.target,
                i = this._calcClosestLayer(n.getLatLng(), this._snapList),
                r = i.layer instanceof L.Marker || i.layer instanceof L.CircleMarker,
                s = void 0;
            s = r ? i.latlng : this._checkPrioritiySnapping(i);
            var o = this.options.snapDistance,
                a = {
                    marker: n,
                    snapLatLng: s,
                    segment: i.segment,
                    layer: this._layer,
                    layerInteractedWith: i.layer
                };
            if (i.distance < o) {
                n.setLatLng(s), n._snapped = !0;
                var u = this._snapLatLng || {},
                    l = s || {};
                u.lat === l.lat && u.lng === l.lng || function() {
                    e._snapLatLng = s, n.fire("pm:snap", a), e._layer.fire("pm:snap", a)
                }()
            } else this._snapLatLng && (this._unsnap(a), n._snapped = !1, a.marker.fire("pm:unsnap", a), this._layer.fire("pm:unsnap", a));
            return !0
        },
        _checkPrioritiySnapping: function(t) {
            var e = this._map,
                n = t.segment[0],
                i = t.segment[1],
                r = t.latlng,
                s = this._getDistance(e, n, r),
                o = this._getDistance(e, i, r),
                a = s < o ? n : i,
                u = s < o ? s : o,
                l = this.options.snapDistance,
                h = void 0;
            return h = u < l ? a : r, Object.assign({}, h)
        },
        _createSnapList: function() {
            var t = this,
                e = [],
                n = [],
                i = this._map;
            i.eachLayer(function(r) {
                if (r instanceof L.Polyline || r instanceof L.Marker || r instanceof L.CircleMarker) {
                    e.push(r), i.off("pm:remove", t._handleSnapLayerRemoval, t), i.on("pm:remove", t._handleSnapLayerRemoval, t);
                    var s = L.polyline([], {
                        color: "red",
                        pmIgnore: !0
                    });
                    n.push(s)
                }
            }), e = e.filter(function(e) {
                return t._layer !== e
            }), e = e.filter(function(t) {
                return t._latlng || t._latlngs && t._latlngs.length > 0
            }), e = e.filter(function(t) {
                return !t._pmTempLayer
            }), this._otherSnapLayers ? this._snapList = e.concat(this._otherSnapLayers) : this._snapList = e, this.debugIndicatorLines = n
        },
        _calcClosestLayer: function(t, e) {
            var n = this,
                i = {};
            return e.forEach(function(e, r) {
                var s = n._calcLayerDistances(t, e);
                n.debugIndicatorLines[r].setLatLngs([t, s.latlng]), (void 0 === i.distance || s.distance < i.distance) && (i = s, i.layer = e)
            }), i
        },
        _calcLayerDistances: function(t, e) {
            var n = this,
                i = this._map,
                r = e instanceof L.Polygon,
                s = !(e instanceof L.Polygon) && e instanceof L.Polyline,
                o = e instanceof L.Marker || e instanceof L.CircleMarker,
                a = t,
                u = void 0;
            if (r) u = e.getLatLngs()[0];
            else if (s) u = e.getLatLngs();
            else if (o) return u = e.getLatLng(), {
                latlng: Object.assign({}, u),
                distance: this._getDistance(i, u, a)
            };
            var l = void 0,
                h = void 0;
            u.forEach(function(t, e) {
                var s = t,
                    o = void 0;
                o = r ? e + 1 === u.length ? 0 : e + 1 : e + 1 === u.length ? void 0 : e + 1;
                var c = u[o];
                if (c) {
                    var f = n._getDistanceToSegment(i, a, s, c);
                    (void 0 === h || f < h) && (h = f, l = [s, c])
                }
                return !0
            });
            var c = this._getClosestPointOnSegment(i, t, l[0], l[1]);
            return {
                latlng: Object.assign({}, c),
                segment: l,
                distance: h
            }
        },
        _getClosestPointOnSegment: function(t, e, n, i) {
            var r = t.getMaxZoom();
            r === 1 / 0 && (r = t.getZoom());
            var s = t.project(e, r),
                o = t.project(n, r),
                a = t.project(i, r),
                u = L.LineUtil.closestPointOnSegment(s, o, a);
            return t.unproject(u, r)
        },
        _getDistanceToSegment: function(t, e, n, i) {
            var r = t.latLngToLayerPoint(e),
                s = t.latLngToLayerPoint(n),
                o = t.latLngToLayerPoint(i);
            return L.LineUtil.pointToSegmentDistance(r, s, o)
        },
        _getDistance: function(t, e, n) {
            return t.latLngToLayerPoint(e).distanceTo(t.latLngToLayerPoint(n))
        }
    };
    e.default = i
}, function(t, e, n) {
    function i(t, e, n, i, r, s, o, a) {
        var u, l, h, c, f, g = {
            x: null,
            y: null,
            onLine1: !1,
            onLine2: !1
        };
        return 0 === (u = (a - s) * (n - t) - (o - r) * (i - e)) ? null !== g.x && null !== g.y && g : (l = e - s, h = t - r, c = (o - r) * l - (a - s) * h, f = (n - t) * l - (i - e) * h, l = c / u, h = f / u, g.x = t + l * (n - t), g.y = e + l * (i - e), l >= 0 && l <= 1 && (g.onLine1 = !0), h >= 0 && h <= 1 && (g.onLine2 = !0), !(!g.onLine1 || !g.onLine2) && [g.x, g.y])
    }
    var r = n(2).point;
    t.exports = function(t) {
        var e, n, s = {
            type: "FeatureCollection",
            features: []
        };
        if (n = "Feature" === t.type ? t.geometry : t, "LineString" === n.type) e = [n.coordinates];
        else if ("MultiLineString" === n.type) e = n.coordinates;
        else if ("MultiPolygon" === n.type) e = [].concat.apply([], n.coordinates);
        else {
            if ("Polygon" !== n.type) throw new Error("Input must be a LineString, MultiLineString, Polygon, or MultiPolygon Feature or Geometry");
            e = n.coordinates
        }
        return e.forEach(function(t) {
            e.forEach(function(e) {
                for (var n = 0; n < t.length - 1; n++)
                    for (var o = n; o < e.length - 1; o++) {
                        if (t === e) {
                            if (1 === Math.abs(n - o)) continue;
                            if (0 === n && o === t.length - 2 && t[n][0] === t[t.length - 1][0] && t[n][1] === t[t.length - 1][1]) continue
                        }
                        var a = i(t[n][0], t[n][1], t[n + 1][0], t[n + 1][1], e[o][0], e[o][1], e[o + 1][0], e[o + 1][1]);
                        a && s.features.push(r([a[0], a[1]]))
                    }
            })
        }), s
    }
}, function(t, e, n) {
    ! function(t, n) {
        n(e)
    }(0, function(t) {
        "use strict";

        function e(t, e) {
            for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
        }

        function n() {}

        function i() {}

        function r() {}

        function s() {}

        function o() {}

        function a() {}

        function u() {}

        function l(t) {
            this.name = "RuntimeException", this.message = t, this.stack = (new Error).stack, Error.call(this, t)
        }

        function h(t, e) {
            t.prototype = Object.create(e.prototype), t.prototype.constructor = t
        }

        function c() {
            if (0 === arguments.length) l.call(this);
            else if (1 === arguments.length) {
                var t = arguments[0];
                l.call(this, t)
            }
        }

        function f() {}

        function g() {
            if (this.x = null, this.y = null, this.z = null, 0 === arguments.length) g.call(this, 0, 0);
            else if (1 === arguments.length) {
                var t = arguments[0];
                g.call(this, t.x, t.y, t.z)
            } else if (2 === arguments.length) {
                var e = arguments[0],
                    n = arguments[1];
                g.call(this, e, n, g.NULL_ORDINATE)
            } else if (3 === arguments.length) {
                var i = arguments[0],
                    r = arguments[1],
                    s = arguments[2];
                this.x = i, this.y = r, this.z = s
            }
        }

        function d() {
            if (this.dimensionsToTest = 2, 0 === arguments.length) d.call(this, 2);
            else if (1 === arguments.length) {
                var t = arguments[0];
                if (2 !== t && 3 !== t) throw new i("only 2 or 3 dimensions may be specified");
                this.dimensionsToTest = t
            }
        }

        function p() {}

        function m() {}

        function v(t) {
            this.message = t || ""
        }

        function y() {}

        function E(t) {
            this.message = t || ""
        }

        function x(t) {
            this.message = t || ""
        }

        function I() {
            this.array_ = [], arguments[0] instanceof m && this.addAll(arguments[0])
        }

        function N() {
            if (I.apply(this), 0 === arguments.length);
            else if (1 === arguments.length) {
                var t = arguments[0];
                this.ensureCapacity(t.length), this.add(t, !0)
            } else if (2 === arguments.length) {
                var e = arguments[0],
                    n = arguments[1];
                this.ensureCapacity(e.length), this.add(e, n)
            }
        }

        function C() {
            if (this.minx = null, this.maxx = null, this.miny = null, this.maxy = null, 0 === arguments.length) this.init();
            else if (1 === arguments.length) {
                if (arguments[0] instanceof g) {
                    var t = arguments[0];
                    this.init(t.x, t.x, t.y, t.y)
                } else if (arguments[0] instanceof C) {
                    var e = arguments[0];
                    this.init(e)
                }
            } else if (2 === arguments.length) {
                var n = arguments[0],
                    i = arguments[1];
                this.init(n.x, i.x, n.y, i.y)
            } else if (4 === arguments.length) {
                var r = arguments[0],
                    s = arguments[1],
                    o = arguments[2],
                    a = arguments[3];
                this.init(r, s, o, a)
            }
        }

        function L() {}

        function _() {
            L.call(this, "Projective point not representable on the Cartesian plane.")
        }

        function S() {}

        function w(t, e) {
            return t.interfaces_ && t.interfaces_().indexOf(e) > -1
        }

        function b() {}

        function R(t) {
            this.str = t
        }

        function M(t) {
            this.value = t
        }

        function T() {}

        function P() {
            if (this.hi = 0, this.lo = 0, 0 === arguments.length) this.init(0);
            else if (1 === arguments.length) {
                if ("number" == typeof arguments[0]) {
                    var t = arguments[0];
                    this.init(t)
                } else if (arguments[0] instanceof P) {
                    var e = arguments[0];
                    this.init(e)
                } else if ("string" == typeof arguments[0]) {
                    var n = arguments[0];
                    P.call(this, P.parse(n))
                }
            } else if (2 === arguments.length) {
                var i = arguments[0],
                    r = arguments[1];
                this.init(i, r)
            }
        }

        function O() {}

        function D() {}

        function A() {}

        function F() {
            if (this.x = null, this.y = null, this.w = null, 0 === arguments.length) this.x = 0, this.y = 0, this.w = 1;
            else if (1 === arguments.length) {
                var t = arguments[0];
                this.x = t.x, this.y = t.y, this.w = 1
            } else if (2 === arguments.length) {
                if ("number" == typeof arguments[0] && "number" == typeof arguments[1]) {
                    var e = arguments[0],
                        n = arguments[1];
                    this.x = e, this.y = n, this.w = 1
                } else if (arguments[0] instanceof F && arguments[1] instanceof F) {
                    var i = arguments[0],
                        r = arguments[1];
                    this.x = i.y * r.w - r.y * i.w, this.y = r.x * i.w - i.x * r.w, this.w = i.x * r.y - r.x * i.y
                } else if (arguments[0] instanceof g && arguments[1] instanceof g) {
                    var s = arguments[0],
                        o = arguments[1];
                    this.x = s.y - o.y, this.y = o.x - s.x, this.w = s.x * o.y - o.x * s.y
                }
            } else if (3 === arguments.length) {
                var a = arguments[0],
                    u = arguments[1],
                    l = arguments[2];
                this.x = a, this.y = u, this.w = l
            } else if (4 === arguments.length) {
                var h = arguments[0],
                    c = arguments[1],
                    f = arguments[2],
                    d = arguments[3],
                    p = h.y - c.y,
                    m = c.x - h.x,
                    v = h.x * c.y - c.x * h.y,
                    y = f.y - d.y,
                    E = d.x - f.x,
                    x = f.x * d.y - d.x * f.y;
                this.x = m * x - E * v, this.y = y * v - p * x, this.w = p * E - y * m
            }
        }

        function k() {}

        function G() {}

        function B() {
            this.envelope = null, this.factory = null, this.SRID = null, this.userData = null;
            var t = arguments[0];
            this.factory = t, this.SRID = t.getSRID()
        }

        function q() {}

        function z() {}

        function V() {}

        function U() {}

        function Y() {}

        function X() {}

        function H() {}

        function j() {}

        function W() {}

        function K() {}

        function J() {}

        function Z() {}

        function Q() {
            this.array_ = [], arguments[0] instanceof m && this.addAll(arguments[0])
        }

        function $(t) {
            return null == t ? Qs : t.color
        }

        function tt(t) {
            return null == t ? null : t.parent
        }

        function et(t, e) {
            null !== t && (t.color = e)
        }

        function nt(t) {
            return null == t ? null : t.left
        }

        function it(t) {
            return null == t ? null : t.right
        }

        function rt() {
            this.root_ = null, this.size_ = 0
        }

        function st() {}

        function ot() {}

        function at() {
            this.array_ = [], arguments[0] instanceof m && this.addAll(arguments[0])
        }

        function ut() {}

        function lt() {}

        function ht() {}

        function ct() {}

        function ft() {
            this.geometries = null;
            var t = arguments[0],
                e = arguments[1];
            if (B.call(this, e), null === t && (t = []), B.hasNullElements(t)) throw new i("geometries must not contain null elements");
            this.geometries = t
        }

        function gt() {
            var t = arguments[0],
                e = arguments[1];
            ft.call(this, t, e)
        }

        function dt() {
            if (this.geom = null, this.geomFact = null, this.bnRule = null, this.endpointMap = null, 1 === arguments.length) {
                var t = arguments[0];
                dt.call(this, t, z.MOD2_BOUNDARY_RULE)
            } else if (2 === arguments.length) {
                var e = arguments[0],
                    n = arguments[1];
                this.geom = e, this.geomFact = e.getFactory(), this.bnRule = n
            }
        }

        function pt() {
            this.count = null
        }

        function mt() {}

        function vt() {}

        function yt() {}

        function Et() {}

        function xt() {}

        function It() {}

        function Nt() {}

        function Ct() {}

        function Lt() {
            this.points = null;
            var t = arguments[0],
                e = arguments[1];
            B.call(this, e), this.init(t)
        }

        function _t() {}

        function St() {
            this.coordinates = null;
            var t = arguments[0],
                e = arguments[1];
            B.call(this, e), this.init(t)
        }

        function wt() {}

        function bt() {
            this.shell = null, this.holes = null;
            var t = arguments[0],
                e = arguments[1],
                n = arguments[2];
            if (B.call(this, n), null === t && (t = this.getFactory().createLinearRing()), null === e && (e = []), B.hasNullElements(e)) throw new i("holes must not contain null elements");
            if (t.isEmpty() && B.hasNonEmptyElements(e)) throw new i("shell is empty but holes are not");
            this.shell = t, this.holes = e
        }

        function Rt() {
            var t = arguments[0],
                e = arguments[1];
            ft.call(this, t, e)
        }

        function Mt() {
            if (arguments[0] instanceof g && arguments[1] instanceof ne) {
                var t = arguments[0],
                    e = arguments[1];
                Mt.call(this, e.getCoordinateSequenceFactory().create(t), e)
            } else if (w(arguments[0], D) && arguments[1] instanceof ne) {
                var n = arguments[0],
                    i = arguments[1];
                Lt.call(this, n, i), this.validateConstruction()
            }
        }

        function Tt() {
            var t = arguments[0],
                e = arguments[1];
            ft.call(this, t, e)
        }

        function Pt() {
            if (this.factory = null, this.isUserDataCopied = !1, 0 === arguments.length);
            else if (1 === arguments.length) {
                var t = arguments[0];
                this.factory = t
            }
        }

        function Ot() {}

        function Dt() {}

        function At() {}

        function Ft() {}

        function kt() {
            if (this.dimension = 3, this.coordinates = null, 1 === arguments.length) {
                if (arguments[0] instanceof Array) {
                    var t = arguments[0];
                    kt.call(this, t, 3)
                } else if (Number.isInteger(arguments[0])) {
                    var e = arguments[0];
                    this.coordinates = new Array(e).fill(null);
                    for (var n = 0; n < e; n++) this.coordinates[n] = new g
                } else if (w(arguments[0], D)) {
                    var i = arguments[0];
                    if (null === i) return this.coordinates = new Array(0).fill(null), null;
                    this.dimension = i.getDimension(), this.coordinates = new Array(i.size()).fill(null);
                    for (var n = 0; n < this.coordinates.length; n++) this.coordinates[n] = i.getCoordinateCopy(n)
                }
            } else if (2 === arguments.length)
                if (arguments[0] instanceof Array && Number.isInteger(arguments[1])) {
                    var r = arguments[0],
                        s = arguments[1];
                    this.coordinates = r, this.dimension = s, null === r && (this.coordinates = new Array(0).fill(null))
                } else if (Number.isInteger(arguments[0]) && Number.isInteger(arguments[1])) {
                var o = arguments[0],
                    a = arguments[1];
                this.coordinates = new Array(o).fill(null), this.dimension = a;
                for (var n = 0; n < o; n++) this.coordinates[n] = new g
            }
        }

        function Gt() {}

        function Bt(t, e) {
            return t === e || t !== t && e !== e
        }

        function qt(t) {
            this.add ? t.forEach(this.add, this) : t.forEach(function(t) {
                this.set(t[0], t[1])
            }, this)
        }

        function zt(t) {
            return this.has(t) && (this._keys.splice(to, 1), this._values.splice(to, 1), this._itp.forEach(function(t) {
                to < t[0] && t[0]--
            })), to > -1
        }

        function Vt(t) {
            return this.has(t) ? this._values[to] : void 0
        }

        function Ut(t, e) {
            if (this.objectOnly && e !== Object(e)) throw new TypeError("Invalid value used as weak collection key");
            if (e !== e || 0 === e)
                for (to = t.length; to-- && !Bt(t[to], e););
            else to = t.indexOf(e);
            return to > -1
        }

        function Yt(t) {
            return Ut.call(this, this._keys, t)
        }

        function Xt(t, e) {
            return this.has(t) ? this._values[to] = e : this._values[this._keys.push(t) - 1] = e, this
        }

        function Ht() {
            (this._keys || 0).length = this._values.length = 0
        }

        function jt() {
            return Jt(this._itp, this._keys)
        }

        function Wt() {
            return Jt(this._itp, this._values)
        }

        function Kt() {
            return Jt(this._itp, this._keys, this._values)
        }

        function Jt(t, e, n) {
            var i = [0],
                r = !1;
            return t.push(i), {
                next: function() {
                    var s, o = i[0];
                    return !r && o < e.length ? (s = n ? [e[o], n[o]] : e[o], i[0]++) : (r = !0, t.splice(t.indexOf(i), 1)), {
                        done: r,
                        value: s
                    }
                }
            }
        }

        function Zt() {
            return this._values.length
        }

        function Qt(t, e) {
            for (var n = this.entries();;) {
                var i = n.next();
                if (i.done) break;
                t.call(e, i.value[1], i.value[0], this)
            }
        }

        function $t() {
            this.map_ = new io
        }

        function te() {
            if (this.modelType = null, this.scale = null, 0 === arguments.length) this.modelType = te.FLOATING;
            else if (1 === arguments.length)
                if (arguments[0] instanceof ee) {
                    var t = arguments[0];
                    this.modelType = t, t === te.FIXED && this.setScale(1)
                } else if ("number" == typeof arguments[0]) {
                var e = arguments[0];
                this.modelType = te.FIXED, this.setScale(e)
            } else if (arguments[0] instanceof te) {
                var n = arguments[0];
                this.modelType = n.modelType, this.scale = n.scale
            }
        }

        function ee() {
            this.name = null;
            var t = arguments[0];
            this.name = t, ee.nameToTypeMap.put(t, this)
        }

        function ne() {
            if (this.precisionModel = null, this.coordinateSequenceFactory = null, this.SRID = null, 0 === arguments.length) ne.call(this, new te, 0);
            else if (1 === arguments.length) {
                if (w(arguments[0], k)) {
                    var t = arguments[0];
                    ne.call(this, new te, 0, t)
                } else if (arguments[0] instanceof te) {
                    var e = arguments[0];
                    ne.call(this, e, 0, ne.getDefaultCoordinateSequenceFactory())
                }
            } else if (2 === arguments.length) {
                var n = arguments[0],
                    i = arguments[1];
                ne.call(this, n, i, ne.getDefaultCoordinateSequenceFactory())
            } else if (3 === arguments.length) {
                var r = arguments[0],
                    s = arguments[1],
                    o = arguments[2];
                this.precisionModel = r, this.coordinateSequenceFactory = o, this.SRID = s
            }
        }

        function ie(t) {
            this.geometryFactory = t || new ne
        }

        function re(t) {
            this.parser = new ie(t)
        }

        function se() {
            this.result = null, this.inputLines = Array(2).fill().map(function() {
                return Array(2)
            }), this.intPt = new Array(2).fill(null), this.intLineIndex = null, this._isProper = null, this.pa = null, this.pb = null, this.precisionModel = null, this.intPt[0] = new g, this.intPt[1] = new g, this.pa = this.intPt[0], this.pb = this.intPt[1], this.result = 0
        }

        function oe() {
            se.apply(this)
        }

        function ae() {}

        function ue() {
            this.p = null, this.crossingCount = 0, this.isPointOnSegment = !1;
            var t = arguments[0];
            this.p = t
        }

        function le() {}

        function he() {
            if (this.p0 = null, this.p1 = null, 0 === arguments.length) he.call(this, new g, new g);
            else if (1 === arguments.length) {
                var t = arguments[0];
                he.call(this, t.p0, t.p1)
            } else if (2 === arguments.length) {
                var e = arguments[0],
                    n = arguments[1];
                this.p0 = e, this.p1 = n
            } else if (4 === arguments.length) {
                var i = arguments[0],
                    r = arguments[1],
                    s = arguments[2],
                    o = arguments[3];
                he.call(this, new g(i, r), new g(s, o))
            }
        }

        function ce() {
            if (this.matrix = null, 0 === arguments.length) this.matrix = Array(3).fill().map(function() {
                return Array(3)
            }), this.setAll(lt.FALSE);
            else if (1 === arguments.length)
                if ("string" == typeof arguments[0]) {
                    var t = arguments[0];
                    ce.call(this), this.set(t)
                } else if (arguments[0] instanceof ce) {
                var e = arguments[0];
                ce.call(this), this.matrix[S.INTERIOR][S.INTERIOR] = e.matrix[S.INTERIOR][S.INTERIOR], this.matrix[S.INTERIOR][S.BOUNDARY] = e.matrix[S.INTERIOR][S.BOUNDARY], this.matrix[S.INTERIOR][S.EXTERIOR] = e.matrix[S.INTERIOR][S.EXTERIOR], this.matrix[S.BOUNDARY][S.INTERIOR] = e.matrix[S.BOUNDARY][S.INTERIOR], this.matrix[S.BOUNDARY][S.BOUNDARY] = e.matrix[S.BOUNDARY][S.BOUNDARY], this.matrix[S.BOUNDARY][S.EXTERIOR] = e.matrix[S.BOUNDARY][S.EXTERIOR], this.matrix[S.EXTERIOR][S.INTERIOR] = e.matrix[S.EXTERIOR][S.INTERIOR], this.matrix[S.EXTERIOR][S.BOUNDARY] = e.matrix[S.EXTERIOR][S.BOUNDARY], this.matrix[S.EXTERIOR][S.EXTERIOR] = e.matrix[S.EXTERIOR][S.EXTERIOR]
            }
        }

        function fe() {
            this.areaBasePt = null, this.triangleCent3 = new g, this.areasum2 = 0, this.cg3 = new g, this.lineCentSum = new g, this.totalLength = 0, this.ptCount = 0, this.ptCentSum = new g;
            var t = arguments[0];
            this.areaBasePt = null, this.add(t)
        }

        function ge(t) {
            this.message = t || ""
        }

        function de() {
            this.array_ = []
        }

        function pe() {
            this.treeSet = new at, this.list = new I
        }

        function me() {
            if (this.geomFactory = null, this.inputPts = null, 1 === arguments.length) {
                var t = arguments[0];
                me.call(this, me.extractCoordinates(t), t.getFactory())
            } else if (2 === arguments.length) {
                var e = arguments[0],
                    n = arguments[1];
                this.inputPts = pe.filterCoordinates(e), this.geomFactory = n
            }
        }

        function ve() {
            this.origin = null;
            var t = arguments[0];
            this.origin = t
        }

        function ye() {
            this.inputGeom = null, this.factory = null, this.pruneEmptyGeometry = !0, this.preserveGeometryCollectionType = !0, this.preserveCollections = !1, this.preserveType = !1
        }

        function Ee() {
            if (this.snapTolerance = 0, this.srcPts = null, this.seg = new he, this.allowSnappingToSourceVertices = !1, this._isClosed = !1, arguments[0] instanceof Lt && "number" == typeof arguments[1]) {
                var t = arguments[0],
                    e = arguments[1];
                Ee.call(this, t.getCoordinates(), e)
            } else if (arguments[0] instanceof Array && "number" == typeof arguments[1]) {
                var n = arguments[0],
                    i = arguments[1];
                this.srcPts = n, this._isClosed = Ee.isClosed(n), this.snapTolerance = i
            }
        }

        function xe() {
            this.srcGeom = null;
            var t = arguments[0];
            this.srcGeom = t
        }

        function Ie() {
            if (ye.apply(this), this.snapTolerance = null, this.snapPts = null, this.isSelfSnap = !1, 2 === arguments.length) {
                var t = arguments[0],
                    e = arguments[1];
                this.snapTolerance = t, this.snapPts = e
            } else if (3 === arguments.length) {
                var n = arguments[0],
                    i = arguments[1],
                    r = arguments[2];
                this.snapTolerance = n, this.snapPts = i, this.isSelfSnap = r
            }
        }

        function Ne() {
            this.isFirst = !0, this.commonMantissaBitsCount = 53, this.commonBits = 0, this.commonSignExp = null
        }

        function Ce() {
            this.commonCoord = null, this.ccFilter = new Le
        }

        function Le() {
            this.commonBitsX = new Ne, this.commonBitsY = new Ne
        }

        function _e() {
            this.trans = null;
            var t = arguments[0];
            this.trans = t
        }

        function Se() {
            this.parent = null, this.atStart = null, this.max = null, this.index = null, this.subcollectionIterator = null;
            var t = arguments[0];
            this.parent = t, this.atStart = !0, this.index = 0, this.max = t.getNumGeometries()
        }

        function we() {
            if (this.boundaryRule = z.OGC_SFS_BOUNDARY_RULE, this.isIn = null, this.numBoundaries = null, 0 === arguments.length);
            else if (1 === arguments.length) {
                var t = arguments[0];
                if (null === t) throw new i("Rule must be non-null");
                this.boundaryRule = t
            }
        }

        function be() {}

        function Re() {}

        function Me() {
            this.pts = null, this.data = null;
            var t = arguments[0],
                e = arguments[1];
            this.pts = t, this.data = e
        }

        function Te() {}

        function Pe() {
            this.bounds = null, this.item = null;
            var t = arguments[0],
                e = arguments[1];
            this.bounds = t, this.item = e
        }

        function Oe() {
            this._size = null, this.items = null, this._size = 0, this.items = new I, this.items.add(null)
        }

        function De() {}

        function Ae() {}

        function Fe() {
            if (this.childBoundables = new I, this.bounds = null, this.level = null, 0 === arguments.length);
            else if (1 === arguments.length) {
                var t = arguments[0];
                this.level = t
            }
        }

        function ke() {
            this.boundable1 = null, this.boundable2 = null, this._distance = null, this.itemDistance = null;
            var t = arguments[0],
                e = arguments[1],
                n = arguments[2];
            this.boundable1 = t, this.boundable2 = e, this.itemDistance = n, this._distance = this.distance()
        }

        function Ge() {
            if (this.root = null, this.built = !1, this.itemBoundables = new I, this.nodeCapacity = null, 0 === arguments.length) Ge.call(this, Ge.DEFAULT_NODE_CAPACITY);
            else if (1 === arguments.length) {
                var t = arguments[0];
                f.isTrue(t > 1, "Node capacity must be greater than 1"), this.nodeCapacity = t
            }
        }

        function Be() {}

        function qe() {}

        function ze() {
            if (0 === arguments.length) ze.call(this, ze.DEFAULT_NODE_CAPACITY);
            else if (1 === arguments.length) {
                var t = arguments[0];
                Ge.call(this, t)
            }
        }

        function Ve() {
            var t = arguments[0];
            Fe.call(this, t)
        }

        function Ue() {}

        function Ye() {
            this.segString = null, this.coord = null, this.segmentIndex = null, this.segmentOctant = null, this._isInterior = null;
            var t = arguments[0],
                e = arguments[1],
                n = arguments[2],
                i = arguments[3];
            this.segString = t, this.coord = new g(e), this.segmentIndex = n, this.segmentOctant = i, this._isInterior = !e.equals2D(t.getCoordinate(n))
        }

        function Xe() {
            this.nodeMap = new rt, this.edge = null;
            var t = arguments[0];
            this.edge = t
        }

        function He() {
            this.nodeList = null, this.edge = null, this.nodeIt = null, this.currNode = null, this.nextNode = null, this.currSegIndex = 0;
            var t = arguments[0];
            this.nodeList = t, this.edge = t.getEdge(), this.nodeIt = t.iterator(), this.readNextNode()
        }

        function je() {}

        function We() {
            this.nodeList = new Xe(this), this.pts = null, this.data = null;
            var t = arguments[0],
                e = arguments[1];
            this.pts = t, this.data = e
        }

        function Ke() {
            this.tempEnv1 = new C, this.tempEnv2 = new C, this.overlapSeg1 = new he, this.overlapSeg2 = new he
        }

        function Je() {
            this.pts = null, this.start = null, this.end = null, this.env = null, this.context = null, this.id = null;
            var t = arguments[0],
                e = arguments[1],
                n = arguments[2],
                i = arguments[3];
            this.pts = t, this.start = e, this.end = n, this.context = i
        }

        function Ze() {}

        function Qe() {}

        function $e() {}

        function tn() {
            if (this.segInt = null, 0 === arguments.length);
            else if (1 === arguments.length) {
                var t = arguments[0];
                this.setSegmentIntersector(t)
            }
        }

        function en() {
            if (this.monoChains = new I, this.index = new ze, this.idCounter = 0, this.nodedSegStrings = null, this.nOverlaps = 0, 0 === arguments.length);
            else if (1 === arguments.length) {
                var t = arguments[0];
                tn.call(this, t)
            }
        }

        function nn() {
            Ke.apply(this), this.si = null;
            var t = arguments[0];
            this.si = t
        }

        function rn() {
            if (this.pt = null, 1 === arguments.length) {
                var t = arguments[0];
                l.call(this, t)
            } else if (2 === arguments.length) {
                var e = arguments[0],
                    n = arguments[1];
                l.call(this, rn.msgWithCoord(e, n)), this.name = "TopologyException", this.pt = new g(n)
            }
        }

        function sn() {}

        function on() {
            this.findAllIntersections = !1, this.isCheckEndSegmentsOnly = !1, this.li = null, this.interiorIntersection = null, this.intSegments = null, this.intersections = new I, this.intersectionCount = 0, this.keepIntersections = !0;
            var t = arguments[0];
            this.li = t, this.interiorIntersection = null
        }

        function an() {
            this.li = new oe, this.segStrings = null, this.findAllIntersections = !1, this.segInt = null, this._isValid = !0;
            var t = arguments[0];
            this.segStrings = t
        }

        function un() {
            this.nv = null;
            var t = arguments[0];
            this.nv = new an(un.toSegmentStrings(t))
        }

        function ln() {
            this.mapOp = null;
            var t = arguments[0];
            this.mapOp = t
        }

        function hn() {}

        function cn() {
            if (this.location = null, 1 === arguments.length) {
                if (arguments[0] instanceof Array) {
                    var t = arguments[0];
                    this.init(t.length)
                } else if (Number.isInteger(arguments[0])) {
                    var e = arguments[0];
                    this.init(1), this.location[hn.ON] = e
                } else if (arguments[0] instanceof cn) {
                    var n = arguments[0];
                    if (this.init(n.location.length), null !== n)
                        for (var i = 0; i < this.location.length; i++) this.location[i] = n.location[i]
                }
            } else if (3 === arguments.length) {
                var r = arguments[0],
                    s = arguments[1],
                    o = arguments[2];
                this.init(3), this.location[hn.ON] = r, this.location[hn.LEFT] = s, this.location[hn.RIGHT] = o
            }
        }

        function fn() {
            if (this.elt = new Array(2).fill(null), 1 === arguments.length) {
                if (Number.isInteger(arguments[0])) {
                    var t = arguments[0];
                    this.elt[0] = new cn(t), this.elt[1] = new cn(t)
                } else if (arguments[0] instanceof fn) {
                    var e = arguments[0];
                    this.elt[0] = new cn(e.elt[0]), this.elt[1] = new cn(e.elt[1])
                }
            } else if (2 === arguments.length) {
                var n = arguments[0],
                    i = arguments[1];
                this.elt[0] = new cn(S.NONE), this.elt[1] = new cn(S.NONE), this.elt[n].setLocation(i)
            } else if (3 === arguments.length) {
                var r = arguments[0],
                    s = arguments[1],
                    o = arguments[2];
                this.elt[0] = new cn(r, s, o), this.elt[1] = new cn(r, s, o)
            } else if (4 === arguments.length) {
                var a = arguments[0],
                    u = arguments[1],
                    l = arguments[2],
                    h = arguments[3];
                this.elt[0] = new cn(S.NONE, S.NONE, S.NONE), this.elt[1] = new cn(S.NONE, S.NONE, S.NONE), this.elt[a].setLocations(u, l, h)
            }
        }

        function gn() {
            this.startDe = null, this.maxNodeDegree = -1, this.edges = new I, this.pts = new I, this.label = new fn(S.NONE), this.ring = null, this._isHole = null, this.shell = null, this.holes = new I, this.geometryFactory = null;
            var t = arguments[0],
                e = arguments[1];
            this.geometryFactory = e, this.computePoints(t), this.computeRing()
        }

        function dn() {
            var t = arguments[0],
                e = arguments[1];
            gn.call(this, t, e)
        }

        function pn() {
            var t = arguments[0],
                e = arguments[1];
            gn.call(this, t, e)
        }

        function mn() {
            if (this.label = null, this._isInResult = !1, this._isCovered = !1, this._isCoveredSet = !1, this._isVisited = !1, 0 === arguments.length);
            else if (1 === arguments.length) {
                var t = arguments[0];
                this.label = t
            }
        }

        function vn() {
            mn.apply(this), this.coord = null, this.edges = null;
            var t = arguments[0],
                e = arguments[1];
            this.coord = t, this.edges = e, this.label = new fn(0, S.NONE)
        }

        function yn() {
            this.nodeMap = new rt, this.nodeFact = null;
            var t = arguments[0];
            this.nodeFact = t
        }

        function En() {
            if (this.edge = null, this.label = null, this.node = null, this.p0 = null, this.p1 = null, this.dx = null, this.dy = null, this.quadrant = null, 1 === arguments.length) {
                var t = arguments[0];
                this.edge = t
            } else if (3 === arguments.length) {
                var e = arguments[0],
                    n = arguments[1],
                    i = arguments[2];
                En.call(this, e, n, i, null)
            } else if (4 === arguments.length) {
                var r = arguments[0],
                    s = arguments[1],
                    o = arguments[2],
                    a = arguments[3];
                En.call(this, r), this.init(s, o), this.label = a
            }
        }

        function xn() {
            this._isForward = null, this._isInResult = !1, this._isVisited = !1, this.sym = null, this.next = null, this.nextMin = null, this.edgeRing = null, this.minEdgeRing = null, this.depth = [0, -999, -999];
            var t = arguments[0],
                e = arguments[1];
            if (En.call(this, t), this._isForward = e, e) this.init(t.getCoordinate(0), t.getCoordinate(1));
            else {
                var n = t.getNumPoints() - 1;
                this.init(t.getCoordinate(n), t.getCoordinate(n - 1))
            }
            this.computeDirectedLabel()
        }

        function In() {}

        function Nn() {
            if (this.edges = new I, this.nodes = null, this.edgeEndList = new I, 0 === arguments.length) this.nodes = new yn(new In);
            else if (1 === arguments.length) {
                var t = arguments[0];
                this.nodes = new yn(t)
            }
        }

        function Cn() {
            this.geometryFactory = null, this.shellList = new I;
            var t = arguments[0];
            this.geometryFactory = t
        }

        function Ln() {
            this.op = null, this.geometryFactory = null, this.ptLocator = null, this.lineEdgesList = new I, this.resultLineList = new I;
            var t = arguments[0],
                e = arguments[1],
                n = arguments[2];
            this.op = t, this.geometryFactory = e, this.ptLocator = n
        }

        function _n() {
            this.op = null, this.geometryFactory = null, this.resultPointList = new I;
            var t = arguments[0],
                e = arguments[1];
            arguments[2], this.op = t, this.geometryFactory = e
        }

        function Sn() {}

        function wn() {
            this.geom = null;
            var t = arguments[0];
            this.geom = t
        }

        function bn() {
            this.edgeMap = new rt, this.edgeList = null, this.ptInAreaLocation = [S.NONE, S.NONE]
        }

        function Rn() {
            bn.apply(this), this.resultAreaEdgeList = null, this.label = null, this.SCANNING_FOR_INCOMING = 1, this.LINKING_TO_OUTGOING = 2
        }

        function Mn() {
            In.apply(this)
        }

        function Tn() {
            this.mce = null, this.chainIndex = null;
            var t = arguments[0],
                e = arguments[1];
            this.mce = t, this.chainIndex = e
        }

        function Pn() {
            if (this.label = null, this.xValue = null, this.eventType = null, this.insertEvent = null, this.deleteEventIndex = null, this.obj = null, 2 === arguments.length) {
                var t = arguments[0],
                    e = arguments[1];
                this.eventType = Pn.DELETE, this.xValue = t, this.insertEvent = e
            } else if (3 === arguments.length) {
                var n = arguments[0],
                    i = arguments[1],
                    r = arguments[2];
                this.eventType = Pn.INSERT, this.label = n, this.xValue = i, this.obj = r
            }
        }

        function On() {}

        function Dn() {
            this._hasIntersection = !1, this.hasProper = !1, this.hasProperInterior = !1, this.properIntersectionPoint = null, this.li = null, this.includeProper = null, this.recordIsolated = null, this.isSelfIntersection = null, this.numIntersections = 0, this.numTests = 0, this.bdyNodes = null, this._isDone = !1, this.isDoneWhenProperInt = !1;
            var t = arguments[0],
                e = arguments[1],
                n = arguments[2];
            this.li = t, this.includeProper = e, this.recordIsolated = n
        }

        function An() {
            On.apply(this), this.events = new I, this.nOverlaps = null
        }

        function Fn() {
            this.min = r.POSITIVE_INFINITY, this.max = r.NEGATIVE_INFINITY
        }

        function kn() {}

        function Gn() {
            Fn.apply(this), this.item = null;
            var t = arguments[0],
                e = arguments[1],
                n = arguments[2];
            this.min = t, this.max = e, this.item = n
        }

        function Bn() {
            Fn.apply(this), this.node1 = null, this.node2 = null;
            var t = arguments[0],
                e = arguments[1];
            this.node1 = t, this.node2 = e, this.buildExtent(this.node1, this.node2)
        }

        function qn() {
            this.leaves = new I, this.root = null, this.level = 0
        }

        function zn() {
            if (this.lines = null, this.isForcedToLineString = !1, 1 === arguments.length) {
                var t = arguments[0];
                this.lines = t
            } else if (2 === arguments.length) {
                var e = arguments[0],
                    n = arguments[1];
                this.lines = e, this.isForcedToLineString = n
            }
        }

        function Vn() {
            this.items = new I
        }

        function Un() {
            this.index = null;
            var t = arguments[0];
            if (!w(t, wt)) throw new i("Argument must be Polygonal");
            this.index = new Xn(t)
        }

        function Yn() {
            this.counter = null;
            var t = arguments[0];
            this.counter = t
        }

        function Xn() {
            this.index = new qn;
            var t = arguments[0];
            this.init(t)
        }

        function Hn() {
            this.coord = null, this.segmentIndex = null, this.dist = null;
            var t = arguments[0],
                e = arguments[1],
                n = arguments[2];
            this.coord = new g(t), this.segmentIndex = e, this.dist = n
        }

        function jn() {
            this.nodeMap = new rt, this.edge = null;
            var t = arguments[0];
            this.edge = t
        }

        function Wn() {}

        function Kn() {
            this.e = null, this.pts = null, this.startIndex = null, this.env1 = new C, this.env2 = new C;
            var t = arguments[0];
            this.e = t, this.pts = t.getCoordinates();
            var e = new Wn;
            this.startIndex = e.getChainStartIndices(this.pts)
        }

        function Jn() {
            this.depth = Array(2).fill().map(function() {
                return Array(3)
            });
            for (var t = 0; t < 2; t++)
                for (var e = 0; e < 3; e++) this.depth[t][e] = Jn.NULL_VALUE
        }

        function Zn() {
            if (mn.apply(this), this.pts = null, this.env = null, this.eiList = new jn(this), this.name = null, this.mce = null, this._isIsolated = !0, this.depth = new Jn, this.depthDelta = 0, 1 === arguments.length) {
                var t = arguments[0];
                Zn.call(this, t, null)
            } else if (2 === arguments.length) {
                var e = arguments[0],
                    n = arguments[1];
                this.pts = e, this.label = n
            }
        }

        function Qn() {
            if (Nn.apply(this), this.parentGeom = null, this.lineEdgeMap = new $t, this.boundaryNodeRule = null, this.useBoundaryDeterminationRule = !0, this.argIndex = null, this.boundaryNodes = null, this._hasTooFewPoints = !1, this.invalidPoint = null, this.areaPtLocator = null, this.ptLocator = new we, 2 === arguments.length) {
                var t = arguments[0],
                    e = arguments[1];
                Qn.call(this, t, e, z.OGC_SFS_BOUNDARY_RULE)
            } else if (3 === arguments.length) {
                var n = arguments[0],
                    i = arguments[1],
                    r = arguments[2];
                this.argIndex = n, this.parentGeom = i, this.boundaryNodeRule = r, null !== i && this.add(i)
            }
        }

        function $n() {
            if (this.li = new oe, this.resultPrecisionModel = null, this.arg = null, 1 === arguments.length) {
                var t = arguments[0];
                this.setComputationPrecision(t.getPrecisionModel()), this.arg = new Array(1).fill(null), this.arg[0] = new Qn(0, t)
            } else if (2 === arguments.length) {
                var e = arguments[0],
                    n = arguments[1];
                $n.call(this, e, n, z.OGC_SFS_BOUNDARY_RULE)
            } else if (3 === arguments.length) {
                var i = arguments[0],
                    r = arguments[1],
                    s = arguments[2];
                i.getPrecisionModel().compareTo(r.getPrecisionModel()) >= 0 ? this.setComputationPrecision(i.getPrecisionModel()) : this.setComputationPrecision(r.getPrecisionModel()), this.arg = new Array(2).fill(null), this.arg[0] = new Qn(0, i, s), this.arg[1] = new Qn(1, r, s)
            }
        }

        function ti() {
            this.pts = null, this._orientation = null;
            var t = arguments[0];
            this.pts = t, this._orientation = ti.orientation(t)
        }

        function ei() {
            this.edges = new I, this.ocaMap = new rt
        }

        function ni() {
            this.ptLocator = new we, this.geomFact = null, this.resultGeom = null, this.graph = null, this.edgeList = new ei, this.resultPolyList = new I, this.resultLineList = new I, this.resultPointList = new I;
            var t = arguments[0],
                e = arguments[1];
            $n.call(this, t, e), this.graph = new Nn(new Mn), this.geomFact = t.getFactory()
        }

        function ii() {
            this.geom = new Array(2).fill(null), this.snapTolerance = null, this.cbr = null;
            var t = arguments[0],
                e = arguments[1];
            this.geom[0] = t, this.geom[1] = e, this.computeSnapTolerance()
        }

        function ri() {
            this.geom = new Array(2).fill(null);
            var t = arguments[0],
                e = arguments[1];
            this.geom[0] = t, this.geom[1] = e
        }

        function si() {
            this.factory = null, this.interiorPoint = null, this.maxWidth = 0;
            var t = arguments[0];
            this.factory = t.getFactory(), this.add(t)
        }

        function oi() {
            this.poly = null, this.centreY = null, this.hiY = r.MAX_VALUE, this.loY = -r.MAX_VALUE;
            var t = arguments[0];
            this.poly = t, this.hiY = t.getEnvelopeInternal().getMaxY(), this.loY = t.getEnvelopeInternal().getMinY(), this.centreY = si.avg(this.loY, this.hiY)
        }

        function ai() {
            this.centroid = null, this.minDistance = r.MAX_VALUE, this.interiorPoint = null;
            var t = arguments[0];
            this.centroid = t.getCentroid().getCoordinate(), this.addInterior(t), null === this.interiorPoint && this.addEndpoints(t)
        }

        function ui() {
            this.centroid = null, this.minDistance = r.MAX_VALUE, this.interiorPoint = null;
            var t = arguments[0];
            this.centroid = t.getCentroid().getCoordinate(), this.add(t)
        }

        function li() {
            this.tempEnv1 = new C, this.selectedSegment = new he
        }

        function hi() {
            this.items = new I, this.subnode = [null, null]
        }

        function ci() {
            if (this.min = null, this.max = null, 0 === arguments.length) this.min = 0, this.max = 0;
            else if (1 === arguments.length) {
                var t = arguments[0];
                this.init(t.min, t.max)
            } else if (2 === arguments.length) {
                var e = arguments[0],
                    n = arguments[1];
                this.init(e, n)
            }
        }

        function fi() {}

        function gi(t, e) {
            var n, i, r, s, o = {
                    32: {
                        d: 127,
                        c: 128,
                        b: 0,
                        a: 0
                    },
                    64: {
                        d: 32752,
                        c: 0,
                        b: 0,
                        a: 0
                    }
                },
                a = {
                    32: 8,
                    64: 11
                }[t];
            if (s || (n = e < 0 || 1 / e < 0, isFinite(e) || (s = o[t], n && (s.d += 1 << t / 4 - 1), i = Math.pow(2, a) - 1, r = 0)), !s) {
                for (i = {
                        32: 127,
                        64: 1023
                    }[t], r = Math.abs(e); r >= 2;) i++, r /= 2;
                for (; r < 1 && i > 0;) i--, r *= 2;
                i <= 0 && (r /= 2), 32 === t && i > 254 && (s = {
                    d: n ? 255 : 127,
                    c: 128,
                    b: 0,
                    a: 0
                }, i = Math.pow(2, a) - 1, r = 0)
            }
            return i
        }

        function di() {
            this.pt = 0, this.level = 0, this.interval = null;
            var t = arguments[0];
            this.computeKey(t)
        }

        function pi() {
            hi.apply(this), this.interval = null, this.centre = null, this.level = null;
            var t = arguments[0],
                e = arguments[1];
            this.interval = t, this.level = e, this.centre = (t.getMin() + t.getMax()) / 2
        }

        function mi() {}

        function vi() {
            hi.apply(this)
        }

        function yi() {
            this.root = null, this.minExtent = 1, this.root = new vi
        }

        function Ei() {}

        function xi() {
            this.ring = null, this.tree = null, this.crossings = 0, this.interval = new ci;
            var t = arguments[0];
            this.ring = t, this.buildIndex()
        }

        function Ii() {
            li.apply(this), this.mcp = null, this.p = null;
            var t = arguments[0],
                e = arguments[1];
            this.mcp = t, this.p = e
        }

        function Ni() {}

        function Ci() {
            this.p0 = null, this.p1 = null, this.p2 = null;
            var t = arguments[0],
                e = arguments[1],
                n = arguments[2];
            this.p0 = t, this.p1 = e, this.p2 = n
        }

        function Li() {
            this.input = null, this.extremalPts = null, this.centre = null, this.radius = 0;
            var t = arguments[0];
            this.input = t
        }

        function _i() {
            if (this.inputGeom = null, this.isConvex = null, this.convexHullPts = null, this.minBaseSeg = new he, this.minWidthPt = null, this.minPtIndex = null, this.minWidth = 0, 1 === arguments.length) {
                var t = arguments[0];
                _i.call(this, t, !1)
            } else if (2 === arguments.length) {
                var e = arguments[0],
                    n = arguments[1];
                this.inputGeom = e, this.isConvex = n
            }
        }

        function Si() {
            this.inputGeom = null, this.distanceTolerance = null;
            var t = arguments[0];
            this.inputGeom = t
        }

        function wi() {
            ye.apply(this), this.distanceTolerance = null;
            var t = arguments[0];
            this.distanceTolerance = t
        }

        function bi() {
            this._orig = null, this._sym = null, this._next = null;
            var t = arguments[0];
            this._orig = t
        }

        function Ri() {
            this._isMarked = !1;
            var t = arguments[0];
            bi.call(this, t)
        }

        function Mi() {
            this.vertexMap = new $t
        }

        function Ti() {
            this._isStart = !1;
            var t = arguments[0];
            Ri.call(this, t)
        }

        function Pi() {
            Mi.apply(this)
        }

        function Oi() {
            this.result = null, this.factory = null, this.graph = null, this.lines = new I, this.nodeEdgeStack = new de, this.ringStartEdge = null, this.graph = new Pi
        }

        function Di() {
            this.items = new I, this.subnode = new Array(4).fill(null)
        }

        function Ai() {
            this.pt = new g, this.level = 0, this.env = null;
            var t = arguments[0];
            this.computeKey(t)
        }

        function Fi() {
            Di.apply(this), this.env = null, this.centrex = null, this.centrey = null, this.level = null;
            var t = arguments[0],
                e = arguments[1];
            this.env = t, this.level = e, this.centrex = (t.getMinX() + t.getMaxX()) / 2, this.centrey = (t.getMinY() + t.getMaxY()) / 2
        }

        function ki() {
            Di.apply(this)
        }

        function Gi() {
            this.root = null, this.minExtent = 1, this.root = new ki
        }

        function Bi(t) {
            this.geometryFactory = t || new ne
        }

        function qi(t) {
            this.geometryFactory = t || new ne, this.precisionModel = this.geometryFactory.getPrecisionModel(), this.parser = new Bi(this.geometryFactory)
        }

        function zi() {
            this.parser = new Bi(this.geometryFactory)
        }

        function Vi(t) {
            this.geometryFactory = t || new ne, this.precisionModel = this.geometryFactory.getPrecisionModel(), this.parser = new ie(this.geometryFactory)
        }

        function Ui(t) {
            return [t.x, t.y]
        }

        function Yi(t, e) {
            this.geometryFactory = t || new ne, this.ol = e || "undefined" != typeof ol && ol
        }

        function Xi() {
            if (this.noder = null, this.scaleFactor = null, this.offsetX = null, this.offsetY = null, this.isScaled = !1, 2 === arguments.length) {
                var t = arguments[0],
                    e = arguments[1];
                Xi.call(this, t, e, 0, 0)
            } else if (4 === arguments.length) {
                var n = arguments[0],
                    i = arguments[1];
                arguments[2], arguments[3], this.noder = n, this.scaleFactor = i, this.isScaled = !this.isIntegerPrecision()
            }
        }

        function Hi() {
            if (this.inputGeom = null, this.isClosedEndpointsInInterior = !0, this.nonSimpleLocation = null, 1 === arguments.length) {
                var t = arguments[0];
                this.inputGeom = t
            } else if (2 === arguments.length) {
                var e = arguments[0],
                    n = arguments[1];
                this.inputGeom = e, this.isClosedEndpointsInInterior = !n.isInBoundary(2)
            }
        }

        function ji() {
            this.pt = null, this.isClosed = null, this.degree = null;
            var t = arguments[0];
            this.pt = t, this.isClosed = !1, this.degree = 0
        }

        function Wi() {
            if (this.quadrantSegments = Wi.DEFAULT_QUADRANT_SEGMENTS, this.endCapStyle = Wi.CAP_ROUND, this.joinStyle = Wi.JOIN_ROUND, this.mitreLimit = Wi.DEFAULT_MITRE_LIMIT, this._isSingleSided = !1, this.simplifyFactor = Wi.DEFAULT_SIMPLIFY_FACTOR, 0 === arguments.length);
            else if (1 === arguments.length) {
                var t = arguments[0];
                this.setQuadrantSegments(t)
            } else if (2 === arguments.length) {
                var e = arguments[0],
                    n = arguments[1];
                this.setQuadrantSegments(e), this.setEndCapStyle(n)
            } else if (4 === arguments.length) {
                var i = arguments[0],
                    r = arguments[1],
                    s = arguments[2],
                    o = arguments[3];
                this.setQuadrantSegments(i), this.setEndCapStyle(r), this.setJoinStyle(s), this.setMitreLimit(o)
            }
        }

        function Ki() {
            this.minIndex = -1, this.minCoord = null, this.minDe = null, this.orientedDe = null
        }

        function Ji() {
            this.array_ = []
        }

        function Zi() {
            this.finder = null, this.dirEdgeList = new I, this.nodes = new I, this.rightMostCoord = null, this.env = null, this.finder = new Ki
        }

        function Qi() {
            this.inputLine = null, this.distanceTol = null, this.isDeleted = null, this.angleOrientation = le.COUNTERCLOCKWISE;
            var t = arguments[0];
            this.inputLine = t
        }

        function $i() {
            this.ptList = null, this.precisionModel = null, this.minimimVertexDistance = 0, this.ptList = new I
        }

        function tr() {
            this.maxCurveSegmentError = 0, this.filletAngleQuantum = null, this.closingSegLengthFactor = 1, this.segList = null, this.distance = 0, this.precisionModel = null, this.bufParams = null, this.li = null, this.s0 = null, this.s1 = null, this.s2 = null, this.seg0 = new he, this.seg1 = new he, this.offset0 = new he, this.offset1 = new he, this.side = 0, this._hasNarrowConcaveAngle = !1;
            var t = arguments[0],
                e = arguments[1],
                n = arguments[2];
            this.precisionModel = t, this.bufParams = e, this.li = new oe, this.filletAngleQuantum = Math.PI / 2 / e.getQuadrantSegments(), e.getQuadrantSegments() >= 8 && e.getJoinStyle() === Wi.JOIN_ROUND && (this.closingSegLengthFactor = tr.MAX_CLOSING_SEG_LEN_FACTOR), this.init(n)
        }

        function er() {
            this.distance = 0, this.precisionModel = null, this.bufParams = null;
            var t = arguments[0],
                e = arguments[1];
            this.precisionModel = t, this.bufParams = e
        }

        function nr() {
            this.subgraphs = null, this.seg = new he, this.cga = new le;
            var t = arguments[0];
            this.subgraphs = t
        }

        function ir() {
            this.upwardSeg = null, this.leftDepth = null;
            var t = arguments[0],
                e = arguments[1];
            this.upwardSeg = new he(t), this.leftDepth = e
        }

        function rr() {
            this.inputGeom = null, this.distance = null, this.curveBuilder = null, this.curveList = new I;
            var t = arguments[0],
                e = arguments[1],
                n = arguments[2];
            this.inputGeom = t, this.distance = e, this.curveBuilder = n
        }

        function sr() {
            this._hasIntersection = !1, this.hasProper = !1, this.hasProperInterior = !1, this.hasInterior = !1, this.properIntersectionPoint = null, this.li = null, this.isSelfIntersection = null, this.numIntersections = 0, this.numInteriorIntersections = 0, this.numProperIntersections = 0, this.numTests = 0;
            var t = arguments[0];
            this.li = t
        }

        function or() {
            this.bufParams = null, this.workingPrecisionModel = null, this.workingNoder = null, this.geomFact = null, this.graph = null, this.edgeList = new ei;
            var t = arguments[0];
            this.bufParams = t
        }

        function ar() {
            this.li = new oe, this.segStrings = null;
            var t = arguments[0];
            this.segStrings = t
        }

        function ur() {
            this.li = null, this.pt = null, this.originalPt = null, this.ptScaled = null, this.p0Scaled = null, this.p1Scaled = null, this.scaleFactor = null, this.minx = null, this.maxx = null, this.miny = null, this.maxy = null, this.corner = new Array(4).fill(null), this.safeEnv = null;
            var t = arguments[0],
                e = arguments[1],
                n = arguments[2];
            if (this.originalPt = t, this.pt = t, this.scaleFactor = e, this.li = n, e <= 0) throw new i("Scale factor must be non-zero");
            1 !== e && (this.pt = new g(this.scale(t.x), this.scale(t.y)), this.p0Scaled = new g, this.p1Scaled = new g), this.initCorners(this.pt)
        }

        function lr() {
            this.index = null;
            var t = arguments[0];
            this.index = t
        }

        function hr() {
            li.apply(this), this.hotPixel = null, this.parentEdge = null, this.hotPixelVertexIndex = null, this._isNodeAdded = !1;
            var t = arguments[0],
                e = arguments[1],
                n = arguments[2];
            this.hotPixel = t, this.parentEdge = e, this.hotPixelVertexIndex = n
        }

        function cr() {
            this.li = null, this.interiorIntersections = null;
            var t = arguments[0];
            this.li = t, this.interiorIntersections = new I
        }

        function fr() {
            this.pm = null, this.li = null, this.scaleFactor = null, this.noder = null, this.pointSnapper = null, this.nodedSegStrings = null;
            var t = arguments[0];
            this.pm = t, this.li = new oe, this.li.setPrecisionModel(t), this.scaleFactor = t.getScale()
        }

        function gr() {
            if (this.argGeom = null, this.distance = null, this.bufParams = new Wi, this.resultGeometry = null, this.saveException = null, 1 === arguments.length) {
                var t = arguments[0];
                this.argGeom = t
            } else if (2 === arguments.length) {
                var e = arguments[0],
                    n = arguments[1];
                this.argGeom = e, this.bufParams = n
            }
        }

        function dr() {
            this.comps = null;
            var t = arguments[0];
            this.comps = t
        }

        function pr() {
            if (this.component = null, this.segIndex = null, this.pt = null, 2 === arguments.length) {
                var t = arguments[0],
                    e = arguments[1];
                pr.call(this, t, pr.INSIDE_AREA, e)
            } else if (3 === arguments.length) {
                var n = arguments[0],
                    i = arguments[1],
                    r = arguments[2];
                this.component = n, this.segIndex = i, this.pt = r
            }
        }

        function mr() {
            this.pts = null;
            var t = arguments[0];
            this.pts = t
        }

        function vr() {
            this.locations = null;
            var t = arguments[0];
            this.locations = t
        }

        function yr() {
            if (this.geom = null, this.terminateDistance = 0, this.ptLocator = new we, this.minDistanceLocation = null, this.minDistance = r.MAX_VALUE, 2 === arguments.length) {
                var t = arguments[0],
                    e = arguments[1];
                yr.call(this, t, e, 0)
            } else if (3 === arguments.length) {
                var n = arguments[0],
                    i = arguments[1],
                    s = arguments[2];
                this.geom = new Array(2).fill(null), this.geom[0] = n, this.geom[1] = i, this.terminateDistance = s
            }
        }

        function Er() {
            this.factory = null, this.directedEdges = new I, this.coordinates = null;
            var t = arguments[0];
            this.factory = t
        }

        function xr() {
            this._isMarked = !1, this._isVisited = !1, this.data = null
        }

        function Ir() {
            xr.apply(this), this.parentEdge = null, this.from = null, this.to = null, this.p0 = null, this.p1 = null, this.sym = null, this.edgeDirection = null, this.quadrant = null, this.angle = null;
            var t = arguments[0],
                e = arguments[1],
                n = arguments[2],
                i = arguments[3];
            this.from = t, this.to = e, this.edgeDirection = i, this.p0 = t.getCoordinate(), this.p1 = n;
            var r = this.p1.x - this.p0.x,
                s = this.p1.y - this.p0.y;
            this.quadrant = Ze.quadrant(r, s), this.angle = Math.atan2(s, r)
        }

        function Nr() {
            var t = arguments[0],
                e = arguments[1],
                n = arguments[2],
                i = arguments[3];
            Ir.call(this, t, e, n, i)
        }

        function Cr() {
            if (xr.apply(this), this.dirEdge = null, 0 === arguments.length);
            else if (2 === arguments.length) {
                var t = arguments[0],
                    e = arguments[1];
                this.setDirectedEdges(t, e)
            }
        }

        function Lr() {
            this.outEdges = new I, this.sorted = !1
        }

        function _r() {
            if (xr.apply(this), this.pt = null, this.deStar = null, 1 === arguments.length) {
                var t = arguments[0];
                _r.call(this, t, new Lr)
            } else if (2 === arguments.length) {
                var e = arguments[0],
                    n = arguments[1];
                this.pt = e, this.deStar = n
            }
        }

        function Sr() {
            Cr.apply(this), this.line = null;
            var t = arguments[0];
            this.line = t
        }

        function wr() {
            this.nodeMap = new rt
        }

        function br() {
            this.edges = new Q, this.dirEdges = new Q, this.nodeMap = new wr
        }

        function Rr() {
            br.apply(this)
        }

        function Mr() {
            this.graph = new Rr, this.mergedLineStrings = null, this.factory = null, this.edgeStrings = null
        }

        function Tr() {
            this.edgeRing = null, this.next = null, this.label = -1;
            var t = arguments[0],
                e = arguments[1],
                n = arguments[2],
                i = arguments[3];
            Ir.call(this, t, e, n, i)
        }

        function Pr() {
            Cr.apply(this), this.line = null;
            var t = arguments[0];
            this.line = t
        }

        function Or() {
            this.geometryFactory = new ne, this.geomGraph = null, this.disconnectedRingcoord = null;
            var t = arguments[0];
            this.geomGraph = t
        }

        function Dr() {}

        function Ar() {
            if (this.edgeEnds = new I, 1 === arguments.length) {
                var t = arguments[0];
                Ar.call(this, null, t)
            } else if (2 === arguments.length) {
                var e = (arguments[0], arguments[1]);
                En.call(this, e.getEdge(), e.getCoordinate(), e.getDirectedCoordinate(), new fn(e.getLabel())), this.insert(e)
            }
        }

        function Fr() {
            bn.apply(this)
        }

        function kr() {
            var t = arguments[0],
                e = arguments[1];
            vn.call(this, t, e)
        }

        function Gr() {
            In.apply(this)
        }

        function Br() {
            this.nodes = new yn(new Gr)
        }

        function qr() {
            this.li = new oe, this.geomGraph = null, this.nodeGraph = new Br, this.invalidPoint = null;
            var t = arguments[0];
            this.geomGraph = t
        }

        function zr() {
            this.graph = null, this.rings = new I, this.totalEnv = new C, this.index = null, this.nestedPt = null;
            var t = arguments[0];
            this.graph = t
        }

        function Vr() {
            if (this.errorType = null, this.pt = null, 1 === arguments.length) {
                var t = arguments[0];
                Vr.call(this, t, null)
            } else if (2 === arguments.length) {
                var e = arguments[0],
                    n = arguments[1];
                this.errorType = e, null !== n && (this.pt = n.copy())
            }
        }

        function Ur() {
            this.parentGeometry = null, this.isSelfTouchingRingFormingHoleValid = !1, this.validErr = null;
            var t = arguments[0];
            this.parentGeometry = t
        }

        function Yr() {
            this.factory = null, this.deList = new I, this.lowestEdge = null, this.ring = null, this.ringPts = null, this.holes = null, this.shell = null, this._isHole = null, this._isProcessed = !1, this._isIncludedSet = !1, this._isIncluded = !1;
            var t = arguments[0];
            this.factory = t
        }

        function Xr() {}

        function Hr() {
            br.apply(this), this.factory = null;
            var t = arguments[0];
            this.factory = t
        }

        function jr() {
            if (this.lineStringAdder = new Wr(this), this.graph = null, this.dangles = new I, this.cutEdges = new I, this.invalidRingLines = new I, this.holeList = null, this.shellList = null, this.polyList = null, this.isCheckingRingsValid = !0, this.extractOnlyPolygonal = null, this.geomFactory = null, 0 === arguments.length) jr.call(this, !1);
            else if (1 === arguments.length) {
                var t = arguments[0];
                this.extractOnlyPolygonal = t
            }
        }

        function Wr() {
            this.p = null;
            var t = arguments[0];
            this.p = t
        }

        function Kr() {
            this.li = new oe, this.ptLocator = new we, this.arg = null, this.nodes = new yn(new Gr), this.im = null, this.isolatedEdges = new I, this.invalidPoint = null;
            var t = arguments[0];
            this.arg = t
        }

        function Jr() {
            this.rectEnv = null;
            var t = arguments[0];
            this.rectEnv = t.getEnvelopeInternal()
        }

        function Zr() {
            this.li = new oe, this.rectEnv = null, this.diagUp0 = null, this.diagUp1 = null, this.diagDown0 = null, this.diagDown1 = null;
            var t = arguments[0];
            this.rectEnv = t, this.diagUp0 = new g(t.getMinX(), t.getMinY()), this.diagUp1 = new g(t.getMaxX(), t.getMaxY()), this.diagDown0 = new g(t.getMinX(), t.getMaxY()), this.diagDown1 = new g(t.getMaxX(), t.getMinY())
        }

        function Qr() {
            this._isDone = !1
        }

        function $r() {
            this.rectangle = null, this.rectEnv = null;
            var t = arguments[0];
            this.rectangle = t, this.rectEnv = t.getEnvelopeInternal()
        }

        function ts() {
            Qr.apply(this), this.rectEnv = null, this._intersects = !1;
            var t = arguments[0];
            this.rectEnv = t
        }

        function es() {
            Qr.apply(this), this.rectSeq = null, this.rectEnv = null, this._containsPoint = !1;
            var t = arguments[0];
            this.rectSeq = t.getExteriorRing().getCoordinateSequence(), this.rectEnv = t.getEnvelopeInternal()
        }

        function ns() {
            Qr.apply(this), this.rectEnv = null, this.rectIntersector = null, this.hasIntersection = !1, this.p0 = new g, this.p1 = new g;
            var t = arguments[0];
            this.rectEnv = t.getEnvelopeInternal(), this.rectIntersector = new Zr(this.rectEnv)
        }

        function is() {
            if (this._relate = null, 2 === arguments.length) {
                var t = arguments[0],
                    e = arguments[1];
                $n.call(this, t, e), this._relate = new Kr(this.arg)
            } else if (3 === arguments.length) {
                var n = arguments[0],
                    i = arguments[1],
                    r = arguments[2];
                $n.call(this, n, i, r), this._relate = new Kr(this.arg)
            }
        }

        function rs() {
            this.geomFactory = null, this.skipEmpty = !1, this.inputGeoms = null;
            var t = arguments[0];
            this.geomFactory = rs.extractFactory(t), this.inputGeoms = t
        }

        function ss() {
            this.pointGeom = null, this.otherGeom = null, this.geomFact = null;
            var t = arguments[0],
                e = arguments[1];
            this.pointGeom = t, this.otherGeom = e, this.geomFact = e.getFactory()
        }

        function os() {
            this.sortIndex = -1, this.comps = null;
            var t = arguments[0],
                e = arguments[1];
            this.sortIndex = t, this.comps = e
        }

        function as() {
            this.inputPolys = null, this.geomFactory = null;
            var t = arguments[0];
            this.inputPolys = t, null === this.inputPolys && (this.inputPolys = new I)
        }

        function us() {
            if (this.polygons = new I, this.lines = new I, this.points = new I, this.geomFact = null, 1 === arguments.length) {
                if (w(arguments[0], m)) {
                    var t = arguments[0];
                    this.extract(t)
                } else if (arguments[0] instanceof B) {
                    var e = arguments[0];
                    this.extract(e)
                }
            } else if (2 === arguments.length) {
                var n = arguments[0],
                    i = arguments[1];
                this.geomFact = i, this.extract(n)
            }
        }

        function ls() {
            Pt.CoordinateOperation.apply(this), this.targetPM = null, this.removeCollapsed = !0;
            var t = arguments[0],
                e = arguments[1];
            this.targetPM = t, this.removeCollapsed = e
        }

        function hs() {
            this.targetPM = null, this.removeCollapsed = !0, this.changePrecisionModel = !1, this.isPointwise = !1;
            var t = arguments[0];
            this.targetPM = t
        }

        function cs() {
            this.pts = null, this.usePt = null, this.distanceTolerance = null, this.seg = new he;
            var t = arguments[0];
            this.pts = t
        }

        function fs() {
            this.inputGeom = null, this.distanceTolerance = null, this.isEnsureValidTopology = !0;
            var t = arguments[0];
            this.inputGeom = t
        }

        function gs() {
            ye.apply(this), this.isEnsureValidTopology = !0, this.distanceTolerance = null;
            var t = arguments[0],
                e = arguments[1];
            this.isEnsureValidTopology = t, this.distanceTolerance = e
        }

        function ds() {
            if (this.parent = null, this.index = null, 2 === arguments.length) {
                var t = arguments[0],
                    e = arguments[1];
                ds.call(this, t, e, null, -1)
            } else if (4 === arguments.length) {
                var n = arguments[0],
                    i = arguments[1],
                    r = arguments[2],
                    s = arguments[3];
                he.call(this, n, i), this.parent = r, this.index = s
            }
        }

        function ps() {
            if (this.parentLine = null, this.segs = null, this.resultSegs = new I, this.minimumSize = null, 1 === arguments.length) {
                var t = arguments[0];
                ps.call(this, t, 2)
            } else if (2 === arguments.length) {
                var e = arguments[0],
                    n = arguments[1];
                this.parentLine = e, this.minimumSize = n, this.init()
            }
        }

        function ms() {
            this.index = new Gi
        }

        function vs() {
            this.querySeg = null, this.items = new I;
            var t = arguments[0];
            this.querySeg = t
        }

        function ys() {
            this.li = new oe, this.inputIndex = new ms, this.outputIndex = new ms, this.line = null, this.linePts = null, this.distanceTolerance = 0;
            var t = arguments[0],
                e = arguments[1];
            this.inputIndex = t, this.outputIndex = e
        }

        function Es() {
            this.inputIndex = new ms, this.outputIndex = new ms, this.distanceTolerance = 0
        }

        function xs() {
            this.inputGeom = null, this.lineSimplifier = new Es, this.linestringMap = null;
            var t = arguments[0];
            this.inputGeom = t
        }

        function Is() {
            ye.apply(this), this.linestringMap = null;
            var t = arguments[0];
            this.linestringMap = t
        }

        function Ns() {
            this.tps = null;
            var t = arguments[0];
            this.tps = t
        }

        function Cs() {
            this.seg = null, this.segLen = null, this.splitPt = null, this.minimumLen = 0;
            var t = arguments[0];
            this.seg = t, this.segLen = t.getLength()
        }

        function Ls() {}

        function _s() {}

        function Ss() {}

        function ws() {
            if (this.p = null, 1 === arguments.length) {
                var t = arguments[0];
                this.p = new g(t)
            } else if (2 === arguments.length) {
                var e = arguments[0],
                    n = arguments[1];
                this.p = new g(e, n)
            } else if (3 === arguments.length) {
                var i = arguments[0],
                    r = arguments[1],
                    s = arguments[2];
                this.p = new g(i, r, s)
            }
        }

        function bs() {
            this._isOnConstraint = null, this.constraint = null;
            var t = arguments[0];
            ws.call(this, t)
        }

        function Rs() {
            this._rot = null, this.vertex = null, this.next = null, this.data = null
        }

        function Ms() {
            this.subdiv = null, this.isUsingTolerance = !1;
            var t = arguments[0];
            this.subdiv = t, this.isUsingTolerance = t.getTolerance() > 0
        }

        function Ts() {}

        function Ps() {
            this.subdiv = null, this.lastEdge = null;
            var t = arguments[0];
            this.subdiv = t, this.init()
        }

        function Os() {
            if (this.seg = null, 1 === arguments.length) {
                if ("string" == typeof arguments[0]) {
                    var t = arguments[0];
                    l.call(this, t)
                } else if (arguments[0] instanceof he) {
                    var e = arguments[0];
                    l.call(this, "Locate failed to converge (at edge: " + e + ").  Possible causes include invalid Subdivision topology or very close sites"), this.seg = new he(e)
                }
            } else if (2 === arguments.length) {
                var n = arguments[0],
                    i = arguments[1];
                l.call(this, Os.msgWithSpatial(n, i)), this.seg = new he(i)
            }
        }

        function Ds() {}

        function As() {
            this.visitedKey = 0, this.quadEdges = new I, this.startingEdge = null, this.tolerance = null, this.edgeCoincidenceTolerance = null, this.frameVertex = new Array(3).fill(null), this.frameEnv = null, this.locator = null, this.seg = new he, this.triEdges = new Array(3).fill(null);
            var t = arguments[0],
                e = arguments[1];
            this.tolerance = e, this.edgeCoincidenceTolerance = e / As.EDGE_COINCIDENCE_TOL_FACTOR, this.createFrame(t), this.startingEdge = this.initSubdiv(), this.locator = new Ps(this)
        }

        function Fs() {}

        function ks() {
            this.triList = new I
        }

        function Gs() {
            this.triList = new I
        }

        function Bs() {
            this.coordList = new N, this.triCoords = new I
        }

        function qs() {
            if (this.ls = null, this.data = null, 2 === arguments.length) {
                var t = arguments[0],
                    e = arguments[1];
                this.ls = new he(t, e)
            } else if (3 === arguments.length) {
                var n = arguments[0],
                    i = arguments[1],
                    r = arguments[2];
                this.ls = new he(n, i), this.data = r
            } else if (6 === arguments.length) {
                var s = arguments[0],
                    o = arguments[1],
                    a = arguments[2],
                    u = arguments[3],
                    l = arguments[4],
                    h = arguments[5];
                qs.call(this, new g(s, o, a), new g(u, l, h))
            } else if (7 === arguments.length) {
                var c = arguments[0],
                    f = arguments[1],
                    d = arguments[2],
                    p = arguments[3],
                    m = arguments[4],
                    v = arguments[5],
                    y = arguments[6];
                qs.call(this, new g(c, f, d), new g(p, m, v), y)
            }
        }

        function zs() {}

        function Vs() {
            if (this.p = null, this.data = null, this.left = null, this.right = null, this.count = null, 2 === arguments.length) {
                var t = arguments[0],
                    e = arguments[1];
                this.p = new g(t), this.left = null, this.right = null, this.count = 1, this.data = e
            } else if (3 === arguments.length) {
                var n = arguments[0],
                    i = arguments[1],
                    r = arguments[2];
                this.p = new g(n, i), this.left = null, this.right = null, this.count = 1, this.data = r
            }
        }

        function Us() {
            if (this.root = null, this.numberOfNodes = null, this.tolerance = null, 0 === arguments.length) Us.call(this, 0);
            else if (1 === arguments.length) {
                var t = arguments[0];
                this.tolerance = t
            }
        }

        function Ys() {
            this.tolerance = null, this.matchNode = null, this.matchDist = 0, this.p = null;
            var t = arguments[0],
                e = arguments[1];
            this.p = t, this.tolerance = e
        }

        function Xs() {
            this.initialVertices = null, this.segVertices = null, this.segments = new I, this.subdiv = null, this.incDel = null, this.convexHull = null, this.splitFinder = new _s, this.kdt = null, this.vertexFactory = null, this.computeAreaEnv = null, this.splitPt = null, this.tolerance = null;
            var t = arguments[0],
                e = arguments[1];
            this.initialVertices = new I(t), this.tolerance = e, this.kdt = new Us(e)
        }

        function Hs() {
            this.siteCoords = null, this.tolerance = 0, this.subdiv = null
        }

        function js() {
            this.siteCoords = null, this.constraintLines = null, this.tolerance = 0, this.subdiv = null, this.constraintVertexMap = new rt
        }

        function Ws() {
            this.siteCoords = null, this.tolerance = 0, this.subdiv = null, this.clipEnv = null, this.diagramEnv = null
        }

        function Ks() {}
        "fill" in Array.prototype || Object.defineProperty(Array.prototype, "fill", {
            configurable: !0,
            value: function(t) {
                if (void 0 === this || null === this) throw new TypeError(this + " is not an object");
                var e = Object(this),
                    n = Math.max(Math.min(e.length, 9007199254740991), 0) || 0,
                    i = 1 in arguments ? parseInt(Number(arguments[1]), 10) || 0 : 0;
                i = i < 0 ? Math.max(n + i, 0) : Math.min(i, n);
                var r = 2 in arguments && void 0 !== arguments[2] ? parseInt(Number(arguments[2]), 10) || 0 : n;
                for (r = r < 0 ? Math.max(n + arguments[2], 0) : Math.min(r, n); i < r;) e[i] = t, ++i;
                return e
            },
            writable: !0
        }), Number.isFinite = Number.isFinite || function(t) {
            return "number" == typeof t && isFinite(t)
        }, Number.isInteger = Number.isInteger || function(t) {
            return "number" == typeof t && isFinite(t) && Math.floor(t) === t
        }, Number.parseFloat = Number.parseFloat || parseFloat, Number.isNaN = Number.isNaN || function(t) {
            return t !== t
        }, Math.trunc = Math.trunc || function(t) {
            return t < 0 ? Math.ceil(t) : Math.floor(t)
        }, e(n.prototype, {
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return n
            }
        }), n.equalsWithTolerance = function(t, e, n) {
            return Math.abs(t - e) <= n
        }, r.isNaN = function(t) {
            return Number.isNaN(t)
        }, r.doubleToLongBits = function(t) {
            return t
        }, r.longBitsToDouble = function(t) {
            return t
        }, r.isInfinite = function(t) {
            return !Number.isFinite(t)
        }, r.MAX_VALUE = Number.MAX_VALUE, l.prototype = Object.create(Error.prototype), l.prototype.constructor = Error, h(c, l), e(c.prototype, {
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return c
            }
        }), e(f.prototype, {
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return f
            }
        }), f.shouldNeverReachHere = function() {
            if (0 === arguments.length) f.shouldNeverReachHere(null);
            else if (1 === arguments.length) {
                var t = arguments[0];
                throw new c("Should never reach here" + (null !== t ? ": " + t : ""))
            }
        }, f.isTrue = function() {
            if (1 === arguments.length) {
                var t = arguments[0];
                f.isTrue(t, null)
            } else if (2 === arguments.length) {
                var e = arguments[0],
                    n = arguments[1];
                if (!e) throw null === n ? new c : new c(n)
            }
        }, f.equals = function() {
            if (2 === arguments.length) {
                var t = arguments[0],
                    e = arguments[1];
                f.equals(t, e, null)
            } else if (3 === arguments.length) {
                var n = arguments[0],
                    i = arguments[1],
                    r = arguments[2];
                if (!i.equals(n)) throw new c("Expected " + n + " but encountered " + i + (null !== r ? ": " + r : ""))
            }
        }, e(g.prototype, {
            setOrdinate: function(t, e) {
                switch (t) {
                    case g.X:
                        this.x = e;
                        break;
                    case g.Y:
                        this.y = e;
                        break;
                    case g.Z:
                        this.z = e;
                        break;
                    default:
                        throw new i("Invalid ordinate index: " + t)
                }
            },
            equals2D: function() {
                if (1 === arguments.length) {
                    var t = arguments[0];
                    return this.x === t.x && this.y === t.y
                }
                if (2 === arguments.length) {
                    var e = arguments[0],
                        i = arguments[1];
                    return !!n.equalsWithTolerance(this.x, e.x, i) && !!n.equalsWithTolerance(this.y, e.y, i)
                }
            },
            getOrdinate: function(t) {
                switch (t) {
                    case g.X:
                        return this.x;
                    case g.Y:
                        return this.y;
                    case g.Z:
                        return this.z
                }
                throw new i("Invalid ordinate index: " + t)
            },
            equals3D: function(t) {
                return this.x === t.x && this.y === t.y && (this.z === t.z || r.isNaN(this.z) && r.isNaN(t.z))
            },
            equals: function(t) {
                return t instanceof g && this.equals2D(t)
            },
            equalInZ: function(t, e) {
                return n.equalsWithTolerance(this.z, t.z, e)
            },
            compareTo: function(t) {
                var e = t;
                return this.x < e.x ? -1 : this.x > e.x ? 1 : this.y < e.y ? -1 : this.y > e.y ? 1 : 0
            },
            clone: function() {
                try {
                    return null
                } catch (t) {
                    if (t instanceof CloneNotSupportedException) return f.shouldNeverReachHere("this shouldn't happen because this class is Cloneable"), null;
                    throw t
                }
            },
            copy: function() {
                return new g(this)
            },
            toString: function() {
                return "(" + this.x + ", " + this.y + ", " + this.z + ")"
            },
            distance3D: function(t) {
                var e = this.x - t.x,
                    n = this.y - t.y,
                    i = this.z - t.z;
                return Math.sqrt(e * e + n * n + i * i)
            },
            distance: function(t) {
                var e = this.x - t.x,
                    n = this.y - t.y;
                return Math.sqrt(e * e + n * n)
            },
            hashCode: function() {
                var t = 17;
                return t = 37 * t + g.hashCode(this.x), t = 37 * t + g.hashCode(this.y)
            },
            setCoordinate: function(t) {
                this.x = t.x, this.y = t.y, this.z = t.z
            },
            interfaces_: function() {
                return [s, o, u]
            },
            getClass: function() {
                return g
            }
        }), g.hashCode = function() {
            if (1 === arguments.length) {
                var t = arguments[0],
                    e = r.doubleToLongBits(t);
                return Math.trunc(e ^ e >>> 32)
            }
        }, e(d.prototype, {
            compare: function(t, e) {
                var n = t,
                    i = e,
                    r = d.compare(n.x, i.x);
                if (0 !== r) return r;
                var s = d.compare(n.y, i.y);
                return 0 !== s ? s : this.dimensionsToTest <= 2 ? 0 : d.compare(n.z, i.z)
            },
            interfaces_: function() {
                return [a]
            },
            getClass: function() {
                return d
            }
        }), d.compare = function(t, e) {
            return t < e ? -1 : t > e ? 1 : r.isNaN(t) ? r.isNaN(e) ? 0 : -1 : r.isNaN(e) ? 1 : 0
        }, g.DimensionalComparator = d, g.serialVersionUID = 0x5cbf2c235c7e5800, g.NULL_ORDINATE = r.NaN, g.X = 0, g.Y = 1, g.Z = 2, p.prototype.hasNext = function() {}, p.prototype.next = function() {}, p.prototype.remove = function() {}, m.prototype.add = function() {}, m.prototype.addAll = function() {}, m.prototype.isEmpty = function() {}, m.prototype.iterator = function() {}, m.prototype.size = function() {}, m.prototype.toArray = function() {}, m.prototype.remove = function() {}, v.prototype = new Error, v.prototype.name = "IndexOutOfBoundsException", y.prototype = Object.create(m.prototype), y.prototype.constructor = y, y.prototype.get = function() {}, y.prototype.set = function() {}, y.prototype.isEmpty = function() {}, E.prototype = new Error, E.prototype.name = "NoSuchElementException", x.prototype = new Error, x.prototype.name = "OperationNotSupported", I.prototype = Object.create(y.prototype), I.prototype.constructor = I, I.prototype.ensureCapacity = function() {}, I.prototype.interfaces_ = function() {
            return [y, m]
        }, I.prototype.add = function(t) {
            return 1 === arguments.length ? this.array_.push(t) : this.array_.splice(arguments[0], arguments[1]), !0
        }, I.prototype.clear = function() {
            this.array_ = []
        }, I.prototype.addAll = function(t) {
            for (var e = t.iterator(); e.hasNext();) this.add(e.next());
            return !0
        }, I.prototype.set = function(t, e) {
            var n = this.array_[t];
            return this.array_[t] = e, n
        }, I.prototype.iterator = function() {
            return new Js(this)
        }, I.prototype.get = function(t) {
            if (t < 0 || t >= this.size()) throw new v;
            return this.array_[t]
        }, I.prototype.isEmpty = function() {
            return 0 === this.array_.length
        }, I.prototype.size = function() {
            return this.array_.length
        }, I.prototype.toArray = function() {
            for (var t = [], e = 0, n = this.array_.length; e < n; e++) t.push(this.array_[e]);
            return t
        }, I.prototype.remove = function(t) {
            for (var e = !1, n = 0, i = this.array_.length; n < i; n++)
                if (this.array_[n] === t) {
                    this.array_.splice(n, 1), e = !0;
                    break
                }
            return e
        };
        var Js = function(t) {
            this.arrayList_ = t, this.position_ = 0
        };
        Js.prototype.next = function() {
            if (this.position_ === this.arrayList_.size()) throw new E;
            return this.arrayList_.get(this.position_++)
        }, Js.prototype.hasNext = function() {
            return this.position_ < this.arrayList_.size()
        }, Js.prototype.set = function(t) {
            return this.arrayList_.set(this.position_ - 1, t)
        }, Js.prototype.remove = function() {
            this.arrayList_.remove(this.arrayList_.get(this.position_))
        }, h(N, I), e(N.prototype, {
            getCoordinate: function(t) {
                return this.get(t)
            },
            addAll: function() {
                if (2 === arguments.length) {
                    for (var t = arguments[0], e = arguments[1], n = !1, i = t.iterator(); i.hasNext();) this.add(i.next(), e), n = !0;
                    return n
                }
                return I.prototype.addAll.apply(this, arguments)
            },
            clone: function() {
                for (var t = I.prototype.clone.call(this), e = 0; e < this.size(); e++) t.add(e, this.get(e).copy());
                return t
            },
            toCoordinateArray: function() {
                return this.toArray(N.coordArrayType)
            },
            add: function() {
                if (1 === arguments.length) {
                    var t = arguments[0];
                    I.prototype.add.call(this, t)
                } else if (2 === arguments.length) {
                    if (arguments[0] instanceof Array && "boolean" == typeof arguments[1]) {
                        var e = arguments[0],
                            n = arguments[1];
                        return this.add(e, n, !0), !0
                    }
                    if (arguments[0] instanceof g && "boolean" == typeof arguments[1]) {
                        var i = arguments[0],
                            r = arguments[1];
                        if (!r && this.size() >= 1) {
                            var s = this.get(this.size() - 1);
                            if (s.equals2D(i)) return null
                        }
                        I.prototype.add.call(this, i)
                    } else if (arguments[0] instanceof Object && "boolean" == typeof arguments[1]) {
                        var o = arguments[0],
                            a = arguments[1];
                        return this.add(o, a), !0
                    }
                } else if (3 === arguments.length) {
                    if ("boolean" == typeof arguments[2] && arguments[0] instanceof Array && "boolean" == typeof arguments[1]) {
                        var u = arguments[0],
                            l = arguments[1],
                            h = arguments[2];
                        if (h)
                            for (var c = 0; c < u.length; c++) this.add(u[c], l);
                        else
                            for (var c = u.length - 1; c >= 0; c--) this.add(u[c], l);
                        return !0
                    }
                    if ("boolean" == typeof arguments[2] && Number.isInteger(arguments[0]) && arguments[1] instanceof g) {
                        var f = arguments[0],
                            d = arguments[1],
                            p = arguments[2];
                        if (!p) {
                            var m = this.size();
                            if (m > 0) {
                                if (f > 0) {
                                    var v = this.get(f - 1);
                                    if (v.equals2D(d)) return null
                                }
                                if (f < m) {
                                    var y = this.get(f);
                                    if (y.equals2D(d)) return null
                                }
                            }
                        }
                        I.prototype.add.call(this, f, d)
                    }
                } else if (4 === arguments.length) {
                    var E = arguments[0],
                        x = arguments[1],
                        N = arguments[2],
                        C = arguments[3],
                        L = 1;
                    N > C && (L = -1);
                    for (var c = N; c !== C; c += L) this.add(E[c], x);
                    return !0
                }
            },
            closeRing: function() {
                this.size() > 0 && this.add(new g(this.get(0)), !1)
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return N
            }
        }), N.coordArrayType = new Array(0).fill(null), e(C.prototype, {
            getArea: function() {
                return this.getWidth() * this.getHeight()
            },
            equals: function(t) {
                if (!(t instanceof C)) return !1;
                var e = t;
                return this.isNull() ? e.isNull() : this.maxx === e.getMaxX() && this.maxy === e.getMaxY() && this.minx === e.getMinX() && this.miny === e.getMinY()
            },
            intersection: function(t) {
                if (this.isNull() || t.isNull() || !this.intersects(t)) return new C;
                var e = this.minx > t.minx ? this.minx : t.minx,
                    n = this.miny > t.miny ? this.miny : t.miny;
                return new C(e, this.maxx < t.maxx ? this.maxx : t.maxx, n, this.maxy < t.maxy ? this.maxy : t.maxy)
            },
            isNull: function() {
                return this.maxx < this.minx
            },
            getMaxX: function() {
                return this.maxx
            },
            covers: function() {
                if (1 === arguments.length) {
                    if (arguments[0] instanceof g) {
                        var t = arguments[0];
                        return this.covers(t.x, t.y)
                    }
                    if (arguments[0] instanceof C) {
                        var e = arguments[0];
                        return !this.isNull() && !e.isNull() && e.getMinX() >= this.minx && e.getMaxX() <= this.maxx && e.getMinY() >= this.miny && e.getMaxY() <= this.maxy
                    }
                } else if (2 === arguments.length) {
                    var n = arguments[0],
                        i = arguments[1];
                    return !this.isNull() && n >= this.minx && n <= this.maxx && i >= this.miny && i <= this.maxy
                }
            },
            intersects: function() {
                if (1 === arguments.length) {
                    if (arguments[0] instanceof C) {
                        var t = arguments[0];
                        return !this.isNull() && !t.isNull() && !(t.minx > this.maxx || t.maxx < this.minx || t.miny > this.maxy || t.maxy < this.miny)
                    }
                    if (arguments[0] instanceof g) {
                        var e = arguments[0];
                        return this.intersects(e.x, e.y)
                    }
                } else if (2 === arguments.length) {
                    var n = arguments[0],
                        i = arguments[1];
                    return !this.isNull() && !(n > this.maxx || n < this.minx || i > this.maxy || i < this.miny)
                }
            },
            getMinY: function() {
                return this.miny
            },
            getMinX: function() {
                return this.minx
            },
            expandToInclude: function() {
                if (1 === arguments.length) {
                    if (arguments[0] instanceof g) {
                        var t = arguments[0];
                        this.expandToInclude(t.x, t.y)
                    } else if (arguments[0] instanceof C) {
                        var e = arguments[0];
                        if (e.isNull()) return null;
                        this.isNull() ? (this.minx = e.getMinX(), this.maxx = e.getMaxX(), this.miny = e.getMinY(), this.maxy = e.getMaxY()) : (e.minx < this.minx && (this.minx = e.minx), e.maxx > this.maxx && (this.maxx = e.maxx), e.miny < this.miny && (this.miny = e.miny), e.maxy > this.maxy && (this.maxy = e.maxy))
                    }
                } else if (2 === arguments.length) {
                    var n = arguments[0],
                        i = arguments[1];
                    this.isNull() ? (this.minx = n, this.maxx = n, this.miny = i, this.maxy = i) : (n < this.minx && (this.minx = n), n > this.maxx && (this.maxx = n), i < this.miny && (this.miny = i), i > this.maxy && (this.maxy = i))
                }
            },
            minExtent: function() {
                if (this.isNull()) return 0;
                var t = this.getWidth(),
                    e = this.getHeight();
                return t < e ? t : e
            },
            getWidth: function() {
                return this.isNull() ? 0 : this.maxx - this.minx
            },
            compareTo: function(t) {
                var e = t;
                return this.isNull() ? e.isNull() ? 0 : -1 : e.isNull() ? 1 : this.minx < e.minx ? -1 : this.minx > e.minx ? 1 : this.miny < e.miny ? -1 : this.miny > e.miny ? 1 : this.maxx < e.maxx ? -1 : this.maxx > e.maxx ? 1 : this.maxy < e.maxy ? -1 : this.maxy > e.maxy ? 1 : 0
            },
            translate: function(t, e) {
                return this.isNull() ? null : void this.init(this.getMinX() + t, this.getMaxX() + t, this.getMinY() + e, this.getMaxY() + e)
            },
            toString: function() {
                return "Env[" + this.minx + " : " + this.maxx + ", " + this.miny + " : " + this.maxy + "]"
            },
            setToNull: function() {
                this.minx = 0, this.maxx = -1, this.miny = 0, this.maxy = -1
            },
            getHeight: function() {
                return this.isNull() ? 0 : this.maxy - this.miny
            },
            maxExtent: function() {
                if (this.isNull()) return 0;
                var t = this.getWidth(),
                    e = this.getHeight();
                return t > e ? t : e
            },
            expandBy: function() {
                if (1 === arguments.length) {
                    var t = arguments[0];
                    this.expandBy(t, t)
                } else if (2 === arguments.length) {
                    var e = arguments[0],
                        n = arguments[1];
                    if (this.isNull()) return null;
                    this.minx -= e, this.maxx += e, this.miny -= n, this.maxy += n, (this.minx > this.maxx || this.miny > this.maxy) && this.setToNull()
                }
            },
            contains: function() {
                if (1 === arguments.length) {
                    if (arguments[0] instanceof C) {
                        var t = arguments[0];
                        return this.covers(t)
                    }
                    if (arguments[0] instanceof g) {
                        var e = arguments[0];
                        return this.covers(e)
                    }
                } else if (2 === arguments.length) {
                    var n = arguments[0],
                        i = arguments[1];
                    return this.covers(n, i)
                }
            },
            centre: function() {
                return this.isNull() ? null : new g((this.getMinX() + this.getMaxX()) / 2, (this.getMinY() + this.getMaxY()) / 2)
            },
            init: function() {
                if (0 === arguments.length) this.setToNull();
                else if (1 === arguments.length) {
                    if (arguments[0] instanceof g) {
                        var t = arguments[0];
                        this.init(t.x, t.x, t.y, t.y)
                    } else if (arguments[0] instanceof C) {
                        var e = arguments[0];
                        this.minx = e.minx, this.maxx = e.maxx, this.miny = e.miny, this.maxy = e.maxy
                    }
                } else if (2 === arguments.length) {
                    var n = arguments[0],
                        i = arguments[1];
                    this.init(n.x, i.x, n.y, i.y)
                } else if (4 === arguments.length) {
                    var r = arguments[0],
                        s = arguments[1],
                        o = arguments[2],
                        a = arguments[3];
                    r < s ? (this.minx = r, this.maxx = s) : (this.minx = s, this.maxx = r), o < a ? (this.miny = o, this.maxy = a) : (this.miny = a, this.maxy = o)
                }
            },
            getMaxY: function() {
                return this.maxy
            },
            distance: function(t) {
                if (this.intersects(t)) return 0;
                var e = 0;
                this.maxx < t.minx ? e = t.minx - this.maxx : this.minx > t.maxx && (e = this.minx - t.maxx);
                var n = 0;
                return this.maxy < t.miny ? n = t.miny - this.maxy : this.miny > t.maxy && (n = this.miny - t.maxy), 0 === e ? n : 0 === n ? e : Math.sqrt(e * e + n * n)
            },
            hashCode: function() {
                var t = 17;
                return t = 37 * t + g.hashCode(this.minx), t = 37 * t + g.hashCode(this.maxx), t = 37 * t + g.hashCode(this.miny), t = 37 * t + g.hashCode(this.maxy)
            },
            interfaces_: function() {
                return [s, u]
            },
            getClass: function() {
                return C
            }
        }), C.intersects = function() {
            if (3 === arguments.length) {
                var t = arguments[0],
                    e = arguments[1],
                    n = arguments[2];
                return n.x >= (t.x < e.x ? t.x : e.x) && n.x <= (t.x > e.x ? t.x : e.x) && n.y >= (t.y < e.y ? t.y : e.y) && n.y <= (t.y > e.y ? t.y : e.y)
            }
            if (4 === arguments.length) {
                var i = arguments[0],
                    r = arguments[1],
                    s = arguments[2],
                    o = arguments[3],
                    a = Math.min(s.x, o.x),
                    u = Math.max(s.x, o.x),
                    l = Math.min(i.x, r.x),
                    h = Math.max(i.x, r.x);
                return !(l > u || h < a || (a = Math.min(s.y, o.y), u = Math.max(s.y, o.y), l = Math.min(i.y, r.y), h = Math.max(i.y, r.y), l > u || h < a))
            }
        }, C.serialVersionUID = 0x51845cd552189800, h(_, L), e(_.prototype, {
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return _
            }
        }), e(S.prototype, {
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return S
            }
        }), S.toLocationSymbol = function(t) {
            switch (t) {
                case S.EXTERIOR:
                    return "e";
                case S.BOUNDARY:
                    return "b";
                case S.INTERIOR:
                    return "i";
                case S.NONE:
                    return "-"
            }
            throw new i("Unknown location value: " + t)
        }, S.INTERIOR = 0, S.BOUNDARY = 1, S.EXTERIOR = 2, S.NONE = -1, e(b.prototype, {
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return b
            }
        }), b.log10 = function(t) {
            var e = Math.log(t);
            return r.isInfinite(e) ? e : r.isNaN(e) ? e : e / b.LOG_10
        }, b.min = function(t, e, n, i) {
            var r = t;
            return e < r && (r = e), n < r && (r = n), i < r && (r = i), r
        }, b.clamp = function() {
            if ("number" == typeof arguments[2] && "number" == typeof arguments[0] && "number" == typeof arguments[1]) {
                var t = arguments[0],
                    e = arguments[1],
                    n = arguments[2];
                return t < e ? e : t > n ? n : t
            }
            if (Number.isInteger(arguments[2]) && Number.isInteger(arguments[0]) && Number.isInteger(arguments[1])) {
                var i = arguments[0],
                    r = arguments[1],
                    s = arguments[2];
                return i < r ? r : i > s ? s : i
            }
        }, b.wrap = function(t, e) {
            return t < 0 ? e - -t % e : t % e
        }, b.max = function() {
            if (3 === arguments.length) {
                var t = arguments[0],
                    e = arguments[1],
                    n = arguments[2],
                    i = t;
                return e > i && (i = e), n > i && (i = n), i
            }
            if (4 === arguments.length) {
                var r = arguments[0],
                    s = arguments[1],
                    o = arguments[2],
                    a = arguments[3],
                    i = r;
                return s > i && (i = s), o > i && (i = o), a > i && (i = a), i
            }
        }, b.average = function(t, e) {
            return (t + e) / 2
        }, b.LOG_10 = Math.log(10), R.prototype.append = function(t) {
            this.str += t
        }, R.prototype.setCharAt = function(t, e) {
            this.str = this.str.substr(0, t) + e + this.str.substr(t + 1)
        }, R.prototype.toString = function(t) {
            return this.str
        }, M.prototype.intValue = function() {
            return this.value
        }, M.prototype.compareTo = function(t) {
            return this.value < t ? -1 : this.value > t ? 1 : 0
        }, M.isNaN = function(t) {
            return Number.isNaN(t)
        }, T.isWhitespace = function(t) {
            return t <= 32 && t >= 0 || 127 == t
        }, T.toUpperCase = function(t) {
            return t.toUpperCase()
        }, e(P.prototype, {
            le: function(t) {
                return this.hi < t.hi || this.hi === t.hi && this.lo <= t.lo
            },
            extractSignificantDigits: function(t, e) {
                var n = this.abs(),
                    i = P.magnitude(n.hi),
                    r = P.TEN.pow(i);
                n = n.divide(r), n.gt(P.TEN) ? (n = n.divide(P.TEN), i += 1) : n.lt(P.ONE) && (n = n.multiply(P.TEN), i -= 1);
                for (var s = i + 1, o = new R, a = P.MAX_PRINT_DIGITS - 1, u = 0; u <= a; u++) {
                    t && u === s && o.append(".");
                    var l = Math.trunc(n.hi);
                    if (l < 0) break;
                    var h = !1,
                        c = 0;
                    l > 9 ? (h = !0, c = "9") : c = "0" + l, o.append(c), n = n.subtract(P.valueOf(l)).multiply(P.TEN), h && n.selfAdd(P.TEN);
                    var f = !0,
                        g = P.magnitude(n.hi);
                    if (g < 0 && Math.abs(g) >= a - u && (f = !1), !f) break
                }
                return e[0] = i, o.toString()
            },
            sqr: function() {
                return this.multiply(this)
            },
            doubleValue: function() {
                return this.hi + this.lo
            },
            subtract: function() {
                if (arguments[0] instanceof P) {
                    var t = arguments[0];
                    return this.add(t.negate())
                }
                if ("number" == typeof arguments[0]) {
                    var e = arguments[0];
                    return this.add(-e)
                }
            },
            equals: function() {
                if (1 === arguments.length) {
                    var t = arguments[0];
                    return this.hi === t.hi && this.lo === t.lo
                }
            },
            isZero: function() {
                return 0 === this.hi && 0 === this.lo
            },
            selfSubtract: function() {
                if (arguments[0] instanceof P) {
                    var t = arguments[0];
                    return this.isNaN() ? this : this.selfAdd(-t.hi, -t.lo)
                }
                if ("number" == typeof arguments[0]) {
                    var e = arguments[0];
                    return this.isNaN() ? this : this.selfAdd(-e, 0)
                }
            },
            getSpecialNumberString: function() {
                return this.isZero() ? "0.0" : this.isNaN() ? "NaN " : null
            },
            min: function(t) {
                return this.le(t) ? this : t
            },
            selfDivide: function() {
                if (1 === arguments.length) {
                    if (arguments[0] instanceof P) {
                        var t = arguments[0];
                        return this.selfDivide(t.hi, t.lo)
                    }
                    if ("number" == typeof arguments[0]) {
                        var e = arguments[0];
                        return this.selfDivide(e, 0)
                    }
                } else if (2 === arguments.length) {
                    var n = arguments[0],
                        i = arguments[1],
                        r = null,
                        s = null,
                        o = null,
                        a = null,
                        u = null,
                        l = null,
                        h = null,
                        c = null;
                    return u = this.hi / n, l = P.SPLIT * u, r = l - u, c = P.SPLIT * n, r = l - r, s = u - r, o = c - n, h = u * n, o = c - o, a = n - o, c = r * o - h + r * a + s * o + s * a, l = (this.hi - h - c + this.lo - u * i) / n, c = u + l, this.hi = c, this.lo = u - c + l, this
                }
            },
            dump: function() {
                return "DD<" + this.hi + ", " + this.lo + ">"
            },
            divide: function() {
                if (arguments[0] instanceof P) {
                    var t = arguments[0],
                        e = null,
                        n = null,
                        i = null,
                        s = null,
                        o = null,
                        a = null,
                        u = null,
                        l = null;
                    o = this.hi / t.hi, a = P.SPLIT * o, e = a - o, l = P.SPLIT * t.hi, e = a - e, n = o - e, i = l - t.hi, u = o * t.hi, i = l - i, s = t.hi - i, l = e * i - u + e * s + n * i + n * s, a = (this.hi - u - l + this.lo - o * t.lo) / t.hi, l = o + a;
                    return new P(l, o - l + a)
                }
                if ("number" == typeof arguments[0]) {
                    var h = arguments[0];
                    return r.isNaN(h) ? P.createNaN() : P.copy(this).selfDivide(h, 0)
                }
            },
            ge: function(t) {
                return this.hi > t.hi || this.hi === t.hi && this.lo >= t.lo
            },
            pow: function(t) {
                if (0 === t) return P.valueOf(1);
                var e = new P(this),
                    n = P.valueOf(1),
                    i = Math.abs(t);
                if (i > 1)
                    for (; i > 0;) i % 2 == 1 && n.selfMultiply(e), (i /= 2) > 0 && (e = e.sqr());
                else n = e;
                return t < 0 ? n.reciprocal() : n
            },
            ceil: function() {
                if (this.isNaN()) return P.NaN;
                var t = Math.ceil(this.hi),
                    e = 0;
                return t === this.hi && (e = Math.ceil(this.lo)), new P(t, e)
            },
            compareTo: function(t) {
                var e = t;
                return this.hi < e.hi ? -1 : this.hi > e.hi ? 1 : this.lo < e.lo ? -1 : this.lo > e.lo ? 1 : 0
            },
            rint: function() {
                return this.isNaN() ? this : this.add(.5).floor()
            },
            setValue: function() {
                if (arguments[0] instanceof P) {
                    var t = arguments[0];
                    return this.init(t), this
                }
                if ("number" == typeof arguments[0]) {
                    var e = arguments[0];
                    return this.init(e), this
                }
            },
            max: function(t) {
                return this.ge(t) ? this : t
            },
            sqrt: function() {
                if (this.isZero()) return P.valueOf(0);
                if (this.isNegative()) return P.NaN;
                var t = 1 / Math.sqrt(this.hi),
                    e = this.hi * t,
                    n = P.valueOf(e),
                    i = this.subtract(n.sqr()),
                    r = i.hi * (.5 * t);
                return n.add(r)
            },
            selfAdd: function() {
                if (1 === arguments.length) {
                    if (arguments[0] instanceof P) {
                        var t = arguments[0];
                        return this.selfAdd(t.hi, t.lo)
                    }
                    if ("number" == typeof arguments[0]) {
                        var e = arguments[0],
                            n = null,
                            i = null,
                            r = null,
                            s = null,
                            o = null,
                            a = null;
                        return r = this.hi + e, o = r - this.hi, s = r - o, s = e - o + (this.hi - s), a = s + this.lo, n = r + a, i = a + (r - n), this.hi = n + i, this.lo = i + (n - this.hi), this
                    }
                } else if (2 === arguments.length) {
                    var u = arguments[0],
                        l = arguments[1],
                        n = null,
                        i = null,
                        h = null,
                        c = null,
                        r = null,
                        s = null,
                        o = null,
                        a = null;
                    r = this.hi + u, h = this.lo + l, o = r - this.hi, a = h - this.lo, s = r - o, c = h - a, s = u - o + (this.hi - s), c = l - a + (this.lo - c), o = s + h, n = r + o, i = o + (r - n), o = c + i;
                    var f = n + o,
                        g = o + (n - f);
                    return this.hi = f, this.lo = g, this
                }
            },
            selfMultiply: function() {
                if (1 === arguments.length) {
                    if (arguments[0] instanceof P) {
                        var t = arguments[0];
                        return this.selfMultiply(t.hi, t.lo)
                    }
                    if ("number" == typeof arguments[0]) {
                        var e = arguments[0];
                        return this.selfMultiply(e, 0)
                    }
                } else if (2 === arguments.length) {
                    var n = arguments[0],
                        i = arguments[1],
                        r = null,
                        s = null,
                        o = null,
                        a = null,
                        u = null,
                        l = null;
                    u = P.SPLIT * this.hi, r = u - this.hi, l = P.SPLIT * n, r = u - r, s = this.hi - r, o = l - n, u = this.hi * n, o = l - o, a = n - o, l = r * o - u + r * a + s * o + s * a + (this.hi * i + this.lo * n);
                    var h = u + l;
                    r = u - h;
                    var c = l + r;
                    return this.hi = h, this.lo = c, this
                }
            },
            selfSqr: function() {
                return this.selfMultiply(this)
            },
            floor: function() {
                if (this.isNaN()) return P.NaN;
                var t = Math.floor(this.hi),
                    e = 0;
                return t === this.hi && (e = Math.floor(this.lo)), new P(t, e)
            },
            negate: function() {
                return this.isNaN() ? this : new P(-this.hi, -this.lo)
            },
            clone: function() {
                try {
                    return null
                } catch (t) {
                    if (t instanceof CloneNotSupportedException) return null;
                    throw t
                }
            },
            multiply: function() {
                if (arguments[0] instanceof P) {
                    var t = arguments[0];
                    return t.isNaN() ? P.createNaN() : P.copy(this).selfMultiply(t)
                }
                if ("number" == typeof arguments[0]) {
                    var e = arguments[0];
                    return r.isNaN(e) ? P.createNaN() : P.copy(this).selfMultiply(e, 0)
                }
            },
            isNaN: function() {
                return r.isNaN(this.hi)
            },
            intValue: function() {
                return Math.trunc(this.hi)
            },
            toString: function() {
                var t = P.magnitude(this.hi);
                return t >= -3 && t <= 20 ? this.toStandardNotation() : this.toSciNotation()
            },
            toStandardNotation: function() {
                var t = this.getSpecialNumberString();
                if (null !== t) return t;
                var e = new Array(1).fill(null),
                    n = this.extractSignificantDigits(!0, e),
                    i = e[0] + 1,
                    r = n;
                if ("." === n.charAt(0)) r = "0" + n;
                else if (i < 0) r = "0." + P.stringOfChar("0", -i) + n;
                else if (-1 === n.indexOf(".")) {
                    var s = i - n.length,
                        o = P.stringOfChar("0", s);
                    r = n + o + ".0"
                }
                return this.isNegative() ? "-" + r : r
            },
            reciprocal: function() {
                var t = null,
                    e = null,
                    n = null,
                    i = null,
                    r = null,
                    s = null,
                    o = null,
                    a = null;
                r = 1 / this.hi, s = P.SPLIT * r, t = s - r, a = P.SPLIT * this.hi, t = s - t, e = r - t, n = a - this.hi, o = r * this.hi, n = a - n, i = this.hi - n, a = t * n - o + t * i + e * n + e * i, s = (1 - o - a - r * this.lo) / this.hi;
                var u = r + s;
                return new P(u, r - u + s)
            },
            toSciNotation: function() {
                if (this.isZero()) return P.SCI_NOT_ZERO;
                var t = this.getSpecialNumberString();
                if (null !== t) return t;
                var e = new Array(1).fill(null),
                    n = this.extractSignificantDigits(!1, e),
                    i = P.SCI_NOT_EXPONENT_CHAR + e[0];
                if ("0" === n.charAt(0)) throw new IllegalStateException("Found leading zero: " + n);
                var r = "";
                n.length > 1 && (r = n.substring(1));
                var s = n.charAt(0) + "." + r;
                return this.isNegative() ? "-" + s + i : s + i
            },
            abs: function() {
                return this.isNaN() ? P.NaN : this.isNegative() ? this.negate() : new P(this)
            },
            isPositive: function() {
                return this.hi > 0 || 0 === this.hi && this.lo > 0
            },
            lt: function(t) {
                return this.hi < t.hi || this.hi === t.hi && this.lo < t.lo
            },
            add: function() {
                if (arguments[0] instanceof P) {
                    var t = arguments[0];
                    return P.copy(this).selfAdd(t)
                }
                if ("number" == typeof arguments[0]) {
                    var e = arguments[0];
                    return P.copy(this).selfAdd(e)
                }
            },
            init: function() {
                if (1 === arguments.length) {
                    if ("number" == typeof arguments[0]) {
                        var t = arguments[0];
                        this.hi = t, this.lo = 0
                    } else if (arguments[0] instanceof P) {
                        var e = arguments[0];
                        this.hi = e.hi, this.lo = e.lo
                    }
                } else if (2 === arguments.length) {
                    var n = arguments[0],
                        i = arguments[1];
                    this.hi = n, this.lo = i
                }
            },
            gt: function(t) {
                return this.hi > t.hi || this.hi === t.hi && this.lo > t.lo
            },
            isNegative: function() {
                return this.hi < 0 || 0 === this.hi && this.lo < 0
            },
            trunc: function() {
                return this.isNaN() ? P.NaN : this.isPositive() ? this.floor() : this.ceil()
            },
            signum: function() {
                return this.hi > 0 ? 1 : this.hi < 0 ? -1 : this.lo > 0 ? 1 : this.lo < 0 ? -1 : 0
            },
            interfaces_: function() {
                return [u, s, o]
            },
            getClass: function() {
                return P
            }
        }), P.sqr = function(t) {
            return P.valueOf(t).selfMultiply(t)
        }, P.valueOf = function() {
            if ("string" == typeof arguments[0]) {
                var t = arguments[0];
                return P.parse(t)
            }
            if ("number" == typeof arguments[0]) {
                return new P(arguments[0])
            }
        }, P.sqrt = function(t) {
            return P.valueOf(t).sqrt()
        }, P.parse = function(t) {
            for (var e = 0, n = t.length; T.isWhitespace(t.charAt(e));) e++;
            var i = !1;
            if (e < n) {
                var r = t.charAt(e);
                "-" !== r && "+" !== r || (e++, "-" === r && (i = !0))
            }
            for (var s = new P, o = 0, a = 0, u = 0; !(e >= n);) {
                var l = t.charAt(e);
                if (e++, T.isDigit(l)) {
                    var h = l - "0";
                    s.selfMultiply(P.TEN), s.selfAdd(h), o++
                } else {
                    if ("." !== l) {
                        if ("e" === l || "E" === l) {
                            var c = t.substring(e);
                            try {
                                u = M.parseInt(c)
                            } catch (e) {
                                throw e instanceof NumberFormatException ? new NumberFormatException("Invalid exponent " + c + " in string " + t) : e
                            }
                            break
                        }
                        throw new NumberFormatException("Unexpected character '" + l + "' at position " + e + " in string " + t)
                    }
                    a = o
                }
            }
            var f = s,
                g = o - a - u;
            if (0 === g) f = s;
            else if (g > 0) {
                var d = P.TEN.pow(g);
                f = s.divide(d)
            } else if (g < 0) {
                var d = P.TEN.pow(-g);
                f = s.multiply(d)
            }
            return i ? f.negate() : f
        }, P.createNaN = function() {
            return new P(r.NaN, r.NaN)
        }, P.copy = function(t) {
            return new P(t)
        }, P.magnitude = function(t) {
            var e = Math.abs(t),
                n = Math.log(e) / Math.log(10),
                i = Math.trunc(Math.floor(n));
            return 10 * Math.pow(10, i) <= e && (i += 1), i
        }, P.stringOfChar = function(t, e) {
            for (var n = new R, i = 0; i < e; i++) n.append(t);
            return n.toString()
        }, P.PI = new P(3.141592653589793, 1.2246467991473532e-16), P.TWO_PI = new P(6.283185307179586, 2.4492935982947064e-16), P.PI_2 = new P(1.5707963267948966, 6.123233995736766e-17), P.E = new P(2.718281828459045, 1.4456468917292502e-16), P.NaN = new P(r.NaN, r.NaN), P.EPS = 1.23259516440783e-32, P.SPLIT = 134217729, P.MAX_PRINT_DIGITS = 32, P.TEN = P.valueOf(10), P.ONE = P.valueOf(1), P.SCI_NOT_EXPONENT_CHAR = "E", P.SCI_NOT_ZERO = "0.0E0", e(O.prototype, {
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return O
            }
        }), O.orientationIndex = function(t, e, n) {
            var i = O.orientationIndexFilter(t, e, n);
            if (i <= 1) return i;
            var r = P.valueOf(e.x).selfAdd(-t.x),
                s = P.valueOf(e.y).selfAdd(-t.y),
                o = P.valueOf(n.x).selfAdd(-e.x),
                a = P.valueOf(n.y).selfAdd(-e.y);
            return r.selfMultiply(a).selfSubtract(s.selfMultiply(o)).signum()
        }, O.signOfDet2x2 = function(t, e, n, i) {
            return t.multiply(i).selfSubtract(e.multiply(n)).signum()
        }, O.intersection = function(t, e, n, i) {
            var r = P.valueOf(i.y).selfSubtract(n.y).selfMultiply(P.valueOf(e.x).selfSubtract(t.x)),
                s = P.valueOf(i.x).selfSubtract(n.x).selfMultiply(P.valueOf(e.y).selfSubtract(t.y)),
                o = r.subtract(s),
                a = P.valueOf(i.x).selfSubtract(n.x).selfMultiply(P.valueOf(t.y).selfSubtract(n.y)),
                u = P.valueOf(i.y).selfSubtract(n.y).selfMultiply(P.valueOf(t.x).selfSubtract(n.x)),
                l = a.subtract(u),
                h = l.selfDivide(o).doubleValue(),
                c = P.valueOf(t.x).selfAdd(P.valueOf(e.x).selfSubtract(t.x).selfMultiply(h)).doubleValue(),
                f = P.valueOf(e.x).selfSubtract(t.x).selfMultiply(P.valueOf(t.y).selfSubtract(n.y)),
                d = P.valueOf(e.y).selfSubtract(t.y).selfMultiply(P.valueOf(t.x).selfSubtract(n.x)),
                p = f.subtract(d),
                m = p.selfDivide(o).doubleValue();
            return new g(c, P.valueOf(n.y).selfAdd(P.valueOf(i.y).selfSubtract(n.y).selfMultiply(m)).doubleValue())
        }, O.orientationIndexFilter = function(t, e, n) {
            var i = null,
                r = (t.x - n.x) * (e.y - n.y),
                s = (t.y - n.y) * (e.x - n.x),
                o = r - s;
            if (r > 0) {
                if (s <= 0) return O.signum(o);
                i = r + s
            } else {
                if (!(r < 0)) return O.signum(o);
                if (s >= 0) return O.signum(o);
                i = -r - s
            }
            var a = O.DP_SAFE_EPSILON * i;
            return o >= a || -o >= a ? O.signum(o) : 2
        }, O.signum = function(t) {
            return t > 0 ? 1 : t < 0 ? -1 : 0
        }, O.DP_SAFE_EPSILON = 1e-15, e(D.prototype, {
            setOrdinate: function(t, e, n) {},
            size: function() {},
            getOrdinate: function(t, e) {},
            getCoordinate: function() {
                1 === arguments.length ? arguments[0] : 2 === arguments.length && (arguments[0], arguments[1])
            },
            getCoordinateCopy: function(t) {},
            getDimension: function() {},
            getX: function(t) {},
            clone: function() {},
            expandEnvelope: function(t) {},
            copy: function() {},
            getY: function(t) {},
            toCoordinateArray: function() {},
            interfaces_: function() {
                return [o]
            },
            getClass: function() {
                return D
            }
        }), D.X = 0, D.Y = 1, D.Z = 2, D.M = 3, A.arraycopy = function(t, e, n, i, r) {
            for (var s = 0, o = e; o < e + r; o++) n[i + s] = t[o], s++
        }, A.getProperty = function(t) {
            return {
                "line.separator": "\n"
            }[t]
        }, e(F.prototype, {
            getY: function() {
                var t = this.y / this.w;
                if (r.isNaN(t) || r.isInfinite(t)) throw new _;
                return t
            },
            getX: function() {
                var t = this.x / this.w;
                if (r.isNaN(t) || r.isInfinite(t)) throw new _;
                return t
            },
            getCoordinate: function() {
                var t = new g;
                return t.x = this.getX(), t.y = this.getY(), t
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return F
            }
        }), F.intersection = function(t, e, n, i) {
            var s = t.y - e.y,
                o = e.x - t.x,
                a = t.x * e.y - e.x * t.y,
                u = n.y - i.y,
                l = i.x - n.x,
                h = n.x * i.y - i.x * n.y,
                c = o * h - l * a,
                f = u * a - s * h,
                d = s * l - u * o,
                p = c / d,
                m = f / d;
            if (r.isNaN(p) || r.isInfinite(p) || r.isNaN(m) || r.isInfinite(m)) throw new _;
            return new g(p, m)
        }, e(k.prototype, {
            create: function() {
                1 === arguments.length ? arguments[0] instanceof Array ? arguments[0] : w(arguments[0], D) && arguments[0] : 2 === arguments.length && (arguments[0], arguments[1])
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return k
            }
        }), e(G.prototype, {
            filter: function(t) {},
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return G
            }
        }), e(B.prototype, {
            isGeometryCollection: function() {
                return this.getSortIndex() === B.SORTINDEX_GEOMETRYCOLLECTION
            },
            getFactory: function() {
                return this.factory
            },
            getGeometryN: function(t) {
                return this
            },
            getArea: function() {
                return 0
            },
            isRectangle: function() {
                return !1
            },
            equals: function() {
                if (1 === arguments.length) {
                    if (arguments[0] instanceof B) {
                        var t = arguments[0];
                        return null !== t && this.equalsTopo(t)
                    }
                    if (arguments[0] instanceof Object) {
                        var e = arguments[0];
                        if (!(e instanceof B)) return !1;
                        var n = e;
                        return this.equalsExact(n)
                    }
                }
            },
            equalsExact: function(t) {
                return this === t || this.equalsExact(t, 0)
            },
            geometryChanged: function() {
                this.apply(B.geometryChangedFilter)
            },
            geometryChangedAction: function() {
                this.envelope = null
            },
            equalsNorm: function(t) {
                return null !== t && this.norm().equalsExact(t.norm())
            },
            getLength: function() {
                return 0
            },
            getNumGeometries: function() {
                return 1
            },
            compareTo: function() {
                if (1 === arguments.length) {
                    var t = arguments[0],
                        e = t;
                    return this.getSortIndex() !== e.getSortIndex() ? this.getSortIndex() - e.getSortIndex() : this.isEmpty() && e.isEmpty() ? 0 : this.isEmpty() ? -1 : e.isEmpty() ? 1 : this.compareToSameClass(t)
                }
                if (2 === arguments.length) {
                    var n = arguments[0],
                        i = arguments[1],
                        e = n;
                    return this.getSortIndex() !== e.getSortIndex() ? this.getSortIndex() - e.getSortIndex() : this.isEmpty() && e.isEmpty() ? 0 : this.isEmpty() ? -1 : e.isEmpty() ? 1 : this.compareToSameClass(n, i)
                }
            },
            getUserData: function() {
                return this.userData
            },
            getSRID: function() {
                return this.SRID
            },
            getEnvelope: function() {
                return this.getFactory().toGeometry(this.getEnvelopeInternal())
            },
            checkNotGeometryCollection: function(t) {
                if (t.getSortIndex() === B.SORTINDEX_GEOMETRYCOLLECTION) throw new i("This method does not support GeometryCollection arguments")
            },
            equal: function(t, e, n) {
                return 0 === n ? t.equals(e) : t.distance(e) <= n
            },
            norm: function() {
                var t = this.copy();
                return t.normalize(), t
            },
            getPrecisionModel: function() {
                return this.factory.getPrecisionModel()
            },
            getEnvelopeInternal: function() {
                return null === this.envelope && (this.envelope = this.computeEnvelopeInternal()), new C(this.envelope)
            },
            setSRID: function(t) {
                this.SRID = t
            },
            setUserData: function(t) {
                this.userData = t
            },
            compare: function(t, e) {
                for (var n = t.iterator(), i = e.iterator(); n.hasNext() && i.hasNext();) {
                    var r = n.next(),
                        s = i.next(),
                        o = r.compareTo(s);
                    if (0 !== o) return o
                }
                return n.hasNext() ? 1 : i.hasNext() ? -1 : 0
            },
            hashCode: function() {
                return this.getEnvelopeInternal().hashCode()
            },
            isGeometryCollectionOrDerived: function() {
                return this.getSortIndex() === B.SORTINDEX_GEOMETRYCOLLECTION || this.getSortIndex() === B.SORTINDEX_MULTIPOINT || this.getSortIndex() === B.SORTINDEX_MULTILINESTRING || this.getSortIndex() === B.SORTINDEX_MULTIPOLYGON
            },
            interfaces_: function() {
                return [o, s, u]
            },
            getClass: function() {
                return B
            }
        }), B.hasNonEmptyElements = function(t) {
            for (var e = 0; e < t.length; e++)
                if (!t[e].isEmpty()) return !0;
            return !1
        }, B.hasNullElements = function(t) {
            for (var e = 0; e < t.length; e++)
                if (null === t[e]) return !0;
            return !1
        }, B.serialVersionUID = 0x799ea46522854c00, B.SORTINDEX_POINT = 0, B.SORTINDEX_MULTIPOINT = 1, B.SORTINDEX_LINESTRING = 2, B.SORTINDEX_LINEARRING = 3, B.SORTINDEX_MULTILINESTRING = 4, B.SORTINDEX_POLYGON = 5, B.SORTINDEX_MULTIPOLYGON = 6, B.SORTINDEX_GEOMETRYCOLLECTION = 7, B.geometryChangedFilter = {
            interfaces_: function() {
                return [G]
            },
            filter: function(t) {
                t.geometryChangedAction()
            }
        }, e(q.prototype, {
            filter: function(t) {},
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return q
            }
        }), e(z.prototype, {
            isInBoundary: function(t) {},
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return z
            }
        }), e(V.prototype, {
            isInBoundary: function(t) {
                return t % 2 == 1
            },
            interfaces_: function() {
                return [z]
            },
            getClass: function() {
                return V
            }
        }), e(U.prototype, {
            isInBoundary: function(t) {
                return t > 0
            },
            interfaces_: function() {
                return [z]
            },
            getClass: function() {
                return U
            }
        }), e(Y.prototype, {
            isInBoundary: function(t) {
                return t > 1
            },
            interfaces_: function() {
                return [z]
            },
            getClass: function() {
                return Y
            }
        }), e(X.prototype, {
            isInBoundary: function(t) {
                return 1 === t
            },
            interfaces_: function() {
                return [z]
            },
            getClass: function() {
                return X
            }
        }), z.Mod2BoundaryNodeRule = V, z.EndPointBoundaryNodeRule = U, z.MultiValentEndPointBoundaryNodeRule = Y, z.MonoValentEndPointBoundaryNodeRule = X, z.MOD2_BOUNDARY_RULE = new V, z.ENDPOINT_BOUNDARY_RULE = new U, z.MULTIVALENT_ENDPOINT_BOUNDARY_RULE = new Y, z.MONOVALENT_ENDPOINT_BOUNDARY_RULE = new X, z.OGC_SFS_BOUNDARY_RULE = z.MOD2_BOUNDARY_RULE, e(H.prototype, {
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return H
            }
        }), H.isRing = function(t) {
            return !(t.length < 4 || !t[0].equals2D(t[t.length - 1]))
        }, H.ptNotInList = function(t, e) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                if (H.indexOf(i, e) < 0) return i
            }
            return null
        }, H.scroll = function(t, e) {
            var n = H.indexOf(e, t);
            if (n < 0) return null;
            var i = new Array(t.length).fill(null);
            A.arraycopy(t, n, i, 0, t.length - n), A.arraycopy(t, 0, i, t.length - n, n), A.arraycopy(i, 0, t, 0, t.length)
        }, H.equals = function() {
            if (2 === arguments.length) {
                var t = arguments[0],
                    e = arguments[1];
                if (t === e) return !0;
                if (null === t || null === e) return !1;
                if (t.length !== e.length) return !1;
                for (var n = 0; n < t.length; n++)
                    if (!t[n].equals(e[n])) return !1;
                return !0
            }
            if (3 === arguments.length) {
                var i = arguments[0],
                    r = arguments[1],
                    s = arguments[2];
                if (i === r) return !0;
                if (null === i || null === r) return !1;
                if (i.length !== r.length) return !1;
                for (var n = 0; n < i.length; n++)
                    if (0 !== s.compare(i[n], r[n])) return !1;
                return !0
            }
        }, H.intersection = function(t, e) {
            for (var n = new N, i = 0; i < t.length; i++) e.intersects(t[i]) && n.add(t[i], !0);
            return n.toCoordinateArray()
        }, H.hasRepeatedPoints = function(t) {
            for (var e = 1; e < t.length; e++)
                if (t[e - 1].equals(t[e])) return !0;
            return !1
        }, H.removeRepeatedPoints = function(t) {
            return H.hasRepeatedPoints(t) ? new N(t, !1).toCoordinateArray() : t
        }, H.reverse = function(t) {
            for (var e = t.length - 1, n = Math.trunc(e / 2), i = 0; i <= n; i++) {
                var r = t[i];
                t[i] = t[e - i], t[e - i] = r
            }
        }, H.removeNull = function(t) {
            for (var e = 0, n = 0; n < t.length; n++) null !== t[n] && e++;
            var i = new Array(e).fill(null);
            if (0 === e) return i;
            for (var r = 0, n = 0; n < t.length; n++) null !== t[n] && (i[r++] = t[n]);
            return i
        }, H.copyDeep = function() {
            if (1 === arguments.length) {
                for (var t = arguments[0], e = new Array(t.length).fill(null), n = 0; n < t.length; n++) e[n] = new g(t[n]);
                return e
            }
            if (5 === arguments.length)
                for (var i = arguments[0], r = arguments[1], s = arguments[2], o = arguments[3], a = arguments[4], n = 0; n < a; n++) s[o + n] = new g(i[r + n])
        }, H.isEqualReversed = function(t, e) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n],
                    r = e[t.length - n - 1];
                if (0 !== i.compareTo(r)) return !1
            }
            return !0
        }, H.envelope = function(t) {
            for (var e = new C, n = 0; n < t.length; n++) e.expandToInclude(t[n]);
            return e
        }, H.toCoordinateArray = function(t) {
            return t.toArray(H.coordArrayType)
        }, H.atLeastNCoordinatesOrNothing = function(t, e) {
            return e.length >= t ? e : []
        }, H.indexOf = function(t, e) {
            for (var n = 0; n < e.length; n++)
                if (t.equals(e[n])) return n;
            return -1
        }, H.increasingDirection = function(t) {
            for (var e = 0; e < Math.trunc(t.length / 2); e++) {
                var n = t.length - 1 - e,
                    i = t[e].compareTo(t[n]);
                if (0 !== i) return i
            }
            return 1
        }, H.compare = function(t, e) {
            for (var n = 0; n < t.length && n < e.length;) {
                var i = t[n].compareTo(e[n]);
                if (0 !== i) return i;
                n++
            }
            return n < e.length ? -1 : n < t.length ? 1 : 0
        }, H.minCoordinate = function(t) {
            for (var e = null, n = 0; n < t.length; n++)(null === e || e.compareTo(t[n]) > 0) && (e = t[n]);
            return e
        }, H.extract = function(t, e, n) {
            e = b.clamp(e, 0, t.length), n = b.clamp(n, -1, t.length);
            var i = n - e + 1;
            n < 0 && (i = 0), e >= t.length && (i = 0), n < e && (i = 0);
            var r = new Array(i).fill(null);
            if (0 === i) return r;
            for (var s = 0, o = e; o <= n; o++) r[s++] = t[o];
            return r
        }, e(j.prototype, {
            compare: function(t, e) {
                var n = t,
                    i = e;
                return H.compare(n, i)
            },
            interfaces_: function() {
                return [a]
            },
            getClass: function() {
                return j
            }
        }), e(W.prototype, {
            compare: function(t, e) {
                var n = t,
                    i = e;
                if (n.length < i.length) return -1;
                if (n.length > i.length) return 1;
                if (0 === n.length) return 0;
                var r = H.compare(n, i);
                return H.isEqualReversed(n, i) ? 0 : r
            },
            OLDcompare: function(t, e) {
                var n = t,
                    i = e;
                if (n.length < i.length) return -1;
                if (n.length > i.length) return 1;
                if (0 === n.length) return 0;
                for (var r = H.increasingDirection(n), s = H.increasingDirection(i), o = r > 0 ? 0 : n.length - 1, a = s > 0 ? 0 : n.length - 1, u = 0; u < n.length; u++) {
                    var l = n[o].compareTo(i[a]);
                    if (0 !== l) return l;
                    o += r, a += s
                }
                return 0
            },
            interfaces_: function() {
                return [a]
            },
            getClass: function() {
                return W
            }
        }), H.ForwardComparator = j, H.BidirectionalComparator = W, H.coordArrayType = new Array(0).fill(null), K.prototype.get = function() {}, K.prototype.put = function() {}, K.prototype.size = function() {}, K.prototype.values = function() {}, K.prototype.entrySet = function() {}, J.prototype = new K, Z.prototype = new m, Z.prototype.contains = function() {}, Q.prototype = new Z, Q.prototype.contains = function(t) {
            for (var e = 0, n = this.array_.length; e < n; e++) {
                if (this.array_[e] === t) return !0
            }
            return !1
        }, Q.prototype.add = function(t) {
            return !this.contains(t) && (this.array_.push(t), !0)
        }, Q.prototype.addAll = function(t) {
            for (var e = t.iterator(); e.hasNext();) this.add(e.next());
            return !0
        }, Q.prototype.remove = function(t) {
            throw new javascript.util.OperationNotSupported
        }, Q.prototype.size = function() {
            return this.array_.length
        }, Q.prototype.isEmpty = function() {
            return 0 === this.array_.length
        }, Q.prototype.toArray = function() {
            for (var t = [], e = 0, n = this.array_.length; e < n; e++) t.push(this.array_[e]);
            return t
        }, Q.prototype.iterator = function() {
            return new Zs(this)
        };
        var Zs = function(t) {
            this.hashSet_ = t, this.position_ = 0
        };
        Zs.prototype.next = function() {
            if (this.position_ === this.hashSet_.size()) throw new E;
            return this.hashSet_.array_[this.position_++]
        }, Zs.prototype.hasNext = function() {
            return this.position_ < this.hashSet_.size()
        }, Zs.prototype.remove = function() {
            throw new x
        };
        var Qs = 0;
        rt.prototype = new J, rt.prototype.get = function(t) {
            for (var e = this.root_; null !== e;) {
                var n = t.compareTo(e.key);
                if (n < 0) e = e.left;
                else {
                    if (!(n > 0)) return e.value;
                    e = e.right
                }
            }
            return null
        }, rt.prototype.put = function(t, e) {
            if (null === this.root_) return this.root_ = {
                key: t,
                value: e,
                left: null,
                right: null,
                parent: null,
                color: Qs,
                getValue: function() {
                    return this.value
                },
                getKey: function() {
                    return this.key
                }
            }, this.size_ = 1, null;
            var n, i, r = this.root_;
            do {
                if (n = r, (i = t.compareTo(r.key)) < 0) r = r.left;
                else {
                    if (!(i > 0)) {
                        var s = r.value;
                        return r.value = e, s
                    }
                    r = r.right
                }
            } while (null !== r);
            var o = {
                key: t,
                left: null,
                right: null,
                value: e,
                parent: n,
                color: Qs,
                getValue: function() {
                    return this.value
                },
                getKey: function() {
                    return this.key
                }
            };
            return i < 0 ? n.left = o : n.right = o, this.fixAfterInsertion(o), this.size_++, null
        }, rt.prototype.fixAfterInsertion = function(t) {
            for (t.color = 1; null != t && t != this.root_ && 1 == t.parent.color;)
                if (tt(t) == nt(tt(tt(t)))) {
                    var e = it(tt(tt(t)));
                    1 == $(e) ? (et(tt(t), Qs), et(e, Qs), et(tt(tt(t)), 1), t = tt(tt(t))) : (t == it(tt(t)) && (t = tt(t), this.rotateLeft(t)), et(tt(t), Qs), et(tt(tt(t)), 1), this.rotateRight(tt(tt(t))))
                } else {
                    var e = nt(tt(tt(t)));
                    1 == $(e) ? (et(tt(t), Qs), et(e, Qs), et(tt(tt(t)), 1), t = tt(tt(t))) : (t == nt(tt(t)) && (t = tt(t), this.rotateRight(t)), et(tt(t), Qs), et(tt(tt(t)), 1), this.rotateLeft(tt(tt(t))))
                }
            this.root_.color = Qs
        }, rt.prototype.values = function() {
            var t = new I,
                e = this.getFirstEntry();
            if (null !== e)
                for (t.add(e.value); null !== (e = rt.successor(e));) t.add(e.value);
            return t
        }, rt.prototype.entrySet = function() {
            var t = new Q,
                e = this.getFirstEntry();
            if (null !== e)
                for (t.add(e); null !== (e = rt.successor(e));) t.add(e);
            return t
        }, rt.prototype.rotateLeft = function(t) {
            if (null != t) {
                var e = t.right;
                t.right = e.left, null != e.left && (e.left.parent = t), e.parent = t.parent, null == t.parent ? this.root_ = e : t.parent.left == t ? t.parent.left = e : t.parent.right = e, e.left = t, t.parent = e
            }
        }, rt.prototype.rotateRight = function(t) {
            if (null != t) {
                var e = t.left;
                t.left = e.right, null != e.right && (e.right.parent = t), e.parent = t.parent, null == t.parent ? this.root_ = e : t.parent.right == t ? t.parent.right = e : t.parent.left = e, e.right = t, t.parent = e
            }
        }, rt.prototype.getFirstEntry = function() {
            var t = this.root_;
            if (null != t)
                for (; null != t.left;) t = t.left;
            return t
        }, rt.successor = function(t) {
            if (null === t) return null;
            if (null !== t.right) {
                for (var e = t.right; null !== e.left;) e = e.left;
                return e
            }
            for (var e = t.parent, n = t; null !== e && n === e.right;) n = e, e = e.parent;
            return e
        }, rt.prototype.size = function() {
            return this.size_
        }, e(st.prototype, {
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return st
            }
        }), ot.prototype = new Z, at.prototype = new ot, at.prototype.contains = function(t) {
            for (var e = 0, n = this.array_.length; e < n; e++) {
                if (0 === this.array_[e].compareTo(t)) return !0
            }
            return !1
        }, at.prototype.add = function(t) {
            if (this.contains(t)) return !1;
            for (var e = 0, n = this.array_.length; e < n; e++) {
                if (1 === this.array_[e].compareTo(t)) return this.array_.splice(e, 0, t), !0
            }
            return this.array_.push(t), !0
        }, at.prototype.addAll = function(t) {
            for (var e = t.iterator(); e.hasNext();) this.add(e.next());
            return !0
        }, at.prototype.remove = function(t) {
            throw new x
        }, at.prototype.size = function() {
            return this.array_.length
        }, at.prototype.isEmpty = function() {
            return 0 === this.array_.length
        }, at.prototype.toArray = function() {
            for (var t = [], e = 0, n = this.array_.length; e < n; e++) t.push(this.array_[e]);
            return t
        }, at.prototype.iterator = function() {
            return new $s(this)
        };
        var $s = function(t) {
            this.treeSet_ = t, this.position_ = 0
        };
        $s.prototype.next = function() {
            if (this.position_ === this.treeSet_.size()) throw new E;
            return this.treeSet_.array_[this.position_++]
        }, $s.prototype.hasNext = function() {
            return this.position_ < this.treeSet_.size()
        }, $s.prototype.remove = function() {
            throw new x
        }, ut.sort = function() {
            var t, e, n, i, r = arguments[0];
            if (1 === arguments.length) return i = function(t, e) {
                return t.compareTo(e)
            }, void r.sort(i);
            if (2 === arguments.length) n = arguments[1], i = function(t, e) {
                return n.compare(t, e)
            }, r.sort(i);
            else {
                if (3 === arguments.length) {
                    e = r.slice(arguments[1], arguments[2]), e.sort();
                    var s = r.slice(0, arguments[1]).concat(e, r.slice(arguments[2], r.length));
                    for (r.splice(0, r.length), t = 0; t < s.length; t++) r.push(s[t]);
                    return
                }
                if (4 === arguments.length) {
                    for (e = r.slice(arguments[1], arguments[2]), n = arguments[3], i = function(t, e) {
                            return n.compare(t, e)
                        }, e.sort(i), s = r.slice(0, arguments[1]).concat(e, r.slice(arguments[2], r.length)), r.splice(0, r.length), t = 0; t < s.length; t++) r.push(s[t]);
                    return
                }
            }
        }, ut.asList = function(t) {
            for (var e = new I, n = 0, i = t.length; n < i; n++) e.add(t[n]);
            return e
        }, e(lt.prototype, {
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return lt
            }
        }), lt.toDimensionSymbol = function(t) {
            switch (t) {
                case lt.FALSE:
                    return lt.SYM_FALSE;
                case lt.TRUE:
                    return lt.SYM_TRUE;
                case lt.DONTCARE:
                    return lt.SYM_DONTCARE;
                case lt.P:
                    return lt.SYM_P;
                case lt.L:
                    return lt.SYM_L;
                case lt.A:
                    return lt.SYM_A
            }
            throw new i("Unknown dimension value: " + t)
        }, lt.toDimensionValue = function(t) {
            switch (T.toUpperCase(t)) {
                case lt.SYM_FALSE:
                    return lt.FALSE;
                case lt.SYM_TRUE:
                    return lt.TRUE;
                case lt.SYM_DONTCARE:
                    return lt.DONTCARE;
                case lt.SYM_P:
                    return lt.P;
                case lt.SYM_L:
                    return lt.L;
                case lt.SYM_A:
                    return lt.A
            }
            throw new i("Unknown dimension symbol: " + t)
        }, lt.P = 0, lt.L = 1, lt.A = 2, lt.FALSE = -1, lt.TRUE = -2, lt.DONTCARE = -3, lt.SYM_FALSE = "F", lt.SYM_TRUE = "T", lt.SYM_DONTCARE = "*", lt.SYM_P = "0", lt.SYM_L = "1", lt.SYM_A = "2", e(ht.prototype, {
            filter: function(t) {},
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return ht
            }
        }), e(ct.prototype, {
            filter: function(t, e) {},
            isDone: function() {},
            isGeometryChanged: function() {},
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return ct
            }
        }), h(ft, B), e(ft.prototype, {
            computeEnvelopeInternal: function() {
                for (var t = new C, e = 0; e < this.geometries.length; e++) t.expandToInclude(this.geometries[e].getEnvelopeInternal());
                return t
            },
            getGeometryN: function(t) {
                return this.geometries[t]
            },
            getSortIndex: function() {
                return B.SORTINDEX_GEOMETRYCOLLECTION
            },
            getCoordinates: function() {
                for (var t = new Array(this.getNumPoints()).fill(null), e = -1, n = 0; n < this.geometries.length; n++)
                    for (var i = this.geometries[n].getCoordinates(), r = 0; r < i.length; r++) e++, t[e] = i[r];
                return t
            },
            getArea: function() {
                for (var t = 0, e = 0; e < this.geometries.length; e++) t += this.geometries[e].getArea();
                return t
            },
            equalsExact: function() {
                if (2 === arguments.length) {
                    var t = arguments[0],
                        e = arguments[1];
                    if (!this.isEquivalentClass(t)) return !1;
                    var n = t;
                    if (this.geometries.length !== n.geometries.length) return !1;
                    for (var i = 0; i < this.geometries.length; i++)
                        if (!this.geometries[i].equalsExact(n.geometries[i], e)) return !1;
                    return !0
                }
                return B.prototype.equalsExact.apply(this, arguments)
            },
            normalize: function() {
                for (var t = 0; t < this.geometries.length; t++) this.geometries[t].normalize();
                ut.sort(this.geometries)
            },
            getCoordinate: function() {
                return this.isEmpty() ? null : this.geometries[0].getCoordinate()
            },
            getBoundaryDimension: function() {
                for (var t = lt.FALSE, e = 0; e < this.geometries.length; e++) t = Math.max(t, this.geometries[e].getBoundaryDimension());
                return t
            },
            getDimension: function() {
                for (var t = lt.FALSE, e = 0; e < this.geometries.length; e++) t = Math.max(t, this.geometries[e].getDimension());
                return t
            },
            getLength: function() {
                for (var t = 0, e = 0; e < this.geometries.length; e++) t += this.geometries[e].getLength();
                return t
            },
            getNumPoints: function() {
                for (var t = 0, e = 0; e < this.geometries.length; e++) t += this.geometries[e].getNumPoints();
                return t
            },
            getNumGeometries: function() {
                return this.geometries.length
            },
            reverse: function() {
                for (var t = this.geometries.length, e = new Array(t).fill(null), n = 0; n < this.geometries.length; n++) e[n] = this.geometries[n].reverse();
                return this.getFactory().createGeometryCollection(e)
            },
            compareToSameClass: function() {
                if (1 === arguments.length) {
                    var t = arguments[0],
                        e = new at(ut.asList(this.geometries)),
                        n = new at(ut.asList(t.geometries));
                    return this.compare(e, n)
                }
                if (2 === arguments.length) {
                    for (var i = arguments[0], r = arguments[1], s = i, o = this.getNumGeometries(), a = s.getNumGeometries(), u = 0; u < o && u < a;) {
                        var l = this.getGeometryN(u),
                            h = s.getGeometryN(u),
                            c = l.compareToSameClass(h, r);
                        if (0 !== c) return c;
                        u++
                    }
                    return u < o ? 1 : u < a ? -1 : 0
                }
            },
            apply: function() {
                if (w(arguments[0], q))
                    for (var t = arguments[0], e = 0; e < this.geometries.length; e++) this.geometries[e].apply(t);
                else if (w(arguments[0], ct)) {
                    var n = arguments[0];
                    if (0 === this.geometries.length) return null;
                    for (var e = 0; e < this.geometries.length && (this.geometries[e].apply(n), !n.isDone()); e++);
                    n.isGeometryChanged() && this.geometryChanged()
                } else if (w(arguments[0], ht)) {
                    var i = arguments[0];
                    i.filter(this);
                    for (var e = 0; e < this.geometries.length; e++) this.geometries[e].apply(i)
                } else if (w(arguments[0], G)) {
                    var r = arguments[0];
                    r.filter(this);
                    for (var e = 0; e < this.geometries.length; e++) this.geometries[e].apply(r)
                }
            },
            getBoundary: function() {
                return this.checkNotGeometryCollection(this), f.shouldNeverReachHere(), null
            },
            clone: function() {
                var t = B.prototype.clone.call(this);
                t.geometries = new Array(this.geometries.length).fill(null);
                for (var e = 0; e < this.geometries.length; e++) t.geometries[e] = this.geometries[e].clone();
                return t
            },
            getGeometryType: function() {
                return "GeometryCollection"
            },
            copy: function() {
                for (var t = new Array(this.geometries.length).fill(null), e = 0; e < t.length; e++) t[e] = this.geometries[e].copy();
                return new ft(t, this.factory)
            },
            isEmpty: function() {
                for (var t = 0; t < this.geometries.length; t++)
                    if (!this.geometries[t].isEmpty()) return !1;
                return !0
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return ft
            }
        }), ft.serialVersionUID = -0x4f07bcb1f857d800, h(gt, ft), e(gt.prototype, {
            getSortIndex: function() {
                return B.SORTINDEX_MULTILINESTRING
            },
            equalsExact: function() {
                if (2 === arguments.length) {
                    var t = arguments[0],
                        e = arguments[1];
                    return !!this.isEquivalentClass(t) && ft.prototype.equalsExact.call(this, t, e)
                }
                return ft.prototype.equalsExact.apply(this, arguments)
            },
            getBoundaryDimension: function() {
                return this.isClosed() ? lt.FALSE : 0
            },
            isClosed: function() {
                if (this.isEmpty()) return !1;
                for (var t = 0; t < this.geometries.length; t++)
                    if (!this.geometries[t].isClosed()) return !1;
                return !0
            },
            getDimension: function() {
                return 1
            },
            reverse: function() {
                for (var t = this.geometries.length, e = new Array(t).fill(null), n = 0; n < this.geometries.length; n++) e[t - 1 - n] = this.geometries[n].reverse();
                return this.getFactory().createMultiLineString(e)
            },
            getBoundary: function() {
                return new dt(this).getBoundary()
            },
            getGeometryType: function() {
                return "MultiLineString"
            },
            copy: function() {
                for (var t = new Array(this.geometries.length).fill(null), e = 0; e < t.length; e++) t[e] = this.geometries[e].copy();
                return new gt(t, this.factory)
            },
            interfaces_: function() {
                return [st]
            },
            getClass: function() {
                return gt
            }
        }), gt.serialVersionUID = 0x7155d2ab4afa8000, e(dt.prototype, {
            boundaryMultiLineString: function(t) {
                if (this.geom.isEmpty()) return this.getEmptyMultiPoint();
                var e = this.computeBoundaryCoordinates(t);
                return 1 === e.length ? this.geomFact.createPoint(e[0]) : this.geomFact.createMultiPointFromCoords(e)
            },
            getBoundary: function() {
                return this.geom instanceof Lt ? this.boundaryLineString(this.geom) : this.geom instanceof gt ? this.boundaryMultiLineString(this.geom) : this.geom.getBoundary()
            },
            boundaryLineString: function(t) {
                if (this.geom.isEmpty()) return this.getEmptyMultiPoint();
                if (t.isClosed()) {
                    return this.bnRule.isInBoundary(2) ? t.getStartPoint() : this.geomFact.createMultiPoint()
                }
                return this.geomFact.createMultiPoint([t.getStartPoint(), t.getEndPoint()])
            },
            getEmptyMultiPoint: function() {
                return this.geomFact.createMultiPoint()
            },
            computeBoundaryCoordinates: function(t) {
                var e = new I;
                this.endpointMap = new rt;
                for (var n = 0; n < t.getNumGeometries(); n++) {
                    var i = t.getGeometryN(n);
                    0 !== i.getNumPoints() && (this.addEndpoint(i.getCoordinateN(0)), this.addEndpoint(i.getCoordinateN(i.getNumPoints() - 1)))
                }
                for (var r = this.endpointMap.entrySet().iterator(); r.hasNext();) {
                    var s = r.next(),
                        o = s.getValue(),
                        a = o.count;
                    this.bnRule.isInBoundary(a) && e.add(s.getKey())
                }
                return H.toCoordinateArray(e)
            },
            addEndpoint: function(t) {
                var e = this.endpointMap.get(t);
                null === e && (e = new pt, this.endpointMap.put(t, e)), e.count++
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return dt
            }
        }), dt.getBoundary = function() {
            if (1 === arguments.length) {
                var t = arguments[0],
                    e = new dt(t);
                return e.getBoundary()
            }
            if (2 === arguments.length) {
                var n = arguments[0],
                    i = arguments[1],
                    e = new dt(n, i);
                return e.getBoundary()
            }
        }, e(pt.prototype, {
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return pt
            }
        }), e(Nt.prototype, {
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Nt
            }
        }), Nt.chars = function(t, e) {
            for (var n = new Array(e).fill(null), i = 0; i < e; i++) n[i] = t;
            return new String(n)
        }, Nt.getStackTrace = function() {
            if (1 === arguments.length) {
                var t = arguments[0],
                    e = new Et,
                    n = new mt(e);
                return t.printStackTrace(n), e.toString()
            }
            if (2 === arguments.length) {
                for (var i = arguments[0], r = arguments[1], s = "", o = new vt(Nt.getStackTrace(i)), a = new It(o), u = 0; u < r; u++) try {
                    s += a.readLine() + Nt.NEWLINE
                } catch (t) {
                    if (!(t instanceof xt)) throw t;
                    f.shouldNeverReachHere()
                }
                return s
            }
        }, Nt.split = function(t, e) {
            for (var n = e.length, i = new I, r = "" + t, s = r.indexOf(e); s >= 0;) {
                var o = r.substring(0, s);
                i.add(o), r = r.substring(s + n), s = r.indexOf(e)
            }
            r.length > 0 && i.add(r);
            for (var a = new Array(i.size()).fill(null), u = 0; u < a.length; u++) a[u] = i.get(u);
            return a
        }, Nt.toString = function() {
            if (1 === arguments.length) {
                var t = arguments[0];
                return Nt.SIMPLE_ORDINATE_FORMAT.format(t)
            }
        }, Nt.spaces = function(t) {
            return Nt.chars(" ", t)
        }, Nt.NEWLINE = A.getProperty("line.separator"), Nt.SIMPLE_ORDINATE_FORMAT = new yt("0.#"), e(Ct.prototype, {
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Ct
            }
        }), Ct.copyCoord = function(t, e, n, i) {
            for (var r = Math.min(t.getDimension(), n.getDimension()), s = 0; s < r; s++) n.setOrdinate(i, s, t.getOrdinate(e, s))
        }, Ct.isRing = function(t) {
            var e = t.size();
            return 0 === e || !(e <= 3) && t.getOrdinate(0, D.X) === t.getOrdinate(e - 1, D.X) && t.getOrdinate(0, D.Y) === t.getOrdinate(e - 1, D.Y)
        }, Ct.isEqual = function(t, e) {
            var n = t.size();
            if (n !== e.size()) return !1;
            for (var i = Math.min(t.getDimension(), e.getDimension()), s = 0; s < n; s++)
                for (var o = 0; o < i; o++) {
                    var a = t.getOrdinate(s, o),
                        u = e.getOrdinate(s, o);
                    if (!(t.getOrdinate(s, o) === e.getOrdinate(s, o) || r.isNaN(a) && r.isNaN(u))) return !1
                }
            return !0
        }, Ct.extend = function(t, e, n) {
            var i = t.create(n, e.getDimension()),
                r = e.size();
            if (Ct.copy(e, 0, i, 0, r), r > 0)
                for (var s = r; s < n; s++) Ct.copy(e, r - 1, i, s, 1);
            return i
        }, Ct.reverse = function(t) {
            for (var e = t.size() - 1, n = Math.trunc(e / 2), i = 0; i <= n; i++) Ct.swap(t, i, e - i)
        }, Ct.swap = function(t, e, n) {
            if (e === n) return null;
            for (var i = 0; i < t.getDimension(); i++) {
                var r = t.getOrdinate(e, i);
                t.setOrdinate(e, i, t.getOrdinate(n, i)), t.setOrdinate(n, i, r)
            }
        }, Ct.copy = function(t, e, n, i, r) {
            for (var s = 0; s < r; s++) Ct.copyCoord(t, e + s, n, i + s)
        }, Ct.toString = function() {
            if (1 === arguments.length) {
                var t = arguments[0],
                    e = t.size();
                if (0 === e) return "()";
                var n = t.getDimension(),
                    i = new R;
                i.append("(");
                for (var r = 0; r < e; r++) {
                    r > 0 && i.append(" ");
                    for (var s = 0; s < n; s++) s > 0 && i.append(","), i.append(Nt.toString(t.getOrdinate(r, s)))
                }
                return i.append(")"), i.toString()
            }
        }, Ct.ensureValidRing = function(t, e) {
            var n = e.size();
            return 0 === n ? e : n <= 3 ? Ct.createClosedRing(t, e, 4) : e.getOrdinate(0, D.X) === e.getOrdinate(n - 1, D.X) && e.getOrdinate(0, D.Y) === e.getOrdinate(n - 1, D.Y) ? e : Ct.createClosedRing(t, e, n + 1)
        }, Ct.createClosedRing = function(t, e, n) {
            var i = t.create(n, e.getDimension()),
                r = e.size();
            Ct.copy(e, 0, i, 0, r);
            for (var s = r; s < n; s++) Ct.copy(e, 0, i, s, 1);
            return i
        }, h(Lt, B), e(Lt.prototype, {
            computeEnvelopeInternal: function() {
                return this.isEmpty() ? new C : this.points.expandEnvelope(new C)
            },
            isRing: function() {
                return this.isClosed() && this.isSimple()
            },
            getSortIndex: function() {
                return B.SORTINDEX_LINESTRING
            },
            getCoordinates: function() {
                return this.points.toCoordinateArray()
            },
            equalsExact: function() {
                if (2 === arguments.length) {
                    var t = arguments[0],
                        e = arguments[1];
                    if (!this.isEquivalentClass(t)) return !1;
                    var n = t;
                    if (this.points.size() !== n.points.size()) return !1;
                    for (var i = 0; i < this.points.size(); i++)
                        if (!this.equal(this.points.getCoordinate(i), n.points.getCoordinate(i), e)) return !1;
                    return !0
                }
                return B.prototype.equalsExact.apply(this, arguments)
            },
            normalize: function() {
                for (var t = 0; t < Math.trunc(this.points.size() / 2); t++) {
                    var e = this.points.size() - 1 - t;
                    if (!this.points.getCoordinate(t).equals(this.points.getCoordinate(e))) return this.points.getCoordinate(t).compareTo(this.points.getCoordinate(e)) > 0 && Ct.reverse(this.points), null
                }
            },
            getCoordinate: function() {
                return this.isEmpty() ? null : this.points.getCoordinate(0)
            },
            getBoundaryDimension: function() {
                return this.isClosed() ? lt.FALSE : 0
            },
            isClosed: function() {
                return !this.isEmpty() && this.getCoordinateN(0).equals2D(this.getCoordinateN(this.getNumPoints() - 1))
            },
            getEndPoint: function() {
                return this.isEmpty() ? null : this.getPointN(this.getNumPoints() - 1)
            },
            getDimension: function() {
                return 1
            },
            getLength: function() {
                return le.computeLength(this.points)
            },
            getNumPoints: function() {
                return this.points.size()
            },
            reverse: function() {
                var t = this.points.copy();
                return Ct.reverse(t), this.getFactory().createLineString(t)
            },
            compareToSameClass: function() {
                if (1 === arguments.length) {
                    for (var t = arguments[0], e = t, n = 0, i = 0; n < this.points.size() && i < e.points.size();) {
                        var r = this.points.getCoordinate(n).compareTo(e.points.getCoordinate(i));
                        if (0 !== r) return r;
                        n++, i++
                    }
                    return n < this.points.size() ? 1 : i < e.points.size() ? -1 : 0
                }
                if (2 === arguments.length) {
                    var s = arguments[0],
                        o = arguments[1],
                        e = s;
                    return o.compare(this.points, e.points)
                }
            },
            apply: function() {
                if (w(arguments[0], q))
                    for (var t = arguments[0], e = 0; e < this.points.size(); e++) t.filter(this.points.getCoordinate(e));
                else if (w(arguments[0], ct)) {
                    var n = arguments[0];
                    if (0 === this.points.size()) return null;
                    for (var e = 0; e < this.points.size() && (n.filter(this.points, e), !n.isDone()); e++);
                    n.isGeometryChanged() && this.geometryChanged()
                } else if (w(arguments[0], ht)) {
                    var i = arguments[0];
                    i.filter(this)
                } else if (w(arguments[0], G)) {
                    var r = arguments[0];
                    r.filter(this)
                }
            },
            getBoundary: function() {
                return new dt(this).getBoundary()
            },
            isEquivalentClass: function(t) {
                return t instanceof Lt
            },
            clone: function() {
                var t = B.prototype.clone.call(this);
                return t.points = this.points.clone(), t
            },
            getCoordinateN: function(t) {
                return this.points.getCoordinate(t)
            },
            getGeometryType: function() {
                return "LineString"
            },
            copy: function() {
                return new Lt(this.points.copy(), this.factory)
            },
            getCoordinateSequence: function() {
                return this.points
            },
            isEmpty: function() {
                return 0 === this.points.size()
            },
            init: function(t) {
                if (null === t && (t = this.getFactory().getCoordinateSequenceFactory().create([])), 1 === t.size()) throw new i("Invalid number of points in LineString (found " + t.size() + " - must be 0 or >= 2)");
                this.points = t
            },
            isCoordinate: function(t) {
                for (var e = 0; e < this.points.size(); e++)
                    if (this.points.getCoordinate(e).equals(t)) return !0;
                return !1
            },
            getStartPoint: function() {
                return this.isEmpty() ? null : this.getPointN(0)
            },
            getPointN: function(t) {
                return this.getFactory().createPoint(this.points.getCoordinate(t))
            },
            interfaces_: function() {
                return [st]
            },
            getClass: function() {
                return Lt
            }
        }), Lt.serialVersionUID = 0x2b2b51ba435c8e00, e(_t.prototype, {
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return _t
            }
        }), h(St, B), e(St.prototype, {
            computeEnvelopeInternal: function() {
                if (this.isEmpty()) return new C;
                var t = new C;
                return t.expandToInclude(this.coordinates.getX(0), this.coordinates.getY(0)), t
            },
            getSortIndex: function() {
                return B.SORTINDEX_POINT
            },
            getCoordinates: function() {
                return this.isEmpty() ? [] : [this.getCoordinate()]
            },
            equalsExact: function() {
                if (2 === arguments.length) {
                    var t = arguments[0],
                        e = arguments[1];
                    return !!this.isEquivalentClass(t) && (!(!this.isEmpty() || !t.isEmpty()) || this.isEmpty() === t.isEmpty() && this.equal(t.getCoordinate(), this.getCoordinate(), e))
                }
                return B.prototype.equalsExact.apply(this, arguments)
            },
            normalize: function() {},
            getCoordinate: function() {
                return 0 !== this.coordinates.size() ? this.coordinates.getCoordinate(0) : null
            },
            getBoundaryDimension: function() {
                return lt.FALSE
            },
            getDimension: function() {
                return 0
            },
            getNumPoints: function() {
                return this.isEmpty() ? 0 : 1
            },
            reverse: function() {
                return this.copy()
            },
            getX: function() {
                if (null === this.getCoordinate()) throw new IllegalStateException("getX called on empty Point");
                return this.getCoordinate().x
            },
            compareToSameClass: function() {
                if (1 === arguments.length) {
                    var t = arguments[0],
                        e = t;
                    return this.getCoordinate().compareTo(e.getCoordinate())
                }
                if (2 === arguments.length) {
                    var n = arguments[0],
                        i = arguments[1],
                        e = n;
                    return i.compare(this.coordinates, e.coordinates)
                }
            },
            apply: function() {
                if (w(arguments[0], q)) {
                    var t = arguments[0];
                    if (this.isEmpty()) return null;
                    t.filter(this.getCoordinate())
                } else if (w(arguments[0], ct)) {
                    var e = arguments[0];
                    if (this.isEmpty()) return null;
                    e.filter(this.coordinates, 0), e.isGeometryChanged() && this.geometryChanged()
                } else if (w(arguments[0], ht)) {
                    var n = arguments[0];
                    n.filter(this)
                } else if (w(arguments[0], G)) {
                    var i = arguments[0];
                    i.filter(this)
                }
            },
            getBoundary: function() {
                return this.getFactory().createGeometryCollection(null)
            },
            clone: function() {
                var t = B.prototype.clone.call(this);
                return t.coordinates = this.coordinates.clone(), t
            },
            getGeometryType: function() {
                return "Point"
            },
            copy: function() {
                return new St(this.coordinates.copy(), this.factory)
            },
            getCoordinateSequence: function() {
                return this.coordinates
            },
            getY: function() {
                if (null === this.getCoordinate()) throw new IllegalStateException("getY called on empty Point");
                return this.getCoordinate().y
            },
            isEmpty: function() {
                return 0 === this.coordinates.size()
            },
            init: function(t) {
                null === t && (t = this.getFactory().getCoordinateSequenceFactory().create([])), f.isTrue(t.size() <= 1), this.coordinates = t
            },
            isSimple: function() {
                return !0
            },
            interfaces_: function() {
                return [_t]
            },
            getClass: function() {
                return St
            }
        }), St.serialVersionUID = 0x44077bad161cbc00, e(wt.prototype, {
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return wt
            }
        }), h(bt, B), e(bt.prototype, {
            computeEnvelopeInternal: function() {
                return this.shell.getEnvelopeInternal()
            },
            getSortIndex: function() {
                return B.SORTINDEX_POLYGON
            },
            getCoordinates: function() {
                if (this.isEmpty()) return [];
                for (var t = new Array(this.getNumPoints()).fill(null), e = -1, n = this.shell.getCoordinates(), i = 0; i < n.length; i++) e++, t[e] = n[i];
                for (var r = 0; r < this.holes.length; r++)
                    for (var s = this.holes[r].getCoordinates(), o = 0; o < s.length; o++) e++, t[e] = s[o];
                return t
            },
            getArea: function() {
                var t = 0;
                t += Math.abs(le.signedArea(this.shell.getCoordinateSequence()));
                for (var e = 0; e < this.holes.length; e++) t -= Math.abs(le.signedArea(this.holes[e].getCoordinateSequence()));
                return t
            },
            isRectangle: function() {
                if (0 !== this.getNumInteriorRing()) return !1;
                if (null === this.shell) return !1;
                if (5 !== this.shell.getNumPoints()) return !1;
                for (var t = this.shell.getCoordinateSequence(), e = this.getEnvelopeInternal(), n = 0; n < 5; n++) {
                    var i = t.getX(n);
                    if (i !== e.getMinX() && i !== e.getMaxX()) return !1;
                    var r = t.getY(n);
                    if (r !== e.getMinY() && r !== e.getMaxY()) return !1
                }
                for (var s = t.getX(0), o = t.getY(0), n = 1; n <= 4; n++) {
                    var i = t.getX(n),
                        r = t.getY(n);
                    if (i !== s === (r !== o)) return !1;
                    s = i, o = r
                }
                return !0
            },
            equalsExact: function() {
                if (2 === arguments.length) {
                    var t = arguments[0],
                        e = arguments[1];
                    if (!this.isEquivalentClass(t)) return !1;
                    var n = t,
                        i = this.shell,
                        r = n.shell;
                    if (!i.equalsExact(r, e)) return !1;
                    if (this.holes.length !== n.holes.length) return !1;
                    for (var s = 0; s < this.holes.length; s++)
                        if (!this.holes[s].equalsExact(n.holes[s], e)) return !1;
                    return !0
                }
                return B.prototype.equalsExact.apply(this, arguments)
            },
            normalize: function() {
                if (0 === arguments.length) {
                    this.normalize(this.shell, !0);
                    for (var t = 0; t < this.holes.length; t++) this.normalize(this.holes[t], !1);
                    ut.sort(this.holes)
                } else if (2 === arguments.length) {
                    var e = arguments[0],
                        n = arguments[1];
                    if (e.isEmpty()) return null;
                    var i = new Array(e.getCoordinates().length - 1).fill(null);
                    A.arraycopy(e.getCoordinates(), 0, i, 0, i.length);
                    var r = H.minCoordinate(e.getCoordinates());
                    H.scroll(i, r), A.arraycopy(i, 0, e.getCoordinates(), 0, i.length), e.getCoordinates()[i.length] = i[0], le.isCCW(e.getCoordinates()) === n && H.reverse(e.getCoordinates())
                }
            },
            getCoordinate: function() {
                return this.shell.getCoordinate()
            },
            getNumInteriorRing: function() {
                return this.holes.length
            },
            getBoundaryDimension: function() {
                return 1
            },
            getDimension: function() {
                return 2
            },
            getLength: function() {
                var t = 0;
                t += this.shell.getLength();
                for (var e = 0; e < this.holes.length; e++) t += this.holes[e].getLength();
                return t
            },
            getNumPoints: function() {
                for (var t = this.shell.getNumPoints(), e = 0; e < this.holes.length; e++) t += this.holes[e].getNumPoints();
                return t
            },
            reverse: function() {
                var t = this.copy();
                t.shell = this.shell.copy().reverse(), t.holes = new Array(this.holes.length).fill(null);
                for (var e = 0; e < this.holes.length; e++) t.holes[e] = this.holes[e].copy().reverse();
                return t
            },
            convexHull: function() {
                return this.getExteriorRing().convexHull()
            },
            compareToSameClass: function() {
                if (1 === arguments.length) {
                    var t = arguments[0],
                        e = this.shell,
                        n = t.shell;
                    return e.compareToSameClass(n)
                }
                if (2 === arguments.length) {
                    var i = arguments[0],
                        r = arguments[1],
                        s = i,
                        e = this.shell,
                        n = s.shell,
                        o = e.compareToSameClass(n, r);
                    if (0 !== o) return o;
                    for (var a = this.getNumInteriorRing(), u = s.getNumInteriorRing(), l = 0; l < a && l < u;) {
                        var h = this.getInteriorRingN(l),
                            c = s.getInteriorRingN(l),
                            f = h.compareToSameClass(c, r);
                        if (0 !== f) return f;
                        l++
                    }
                    return l < a ? 1 : l < u ? -1 : 0
                }
            },
            apply: function() {
                if (w(arguments[0], q)) {
                    var t = arguments[0];
                    this.shell.apply(t);
                    for (var e = 0; e < this.holes.length; e++) this.holes[e].apply(t)
                } else if (w(arguments[0], ct)) {
                    var n = arguments[0];
                    if (this.shell.apply(n), !n.isDone())
                        for (var e = 0; e < this.holes.length && (this.holes[e].apply(n), !n.isDone()); e++);
                    n.isGeometryChanged() && this.geometryChanged()
                } else if (w(arguments[0], ht)) {
                    var i = arguments[0];
                    i.filter(this)
                } else if (w(arguments[0], G)) {
                    var r = arguments[0];
                    r.filter(this), this.shell.apply(r);
                    for (var e = 0; e < this.holes.length; e++) this.holes[e].apply(r)
                }
            },
            getBoundary: function() {
                if (this.isEmpty()) return this.getFactory().createMultiLineString();
                var t = new Array(this.holes.length + 1).fill(null);
                t[0] = this.shell;
                for (var e = 0; e < this.holes.length; e++) t[e + 1] = this.holes[e];
                return t.length <= 1 ? this.getFactory().createLinearRing(t[0].getCoordinateSequence()) : this.getFactory().createMultiLineString(t)
            },
            clone: function() {
                var t = B.prototype.clone.call(this);
                t.shell = this.shell.clone(), t.holes = new Array(this.holes.length).fill(null);
                for (var e = 0; e < this.holes.length; e++) t.holes[e] = this.holes[e].clone();
                return t
            },
            getGeometryType: function() {
                return "Polygon"
            },
            copy: function() {
                for (var t = this.shell.copy(), e = new Array(this.holes.length).fill(null), n = 0; n < e.length; n++) e[n] = this.holes[n].copy();
                return new bt(t, e, this.factory)
            },
            getExteriorRing: function() {
                return this.shell
            },
            isEmpty: function() {
                return this.shell.isEmpty()
            },
            getInteriorRingN: function(t) {
                return this.holes[t]
            },
            interfaces_: function() {
                return [wt]
            },
            getClass: function() {
                return bt
            }
        }), bt.serialVersionUID = -0x307ffefd8dc97200, h(Rt, ft), e(Rt.prototype, {
            getSortIndex: function() {
                return B.SORTINDEX_MULTIPOINT
            },
            isValid: function() {
                return !0
            },
            equalsExact: function() {
                if (2 === arguments.length) {
                    var t = arguments[0],
                        e = arguments[1];
                    return !!this.isEquivalentClass(t) && ft.prototype.equalsExact.call(this, t, e)
                }
                return ft.prototype.equalsExact.apply(this, arguments)
            },
            getCoordinate: function() {
                if (1 === arguments.length) {
                    var t = arguments[0];
                    return this.geometries[t].getCoordinate()
                }
                return ft.prototype.getCoordinate.apply(this, arguments)
            },
            getBoundaryDimension: function() {
                return lt.FALSE
            },
            getDimension: function() {
                return 0
            },
            getBoundary: function() {
                return this.getFactory().createGeometryCollection(null)
            },
            getGeometryType: function() {
                return "MultiPoint"
            },
            copy: function() {
                for (var t = new Array(this.geometries.length).fill(null), e = 0; e < t.length; e++) t[e] = this.geometries[e].copy();
                return new Rt(t, this.factory)
            },
            interfaces_: function() {
                return [_t]
            },
            getClass: function() {
                return Rt
            }
        }), Rt.serialVersionUID = -0x6fb1ed4162e0fc00, h(Mt, Lt), e(Mt.prototype, {
            getSortIndex: function() {
                return B.SORTINDEX_LINEARRING
            },
            getBoundaryDimension: function() {
                return lt.FALSE
            },
            isClosed: function() {
                return !!this.isEmpty() || Lt.prototype.isClosed.call(this)
            },
            reverse: function() {
                var t = this.points.copy();
                return Ct.reverse(t), this.getFactory().createLinearRing(t)
            },
            validateConstruction: function() {
                if (!this.isEmpty() && !Lt.prototype.isClosed.call(this)) throw new i("Points of LinearRing do not form a closed linestring");
                if (this.getCoordinateSequence().size() >= 1 && this.getCoordinateSequence().size() < Mt.MINIMUM_VALID_SIZE) throw new i("Invalid number of points in LinearRing (found " + this.getCoordinateSequence().size() + " - must be 0 or >= 4)")
            },
            getGeometryType: function() {
                return "LinearRing"
            },
            copy: function() {
                return new Mt(this.points.copy(), this.factory)
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Mt
            }
        }), Mt.MINIMUM_VALID_SIZE = 4, Mt.serialVersionUID = -0x3b229e262367a600, h(Tt, ft), e(Tt.prototype, {
            getSortIndex: function() {
                return B.SORTINDEX_MULTIPOLYGON
            },
            equalsExact: function() {
                if (2 === arguments.length) {
                    var t = arguments[0],
                        e = arguments[1];
                    return !!this.isEquivalentClass(t) && ft.prototype.equalsExact.call(this, t, e)
                }
                return ft.prototype.equalsExact.apply(this, arguments)
            },
            getBoundaryDimension: function() {
                return 1
            },
            getDimension: function() {
                return 2
            },
            reverse: function() {
                for (var t = this.geometries.length, e = new Array(t).fill(null), n = 0; n < this.geometries.length; n++) e[n] = this.geometries[n].reverse();
                return this.getFactory().createMultiPolygon(e)
            },
            getBoundary: function() {
                if (this.isEmpty()) return this.getFactory().createMultiLineString();
                for (var t = new I, e = 0; e < this.geometries.length; e++)
                    for (var n = this.geometries[e], i = n.getBoundary(), r = 0; r < i.getNumGeometries(); r++) t.add(i.getGeometryN(r));
                var s = new Array(t.size()).fill(null);
                return this.getFactory().createMultiLineString(t.toArray(s))
            },
            getGeometryType: function() {
                return "MultiPolygon"
            },
            copy: function() {
                for (var t = new Array(this.geometries.length).fill(null), e = 0; e < t.length; e++) t[e] = this.geometries[e].copy();
                return new Tt(t, this.factory)
            },
            interfaces_: function() {
                return [wt]
            },
            getClass: function() {
                return Tt
            }
        }), Tt.serialVersionUID = -0x7a5aa1369171980, e(Pt.prototype, {
            setCopyUserData: function(t) {
                this.isUserDataCopied = t
            },
            edit: function(t, e) {
                if (null === t) return null;
                var n = this.editInternal(t, e);
                return this.isUserDataCopied && n.setUserData(t.getUserData()), n
            },
            editInternal: function(t, e) {
                return null === this.factory && (this.factory = t.getFactory()), t instanceof ft ? this.editGeometryCollection(t, e) : t instanceof bt ? this.editPolygon(t, e) : t instanceof St ? e.edit(t, this.factory) : t instanceof Lt ? e.edit(t, this.factory) : (f.shouldNeverReachHere("Unsupported Geometry class: " + t.getClass().getName()), null)
            },
            editGeometryCollection: function(t, e) {
                for (var n = e.edit(t, this.factory), i = new I, r = 0; r < n.getNumGeometries(); r++) {
                    var s = this.edit(n.getGeometryN(r), e);
                    null === s || s.isEmpty() || i.add(s)
                }
                return n.getClass() === Rt ? this.factory.createMultiPoint(i.toArray([])) : n.getClass() === gt ? this.factory.createMultiLineString(i.toArray([])) : n.getClass() === Tt ? this.factory.createMultiPolygon(i.toArray([])) : this.factory.createGeometryCollection(i.toArray([]))
            },
            editPolygon: function(t, e) {
                var n = e.edit(t, this.factory);
                if (null === n && (n = this.factory.createPolygon(null)), n.isEmpty()) return n;
                var i = this.edit(n.getExteriorRing(), e);
                if (null === i || i.isEmpty()) return this.factory.createPolygon();
                for (var r = new I, s = 0; s < n.getNumInteriorRing(); s++) {
                    var o = this.edit(n.getInteriorRingN(s), e);
                    null === o || o.isEmpty() || r.add(o)
                }
                return this.factory.createPolygon(i, r.toArray([]))
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Pt
            }
        }), Pt.GeometryEditorOperation = Ot, e(Dt.prototype, {
            edit: function(t, e) {
                return t
            },
            interfaces_: function() {
                return [Ot]
            },
            getClass: function() {
                return Dt
            }
        }), e(At.prototype, {
            edit: function(t, e) {
                var n = this.editCoordinates(t.getCoordinates(), t);
                return null === n ? t : t instanceof Mt ? e.createLinearRing(n) : t instanceof Lt ? e.createLineString(n) : t instanceof St ? n.length > 0 ? e.createPoint(n[0]) : e.createPoint() : t
            },
            interfaces_: function() {
                return [Ot]
            },
            getClass: function() {
                return At
            }
        }), e(Ft.prototype, {
            edit: function(t, e) {
                return t instanceof Mt ? e.createLinearRing(this.edit(t.getCoordinateSequence(), t)) : t instanceof Lt ? e.createLineString(this.edit(t.getCoordinateSequence(), t)) : t instanceof St ? e.createPoint(this.edit(t.getCoordinateSequence(), t)) : t
            },
            interfaces_: function() {
                return [Ot]
            },
            getClass: function() {
                return Ft
            }
        }), Pt.NoOpGeometryOperation = Dt, Pt.CoordinateOperation = At, Pt.CoordinateSequenceOperation = Ft, e(kt.prototype, {
            setOrdinate: function(t, e, n) {
                switch (e) {
                    case D.X:
                        this.coordinates[t].x = n;
                        break;
                    case D.Y:
                        this.coordinates[t].y = n;
                        break;
                    case D.Z:
                        this.coordinates[t].z = n;
                        break;
                    default:
                        throw new i("invalid ordinateIndex")
                }
            },
            size: function() {
                return this.coordinates.length
            },
            getOrdinate: function(t, e) {
                switch (e) {
                    case D.X:
                        return this.coordinates[t].x;
                    case D.Y:
                        return this.coordinates[t].y;
                    case D.Z:
                        return this.coordinates[t].z
                }
                return r.NaN
            },
            getCoordinate: function() {
                if (1 === arguments.length) {
                    var t = arguments[0];
                    return this.coordinates[t]
                }
                if (2 === arguments.length) {
                    var e = arguments[0],
                        n = arguments[1];
                    n.x = this.coordinates[e].x, n.y = this.coordinates[e].y, n.z = this.coordinates[e].z
                }
            },
            getCoordinateCopy: function(t) {
                return new g(this.coordinates[t])
            },
            getDimension: function() {
                return this.dimension
            },
            getX: function(t) {
                return this.coordinates[t].x
            },
            clone: function() {
                for (var t = new Array(this.size()).fill(null), e = 0; e < this.coordinates.length; e++) t[e] = this.coordinates[e].clone();
                return new kt(t, this.dimension)
            },
            expandEnvelope: function(t) {
                for (var e = 0; e < this.coordinates.length; e++) t.expandToInclude(this.coordinates[e]);
                return t
            },
            copy: function() {
                for (var t = new Array(this.size()).fill(null), e = 0; e < this.coordinates.length; e++) t[e] = this.coordinates[e].copy();
                return new kt(t, this.dimension)
            },
            toString: function() {
                if (this.coordinates.length > 0) {
                    var t = new R(17 * this.coordinates.length);
                    t.append("("), t.append(this.coordinates[0]);
                    for (var e = 1; e < this.coordinates.length; e++) t.append(", "), t.append(this.coordinates[e]);
                    return t.append(")"), t.toString()
                }
                return "()"
            },
            getY: function(t) {
                return this.coordinates[t].y
            },
            toCoordinateArray: function() {
                return this.coordinates
            },
            interfaces_: function() {
                return [D, u]
            },
            getClass: function() {
                return kt
            }
        }), kt.serialVersionUID = -0xcb44a778db18e00, e(Gt.prototype, {
            readResolve: function() {
                return Gt.instance()
            },
            create: function() {
                if (1 === arguments.length) {
                    if (arguments[0] instanceof Array) {
                        return new kt(arguments[0])
                    }
                    if (w(arguments[0], D)) {
                        return new kt(arguments[0])
                    }
                } else if (2 === arguments.length) {
                    var t = arguments[0],
                        e = arguments[1];
                    return e > 3 && (e = 3), e < 2 ? new kt(t) : new kt(t, e)
                }
            },
            interfaces_: function() {
                return [k, u]
            },
            getClass: function() {
                return Gt
            }
        }), Gt.instance = function() {
            return Gt.instanceObject
        }, Gt.serialVersionUID = -0x38e49fa6cf6f2e00, Gt.instanceObject = new Gt;
        var to, eo = Object.defineProperty,
            no = function(t, e) {
                function n(t) {
                    return this && this.constructor === n ? (this._keys = [], this._values = [], this._itp = [], this.objectOnly = e, void(t && qt.call(this, t))) : new n(t)
                }
                return e || eo(t, "size", {
                    get: Zt
                }), t.constructor = n, n.prototype = t, n
            }({
                delete: zt,
                has: Yt,
                get: Vt,
                set: Xt,
                keys: jt,
                values: Wt,
                entries: Kt,
                forEach: Qt,
                clear: Ht
            }),
            io = "undefined" != typeof Map && Map.prototype.values ? Map : no;
        $t.prototype = new K, $t.prototype.get = function(t) {
            return this.map_.get(t) || null
        }, $t.prototype.put = function(t, e) {
            return this.map_.set(t, e), e
        }, $t.prototype.values = function() {
            for (var t = new I, e = this.map_.values(), n = e.next(); !n.done;) t.add(n.value), n = e.next();
            return t
        }, $t.prototype.entrySet = function() {
            var t = new Q;
            return this.map_.entries().forEach(function(e) {
                return t.add(e)
            }), t
        }, $t.prototype.size = function() {
            return this.map_.size()
        }, e(te.prototype, {
            equals: function(t) {
                if (!(t instanceof te)) return !1;
                var e = t;
                return this.modelType === e.modelType && this.scale === e.scale
            },
            compareTo: function(t) {
                var e = t,
                    n = this.getMaximumSignificantDigits(),
                    i = e.getMaximumSignificantDigits();
                return new M(n).compareTo(new M(i))
            },
            getScale: function() {
                return this.scale
            },
            isFloating: function() {
                return this.modelType === te.FLOATING || this.modelType === te.FLOATING_SINGLE
            },
            getType: function() {
                return this.modelType
            },
            toString: function() {
                var t = "UNKNOWN";
                return this.modelType === te.FLOATING ? t = "Floating" : this.modelType === te.FLOATING_SINGLE ? t = "Floating-Single" : this.modelType === te.FIXED && (t = "Fixed (Scale=" + this.getScale() + ")"), t
            },
            makePrecise: function() {
                if ("number" == typeof arguments[0]) {
                    var t = arguments[0];
                    if (r.isNaN(t)) return t;
                    if (this.modelType === te.FLOATING_SINGLE) {
                        return t
                    }
                    return this.modelType === te.FIXED ? Math.round(t * this.scale) / this.scale : t
                }
                if (arguments[0] instanceof g) {
                    var e = arguments[0];
                    if (this.modelType === te.FLOATING) return null;
                    e.x = this.makePrecise(e.x), e.y = this.makePrecise(e.y)
                }
            },
            getMaximumSignificantDigits: function() {
                var t = 16;
                return this.modelType === te.FLOATING ? t = 16 : this.modelType === te.FLOATING_SINGLE ? t = 6 : this.modelType === te.FIXED && (t = 1 + Math.trunc(Math.ceil(Math.log(this.getScale()) / Math.log(10)))), t
            },
            setScale: function(t) {
                this.scale = Math.abs(t)
            },
            interfaces_: function() {
                return [u, s]
            },
            getClass: function() {
                return te
            }
        }), te.mostPrecise = function(t, e) {
            return t.compareTo(e) >= 0 ? t : e
        }, e(ee.prototype, {
            readResolve: function() {
                return ee.nameToTypeMap.get(this.name)
            },
            toString: function() {
                return this.name
            },
            interfaces_: function() {
                return [u]
            },
            getClass: function() {
                return ee
            }
        }), ee.serialVersionUID = -552860263173159e4, ee.nameToTypeMap = new $t, te.Type = ee, te.serialVersionUID = 0x6bee6404e9a25c00, te.FIXED = new ee("FIXED"), te.FLOATING = new ee("FLOATING"), te.FLOATING_SINGLE = new ee("FLOATING SINGLE"), te.maximumPreciseValue = 9007199254740992, e(ne.prototype, {
            toGeometry: function(t) {
                return t.isNull() ? this.createPoint(null) : t.getMinX() === t.getMaxX() && t.getMinY() === t.getMaxY() ? this.createPoint(new g(t.getMinX(), t.getMinY())) : t.getMinX() === t.getMaxX() || t.getMinY() === t.getMaxY() ? this.createLineString([new g(t.getMinX(), t.getMinY()), new g(t.getMaxX(), t.getMaxY())]) : this.createPolygon(this.createLinearRing([new g(t.getMinX(), t.getMinY()), new g(t.getMinX(), t.getMaxY()), new g(t.getMaxX(), t.getMaxY()), new g(t.getMaxX(), t.getMinY()), new g(t.getMinX(), t.getMinY())]), null)
            },
            createLineString: function() {
                if (0 === arguments.length) return this.createLineString(this.getCoordinateSequenceFactory().create([]));
                if (1 === arguments.length) {
                    if (arguments[0] instanceof Array) {
                        var t = arguments[0];
                        return this.createLineString(null !== t ? this.getCoordinateSequenceFactory().create(t) : null)
                    }
                    if (w(arguments[0], D)) {
                        return new Lt(arguments[0], this)
                    }
                }
            },
            createMultiLineString: function() {
                if (0 === arguments.length) return new gt(null, this);
                if (1 === arguments.length) {
                    return new gt(arguments[0], this)
                }
            },
            buildGeometry: function(t) {
                for (var e = null, n = !1, i = !1, r = t.iterator(); r.hasNext();) {
                    var s = r.next(),
                        o = s.getClass();
                    null === e && (e = o), o !== e && (n = !0), s.isGeometryCollectionOrDerived() && (i = !0)
                }
                if (null === e) return this.createGeometryCollection();
                if (n || i) return this.createGeometryCollection(ne.toGeometryArray(t));
                var a = t.iterator().next();
                if (t.size() > 1) {
                    if (a instanceof bt) return this.createMultiPolygon(ne.toPolygonArray(t));
                    if (a instanceof Lt) return this.createMultiLineString(ne.toLineStringArray(t));
                    if (a instanceof St) return this.createMultiPoint(ne.toPointArray(t));
                    f.shouldNeverReachHere("Unhandled class: " + a.getClass().getName())
                }
                return a
            },
            createMultiPointFromCoords: function(t) {
                return this.createMultiPoint(null !== t ? this.getCoordinateSequenceFactory().create(t) : null)
            },
            createPoint: function() {
                if (0 === arguments.length) return this.createPoint(this.getCoordinateSequenceFactory().create([]));
                if (1 === arguments.length) {
                    if (arguments[0] instanceof g) {
                        var t = arguments[0];
                        return this.createPoint(null !== t ? this.getCoordinateSequenceFactory().create([t]) : null)
                    }
                    if (w(arguments[0], D)) {
                        return new St(arguments[0], this)
                    }
                }
            },
            getCoordinateSequenceFactory: function() {
                return this.coordinateSequenceFactory
            },
            createPolygon: function() {
                if (0 === arguments.length) return new bt(null, null, this);
                if (1 === arguments.length) {
                    if (w(arguments[0], D)) {
                        var t = arguments[0];
                        return this.createPolygon(this.createLinearRing(t))
                    }
                    if (arguments[0] instanceof Array) {
                        var e = arguments[0];
                        return this.createPolygon(this.createLinearRing(e))
                    }
                    if (arguments[0] instanceof Mt) {
                        var n = arguments[0];
                        return this.createPolygon(n, null)
                    }
                } else if (2 === arguments.length) {
                    var i = arguments[0],
                        r = arguments[1];
                    return new bt(i, r, this)
                }
            },
            getSRID: function() {
                return this.SRID
            },
            createGeometryCollection: function() {
                if (0 === arguments.length) return new ft(null, this);
                if (1 === arguments.length) {
                    return new ft(arguments[0], this)
                }
            },
            createGeometry: function(t) {
                return new Pt(this).edit(t, {
                    edit: function() {
                        if (2 === arguments.length) {
                            var t = arguments[0];
                            return arguments[1], this.coordinateSequenceFactory.create(t)
                        }
                    }
                })
            },
            getPrecisionModel: function() {
                return this.precisionModel
            },
            createLinearRing: function() {
                if (0 === arguments.length) return this.createLinearRing(this.getCoordinateSequenceFactory().create([]));
                if (1 === arguments.length) {
                    if (arguments[0] instanceof Array) {
                        var t = arguments[0];
                        return this.createLinearRing(null !== t ? this.getCoordinateSequenceFactory().create(t) : null)
                    }
                    if (w(arguments[0], D)) {
                        return new Mt(arguments[0], this)
                    }
                }
            },
            createMultiPolygon: function() {
                if (0 === arguments.length) return new Tt(null, this);
                if (1 === arguments.length) {
                    return new Tt(arguments[0], this)
                }
            },
            createMultiPoint: function() {
                if (0 === arguments.length) return new Rt(null, this);
                if (1 === arguments.length) {
                    if (arguments[0] instanceof Array) {
                        return new Rt(arguments[0], this)
                    }
                    if (arguments[0] instanceof Array) {
                        var t = arguments[0];
                        return this.createMultiPoint(null !== t ? this.getCoordinateSequenceFactory().create(t) : null)
                    }
                    if (w(arguments[0], D)) {
                        var e = arguments[0];
                        if (null === e) return this.createMultiPoint(new Array(0).fill(null));
                        for (var n = new Array(e.size()).fill(null), i = 0; i < e.size(); i++) {
                            var r = this.getCoordinateSequenceFactory().create(1, e.getDimension());
                            Ct.copy(e, i, r, 0, 1), n[i] = this.createPoint(r)
                        }
                        return this.createMultiPoint(n)
                    }
                }
            },
            interfaces_: function() {
                return [u]
            },
            getClass: function() {
                return ne
            }
        }), ne.toMultiPolygonArray = function(t) {
            var e = new Array(t.size()).fill(null);
            return t.toArray(e)
        }, ne.toGeometryArray = function(t) {
            if (null === t) return null;
            var e = new Array(t.size()).fill(null);
            return t.toArray(e)
        }, ne.getDefaultCoordinateSequenceFactory = function() {
            return Gt.instance()
        }, ne.toMultiLineStringArray = function(t) {
            var e = new Array(t.size()).fill(null);
            return t.toArray(e)
        }, ne.toLineStringArray = function(t) {
            var e = new Array(t.size()).fill(null);
            return t.toArray(e)
        }, ne.toMultiPointArray = function(t) {
            var e = new Array(t.size()).fill(null);
            return t.toArray(e)
        }, ne.toLinearRingArray = function(t) {
            var e = new Array(t.size()).fill(null);
            return t.toArray(e)
        }, ne.toPointArray = function(t) {
            var e = new Array(t.size()).fill(null);
            return t.toArray(e)
        }, ne.toPolygonArray = function(t) {
            var e = new Array(t.size()).fill(null);
            return t.toArray(e)
        }, ne.createPointFromInternalCoord = function(t, e) {
            return e.getPrecisionModel().makePrecise(t), e.getFactory().createPoint(t)
        }, ne.serialVersionUID = -0x5ea75f2051eeb400;
        var ro = {
            typeStr: /^\s*(\w+)\s*\(\s*(.*)\s*\)\s*$/,
            emptyTypeStr: /^\s*(\w+)\s*EMPTY\s*$/,
            spaces: /\s+/,
            parenComma: /\)\s*,\s*\(/,
            doubleParenComma: /\)\s*\)\s*,\s*\(\s*\(/,
            trimParens: /^\s*\(?(.*?)\)?\s*$/
        };
        e(ie.prototype, {
            read: function(t) {
                var e, n, i;
                t = t.replace(/[\n\r]/g, " ");
                var r = ro.typeStr.exec(t);
                if (-1 !== t.search("EMPTY") && (r = ro.emptyTypeStr.exec(t), r[2] = void 0), r && (n = r[1].toLowerCase(), i = r[2], oo[n] && (e = oo[n].apply(this, [i]))), void 0 === e) throw new Error("Could not parse WKT " + t);
                return e
            },
            write: function(t) {
                return this.extractGeometry(t)
            },
            extractGeometry: function(t) {
                var e = t.getGeometryType().toLowerCase();
                if (!so[e]) return null;
                var n = e.toUpperCase();
                return t.isEmpty() ? n + " EMPTY" : n + "(" + so[e].apply(this, [t]) + ")"
            }
        });
        var so = {
                coordinate: function(t) {
                    return t.x + " " + t.y
                },
                point: function(t) {
                    return so.coordinate.call(this, t.coordinates.coordinates[0])
                },
                multipoint: function(t) {
                    for (var e = [], n = 0, i = t.geometries.length; n < i; ++n) e.push("(" + so.point.apply(this, [t.geometries[n]]) + ")");
                    return e.join(",")
                },
                linestring: function(t) {
                    for (var e = [], n = 0, i = t.points.coordinates.length; n < i; ++n) e.push(so.coordinate.apply(this, [t.points.coordinates[n]]));
                    return e.join(",")
                },
                linearring: function(t) {
                    for (var e = [], n = 0, i = t.points.coordinates.length; n < i; ++n) e.push(so.coordinate.apply(this, [t.points.coordinates[n]]));
                    return e.join(",")
                },
                multilinestring: function(t) {
                    for (var e = [], n = 0, i = t.geometries.length; n < i; ++n) e.push("(" + so.linestring.apply(this, [t.geometries[n]]) + ")");
                    return e.join(",")
                },
                polygon: function(t) {
                    var e = [];
                    e.push("(" + so.linestring.apply(this, [t.shell]) + ")");
                    for (var n = 0, i = t.holes.length; n < i; ++n) e.push("(" + so.linestring.apply(this, [t.holes[n]]) + ")");
                    return e.join(",")
                },
                multipolygon: function(t) {
                    for (var e = [], n = 0, i = t.geometries.length; n < i; ++n) e.push("(" + so.polygon.apply(this, [t.geometries[n]]) + ")");
                    return e.join(",")
                },
                geometrycollection: function(t) {
                    for (var e = [], n = 0, i = t.geometries.length; n < i; ++n) e.push(this.extractGeometry(t.geometries[n]));
                    return e.join(",")
                }
            },
            oo = {
                point: function(t) {
                    if (void 0 === t) return this.geometryFactory.createPoint();
                    var e = t.trim().split(ro.spaces);
                    return this.geometryFactory.createPoint(new g(Number.parseFloat(e[0]), Number.parseFloat(e[1])))
                },
                multipoint: function(t) {
                    if (void 0 === t) return this.geometryFactory.createMultiPoint();
                    for (var e, n = t.trim().split(","), i = [], r = 0, s = n.length; r < s; ++r) e = n[r].replace(ro.trimParens, "$1"), i.push(oo.point.apply(this, [e]));
                    return this.geometryFactory.createMultiPoint(i)
                },
                linestring: function(t) {
                    if (void 0 === t) return this.geometryFactory.createLineString();
                    for (var e, n = t.trim().split(","), i = [], r = 0, s = n.length; r < s; ++r) e = n[r].trim().split(ro.spaces), i.push(new g(Number.parseFloat(e[0]), Number.parseFloat(e[1])));
                    return this.geometryFactory.createLineString(i)
                },
                linearring: function(t) {
                    if (void 0 === t) return this.geometryFactory.createLinearRing();
                    for (var e, n = t.trim().split(","), i = [], r = 0, s = n.length; r < s; ++r) e = n[r].trim().split(ro.spaces), i.push(new g(Number.parseFloat(e[0]), Number.parseFloat(e[1])));
                    return this.geometryFactory.createLinearRing(i)
                },
                multilinestring: function(t) {
                    if (void 0 === t) return this.geometryFactory.createMultiLineString();
                    for (var e, n = t.trim().split(ro.parenComma), i = [], r = 0, s = n.length; r < s; ++r) e = n[r].replace(ro.trimParens, "$1"), i.push(oo.linestring.apply(this, [e]));
                    return this.geometryFactory.createMultiLineString(i)
                },
                polygon: function(t) {
                    if (void 0 === t) return this.geometryFactory.createPolygon();
                    for (var e, n, i, r, s = t.trim().split(ro.parenComma), o = [], a = 0, u = s.length; a < u; ++a) e = s[a].replace(ro.trimParens, "$1"), n = oo.linestring.apply(this, [e]), i = this.geometryFactory.createLinearRing(n.points), 0 === a ? r = i : o.push(i);
                    return this.geometryFactory.createPolygon(r, o)
                },
                multipolygon: function(t) {
                    if (void 0 === t) return this.geometryFactory.createMultiPolygon();
                    for (var e, n = t.trim().split(ro.doubleParenComma), i = [], r = 0, s = n.length; r < s; ++r) e = n[r].replace(ro.trimParens, "$1"), i.push(oo.polygon.apply(this, [e]));
                    return this.geometryFactory.createMultiPolygon(i)
                },
                geometrycollection: function(t) {
                    if (void 0 === t) return this.geometryFactory.createGeometryCollection();
                    t = t.replace(/,\s*([A-Za-z])/g, "|$1");
                    for (var e = t.trim().split("|"), n = [], i = 0, r = e.length; i < r; ++i) n.push(this.read(e[i]));
                    return this.geometryFactory.createGeometryCollection(n)
                }
            };
        e(re.prototype, {
            write: function(t) {
                return this.parser.write(t)
            }
        }), e(re, {
            toLineString: function(t, e) {
                if (2 !== arguments.length) throw new Error("Not implemented");
                return "LINESTRING ( " + t.x + " " + t.y + ", " + e.x + " " + e.y + " )"
            }
        }), e(se.prototype, {
            getIndexAlongSegment: function(t, e) {
                return this.computeIntLineIndex(), this.intLineIndex[t][e]
            },
            getTopologySummary: function() {
                var t = new R;
                return this.isEndPoint() && t.append(" endpoint"), this._isProper && t.append(" proper"), this.isCollinear() && t.append(" collinear"), t.toString()
            },
            computeIntersection: function(t, e, n, i) {
                this.inputLines[0][0] = t, this.inputLines[0][1] = e, this.inputLines[1][0] = n, this.inputLines[1][1] = i, this.result = this.computeIntersect(t, e, n, i)
            },
            getIntersectionNum: function() {
                return this.result
            },
            computeIntLineIndex: function() {
                if (0 === arguments.length) null === this.intLineIndex && (this.intLineIndex = Array(2).fill().map(function() {
                    return Array(2)
                }), this.computeIntLineIndex(0), this.computeIntLineIndex(1));
                else if (1 === arguments.length) {
                    var t = arguments[0],
                        e = this.getEdgeDistance(t, 0),
                        n = this.getEdgeDistance(t, 1);
                    e > n ? (this.intLineIndex[t][0] = 0, this.intLineIndex[t][1] = 1) : (this.intLineIndex[t][0] = 1, this.intLineIndex[t][1] = 0)
                }
            },
            isProper: function() {
                return this.hasIntersection() && this._isProper
            },
            setPrecisionModel: function(t) {
                this.precisionModel = t
            },
            isInteriorIntersection: function() {
                if (0 === arguments.length) return !!this.isInteriorIntersection(0) || !!this.isInteriorIntersection(1);
                if (1 === arguments.length) {
                    for (var t = arguments[0], e = 0; e < this.result; e++)
                        if (!this.intPt[e].equals2D(this.inputLines[t][0]) && !this.intPt[e].equals2D(this.inputLines[t][1])) return !0;
                    return !1
                }
            },
            getIntersection: function(t) {
                return this.intPt[t]
            },
            isEndPoint: function() {
                return this.hasIntersection() && !this._isProper
            },
            hasIntersection: function() {
                return this.result !== se.NO_INTERSECTION
            },
            getEdgeDistance: function(t, e) {
                return se.computeEdgeDistance(this.intPt[e], this.inputLines[t][0], this.inputLines[t][1])
            },
            isCollinear: function() {
                return this.result === se.COLLINEAR_INTERSECTION
            },
            toString: function() {
                return re.toLineString(this.inputLines[0][0], this.inputLines[0][1]) + " - " + re.toLineString(this.inputLines[1][0], this.inputLines[1][1]) + this.getTopologySummary()
            },
            getEndpoint: function(t, e) {
                return this.inputLines[t][e]
            },
            isIntersection: function(t) {
                for (var e = 0; e < this.result; e++)
                    if (this.intPt[e].equals2D(t)) return !0;
                return !1
            },
            getIntersectionAlongSegment: function(t, e) {
                return this.computeIntLineIndex(), this.intPt[this.intLineIndex[t][e]]
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return se
            }
        }), se.computeEdgeDistance = function(t, e, n) {
            var i = Math.abs(n.x - e.x),
                r = Math.abs(n.y - e.y),
                s = -1;
            if (t.equals(e)) s = 0;
            else if (t.equals(n)) s = i > r ? i : r;
            else {
                var o = Math.abs(t.x - e.x),
                    a = Math.abs(t.y - e.y);
                0 !== (s = i > r ? o : a) || t.equals(e) || (s = Math.max(o, a))
            }
            return f.isTrue(!(0 === s && !t.equals(e)), "Bad distance calculation"), s
        }, se.nonRobustComputeEdgeDistance = function(t, e, n) {
            var i = t.x - e.x,
                r = t.y - e.y,
                s = Math.sqrt(i * i + r * r);
            return f.isTrue(!(0 === s && !t.equals(e)), "Invalid distance calculation"), s
        }, se.DONT_INTERSECT = 0, se.DO_INTERSECT = 1, se.COLLINEAR = 2, se.NO_INTERSECTION = 0, se.POINT_INTERSECTION = 1, se.COLLINEAR_INTERSECTION = 2, h(oe, se), e(oe.prototype, {
            isInSegmentEnvelopes: function(t) {
                var e = new C(this.inputLines[0][0], this.inputLines[0][1]),
                    n = new C(this.inputLines[1][0], this.inputLines[1][1]);
                return e.contains(t) && n.contains(t)
            },
            computeIntersection: function() {
                if (3 !== arguments.length) return se.prototype.computeIntersection.apply(this, arguments);
                var t = arguments[0],
                    e = arguments[1],
                    n = arguments[2];
                return this._isProper = !1, C.intersects(e, n, t) && 0 === le.orientationIndex(e, n, t) && 0 === le.orientationIndex(n, e, t) ? (this._isProper = !0, (t.equals(e) || t.equals(n)) && (this._isProper = !1), this.result = se.POINT_INTERSECTION, null) : void(this.result = se.NO_INTERSECTION)
            },
            normalizeToMinimum: function(t, e, n, i, r) {
                r.x = this.smallestInAbsValue(t.x, e.x, n.x, i.x), r.y = this.smallestInAbsValue(t.y, e.y, n.y, i.y), t.x -= r.x, t.y -= r.y, e.x -= r.x, e.y -= r.y, n.x -= r.x, n.y -= r.y, i.x -= r.x, i.y -= r.y
            },
            safeHCoordinateIntersection: function(t, e, n, i) {
                var r = null;
                try {
                    r = F.intersection(t, e, n, i)
                } catch (s) {
                    if (!(s instanceof _)) throw s;
                    r = oe.nearestEndpoint(t, e, n, i)
                }
                return r
            },
            intersection: function(t, e, n, i) {
                var r = this.intersectionWithNormalization(t, e, n, i);
                return this.isInSegmentEnvelopes(r) || (r = new g(oe.nearestEndpoint(t, e, n, i))), null !== this.precisionModel && this.precisionModel.makePrecise(r), r
            },
            smallestInAbsValue: function(t, e, n, i) {
                var r = t,
                    s = Math.abs(r);
                return Math.abs(e) < s && (r = e, s = Math.abs(e)), Math.abs(n) < s && (r = n, s = Math.abs(n)), Math.abs(i) < s && (r = i), r
            },
            checkDD: function(t, e, n, i, r) {
                var s = O.intersection(t, e, n, i),
                    o = this.isInSegmentEnvelopes(s);
                A.out.println("DD in env = " + o + "  --------------------- " + s), r.distance(s) > 1e-4 && A.out.println("Distance = " + r.distance(s))
            },
            intersectionWithNormalization: function(t, e, n, i) {
                var r = new g(t),
                    s = new g(e),
                    o = new g(n),
                    a = new g(i),
                    u = new g;
                this.normalizeToEnvCentre(r, s, o, a, u);
                var l = this.safeHCoordinateIntersection(r, s, o, a);
                return l.x += u.x, l.y += u.y, l
            },
            computeCollinearIntersection: function(t, e, n, i) {
                var r = C.intersects(t, e, n),
                    s = C.intersects(t, e, i),
                    o = C.intersects(n, i, t),
                    a = C.intersects(n, i, e);
                return r && s ? (this.intPt[0] = n, this.intPt[1] = i, se.COLLINEAR_INTERSECTION) : o && a ? (this.intPt[0] = t, this.intPt[1] = e, se.COLLINEAR_INTERSECTION) : r && o ? (this.intPt[0] = n, this.intPt[1] = t, !n.equals(t) || s || a ? se.COLLINEAR_INTERSECTION : se.POINT_INTERSECTION) : r && a ? (this.intPt[0] = n, this.intPt[1] = e, !n.equals(e) || s || o ? se.COLLINEAR_INTERSECTION : se.POINT_INTERSECTION) : s && o ? (this.intPt[0] = i, this.intPt[1] = t, !i.equals(t) || r || a ? se.COLLINEAR_INTERSECTION : se.POINT_INTERSECTION) : s && a ? (this.intPt[0] = i, this.intPt[1] = e, !i.equals(e) || r || o ? se.COLLINEAR_INTERSECTION : se.POINT_INTERSECTION) : se.NO_INTERSECTION
            },
            normalizeToEnvCentre: function(t, e, n, i, r) {
                var s = t.x < e.x ? t.x : e.x,
                    o = t.y < e.y ? t.y : e.y,
                    a = t.x > e.x ? t.x : e.x,
                    u = t.y > e.y ? t.y : e.y,
                    l = n.x < i.x ? n.x : i.x,
                    h = n.y < i.y ? n.y : i.y,
                    c = n.x > i.x ? n.x : i.x,
                    f = n.y > i.y ? n.y : i.y,
                    g = s > l ? s : l,
                    d = a < c ? a : c,
                    p = o > h ? o : h,
                    m = u < f ? u : f,
                    v = (g + d) / 2,
                    y = (p + m) / 2;
                r.x = v, r.y = y, t.x -= r.x, t.y -= r.y, e.x -= r.x, e.y -= r.y, n.x -= r.x, n.y -= r.y, i.x -= r.x, i.y -= r.y
            },
            computeIntersect: function(t, e, n, i) {
                if (this._isProper = !1, !C.intersects(t, e, n, i)) return se.NO_INTERSECTION;
                var r = le.orientationIndex(t, e, n),
                    s = le.orientationIndex(t, e, i);
                if (r > 0 && s > 0 || r < 0 && s < 0) return se.NO_INTERSECTION;
                var o = le.orientationIndex(n, i, t),
                    a = le.orientationIndex(n, i, e);
                return o > 0 && a > 0 || o < 0 && a < 0 ? se.NO_INTERSECTION : 0 === r && 0 === s && 0 === o && 0 === a ? this.computeCollinearIntersection(t, e, n, i) : (0 === r || 0 === s || 0 === o || 0 === a ? (this._isProper = !1, t.equals2D(n) || t.equals2D(i) ? this.intPt[0] = t : e.equals2D(n) || e.equals2D(i) ? this.intPt[0] = e : 0 === r ? this.intPt[0] = new g(n) : 0 === s ? this.intPt[0] = new g(i) : 0 === o ? this.intPt[0] = new g(t) : 0 === a && (this.intPt[0] = new g(e))) : (this._isProper = !0, this.intPt[0] = this.intersection(t, e, n, i)), se.POINT_INTERSECTION)
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return oe
            }
        }), oe.nearestEndpoint = function(t, e, n, i) {
            var r = t,
                s = le.distancePointLine(t, n, i),
                o = le.distancePointLine(e, n, i);
            return o < s && (s = o, r = e), o = le.distancePointLine(n, t, e), o < s && (s = o, r = n), o = le.distancePointLine(i, t, e), o < s && (s = o, r = i), r
        }, e(ae.prototype, {
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return ae
            }
        }), ae.orientationIndex = function(t, e, n) {
            var i = e.x - t.x,
                r = e.y - t.y,
                s = n.x - e.x,
                o = n.y - e.y;
            return ae.signOfDet2x2(i, r, s, o)
        }, ae.signOfDet2x2 = function(t, e, n, i) {
            var r = null,
                s = null,
                o = null,
                a = 0;
            if (r = 1, 0 === t || 0 === i) return 0 === e || 0 === n ? 0 : e > 0 ? n > 0 ? -r : r : n > 0 ? r : -r;
            if (0 === e || 0 === n) return i > 0 ? t > 0 ? r : -r : t > 0 ? -r : r;
            if (0 < e ? 0 < i ? e <= i || (r = -r, s = t, t = n, n = s, s = e, e = i, i = s) : e <= -i ? (r = -r, n = -n, i = -i) : (s = t, t = -n, n = s, s = e, e = -i, i = s) : 0 < i ? -e <= i ? (r = -r, t = -t, e = -e) : (s = -t, t = n, n = s, s = -e, e = i, i = s) : e >= i ? (t = -t, e = -e, n = -n, i = -i) : (r = -r, s = -t, t = -n, n = s, s = -e, e = -i, i = s), 0 < t) {
                if (!(0 < n)) return r;
                if (!(t <= n)) return r
            } else {
                if (0 < n) return -r;
                if (!(t >= n)) return -r;
                r = -r, t = -t, n = -n
            }
            for (;;) {
                if (a += 1, o = Math.floor(n / t), n -= o * t, (i -= o * e) < 0) return -r;
                if (i > e) return r;
                if (t > n + n) {
                    if (e < i + i) return r
                } else {
                    if (e > i + i) return -r;
                    n = t - n, i = e - i, r = -r
                }
                if (0 === i) return 0 === n ? 0 : -r;
                if (0 === n) return r;
                if (o = Math.floor(t / n), t -= o * n, (e -= o * i) < 0) return r;
                if (e > i) return -r;
                if (n > t + t) {
                    if (i < e + e) return -r
                } else {
                    if (i > e + e) return r;
                    t = n - t, e = i - e, r = -r
                }
                if (0 === e) return 0 === t ? 0 : r;
                if (0 === t) return -r
            }
        }, e(ue.prototype, {
            countSegment: function(t, e) {
                if (t.x < this.p.x && e.x < this.p.x) return null;
                if (this.p.x === e.x && this.p.y === e.y) return this.isPointOnSegment = !0, null;
                if (t.y === this.p.y && e.y === this.p.y) {
                    var n = t.x,
                        i = e.x;
                    return n > i && (n = e.x, i = t.x), this.p.x >= n && this.p.x <= i && (this.isPointOnSegment = !0), null
                }
                if (t.y > this.p.y && e.y <= this.p.y || e.y > this.p.y && t.y <= this.p.y) {
                    var r = t.x - this.p.x,
                        s = t.y - this.p.y,
                        o = e.x - this.p.x,
                        a = e.y - this.p.y,
                        u = ae.signOfDet2x2(r, s, o, a);
                    if (0 === u) return this.isPointOnSegment = !0, null;
                    a < s && (u = -u), u > 0 && this.crossingCount++
                }
            },
            isPointInPolygon: function() {
                return this.getLocation() !== S.EXTERIOR
            },
            getLocation: function() {
                return this.isPointOnSegment ? S.BOUNDARY : this.crossingCount % 2 == 1 ? S.INTERIOR : S.EXTERIOR
            },
            isOnSegment: function() {
                return this.isPointOnSegment
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return ue
            }
        }), ue.locatePointInRing = function() {
            if (arguments[0] instanceof g && w(arguments[1], D)) {
                for (var t = arguments[0], e = arguments[1], n = new ue(t), i = new g, r = new g, s = 1; s < e.size(); s++)
                    if (e.getCoordinate(s, i), e.getCoordinate(s - 1, r), n.countSegment(i, r), n.isOnSegment()) return n.getLocation();
                return n.getLocation()
            }
            if (arguments[0] instanceof g && arguments[1] instanceof Array) {
                for (var o = arguments[0], a = arguments[1], n = new ue(o), s = 1; s < a.length; s++) {
                    var i = a[s],
                        r = a[s - 1];
                    if (n.countSegment(i, r), n.isOnSegment()) return n.getLocation()
                }
                return n.getLocation()
            }
        }, e(le.prototype, {
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return le
            }
        }), le.orientationIndex = function(t, e, n) {
            return O.orientationIndex(t, e, n)
        }, le.signedArea = function() {
            if (arguments[0] instanceof Array) {
                var t = arguments[0];
                if (t.length < 3) return 0;
                for (var e = 0, n = t[0].x, i = 1; i < t.length - 1; i++) {
                    var r = t[i].x - n,
                        s = t[i + 1].y;
                    e += r * (t[i - 1].y - s)
                }
                return e / 2
            }
            if (w(arguments[0], D)) {
                var o = arguments[0],
                    a = o.size();
                if (a < 3) return 0;
                var u = new g,
                    l = new g,
                    h = new g;
                o.getCoordinate(0, l), o.getCoordinate(1, h);
                var n = l.x;
                h.x -= n;
                for (var e = 0, i = 1; i < a - 1; i++) u.y = l.y, l.x = h.x, l.y = h.y, o.getCoordinate(i + 1, h), h.x -= n, e += l.x * (u.y - h.y);
                return e / 2
            }
        }, le.distanceLineLine = function(t, e, n, i) {
            if (t.equals(e)) return le.distancePointLine(t, n, i);
            if (n.equals(i)) return le.distancePointLine(i, t, e);
            var r = !1;
            if (C.intersects(t, e, n, i)) {
                var s = (e.x - t.x) * (i.y - n.y) - (e.y - t.y) * (i.x - n.x);
                if (0 === s) r = !0;
                else {
                    var o = (t.y - n.y) * (i.x - n.x) - (t.x - n.x) * (i.y - n.y),
                        a = (t.y - n.y) * (e.x - t.x) - (t.x - n.x) * (e.y - t.y),
                        u = a / s,
                        l = o / s;
                    (l < 0 || l > 1 || u < 0 || u > 1) && (r = !0)
                }
            } else r = !0;
            return r ? b.min(le.distancePointLine(t, n, i), le.distancePointLine(e, n, i), le.distancePointLine(n, t, e), le.distancePointLine(i, t, e)) : 0
        }, le.isPointInRing = function(t, e) {
            return le.locatePointInRing(t, e) !== S.EXTERIOR
        }, le.computeLength = function(t) {
            var e = t.size();
            if (e <= 1) return 0;
            var n = 0,
                i = new g;
            t.getCoordinate(0, i);
            for (var r = i.x, s = i.y, o = 1; o < e; o++) {
                t.getCoordinate(o, i);
                var a = i.x,
                    u = i.y,
                    l = a - r,
                    h = u - s;
                n += Math.sqrt(l * l + h * h), r = a, s = u
            }
            return n
        }, le.isCCW = function(t) {
            var e = t.length - 1;
            if (e < 3) throw new i("Ring has fewer than 4 points, so orientation cannot be determined");
            for (var n = t[0], r = 0, s = 1; s <= e; s++) {
                var o = t[s];
                o.y > n.y && (n = o, r = s)
            }
            var a = r;
            do {
                (a -= 1) < 0 && (a = e)
            } while (t[a].equals2D(n) && a !== r);
            var u = r;
            do {
                u = (u + 1) % e
            } while (t[u].equals2D(n) && u !== r);
            var l = t[a],
                h = t[u];
            if (l.equals2D(n) || h.equals2D(n) || l.equals2D(h)) return !1;
            var c = le.computeOrientation(l, n, h);
            return 0 === c ? l.x > h.x : c > 0
        }, le.locatePointInRing = function(t, e) {
            return ue.locatePointInRing(t, e)
        }, le.distancePointLinePerpendicular = function(t, e, n) {
            var i = (n.x - e.x) * (n.x - e.x) + (n.y - e.y) * (n.y - e.y),
                r = ((e.y - t.y) * (n.x - e.x) - (e.x - t.x) * (n.y - e.y)) / i;
            return Math.abs(r) * Math.sqrt(i)
        }, le.computeOrientation = function(t, e, n) {
            return le.orientationIndex(t, e, n)
        }, le.distancePointLine = function() {
            if (2 === arguments.length) {
                var t = arguments[0],
                    e = arguments[1];
                if (0 === e.length) throw new i("Line array must contain at least one vertex");
                for (var n = t.distance(e[0]), r = 0; r < e.length - 1; r++) {
                    var s = le.distancePointLine(t, e[r], e[r + 1]);
                    s < n && (n = s)
                }
                return n
            }
            if (3 === arguments.length) {
                var o = arguments[0],
                    a = arguments[1],
                    u = arguments[2];
                if (a.x === u.x && a.y === u.y) return o.distance(a);
                var l = (u.x - a.x) * (u.x - a.x) + (u.y - a.y) * (u.y - a.y),
                    h = ((o.x - a.x) * (u.x - a.x) + (o.y - a.y) * (u.y - a.y)) / l;
                if (h <= 0) return o.distance(a);
                if (h >= 1) return o.distance(u);
                var c = ((a.y - o.y) * (u.x - a.x) - (a.x - o.x) * (u.y - a.y)) / l;
                return Math.abs(c) * Math.sqrt(l)
            }
        }, le.isOnLine = function(t, e) {
            for (var n = new oe, i = 1; i < e.length; i++) {
                var r = e[i - 1],
                    s = e[i];
                if (n.computeIntersection(t, r, s), n.hasIntersection()) return !0
            }
            return !1
        }, le.CLOCKWISE = -1, le.RIGHT = le.CLOCKWISE, le.COUNTERCLOCKWISE = 1, le.LEFT = le.COUNTERCLOCKWISE, le.COLLINEAR = 0, le.STRAIGHT = le.COLLINEAR, e(he.prototype, {
            minX: function() {
                return Math.min(this.p0.x, this.p1.x)
            },
            orientationIndex: function() {
                if (arguments[0] instanceof he) {
                    var t = arguments[0],
                        e = le.orientationIndex(this.p0, this.p1, t.p0),
                        n = le.orientationIndex(this.p0, this.p1, t.p1);
                    return e >= 0 && n >= 0 ? Math.max(e, n) : e <= 0 && n <= 0 ? Math.max(e, n) : 0
                }
                if (arguments[0] instanceof g) {
                    var i = arguments[0];
                    return le.orientationIndex(this.p0, this.p1, i)
                }
            },
            toGeometry: function(t) {
                return t.createLineString([this.p0, this.p1])
            },
            isVertical: function() {
                return this.p0.x === this.p1.x
            },
            equals: function(t) {
                if (!(t instanceof he)) return !1;
                var e = t;
                return this.p0.equals(e.p0) && this.p1.equals(e.p1)
            },
            intersection: function(t) {
                var e = new oe;
                return e.computeIntersection(this.p0, this.p1, t.p0, t.p1), e.hasIntersection() ? e.getIntersection(0) : null
            },
            project: function() {
                if (arguments[0] instanceof g) {
                    var t = arguments[0];
                    if (t.equals(this.p0) || t.equals(this.p1)) return new g(t);
                    var e = this.projectionFactor(t),
                        n = new g;
                    return n.x = this.p0.x + e * (this.p1.x - this.p0.x), n.y = this.p0.y + e * (this.p1.y - this.p0.y), n
                }
                if (arguments[0] instanceof he) {
                    var i = arguments[0],
                        r = this.projectionFactor(i.p0),
                        s = this.projectionFactor(i.p1);
                    if (r >= 1 && s >= 1) return null;
                    if (r <= 0 && s <= 0) return null;
                    var o = this.project(i.p0);
                    r < 0 && (o = this.p0), r > 1 && (o = this.p1);
                    var a = this.project(i.p1);
                    return s < 0 && (a = this.p0), s > 1 && (a = this.p1), new he(o, a)
                }
            },
            normalize: function() {
                this.p1.compareTo(this.p0) < 0 && this.reverse()
            },
            angle: function() {
                return Math.atan2(this.p1.y - this.p0.y, this.p1.x - this.p0.x)
            },
            getCoordinate: function(t) {
                return 0 === t ? this.p0 : this.p1
            },
            distancePerpendicular: function(t) {
                return le.distancePointLinePerpendicular(t, this.p0, this.p1)
            },
            minY: function() {
                return Math.min(this.p0.y, this.p1.y)
            },
            midPoint: function() {
                return he.midPoint(this.p0, this.p1)
            },
            projectionFactor: function(t) {
                if (t.equals(this.p0)) return 0;
                if (t.equals(this.p1)) return 1;
                var e = this.p1.x - this.p0.x,
                    n = this.p1.y - this.p0.y,
                    i = e * e + n * n;
                return i <= 0 ? r.NaN : ((t.x - this.p0.x) * e + (t.y - this.p0.y) * n) / i
            },
            closestPoints: function(t) {
                var e = this.intersection(t);
                if (null !== e) return [e, e];
                var n = new Array(2).fill(null),
                    i = r.MAX_VALUE,
                    s = null,
                    o = this.closestPoint(t.p0);
                i = o.distance(t.p0), n[0] = o, n[1] = t.p0;
                var a = this.closestPoint(t.p1);
                (s = a.distance(t.p1)) < i && (i = s, n[0] = a, n[1] = t.p1);
                var u = t.closestPoint(this.p0);
                (s = u.distance(this.p0)) < i && (i = s, n[0] = this.p0, n[1] = u);
                var l = t.closestPoint(this.p1);
                return s = l.distance(this.p1), s < i && (i = s, n[0] = this.p1, n[1] = l), n
            },
            closestPoint: function(t) {
                var e = this.projectionFactor(t);
                return e > 0 && e < 1 ? this.project(t) : this.p0.distance(t) < this.p1.distance(t) ? this.p0 : this.p1
            },
            maxX: function() {
                return Math.max(this.p0.x, this.p1.x)
            },
            getLength: function() {
                return this.p0.distance(this.p1)
            },
            compareTo: function(t) {
                var e = t,
                    n = this.p0.compareTo(e.p0);
                return 0 !== n ? n : this.p1.compareTo(e.p1)
            },
            reverse: function() {
                var t = this.p0;
                this.p0 = this.p1, this.p1 = t
            },
            equalsTopo: function(t) {
                return this.p0.equals(t.p0) && this.p1.equals(t.p1) || this.p0.equals(t.p1) && this.p1.equals(t.p0)
            },
            lineIntersection: function(t) {
                try {
                    return F.intersection(this.p0, this.p1, t.p0, t.p1)
                } catch (t) {
                    if (!(t instanceof _)) throw t
                }
                return null
            },
            maxY: function() {
                return Math.max(this.p0.y, this.p1.y)
            },
            pointAlongOffset: function(t, e) {
                var n = this.p0.x + t * (this.p1.x - this.p0.x),
                    i = this.p0.y + t * (this.p1.y - this.p0.y),
                    r = this.p1.x - this.p0.x,
                    s = this.p1.y - this.p0.y,
                    o = Math.sqrt(r * r + s * s),
                    a = 0,
                    u = 0;
                if (0 !== e) {
                    if (o <= 0) throw new IllegalStateException("Cannot compute offset from zero-length line segment");
                    a = e * r / o, u = e * s / o
                }
                return new g(n - u, i + a)
            },
            setCoordinates: function() {
                if (1 === arguments.length) {
                    var t = arguments[0];
                    this.setCoordinates(t.p0, t.p1)
                } else if (2 === arguments.length) {
                    var e = arguments[0],
                        n = arguments[1];
                    this.p0.x = e.x, this.p0.y = e.y, this.p1.x = n.x, this.p1.y = n.y
                }
            },
            segmentFraction: function(t) {
                var e = this.projectionFactor(t);
                return e < 0 ? e = 0 : (e > 1 || r.isNaN(e)) && (e = 1), e
            },
            toString: function() {
                return "LINESTRING( " + this.p0.x + " " + this.p0.y + ", " + this.p1.x + " " + this.p1.y + ")"
            },
            isHorizontal: function() {
                return this.p0.y === this.p1.y
            },
            distance: function() {
                if (arguments[0] instanceof he) {
                    var t = arguments[0];
                    return le.distanceLineLine(this.p0, this.p1, t.p0, t.p1)
                }
                if (arguments[0] instanceof g) {
                    var e = arguments[0];
                    return le.distancePointLine(e, this.p0, this.p1)
                }
            },
            pointAlong: function(t) {
                var e = new g;
                return e.x = this.p0.x + t * (this.p1.x - this.p0.x), e.y = this.p0.y + t * (this.p1.y - this.p0.y), e
            },
            hashCode: function() {
                var t = java.lang.Double.doubleToLongBits(this.p0.x);
                t ^= 31 * java.lang.Double.doubleToLongBits(this.p0.y);
                var e = Math.trunc(t) ^ Math.trunc(t >> 32),
                    n = java.lang.Double.doubleToLongBits(this.p1.x);
                return n ^= 31 * java.lang.Double.doubleToLongBits(this.p1.y), e ^ Math.trunc(n) ^ Math.trunc(n >> 32)
            },
            interfaces_: function() {
                return [s, u]
            },
            getClass: function() {
                return he
            }
        }), he.midPoint = function(t, e) {
            return new g((t.x + e.x) / 2, (t.y + e.y) / 2)
        }, he.serialVersionUID = 0x2d2172135f411c00, e(ce.prototype, {
            isIntersects: function() {
                return !this.isDisjoint()
            },
            isCovers: function() {
                return (ce.isTrue(this.matrix[S.INTERIOR][S.INTERIOR]) || ce.isTrue(this.matrix[S.INTERIOR][S.BOUNDARY]) || ce.isTrue(this.matrix[S.BOUNDARY][S.INTERIOR]) || ce.isTrue(this.matrix[S.BOUNDARY][S.BOUNDARY])) && this.matrix[S.EXTERIOR][S.INTERIOR] === lt.FALSE && this.matrix[S.EXTERIOR][S.BOUNDARY] === lt.FALSE
            },
            isCoveredBy: function() {
                return (ce.isTrue(this.matrix[S.INTERIOR][S.INTERIOR]) || ce.isTrue(this.matrix[S.INTERIOR][S.BOUNDARY]) || ce.isTrue(this.matrix[S.BOUNDARY][S.INTERIOR]) || ce.isTrue(this.matrix[S.BOUNDARY][S.BOUNDARY])) && this.matrix[S.INTERIOR][S.EXTERIOR] === lt.FALSE && this.matrix[S.BOUNDARY][S.EXTERIOR] === lt.FALSE
            },
            set: function() {
                if (1 === arguments.length)
                    for (var t = arguments[0], e = 0; e < t.length; e++) {
                        var n = Math.trunc(e / 3),
                            i = e % 3;
                        this.matrix[n][i] = lt.toDimensionValue(t.charAt(e))
                    } else if (3 === arguments.length) {
                        var r = arguments[0],
                            s = arguments[1],
                            o = arguments[2];
                        this.matrix[r][s] = o
                    }
            },
            isContains: function() {
                return ce.isTrue(this.matrix[S.INTERIOR][S.INTERIOR]) && this.matrix[S.EXTERIOR][S.INTERIOR] === lt.FALSE && this.matrix[S.EXTERIOR][S.BOUNDARY] === lt.FALSE
            },
            setAtLeast: function() {
                if (1 === arguments.length)
                    for (var t = arguments[0], e = 0; e < t.length; e++) {
                        var n = Math.trunc(e / 3),
                            i = e % 3;
                        this.setAtLeast(n, i, lt.toDimensionValue(t.charAt(e)))
                    } else if (3 === arguments.length) {
                        var r = arguments[0],
                            s = arguments[1],
                            o = arguments[2];
                        this.matrix[r][s] < o && (this.matrix[r][s] = o)
                    }
            },
            setAtLeastIfValid: function(t, e, n) {
                t >= 0 && e >= 0 && this.setAtLeast(t, e, n)
            },
            isWithin: function() {
                return ce.isTrue(this.matrix[S.INTERIOR][S.INTERIOR]) && this.matrix[S.INTERIOR][S.EXTERIOR] === lt.FALSE && this.matrix[S.BOUNDARY][S.EXTERIOR] === lt.FALSE
            },
            isTouches: function(t, e) {
                return t > e ? this.isTouches(e, t) : (t === lt.A && e === lt.A || t === lt.L && e === lt.L || t === lt.L && e === lt.A || t === lt.P && e === lt.A || t === lt.P && e === lt.L) && this.matrix[S.INTERIOR][S.INTERIOR] === lt.FALSE && (ce.isTrue(this.matrix[S.INTERIOR][S.BOUNDARY]) || ce.isTrue(this.matrix[S.BOUNDARY][S.INTERIOR]) || ce.isTrue(this.matrix[S.BOUNDARY][S.BOUNDARY]))
            },
            isOverlaps: function(t, e) {
                return t === lt.P && e === lt.P || t === lt.A && e === lt.A ? ce.isTrue(this.matrix[S.INTERIOR][S.INTERIOR]) && ce.isTrue(this.matrix[S.INTERIOR][S.EXTERIOR]) && ce.isTrue(this.matrix[S.EXTERIOR][S.INTERIOR]) : t === lt.L && e === lt.L && 1 === this.matrix[S.INTERIOR][S.INTERIOR] && ce.isTrue(this.matrix[S.INTERIOR][S.EXTERIOR]) && ce.isTrue(this.matrix[S.EXTERIOR][S.INTERIOR])
            },
            isEquals: function(t, e) {
                return t === e && ce.isTrue(this.matrix[S.INTERIOR][S.INTERIOR]) && this.matrix[S.INTERIOR][S.EXTERIOR] === lt.FALSE && this.matrix[S.BOUNDARY][S.EXTERIOR] === lt.FALSE && this.matrix[S.EXTERIOR][S.INTERIOR] === lt.FALSE && this.matrix[S.EXTERIOR][S.BOUNDARY] === lt.FALSE
            },
            toString: function() {
                for (var t = new R("123456789"), e = 0; e < 3; e++)
                    for (var n = 0; n < 3; n++) t.setCharAt(3 * e + n, lt.toDimensionSymbol(this.matrix[e][n]));
                return t.toString()
            },
            setAll: function(t) {
                for (var e = 0; e < 3; e++)
                    for (var n = 0; n < 3; n++) this.matrix[e][n] = t
            },
            get: function(t, e) {
                return this.matrix[t][e]
            },
            transpose: function() {
                var t = this.matrix[1][0];
                return this.matrix[1][0] = this.matrix[0][1], this.matrix[0][1] = t, t = this.matrix[2][0], this.matrix[2][0] = this.matrix[0][2], this.matrix[0][2] = t, t = this.matrix[2][1], this.matrix[2][1] = this.matrix[1][2], this.matrix[1][2] = t, this
            },
            matches: function(t) {
                if (9 !== t.length) throw new i("Should be length 9: " + t);
                for (var e = 0; e < 3; e++)
                    for (var n = 0; n < 3; n++)
                        if (!ce.matches(this.matrix[e][n], t.charAt(3 * e + n))) return !1;
                return !0
            },
            add: function(t) {
                for (var e = 0; e < 3; e++)
                    for (var n = 0; n < 3; n++) this.setAtLeast(e, n, t.get(e, n))
            },
            isDisjoint: function() {
                return this.matrix[S.INTERIOR][S.INTERIOR] === lt.FALSE && this.matrix[S.INTERIOR][S.BOUNDARY] === lt.FALSE && this.matrix[S.BOUNDARY][S.INTERIOR] === lt.FALSE && this.matrix[S.BOUNDARY][S.BOUNDARY] === lt.FALSE
            },
            isCrosses: function(t, e) {
                return t === lt.P && e === lt.L || t === lt.P && e === lt.A || t === lt.L && e === lt.A ? ce.isTrue(this.matrix[S.INTERIOR][S.INTERIOR]) && ce.isTrue(this.matrix[S.INTERIOR][S.EXTERIOR]) : t === lt.L && e === lt.P || t === lt.A && e === lt.P || t === lt.A && e === lt.L ? ce.isTrue(this.matrix[S.INTERIOR][S.INTERIOR]) && ce.isTrue(this.matrix[S.EXTERIOR][S.INTERIOR]) : t === lt.L && e === lt.L && 0 === this.matrix[S.INTERIOR][S.INTERIOR]
            },
            interfaces_: function() {
                return [o]
            },
            getClass: function() {
                return ce
            }
        }), ce.matches = function() {
            if (Number.isInteger(arguments[0]) && "string" == typeof arguments[1]) {
                var t = arguments[0],
                    e = arguments[1];
                return e === lt.SYM_DONTCARE || e === lt.SYM_TRUE && (t >= 0 || t === lt.TRUE) || e === lt.SYM_FALSE && t === lt.FALSE || e === lt.SYM_P && t === lt.P || e === lt.SYM_L && t === lt.L || e === lt.SYM_A && t === lt.A
            }
            if ("string" == typeof arguments[0] && "string" == typeof arguments[1]) {
                var n = arguments[0],
                    i = arguments[1];
                return new ce(n).matches(i)
            }
        }, ce.isTrue = function(t) {
            return t >= 0 || t === lt.TRUE
        };
        var ao = Object.freeze({
            Coordinate: g,
            CoordinateList: N,
            Envelope: C,
            LineSegment: he,
            GeometryFactory: ne,
            Geometry: B,
            Point: St,
            LineString: Lt,
            LinearRing: Mt,
            Polygon: bt,
            GeometryCollection: ft,
            MultiPoint: Rt,
            MultiLineString: gt,
            MultiPolygon: Tt,
            Dimension: lt,
            IntersectionMatrix: ce,
            PrecisionModel: te
        });
        e(fe.prototype, {
            addPoint: function(t) {
                this.ptCount += 1, this.ptCentSum.x += t.x, this.ptCentSum.y += t.y
            },
            setBasePoint: function(t) {
                null === this.areaBasePt && (this.areaBasePt = t)
            },
            addLineSegments: function(t) {
                for (var e = 0, n = 0; n < t.length - 1; n++) {
                    var i = t[n].distance(t[n + 1]);
                    if (0 !== i) {
                        e += i;
                        var r = (t[n].x + t[n + 1].x) / 2;
                        this.lineCentSum.x += i * r;
                        var s = (t[n].y + t[n + 1].y) / 2;
                        this.lineCentSum.y += i * s
                    }
                }
                this.totalLength += e, 0 === e && t.length > 0 && this.addPoint(t[0])
            },
            addHole: function(t) {
                for (var e = le.isCCW(t), n = 0; n < t.length - 1; n++) this.addTriangle(this.areaBasePt, t[n], t[n + 1], e);
                this.addLineSegments(t)
            },
            getCentroid: function() {
                var t = new g;
                if (Math.abs(this.areasum2) > 0) t.x = this.cg3.x / 3 / this.areasum2, t.y = this.cg3.y / 3 / this.areasum2;
                else if (this.totalLength > 0) t.x = this.lineCentSum.x / this.totalLength, t.y = this.lineCentSum.y / this.totalLength;
                else {
                    if (!(this.ptCount > 0)) return null;
                    t.x = this.ptCentSum.x / this.ptCount, t.y = this.ptCentSum.y / this.ptCount
                }
                return t
            },
            addShell: function(t) {
                t.length > 0 && this.setBasePoint(t[0]);
                for (var e = !le.isCCW(t), n = 0; n < t.length - 1; n++) this.addTriangle(this.areaBasePt, t[n], t[n + 1], e);
                this.addLineSegments(t)
            },
            addTriangle: function(t, e, n, i) {
                var r = i ? 1 : -1;
                fe.centroid3(t, e, n, this.triangleCent3);
                var s = fe.area2(t, e, n);
                this.cg3.x += r * s * this.triangleCent3.x, this.cg3.y += r * s * this.triangleCent3.y, this.areasum2 += r * s
            },
            add: function() {
                if (arguments[0] instanceof bt) {
                    var t = arguments[0];
                    this.addShell(t.getExteriorRing().getCoordinates());
                    for (var e = 0; e < t.getNumInteriorRing(); e++) this.addHole(t.getInteriorRingN(e).getCoordinates())
                } else if (arguments[0] instanceof B) {
                    var n = arguments[0];
                    if (n.isEmpty()) return null;
                    if (n instanceof St) this.addPoint(n.getCoordinate());
                    else if (n instanceof Lt) this.addLineSegments(n.getCoordinates());
                    else if (n instanceof bt) {
                        var i = n;
                        this.add(i)
                    } else if (n instanceof ft)
                        for (var r = n, e = 0; e < r.getNumGeometries(); e++) this.add(r.getGeometryN(e))
                }
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return fe
            }
        }), fe.area2 = function(t, e, n) {
            return (e.x - t.x) * (n.y - t.y) - (n.x - t.x) * (e.y - t.y)
        }, fe.centroid3 = function(t, e, n, i) {
            return i.x = t.x + e.x + n.x, i.y = t.y + e.y + n.y, null
        }, fe.getCentroid = function(t) {
            return new fe(t).getCentroid()
        }, ge.prototype = new Error, ge.prototype.name = "EmptyStackException", de.prototype = new y, de.prototype.add = function(t) {
            return this.array_.push(t), !0
        }, de.prototype.get = function(t) {
            if (t < 0 || t >= this.size()) throw new IndexOutOfBoundsException;
            return this.array_[t]
        }, de.prototype.push = function(t) {
            return this.array_.push(t), t
        }, de.prototype.pop = function(t) {
            if (0 === this.array_.length) throw new ge;
            return this.array_.pop()
        }, de.prototype.peek = function() {
            if (0 === this.array_.length) throw new ge;
            return this.array_[this.array_.length - 1]
        }, de.prototype.empty = function() {
            return 0 === this.array_.length
        }, de.prototype.isEmpty = function() {
            return this.empty()
        }, de.prototype.search = function(t) {
            return this.array_.indexOf(t)
        }, de.prototype.size = function() {
            return this.array_.length
        }, de.prototype.toArray = function() {
            for (var t = [], e = 0, n = this.array_.length; e < n; e++) t.push(this.array_[e]);
            return t
        }, e(pe.prototype, {
            filter: function(t) {
                this.treeSet.contains(t) || (this.list.add(t), this.treeSet.add(t))
            },
            getCoordinates: function() {
                var t = new Array(this.list.size()).fill(null);
                return this.list.toArray(t)
            },
            interfaces_: function() {
                return [q]
            },
            getClass: function() {
                return pe
            }
        }), pe.filterCoordinates = function(t) {
            for (var e = new pe, n = 0; n < t.length; n++) e.filter(t[n]);
            return e.getCoordinates()
        }, e(me.prototype, {
            preSort: function(t) {
                for (var e = null, n = 1; n < t.length; n++)(t[n].y < t[0].y || t[n].y === t[0].y && t[n].x < t[0].x) && (e = t[0], t[0] = t[n], t[n] = e);
                return ut.sort(t, 1, t.length, new ve(t[0])), t
            },
            computeOctRing: function(t) {
                var e = this.computeOctPts(t),
                    n = new N;
                return n.add(e, !1), n.size() < 3 ? null : (n.closeRing(), n.toCoordinateArray())
            },
            lineOrPolygon: function(t) {
                if (t = this.cleanRing(t), 3 === t.length) return this.geomFactory.createLineString([t[0], t[1]]);
                var e = this.geomFactory.createLinearRing(t);
                return this.geomFactory.createPolygon(e, null)
            },
            cleanRing: function(t) {
                f.equals(t[0], t[t.length - 1]);
                for (var e = new I, n = null, i = 0; i <= t.length - 2; i++) {
                    var r = t[i],
                        s = t[i + 1];
                    r.equals(s) || null !== n && this.isBetween(n, r, s) || (e.add(r), n = r)
                }
                e.add(t[t.length - 1]);
                var o = new Array(e.size()).fill(null);
                return e.toArray(o)
            },
            isBetween: function(t, e, n) {
                if (0 !== le.computeOrientation(t, e, n)) return !1;
                if (t.x !== n.x) {
                    if (t.x <= e.x && e.x <= n.x) return !0;
                    if (n.x <= e.x && e.x <= t.x) return !0
                }
                if (t.y !== n.y) {
                    if (t.y <= e.y && e.y <= n.y) return !0;
                    if (n.y <= e.y && e.y <= t.y) return !0
                }
                return !1
            },
            reduce: function(t) {
                var e = this.computeOctRing(t);
                if (null === e) return t;
                for (var n = new at, i = 0; i < e.length; i++) n.add(e[i]);
                for (var i = 0; i < t.length; i++) le.isPointInRing(t[i], e) || n.add(t[i]);
                var r = H.toCoordinateArray(n);
                return r.length < 3 ? this.padArray3(r) : r
            },
            getConvexHull: function() {
                if (0 === this.inputPts.length) return this.geomFactory.createGeometryCollection(null);
                if (1 === this.inputPts.length) return this.geomFactory.createPoint(this.inputPts[0]);
                if (2 === this.inputPts.length) return this.geomFactory.createLineString(this.inputPts);
                var t = this.inputPts;
                this.inputPts.length > 50 && (t = this.reduce(this.inputPts));
                var e = this.preSort(t),
                    n = this.grahamScan(e),
                    i = this.toCoordinateArray(n);
                return this.lineOrPolygon(i)
            },
            padArray3: function(t) {
                for (var e = new Array(3).fill(null), n = 0; n < e.length; n++) n < t.length ? e[n] = t[n] : e[n] = t[0];
                return e
            },
            computeOctPts: function(t) {
                for (var e = new Array(8).fill(null), n = 0; n < e.length; n++) e[n] = t[0];
                for (var i = 1; i < t.length; i++) t[i].x < e[0].x && (e[0] = t[i]), t[i].x - t[i].y < e[1].x - e[1].y && (e[1] = t[i]), t[i].y > e[2].y && (e[2] = t[i]), t[i].x + t[i].y > e[3].x + e[3].y && (e[3] = t[i]), t[i].x > e[4].x && (e[4] = t[i]), t[i].x - t[i].y > e[5].x - e[5].y && (e[5] = t[i]), t[i].y < e[6].y && (e[6] = t[i]), t[i].x + t[i].y < e[7].x + e[7].y && (e[7] = t[i]);
                return e
            },
            toCoordinateArray: function(t) {
                for (var e = new Array(t.size()).fill(null), n = 0; n < t.size(); n++) {
                    var i = t.get(n);
                    e[n] = i
                }
                return e
            },
            grahamScan: function(t) {
                var e = null,
                    n = new de;
                e = n.push(t[0]), e = n.push(t[1]), e = n.push(t[2]);
                for (var i = 3; i < t.length; i++) {
                    for (e = n.pop(); !n.empty() && le.computeOrientation(n.peek(), e, t[i]) > 0;) e = n.pop();
                    e = n.push(e), e = n.push(t[i])
                }
                return e = n.push(t[0]), n
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return me
            }
        }), me.extractCoordinates = function(t) {
            var e = new pe;
            return t.apply(e), e.getCoordinates()
        }, e(ve.prototype, {
            compare: function(t, e) {
                var n = t,
                    i = e;
                return ve.polarCompare(this.origin, n, i)
            },
            interfaces_: function() {
                return [a]
            },
            getClass: function() {
                return ve
            }
        }), ve.polarCompare = function(t, e, n) {
            var i = e.x - t.x,
                r = e.y - t.y,
                s = n.x - t.x,
                o = n.y - t.y,
                a = le.computeOrientation(t, e, n);
            if (a === le.COUNTERCLOCKWISE) return 1;
            if (a === le.CLOCKWISE) return -1;
            var u = i * i + r * r,
                l = s * s + o * o;
            return u < l ? -1 : u > l ? 1 : 0
        }, me.RadialComparator = ve, e(ye.prototype, {
            transformPoint: function(t, e) {
                return this.factory.createPoint(this.transformCoordinates(t.getCoordinateSequence(), t))
            },
            transformPolygon: function(t, e) {
                var n = !0,
                    i = this.transformLinearRing(t.getExteriorRing(), t);
                null !== i && i instanceof Mt && !i.isEmpty() || (n = !1);
                for (var r = new I, s = 0; s < t.getNumInteriorRing(); s++) {
                    var o = this.transformLinearRing(t.getInteriorRingN(s), t);
                    null === o || o.isEmpty() || (o instanceof Mt || (n = !1), r.add(o))
                }
                if (n) return this.factory.createPolygon(i, r.toArray([]));
                var a = new I;
                return null !== i && a.add(i), a.addAll(r), this.factory.buildGeometry(a)
            },
            createCoordinateSequence: function(t) {
                return this.factory.getCoordinateSequenceFactory().create(t)
            },
            getInputGeometry: function() {
                return this.inputGeom
            },
            transformMultiLineString: function(t, e) {
                for (var n = new I, i = 0; i < t.getNumGeometries(); i++) {
                    var r = this.transformLineString(t.getGeometryN(i), t);
                    null !== r && (r.isEmpty() || n.add(r))
                }
                return this.factory.buildGeometry(n)
            },
            transformCoordinates: function(t, e) {
                return this.copy(t)
            },
            transformLineString: function(t, e) {
                return this.factory.createLineString(this.transformCoordinates(t.getCoordinateSequence(), t))
            },
            transformMultiPoint: function(t, e) {
                for (var n = new I, i = 0; i < t.getNumGeometries(); i++) {
                    var r = this.transformPoint(t.getGeometryN(i), t);
                    null !== r && (r.isEmpty() || n.add(r))
                }
                return this.factory.buildGeometry(n)
            },
            transformMultiPolygon: function(t, e) {
                for (var n = new I, i = 0; i < t.getNumGeometries(); i++) {
                    var r = this.transformPolygon(t.getGeometryN(i), t);
                    null !== r && (r.isEmpty() || n.add(r))
                }
                return this.factory.buildGeometry(n)
            },
            copy: function(t) {
                return t.copy()
            },
            transformGeometryCollection: function(t, e) {
                for (var n = new I, i = 0; i < t.getNumGeometries(); i++) {
                    var r = this.transform(t.getGeometryN(i));
                    null !== r && (this.pruneEmptyGeometry && r.isEmpty() || n.add(r))
                }
                return this.preserveGeometryCollectionType ? this.factory.createGeometryCollection(ne.toGeometryArray(n)) : this.factory.buildGeometry(n)
            },
            transform: function(t) {
                if (this.inputGeom = t, this.factory = t.getFactory(), t instanceof St) return this.transformPoint(t, null);
                if (t instanceof Rt) return this.transformMultiPoint(t, null);
                if (t instanceof Mt) return this.transformLinearRing(t, null);
                if (t instanceof Lt) return this.transformLineString(t, null);
                if (t instanceof gt) return this.transformMultiLineString(t, null);
                if (t instanceof bt) return this.transformPolygon(t, null);
                if (t instanceof Tt) return this.transformMultiPolygon(t, null);
                if (t instanceof ft) return this.transformGeometryCollection(t, null);
                throw new i("Unknown Geometry subtype: " + t.getClass().getName())
            },
            transformLinearRing: function(t, e) {
                var n = this.transformCoordinates(t.getCoordinateSequence(), t);
                if (null === n) return this.factory.createLinearRing(null);
                var i = n.size();
                return i > 0 && i < 4 && !this.preserveType ? this.factory.createLineString(n) : this.factory.createLinearRing(n)
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return ye
            }
        }), e(Ee.prototype, {
            snapVertices: function(t, e) {
                for (var n = this._isClosed ? t.size() - 1 : t.size(), i = 0; i < n; i++) {
                    var r = t.get(i),
                        s = this.findSnapForVertex(r, e);
                    null !== s && (t.set(i, new g(s)), 0 === i && this._isClosed && t.set(t.size() - 1, new g(s)))
                }
            },
            findSnapForVertex: function(t, e) {
                for (var n = 0; n < e.length; n++) {
                    if (t.equals2D(e[n])) return null;
                    if (t.distance(e[n]) < this.snapTolerance) return e[n]
                }
                return null
            },
            snapTo: function(t) {
                var e = new N(this.srcPts);
                return this.snapVertices(e, t), this.snapSegments(e, t), e.toCoordinateArray()
            },
            snapSegments: function(t, e) {
                if (0 === e.length) return null;
                var n = e.length;
                e[0].equals2D(e[e.length - 1]) && (n = e.length - 1);
                for (var i = 0; i < n; i++) {
                    var r = e[i],
                        s = this.findSegmentIndexToSnap(r, t);
                    s >= 0 && t.add(s + 1, new g(r), !1)
                }
            },
            findSegmentIndexToSnap: function(t, e) {
                for (var n = r.MAX_VALUE, i = -1, s = 0; s < e.size() - 1; s++) {
                    if (this.seg.p0 = e.get(s), this.seg.p1 = e.get(s + 1), this.seg.p0.equals2D(t) || this.seg.p1.equals2D(t)) {
                        if (this.allowSnappingToSourceVertices) continue;
                        return -1
                    }
                    var o = this.seg.distance(t);
                    o < this.snapTolerance && o < n && (n = o, i = s)
                }
                return i
            },
            setAllowSnappingToSourceVertices: function(t) {
                this.allowSnappingToSourceVertices = t
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Ee
            }
        }), Ee.isClosed = function(t) {
            return !(t.length <= 1) && t[0].equals2D(t[t.length - 1])
        }, e(xe.prototype, {
            snapTo: function(t, e) {
                return new Ie(e, this.extractTargetCoordinates(t)).transform(this.srcGeom)
            },
            snapToSelf: function(t, e) {
                var n = this.extractTargetCoordinates(this.srcGeom),
                    i = new Ie(t, n, !0),
                    r = i.transform(this.srcGeom),
                    s = r;
                return e && w(s, wt) && (s = r.buffer(0)), s
            },
            computeSnapTolerance: function(t) {
                return this.computeMinimumSegmentLength(t) / 10
            },
            extractTargetCoordinates: function(t) {
                for (var e = new at, n = t.getCoordinates(), i = 0; i < n.length; i++) e.add(n[i]);
                return e.toArray(new Array(0).fill(null))
            },
            computeMinimumSegmentLength: function(t) {
                for (var e = r.MAX_VALUE, n = 0; n < t.length - 1; n++) {
                    var i = t[n].distance(t[n + 1]);
                    i < e && (e = i)
                }
                return e
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return xe
            }
        }), xe.snap = function(t, e, n) {
            var i = new Array(2).fill(null),
                r = new xe(t);
            i[0] = r.snapTo(e, n);
            var s = new xe(e);
            return i[1] = s.snapTo(i[0], n), i
        }, xe.computeOverlaySnapTolerance = function() {
            if (1 === arguments.length) {
                var t = arguments[0],
                    e = xe.computeSizeBasedSnapTolerance(t),
                    n = t.getPrecisionModel();
                if (n.getType() === te.FIXED) {
                    var i = 1 / n.getScale() * 2 / 1.415;
                    i > e && (e = i)
                }
                return e
            }
            if (2 === arguments.length) {
                var r = arguments[0],
                    s = arguments[1];
                return Math.min(xe.computeOverlaySnapTolerance(r), xe.computeOverlaySnapTolerance(s))
            }
        }, xe.computeSizeBasedSnapTolerance = function(t) {
            var e = t.getEnvelopeInternal();
            return Math.min(e.getHeight(), e.getWidth()) * xe.SNAP_PRECISION_FACTOR
        }, xe.snapToSelf = function(t, e, n) {
            return new xe(t).snapToSelf(e, n)
        }, xe.SNAP_PRECISION_FACTOR = 1e-9, h(Ie, ye), e(Ie.prototype, {
            snapLine: function(t, e) {
                var n = new Ee(t, this.snapTolerance);
                return n.setAllowSnappingToSourceVertices(this.isSelfSnap), n.snapTo(e)
            },
            transformCoordinates: function(t, e) {
                var n = t.toCoordinateArray(),
                    i = this.snapLine(n, this.snapPts);
                return this.factory.getCoordinateSequenceFactory().create(i)
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Ie
            }
        }), e(Ne.prototype, {
            getCommon: function() {
                return r.longBitsToDouble(this.commonBits)
            },
            add: function(t) {
                var e = r.doubleToLongBits(t);
                return this.isFirst ? (this.commonBits = e, this.commonSignExp = Ne.signExpBits(this.commonBits), this.isFirst = !1, null) : Ne.signExpBits(e) !== this.commonSignExp ? (this.commonBits = 0, null) : (this.commonMantissaBitsCount = Ne.numCommonMostSigMantissaBits(this.commonBits, e), void(this.commonBits = Ne.zeroLowerBits(this.commonBits, 64 - (12 + this.commonMantissaBitsCount))))
            },
            toString: function() {
                if (1 === arguments.length) {
                    var t = arguments[0],
                        e = r.longBitsToDouble(t),
                        n = Long.toBinaryString(t),
                        i = "0000000000000000000000000000000000000000000000000000000000000000" + n,
                        s = i.substring(i.length - 64);
                    return s.substring(0, 1) + "  " + s.substring(1, 12) + "(exp) " + s.substring(12) + " [ " + e + " ]"
                }
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Ne
            }
        }), Ne.getBit = function(t, e) {
            return 0 != (t & 1 << e) ? 1 : 0
        }, Ne.signExpBits = function(t) {
            return t >> 52
        }, Ne.zeroLowerBits = function(t, e) {
            return t & ~((1 << e) - 1)
        }, Ne.numCommonMostSigMantissaBits = function(t, e) {
            for (var n = 0, i = 52; i >= 0; i--) {
                if (Ne.getBit(t, i) !== Ne.getBit(e, i)) return n;
                n++
            }
            return 52
        }, e(Ce.prototype, {
            addCommonBits: function(t) {
                var e = new _e(this.commonCoord);
                t.apply(e), t.geometryChanged()
            },
            removeCommonBits: function(t) {
                if (0 === this.commonCoord.x && 0 === this.commonCoord.y) return t;
                var e = new g(this.commonCoord);
                e.x = -e.x, e.y = -e.y;
                var n = new _e(e);
                return t.apply(n), t.geometryChanged(), t
            },
            getCommonCoordinate: function() {
                return this.commonCoord
            },
            add: function(t) {
                t.apply(this.ccFilter), this.commonCoord = this.ccFilter.getCommonCoordinate()
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Ce
            }
        }), e(Le.prototype, {
            filter: function(t) {
                this.commonBitsX.add(t.x), this.commonBitsY.add(t.y)
            },
            getCommonCoordinate: function() {
                return new g(this.commonBitsX.getCommon(), this.commonBitsY.getCommon())
            },
            interfaces_: function() {
                return [q]
            },
            getClass: function() {
                return Le
            }
        }), e(_e.prototype, {
            filter: function(t, e) {
                var n = t.getOrdinate(e, 0) + this.trans.x,
                    i = t.getOrdinate(e, 1) + this.trans.y;
                t.setOrdinate(e, 0, n), t.setOrdinate(e, 1, i)
            },
            isDone: function() {
                return !1
            },
            isGeometryChanged: function() {
                return !0
            },
            interfaces_: function() {
                return [ct]
            },
            getClass: function() {
                return _e
            }
        }), Ce.CommonCoordinateFilter = Le, Ce.Translater = _e, e(Se.prototype, {
            next: function() {
                if (this.atStart) return this.atStart = !1, Se.isAtomic(this.parent) && this.index++, this.parent;
                if (null !== this.subcollectionIterator) {
                    if (this.subcollectionIterator.hasNext()) return this.subcollectionIterator.next();
                    this.subcollectionIterator = null
                }
                if (this.index >= this.max) throw new E;
                var t = this.parent.getGeometryN(this.index++);
                return t instanceof ft ? (this.subcollectionIterator = new Se(t), this.subcollectionIterator.next()) : t
            },
            remove: function() {
                throw new UnsupportedOperationException(this.getClass().getName())
            },
            hasNext: function() {
                if (this.atStart) return !0;
                if (null !== this.subcollectionIterator) {
                    if (this.subcollectionIterator.hasNext()) return !0;
                    this.subcollectionIterator = null
                }
                return !(this.index >= this.max)
            },
            interfaces_: function() {
                return [p]
            },
            getClass: function() {
                return Se
            }
        }), Se.isAtomic = function(t) {
            return !(t instanceof ft)
        }, e(we.prototype, {
            locateInternal: function() {
                if (arguments[0] instanceof g && arguments[1] instanceof bt) {
                    var t = arguments[0],
                        e = arguments[1];
                    if (e.isEmpty()) return S.EXTERIOR;
                    var n = e.getExteriorRing(),
                        i = this.locateInPolygonRing(t, n);
                    if (i === S.EXTERIOR) return S.EXTERIOR;
                    if (i === S.BOUNDARY) return S.BOUNDARY;
                    for (var r = 0; r < e.getNumInteriorRing(); r++) {
                        var s = e.getInteriorRingN(r),
                            o = this.locateInPolygonRing(t, s);
                        if (o === S.INTERIOR) return S.EXTERIOR;
                        if (o === S.BOUNDARY) return S.BOUNDARY
                    }
                    return S.INTERIOR
                }
                if (arguments[0] instanceof g && arguments[1] instanceof Lt) {
                    var a = arguments[0],
                        u = arguments[1];
                    if (!u.getEnvelopeInternal().intersects(a)) return S.EXTERIOR;
                    var l = u.getCoordinates();
                    return u.isClosed() || !a.equals(l[0]) && !a.equals(l[l.length - 1]) ? le.isOnLine(a, l) ? S.INTERIOR : S.EXTERIOR : S.BOUNDARY
                }
                if (arguments[0] instanceof g && arguments[1] instanceof St) {
                    var h = arguments[0];
                    return arguments[1].getCoordinate().equals2D(h) ? S.INTERIOR : S.EXTERIOR
                }
            },
            locateInPolygonRing: function(t, e) {
                return e.getEnvelopeInternal().intersects(t) ? le.locatePointInRing(t, e.getCoordinates()) : S.EXTERIOR
            },
            intersects: function(t, e) {
                return this.locate(t, e) !== S.EXTERIOR
            },
            updateLocationInfo: function(t) {
                t === S.INTERIOR && (this.isIn = !0), t === S.BOUNDARY && this.numBoundaries++
            },
            computeLocation: function(t, e) {
                if (e instanceof St && this.updateLocationInfo(this.locateInternal(t, e)), e instanceof Lt) this.updateLocationInfo(this.locateInternal(t, e));
                else if (e instanceof bt) this.updateLocationInfo(this.locateInternal(t, e));
                else if (e instanceof gt)
                    for (var n = e, i = 0; i < n.getNumGeometries(); i++) {
                        var r = n.getGeometryN(i);
                        this.updateLocationInfo(this.locateInternal(t, r))
                    } else if (e instanceof Tt)
                        for (var s = e, i = 0; i < s.getNumGeometries(); i++) {
                            var o = s.getGeometryN(i);
                            this.updateLocationInfo(this.locateInternal(t, o))
                        } else if (e instanceof ft)
                            for (var a = new Se(e); a.hasNext();) {
                                var u = a.next();
                                u !== e && this.computeLocation(t, u)
                            }
            },
            locate: function(t, e) {
                return e.isEmpty() ? S.EXTERIOR : e instanceof Lt ? this.locateInternal(t, e) : e instanceof bt ? this.locateInternal(t, e) : (this.isIn = !1, this.numBoundaries = 0, this.computeLocation(t, e), this.boundaryRule.isInBoundary(this.numBoundaries) ? S.BOUNDARY : this.numBoundaries > 0 || this.isIn ? S.INTERIOR : S.EXTERIOR)
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return we
            }
        }), e(be.prototype, {
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return be
            }
        }), be.octant = function() {
            if ("number" == typeof arguments[0] && "number" == typeof arguments[1]) {
                var t = arguments[0],
                    e = arguments[1];
                if (0 === t && 0 === e) throw new i("Cannot compute the octant for point ( " + t + ", " + e + " )");
                var n = Math.abs(t),
                    r = Math.abs(e);
                return t >= 0 ? e >= 0 ? n >= r ? 0 : 1 : n >= r ? 7 : 6 : e >= 0 ? n >= r ? 3 : 2 : n >= r ? 4 : 5
            }
            if (arguments[0] instanceof g && arguments[1] instanceof g) {
                var s = arguments[0],
                    o = arguments[1],
                    a = o.x - s.x,
                    u = o.y - s.y;
                if (0 === a && 0 === u) throw new i("Cannot compute the octant for two identical points " + s);
                return be.octant(a, u)
            }
        }, e(Re.prototype, {
            getCoordinates: function() {},
            size: function() {},
            getCoordinate: function(t) {},
            isClosed: function() {},
            setData: function(t) {},
            getData: function() {},
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Re
            }
        }), e(Me.prototype, {
            getCoordinates: function() {
                return this.pts
            },
            size: function() {
                return this.pts.length
            },
            getCoordinate: function(t) {
                return this.pts[t]
            },
            isClosed: function() {
                return this.pts[0].equals(this.pts[this.pts.length - 1])
            },
            getSegmentOctant: function(t) {
                return t === this.pts.length - 1 ? -1 : be.octant(this.getCoordinate(t), this.getCoordinate(t + 1))
            },
            setData: function(t) {
                this.data = t
            },
            getData: function() {
                return this.data
            },
            toString: function() {
                return re.toLineString(new kt(this.pts))
            },
            interfaces_: function() {
                return [Re]
            },
            getClass: function() {
                return Me
            }
        }), e(Te.prototype, {
            getBounds: function() {},
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Te
            }
        }), e(Pe.prototype, {
            getItem: function() {
                return this.item
            },
            getBounds: function() {
                return this.bounds
            },
            interfaces_: function() {
                return [Te, u]
            },
            getClass: function() {
                return Pe
            }
        }), e(Oe.prototype, {
            poll: function() {
                if (this.isEmpty()) return null;
                var t = this.items.get(1);
                return this.items.set(1, this.items.get(this._size)), this._size -= 1, this.reorder(1), t
            },
            size: function() {
                return this._size
            },
            reorder: function(t) {
                for (var e = null, n = this.items.get(t); 2 * t <= this._size && (e = 2 * t, e !== this._size && this.items.get(e + 1).compareTo(this.items.get(e)) < 0 && e++, this.items.get(e).compareTo(n) < 0); t = e) this.items.set(t, this.items.get(e));
                this.items.set(t, n)
            },
            clear: function() {
                this._size = 0, this.items.clear()
            },
            isEmpty: function() {
                return 0 === this._size
            },
            add: function(t) {
                this.items.add(null), this._size += 1;
                var e = this._size;
                for (this.items.set(0, t); t.compareTo(this.items.get(Math.trunc(e / 2))) < 0; e /= 2) this.items.set(e, this.items.get(Math.trunc(e / 2)));
                this.items.set(e, t)
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Oe
            }
        }), e(De.prototype, {
            visitItem: function(t) {},
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return De
            }
        }), e(Ae.prototype, {
            insert: function(t, e) {},
            remove: function(t, e) {},
            query: function() {
                1 === arguments.length ? arguments[0] : 2 === arguments.length && (arguments[0], arguments[1])
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Ae
            }
        }), e(Fe.prototype, {
            getLevel: function() {
                return this.level
            },
            size: function() {
                return this.childBoundables.size()
            },
            getChildBoundables: function() {
                return this.childBoundables
            },
            addChildBoundable: function(t) {
                f.isTrue(null === this.bounds), this.childBoundables.add(t)
            },
            isEmpty: function() {
                return this.childBoundables.isEmpty()
            },
            getBounds: function() {
                return null === this.bounds && (this.bounds = this.computeBounds()), this.bounds
            },
            interfaces_: function() {
                return [Te, u]
            },
            getClass: function() {
                return Fe
            }
        }), Fe.serialVersionUID = 0x5a1e55ec41369800;
        var uo = {
            reverseOrder: function() {
                return {
                    compare: function(t, e) {
                        return e.compareTo(t)
                    }
                }
            },
            min: function(t) {
                return uo.sort(t), t.get(0)
            },
            sort: function(t, e) {
                var n = t.toArray();
                e ? ut.sort(n, e) : ut.sort(n);
                for (var i = t.iterator(), r = 0, s = n.length; r < s; r++) i.next(), i.set(n[r])
            },
            singletonList: function(t) {
                var e = new I;
                return e.add(t), e
            }
        };
        e(ke.prototype, {
            expandToQueue: function(t, e) {
                var n = ke.isComposite(this.boundable1),
                    r = ke.isComposite(this.boundable2);
                if (n && r) return ke.area(this.boundable1) > ke.area(this.boundable2) ? (this.expand(this.boundable1, this.boundable2, t, e), null) : (this.expand(this.boundable2, this.boundable1, t, e), null);
                if (n) return this.expand(this.boundable1, this.boundable2, t, e), null;
                if (r) return this.expand(this.boundable2, this.boundable1, t, e), null;
                throw new i("neither boundable is composite")
            },
            isLeaves: function() {
                return !(ke.isComposite(this.boundable1) || ke.isComposite(this.boundable2))
            },
            compareTo: function(t) {
                var e = t;
                return this._distance < e._distance ? -1 : this._distance > e._distance ? 1 : 0
            },
            expand: function(t, e, n, i) {
                for (var r = t.getChildBoundables(), s = r.iterator(); s.hasNext();) {
                    var o = s.next(),
                        a = new ke(o, e, this.itemDistance);
                    a.getDistance() < i && n.add(a)
                }
            },
            getBoundable: function(t) {
                return 0 === t ? this.boundable1 : this.boundable2
            },
            getDistance: function() {
                return this._distance
            },
            distance: function() {
                return this.isLeaves() ? this.itemDistance.distance(this.boundable1, this.boundable2) : this.boundable1.getBounds().distance(this.boundable2.getBounds())
            },
            interfaces_: function() {
                return [s]
            },
            getClass: function() {
                return ke
            }
        }), ke.area = function(t) {
            return t.getBounds().getArea()
        }, ke.isComposite = function(t) {
            return t instanceof Fe
        }, e(Ge.prototype, {
            getNodeCapacity: function() {
                return this.nodeCapacity
            },
            lastNode: function(t) {
                return t.get(t.size() - 1)
            },
            size: function() {
                if (0 === arguments.length) return this.isEmpty() ? 0 : (this.build(), this.size(this.root));
                if (1 === arguments.length) {
                    for (var t = arguments[0], e = 0, n = t.getChildBoundables().iterator(); n.hasNext();) {
                        var i = n.next();
                        i instanceof Fe ? e += this.size(i) : i instanceof Pe && (e += 1)
                    }
                    return e
                }
            },
            removeItem: function(t, e) {
                for (var n = null, i = t.getChildBoundables().iterator(); i.hasNext();) {
                    var r = i.next();
                    r instanceof Pe && r.getItem() === e && (n = r)
                }
                return null !== n && (t.getChildBoundables().remove(n), !0)
            },
            itemsTree: function() {
                if (0 === arguments.length) {
                    this.build();
                    var t = this.itemsTree(this.root);
                    return null === t ? new I : t
                }
                if (1 === arguments.length) {
                    for (var e = arguments[0], n = new I, i = e.getChildBoundables().iterator(); i.hasNext();) {
                        var r = i.next();
                        if (r instanceof Fe) {
                            var s = this.itemsTree(r);
                            null !== s && n.add(s)
                        } else r instanceof Pe ? n.add(r.getItem()) : f.shouldNeverReachHere()
                    }
                    return n.size() <= 0 ? null : n
                }
            },
            insert: function(t, e) {
                f.isTrue(!this.built, "Cannot insert items into an STR packed R-tree after it has been built."), this.itemBoundables.add(new Pe(t, e))
            },
            boundablesAtLevel: function() {
                if (1 === arguments.length) {
                    var t = arguments[0],
                        e = new I;
                    return this.boundablesAtLevel(t, this.root, e), e
                }
                if (3 === arguments.length) {
                    var n = arguments[0],
                        i = arguments[1],
                        r = arguments[2];
                    if (f.isTrue(n > -2), i.getLevel() === n) return r.add(i), null;
                    for (var s = i.getChildBoundables().iterator(); s.hasNext();) {
                        var o = s.next();
                        o instanceof Fe ? this.boundablesAtLevel(n, o, r) : (f.isTrue(o instanceof Pe), -1 === n && r.add(o))
                    }
                    return null
                }
            },
            query: function() {
                if (1 === arguments.length) {
                    var t = arguments[0];
                    this.build();
                    var e = new I;
                    return this.isEmpty() ? e : (this.getIntersectsOp().intersects(this.root.getBounds(), t) && this.query(t, this.root, e), e)
                }
                if (2 === arguments.length) {
                    var n = arguments[0],
                        i = arguments[1];
                    if (this.build(), this.isEmpty()) return null;
                    this.getIntersectsOp().intersects(this.root.getBounds(), n) && this.query(n, this.root, i)
                } else if (3 === arguments.length)
                    if (w(arguments[2], De) && arguments[0] instanceof Object && arguments[1] instanceof Fe)
                        for (var r = arguments[0], s = arguments[1], o = arguments[2], a = s.getChildBoundables(), u = 0; u < a.size(); u++) {
                            var l = a.get(u);
                            this.getIntersectsOp().intersects(l.getBounds(), r) && (l instanceof Fe ? this.query(r, l, o) : l instanceof Pe ? o.visitItem(l.getItem()) : f.shouldNeverReachHere())
                        } else if (w(arguments[2], y) && arguments[0] instanceof Object && arguments[1] instanceof Fe)
                            for (var h = arguments[0], c = arguments[1], g = arguments[2], a = c.getChildBoundables(), u = 0; u < a.size(); u++) {
                                var l = a.get(u);
                                this.getIntersectsOp().intersects(l.getBounds(), h) && (l instanceof Fe ? this.query(h, l, g) : l instanceof Pe ? g.add(l.getItem()) : f.shouldNeverReachHere())
                            }
            },
            build: function() {
                return this.built ? null : (this.root = this.itemBoundables.isEmpty() ? this.createNode(0) : this.createHigherLevels(this.itemBoundables, -1), this.itemBoundables = null, void(this.built = !0))
            },
            getRoot: function() {
                return this.build(), this.root
            },
            remove: function() {
                if (2 === arguments.length) {
                    var t = arguments[0],
                        e = arguments[1];
                    return this.build(), !!this.getIntersectsOp().intersects(this.root.getBounds(), t) && this.remove(t, this.root, e)
                }
                if (3 === arguments.length) {
                    var n = arguments[0],
                        i = arguments[1],
                        r = arguments[2],
                        s = this.removeItem(i, r);
                    if (s) return !0;
                    for (var o = null, a = i.getChildBoundables().iterator(); a.hasNext();) {
                        var u = a.next();
                        if (this.getIntersectsOp().intersects(u.getBounds(), n) && u instanceof Fe && (s = this.remove(n, u, r))) {
                            o = u;
                            break
                        }
                    }
                    return null !== o && o.getChildBoundables().isEmpty() && i.getChildBoundables().remove(o), s
                }
            },
            createHigherLevels: function(t, e) {
                f.isTrue(!t.isEmpty());
                var n = this.createParentBoundables(t, e + 1);
                return 1 === n.size() ? n.get(0) : this.createHigherLevels(n, e + 1)
            },
            depth: function() {
                if (0 === arguments.length) return this.isEmpty() ? 0 : (this.build(), this.depth(this.root));
                if (1 === arguments.length) {
                    for (var t = arguments[0], e = 0, n = t.getChildBoundables().iterator(); n.hasNext();) {
                        var i = n.next();
                        if (i instanceof Fe) {
                            var r = this.depth(i);
                            r > e && (e = r)
                        }
                    }
                    return e + 1
                }
            },
            createParentBoundables: function(t, e) {
                f.isTrue(!t.isEmpty());
                var n = new I;
                n.add(this.createNode(e));
                var i = new I(t);
                uo.sort(i, this.getComparator());
                for (var r = i.iterator(); r.hasNext();) {
                    var s = r.next();
                    this.lastNode(n).getChildBoundables().size() === this.getNodeCapacity() && n.add(this.createNode(e)), this.lastNode(n).addChildBoundable(s)
                }
                return n
            },
            isEmpty: function() {
                return this.built ? this.root.isEmpty() : this.itemBoundables.isEmpty()
            },
            interfaces_: function() {
                return [u]
            },
            getClass: function() {
                return Ge
            }
        }), Ge.compareDoubles = function(t, e) {
            return t > e ? 1 : t < e ? -1 : 0
        }, Ge.IntersectsOp = Be, Ge.serialVersionUID = -0x35ef64c82d4c5400, Ge.DEFAULT_NODE_CAPACITY = 10, e(qe.prototype, {
            distance: function(t, e) {},
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return qe
            }
        }), h(ze, Ge), e(ze.prototype, {
            createParentBoundablesFromVerticalSlices: function(t, e) {
                f.isTrue(t.length > 0);
                for (var n = new I, i = 0; i < t.length; i++) n.addAll(this.createParentBoundablesFromVerticalSlice(t[i], e));
                return n
            },
            createNode: function(t) {
                return new Ve(t)
            },
            size: function() {
                return 0 === arguments.length ? Ge.prototype.size.call(this) : Ge.prototype.size.apply(this, arguments)
            },
            insert: function() {
                if (2 !== arguments.length) return Ge.prototype.insert.apply(this, arguments);
                var t = arguments[0],
                    e = arguments[1];
                return t.isNull() ? null : void Ge.prototype.insert.call(this, t, e)
            },
            getIntersectsOp: function() {
                return ze.intersectsOp
            },
            verticalSlices: function(t, e) {
                for (var n = Math.trunc(Math.ceil(t.size() / e)), i = new Array(e).fill(null), r = t.iterator(), s = 0; s < e; s++) {
                    i[s] = new I;
                    for (var o = 0; r.hasNext() && o < n;) {
                        var a = r.next();
                        i[s].add(a), o++
                    }
                }
                return i
            },
            query: function() {
                if (1 === arguments.length) {
                    var t = arguments[0];
                    return Ge.prototype.query.call(this, t)
                }
                if (2 === arguments.length) {
                    var e = arguments[0],
                        n = arguments[1];
                    Ge.prototype.query.call(this, e, n)
                } else if (3 === arguments.length)
                    if (w(arguments[2], De) && arguments[0] instanceof Object && arguments[1] instanceof Fe) {
                        var i = arguments[0],
                            r = arguments[1],
                            s = arguments[2];
                        Ge.prototype.query.call(this, i, r, s)
                    } else if (w(arguments[2], y) && arguments[0] instanceof Object && arguments[1] instanceof Fe) {
                    var o = arguments[0],
                        a = arguments[1],
                        u = arguments[2];
                    Ge.prototype.query.call(this, o, a, u)
                }
            },
            getComparator: function() {
                return ze.yComparator
            },
            createParentBoundablesFromVerticalSlice: function(t, e) {
                return Ge.prototype.createParentBoundables.call(this, t, e)
            },
            remove: function() {
                if (2 === arguments.length) {
                    var t = arguments[0],
                        e = arguments[1];
                    return Ge.prototype.remove.call(this, t, e)
                }
                return Ge.prototype.remove.apply(this, arguments)
            },
            depth: function() {
                return 0 === arguments.length ? Ge.prototype.depth.call(this) : Ge.prototype.depth.apply(this, arguments)
            },
            createParentBoundables: function(t, e) {
                f.isTrue(!t.isEmpty());
                var n = Math.trunc(Math.ceil(t.size() / this.getNodeCapacity())),
                    i = new I(t);
                uo.sort(i, ze.xComparator);
                var r = this.verticalSlices(i, Math.trunc(Math.ceil(Math.sqrt(n))));
                return this.createParentBoundablesFromVerticalSlices(r, e)
            },
            nearestNeighbour: function() {
                if (1 === arguments.length) {
                    if (w(arguments[0], qe)) {
                        var t = arguments[0],
                            e = new ke(this.getRoot(), this.getRoot(), t);
                        return this.nearestNeighbour(e)
                    }
                    if (arguments[0] instanceof ke) {
                        var n = arguments[0];
                        return this.nearestNeighbour(n, r.POSITIVE_INFINITY)
                    }
                } else if (2 === arguments.length) {
                    if (arguments[0] instanceof ze && w(arguments[1], qe)) {
                        var i = arguments[0],
                            s = arguments[1],
                            e = new ke(this.getRoot(), i.getRoot(), s);
                        return this.nearestNeighbour(e)
                    }
                    if (arguments[0] instanceof ke && "number" == typeof arguments[1]) {
                        var o = arguments[0],
                            a = arguments[1],
                            u = a,
                            l = null,
                            h = new Oe;
                        for (h.add(o); !h.isEmpty() && u > 0;) {
                            var c = h.poll(),
                                f = c.getDistance();
                            if (f >= u) break;
                            c.isLeaves() ? (u = f, l = c) : c.expandToQueue(h, u)
                        }
                        return [l.getBoundable(0).getItem(), l.getBoundable(1).getItem()]
                    }
                } else if (3 === arguments.length) {
                    var g = arguments[0],
                        d = arguments[1],
                        p = arguments[2],
                        m = new Pe(g, d),
                        e = new ke(this.getRoot(), m, p);
                    return this.nearestNeighbour(e)[0]
                }
            },
            interfaces_: function() {
                return [Ae, u]
            },
            getClass: function() {
                return ze
            }
        }), ze.centreX = function(t) {
            return ze.avg(t.getMinX(), t.getMaxX())
        }, ze.avg = function(t, e) {
            return (t + e) / 2
        }, ze.centreY = function(t) {
            return ze.avg(t.getMinY(), t.getMaxY())
        }, h(Ve, Fe), e(Ve.prototype, {
            computeBounds: function() {
                for (var t = null, e = this.getChildBoundables().iterator(); e.hasNext();) {
                    var n = e.next();
                    null === t ? t = new C(n.getBounds()) : t.expandToInclude(n.getBounds())
                }
                return t
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Ve
            }
        }), ze.STRtreeNode = Ve, ze.serialVersionUID = 0x39920f7d5f261e0, ze.xComparator = {
            interfaces_: function() {
                return [a]
            },
            compare: function(t, e) {
                return Ge.compareDoubles(ze.centreX(t.getBounds()), ze.centreX(e.getBounds()))
            }
        }, ze.yComparator = {
            interfaces_: function() {
                return [a]
            },
            compare: function(t, e) {
                return Ge.compareDoubles(ze.centreY(t.getBounds()), ze.centreY(e.getBounds()))
            }
        }, ze.intersectsOp = {
            interfaces_: function() {
                return [IntersectsOp]
            },
            intersects: function(t, e) {
                return t.intersects(e)
            }
        }, ze.DEFAULT_NODE_CAPACITY = 10, e(Ue.prototype, {
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Ue
            }
        }), Ue.relativeSign = function(t, e) {
            return t < e ? -1 : t > e ? 1 : 0
        }, Ue.compare = function(t, e, n) {
            if (e.equals2D(n)) return 0;
            var i = Ue.relativeSign(e.x, n.x),
                r = Ue.relativeSign(e.y, n.y);
            switch (t) {
                case 0:
                    return Ue.compareValue(i, r);
                case 1:
                    return Ue.compareValue(r, i);
                case 2:
                    return Ue.compareValue(r, -i);
                case 3:
                    return Ue.compareValue(-i, r);
                case 4:
                    return Ue.compareValue(-i, -r);
                case 5:
                    return Ue.compareValue(-r, -i);
                case 6:
                    return Ue.compareValue(-r, i);
                case 7:
                    return Ue.compareValue(i, -r)
            }
            return f.shouldNeverReachHere("invalid octant value"), 0
        }, Ue.compareValue = function(t, e) {
            return t < 0 ? -1 : t > 0 ? 1 : e < 0 ? -1 : e > 0 ? 1 : 0
        }, e(Ye.prototype, {
            getCoordinate: function() {
                return this.coord
            },
            print: function(t) {
                t.print(this.coord), t.print(" seg # = " + this.segmentIndex)
            },
            compareTo: function(t) {
                var e = t;
                return this.segmentIndex < e.segmentIndex ? -1 : this.segmentIndex > e.segmentIndex ? 1 : this.coord.equals2D(e.coord) ? 0 : Ue.compare(this.segmentOctant, this.coord, e.coord)
            },
            isEndPoint: function(t) {
                return 0 === this.segmentIndex && !this._isInterior || this.segmentIndex === t
            },
            isInterior: function() {
                return this._isInterior
            },
            interfaces_: function() {
                return [s]
            },
            getClass: function() {
                return Ye
            }
        }), e(Xe.prototype, {
            getSplitCoordinates: function() {
                var t = new N;
                this.addEndpoints();
                for (var e = this.iterator(), n = e.next(); e.hasNext();) {
                    var i = e.next();
                    this.addEdgeCoordinates(n, i, t), n = i
                }
                return t.toCoordinateArray()
            },
            addCollapsedNodes: function() {
                var t = new I;
                this.findCollapsesFromInsertedNodes(t), this.findCollapsesFromExistingVertices(t);
                for (var e = t.iterator(); e.hasNext();) {
                    var n = e.next().intValue();
                    this.add(this.edge.getCoordinate(n), n)
                }
            },
            print: function(t) {
                t.println("Intersections:");
                for (var e = this.iterator(); e.hasNext();) {
                    e.next().print(t)
                }
            },
            findCollapsesFromExistingVertices: function(t) {
                for (var e = 0; e < this.edge.size() - 2; e++) {
                    var n = this.edge.getCoordinate(e),
                        i = (this.edge.getCoordinate(e + 1), this.edge.getCoordinate(e + 2));
                    n.equals2D(i) && t.add(new M(e + 1))
                }
            },
            addEdgeCoordinates: function(t, e, n) {
                var i = e.segmentIndex - t.segmentIndex + 2,
                    r = this.edge.getCoordinate(e.segmentIndex),
                    s = e.isInterior() || !e.coord.equals2D(r);
                s || i--, n.add(new g(t.coord), !1);
                for (var o = t.segmentIndex + 1; o <= e.segmentIndex; o++) n.add(this.edge.getCoordinate(o));
                s && n.add(new g(e.coord))
            },
            iterator: function() {
                return this.nodeMap.values().iterator()
            },
            addSplitEdges: function(t) {
                this.addEndpoints(), this.addCollapsedNodes();
                for (var e = this.iterator(), n = e.next(); e.hasNext();) {
                    var i = e.next(),
                        r = this.createSplitEdge(n, i);
                    t.add(r), n = i
                }
            },
            findCollapseIndex: function(t, e, n) {
                if (!t.coord.equals2D(e.coord)) return !1;
                var i = e.segmentIndex - t.segmentIndex;
                return e.isInterior() || i--, 1 === i && (n[0] = t.segmentIndex + 1, !0)
            },
            findCollapsesFromInsertedNodes: function(t) {
                for (var e = new Array(1).fill(null), n = this.iterator(), i = n.next(); n.hasNext();) {
                    var r = n.next();
                    this.findCollapseIndex(i, r, e) && t.add(new M(e[0])), i = r
                }
            },
            getEdge: function() {
                return this.edge
            },
            addEndpoints: function() {
                var t = this.edge.size() - 1;
                this.add(this.edge.getCoordinate(0), 0), this.add(this.edge.getCoordinate(t), t)
            },
            createSplitEdge: function(t, e) {
                var n = e.segmentIndex - t.segmentIndex + 2,
                    i = this.edge.getCoordinate(e.segmentIndex),
                    r = e.isInterior() || !e.coord.equals2D(i);
                r || n--;
                var s = new Array(n).fill(null),
                    o = 0;
                s[o++] = new g(t.coord);
                for (var a = t.segmentIndex + 1; a <= e.segmentIndex; a++) s[o++] = this.edge.getCoordinate(a);
                return r && (s[o] = new g(e.coord)), new We(s, this.edge.getData())
            },
            add: function(t, e) {
                var n = new Ye(this.edge, t, e, this.edge.getSegmentOctant(e)),
                    i = this.nodeMap.get(n);
                return null !== i ? (f.isTrue(i.coord.equals2D(t), "Found equal nodes with different coordinates"), i) : (this.nodeMap.put(n, n), n)
            },
            checkSplitEdgesCorrectness: function(t) {
                var e = this.edge.getCoordinates(),
                    n = t.get(0),
                    i = n.getCoordinate(0);
                if (!i.equals2D(e[0])) throw new l("bad split edge start point at " + i);
                var r = t.get(t.size() - 1),
                    s = r.getCoordinates(),
                    o = s[s.length - 1];
                if (!o.equals2D(e[e.length - 1])) throw new l("bad split edge end point at " + o)
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Xe
            }
        }), e(He.prototype, {
            next: function() {
                return null === this.currNode ? (this.currNode = this.nextNode, this.currSegIndex = this.currNode.segmentIndex, this.readNextNode(), this.currNode) : null === this.nextNode ? null : this.nextNode.segmentIndex === this.currNode.segmentIndex ? (this.currNode = this.nextNode, this.currSegIndex = this.currNode.segmentIndex, this.readNextNode(), this.currNode) : (this.nextNode.segmentIndex, this.currNode.segmentIndex, null)
            },
            remove: function() {
                throw new UnsupportedOperationException(this.getClass().getName())
            },
            hasNext: function() {
                return null !== this.nextNode
            },
            readNextNode: function() {
                this.nodeIt.hasNext() ? this.nextNode = this.nodeIt.next() : this.nextNode = null
            },
            interfaces_: function() {
                return [p]
            },
            getClass: function() {
                return He
            }
        }), e(je.prototype, {
            addIntersection: function(t, e) {},
            interfaces_: function() {
                return [Re]
            },
            getClass: function() {
                return je
            }
        }), e(We.prototype, {
            getCoordinates: function() {
                return this.pts
            },
            size: function() {
                return this.pts.length
            },
            getCoordinate: function(t) {
                return this.pts[t]
            },
            isClosed: function() {
                return this.pts[0].equals(this.pts[this.pts.length - 1])
            },
            getSegmentOctant: function(t) {
                return t === this.pts.length - 1 ? -1 : this.safeOctant(this.getCoordinate(t), this.getCoordinate(t + 1))
            },
            setData: function(t) {
                this.data = t
            },
            safeOctant: function(t, e) {
                return t.equals2D(e) ? 0 : be.octant(t, e)
            },
            getData: function() {
                return this.data
            },
            addIntersection: function() {
                if (2 === arguments.length) {
                    var t = arguments[0],
                        e = arguments[1];
                    this.addIntersectionNode(t, e)
                } else if (4 === arguments.length) {
                    var n = arguments[0],
                        i = arguments[1],
                        r = (arguments[2], arguments[3]),
                        s = new g(n.getIntersection(r));
                    this.addIntersection(s, i)
                }
            },
            toString: function() {
                return re.toLineString(new kt(this.pts))
            },
            getNodeList: function() {
                return this.nodeList
            },
            addIntersectionNode: function(t, e) {
                var n = e,
                    i = n + 1;
                if (i < this.pts.length) {
                    var r = this.pts[i];
                    t.equals2D(r) && (n = i)
                }
                return this.nodeList.add(t, n)
            },
            addIntersections: function(t, e, n) {
                for (var i = 0; i < t.getIntersectionNum(); i++) this.addIntersection(t, e, n, i)
            },
            interfaces_: function() {
                return [je]
            },
            getClass: function() {
                return We
            }
        }), We.getNodedSubstrings = function() {
            if (1 === arguments.length) {
                var t = arguments[0],
                    e = new I;
                return We.getNodedSubstrings(t, e), e
            }
            if (2 === arguments.length)
                for (var n = arguments[0], i = arguments[1], r = n.iterator(); r.hasNext();) {
                    var s = r.next();
                    s.getNodeList().addSplitEdges(i)
                }
        }, e(Ke.prototype, {
            overlap: function() {
                if (2 === arguments.length) arguments[0], arguments[1];
                else if (4 === arguments.length) {
                    var t = arguments[0],
                        e = arguments[1],
                        n = arguments[2],
                        i = arguments[3];
                    t.getLineSegment(e, this.overlapSeg1), n.getLineSegment(i, this.overlapSeg2), this.overlap(this.overlapSeg1, this.overlapSeg2)
                }
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Ke
            }
        }), e(Je.prototype, {
            getLineSegment: function(t, e) {
                e.p0 = this.pts[t], e.p1 = this.pts[t + 1]
            },
            computeSelect: function(t, e, n, i) {
                var r = this.pts[e],
                    s = this.pts[n];
                if (i.tempEnv1.init(r, s), n - e == 1) return i.select(this, e), null;
                if (!t.intersects(i.tempEnv1)) return null;
                var o = Math.trunc((e + n) / 2);
                e < o && this.computeSelect(t, e, o, i), o < n && this.computeSelect(t, o, n, i)
            },
            getCoordinates: function() {
                for (var t = new Array(this.end - this.start + 1).fill(null), e = 0, n = this.start; n <= this.end; n++) t[e++] = this.pts[n];
                return t
            },
            computeOverlaps: function(t, e) {
                this.computeOverlapsInternal(this.start, this.end, t, t.start, t.end, e)
            },
            setId: function(t) {
                this.id = t
            },
            select: function(t, e) {
                this.computeSelect(t, this.start, this.end, e)
            },
            getEnvelope: function() {
                if (null === this.env) {
                    var t = this.pts[this.start],
                        e = this.pts[this.end];
                    this.env = new C(t, e)
                }
                return this.env
            },
            getEndIndex: function() {
                return this.end
            },
            getStartIndex: function() {
                return this.start
            },
            getContext: function() {
                return this.context
            },
            getId: function() {
                return this.id
            },
            computeOverlapsInternal: function(t, e, n, i, r, s) {
                var o = this.pts[t],
                    a = this.pts[e],
                    u = n.pts[i],
                    l = n.pts[r];
                if (e - t == 1 && r - i == 1) return s.overlap(this, t, n, i), null;
                if (s.tempEnv1.init(o, a), s.tempEnv2.init(u, l), !s.tempEnv1.intersects(s.tempEnv2)) return null;
                var h = Math.trunc((t + e) / 2),
                    c = Math.trunc((i + r) / 2);
                t < h && (i < c && this.computeOverlapsInternal(t, h, n, i, c, s), c < r && this.computeOverlapsInternal(t, h, n, c, r, s)), h < e && (i < c && this.computeOverlapsInternal(h, e, n, i, c, s), c < r && this.computeOverlapsInternal(h, e, n, c, r, s))
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Je
            }
        }), e(Ze.prototype, {
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Ze
            }
        }), Ze.isNorthern = function(t) {
            return t === Ze.NE || t === Ze.NW
        }, Ze.isOpposite = function(t, e) {
            return t !== e && 2 == (t - e + 4) % 4
        }, Ze.commonHalfPlane = function(t, e) {
            if (t === e) return t;
            if (2 == (t - e + 4) % 4) return -1;
            var n = t < e ? t : e,
                i = t > e ? t : e;
            return 0 === n && 3 === i ? 3 : n
        }, Ze.isInHalfPlane = function(t, e) {
            return e === Ze.SE ? t === Ze.SE || t === Ze.SW : t === e || t === e + 1
        }, Ze.quadrant = function() {
            if ("number" == typeof arguments[0] && "number" == typeof arguments[1]) {
                var t = arguments[0],
                    e = arguments[1];
                if (0 === t && 0 === e) throw new i("Cannot compute the quadrant for point ( " + t + ", " + e + " )");
                return t >= 0 ? e >= 0 ? Ze.NE : Ze.SE : e >= 0 ? Ze.NW : Ze.SW
            }
            if (arguments[0] instanceof g && arguments[1] instanceof g) {
                var n = arguments[0],
                    r = arguments[1];
                if (r.x === n.x && r.y === n.y) throw new i("Cannot compute the quadrant for two identical points " + n);
                return r.x >= n.x ? r.y >= n.y ? Ze.NE : Ze.SE : r.y >= n.y ? Ze.NW : Ze.SW
            }
        }, Ze.NE = 0, Ze.NW = 1, Ze.SW = 2, Ze.SE = 3, e(Qe.prototype, {
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Qe
            }
        }), Qe.getChainStartIndices = function(t) {
            var e = 0,
                n = new I;
            n.add(new M(e));
            do {
                var i = Qe.findChainEnd(t, e);
                n.add(new M(i)), e = i
            } while (e < t.length - 1);
            return Qe.toIntArray(n)
        }, Qe.findChainEnd = function(t, e) {
            for (var n = e; n < t.length - 1 && t[n].equals2D(t[n + 1]);) n++;
            if (n >= t.length - 1) return t.length - 1;
            for (var i = Ze.quadrant(t[n], t[n + 1]), r = e + 1; r < t.length;) {
                if (!t[r - 1].equals2D(t[r])) {
                    if (Ze.quadrant(t[r - 1], t[r]) !== i) break
                }
                r++
            }
            return r - 1
        }, Qe.getChains = function() {
            if (1 === arguments.length) {
                var t = arguments[0];
                return Qe.getChains(t, null)
            }
            if (2 === arguments.length) {
                for (var e = arguments[0], n = arguments[1], i = new I, r = Qe.getChainStartIndices(e), s = 0; s < r.length - 1; s++) {
                    var o = new Je(e, r[s], r[s + 1], n);
                    i.add(o)
                }
                return i
            }
        }, Qe.toIntArray = function(t) {
            for (var e = new Array(t.size()).fill(null), n = 0; n < e.length; n++) e[n] = t.get(n).intValue();
            return e
        }, e($e.prototype, {
            computeNodes: function(t) {},
            getNodedSubstrings: function() {},
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return $e
            }
        }), e(tn.prototype, {
            setSegmentIntersector: function(t) {
                this.segInt = t
            },
            interfaces_: function() {
                return [$e]
            },
            getClass: function() {
                return tn
            }
        }), h(en, tn), e(en.prototype, {
            getMonotoneChains: function() {
                return this.monoChains
            },
            getNodedSubstrings: function() {
                return We.getNodedSubstrings(this.nodedSegStrings)
            },
            getIndex: function() {
                return this.index
            },
            add: function(t) {
                for (var e = Qe.getChains(t.getCoordinates(), t), n = e.iterator(); n.hasNext();) {
                    var i = n.next();
                    i.setId(this.idCounter++), this.index.insert(i.getEnvelope(), i), this.monoChains.add(i)
                }
            },
            computeNodes: function(t) {
                this.nodedSegStrings = t;
                for (var e = t.iterator(); e.hasNext();) this.add(e.next());
                this.intersectChains()
            },
            intersectChains: function() {
                for (var t = new nn(this.segInt), e = this.monoChains.iterator(); e.hasNext();)
                    for (var n = e.next(), i = this.index.query(n.getEnvelope()), r = i.iterator(); r.hasNext();) {
                        var s = r.next();
                        if (s.getId() > n.getId() && (n.computeOverlaps(s, t), this.nOverlaps++), this.segInt.isDone()) return null
                    }
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return en
            }
        }), h(nn, Ke), e(nn.prototype, {
            overlap: function() {
                if (4 !== arguments.length) return Ke.prototype.overlap.apply(this, arguments);
                var t = arguments[0],
                    e = arguments[1],
                    n = arguments[2],
                    i = arguments[3],
                    r = t.getContext(),
                    s = n.getContext();
                this.si.processIntersections(r, e, s, i)
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return nn
            }
        }), en.SegmentOverlapAction = nn, h(rn, l), e(rn.prototype, {
            getCoordinate: function() {
                return this.pt
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return rn
            }
        }), rn.msgWithCoord = function(t, e) {
            return null !== e ? t + " [ " + e + " ]" : t
        }, e(sn.prototype, {
            processIntersections: function(t, e, n, i) {},
            isDone: function() {},
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return sn
            }
        }), e(on.prototype, {
            getInteriorIntersection: function() {
                return this.interiorIntersection
            },
            setCheckEndSegmentsOnly: function(t) {
                this.isCheckEndSegmentsOnly = t
            },
            getIntersectionSegments: function() {
                return this.intSegments
            },
            count: function() {
                return this.intersectionCount
            },
            getIntersections: function() {
                return this.intersections
            },
            setFindAllIntersections: function(t) {
                this.findAllIntersections = t
            },
            setKeepIntersections: function(t) {
                this.keepIntersections = t
            },
            processIntersections: function(t, e, n, i) {
                if (!this.findAllIntersections && this.hasIntersection()) return null;
                if (t === n && e === i) return null;
                if (this.isCheckEndSegmentsOnly) {
                    if (!(this.isEndSegment(t, e) || this.isEndSegment(n, i))) return null
                }
                var r = t.getCoordinates()[e],
                    s = t.getCoordinates()[e + 1],
                    o = n.getCoordinates()[i],
                    a = n.getCoordinates()[i + 1];
                this.li.computeIntersection(r, s, o, a), this.li.hasIntersection() && this.li.isInteriorIntersection() && (this.intSegments = new Array(4).fill(null), this.intSegments[0] = r, this.intSegments[1] = s, this.intSegments[2] = o, this.intSegments[3] = a, this.interiorIntersection = this.li.getIntersection(0), this.keepIntersections && this.intersections.add(this.interiorIntersection), this.intersectionCount++)
            },
            isEndSegment: function(t, e) {
                return 0 === e || e >= t.size() - 2
            },
            hasIntersection: function() {
                return null !== this.interiorIntersection
            },
            isDone: function() {
                return !this.findAllIntersections && null !== this.interiorIntersection
            },
            interfaces_: function() {
                return [sn]
            },
            getClass: function() {
                return on
            }
        }), on.createAllIntersectionsFinder = function(t) {
            var e = new on(t);
            return e.setFindAllIntersections(!0), e
        }, on.createAnyIntersectionFinder = function(t) {
            return new on(t)
        }, on.createIntersectionCounter = function(t) {
            var e = new on(t);
            return e.setFindAllIntersections(!0), e.setKeepIntersections(!1), e
        }, e(an.prototype, {
            execute: function() {
                return null !== this.segInt ? null : void this.checkInteriorIntersections()
            },
            getIntersections: function() {
                return this.segInt.getIntersections()
            },
            isValid: function() {
                return this.execute(), this._isValid
            },
            setFindAllIntersections: function(t) {
                this.findAllIntersections = t
            },
            checkInteriorIntersections: function() {
                this._isValid = !0, this.segInt = new on(this.li), this.segInt.setFindAllIntersections(this.findAllIntersections);
                var t = new en;
                if (t.setSegmentIntersector(this.segInt), t.computeNodes(this.segStrings), this.segInt.hasIntersection()) return this._isValid = !1, null
            },
            checkValid: function() {
                if (this.execute(), !this._isValid) throw new rn(this.getErrorMessage(), this.segInt.getInteriorIntersection())
            },
            getErrorMessage: function() {
                if (this._isValid) return "no intersections found";
                var t = this.segInt.getIntersectionSegments();
                return "found non-noded intersection between " + re.toLineString(t[0], t[1]) + " and " + re.toLineString(t[2], t[3])
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return an
            }
        }), an.computeIntersections = function(t) {
            var e = new an(t);
            return e.setFindAllIntersections(!0), e.isValid(), e.getIntersections()
        }, e(un.prototype, {
            checkValid: function() {
                this.nv.checkValid()
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return un
            }
        }), un.toSegmentStrings = function(t) {
            for (var e = new I, n = t.iterator(); n.hasNext();) {
                var i = n.next();
                e.add(new Me(i.getCoordinates(), i))
            }
            return e
        }, un.checkValid = function(t) {
            new un(t).checkValid()
        }, e(ln.prototype, {
            map: function(t) {
                for (var e = new I, n = 0; n < t.getNumGeometries(); n++) {
                    var i = this.mapOp.map(t.getGeometryN(n));
                    i.isEmpty() || e.add(i)
                }
                return t.getFactory().createGeometryCollection(ne.toGeometryArray(e))
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return ln
            }
        }), ln.map = function(t, e) {
            return new ln(e).map(t)
        }, e(hn.prototype, {
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return hn
            }
        }), hn.opposite = function(t) {
            return t === hn.LEFT ? hn.RIGHT : t === hn.RIGHT ? hn.LEFT : t
        }, hn.ON = 0, hn.LEFT = 1, hn.RIGHT = 2, e(cn.prototype, {
            setAllLocations: function(t) {
                for (var e = 0; e < this.location.length; e++) this.location[e] = t
            },
            isNull: function() {
                for (var t = 0; t < this.location.length; t++)
                    if (this.location[t] !== S.NONE) return !1;
                return !0
            },
            setAllLocationsIfNull: function(t) {
                for (var e = 0; e < this.location.length; e++) this.location[e] === S.NONE && (this.location[e] = t)
            },
            isLine: function() {
                return 1 === this.location.length
            },
            merge: function(t) {
                if (t.location.length > this.location.length) {
                    var e = new Array(3).fill(null);
                    e[hn.ON] = this.location[hn.ON], e[hn.LEFT] = S.NONE, e[hn.RIGHT] = S.NONE, this.location = e
                }
                for (var n = 0; n < this.location.length; n++) this.location[n] === S.NONE && n < t.location.length && (this.location[n] = t.location[n])
            },
            getLocations: function() {
                return this.location
            },
            flip: function() {
                if (this.location.length <= 1) return null;
                var t = this.location[hn.LEFT];
                this.location[hn.LEFT] = this.location[hn.RIGHT], this.location[hn.RIGHT] = t
            },
            toString: function() {
                var t = new R;
                return this.location.length > 1 && t.append(S.toLocationSymbol(this.location[hn.LEFT])), t.append(S.toLocationSymbol(this.location[hn.ON])), this.location.length > 1 && t.append(S.toLocationSymbol(this.location[hn.RIGHT])), t.toString()
            },
            setLocations: function(t, e, n) {
                this.location[hn.ON] = t, this.location[hn.LEFT] = e, this.location[hn.RIGHT] = n
            },
            get: function(t) {
                return t < this.location.length ? this.location[t] : S.NONE
            },
            isArea: function() {
                return this.location.length > 1
            },
            isAnyNull: function() {
                for (var t = 0; t < this.location.length; t++)
                    if (this.location[t] === S.NONE) return !0;
                return !1
            },
            setLocation: function() {
                if (1 === arguments.length) {
                    var t = arguments[0];
                    this.setLocation(hn.ON, t)
                } else if (2 === arguments.length) {
                    var e = arguments[0],
                        n = arguments[1];
                    this.location[e] = n
                }
            },
            init: function(t) {
                this.location = new Array(t).fill(null), this.setAllLocations(S.NONE)
            },
            isEqualOnSide: function(t, e) {
                return this.location[e] === t.location[e]
            },
            allPositionsEqual: function(t) {
                for (var e = 0; e < this.location.length; e++)
                    if (this.location[e] !== t) return !1;
                return !0
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return cn
            }
        }), e(fn.prototype, {
            getGeometryCount: function() {
                var t = 0;
                return this.elt[0].isNull() || t++, this.elt[1].isNull() || t++, t
            },
            setAllLocations: function(t, e) {
                this.elt[t].setAllLocations(e)
            },
            isNull: function(t) {
                return this.elt[t].isNull()
            },
            setAllLocationsIfNull: function() {
                if (1 === arguments.length) {
                    var t = arguments[0];
                    this.setAllLocationsIfNull(0, t), this.setAllLocationsIfNull(1, t)
                } else if (2 === arguments.length) {
                    var e = arguments[0],
                        n = arguments[1];
                    this.elt[e].setAllLocationsIfNull(n)
                }
            },
            isLine: function(t) {
                return this.elt[t].isLine()
            },
            merge: function(t) {
                for (var e = 0; e < 2; e++) null === this.elt[e] && null !== t.elt[e] ? this.elt[e] = new cn(t.elt[e]) : this.elt[e].merge(t.elt[e])
            },
            flip: function() {
                this.elt[0].flip(), this.elt[1].flip()
            },
            getLocation: function() {
                if (1 === arguments.length) {
                    var t = arguments[0];
                    return this.elt[t].get(hn.ON)
                }
                if (2 === arguments.length) {
                    var e = arguments[0],
                        n = arguments[1];
                    return this.elt[e].get(n)
                }
            },
            toString: function() {
                var t = new R;
                return null !== this.elt[0] && (t.append("A:"), t.append(this.elt[0].toString())), null !== this.elt[1] && (t.append(" B:"), t.append(this.elt[1].toString())), t.toString()
            },
            isArea: function() {
                if (0 === arguments.length) return this.elt[0].isArea() || this.elt[1].isArea();
                if (1 === arguments.length) {
                    var t = arguments[0];
                    return this.elt[t].isArea()
                }
            },
            isAnyNull: function(t) {
                return this.elt[t].isAnyNull()
            },
            setLocation: function() {
                if (2 === arguments.length) {
                    var t = arguments[0],
                        e = arguments[1];
                    this.elt[t].setLocation(hn.ON, e)
                } else if (3 === arguments.length) {
                    var n = arguments[0],
                        i = arguments[1],
                        r = arguments[2];
                    this.elt[n].setLocation(i, r)
                }
            },
            isEqualOnSide: function(t, e) {
                return this.elt[0].isEqualOnSide(t.elt[0], e) && this.elt[1].isEqualOnSide(t.elt[1], e)
            },
            allPositionsEqual: function(t, e) {
                return this.elt[t].allPositionsEqual(e)
            },
            toLine: function(t) {
                this.elt[t].isArea() && (this.elt[t] = new cn(this.elt[t].location[0]))
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return fn
            }
        }), fn.toLineLabel = function(t) {
            for (var e = new fn(S.NONE), n = 0; n < 2; n++) e.setLocation(n, t.getLocation(n));
            return e
        }, e(gn.prototype, {
            computeRing: function() {
                if (null !== this.ring) return null;
                for (var t = new Array(this.pts.size()).fill(null), e = 0; e < this.pts.size(); e++) t[e] = this.pts.get(e);
                this.ring = this.geometryFactory.createLinearRing(t), this._isHole = le.isCCW(this.ring.getCoordinates())
            },
            isIsolated: function() {
                return 1 === this.label.getGeometryCount()
            },
            computePoints: function(t) {
                this.startDe = t;
                var e = t,
                    n = !0;
                do {
                    if (null === e) throw new rn("Found null DirectedEdge");
                    if (e.getEdgeRing() === this) throw new rn("Directed Edge visited twice during ring-building at " + e.getCoordinate());
                    this.edges.add(e);
                    var i = e.getLabel();
                    f.isTrue(i.isArea()), this.mergeLabel(i), this.addPoints(e.getEdge(), e.isForward(), n), n = !1, this.setEdgeRing(e, this), e = this.getNext(e)
                } while (e !== this.startDe)
            },
            getLinearRing: function() {
                return this.ring
            },
            getCoordinate: function(t) {
                return this.pts.get(t)
            },
            computeMaxNodeDegree: function() {
                this.maxNodeDegree = 0;
                var t = this.startDe;
                do {
                    var e = t.getNode(),
                        n = e.getEdges().getOutgoingDegree(this);
                    n > this.maxNodeDegree && (this.maxNodeDegree = n), t = this.getNext(t)
                } while (t !== this.startDe);
                this.maxNodeDegree *= 2
            },
            addPoints: function(t, e, n) {
                var i = t.getCoordinates();
                if (e) {
                    var r = 1;
                    n && (r = 0);
                    for (var s = r; s < i.length; s++) this.pts.add(i[s])
                } else {
                    var r = i.length - 2;
                    n && (r = i.length - 1);
                    for (var s = r; s >= 0; s--) this.pts.add(i[s])
                }
            },
            isHole: function() {
                return this._isHole
            },
            setInResult: function() {
                var t = this.startDe;
                do {
                    t.getEdge().setInResult(!0), t = t.getNext()
                } while (t !== this.startDe)
            },
            containsPoint: function(t) {
                var e = this.getLinearRing();
                if (!e.getEnvelopeInternal().contains(t)) return !1;
                if (!le.isPointInRing(t, e.getCoordinates())) return !1;
                for (var n = this.holes.iterator(); n.hasNext();) {
                    if (n.next().containsPoint(t)) return !1
                }
                return !0
            },
            addHole: function(t) {
                this.holes.add(t)
            },
            isShell: function() {
                return null === this.shell
            },
            getLabel: function() {
                return this.label
            },
            getEdges: function() {
                return this.edges
            },
            getMaxNodeDegree: function() {
                return this.maxNodeDegree < 0 && this.computeMaxNodeDegree(), this.maxNodeDegree
            },
            getShell: function() {
                return this.shell
            },
            mergeLabel: function() {
                if (1 === arguments.length) {
                    var t = arguments[0];
                    this.mergeLabel(t, 0), this.mergeLabel(t, 1)
                } else if (2 === arguments.length) {
                    var e = arguments[0],
                        n = arguments[1],
                        i = e.getLocation(n, hn.RIGHT);
                    if (i === S.NONE) return null;
                    if (this.label.getLocation(n) === S.NONE) return this.label.setLocation(n, i), null
                }
            },
            setShell: function(t) {
                this.shell = t, null !== t && t.addHole(this)
            },
            toPolygon: function(t) {
                for (var e = new Array(this.holes.size()).fill(null), n = 0; n < this.holes.size(); n++) e[n] = this.holes.get(n).getLinearRing();
                return t.createPolygon(this.getLinearRing(), e)
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return gn
            }
        }), h(dn, gn), e(dn.prototype, {
            setEdgeRing: function(t, e) {
                t.setMinEdgeRing(e)
            },
            getNext: function(t) {
                return t.getNextMin()
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return dn
            }
        }), h(pn, gn), e(pn.prototype, {
            buildMinimalRings: function() {
                var t = new I,
                    e = this.startDe;
                do {
                    if (null === e.getMinEdgeRing()) {
                        var n = new dn(e, this.geometryFactory);
                        t.add(n)
                    }
                    e = e.getNext()
                } while (e !== this.startDe);
                return t
            },
            setEdgeRing: function(t, e) {
                t.setEdgeRing(e)
            },
            linkDirectedEdgesForMinimalEdgeRings: function() {
                var t = this.startDe;
                do {
                    t.getNode().getEdges().linkMinimalDirectedEdges(this), t = t.getNext()
                } while (t !== this.startDe)
            },
            getNext: function(t) {
                return t.getNext()
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return pn
            }
        }), e(mn.prototype, {
            setVisited: function(t) {
                this._isVisited = t
            },
            setInResult: function(t) {
                this._isInResult = t
            },
            isCovered: function() {
                return this._isCovered
            },
            isCoveredSet: function() {
                return this._isCoveredSet
            },
            setLabel: function(t) {
                this.label = t
            },
            getLabel: function() {
                return this.label
            },
            setCovered: function(t) {
                this._isCovered = t, this._isCoveredSet = !0
            },
            updateIM: function(t) {
                f.isTrue(this.label.getGeometryCount() >= 2, "found partial label"), this.computeIM(t)
            },
            isInResult: function() {
                return this._isInResult
            },
            isVisited: function() {
                return this._isVisited
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return mn
            }
        }), h(vn, mn), e(vn.prototype, {
            isIncidentEdgeInResult: function() {
                for (var t = this.getEdges().getEdges().iterator(); t.hasNext();) {
                    if (t.next().getEdge().isInResult()) return !0
                }
                return !1
            },
            isIsolated: function() {
                return 1 === this.label.getGeometryCount()
            },
            getCoordinate: function() {
                return this.coord
            },
            print: function(t) {
                t.println("node " + this.coord + " lbl: " + this.label)
            },
            computeIM: function(t) {},
            computeMergedLocation: function(t, e) {
                var n = S.NONE;
                if (n = this.label.getLocation(e), !t.isNull(e)) {
                    var i = t.getLocation(e);
                    n !== S.BOUNDARY && (n = i)
                }
                return n
            },
            setLabel: function() {
                if (2 !== arguments.length) return mn.prototype.setLabel.apply(this, arguments);
                var t = arguments[0],
                    e = arguments[1];
                null === this.label ? this.label = new fn(t, e) : this.label.setLocation(t, e)
            },
            getEdges: function() {
                return this.edges
            },
            mergeLabel: function() {
                if (arguments[0] instanceof vn) {
                    var t = arguments[0];
                    this.mergeLabel(t.label)
                } else if (arguments[0] instanceof fn)
                    for (var e = arguments[0], n = 0; n < 2; n++) {
                        var i = this.computeMergedLocation(e, n),
                            r = this.label.getLocation(n);
                        r === S.NONE && this.label.setLocation(n, i)
                    }
            },
            add: function(t) {
                this.edges.insert(t), t.setNode(this)
            },
            setLabelBoundary: function(t) {
                if (null === this.label) return null;
                var e = S.NONE;
                null !== this.label && (e = this.label.getLocation(t));
                var n = null;
                switch (e) {
                    case S.BOUNDARY:
                        n = S.INTERIOR;
                        break;
                    case S.INTERIOR:
                        n = S.BOUNDARY;
                        break;
                    default:
                        n = S.BOUNDARY
                }
                this.label.setLocation(t, n)
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return vn
            }
        }), e(yn.prototype, {
            find: function(t) {
                return this.nodeMap.get(t)
            },
            addNode: function() {
                if (arguments[0] instanceof g) {
                    var t = arguments[0],
                        e = this.nodeMap.get(t);
                    return null === e && (e = this.nodeFact.createNode(t), this.nodeMap.put(t, e)), e
                }
                if (arguments[0] instanceof vn) {
                    var n = arguments[0],
                        e = this.nodeMap.get(n.getCoordinate());
                    return null === e ? (this.nodeMap.put(n.getCoordinate(), n), n) : (e.mergeLabel(n), e)
                }
            },
            print: function(t) {
                for (var e = this.iterator(); e.hasNext();) {
                    e.next().print(t)
                }
            },
            iterator: function() {
                return this.nodeMap.values().iterator()
            },
            values: function() {
                return this.nodeMap.values()
            },
            getBoundaryNodes: function(t) {
                for (var e = new I, n = this.iterator(); n.hasNext();) {
                    var i = n.next();
                    i.getLabel().getLocation(t) === S.BOUNDARY && e.add(i)
                }
                return e
            },
            add: function(t) {
                var e = t.getCoordinate();
                this.addNode(e).add(t)
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return yn
            }
        }), e(En.prototype, {
            compareDirection: function(t) {
                return this.dx === t.dx && this.dy === t.dy ? 0 : this.quadrant > t.quadrant ? 1 : this.quadrant < t.quadrant ? -1 : le.computeOrientation(t.p0, t.p1, this.p1)
            },
            getDy: function() {
                return this.dy
            },
            getCoordinate: function() {
                return this.p0
            },
            setNode: function(t) {
                this.node = t
            },
            print: function(t) {
                var e = Math.atan2(this.dy, this.dx),
                    n = this.getClass().getName(),
                    i = n.lastIndexOf("."),
                    r = n.substring(i + 1);
                t.print("  " + r + ": " + this.p0 + " - " + this.p1 + " " + this.quadrant + ":" + e + "   " + this.label)
            },
            compareTo: function(t) {
                var e = t;
                return this.compareDirection(e)
            },
            getDirectedCoordinate: function() {
                return this.p1
            },
            getDx: function() {
                return this.dx
            },
            getLabel: function() {
                return this.label
            },
            getEdge: function() {
                return this.edge
            },
            getQuadrant: function() {
                return this.quadrant
            },
            getNode: function() {
                return this.node
            },
            toString: function() {
                var t = Math.atan2(this.dy, this.dx),
                    e = this.getClass().getName(),
                    n = e.lastIndexOf(".");
                return "  " + e.substring(n + 1) + ": " + this.p0 + " - " + this.p1 + " " + this.quadrant + ":" + t + "   " + this.label
            },
            computeLabel: function(t) {},
            init: function(t, e) {
                this.p0 = t, this.p1 = e, this.dx = e.x - t.x, this.dy = e.y - t.y, this.quadrant = Ze.quadrant(this.dx, this.dy), f.isTrue(!(0 === this.dx && 0 === this.dy), "EdgeEnd with identical endpoints found")
            },
            interfaces_: function() {
                return [s]
            },
            getClass: function() {
                return En
            }
        }), h(xn, En), e(xn.prototype, {
            getNextMin: function() {
                return this.nextMin
            },
            getDepth: function(t) {
                return this.depth[t]
            },
            setVisited: function(t) {
                this._isVisited = t
            },
            computeDirectedLabel: function() {
                this.label = new fn(this.edge.getLabel()), this._isForward || this.label.flip()
            },
            getNext: function() {
                return this.next
            },
            setDepth: function(t, e) {
                if (-999 !== this.depth[t] && this.depth[t] !== e) throw new rn("assigned depths do not match", this.getCoordinate());
                this.depth[t] = e
            },
            isInteriorAreaEdge: function() {
                for (var t = !0, e = 0; e < 2; e++) this.label.isArea(e) && this.label.getLocation(e, hn.LEFT) === S.INTERIOR && this.label.getLocation(e, hn.RIGHT) === S.INTERIOR || (t = !1);
                return t
            },
            setNextMin: function(t) {
                this.nextMin = t
            },
            print: function(t) {
                En.prototype.print.call(this, t), t.print(" " + this.depth[hn.LEFT] + "/" + this.depth[hn.RIGHT]), t.print(" (" + this.getDepthDelta() + ")"), this._isInResult && t.print(" inResult")
            },
            setMinEdgeRing: function(t) {
                this.minEdgeRing = t
            },
            isLineEdge: function() {
                var t = this.label.isLine(0) || this.label.isLine(1),
                    e = !this.label.isArea(0) || this.label.allPositionsEqual(0, S.EXTERIOR),
                    n = !this.label.isArea(1) || this.label.allPositionsEqual(1, S.EXTERIOR);
                return t && e && n
            },
            setEdgeRing: function(t) {
                this.edgeRing = t
            },
            getMinEdgeRing: function() {
                return this.minEdgeRing
            },
            getDepthDelta: function() {
                var t = this.edge.getDepthDelta();
                return this._isForward || (t = -t), t
            },
            setInResult: function(t) {
                this._isInResult = t
            },
            getSym: function() {
                return this.sym
            },
            isForward: function() {
                return this._isForward
            },
            getEdge: function() {
                return this.edge
            },
            printEdge: function(t) {
                this.print(t), t.print(" "), this._isForward ? this.edge.print(t) : this.edge.printReverse(t)
            },
            setSym: function(t) {
                this.sym = t
            },
            setVisitedEdge: function(t) {
                this.setVisited(t), this.sym.setVisited(t)
            },
            setEdgeDepths: function(t, e) {
                var n = this.getEdge().getDepthDelta();
                this._isForward || (n = -n);
                var i = 1;
                t === hn.LEFT && (i = -1);
                var r = hn.opposite(t),
                    s = n * i,
                    o = e + s;
                this.setDepth(t, e), this.setDepth(r, o)
            },
            getEdgeRing: function() {
                return this.edgeRing
            },
            isInResult: function() {
                return this._isInResult
            },
            setNext: function(t) {
                this.next = t
            },
            isVisited: function() {
                return this._isVisited
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return xn
            }
        }), xn.depthFactor = function(t, e) {
            return t === S.EXTERIOR && e === S.INTERIOR ? 1 : t === S.INTERIOR && e === S.EXTERIOR ? -1 : 0
        }, e(In.prototype, {
            createNode: function(t) {
                return new vn(t, null)
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return In
            }
        }), e(Nn.prototype, {
            printEdges: function(t) {
                t.println("Edges:");
                for (var e = 0; e < this.edges.size(); e++) {
                    t.println("edge " + e + ":");
                    var n = this.edges.get(e);
                    n.print(t), n.eiList.print(t)
                }
            },
            find: function(t) {
                return this.nodes.find(t)
            },
            addNode: function() {
                if (arguments[0] instanceof vn) {
                    var t = arguments[0];
                    return this.nodes.addNode(t)
                }
                if (arguments[0] instanceof g) {
                    var e = arguments[0];
                    return this.nodes.addNode(e)
                }
            },
            getNodeIterator: function() {
                return this.nodes.iterator()
            },
            linkResultDirectedEdges: function() {
                for (var t = this.nodes.iterator(); t.hasNext();) {
                    t.next().getEdges().linkResultDirectedEdges()
                }
            },
            debugPrintln: function(t) {
                A.out.println(t)
            },
            isBoundaryNode: function(t, e) {
                var n = this.nodes.find(e);
                if (null === n) return !1;
                var i = n.getLabel();
                return null !== i && i.getLocation(t) === S.BOUNDARY
            },
            linkAllDirectedEdges: function() {
                for (var t = this.nodes.iterator(); t.hasNext();) {
                    t.next().getEdges().linkAllDirectedEdges()
                }
            },
            matchInSameDirection: function(t, e, n, i) {
                return !!t.equals(n) && le.computeOrientation(t, e, i) === le.COLLINEAR && Ze.quadrant(t, e) === Ze.quadrant(n, i)
            },
            getEdgeEnds: function() {
                return this.edgeEndList
            },
            debugPrint: function(t) {
                A.out.print(t)
            },
            getEdgeIterator: function() {
                return this.edges.iterator()
            },
            findEdgeInSameDirection: function(t, e) {
                for (var n = 0; n < this.edges.size(); n++) {
                    var i = this.edges.get(n),
                        r = i.getCoordinates();
                    if (this.matchInSameDirection(t, e, r[0], r[1])) return i;
                    if (this.matchInSameDirection(t, e, r[r.length - 1], r[r.length - 2])) return i
                }
                return null
            },
            insertEdge: function(t) {
                this.edges.add(t)
            },
            findEdgeEnd: function(t) {
                for (var e = this.getEdgeEnds().iterator(); e.hasNext();) {
                    var n = e.next();
                    if (n.getEdge() === t) return n
                }
                return null
            },
            addEdges: function(t) {
                for (var e = t.iterator(); e.hasNext();) {
                    var n = e.next();
                    this.edges.add(n);
                    var i = new xn(n, !0),
                        r = new xn(n, !1);
                    i.setSym(r), r.setSym(i), this.add(i), this.add(r)
                }
            },
            add: function(t) {
                this.nodes.add(t), this.edgeEndList.add(t)
            },
            getNodes: function() {
                return this.nodes.values()
            },
            findEdge: function(t, e) {
                for (var n = 0; n < this.edges.size(); n++) {
                    var i = this.edges.get(n),
                        r = i.getCoordinates();
                    if (t.equals(r[0]) && e.equals(r[1])) return i
                }
                return null
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Nn
            }
        }), Nn.linkResultDirectedEdges = function(t) {
            for (var e = t.iterator(); e.hasNext();) {
                e.next().getEdges().linkResultDirectedEdges()
            }
        }, e(Cn.prototype, {
            sortShellsAndHoles: function(t, e, n) {
                for (var i = t.iterator(); i.hasNext();) {
                    var r = i.next();
                    r.isHole() ? n.add(r) : e.add(r)
                }
            },
            computePolygons: function(t) {
                for (var e = new I, n = t.iterator(); n.hasNext();) {
                    var i = n.next(),
                        r = i.toPolygon(this.geometryFactory);
                    e.add(r)
                }
                return e
            },
            placeFreeHoles: function(t, e) {
                for (var n = e.iterator(); n.hasNext();) {
                    var i = n.next();
                    if (null === i.getShell()) {
                        var r = this.findEdgeRingContaining(i, t);
                        if (null === r) throw new rn("unable to assign hole to a shell", i.getCoordinate(0));
                        i.setShell(r)
                    }
                }
            },
            buildMinimalEdgeRings: function(t, e, n) {
                for (var i = new I, r = t.iterator(); r.hasNext();) {
                    var s = r.next();
                    if (s.getMaxNodeDegree() > 2) {
                        s.linkDirectedEdgesForMinimalEdgeRings();
                        var o = s.buildMinimalRings(),
                            a = this.findShell(o);
                        null !== a ? (this.placePolygonHoles(a, o), e.add(a)) : n.addAll(o)
                    } else i.add(s)
                }
                return i
            },
            containsPoint: function(t) {
                for (var e = this.shellList.iterator(); e.hasNext();) {
                    if (e.next().containsPoint(t)) return !0
                }
                return !1
            },
            buildMaximalEdgeRings: function(t) {
                for (var e = new I, n = t.iterator(); n.hasNext();) {
                    var i = n.next();
                    if (i.isInResult() && i.getLabel().isArea() && null === i.getEdgeRing()) {
                        var r = new pn(i, this.geometryFactory);
                        e.add(r), r.setInResult()
                    }
                }
                return e
            },
            placePolygonHoles: function(t, e) {
                for (var n = e.iterator(); n.hasNext();) {
                    var i = n.next();
                    i.isHole() && i.setShell(t)
                }
            },
            getPolygons: function() {
                return this.computePolygons(this.shellList)
            },
            findEdgeRingContaining: function(t, e) {
                for (var n = t.getLinearRing(), i = n.getEnvelopeInternal(), r = n.getCoordinateN(0), s = null, o = null, a = e.iterator(); a.hasNext();) {
                    var u = a.next(),
                        l = u.getLinearRing(),
                        h = l.getEnvelopeInternal();
                    null !== s && (o = s.getLinearRing().getEnvelopeInternal());
                    var c = !1;
                    h.contains(i) && le.isPointInRing(r, l.getCoordinates()) && (c = !0), c && (null === s || o.contains(h)) && (s = u)
                }
                return s
            },
            findShell: function(t) {
                for (var e = 0, n = null, i = t.iterator(); i.hasNext();) {
                    var r = i.next();
                    r.isHole() || (n = r, e++)
                }
                return f.isTrue(e <= 1, "found two shells in MinimalEdgeRing list"), n
            },
            add: function() {
                if (1 === arguments.length) {
                    var t = arguments[0];
                    this.add(t.getEdgeEnds(), t.getNodes())
                } else if (2 === arguments.length) {
                    var e = arguments[0],
                        n = arguments[1];
                    Nn.linkResultDirectedEdges(n);
                    var i = this.buildMaximalEdgeRings(e),
                        r = new I,
                        s = this.buildMinimalEdgeRings(i, this.shellList, r);
                    this.sortShellsAndHoles(s, this.shellList, r), this.placeFreeHoles(this.shellList, r)
                }
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Cn
            }
        }), e(Ln.prototype, {
            collectLines: function(t) {
                for (var e = this.op.getGraph().getEdgeEnds().iterator(); e.hasNext();) {
                    var n = e.next();
                    this.collectLineEdge(n, t, this.lineEdgesList), this.collectBoundaryTouchEdge(n, t, this.lineEdgesList)
                }
            },
            labelIsolatedLine: function(t, e) {
                var n = this.ptLocator.locate(t.getCoordinate(), this.op.getArgGeometry(e));
                t.getLabel().setLocation(e, n)
            },
            build: function(t) {
                return this.findCoveredLineEdges(), this.collectLines(t), this.buildLines(t), this.resultLineList
            },
            collectLineEdge: function(t, e, n) {
                var i = t.getLabel(),
                    r = t.getEdge();
                t.isLineEdge() && (t.isVisited() || !ni.isResultOfOp(i, e) || r.isCovered() || (n.add(r), t.setVisitedEdge(!0)))
            },
            findCoveredLineEdges: function() {
                for (var t = this.op.getGraph().getNodes().iterator(); t.hasNext();) {
                    t.next().getEdges().findCoveredLineEdges()
                }
                for (var e = this.op.getGraph().getEdgeEnds().iterator(); e.hasNext();) {
                    var n = e.next(),
                        i = n.getEdge();
                    if (n.isLineEdge() && !i.isCoveredSet()) {
                        var r = this.op.isCoveredByA(n.getCoordinate());
                        i.setCovered(r)
                    }
                }
            },
            labelIsolatedLines: function(t) {
                for (var e = t.iterator(); e.hasNext();) {
                    var n = e.next(),
                        i = n.getLabel();
                    n.isIsolated() && (i.isNull(0) ? this.labelIsolatedLine(n, 0) : this.labelIsolatedLine(n, 1))
                }
            },
            buildLines: function(t) {
                for (var e = this.lineEdgesList.iterator(); e.hasNext();) {
                    var n = e.next(),
                        i = (n.getLabel(), this.geometryFactory.createLineString(n.getCoordinates()));
                    this.resultLineList.add(i), n.setInResult(!0)
                }
            },
            collectBoundaryTouchEdge: function(t, e, n) {
                var i = t.getLabel();
                return t.isLineEdge() ? null : t.isVisited() ? null : t.isInteriorAreaEdge() ? null : t.getEdge().isInResult() ? null : (f.isTrue(!(t.isInResult() || t.getSym().isInResult()) || !t.getEdge().isInResult()), void(ni.isResultOfOp(i, e) && e === ni.INTERSECTION && (n.add(t.getEdge()), t.setVisitedEdge(!0))))
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Ln
            }
        }), e(_n.prototype, {
            filterCoveredNodeToPoint: function(t) {
                var e = t.getCoordinate();
                if (!this.op.isCoveredByLA(e)) {
                    var n = this.geometryFactory.createPoint(e);
                    this.resultPointList.add(n)
                }
            },
            extractNonCoveredResultNodes: function(t) {
                for (var e = this.op.getGraph().getNodes().iterator(); e.hasNext();) {
                    var n = e.next();
                    if (!(n.isInResult() || n.isIncidentEdgeInResult() || 0 !== n.getEdges().getDegree() && t !== ni.INTERSECTION)) {
                        var i = n.getLabel();
                        ni.isResultOfOp(i, t) && this.filterCoveredNodeToPoint(n)
                    }
                }
            },
            build: function(t) {
                return this.extractNonCoveredResultNodes(t), this.resultPointList
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return _n
            }
        }), e(Sn.prototype, {
            locate: function(t) {},
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Sn
            }
        }), e(wn.prototype, {
            locate: function(t) {
                return wn.locate(t, this.geom)
            },
            interfaces_: function() {
                return [Sn]
            },
            getClass: function() {
                return wn
            }
        }), wn.isPointInRing = function(t, e) {
            return !!e.getEnvelopeInternal().intersects(t) && le.isPointInRing(t, e.getCoordinates())
        }, wn.containsPointInPolygon = function(t, e) {
            if (e.isEmpty()) return !1;
            var n = e.getExteriorRing();
            if (!wn.isPointInRing(t, n)) return !1;
            for (var i = 0; i < e.getNumInteriorRing(); i++) {
                var r = e.getInteriorRingN(i);
                if (wn.isPointInRing(t, r)) return !1
            }
            return !0
        }, wn.containsPoint = function(t, e) {
            if (e instanceof bt) return wn.containsPointInPolygon(t, e);
            if (e instanceof ft)
                for (var n = new Se(e); n.hasNext();) {
                    var i = n.next();
                    if (i !== e && wn.containsPoint(t, i)) return !0
                }
            return !1
        }, wn.locate = function(t, e) {
            return e.isEmpty() ? S.EXTERIOR : wn.containsPoint(t, e) ? S.INTERIOR : S.EXTERIOR
        }, e(bn.prototype, {
            getNextCW: function(t) {
                this.getEdges();
                var e = this.edgeList.indexOf(t),
                    n = e - 1;
                return 0 === e && (n = this.edgeList.size() - 1), this.edgeList.get(n)
            },
            propagateSideLabels: function(t) {
                for (var e = S.NONE, n = this.iterator(); n.hasNext();) {
                    var i = n.next(),
                        r = i.getLabel();
                    r.isArea(t) && r.getLocation(t, hn.LEFT) !== S.NONE && (e = r.getLocation(t, hn.LEFT))
                }
                if (e === S.NONE) return null;
                for (var s = e, n = this.iterator(); n.hasNext();) {
                    var i = n.next(),
                        r = i.getLabel();
                    if (r.getLocation(t, hn.ON) === S.NONE && r.setLocation(t, hn.ON, s), r.isArea(t)) {
                        var o = r.getLocation(t, hn.LEFT),
                            a = r.getLocation(t, hn.RIGHT);
                        if (a !== S.NONE) {
                            if (a !== s) throw new rn("side location conflict", i.getCoordinate());
                            o === S.NONE && f.shouldNeverReachHere("found single null side (at " + i.getCoordinate() + ")"), s = o
                        } else f.isTrue(r.getLocation(t, hn.LEFT) === S.NONE, "found single null side"), r.setLocation(t, hn.RIGHT, s), r.setLocation(t, hn.LEFT, s)
                    }
                }
            },
            getCoordinate: function() {
                var t = this.iterator();
                return t.hasNext() ? t.next().getCoordinate() : null
            },
            print: function(t) {
                A.out.println("EdgeEndStar:   " + this.getCoordinate());
                for (var e = this.iterator(); e.hasNext();) {
                    e.next().print(t)
                }
            },
            isAreaLabelsConsistent: function(t) {
                return this.computeEdgeEndLabels(t.getBoundaryNodeRule()), this.checkAreaLabelsConsistent(0)
            },
            checkAreaLabelsConsistent: function(t) {
                var e = this.getEdges();
                if (e.size() <= 0) return !0;
                var n = e.size() - 1,
                    i = e.get(n).getLabel(),
                    r = i.getLocation(t, hn.LEFT);
                f.isTrue(r !== S.NONE, "Found unlabelled area edge");
                for (var s = r, o = this.iterator(); o.hasNext();) {
                    var a = o.next(),
                        u = a.getLabel();
                    f.isTrue(u.isArea(t), "Found non-area edge");
                    var l = u.getLocation(t, hn.LEFT),
                        h = u.getLocation(t, hn.RIGHT);
                    if (l === h) return !1;
                    if (h !== s) return !1;
                    s = l
                }
                return !0
            },
            findIndex: function(t) {
                this.iterator();
                for (var e = 0; e < this.edgeList.size(); e++) {
                    if (this.edgeList.get(e) === t) return e
                }
                return -1
            },
            iterator: function() {
                return this.getEdges().iterator()
            },
            getEdges: function() {
                return null === this.edgeList && (this.edgeList = new I(this.edgeMap.values())), this.edgeList
            },
            getLocation: function(t, e, n) {
                return this.ptInAreaLocation[t] === S.NONE && (this.ptInAreaLocation[t] = wn.locate(e, n[t].getGeometry())), this.ptInAreaLocation[t]
            },
            toString: function() {
                var t = new R;
                t.append("EdgeEndStar:   " + this.getCoordinate()), t.append("\n");
                for (var e = this.iterator(); e.hasNext();) {
                    var n = e.next();
                    t.append(n), t.append("\n")
                }
                return t.toString()
            },
            computeEdgeEndLabels: function(t) {
                for (var e = this.iterator(); e.hasNext();) {
                    e.next().computeLabel(t)
                }
            },
            computeLabelling: function(t) {
                this.computeEdgeEndLabels(t[0].getBoundaryNodeRule()), this.propagateSideLabels(0), this.propagateSideLabels(1);
                for (var e = [!1, !1], n = this.iterator(); n.hasNext();)
                    for (var i = n.next(), r = i.getLabel(), s = 0; s < 2; s++) r.isLine(s) && r.getLocation(s) === S.BOUNDARY && (e[s] = !0);
                for (var n = this.iterator(); n.hasNext();)
                    for (var i = n.next(), r = i.getLabel(), s = 0; s < 2; s++)
                        if (r.isAnyNull(s)) {
                            var o = S.NONE;
                            if (e[s]) o = S.EXTERIOR;
                            else {
                                var a = i.getCoordinate();
                                o = this.getLocation(s, a, t)
                            }
                            r.setAllLocationsIfNull(s, o)
                        }
            },
            getDegree: function() {
                return this.edgeMap.size()
            },
            insertEdgeEnd: function(t, e) {
                this.edgeMap.put(t, e), this.edgeList = null
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return bn
            }
        }), h(Rn, bn), e(Rn.prototype, {
            linkResultDirectedEdges: function() {
                this.getResultAreaEdges();
                for (var t = null, e = null, n = this.SCANNING_FOR_INCOMING, i = 0; i < this.resultAreaEdgeList.size(); i++) {
                    var r = this.resultAreaEdgeList.get(i),
                        s = r.getSym();
                    if (r.getLabel().isArea()) switch (null === t && r.isInResult() && (t = r), n) {
                        case this.SCANNING_FOR_INCOMING:
                            if (!s.isInResult()) continue;
                            e = s, n = this.LINKING_TO_OUTGOING;
                            break;
                        case this.LINKING_TO_OUTGOING:
                            if (!r.isInResult()) continue;
                            e.setNext(r), n = this.SCANNING_FOR_INCOMING
                    }
                }
                if (n === this.LINKING_TO_OUTGOING) {
                    if (null === t) throw new rn("no outgoing dirEdge found", this.getCoordinate());
                    f.isTrue(t.isInResult(), "unable to link last incoming dirEdge"), e.setNext(t)
                }
            },
            insert: function(t) {
                var e = t;
                this.insertEdgeEnd(e, e)
            },
            getRightmostEdge: function() {
                var t = this.getEdges(),
                    e = t.size();
                if (e < 1) return null;
                var n = t.get(0);
                if (1 === e) return n;
                var i = t.get(e - 1),
                    r = n.getQuadrant(),
                    s = i.getQuadrant();
                return Ze.isNorthern(r) && Ze.isNorthern(s) ? n : Ze.isNorthern(r) || Ze.isNorthern(s) ? 0 !== n.getDy() ? n : 0 !== i.getDy() ? i : (f.shouldNeverReachHere("found two horizontal edges incident on node"), null) : i
            },
            print: function(t) {
                A.out.println("DirectedEdgeStar: " + this.getCoordinate());
                for (var e = this.iterator(); e.hasNext();) {
                    var n = e.next();
                    t.print("out "), n.print(t), t.println(), t.print("in "), n.getSym().print(t), t.println()
                }
            },
            getResultAreaEdges: function() {
                if (null !== this.resultAreaEdgeList) return this.resultAreaEdgeList;
                this.resultAreaEdgeList = new I;
                for (var t = this.iterator(); t.hasNext();) {
                    var e = t.next();
                    (e.isInResult() || e.getSym().isInResult()) && this.resultAreaEdgeList.add(e)
                }
                return this.resultAreaEdgeList
            },
            updateLabelling: function(t) {
                for (var e = this.iterator(); e.hasNext();) {
                    var n = e.next(),
                        i = n.getLabel();
                    i.setAllLocationsIfNull(0, t.getLocation(0)), i.setAllLocationsIfNull(1, t.getLocation(1))
                }
            },
            linkAllDirectedEdges: function() {
                this.getEdges();
                for (var t = null, e = null, n = this.edgeList.size() - 1; n >= 0; n--) {
                    var i = this.edgeList.get(n),
                        r = i.getSym();
                    null === e && (e = r), null !== t && r.setNext(t), t = i
                }
                e.setNext(t)
            },
            computeDepths: function() {
                if (1 === arguments.length) {
                    var t = arguments[0],
                        e = this.findIndex(t),
                        n = (t.getLabel(), t.getDepth(hn.LEFT)),
                        i = t.getDepth(hn.RIGHT),
                        r = this.computeDepths(e + 1, this.edgeList.size(), n);
                    if (this.computeDepths(0, e, r) !== i) throw new rn("depth mismatch at " + t.getCoordinate())
                } else if (3 === arguments.length) {
                    for (var s = arguments[0], o = arguments[1], a = arguments[2], u = a, l = s; l < o; l++) {
                        var h = this.edgeList.get(l);
                        h.getLabel(), h.setEdgeDepths(hn.RIGHT, u), u = h.getDepth(hn.LEFT)
                    }
                    return u
                }
            },
            mergeSymLabels: function() {
                for (var t = this.iterator(); t.hasNext();) {
                    var e = t.next();
                    e.getLabel().merge(e.getSym().getLabel())
                }
            },
            linkMinimalDirectedEdges: function(t) {
                for (var e = null, n = null, i = this.SCANNING_FOR_INCOMING, r = this.resultAreaEdgeList.size() - 1; r >= 0; r--) {
                    var s = this.resultAreaEdgeList.get(r),
                        o = s.getSym();
                    switch (null === e && s.getEdgeRing() === t && (e = s), i) {
                        case this.SCANNING_FOR_INCOMING:
                            if (o.getEdgeRing() !== t) continue;
                            n = o, i = this.LINKING_TO_OUTGOING;
                            break;
                        case this.LINKING_TO_OUTGOING:
                            if (s.getEdgeRing() !== t) continue;
                            n.setNextMin(s), i = this.SCANNING_FOR_INCOMING
                    }
                }
                i === this.LINKING_TO_OUTGOING && (f.isTrue(null !== e, "found null for first outgoing dirEdge"), f.isTrue(e.getEdgeRing() === t, "unable to link last incoming dirEdge"), n.setNextMin(e))
            },
            getOutgoingDegree: function() {
                if (0 === arguments.length) {
                    for (var t = 0, e = this.iterator(); e.hasNext();) {
                        var n = e.next();
                        n.isInResult() && t++
                    }
                    return t
                }
                if (1 === arguments.length) {
                    for (var i = arguments[0], t = 0, e = this.iterator(); e.hasNext();) {
                        var n = e.next();
                        n.getEdgeRing() === i && t++
                    }
                    return t
                }
            },
            getLabel: function() {
                return this.label
            },
            findCoveredLineEdges: function() {
                for (var t = S.NONE, e = this.iterator(); e.hasNext();) {
                    var n = e.next(),
                        i = n.getSym();
                    if (!n.isLineEdge()) {
                        if (n.isInResult()) {
                            t = S.INTERIOR;
                            break
                        }
                        if (i.isInResult()) {
                            t = S.EXTERIOR;
                            break
                        }
                    }
                }
                if (t === S.NONE) return null;
                for (var r = t, e = this.iterator(); e.hasNext();) {
                    var n = e.next(),
                        i = n.getSym();
                    n.isLineEdge() ? n.getEdge().setCovered(r === S.INTERIOR) : (n.isInResult() && (r = S.EXTERIOR), i.isInResult() && (r = S.INTERIOR))
                }
            },
            computeLabelling: function(t) {
                bn.prototype.computeLabelling.call(this, t), this.label = new fn(S.NONE);
                for (var e = this.iterator(); e.hasNext();)
                    for (var n = e.next(), i = n.getEdge(), r = i.getLabel(), s = 0; s < 2; s++) {
                        var o = r.getLocation(s);
                        o !== S.INTERIOR && o !== S.BOUNDARY || this.label.setLocation(s, S.INTERIOR)
                    }
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Rn
            }
        }), h(Mn, In), e(Mn.prototype, {
            createNode: function(t) {
                return new vn(t, new Rn)
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Mn
            }
        }), e(Tn.prototype, {
            computeIntersections: function(t, e) {
                this.mce.computeIntersectsForChain(this.chainIndex, t.mce, t.chainIndex, e)
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Tn
            }
        }), e(Pn.prototype, {
            isDelete: function() {
                return this.eventType === Pn.DELETE
            },
            setDeleteEventIndex: function(t) {
                this.deleteEventIndex = t
            },
            getObject: function() {
                return this.obj
            },
            compareTo: function(t) {
                var e = t;
                return this.xValue < e.xValue ? -1 : this.xValue > e.xValue ? 1 : this.eventType < e.eventType ? -1 : this.eventType > e.eventType ? 1 : 0
            },
            getInsertEvent: function() {
                return this.insertEvent
            },
            isInsert: function() {
                return this.eventType === Pn.INSERT
            },
            isSameLabel: function(t) {
                return null !== this.label && this.label === t.label
            },
            getDeleteEventIndex: function() {
                return this.deleteEventIndex
            },
            interfaces_: function() {
                return [s]
            },
            getClass: function() {
                return Pn
            }
        }), Pn.INSERT = 1, Pn.DELETE = 2, e(On.prototype, {
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return On
            }
        }), e(Dn.prototype, {
            isTrivialIntersection: function(t, e, n, i) {
                if (t === n && 1 === this.li.getIntersectionNum()) {
                    if (Dn.isAdjacentSegments(e, i)) return !0;
                    if (t.isClosed()) {
                        var r = t.getNumPoints() - 1;
                        if (0 === e && i === r || 0 === i && e === r) return !0
                    }
                }
                return !1
            },
            getProperIntersectionPoint: function() {
                return this.properIntersectionPoint
            },
            setIsDoneIfProperInt: function(t) {
                this.isDoneWhenProperInt = t
            },
            hasProperInteriorIntersection: function() {
                return this.hasProperInterior
            },
            isBoundaryPointInternal: function(t, e) {
                for (var n = e.iterator(); n.hasNext();) {
                    var i = n.next(),
                        r = i.getCoordinate();
                    if (t.isIntersection(r)) return !0
                }
                return !1
            },
            hasProperIntersection: function() {
                return this.hasProper
            },
            hasIntersection: function() {
                return this._hasIntersection
            },
            isDone: function() {
                return this._isDone
            },
            isBoundaryPoint: function(t, e) {
                return !(null === e || !this.isBoundaryPointInternal(t, e[0]) && !this.isBoundaryPointInternal(t, e[1]))
            },
            setBoundaryNodes: function(t, e) {
                this.bdyNodes = new Array(2).fill(null), this.bdyNodes[0] = t, this.bdyNodes[1] = e
            },
            addIntersections: function(t, e, n, i) {
                if (t === n && e === i) return null;
                this.numTests++;
                var r = t.getCoordinates()[e],
                    s = t.getCoordinates()[e + 1],
                    o = n.getCoordinates()[i],
                    a = n.getCoordinates()[i + 1];
                this.li.computeIntersection(r, s, o, a), this.li.hasIntersection() && (this.recordIsolated && (t.setIsolated(!1), n.setIsolated(!1)), this.numIntersections++, this.isTrivialIntersection(t, e, n, i) || (this._hasIntersection = !0, !this.includeProper && this.li.isProper() || (t.addIntersections(this.li, e, 0), n.addIntersections(this.li, i, 1)), this.li.isProper() && (this.properIntersectionPoint = this.li.getIntersection(0).copy(), this.hasProper = !0, this.isDoneWhenProperInt && (this._isDone = !0), this.isBoundaryPoint(this.li, this.bdyNodes) || (this.hasProperInterior = !0))))
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Dn
            }
        }), Dn.isAdjacentSegments = function(t, e) {
            return 1 === Math.abs(t - e)
        }, h(An, On), e(An.prototype, {
            prepareEvents: function() {
                uo.sort(this.events);
                for (var t = 0; t < this.events.size(); t++) {
                    var e = this.events.get(t);
                    e.isDelete() && e.getInsertEvent().setDeleteEventIndex(t)
                }
            },
            computeIntersections: function() {
                if (1 === arguments.length) {
                    var t = arguments[0];
                    this.nOverlaps = 0, this.prepareEvents();
                    for (var e = 0; e < this.events.size(); e++) {
                        var n = this.events.get(e);
                        if (n.isInsert() && this.processOverlaps(e, n.getDeleteEventIndex(), n, t), t.isDone()) break
                    }
                } else if (3 === arguments.length)
                    if (arguments[2] instanceof Dn && w(arguments[0], y) && w(arguments[1], y)) {
                        var i = arguments[0],
                            r = arguments[1],
                            s = arguments[2];
                        this.addEdges(i, i), this.addEdges(r, r), this.computeIntersections(s)
                    } else if ("boolean" == typeof arguments[2] && w(arguments[0], y) && arguments[1] instanceof Dn) {
                    var o = arguments[0],
                        a = arguments[1],
                        u = arguments[2];
                    u ? this.addEdges(o, null) : this.addEdges(o), this.computeIntersections(a)
                }
            },
            addEdge: function(t, e) {
                for (var n = t.getMonotoneChainEdge(), i = n.getStartIndexes(), r = 0; r < i.length - 1; r++) {
                    var s = new Tn(n, r),
                        o = new Pn(e, n.getMinX(r), s);
                    this.events.add(o), this.events.add(new Pn(n.getMaxX(r), o))
                }
            },
            processOverlaps: function(t, e, n, i) {
                for (var r = n.getObject(), s = t; s < e; s++) {
                    var o = this.events.get(s);
                    if (o.isInsert()) {
                        var a = o.getObject();
                        n.isSameLabel(o) || (r.computeIntersections(a, i), this.nOverlaps++)
                    }
                }
            },
            addEdges: function() {
                if (1 === arguments.length)
                    for (var t = arguments[0], e = t.iterator(); e.hasNext();) {
                        var n = e.next();
                        this.addEdge(n, n)
                    } else if (2 === arguments.length)
                        for (var i = arguments[0], r = arguments[1], e = i.iterator(); e.hasNext();) {
                            var n = e.next();
                            this.addEdge(n, r)
                        }
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return An
            }
        }), e(Fn.prototype, {
            getMin: function() {
                return this.min
            },
            intersects: function(t, e) {
                return !(this.min > e || this.max < t)
            },
            getMax: function() {
                return this.max
            },
            toString: function() {
                return re.toLineString(new g(this.min, 0), new g(this.max, 0))
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Fn
            }
        }), e(kn.prototype, {
            compare: function(t, e) {
                var n = t,
                    i = e,
                    r = (n.min + n.max) / 2,
                    s = (i.min + i.max) / 2;
                return r < s ? -1 : r > s ? 1 : 0
            },
            interfaces_: function() {
                return [a]
            },
            getClass: function() {
                return kn
            }
        }), Fn.NodeComparator = kn, h(Gn, Fn), e(Gn.prototype, {
            query: function(t, e, n) {
                return this.intersects(t, e) ? void n.visitItem(this.item) : null
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Gn
            }
        }), h(Bn, Fn), e(Bn.prototype, {
            buildExtent: function(t, e) {
                this.min = Math.min(t.min, e.min), this.max = Math.max(t.max, e.max)
            },
            query: function(t, e, n) {
                return this.intersects(t, e) ? (null !== this.node1 && this.node1.query(t, e, n), void(null !== this.node2 && this.node2.query(t, e, n))) : null
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Bn
            }
        }), e(qn.prototype, {
            buildTree: function() {
                uo.sort(this.leaves, new IntervalRTreeNode.NodeComparator);
                for (var t = this.leaves, e = null, n = new I;;) {
                    if (this.buildLevel(t, n), 1 === n.size()) return n.get(0);
                    e = t, t = n, n = e
                }
            },
            insert: function(t, e, n) {
                if (null !== this.root) throw new IllegalStateException("Index cannot be added to once it has been queried");
                this.leaves.add(new Gn(t, e, n))
            },
            query: function(t, e, n) {
                this.init(), this.root.query(t, e, n)
            },
            buildRoot: function() {
                return null !== this.root ? null : void(this.root = this.buildTree())
            },
            printNode: function(t) {
                A.out.println(re.toLineString(new g(t.min, this.level), new g(t.max, this.level)))
            },
            init: function() {
                return null !== this.root ? null : void this.buildRoot()
            },
            buildLevel: function(t, e) {
                this.level++, e.clear();
                for (var n = 0; n < t.size(); n += 2) {
                    var i = t.get(n);
                    if (null === (n + 1 < t.size() ? t.get(n) : null)) e.add(i);
                    else {
                        var r = new Bn(t.get(n), t.get(n + 1));
                        e.add(r)
                    }
                }
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return qn
            }
        }), e(zn.prototype, {
            filter: function(t) {
                if (this.isForcedToLineString && t instanceof Mt) {
                    var e = t.getFactory().createLineString(t.getCoordinateSequence());
                    return this.lines.add(e), null
                }
                t instanceof Lt && this.lines.add(t)
            },
            setForceToLineString: function(t) {
                this.isForcedToLineString = t
            },
            interfaces_: function() {
                return [G]
            },
            getClass: function() {
                return zn
            }
        }), zn.getGeometry = function() {
            if (1 === arguments.length) {
                var t = arguments[0];
                return t.getFactory().buildGeometry(zn.getLines(t))
            }
            if (2 === arguments.length) {
                var e = arguments[0],
                    n = arguments[1];
                return e.getFactory().buildGeometry(zn.getLines(e, n))
            }
        }, zn.getLines = function() {
            if (1 === arguments.length) {
                var t = arguments[0];
                return zn.getLines(t, !1)
            }
            if (2 === arguments.length) {
                if (w(arguments[0], m) && w(arguments[1], m)) {
                    for (var e = arguments[0], n = arguments[1], i = e.iterator(); i.hasNext();) {
                        var r = i.next();
                        zn.getLines(r, n)
                    }
                    return n
                }
                if (arguments[0] instanceof B && "boolean" == typeof arguments[1]) {
                    var s = arguments[0],
                        o = arguments[1],
                        a = new I;
                    return s.apply(new zn(a, o)), a
                }
                if (arguments[0] instanceof B && w(arguments[1], m)) {
                    var u = arguments[0],
                        l = arguments[1];
                    return u instanceof Lt ? l.add(u) : u.apply(new zn(l)), l
                }
            } else if (3 === arguments.length) {
                if ("boolean" == typeof arguments[2] && w(arguments[0], m) && w(arguments[1], m)) {
                    for (var h = arguments[0], c = arguments[1], f = arguments[2], i = h.iterator(); i.hasNext();) {
                        var r = i.next();
                        zn.getLines(r, c, f)
                    }
                    return c
                }
                if ("boolean" == typeof arguments[2] && arguments[0] instanceof B && w(arguments[1], m)) {
                    var g = arguments[0],
                        d = arguments[1],
                        p = arguments[2];
                    return g.apply(new zn(d, p)), d
                }
            }
        }, e(Vn.prototype, {
            visitItem: function(t) {
                this.items.add(t)
            },
            getItems: function() {
                return this.items
            },
            interfaces_: function() {
                return [De]
            },
            getClass: function() {
                return Vn
            }
        }), e(Un.prototype, {
            locate: function(t) {
                var e = new ue(t),
                    n = new Yn(e);
                return this.index.query(t.y, t.y, n), e.getLocation()
            },
            interfaces_: function() {
                return [Sn]
            },
            getClass: function() {
                return Un
            }
        }), e(Yn.prototype, {
            visitItem: function(t) {
                var e = t;
                this.counter.countSegment(e.getCoordinate(0), e.getCoordinate(1))
            },
            interfaces_: function() {
                return [De]
            },
            getClass: function() {
                return Yn
            }
        }), e(Xn.prototype, {
            init: function(t) {
                for (var e = zn.getLines(t), n = e.iterator(); n.hasNext();) {
                    var i = n.next(),
                        r = i.getCoordinates();
                    this.addLine(r)
                }
            },
            addLine: function(t) {
                for (var e = 1; e < t.length; e++) {
                    var n = new he(t[e - 1], t[e]),
                        i = Math.min(n.p0.y, n.p1.y),
                        r = Math.max(n.p0.y, n.p1.y);
                    this.index.insert(i, r, n)
                }
            },
            query: function() {
                if (2 === arguments.length) {
                    var t = arguments[0],
                        e = arguments[1],
                        n = new Vn;
                    return this.index.query(t, e, n), n.getItems()
                }
                if (3 === arguments.length) {
                    var i = arguments[0],
                        r = arguments[1],
                        s = arguments[2];
                    this.index.query(i, r, s)
                }
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Xn
            }
        }), Un.SegmentVisitor = Yn, Un.IntervalIndexedGeometry = Xn, e(Hn.prototype, {
            getSegmentIndex: function() {
                return this.segmentIndex
            },
            getCoordinate: function() {
                return this.coord
            },
            print: function(t) {
                t.print(this.coord), t.print(" seg # = " + this.segmentIndex), t.println(" dist = " + this.dist)
            },
            compareTo: function(t) {
                var e = t;
                return this.compare(e.segmentIndex, e.dist)
            },
            isEndPoint: function(t) {
                return 0 === this.segmentIndex && 0 === this.dist || this.segmentIndex === t
            },
            toString: function() {
                return this.coord + " seg # = " + this.segmentIndex + " dist = " + this.dist
            },
            getDistance: function() {
                return this.dist
            },
            compare: function(t, e) {
                return this.segmentIndex < t ? -1 : this.segmentIndex > t ? 1 : this.dist < e ? -1 : this.dist > e ? 1 : 0
            },
            interfaces_: function() {
                return [s]
            },
            getClass: function() {
                return Hn
            }
        }), e(jn.prototype, {
            print: function(t) {
                t.println("Intersections:");
                for (var e = this.iterator(); e.hasNext();) {
                    e.next().print(t)
                }
            },
            iterator: function() {
                return this.nodeMap.values().iterator()
            },
            addSplitEdges: function(t) {
                this.addEndpoints();
                for (var e = this.iterator(), n = e.next(); e.hasNext();) {
                    var i = e.next(),
                        r = this.createSplitEdge(n, i);
                    t.add(r), n = i
                }
            },
            addEndpoints: function() {
                var t = this.edge.pts.length - 1;
                this.add(this.edge.pts[0], 0, 0), this.add(this.edge.pts[t], t, 0)
            },
            createSplitEdge: function(t, e) {
                var n = e.segmentIndex - t.segmentIndex + 2,
                    i = this.edge.pts[e.segmentIndex],
                    r = e.dist > 0 || !e.coord.equals2D(i);
                r || n--;
                var s = new Array(n).fill(null),
                    o = 0;
                s[o++] = new g(t.coord);
                for (var a = t.segmentIndex + 1; a <= e.segmentIndex; a++) s[o++] = this.edge.pts[a];
                return r && (s[o] = e.coord), new Zn(s, new fn(this.edge.label))
            },
            add: function(t, e, n) {
                var i = new Hn(t, e, n),
                    r = this.nodeMap.get(i);
                return null !== r ? r : (this.nodeMap.put(i, i), i)
            },
            isIntersection: function(t) {
                for (var e = this.iterator(); e.hasNext();) {
                    if (e.next().coord.equals(t)) return !0
                }
                return !1
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return jn
            }
        }), e(Wn.prototype, {
            getChainStartIndices: function(t) {
                var e = 0,
                    n = new I;
                n.add(new M(e));
                do {
                    var i = this.findChainEnd(t, e);
                    n.add(new M(i)), e = i
                } while (e < t.length - 1);
                return Wn.toIntArray(n)
            },
            findChainEnd: function(t, e) {
                for (var n = Ze.quadrant(t[e], t[e + 1]), i = e + 1; i < t.length;) {
                    if (Ze.quadrant(t[i - 1], t[i]) !== n) break;
                    i++
                }
                return i - 1
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Wn
            }
        }), Wn.toIntArray = function(t) {
            for (var e = new Array(t.size()).fill(null), n = 0; n < e.length; n++) e[n] = t.get(n).intValue();
            return e
        }, e(Kn.prototype, {
            getCoordinates: function() {
                return this.pts
            },
            getMaxX: function(t) {
                var e = this.pts[this.startIndex[t]].x,
                    n = this.pts[this.startIndex[t + 1]].x;
                return e > n ? e : n
            },
            getMinX: function(t) {
                var e = this.pts[this.startIndex[t]].x,
                    n = this.pts[this.startIndex[t + 1]].x;
                return e < n ? e : n
            },
            computeIntersectsForChain: function() {
                if (4 === arguments.length) {
                    var t = arguments[0],
                        e = arguments[1],
                        n = arguments[2],
                        i = arguments[3];
                    this.computeIntersectsForChain(this.startIndex[t], this.startIndex[t + 1], e, e.startIndex[n], e.startIndex[n + 1], i)
                } else if (6 === arguments.length) {
                    var r = arguments[0],
                        s = arguments[1],
                        o = arguments[2],
                        a = arguments[3],
                        u = arguments[4],
                        l = arguments[5],
                        h = this.pts[r],
                        c = this.pts[s],
                        f = o.pts[a],
                        g = o.pts[u];
                    if (s - r == 1 && u - a == 1) return l.addIntersections(this.e, r, o.e, a), null;
                    if (this.env1.init(h, c), this.env2.init(f, g), !this.env1.intersects(this.env2)) return null;
                    var d = Math.trunc((r + s) / 2),
                        p = Math.trunc((a + u) / 2);
                    r < d && (a < p && this.computeIntersectsForChain(r, d, o, a, p, l), p < u && this.computeIntersectsForChain(r, d, o, p, u, l)), d < s && (a < p && this.computeIntersectsForChain(d, s, o, a, p, l), p < u && this.computeIntersectsForChain(d, s, o, p, u, l))
                }
            },
            getStartIndexes: function() {
                return this.startIndex
            },
            computeIntersects: function(t, e) {
                for (var n = 0; n < this.startIndex.length - 1; n++)
                    for (var i = 0; i < t.startIndex.length - 1; i++) this.computeIntersectsForChain(n, t, i, e)
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Kn
            }
        }), e(Jn.prototype, {
            getDepth: function(t, e) {
                return this.depth[t][e]
            },
            setDepth: function(t, e, n) {
                this.depth[t][e] = n
            },
            isNull: function() {
                if (0 === arguments.length) {
                    for (var t = 0; t < 2; t++)
                        for (var e = 0; e < 3; e++)
                            if (this.depth[t][e] !== Jn.NULL_VALUE) return !1;
                    return !0
                }
                if (1 === arguments.length) {
                    var n = arguments[0];
                    return this.depth[n][1] === Jn.NULL_VALUE
                }
                if (2 === arguments.length) {
                    var i = arguments[0],
                        r = arguments[1];
                    return this.depth[i][r] === Jn.NULL_VALUE
                }
            },
            normalize: function() {
                for (var t = 0; t < 2; t++)
                    if (!this.isNull(t)) {
                        var e = this.depth[t][1];
                        this.depth[t][2] < e && (e = this.depth[t][2]), e < 0 && (e = 0);
                        for (var n = 1; n < 3; n++) {
                            var i = 0;
                            this.depth[t][n] > e && (i = 1), this.depth[t][n] = i
                        }
                    }
            },
            getDelta: function(t) {
                return this.depth[t][hn.RIGHT] - this.depth[t][hn.LEFT]
            },
            getLocation: function(t, e) {
                return this.depth[t][e] <= 0 ? S.EXTERIOR : S.INTERIOR
            },
            toString: function() {
                return "A: " + this.depth[0][1] + "," + this.depth[0][2] + " B: " + this.depth[1][1] + "," + this.depth[1][2]
            },
            add: function() {
                if (1 === arguments.length)
                    for (var t = arguments[0], e = 0; e < 2; e++)
                        for (var n = 1; n < 3; n++) {
                            var i = t.getLocation(e, n);
                            i !== S.EXTERIOR && i !== S.INTERIOR || (this.isNull(e, n) ? this.depth[e][n] = Jn.depthAtLocation(i) : this.depth[e][n] += Jn.depthAtLocation(i))
                        } else if (3 === arguments.length) {
                            var r = arguments[0],
                                s = arguments[1],
                                o = arguments[2];
                            o === S.INTERIOR && this.depth[r][s]++
                        }
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Jn
            }
        }), Jn.depthAtLocation = function(t) {
            return t === S.EXTERIOR ? 0 : t === S.INTERIOR ? 1 : Jn.NULL_VALUE
        }, Jn.NULL_VALUE = -1, h(Zn, mn), e(Zn.prototype, {
            getDepth: function() {
                return this.depth
            },
            getCollapsedEdge: function() {
                var t = new Array(2).fill(null);
                return t[0] = this.pts[0], t[1] = this.pts[1], new Zn(t, fn.toLineLabel(this.label))
            },
            isIsolated: function() {
                return this._isIsolated
            },
            getCoordinates: function() {
                return this.pts
            },
            setIsolated: function(t) {
                this._isIsolated = t
            },
            setName: function(t) {
                this.name = t
            },
            equals: function(t) {
                if (!(t instanceof Zn)) return !1;
                var e = t;
                if (this.pts.length !== e.pts.length) return !1;
                for (var n = !0, i = !0, r = this.pts.length, s = 0; s < this.pts.length; s++)
                    if (this.pts[s].equals2D(e.pts[s]) || (n = !1), this.pts[s].equals2D(e.pts[--r]) || (i = !1), !n && !i) return !1;
                return !0
            },
            getCoordinate: function() {
                if (0 === arguments.length) return this.pts.length > 0 ? this.pts[0] : null;
                if (1 === arguments.length) {
                    var t = arguments[0];
                    return this.pts[t]
                }
            },
            print: function(t) {
                t.print("edge " + this.name + ": "), t.print("LINESTRING (");
                for (var e = 0; e < this.pts.length; e++) e > 0 && t.print(","), t.print(this.pts[e].x + " " + this.pts[e].y);
                t.print(")  " + this.label + " " + this.depthDelta)
            },
            computeIM: function(t) {
                Zn.updateIM(this.label, t)
            },
            isCollapsed: function() {
                return !!this.label.isArea() && 3 === this.pts.length && !!this.pts[0].equals(this.pts[2])
            },
            isClosed: function() {
                return this.pts[0].equals(this.pts[this.pts.length - 1])
            },
            getMaximumSegmentIndex: function() {
                return this.pts.length - 1
            },
            getDepthDelta: function() {
                return this.depthDelta
            },
            getNumPoints: function() {
                return this.pts.length
            },
            printReverse: function(t) {
                t.print("edge " + this.name + ": ");
                for (var e = this.pts.length - 1; e >= 0; e--) t.print(this.pts[e] + " ");
                t.println("")
            },
            getMonotoneChainEdge: function() {
                return null === this.mce && (this.mce = new Kn(this)), this.mce
            },
            getEnvelope: function() {
                if (null === this.env) {
                    this.env = new C;
                    for (var t = 0; t < this.pts.length; t++) this.env.expandToInclude(this.pts[t])
                }
                return this.env
            },
            addIntersection: function(t, e, n, i) {
                var r = new g(t.getIntersection(i)),
                    s = e,
                    o = t.getEdgeDistance(n, i),
                    a = s + 1;
                if (a < this.pts.length) {
                    var u = this.pts[a];
                    r.equals2D(u) && (s = a, o = 0)
                }
                this.eiList.add(r, s, o)
            },
            toString: function() {
                var t = new R;
                t.append("edge " + this.name + ": "), t.append("LINESTRING (");
                for (var e = 0; e < this.pts.length; e++) e > 0 && t.append(","), t.append(this.pts[e].x + " " + this.pts[e].y);
                return t.append(")  " + this.label + " " + this.depthDelta), t.toString()
            },
            isPointwiseEqual: function(t) {
                if (this.pts.length !== t.pts.length) return !1;
                for (var e = 0; e < this.pts.length; e++)
                    if (!this.pts[e].equals2D(t.pts[e])) return !1;
                return !0
            },
            setDepthDelta: function(t) {
                this.depthDelta = t
            },
            getEdgeIntersectionList: function() {
                return this.eiList
            },
            addIntersections: function(t, e, n) {
                for (var i = 0; i < t.getIntersectionNum(); i++) this.addIntersection(t, e, n, i)
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Zn
            }
        }), Zn.updateIM = function() {
            if (2 !== arguments.length) return mn.prototype.updateIM.apply(this, arguments);
            var t = arguments[0],
                e = arguments[1];
            e.setAtLeastIfValid(t.getLocation(0, hn.ON), t.getLocation(1, hn.ON), 1), t.isArea() && (e.setAtLeastIfValid(t.getLocation(0, hn.LEFT), t.getLocation(1, hn.LEFT), 2), e.setAtLeastIfValid(t.getLocation(0, hn.RIGHT), t.getLocation(1, hn.RIGHT), 2))
        }, h(Qn, Nn), e(Qn.prototype, {
            insertBoundaryPoint: function(t, e) {
                var n = this.nodes.addNode(e),
                    i = n.getLabel(),
                    r = 1;
                S.NONE;
                i.getLocation(t, hn.ON) === S.BOUNDARY && r++;
                var s = Qn.determineBoundary(this.boundaryNodeRule, r);
                i.setLocation(t, s)
            },
            computeSelfNodes: function() {
                if (2 === arguments.length) {
                    var t = arguments[0],
                        e = arguments[1];
                    return this.computeSelfNodes(t, e, !1)
                }
                if (3 === arguments.length) {
                    var n = arguments[0],
                        i = arguments[1],
                        r = arguments[2],
                        s = new Dn(n, !0, !1);
                    s.setIsDoneIfProperInt(r);
                    var o = this.createEdgeSetIntersector(),
                        a = this.parentGeom instanceof Mt || this.parentGeom instanceof bt || this.parentGeom instanceof Tt,
                        u = i || !a;
                    return o.computeIntersections(this.edges, s, u), this.addSelfIntersectionNodes(this.argIndex), s
                }
            },
            computeSplitEdges: function(t) {
                for (var e = this.edges.iterator(); e.hasNext();) {
                    e.next().eiList.addSplitEdges(t)
                }
            },
            computeEdgeIntersections: function(t, e, n) {
                var i = new Dn(e, n, !0);
                return i.setBoundaryNodes(this.getBoundaryNodes(), t.getBoundaryNodes()), this.createEdgeSetIntersector().computeIntersections(this.edges, t.edges, i), i
            },
            getGeometry: function() {
                return this.parentGeom
            },
            getBoundaryNodeRule: function() {
                return this.boundaryNodeRule
            },
            hasTooFewPoints: function() {
                return this._hasTooFewPoints
            },
            addPoint: function() {
                if (arguments[0] instanceof St) {
                    var t = arguments[0],
                        e = t.getCoordinate();
                    this.insertPoint(this.argIndex, e, S.INTERIOR)
                } else if (arguments[0] instanceof g) {
                    var n = arguments[0];
                    this.insertPoint(this.argIndex, n, S.INTERIOR)
                }
            },
            addPolygon: function(t) {
                this.addPolygonRing(t.getExteriorRing(), S.EXTERIOR, S.INTERIOR);
                for (var e = 0; e < t.getNumInteriorRing(); e++) {
                    var n = t.getInteriorRingN(e);
                    this.addPolygonRing(n, S.INTERIOR, S.EXTERIOR)
                }
            },
            addEdge: function(t) {
                this.insertEdge(t);
                var e = t.getCoordinates();
                this.insertPoint(this.argIndex, e[0], S.BOUNDARY), this.insertPoint(this.argIndex, e[e.length - 1], S.BOUNDARY)
            },
            addLineString: function(t) {
                var e = H.removeRepeatedPoints(t.getCoordinates());
                if (e.length < 2) return this._hasTooFewPoints = !0, this.invalidPoint = e[0], null;
                var n = new Zn(e, new fn(this.argIndex, S.INTERIOR));
                this.lineEdgeMap.put(t, n), this.insertEdge(n), f.isTrue(e.length >= 2, "found LineString with single point"), this.insertBoundaryPoint(this.argIndex, e[0]), this.insertBoundaryPoint(this.argIndex, e[e.length - 1])
            },
            getInvalidPoint: function() {
                return this.invalidPoint
            },
            getBoundaryPoints: function() {
                for (var t = this.getBoundaryNodes(), e = new Array(t.size()).fill(null), n = 0, i = t.iterator(); i.hasNext();) {
                    var r = i.next();
                    e[n++] = r.getCoordinate().copy()
                }
                return e
            },
            getBoundaryNodes: function() {
                return null === this.boundaryNodes && (this.boundaryNodes = this.nodes.getBoundaryNodes(this.argIndex)), this.boundaryNodes
            },
            addSelfIntersectionNode: function(t, e, n) {
                return this.isBoundaryNode(t, e) ? null : void(n === S.BOUNDARY && this.useBoundaryDeterminationRule ? this.insertBoundaryPoint(t, e) : this.insertPoint(t, e, n))
            },
            addPolygonRing: function(t, e, n) {
                if (t.isEmpty()) return null;
                var i = H.removeRepeatedPoints(t.getCoordinates());
                if (i.length < 4) return this._hasTooFewPoints = !0, this.invalidPoint = i[0], null;
                var r = e,
                    s = n;
                le.isCCW(i) && (r = n, s = e);
                var o = new Zn(i, new fn(this.argIndex, S.BOUNDARY, r, s));
                this.lineEdgeMap.put(t, o), this.insertEdge(o), this.insertPoint(this.argIndex, i[0], S.BOUNDARY)
            },
            insertPoint: function(t, e, n) {
                var i = this.nodes.addNode(e),
                    r = i.getLabel();
                null === r ? i.label = new fn(t, n) : r.setLocation(t, n)
            },
            createEdgeSetIntersector: function() {
                return new An
            },
            addSelfIntersectionNodes: function(t) {
                for (var e = this.edges.iterator(); e.hasNext();)
                    for (var n = e.next(), i = n.getLabel().getLocation(t), r = n.eiList.iterator(); r.hasNext();) {
                        var s = r.next();
                        this.addSelfIntersectionNode(t, s.coord, i)
                    }
            },
            add: function() {
                if (1 !== arguments.length) return Nn.prototype.add.apply(this, arguments);
                var t = arguments[0];
                if (t.isEmpty()) return null;
                if (t instanceof Tt && (this.useBoundaryDeterminationRule = !1), t instanceof bt) this.addPolygon(t);
                else if (t instanceof Lt) this.addLineString(t);
                else if (t instanceof St) this.addPoint(t);
                else if (t instanceof Rt) this.addCollection(t);
                else if (t instanceof gt) this.addCollection(t);
                else if (t instanceof Tt) this.addCollection(t);
                else {
                    if (!(t instanceof ft)) throw new UnsupportedOperationException(t.getClass().getName());
                    this.addCollection(t)
                }
            },
            addCollection: function(t) {
                for (var e = 0; e < t.getNumGeometries(); e++) {
                    var n = t.getGeometryN(e);
                    this.add(n)
                }
            },
            locate: function(t) {
                return w(this.parentGeom, wt) && this.parentGeom.getNumGeometries() > 50 ? (null === this.areaPtLocator && (this.areaPtLocator = new Un(this.parentGeom)), this.areaPtLocator.locate(t)) : this.ptLocator.locate(t, this.parentGeom)
            },
            findEdge: function() {
                if (1 === arguments.length) {
                    var t = arguments[0];
                    return this.lineEdgeMap.get(t)
                }
                return Nn.prototype.findEdge.apply(this, arguments)
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Qn
            }
        }), Qn.determineBoundary = function(t, e) {
            return t.isInBoundary(e) ? S.BOUNDARY : S.INTERIOR
        }, e($n.prototype, {
            getArgGeometry: function(t) {
                return this.arg[t].getGeometry()
            },
            setComputationPrecision: function(t) {
                this.resultPrecisionModel = t, this.li.setPrecisionModel(this.resultPrecisionModel)
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return $n
            }
        }), e(ti.prototype, {
            compareTo: function(t) {
                var e = t;
                return ti.compareOriented(this.pts, this._orientation, e.pts, e._orientation)
            },
            interfaces_: function() {
                return [s]
            },
            getClass: function() {
                return ti
            }
        }), ti.orientation = function(t) {
            return 1 === H.increasingDirection(t)
        }, ti.compareOriented = function(t, e, n, i) {
            for (var r = e ? 1 : -1, s = i ? 1 : -1, o = e ? t.length : -1, a = i ? n.length : -1, u = e ? 0 : t.length - 1, l = i ? 0 : n.length - 1;;) {
                var h = t[u].compareTo(n[l]);
                if (0 !== h) return h;
                u += r, l += s;
                var c = u === o,
                    f = l === a;
                if (c && !f) return -1;
                if (!c && f) return 1;
                if (c && f) return 0
            }
        }, e(ei.prototype, {
            print: function(t) {
                t.print("MULTILINESTRING ( ");
                for (var e = 0; e < this.edges.size(); e++) {
                    var n = this.edges.get(e);
                    e > 0 && t.print(","), t.print("(");
                    for (var i = n.getCoordinates(), r = 0; r < i.length; r++) r > 0 && t.print(","), t.print(i[r].x + " " + i[r].y);
                    t.println(")")
                }
                t.print(")  ")
            },
            addAll: function(t) {
                for (var e = t.iterator(); e.hasNext();) this.add(e.next())
            },
            findEdgeIndex: function(t) {
                for (var e = 0; e < this.edges.size(); e++)
                    if (this.edges.get(e).equals(t)) return e;
                return -1
            },
            iterator: function() {
                return this.edges.iterator()
            },
            getEdges: function() {
                return this.edges
            },
            get: function(t) {
                return this.edges.get(t)
            },
            findEqualEdge: function(t) {
                var e = new ti(t.getCoordinates());
                return this.ocaMap.get(e)
            },
            add: function(t) {
                this.edges.add(t);
                var e = new ti(t.getCoordinates());
                this.ocaMap.put(e, t)
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return ei
            }
        }), h(ni, $n), e(ni.prototype, {
            insertUniqueEdge: function(t) {
                var e = this.edgeList.findEqualEdge(t);
                if (null !== e) {
                    var n = e.getLabel(),
                        i = t.getLabel();
                    e.isPointwiseEqual(t) || (i = new fn(t.getLabel()), i.flip());
                    var r = e.getDepth();
                    r.isNull() && r.add(n), r.add(i), n.merge(i)
                } else this.edgeList.add(t)
            },
            getGraph: function() {
                return this.graph
            },
            cancelDuplicateResultEdges: function() {
                for (var t = this.graph.getEdgeEnds().iterator(); t.hasNext();) {
                    var e = t.next(),
                        n = e.getSym();
                    e.isInResult() && n.isInResult() && (e.setInResult(!1), n.setInResult(!1))
                }
            },
            isCoveredByLA: function(t) {
                return !!this.isCovered(t, this.resultLineList) || !!this.isCovered(t, this.resultPolyList)
            },
            computeGeometry: function(t, e, n, i) {
                var r = new I;
                return r.addAll(t), r.addAll(e), r.addAll(n), r.isEmpty() ? ni.createEmptyResult(i, this.arg[0].getGeometry(), this.arg[1].getGeometry(), this.geomFact) : this.geomFact.buildGeometry(r)
            },
            mergeSymLabels: function() {
                for (var t = this.graph.getNodes().iterator(); t.hasNext();) {
                    t.next().getEdges().mergeSymLabels()
                }
            },
            isCovered: function(t, e) {
                for (var n = e.iterator(); n.hasNext();) {
                    var i = n.next();
                    if (this.ptLocator.locate(t, i) !== S.EXTERIOR) return !0
                }
                return !1
            },
            replaceCollapsedEdges: function() {
                for (var t = new I, e = this.edgeList.iterator(); e.hasNext();) {
                    var n = e.next();
                    n.isCollapsed() && (e.remove(), t.add(n.getCollapsedEdge()))
                }
                this.edgeList.addAll(t)
            },
            updateNodeLabelling: function() {
                for (var t = this.graph.getNodes().iterator(); t.hasNext();) {
                    var e = t.next(),
                        n = e.getEdges().getLabel();
                    e.getLabel().merge(n)
                }
            },
            getResultGeometry: function(t) {
                return this.computeOverlay(t), this.resultGeom
            },
            insertUniqueEdges: function(t) {
                for (var e = t.iterator(); e.hasNext();) {
                    var n = e.next();
                    this.insertUniqueEdge(n)
                }
            },
            computeOverlay: function(t) {
                this.copyPoints(0), this.copyPoints(1), this.arg[0].computeSelfNodes(this.li, !1), this.arg[1].computeSelfNodes(this.li, !1), this.arg[0].computeEdgeIntersections(this.arg[1], this.li, !0);
                var e = new I;
                this.arg[0].computeSplitEdges(e), this.arg[1].computeSplitEdges(e), this.insertUniqueEdges(e), this.computeLabelsFromDepths(), this.replaceCollapsedEdges(), un.checkValid(this.edgeList.getEdges()), this.graph.addEdges(this.edgeList.getEdges()), this.computeLabelling(), this.labelIncompleteNodes(), this.findResultAreaEdges(t), this.cancelDuplicateResultEdges();
                var n = new Cn(this.geomFact);
                n.add(this.graph), this.resultPolyList = n.getPolygons();
                var i = new Ln(this, this.geomFact, this.ptLocator);
                this.resultLineList = i.build(t);
                var r = new _n(this, this.geomFact, this.ptLocator);
                this.resultPointList = r.build(t), this.resultGeom = this.computeGeometry(this.resultPointList, this.resultLineList, this.resultPolyList, t)
            },
            labelIncompleteNode: function(t, e) {
                var n = this.ptLocator.locate(t.getCoordinate(), this.arg[e].getGeometry());
                t.getLabel().setLocation(e, n)
            },
            copyPoints: function(t) {
                for (var e = this.arg[t].getNodeIterator(); e.hasNext();) {
                    var n = e.next();
                    this.graph.addNode(n.getCoordinate()).setLabel(t, n.getLabel().getLocation(t))
                }
            },
            findResultAreaEdges: function(t) {
                for (var e = this.graph.getEdgeEnds().iterator(); e.hasNext();) {
                    var n = e.next(),
                        i = n.getLabel();
                    i.isArea() && !n.isInteriorAreaEdge() && ni.isResultOfOp(i.getLocation(0, hn.RIGHT), i.getLocation(1, hn.RIGHT), t) && n.setInResult(!0)
                }
            },
            computeLabelsFromDepths: function() {
                for (var t = this.edgeList.iterator(); t.hasNext();) {
                    var e = t.next(),
                        n = e.getLabel(),
                        i = e.getDepth();
                    if (!i.isNull()) {
                        i.normalize();
                        for (var r = 0; r < 2; r++) n.isNull(r) || !n.isArea() || i.isNull(r) || (0 === i.getDelta(r) ? n.toLine(r) : (f.isTrue(!i.isNull(r, hn.LEFT), "depth of LEFT side has not been initialized"), n.setLocation(r, hn.LEFT, i.getLocation(r, hn.LEFT)), f.isTrue(!i.isNull(r, hn.RIGHT), "depth of RIGHT side has not been initialized"), n.setLocation(r, hn.RIGHT, i.getLocation(r, hn.RIGHT))))
                    }
                }
            },
            computeLabelling: function() {
                for (var t = this.graph.getNodes().iterator(); t.hasNext();) {
                    t.next().getEdges().computeLabelling(this.arg)
                }
                this.mergeSymLabels(), this.updateNodeLabelling()
            },
            labelIncompleteNodes: function() {
                for (var t = 0, e = this.graph.getNodes().iterator(); e.hasNext();) {
                    var n = e.next(),
                        i = n.getLabel();
                    n.isIsolated() && (t++, i.isNull(0) ? this.labelIncompleteNode(n, 0) : this.labelIncompleteNode(n, 1)), n.getEdges().updateLabelling(i)
                }
            },
            isCoveredByA: function(t) {
                return !!this.isCovered(t, this.resultPolyList)
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return ni
            }
        }), ni.overlayOp = function(t, e, n) {
            return new ni(t, e).getResultGeometry(n)
        }, ni.intersection = function(t, e) {
            if (t.isEmpty() || e.isEmpty()) return ni.createEmptyResult(ni.INTERSECTION, t, e, t.getFactory());
            if (t.isGeometryCollection()) {
                var n = e;
                return ln.map(t, {
                    interfaces_: function() {
                        return [MapOp]
                    },
                    map: function(t) {
                        return t.intersection(n)
                    }
                })
            }
            return t.checkNotGeometryCollection(t), t.checkNotGeometryCollection(e), ri.overlayOp(t, e, ni.INTERSECTION)
        }, ni.symDifference = function(t, e) {
            if (t.isEmpty() || e.isEmpty()) {
                if (t.isEmpty() && e.isEmpty()) return ni.createEmptyResult(ni.SYMDIFFERENCE, t, e, t.getFactory());
                if (t.isEmpty()) return e.copy();
                if (e.isEmpty()) return t.copy()
            }
            return t.checkNotGeometryCollection(t), t.checkNotGeometryCollection(e), ri.overlayOp(t, e, ni.SYMDIFFERENCE)
        }, ni.resultDimension = function(t, e, n) {
            var i = e.getDimension(),
                r = n.getDimension(),
                s = -1;
            switch (t) {
                case ni.INTERSECTION:
                    s = Math.min(i, r);
                    break;
                case ni.UNION:
                    s = Math.max(i, r);
                    break;
                case ni.DIFFERENCE:
                    s = i;
                    break;
                case ni.SYMDIFFERENCE:
                    s = Math.max(i, r)
            }
            return s
        }, ni.createEmptyResult = function(t, e, n, i) {
            var r = null;
            switch (ni.resultDimension(t, e, n)) {
                case -1:
                    r = i.createGeometryCollection(new Array(0).fill(null));
                    break;
                case 0:
                    r = i.createPoint();
                    break;
                case 1:
                    r = i.createLineString();
                    break;
                case 2:
                    r = i.createPolygon()
            }
            return r
        }, ni.difference = function(t, e) {
            return t.isEmpty() ? ni.createEmptyResult(ni.DIFFERENCE, t, e, t.getFactory()) : e.isEmpty() ? t.copy() : (t.checkNotGeometryCollection(t), t.checkNotGeometryCollection(e), ri.overlayOp(t, e, ni.DIFFERENCE))
        }, ni.isResultOfOp = function() {
            if (2 === arguments.length) {
                var t = arguments[0],
                    e = arguments[1],
                    n = t.getLocation(0),
                    i = t.getLocation(1);
                return ni.isResultOfOp(n, i, e)
            }
            if (3 === arguments.length) {
                var r = arguments[0],
                    s = arguments[1],
                    o = arguments[2];
                switch (r === S.BOUNDARY && (r = S.INTERIOR), s === S.BOUNDARY && (s = S.INTERIOR), o) {
                    case ni.INTERSECTION:
                        return r === S.INTERIOR && s === S.INTERIOR;
                    case ni.UNION:
                        return r === S.INTERIOR || s === S.INTERIOR;
                    case ni.DIFFERENCE:
                        return r === S.INTERIOR && s !== S.INTERIOR;
                    case ni.SYMDIFFERENCE:
                        return r === S.INTERIOR && s !== S.INTERIOR || r !== S.INTERIOR && s === S.INTERIOR
                }
                return !1
            }
        }, ni.INTERSECTION = 1, ni.UNION = 2, ni.DIFFERENCE = 3, ni.SYMDIFFERENCE = 4, e(ii.prototype, {
            selfSnap: function(t) {
                return new xe(t).snapTo(t, this.snapTolerance)
            },
            removeCommonBits: function(t) {
                this.cbr = new Ce, this.cbr.add(t[0]), this.cbr.add(t[1]);
                var e = new Array(2).fill(null);
                return e[0] = this.cbr.removeCommonBits(t[0].copy()), e[1] = this.cbr.removeCommonBits(t[1].copy()), e
            },
            prepareResult: function(t) {
                return this.cbr.addCommonBits(t), t
            },
            getResultGeometry: function(t) {
                var e = this.snap(this.geom),
                    n = ni.overlayOp(e[0], e[1], t);
                return this.prepareResult(n)
            },
            checkValid: function(t) {
                t.isValid() || A.out.println("Snapped geometry is invalid")
            },
            computeSnapTolerance: function() {
                this.snapTolerance = xe.computeOverlaySnapTolerance(this.geom[0], this.geom[1])
            },
            snap: function(t) {
                var e = this.removeCommonBits(t);
                return xe.snap(e[0], e[1], this.snapTolerance)
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return ii
            }
        }), ii.overlayOp = function(t, e, n) {
            return new ii(t, e).getResultGeometry(n)
        }, ii.union = function(t, e) {
            return ii.overlayOp(t, e, ni.UNION)
        }, ii.intersection = function(t, e) {
            return ii.overlayOp(t, e, ni.INTERSECTION)
        }, ii.symDifference = function(t, e) {
            return ii.overlayOp(t, e, ni.SYMDIFFERENCE)
        }, ii.difference = function(t, e) {
            return ii.overlayOp(t, e, ni.DIFFERENCE)
        }, e(ri.prototype, {
            getResultGeometry: function(t) {
                var e = null,
                    n = !1,
                    i = null;
                try {
                    e = ni.overlayOp(this.geom[0], this.geom[1], t);
                    n = !0
                } catch (t) {
                    if (!(t instanceof l)) throw t;
                    i = t
                }
                if (!n) try {
                    e = ii.overlayOp(this.geom[0], this.geom[1], t)
                } catch (t) {
                    throw t instanceof l ? i : t
                }
                return e
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return ri
            }
        }), ri.overlayOp = function(t, e, n) {
            return new ri(t, e).getResultGeometry(n)
        }, ri.union = function(t, e) {
            return ri.overlayOp(t, e, ni.UNION)
        }, ri.intersection = function(t, e) {
            return ri.overlayOp(t, e, ni.INTERSECTION)
        }, ri.symDifference = function(t, e) {
            return ri.overlayOp(t, e, ni.SYMDIFFERENCE)
        }, ri.difference = function(t, e) {
            return ri.overlayOp(t, e, ni.DIFFERENCE)
        }, e(si.prototype, {
            addPolygon: function(t) {
                if (t.isEmpty()) return null;
                var e = null,
                    n = 0,
                    i = this.horizontalBisector(t);
                if (0 === i.getLength()) n = 0, e = i.getCoordinate();
                else {
                    var r = ri.overlayOp(i, t, ni.INTERSECTION),
                        s = this.widestGeometry(r);
                    n = s.getEnvelopeInternal().getWidth(), e = si.centre(s.getEnvelopeInternal())
                }(null === this.interiorPoint || n > this.maxWidth) && (this.interiorPoint = e, this.maxWidth = n)
            },
            getInteriorPoint: function() {
                return this.interiorPoint
            },
            widestGeometry: function() {
                if (arguments[0] instanceof ft) {
                    var t = arguments[0];
                    if (t.isEmpty()) return t;
                    for (var e = t.getGeometryN(0), n = 1; n < t.getNumGeometries(); n++) t.getGeometryN(n).getEnvelopeInternal().getWidth() > e.getEnvelopeInternal().getWidth() && (e = t.getGeometryN(n));
                    return e
                }
                if (arguments[0] instanceof B) {
                    var i = arguments[0];
                    return i instanceof ft ? this.widestGeometry(i) : i
                }
            },
            horizontalBisector: function(t) {
                var e = t.getEnvelopeInternal(),
                    n = oi.getBisectorY(t);
                return this.factory.createLineString([new g(e.getMinX(), n), new g(e.getMaxX(), n)])
            },
            add: function(t) {
                if (t instanceof bt) this.addPolygon(t);
                else if (t instanceof ft)
                    for (var e = t, n = 0; n < e.getNumGeometries(); n++) this.add(e.getGeometryN(n))
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return si
            }
        }), si.centre = function(t) {
            return new g(si.avg(t.getMinX(), t.getMaxX()), si.avg(t.getMinY(), t.getMaxY()))
        }, si.avg = function(t, e) {
            return (t + e) / 2
        }, e(oi.prototype, {
            updateInterval: function(t) {
                t <= this.centreY ? t > this.loY && (this.loY = t) : t > this.centreY && t < this.hiY && (this.hiY = t)
            },
            getBisectorY: function() {
                this.process(this.poly.getExteriorRing());
                for (var t = 0; t < this.poly.getNumInteriorRing(); t++) this.process(this.poly.getInteriorRingN(t));
                return si.avg(this.hiY, this.loY)
            },
            process: function(t) {
                for (var e = t.getCoordinateSequence(), n = 0; n < e.size(); n++) {
                    var i = e.getY(n);
                    this.updateInterval(i)
                }
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return oi
            }
        }), oi.getBisectorY = function(t) {
            return new oi(t).getBisectorY()
        }, si.SafeBisectorFinder = oi, e(ai.prototype, {
            addEndpoints: function() {
                if (arguments[0] instanceof B) {
                    var t = arguments[0];
                    if (t instanceof Lt) this.addEndpoints(t.getCoordinates());
                    else if (t instanceof ft)
                        for (var e = t, n = 0; n < e.getNumGeometries(); n++) this.addEndpoints(e.getGeometryN(n))
                } else if (arguments[0] instanceof Array) {
                    var i = arguments[0];
                    this.add(i[0]), this.add(i[i.length - 1])
                }
            },
            getInteriorPoint: function() {
                return this.interiorPoint
            },
            addInterior: function() {
                if (arguments[0] instanceof B) {
                    var t = arguments[0];
                    if (t instanceof Lt) this.addInterior(t.getCoordinates());
                    else if (t instanceof ft)
                        for (var e = t, n = 0; n < e.getNumGeometries(); n++) this.addInterior(e.getGeometryN(n))
                } else if (arguments[0] instanceof Array)
                    for (var i = arguments[0], n = 1; n < i.length - 1; n++) this.add(i[n])
            },
            add: function(t) {
                var e = t.distance(this.centroid);
                e < this.minDistance && (this.interiorPoint = new g(t), this.minDistance = e)
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return ai
            }
        }), e(ui.prototype, {
            getInteriorPoint: function() {
                return this.interiorPoint
            },
            add: function() {
                if (arguments[0] instanceof B) {
                    var t = arguments[0];
                    if (t instanceof St) this.add(t.getCoordinate());
                    else if (t instanceof ft)
                        for (var e = t, n = 0; n < e.getNumGeometries(); n++) this.add(e.getGeometryN(n))
                } else if (arguments[0] instanceof g) {
                    var i = arguments[0],
                        r = i.distance(this.centroid);
                    r < this.minDistance && (this.interiorPoint = new g(i), this.minDistance = r)
                }
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return ui
            }
        }), e(li.prototype, {
            select: function() {
                if (1 === arguments.length) arguments[0];
                else if (2 === arguments.length) {
                    var t = arguments[0],
                        e = arguments[1];
                    t.getLineSegment(e, this.selectedSegment), this.select(this.selectedSegment)
                }
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return li
            }
        }), e(hi.prototype, {
            hasChildren: function() {
                for (var t = 0; t < 2; t++)
                    if (null !== this.subnode[t]) return !0;
                return !1
            },
            isPrunable: function() {
                return !(this.hasChildren() || this.hasItems())
            },
            addAllItems: function(t) {
                t.addAll(this.items);
                for (var e = 0; e < 2; e++) null !== this.subnode[e] && this.subnode[e].addAllItems(t);
                return t
            },
            size: function() {
                for (var t = 0, e = 0; e < 2; e++) null !== this.subnode[e] && (t += this.subnode[e].size());
                return t + this.items.size()
            },
            addAllItemsFromOverlapping: function(t, e) {
                return null === t || this.isSearchMatch(t) ? (e.addAll(this.items), null !== this.subnode[0] && this.subnode[0].addAllItemsFromOverlapping(t, e), void(null !== this.subnode[1] && this.subnode[1].addAllItemsFromOverlapping(t, e))) : null
            },
            hasItems: function() {
                return !this.items.isEmpty()
            },
            remove: function(t, e) {
                if (!this.isSearchMatch(t)) return !1;
                for (var n = !1, i = 0; i < 2; i++)
                    if (null !== this.subnode[i] && (n = this.subnode[i].remove(t, e))) {
                        this.subnode[i].isPrunable() && (this.subnode[i] = null);
                        break
                    }
                return n || (n = this.items.remove(e))
            },
            getItems: function() {
                return this.items
            },
            depth: function() {
                for (var t = 0, e = 0; e < 2; e++)
                    if (null !== this.subnode[e]) {
                        var n = this.subnode[e].depth();
                        n > t && (t = n)
                    }
                return t + 1
            },
            nodeSize: function() {
                for (var t = 0, e = 0; e < 2; e++) null !== this.subnode[e] && (t += this.subnode[e].nodeSize());
                return t + 1
            },
            add: function(t) {
                this.items.add(t)
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return hi
            }
        }), hi.getSubnodeIndex = function(t, e) {
            var n = -1;
            return t.min >= e && (n = 1), t.max <= e && (n = 0), n
        }, e(ci.prototype, {
            expandToInclude: function(t) {
                t.max > this.max && (this.max = t.max), t.min < this.min && (this.min = t.min)
            },
            getWidth: function() {
                return this.max - this.min
            },
            overlaps: function() {
                if (1 === arguments.length) {
                    var t = arguments[0];
                    return this.overlaps(t.min, t.max)
                }
                if (2 === arguments.length) {
                    var e = arguments[0],
                        n = arguments[1];
                    return !(this.min > n || this.max < e)
                }
            },
            getMin: function() {
                return this.min
            },
            toString: function() {
                return "[" + this.min + ", " + this.max + "]"
            },
            contains: function() {
                if (1 === arguments.length) {
                    if (arguments[0] instanceof ci) {
                        var t = arguments[0];
                        return this.contains(t.min, t.max)
                    }
                    if ("number" == typeof arguments[0]) {
                        var e = arguments[0];
                        return e >= this.min && e <= this.max
                    }
                } else if (2 === arguments.length) {
                    var n = arguments[0],
                        i = arguments[1];
                    return n >= this.min && i <= this.max
                }
            },
            init: function(t, e) {
                this.min = t, this.max = e, t > e && (this.min = e, this.max = t)
            },
            getMax: function() {
                return this.max
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return ci
            }
        }), fi.exponent = function(t) {
            return gi(64, t) - 1023
        }, fi.powerOf2 = function(t) {
            return Math.pow(2, t)
        }, e(di.prototype, {
            getInterval: function() {
                return this.interval
            },
            getLevel: function() {
                return this.level
            },
            computeKey: function(t) {
                for (this.level = di.computeLevel(t), this.interval = new ci, this.computeInterval(this.level, t); !this.interval.contains(t);) this.level += 1, this.computeInterval(this.level, t)
            },
            computeInterval: function(t, e) {
                var n = fi.powerOf2(t);
                this.pt = Math.floor(e.getMin() / n) * n, this.interval.init(this.pt, this.pt + n)
            },
            getPoint: function() {
                return this.pt
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return di
            }
        }), di.computeLevel = function(t) {
            var e = t.getWidth();
            return fi.exponent(e) + 1
        }, h(pi, hi), e(pi.prototype, {
            getInterval: function() {
                return this.interval
            },
            find: function(t) {
                var e = hi.getSubnodeIndex(t, this.centre);
                if (-1 === e) return this;
                if (null !== this.subnode[e]) {
                    return this.subnode[e].find(t)
                }
                return this
            },
            insert: function(t) {
                f.isTrue(null === this.interval || this.interval.contains(t.interval));
                var e = hi.getSubnodeIndex(t.interval, this.centre);
                if (t.level === this.level - 1) this.subnode[e] = t;
                else {
                    var n = this.createSubnode(e);
                    n.insert(t), this.subnode[e] = n
                }
            },
            isSearchMatch: function(t) {
                return t.overlaps(this.interval)
            },
            getSubnode: function(t) {
                return null === this.subnode[t] && (this.subnode[t] = this.createSubnode(t)), this.subnode[t]
            },
            getNode: function(t) {
                var e = hi.getSubnodeIndex(t, this.centre);
                if (-1 !== e) {
                    return this.getSubnode(e).getNode(t)
                }
                return this
            },
            createSubnode: function(t) {
                var e = 0,
                    n = 0;
                switch (t) {
                    case 0:
                        e = this.interval.getMin(), n = this.centre;
                        break;
                    case 1:
                        e = this.centre, n = this.interval.getMax()
                }
                return new pi(new ci(e, n), this.level - 1)
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return pi
            }
        }), pi.createNode = function(t) {
            var e = new di(t);
            return new pi(e.getInterval(), e.getLevel())
        }, pi.createExpanded = function(t, e) {
            var n = new ci(e);
            null !== t && n.expandToInclude(t.interval);
            var i = pi.createNode(n);
            return null !== t && i.insert(t), i
        }, e(mi.prototype, {
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return mi
            }
        });
        mi.isZeroWidth = function(t, e) {
            var n = e - t;
            if (0 === n) return !0;
            var i = Math.max(Math.abs(t), Math.abs(e)),
                r = n / i;
            return fi.exponent(r) <= mi.MIN_BINARY_EXPONENT
        }, mi.MIN_BINARY_EXPONENT = -50, h(vi, hi), e(vi.prototype, {
            insert: function(t, e) {
                var n = hi.getSubnodeIndex(t, vi.origin);
                if (-1 === n) return this.add(e), null;
                var i = this.subnode[n];
                if (null === i || !i.getInterval().contains(t)) {
                    var r = pi.createExpanded(i, t);
                    this.subnode[n] = r
                }
                this.insertContained(this.subnode[n], t, e)
            },
            isSearchMatch: function(t) {
                return !0
            },
            insertContained: function(t, e, n) {
                f.isTrue(t.getInterval().contains(e));
                var i = mi.isZeroWidth(e.getMin(), e.getMax()),
                    r = null;
                r = i ? t.find(e) : t.getNode(e), r.add(n)
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return vi
            }
        }), vi.origin = 0, e(yi.prototype, {
            size: function() {
                return null !== this.root ? this.root.size() : 0
            },
            insert: function(t, e) {
                this.collectStats(t);
                var n = yi.ensureExtent(t, this.minExtent);
                this.root.insert(n, e)
            },
            query: function() {
                if (1 === arguments.length) {
                    if ("number" == typeof arguments[0]) {
                        var t = arguments[0];
                        return this.query(new ci(t, t))
                    }
                    if (arguments[0] instanceof ci) {
                        var e = arguments[0],
                            n = new I;
                        return this.query(e, n), n
                    }
                } else if (2 === arguments.length) {
                    var i = arguments[0],
                        r = arguments[1];
                    this.root.addAllItemsFromOverlapping(i, r)
                }
            },
            iterator: function() {
                var t = new I;
                return this.root.addAllItems(t), t.iterator()
            },
            remove: function(t, e) {
                var n = yi.ensureExtent(t, this.minExtent);
                return this.root.remove(n, e)
            },
            collectStats: function(t) {
                var e = t.getWidth();
                e < this.minExtent && e > 0 && (this.minExtent = e)
            },
            depth: function() {
                return null !== this.root ? this.root.depth() : 0
            },
            nodeSize: function() {
                return null !== this.root ? this.root.nodeSize() : 0
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return yi
            }
        }), yi.ensureExtent = function(t, e) {
            var n = t.getMin(),
                i = t.getMax();
            return n !== i ? t : (n === i && (n -= e / 2, i = n + e / 2), new ci(n, i))
        }, e(Ei.prototype, {
            isInside: function(t) {},
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Ei
            }
        }), e(xi.prototype, {
            testLineSegment: function(t, e) {
                var n = null,
                    i = null,
                    r = null,
                    s = null,
                    o = e.p0,
                    a = e.p1;
                n = o.x - t.x, i = o.y - t.y, r = a.x - t.x, s = a.y - t.y, (i > 0 && s <= 0 || s > 0 && i <= 0) && 0 < ae.signOfDet2x2(n, i, r, s) / (s - i) && this.crossings++
            },
            buildIndex: function() {
                this.tree = new yi;
                for (var t = H.removeRepeatedPoints(this.ring.getCoordinates()), e = Qe.getChains(t), n = 0; n < e.size(); n++) {
                    var i = e.get(n),
                        r = i.getEnvelope();
                    this.interval.min = r.getMinY(), this.interval.max = r.getMaxY(), this.tree.insert(this.interval, i)
                }
            },
            testMonotoneChain: function(t, e, n) {
                n.select(t, e)
            },
            isInside: function(t) {
                this.crossings = 0;
                var e = new C(r.NEGATIVE_INFINITY, r.POSITIVE_INFINITY, t.y, t.y);
                this.interval.min = t.y, this.interval.max = t.y;
                for (var n = this.tree.query(this.interval), i = new Ii(this, t), s = n.iterator(); s.hasNext();) {
                    var o = s.next();
                    this.testMonotoneChain(e, i, o)
                }
                return this.crossings % 2 == 1
            },
            interfaces_: function() {
                return [Ei]
            },
            getClass: function() {
                return xi
            }
        }), h(Ii, li), e(Ii.prototype, {
            select: function() {
                if (1 !== arguments.length) return li.prototype.select.apply(this, arguments);
                var t = arguments[0];
                this.mcp.testLineSegment(this.p, t)
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Ii
            }
        }), xi.MCSelecter = Ii, e(Ni.prototype, {
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Ni
            }
        }), Ni.toDegrees = function(t) {
            return 180 * t / Math.PI
        }, Ni.normalize = function(t) {
            for (; t > Math.PI;) t -= Ni.PI_TIMES_2;
            for (; t <= -Math.PI;) t += Ni.PI_TIMES_2;
            return t
        }, Ni.angle = function() {
            if (1 === arguments.length) {
                var t = arguments[0];
                return Math.atan2(t.y, t.x)
            }
            if (2 === arguments.length) {
                var e = arguments[0],
                    n = arguments[1],
                    i = n.x - e.x,
                    r = n.y - e.y;
                return Math.atan2(r, i)
            }
        }, Ni.isAcute = function(t, e, n) {
            var i = t.x - e.x,
                r = t.y - e.y;
            return i * (n.x - e.x) + r * (n.y - e.y) > 0
        }, Ni.isObtuse = function(t, e, n) {
            var i = t.x - e.x,
                r = t.y - e.y;
            return i * (n.x - e.x) + r * (n.y - e.y) < 0
        }, Ni.interiorAngle = function(t, e, n) {
            var i = Ni.angle(e, t),
                r = Ni.angle(e, n);
            return Math.abs(r - i)
        }, Ni.normalizePositive = function(t) {
            if (t < 0) {
                for (; t < 0;) t += Ni.PI_TIMES_2;
                t >= Ni.PI_TIMES_2 && (t = 0)
            } else {
                for (; t >= Ni.PI_TIMES_2;) t -= Ni.PI_TIMES_2;
                t < 0 && (t = 0)
            }
            return t
        }, Ni.angleBetween = function(t, e, n) {
            var i = Ni.angle(e, t),
                r = Ni.angle(e, n);
            return Ni.diff(i, r)
        }, Ni.diff = function(t, e) {
            var n = null;
            return n = t < e ? e - t : t - e, n > Math.PI && (n = 2 * Math.PI - n), n
        }, Ni.toRadians = function(t) {
            return t * Math.PI / 180
        }, Ni.getTurn = function(t, e) {
            var n = Math.sin(e - t);
            return n > 0 ? Ni.COUNTERCLOCKWISE : n < 0 ? Ni.CLOCKWISE : Ni.NONE
        }, Ni.angleBetweenOriented = function(t, e, n) {
            var i = Ni.angle(e, t),
                r = Ni.angle(e, n),
                s = r - i;
            return s <= -Math.PI ? s + Ni.PI_TIMES_2 : s > Math.PI ? s - Ni.PI_TIMES_2 : s
        }, Ni.PI_TIMES_2 = 2 * Math.PI, Ni.PI_OVER_2 = Math.PI / 2, Ni.PI_OVER_4 = Math.PI / 4, Ni.COUNTERCLOCKWISE = le.COUNTERCLOCKWISE, Ni.CLOCKWISE = le.CLOCKWISE, Ni.NONE = le.COLLINEAR, e(Ci.prototype, {
            area: function() {
                return Ci.area(this.p0, this.p1, this.p2)
            },
            signedArea: function() {
                return Ci.signedArea(this.p0, this.p1, this.p2)
            },
            interpolateZ: function(t) {
                if (null === t) throw new i("Supplied point is null.");
                return Ci.interpolateZ(t, this.p0, this.p1, this.p2)
            },
            longestSideLength: function() {
                return Ci.longestSideLength(this.p0, this.p1, this.p2)
            },
            isAcute: function() {
                return Ci.isAcute(this.p0, this.p1, this.p2)
            },
            circumcentre: function() {
                return Ci.circumcentre(this.p0, this.p1, this.p2)
            },
            area3D: function() {
                return Ci.area3D(this.p0, this.p1, this.p2)
            },
            centroid: function() {
                return Ci.centroid(this.p0, this.p1, this.p2)
            },
            inCentre: function() {
                return Ci.inCentre(this.p0, this.p1, this.p2)
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Ci
            }
        }), Ci.area = function(t, e, n) {
            return Math.abs(((n.x - t.x) * (e.y - t.y) - (e.x - t.x) * (n.y - t.y)) / 2)
        }, Ci.signedArea = function(t, e, n) {
            return ((n.x - t.x) * (e.y - t.y) - (e.x - t.x) * (n.y - t.y)) / 2
        }, Ci.det = function(t, e, n, i) {
            return t * i - e * n
        }, Ci.interpolateZ = function(t, e, n, i) {
            var r = e.x,
                s = e.y,
                o = n.x - r,
                a = i.x - r,
                u = n.y - s,
                l = i.y - s,
                h = o * l - a * u,
                c = t.x - r,
                f = t.y - s,
                g = (l * c - a * f) / h,
                d = (-u * c + o * f) / h;
            return e.z + g * (n.z - e.z) + d * (i.z - e.z)
        }, Ci.longestSideLength = function(t, e, n) {
            var i = t.distance(e),
                r = e.distance(n),
                s = n.distance(t),
                o = i;
            return r > o && (o = r), s > o && (o = s), o
        }, Ci.isAcute = function(t, e, n) {
            return !!Ni.isAcute(t, e, n) && !!Ni.isAcute(e, n, t) && !!Ni.isAcute(n, t, e)
        }, Ci.circumcentre = function(t, e, n) {
            var i = n.x,
                r = n.y,
                s = t.x - i,
                o = t.y - r,
                a = e.x - i,
                u = e.y - r,
                l = 2 * Ci.det(s, o, a, u);
            return new g(i - Ci.det(o, s * s + o * o, u, a * a + u * u) / l, r + Ci.det(s, s * s + o * o, a, a * a + u * u) / l)
        }, Ci.perpendicularBisector = function(t, e) {
            var n = e.x - t.x,
                i = e.y - t.y;
            return new F(new F(t.x + n / 2, t.y + i / 2, 1), new F(t.x - i + n / 2, t.y + n + i / 2, 1))
        }, Ci.angleBisector = function(t, e, n) {
            var i = e.distance(t),
                r = e.distance(n),
                s = i / (i + r),
                o = n.x - t.x,
                a = n.y - t.y;
            return new g(t.x + s * o, t.y + s * a)
        }, Ci.area3D = function(t, e, n) {
            var i = e.x - t.x,
                r = e.y - t.y,
                s = e.z - t.z,
                o = n.x - t.x,
                a = n.y - t.y,
                u = n.z - t.z,
                l = r * u - s * a,
                h = s * o - i * u,
                c = i * a - r * o,
                f = l * l + h * h + c * c;
            return Math.sqrt(f) / 2
        }, Ci.centroid = function(t, e, n) {
            return new g((t.x + e.x + n.x) / 3, (t.y + e.y + n.y) / 3)
        }, Ci.inCentre = function(t, e, n) {
            var i = e.distance(n),
                r = t.distance(n),
                s = t.distance(e),
                o = i + r + s;
            return new g((i * t.x + r * e.x + s * n.x) / o, (i * t.y + r * e.y + s * n.y) / o)
        }, e(Li.prototype, {
            getRadius: function() {
                return this.compute(), this.radius
            },
            getDiameter: function() {
                switch (this.compute(), this.extremalPts.length) {
                    case 0:
                        return this.input.getFactory().createLineString();
                    case 1:
                        return this.input.getFactory().createPoint(this.centre)
                }
                var t = this.extremalPts[0],
                    e = this.extremalPts[1];
                return this.input.getFactory().createLineString([t, e])
            },
            getExtremalPoints: function() {
                return this.compute(), this.extremalPts
            },
            computeCirclePoints: function() {
                if (this.input.isEmpty()) return this.extremalPts = new Array(0).fill(null), null;
                if (1 === this.input.getNumPoints()) {
                    var t = this.input.getCoordinates();
                    return this.extremalPts = [new g(t[0])], null
                }
                var e = this.input.convexHull(),
                    n = e.getCoordinates(),
                    t = n;
                if (n[0].equals2D(n[n.length - 1]) && (t = new Array(n.length - 1).fill(null), H.copyDeep(n, 0, t, 0, n.length - 1)), t.length <= 2) return this.extremalPts = H.copyDeep(t), null;
                for (var i = Li.lowestPoint(t), r = Li.pointWitMinAngleWithX(t, i), s = 0; s < t.length; s++) {
                    var o = Li.pointWithMinAngleWithSegment(t, i, r);
                    if (Ni.isObtuse(i, o, r)) return this.extremalPts = [new g(i), new g(r)], null;
                    if (Ni.isObtuse(o, i, r)) i = o;
                    else {
                        if (!Ni.isObtuse(o, r, i)) return this.extremalPts = [new g(i), new g(r), new g(o)], null;
                        r = o
                    }
                }
                f.shouldNeverReachHere("Logic failure in Minimum Bounding Circle algorithm!")
            },
            compute: function() {
                return null !== this.extremalPts ? null : (this.computeCirclePoints(), this.computeCentre(), void(null !== this.centre && (this.radius = this.centre.distance(this.extremalPts[0]))))
            },
            getFarthestPoints: function() {
                switch (this.compute(), this.extremalPts.length) {
                    case 0:
                        return this.input.getFactory().createLineString();
                    case 1:
                        return this.input.getFactory().createPoint(this.centre)
                }
                var t = this.extremalPts[0],
                    e = this.extremalPts[this.extremalPts.length - 1];
                return this.input.getFactory().createLineString([t, e])
            },
            getCircle: function() {
                if (this.compute(), null === this.centre) return this.input.getFactory().createPolygon();
                var t = this.input.getFactory().createPoint(this.centre);
                return 0 === this.radius ? t : t.buffer(this.radius)
            },
            getCentre: function() {
                return this.compute(), this.centre
            },
            computeCentre: function() {
                switch (this.extremalPts.length) {
                    case 0:
                        this.centre = null;
                        break;
                    case 1:
                        this.centre = this.extremalPts[0];
                        break;
                    case 2:
                        this.centre = new g((this.extremalPts[0].x + this.extremalPts[1].x) / 2, (this.extremalPts[0].y + this.extremalPts[1].y) / 2);
                        break;
                    case 3:
                        this.centre = Ci.circumcentre(this.extremalPts[0], this.extremalPts[1], this.extremalPts[2])
                }
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Li
            }
        }), Li.pointWitMinAngleWithX = function(t, e) {
            for (var n = r.MAX_VALUE, i = null, s = 0; s < t.length; s++) {
                var o = t[s];
                if (o !== e) {
                    var a = o.x - e.x,
                        u = o.y - e.y;
                    u < 0 && (u = -u);
                    var l = Math.sqrt(a * a + u * u),
                        h = u / l;
                    h < n && (n = h, i = o)
                }
            }
            return i
        }, Li.lowestPoint = function(t) {
            for (var e = t[0], n = 1; n < t.length; n++) t[n].y < e.y && (e = t[n]);
            return e
        }, Li.pointWithMinAngleWithSegment = function(t, e, n) {
            for (var i = r.MAX_VALUE, s = null, o = 0; o < t.length; o++) {
                var a = t[o];
                if (a !== e && a !== n) {
                    var u = Ni.angleBetween(e, a, n);
                    u < i && (i = u, s = a)
                }
            }
            return s
        }, e(_i.prototype, {
            getWidthCoordinate: function() {
                return this.computeMinimumDiameter(), this.minWidthPt
            },
            getSupportingSegment: function() {
                return this.computeMinimumDiameter(), this.inputGeom.getFactory().createLineString([this.minBaseSeg.p0, this.minBaseSeg.p1])
            },
            getDiameter: function() {
                if (this.computeMinimumDiameter(), null === this.minWidthPt) return this.inputGeom.getFactory().createLineString(null);
                var t = this.minBaseSeg.project(this.minWidthPt);
                return this.inputGeom.getFactory().createLineString([t, this.minWidthPt])
            },
            computeWidthConvex: function(t) {
                this.convexHullPts = t instanceof bt ? t.getExteriorRing().getCoordinates() : t.getCoordinates(), 0 === this.convexHullPts.length ? (this.minWidth = 0, this.minWidthPt = null, this.minBaseSeg = null) : 1 === this.convexHullPts.length ? (this.minWidth = 0, this.minWidthPt = this.convexHullPts[0], this.minBaseSeg.p0 = this.convexHullPts[0], this.minBaseSeg.p1 = this.convexHullPts[0]) : 2 === this.convexHullPts.length || 3 === this.convexHullPts.length ? (this.minWidth = 0, this.minWidthPt = this.convexHullPts[0], this.minBaseSeg.p0 = this.convexHullPts[0], this.minBaseSeg.p1 = this.convexHullPts[1]) : this.computeConvexRingMinDiameter(this.convexHullPts)
            },
            computeConvexRingMinDiameter: function(t) {
                this.minWidth = r.MAX_VALUE;
                for (var e = 1, n = new he, i = 0; i < t.length - 1; i++) n.p0 = t[i], n.p1 = t[i + 1], e = this.findMaxPerpDistance(t, n, e)
            },
            computeMinimumDiameter: function() {
                if (null !== this.minWidthPt) return null;
                if (this.isConvex) this.computeWidthConvex(this.inputGeom);
                else {
                    var t = new me(this.inputGeom).getConvexHull();
                    this.computeWidthConvex(t)
                }
            },
            getLength: function() {
                return this.computeMinimumDiameter(), this.minWidth
            },
            findMaxPerpDistance: function(t, e, n) {
                for (var i = e.distancePerpendicular(t[n]), r = i, s = n, o = s; r >= i;) i = r, s = o, o = _i.nextIndex(t, s), r = e.distancePerpendicular(t[o]);
                return i < this.minWidth && (this.minPtIndex = s, this.minWidth = i, this.minWidthPt = t[this.minPtIndex], this.minBaseSeg = new he(e)), s
            },
            getMinimumRectangle: function() {
                if (this.computeMinimumDiameter(), 0 === this.minWidth) return this.minBaseSeg.p0.equals2D(this.minBaseSeg.p1) ? this.inputGeom.getFactory().createPoint(this.minBaseSeg.p0) : this.minBaseSeg.toGeometry(this.inputGeom.getFactory());
                for (var t = this.minBaseSeg.p1.x - this.minBaseSeg.p0.x, e = this.minBaseSeg.p1.y - this.minBaseSeg.p0.y, n = r.MAX_VALUE, i = -r.MAX_VALUE, s = r.MAX_VALUE, o = -r.MAX_VALUE, a = 0; a < this.convexHullPts.length; a++) {
                    var u = _i.computeC(t, e, this.convexHullPts[a]);
                    u > i && (i = u), u < n && (n = u);
                    var l = _i.computeC(-e, t, this.convexHullPts[a]);
                    l > o && (o = l), l < s && (s = l)
                }
                var h = _i.computeSegmentForLine(-t, -e, o),
                    c = _i.computeSegmentForLine(-t, -e, s),
                    f = _i.computeSegmentForLine(-e, t, i),
                    g = _i.computeSegmentForLine(-e, t, n),
                    d = f.lineIntersection(h),
                    p = g.lineIntersection(h),
                    m = g.lineIntersection(c),
                    v = f.lineIntersection(c),
                    y = this.inputGeom.getFactory().createLinearRing([d, p, m, v, d]);
                return this.inputGeom.getFactory().createPolygon(y, null)
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return _i
            }
        }), _i.nextIndex = function(t, e) {
            return e++, e >= t.length && (e = 0), e
        }, _i.computeC = function(t, e, n) {
            return t * n.y - e * n.x
        }, _i.getMinimumDiameter = function(t) {
            return new _i(t).getDiameter()
        }, _i.getMinimumRectangle = function(t) {
            return new _i(t).getMinimumRectangle()
        }, _i.computeSegmentForLine = function(t, e, n) {
            var i = null,
                r = null;
            return Math.abs(e) > Math.abs(t) ? (i = new g(0, n / e), r = new g(1, n / e - t / e)) : (i = new g(n / t, 0), r = new g(n / t - e / t, 1)), new he(i, r)
        };
        var lo = Object.freeze({
            Centroid: fe,
            CGAlgorithms: le,
            ConvexHull: me,
            InteriorPointArea: si,
            InteriorPointLine: ai,
            InteriorPointPoint: ui,
            RobustLineIntersector: oe,
            MCPointInRing: xi,
            MinimumBoundingCircle: Li,
            MinimumDiameter: _i
        });
        e(Si.prototype, {
            getResultGeometry: function() {
                return new wi(this.distanceTolerance).transform(this.inputGeom)
            },
            setDistanceTolerance: function(t) {
                if (t <= 0) throw new i("Tolerance must be positive");
                this.distanceTolerance = t
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Si
            }
        }), Si.densifyPoints = function(t, e, n) {
            for (var i = new he, r = new N, s = 0; s < t.length - 1; s++) {
                i.p0 = t[s], i.p1 = t[s + 1], r.add(i.p0, !1);
                var o = i.getLength(),
                    a = Math.trunc(o / e) + 1;
                if (a > 1)
                    for (var u = o / a, l = 1; l < a; l++) {
                        var h = l * u / o,
                            c = i.pointAlong(h);
                        n.makePrecise(c), r.add(c, !1)
                    }
            }
            return r.add(t[t.length - 1], !1), r.toCoordinateArray()
        }, Si.densify = function(t, e) {
            var n = new Si(t);
            return n.setDistanceTolerance(e), n.getResultGeometry()
        }, h(wi, ye), e(wi.prototype, {
            transformMultiPolygon: function(t, e) {
                var n = ye.prototype.transformMultiPolygon.call(this, t, e);
                return this.createValidArea(n)
            },
            transformPolygon: function(t, e) {
                var n = ye.prototype.transformPolygon.call(this, t, e);
                return e instanceof Tt ? n : this.createValidArea(n)
            },
            transformCoordinates: function(t, e) {
                var n = t.toCoordinateArray(),
                    i = Si.densifyPoints(n, this.distanceTolerance, e.getPrecisionModel());
                return e instanceof Lt && 1 === i.length && (i = new Array(0).fill(null)), this.factory.getCoordinateSequenceFactory().create(i)
            },
            createValidArea: function(t) {
                return t.buffer(0)
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return wi
            }
        }), Si.DensifyTransformer = wi;
        var ho = Object.freeze({
            Densifier: Si
        });
        e(bi.prototype, {
            find: function(t) {
                var e = this;
                do {
                    if (null === e) return null;
                    if (e.dest().equals2D(t)) return e;
                    e = e.oNext()
                } while (e !== this);
                return null
            },
            dest: function() {
                return this._sym._orig
            },
            oNext: function() {
                return this._sym._next
            },
            insert: function(t) {
                if (this.oNext() === this) return this.insertAfter(t), null;
                var e = this.compareTo(t),
                    n = this;
                do {
                    var i = n.oNext();
                    if (i.compareTo(t) !== e || i === this) return n.insertAfter(t), null;
                    n = i
                } while (n !== this);
                f.shouldNeverReachHere()
            },
            insertAfter: function(t) {
                f.equals(this._orig, t.orig());
                var e = this.oNext();
                this._sym.setNext(t), t.sym().setNext(e)
            },
            degree: function() {
                var t = 0,
                    e = this;
                do {
                    t++, e = e.oNext()
                } while (e !== this);
                return t
            },
            equals: function() {
                if (2 === arguments.length) {
                    var t = arguments[0],
                        e = arguments[1];
                    return this._orig.equals2D(t) && this._sym._orig.equals(e)
                }
            },
            deltaY: function() {
                return this._sym._orig.y - this._orig.y
            },
            sym: function() {
                return this._sym
            },
            prev: function() {
                return this._sym.next()._sym
            },
            compareAngularDirection: function(t) {
                var e = this.deltaX(),
                    n = this.deltaY(),
                    i = t.deltaX(),
                    r = t.deltaY();
                if (e === i && n === r) return 0;
                var s = Ze.quadrant(e, n),
                    o = Ze.quadrant(i, r);
                return s > o ? 1 : s < o ? -1 : le.computeOrientation(t._orig, t.dest(), this.dest())
            },
            prevNode: function() {
                for (var t = this; 2 === t.degree();)
                    if ((t = t.prev()) === this) return null;
                return t
            },
            compareTo: function(t) {
                var e = t;
                return this.compareAngularDirection(e)
            },
            next: function() {
                return this._next
            },
            setSym: function(t) {
                this._sym = t
            },
            orig: function() {
                return this._orig
            },
            toString: function() {
                return "HE(" + this._orig.x + " " + this._orig.y + ", " + this._sym._orig.x + " " + this._sym._orig.y + ")"
            },
            setNext: function(t) {
                this._next = t
            },
            init: function(t) {
                this.setSym(t), t.setSym(this), this.setNext(t), t.setNext(this)
            },
            deltaX: function() {
                return this._sym._orig.x - this._orig.x
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return bi
            }
        }), bi.init = function(t, e) {
            if (null !== t._sym || null !== e._sym || null !== t._next || null !== e._next) throw new IllegalStateException("Edges are already initialized");
            return t.init(e), t
        }, bi.create = function(t, e) {
            var n = new bi(t),
                i = new bi(e);
            return n.init(i), n
        }, h(Ri, bi), e(Ri.prototype, {
            mark: function() {
                this._isMarked = !0
            },
            setMark: function(t) {
                this._isMarked = t
            },
            isMarked: function() {
                return this._isMarked
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Ri
            }
        }), Ri.setMarkBoth = function(t, e) {
            t.setMark(e), t.sym().setMark(e)
        }, Ri.isMarked = function(t) {
            return t.isMarked()
        }, Ri.setMark = function(t, e) {
            t.setMark(e)
        }, Ri.markBoth = function(t) {
            t.mark(), t.sym().mark()
        }, Ri.mark = function(t) {
            t.mark()
        }, e(Mi.prototype, {
            insert: function(t, e, n) {
                var i = this.create(t, e);
                null !== n ? n.insert(i) : this.vertexMap.put(t, i);
                var r = this.vertexMap.get(e);
                return null !== r ? r.insert(i.sym()) : this.vertexMap.put(e, i.sym()), i
            },
            create: function(t, e) {
                var n = this.createEdge(t),
                    i = this.createEdge(e);
                return bi.init(n, i), n
            },
            createEdge: function(t) {
                return new bi(t)
            },
            addEdge: function(t, e) {
                if (!Mi.isValidEdge(t, e)) return null;
                var n = this.vertexMap.get(t),
                    i = null;
                return null !== n && (i = n.find(e)), null !== i ? i : this.insert(t, e, n)
            },
            getVertexEdges: function() {
                return this.vertexMap.values()
            },
            findEdge: function(t, e) {
                var n = this.vertexMap.get(t);
                return null === n ? null : n.find(e)
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Mi
            }
        }), Mi.isValidEdge = function(t, e) {
            return 0 !== e.compareTo(t)
        }, h(Ti, Ri), e(Ti.prototype, {
            setStart: function() {
                this._isStart = !0
            },
            isStart: function() {
                return this._isStart
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Ti
            }
        }), h(Pi, Mi), e(Pi.prototype, {
            createEdge: function(t) {
                return new Ti(t)
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Pi
            }
        }), e(Oi.prototype, {
            addLine: function(t) {
                this.lines.add(this.factory.createLineString(t.toCoordinateArray()))
            },
            updateRingStartEdge: function(t) {
                return t.isStart() || (t = t.sym(), t.isStart()) ? null === this.ringStartEdge ? (this.ringStartEdge = t, null) : void(t.orig().compareTo(this.ringStartEdge.orig()) < 0 && (this.ringStartEdge = t)) : null
            },
            getResult: function() {
                return null === this.result && this.computeResult(), this.result
            },
            process: function(t) {
                var e = t.prevNode();
                null === e && (e = t), this.stackEdges(e), this.buildLines()
            },
            buildRing: function(t) {
                var e = new N,
                    n = t;
                for (e.add(n.orig().copy(), !1); 2 === n.sym().degree();) {
                    var i = n.next();
                    if (i === t) break;
                    e.add(i.orig().copy(), !1), n = i
                }
                e.add(n.dest().copy(), !1), this.addLine(e)
            },
            buildLine: function(t) {
                var e = new N,
                    n = t;
                for (this.ringStartEdge = null, Ri.markBoth(n), e.add(n.orig().copy(), !1); 2 === n.sym().degree();) {
                    this.updateRingStartEdge(n);
                    var i = n.next();
                    if (i === t) return this.buildRing(this.ringStartEdge), null;
                    e.add(i.orig().copy(), !1), n = i, Ri.markBoth(n)
                }
                e.add(n.dest().copy(), !1), this.stackEdges(n.sym()), this.addLine(e)
            },
            stackEdges: function(t) {
                var e = t;
                do {
                    Ri.isMarked(e) || this.nodeEdgeStack.add(e), e = e.oNext()
                } while (e !== t)
            },
            computeResult: function() {
                for (var t = this.graph.getVertexEdges(), e = t.iterator(); e.hasNext();) {
                    var n = e.next();
                    Ri.isMarked(n) || this.process(n)
                }
                this.result = this.factory.buildGeometry(this.lines)
            },
            buildLines: function() {
                for (; !this.nodeEdgeStack.empty();) {
                    var t = this.nodeEdgeStack.pop();
                    Ri.isMarked(t) || this.buildLine(t)
                }
            },
            add: function() {
                if (arguments[0] instanceof B) {
                    arguments[0].apply({
                        interfaces_: function() {
                            return [G]
                        },
                        filter: function(t) {
                            t instanceof Lt && this.add(t)
                        }
                    })
                } else if (w(arguments[0], m))
                    for (var t = arguments[0], e = t.iterator(); e.hasNext();) {
                        var n = e.next();
                        this.add(n)
                    } else if (arguments[0] instanceof Lt) {
                        var i = arguments[0];
                        null === this.factory && (this.factory = i.getFactory());
                        for (var r = i.getCoordinateSequence(), s = !1, e = 1; e < r.size(); e++) {
                            var o = this.graph.addEdge(r.getCoordinate(e - 1), r.getCoordinate(e));
                            null !== o && (s || (o.setStart(), s = !0))
                        }
                    }
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Oi
            }
        }), Oi.dissolve = function(t) {
            var e = new Oi;
            return e.add(t), e.getResult()
        };
        var co = Object.freeze({
                LineDissolver: Oi
            }),
            fo = Object.freeze({
                GeometryGraph: Qn
            });
        e(Di.prototype, {
            hasChildren: function() {
                for (var t = 0; t < 4; t++)
                    if (null !== this.subnode[t]) return !0;
                return !1
            },
            isPrunable: function() {
                return !(this.hasChildren() || this.hasItems())
            },
            addAllItems: function(t) {
                t.addAll(this.items);
                for (var e = 0; e < 4; e++) null !== this.subnode[e] && this.subnode[e].addAllItems(t);
                return t
            },
            getNodeCount: function() {
                for (var t = 0, e = 0; e < 4; e++) null !== this.subnode[e] && (t += this.subnode[e].size());
                return t + 1
            },
            size: function() {
                for (var t = 0, e = 0; e < 4; e++) null !== this.subnode[e] && (t += this.subnode[e].size());
                return t + this.items.size()
            },
            addAllItemsFromOverlapping: function(t, e) {
                if (!this.isSearchMatch(t)) return null;
                e.addAll(this.items);
                for (var n = 0; n < 4; n++) null !== this.subnode[n] && this.subnode[n].addAllItemsFromOverlapping(t, e)
            },
            visitItems: function(t, e) {
                for (var n = this.items.iterator(); n.hasNext();) e.visitItem(n.next())
            },
            hasItems: function() {
                return !this.items.isEmpty()
            },
            remove: function(t, e) {
                if (!this.isSearchMatch(t)) return !1;
                for (var n = !1, i = 0; i < 4; i++)
                    if (null !== this.subnode[i] && (n = this.subnode[i].remove(t, e))) {
                        this.subnode[i].isPrunable() && (this.subnode[i] = null);
                        break
                    }
                return n || (n = this.items.remove(e))
            },
            visit: function(t, e) {
                if (!this.isSearchMatch(t)) return null;
                this.visitItems(t, e);
                for (var n = 0; n < 4; n++) null !== this.subnode[n] && this.subnode[n].visit(t, e)
            },
            getItems: function() {
                return this.items
            },
            depth: function() {
                for (var t = 0, e = 0; e < 4; e++)
                    if (null !== this.subnode[e]) {
                        var n = this.subnode[e].depth();
                        n > t && (t = n)
                    }
                return t + 1
            },
            isEmpty: function() {
                var t = !0;
                this.items.isEmpty() || (t = !1);
                for (var e = 0; e < 4; e++) null !== this.subnode[e] && (this.subnode[e].isEmpty() || (t = !1));
                return t
            },
            add: function(t) {
                this.items.add(t)
            },
            interfaces_: function() {
                return [u]
            },
            getClass: function() {
                return Di
            }
        }), Di.getSubnodeIndex = function(t, e, n) {
            var i = -1;
            return t.getMinX() >= e && (t.getMinY() >= n && (i = 3), t.getMaxY() <= n && (i = 1)), t.getMaxX() <= e && (t.getMinY() >= n && (i = 2), t.getMaxY() <= n && (i = 0)), i
        }, e(Ai.prototype, {
            getLevel: function() {
                return this.level
            },
            computeKey: function() {
                if (1 === arguments.length) {
                    var t = arguments[0];
                    for (this.level = Ai.computeQuadLevel(t), this.env = new C, this.computeKey(this.level, t); !this.env.contains(t);) this.level += 1, this.computeKey(this.level, t)
                } else if (2 === arguments.length) {
                    var e = arguments[0],
                        n = arguments[1],
                        i = fi.powerOf2(e);
                    this.pt.x = Math.floor(n.getMinX() / i) * i, this.pt.y = Math.floor(n.getMinY() / i) * i, this.env.init(this.pt.x, this.pt.x + i, this.pt.y, this.pt.y + i)
                }
            },
            getEnvelope: function() {
                return this.env
            },
            getCentre: function() {
                return new g((this.env.getMinX() + this.env.getMaxX()) / 2, (this.env.getMinY() + this.env.getMaxY()) / 2)
            },
            getPoint: function() {
                return this.pt
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Ai
            }
        }), Ai.computeQuadLevel = function(t) {
            var e = t.getWidth(),
                n = t.getHeight(),
                i = e > n ? e : n;
            return fi.exponent(i) + 1
        }, h(Fi, Di), e(Fi.prototype, {
            find: function(t) {
                var e = Di.getSubnodeIndex(t, this.centrex, this.centrey);
                if (-1 === e) return this;
                if (null !== this.subnode[e]) {
                    return this.subnode[e].find(t)
                }
                return this
            },
            isSearchMatch: function(t) {
                return this.env.intersects(t)
            },
            getSubnode: function(t) {
                return null === this.subnode[t] && (this.subnode[t] = this.createSubnode(t)), this.subnode[t]
            },
            getEnvelope: function() {
                return this.env
            },
            getNode: function(t) {
                var e = Di.getSubnodeIndex(t, this.centrex, this.centrey);
                if (-1 !== e) {
                    return this.getSubnode(e).getNode(t)
                }
                return this
            },
            createSubnode: function(t) {
                var e = 0,
                    n = 0,
                    i = 0,
                    r = 0;
                switch (t) {
                    case 0:
                        e = this.env.getMinX(), n = this.centrex, i = this.env.getMinY(), r = this.centrey;
                        break;
                    case 1:
                        e = this.centrex, n = this.env.getMaxX(), i = this.env.getMinY(), r = this.centrey;
                        break;
                    case 2:
                        e = this.env.getMinX(), n = this.centrex, i = this.centrey, r = this.env.getMaxY();
                        break;
                    case 3:
                        e = this.centrex, n = this.env.getMaxX(), i = this.centrey, r = this.env.getMaxY()
                }
                return new Fi(new C(e, n, i, r), this.level - 1)
            },
            insertNode: function(t) {
                f.isTrue(null === this.env || this.env.contains(t.env));
                var e = Di.getSubnodeIndex(t.env, this.centrex, this.centrey);
                if (t.level === this.level - 1) this.subnode[e] = t;
                else {
                    var n = this.createSubnode(e);
                    n.insertNode(t), this.subnode[e] = n
                }
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Fi
            }
        }), Fi.createNode = function(t) {
            var e = new Ai(t);
            return new Fi(e.getEnvelope(), e.getLevel())
        }, Fi.createExpanded = function(t, e) {
            var n = new C(e);
            null !== t && n.expandToInclude(t.env);
            var i = Fi.createNode(n);
            return null !== t && i.insertNode(t), i
        }, h(ki, Di), e(ki.prototype, {
            insert: function(t, e) {
                var n = Di.getSubnodeIndex(t, ki.origin.x, ki.origin.y);
                if (-1 === n) return this.add(e), null;
                var i = this.subnode[n];
                if (null === i || !i.getEnvelope().contains(t)) {
                    var r = Fi.createExpanded(i, t);
                    this.subnode[n] = r
                }
                this.insertContained(this.subnode[n], t, e)
            },
            isSearchMatch: function(t) {
                return !0
            },
            insertContained: function(t, e, n) {
                f.isTrue(t.getEnvelope().contains(e));
                var i = mi.isZeroWidth(e.getMinX(), e.getMaxX()),
                    r = mi.isZeroWidth(e.getMinY(), e.getMaxY()),
                    s = null;
                s = i || r ? t.find(e) : t.getNode(e), s.add(n)
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return ki
            }
        }), ki.origin = new g(0, 0), e(Gi.prototype, {
            size: function() {
                return null !== this.root ? this.root.size() : 0
            },
            insert: function(t, e) {
                this.collectStats(t);
                var n = Gi.ensureExtent(t, this.minExtent);
                this.root.insert(n, e)
            },
            query: function() {
                if (1 === arguments.length) {
                    var t = arguments[0],
                        e = new Vn;
                    return this.query(t, e), e.getItems()
                }
                if (2 === arguments.length) {
                    var n = arguments[0],
                        i = arguments[1];
                    this.root.visit(n, i)
                }
            },
            queryAll: function() {
                var t = new I;
                return this.root.addAllItems(t), t
            },
            remove: function(t, e) {
                var n = Gi.ensureExtent(t, this.minExtent);
                return this.root.remove(n, e)
            },
            collectStats: function(t) {
                var e = t.getWidth();
                e < this.minExtent && e > 0 && (this.minExtent = e);
                var n = t.getHeight();
                n < this.minExtent && n > 0 && (this.minExtent = n)
            },
            depth: function() {
                return null !== this.root ? this.root.depth() : 0
            },
            isEmpty: function() {
                return null === this.root
            },
            interfaces_: function() {
                return [Ae, u]
            },
            getClass: function() {
                return Gi
            }
        }), Gi.ensureExtent = function(t, e) {
            var n = t.getMinX(),
                i = t.getMaxX(),
                r = t.getMinY(),
                s = t.getMaxY();
            return n !== i && r !== s ? t : (n === i && (n -= e / 2, i = n + e / 2), r === s && (r -= e / 2, s = r + e / 2), new C(n, i, r, s))
        }, Gi.serialVersionUID = -0x678b60c967a25400;
        var go = Object.freeze({
                Quadtree: Gi
            }),
            po = Object.freeze({
                STRtree: ze
            }),
            mo = Object.freeze({
                quadtree: go,
                strtree: po
            }),
            vo = ["Point", "MultiPoint", "LineString", "MultiLineString", "Polygon", "MultiPolygon"];
        e(Bi.prototype, {
            read: function(t) {
                var e = void 0;
                e = "string" == typeof t ? JSON.parse(t) : t;
                var n = e.type;
                if (!yo[n]) throw new Error("Unknown GeoJSON type: " + e.type);
                return -1 !== vo.indexOf(n) ? yo[n].apply(this, [e.coordinates]) : "GeometryCollection" === n ? yo[n].apply(this, [e.geometries]) : yo[n].apply(this, [e])
            },
            write: function(t) {
                var e = t.getGeometryType();
                if (!Eo[e]) throw new Error("Geometry is not supported");
                return Eo[e].apply(this, [t])
            }
        });
        var yo = {
                Feature: function(t) {
                    var e = {};
                    for (var n in t) e[n] = t[n];
                    if (t.geometry) {
                        var i = t.geometry.type;
                        if (!yo[i]) throw new Error("Unknown GeoJSON type: " + t.type);
                        e.geometry = this.read(t.geometry)
                    }
                    return t.bbox && (e.bbox = yo.bbox.apply(this, [t.bbox])), e
                },
                FeatureCollection: function(t) {
                    var e = {};
                    if (t.features) {
                        e.features = [];
                        for (var n = 0; n < t.features.length; ++n) e.features.push(this.read(t.features[n]))
                    }
                    return t.bbox && (e.bbox = this.parse.bbox.apply(this, [t.bbox])), e
                },
                coordinates: function(t) {
                    for (var e = [], n = 0; n < t.length; ++n) {
                        var i = t[n];
                        e.push(new g(i[0], i[1]))
                    }
                    return e
                },
                bbox: function(t) {
                    return this.geometryFactory.createLinearRing([new g(t[0], t[1]), new g(t[2], t[1]), new g(t[2], t[3]), new g(t[0], t[3]), new g(t[0], t[1])])
                },
                Point: function(t) {
                    var e = new g(t[0], t[1]);
                    return this.geometryFactory.createPoint(e)
                },
                MultiPoint: function(t) {
                    for (var e = [], n = 0; n < t.length; ++n) e.push(yo.Point.apply(this, [t[n]]));
                    return this.geometryFactory.createMultiPoint(e)
                },
                LineString: function(t) {
                    var e = yo.coordinates.apply(this, [t]);
                    return this.geometryFactory.createLineString(e)
                },
                MultiLineString: function(t) {
                    for (var e = [], n = 0; n < t.length; ++n) e.push(yo.LineString.apply(this, [t[n]]));
                    return this.geometryFactory.createMultiLineString(e)
                },
                Polygon: function(t) {
                    for (var e = yo.coordinates.apply(this, [t[0]]), n = this.geometryFactory.createLinearRing(e), i = [], r = 1; r < t.length; ++r) {
                        var s = t[r],
                            o = yo.coordinates.apply(this, [s]),
                            a = this.geometryFactory.createLinearRing(o);
                        i.push(a)
                    }
                    return this.geometryFactory.createPolygon(n, i)
                },
                MultiPolygon: function(t) {
                    for (var e = [], n = 0; n < t.length; ++n) {
                        var i = t[n];
                        e.push(yo.Polygon.apply(this, [i]))
                    }
                    return this.geometryFactory.createMultiPolygon(e)
                },
                GeometryCollection: function(t) {
                    for (var e = [], n = 0; n < t.length; ++n) {
                        var i = t[n];
                        e.push(this.read(i))
                    }
                    return this.geometryFactory.createGeometryCollection(e)
                }
            },
            Eo = {
                coordinate: function(t) {
                    return [t.x, t.y]
                },
                Point: function(t) {
                    return {
                        type: "Point",
                        coordinates: Eo.coordinate.apply(this, [t.getCoordinate()])
                    }
                },
                MultiPoint: function(t) {
                    for (var e = [], n = 0; n < t.geometries.length; ++n) {
                        var i = t.geometries[n],
                            r = Eo.Point.apply(this, [i]);
                        e.push(r.coordinates)
                    }
                    return {
                        type: "MultiPoint",
                        coordinates: e
                    }
                },
                LineString: function(t) {
                    for (var e = [], n = t.getCoordinates(), i = 0; i < n.length; ++i) {
                        var r = n[i];
                        e.push(Eo.coordinate.apply(this, [r]))
                    }
                    return {
                        type: "LineString",
                        coordinates: e
                    }
                },
                MultiLineString: function(t) {
                    for (var e = [], n = 0; n < t.geometries.length; ++n) {
                        var i = t.geometries[n],
                            r = Eo.LineString.apply(this, [i]);
                        e.push(r.coordinates)
                    }
                    return {
                        type: "MultiLineString",
                        coordinates: e
                    }
                },
                Polygon: function(t) {
                    var e = [],
                        n = Eo.LineString.apply(this, [t.shell]);
                    e.push(n.coordinates);
                    for (var i = 0; i < t.holes.length; ++i) {
                        var r = t.holes[i],
                            s = Eo.LineString.apply(this, [r]);
                        e.push(s.coordinates)
                    }
                    return {
                        type: "Polygon",
                        coordinates: e
                    }
                },
                MultiPolygon: function(t) {
                    for (var e = [], n = 0; n < t.geometries.length; ++n) {
                        var i = t.geometries[n],
                            r = Eo.Polygon.apply(this, [i]);
                        e.push(r.coordinates)
                    }
                    return {
                        type: "MultiPolygon",
                        coordinates: e
                    }
                },
                GeometryCollection: function(t) {
                    for (var e = [], n = 0; n < t.geometries.length; ++n) {
                        var i = t.geometries[n],
                            r = i.getGeometryType();
                        e.push(Eo[r].apply(this, [i]))
                    }
                    return {
                        type: "GeometryCollection",
                        geometries: e
                    }
                }
            };
        e(qi.prototype, {
            read: function(t) {
                var e = this.parser.read(t);
                return this.precisionModel.getType() === te.FIXED && this.reducePrecision(e), e
            },
            reducePrecision: function(t) {
                var e, n;
                if (t.coordinate) this.precisionModel.makePrecise(t.coordinate);
                else if (t.points)
                    for (e = 0, n = t.points.length; e < n; e++) this.precisionModel.makePrecise(t.points[e]);
                else if (t.geometries)
                    for (e = 0, n = t.geometries.length; e < n; e++) this.reducePrecision(t.geometries[e])
            }
        }), e(zi.prototype, {
            write: function(t) {
                return this.parser.write(t)
            }
        }), e(Vi.prototype, {
            read: function(t) {
                var e = this.parser.read(t);
                return this.precisionModel.getType() === te.FIXED && this.reducePrecision(e), e
            },
            reducePrecision: function(t) {
                if (t.coordinate) this.precisionModel.makePrecise(t.coordinate);
                else if (t.points)
                    for (var e = 0, n = t.points.coordinates.length; e < n; e++) this.precisionModel.makePrecise(t.points.coordinates[e]);
                else if (t.geometries)
                    for (var i = 0, r = t.geometries.length; i < r; i++) this.reducePrecision(t.geometries[i])
            }
        }), e(Yi.prototype, {
            read: function(t) {
                var e = this.ol;
                return t instanceof e.geom.Point ? this.convertFromPoint(t) : t instanceof e.geom.LineString ? this.convertFromLineString(t) : t instanceof e.geom.LinearRing ? this.convertFromLinearRing(t) : t instanceof e.geom.Polygon ? this.convertFromPolygon(t) : t instanceof e.geom.MultiPoint ? this.convertFromMultiPoint(t) : t instanceof e.geom.MultiLineString ? this.convertFromMultiLineString(t) : t instanceof e.geom.MultiPolygon ? this.convertFromMultiPolygon(t) : t instanceof e.geom.GeometryCollection ? this.convertFromCollection(t) : void 0
            },
            convertFromPoint: function(t) {
                var e = t.getCoordinates();
                return this.geometryFactory.createPoint(new g(e[0], e[1]))
            },
            convertFromLineString: function(t) {
                return this.geometryFactory.createLineString(t.getCoordinates().map(function(t) {
                    return new g(t[0], t[1])
                }))
            },
            convertFromLinearRing: function(t) {
                return this.geometryFactory.createLinearRing(t.getCoordinates().map(function(t) {
                    return new g(t[0], t[1])
                }))
            },
            convertFromPolygon: function(t) {
                for (var e = t.getLinearRings(), n = null, i = [], r = 0; r < e.length; r++) {
                    var s = this.convertFromLinearRing(e[r]);
                    0 === r ? n = s : i.push(s)
                }
                return this.geometryFactory.createPolygon(n, i)
            },
            convertFromMultiPoint: function(t) {
                var e = t.getPoints().map(function(t) {
                    return this.convertFromPoint(t)
                }, this);
                return this.geometryFactory.createMultiPoint(e)
            },
            convertFromMultiLineString: function(t) {
                var e = t.getLineStrings().map(function(t) {
                    return this.convertFromLineString(t)
                }, this);
                return this.geometryFactory.createMultiLineString(e)
            },
            convertFromMultiPolygon: function(t) {
                var e = t.getPolygons().map(function(t) {
                    return this.convertFromPolygon(t)
                }, this);
                return this.geometryFactory.createMultiPolygon(e)
            },
            convertFromCollection: function(t) {
                var e = t.getGeometries().map(function(t) {
                    return this.read(t)
                }, this);
                return this.geometryFactory.createGeometryCollection(e)
            },
            write: function(t) {
                return "Point" === t.getGeometryType() ? this.convertToPoint(t.getCoordinate()) : "LineString" === t.getGeometryType() ? this.convertToLineString(t) : "LinearRing" === t.getGeometryType() ? this.convertToLinearRing(t) : "Polygon" === t.getGeometryType() ? this.convertToPolygon(t) : "MultiPoint" === t.getGeometryType() ? this.convertToMultiPoint(t) : "MultiLineString" === t.getGeometryType() ? this.convertToMultiLineString(t) : "MultiPolygon" === t.getGeometryType() ? this.convertToMultiPolygon(t) : "GeometryCollection" === t.getGeometryType() ? this.convertToCollection(t) : void 0
            },
            convertToPoint: function(t) {
                return new this.ol.geom.Point([t.x, t.y])
            },
            convertToLineString: function(t) {
                var e = t.points.coordinates.map(Ui);
                return new this.ol.geom.LineString(e)
            },
            convertToLinearRing: function(t) {
                var e = t.points.coordinates.map(Ui);
                return new this.ol.geom.LinearRing(e)
            },
            convertToPolygon: function(t) {
                for (var e = [t.shell.points.coordinates.map(Ui)], n = 0; n < t.holes.length; n++) e.push(t.holes[n].points.coordinates.map(Ui));
                return new this.ol.geom.Polygon(e)
            },
            convertToMultiPoint: function(t) {
                return new this.ol.geom.MultiPoint(t.getCoordinates().map(Ui))
            },
            convertToMultiLineString: function(t) {
                for (var e = [], n = 0; n < t.geometries.length; n++) e.push(this.convertToLineString(t.geometries[n]).getCoordinates());
                return new this.ol.geom.MultiLineString(e)
            },
            convertToMultiPolygon: function(t) {
                for (var e = [], n = 0; n < t.geometries.length; n++) e.push(this.convertToPolygon(t.geometries[n]).getCoordinates());
                return new this.ol.geom.MultiPolygon(e)
            },
            convertToCollection: function(t) {
                for (var e = [], n = 0; n < t.geometries.length; n++) {
                    var i = t.geometries[n];
                    e.push(this.write(i))
                }
                return new this.ol.geom.GeometryCollection(e)
            }
        });
        var xo = Object.freeze({
            GeoJSONReader: qi,
            GeoJSONWriter: zi,
            OL3Parser: Yi,
            WKTReader: Vi,
            WKTWriter: re
        });
        e(Xi.prototype, {
            rescale: function() {
                if (w(arguments[0], m))
                    for (var t = arguments[0], e = t.iterator(); e.hasNext();) {
                        var n = e.next();
                        this.rescale(n.getCoordinates())
                    } else if (arguments[0] instanceof Array) {
                        var i = arguments[0];
                        2 === i.length && (new g(i[0]), new g(i[1]));
                        for (var e = 0; e < i.length; e++) i[e].x = i[e].x / this.scaleFactor + this.offsetX, i[e].y = i[e].y / this.scaleFactor + this.offsetY;
                        2 === i.length && i[0].equals2D(i[1]) && A.out.println(i)
                    }
            },
            scale: function() {
                if (w(arguments[0], m)) {
                    for (var t = arguments[0], e = new I, n = t.iterator(); n.hasNext();) {
                        var i = n.next();
                        e.add(new We(this.scale(i.getCoordinates()), i.getData()))
                    }
                    return e
                }
                if (arguments[0] instanceof Array) {
                    for (var r = arguments[0], s = new Array(r.length).fill(null), n = 0; n < r.length; n++) s[n] = new g(Math.round((r[n].x - this.offsetX) * this.scaleFactor), Math.round((r[n].y - this.offsetY) * this.scaleFactor), r[n].z);
                    return H.removeRepeatedPoints(s)
                }
            },
            isIntegerPrecision: function() {
                return 1 === this.scaleFactor
            },
            getNodedSubstrings: function() {
                var t = this.noder.getNodedSubstrings();
                return this.isScaled && this.rescale(t), t
            },
            computeNodes: function(t) {
                var e = t;
                this.isScaled && (e = this.scale(t)), this.noder.computeNodes(e)
            },
            interfaces_: function() {
                return [$e]
            },
            getClass: function() {
                return Xi
            }
        });
        var Io = Object.freeze({
            MCIndexNoder: en,
            ScaledNoder: Xi,
            SegmentString: Re
        });
        e(Hi.prototype, {
            isSimpleMultiPoint: function(t) {
                if (t.isEmpty()) return !0;
                for (var e = new at, n = 0; n < t.getNumGeometries(); n++) {
                    var i = t.getGeometryN(n),
                        r = i.getCoordinate();
                    if (e.contains(r)) return this.nonSimpleLocation = r, !1;
                    e.add(r)
                }
                return !0
            },
            isSimplePolygonal: function(t) {
                for (var e = zn.getLines(t), n = e.iterator(); n.hasNext();) {
                    var i = n.next();
                    if (!this.isSimpleLinearGeometry(i)) return !1
                }
                return !0
            },
            hasClosedEndpointIntersection: function(t) {
                for (var e = new rt, n = t.getEdgeIterator(); n.hasNext();) {
                    var i = n.next(),
                        r = (i.getMaximumSegmentIndex(), i.isClosed()),
                        s = i.getCoordinate(0);
                    this.addEndpoint(e, s, r);
                    var o = i.getCoordinate(i.getNumPoints() - 1);
                    this.addEndpoint(e, o, r)
                }
                for (var n = e.values().iterator(); n.hasNext();) {
                    var a = n.next();
                    if (a.isClosed && 2 !== a.degree) return this.nonSimpleLocation = a.getCoordinate(), !0
                }
                return !1
            },
            getNonSimpleLocation: function() {
                return this.nonSimpleLocation
            },
            isSimpleLinearGeometry: function(t) {
                if (t.isEmpty()) return !0;
                var e = new Qn(0, t),
                    n = new oe,
                    i = e.computeSelfNodes(n, !0);
                return !(i.hasIntersection() && (i.hasProperIntersection() ? (this.nonSimpleLocation = i.getProperIntersectionPoint(), 1) : this.hasNonEndpointIntersection(e) || this.isClosedEndpointsInInterior && this.hasClosedEndpointIntersection(e)))
            },
            hasNonEndpointIntersection: function(t) {
                for (var e = t.getEdgeIterator(); e.hasNext();)
                    for (var n = e.next(), i = n.getMaximumSegmentIndex(), r = n.getEdgeIntersectionList().iterator(); r.hasNext();) {
                        var s = r.next();
                        if (!s.isEndPoint(i)) return this.nonSimpleLocation = s.getCoordinate(), !0
                    }
                return !1
            },
            addEndpoint: function(t, e, n) {
                var i = t.get(e);
                null === i && (i = new ji(e), t.put(e, i)), i.addEndpoint(n)
            },
            computeSimple: function(t) {
                return this.nonSimpleLocation = null, !!t.isEmpty() || (t instanceof Lt ? this.isSimpleLinearGeometry(t) : t instanceof gt ? this.isSimpleLinearGeometry(t) : t instanceof Rt ? this.isSimpleMultiPoint(t) : w(t, wt) ? this.isSimplePolygonal(t) : !(t instanceof ft) || this.isSimpleGeometryCollection(t))
            },
            isSimple: function() {
                return this.nonSimpleLocation = null, this.computeSimple(this.inputGeom)
            },
            isSimpleGeometryCollection: function(t) {
                for (var e = 0; e < t.getNumGeometries(); e++) {
                    var n = t.getGeometryN(e);
                    if (!this.computeSimple(n)) return !1
                }
                return !0
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Hi
            }
        }), e(ji.prototype, {
            addEndpoint: function(t) {
                this.degree++, this.isClosed |= t
            },
            getCoordinate: function() {
                return this.pt
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return ji
            }
        }), Hi.EndpointInfo = ji, e(Wi.prototype, {
            getEndCapStyle: function() {
                return this.endCapStyle
            },
            isSingleSided: function() {
                return this._isSingleSided
            },
            setQuadrantSegments: function(t) {
                this.quadrantSegments = t, 0 === this.quadrantSegments && (this.joinStyle = Wi.JOIN_BEVEL), this.quadrantSegments < 0 && (this.joinStyle = Wi.JOIN_MITRE, this.mitreLimit = Math.abs(this.quadrantSegments)), t <= 0 && (this.quadrantSegments = 1), this.joinStyle !== Wi.JOIN_ROUND && (this.quadrantSegments = Wi.DEFAULT_QUADRANT_SEGMENTS)
            },
            getJoinStyle: function() {
                return this.joinStyle
            },
            setJoinStyle: function(t) {
                this.joinStyle = t
            },
            setSimplifyFactor: function(t) {
                this.simplifyFactor = t < 0 ? 0 : t
            },
            getSimplifyFactor: function() {
                return this.simplifyFactor
            },
            getQuadrantSegments: function() {
                return this.quadrantSegments
            },
            setEndCapStyle: function(t) {
                this.endCapStyle = t
            },
            getMitreLimit: function() {
                return this.mitreLimit
            },
            setMitreLimit: function(t) {
                this.mitreLimit = t
            },
            setSingleSided: function(t) {
                this._isSingleSided = t
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Wi
            }
        }), Wi.bufferDistanceError = function(t) {
            var e = Math.PI / 2 / t;
            return 1 - Math.cos(e / 2)
        }, Wi.CAP_ROUND = 1, Wi.CAP_FLAT = 2, Wi.CAP_SQUARE = 3, Wi.JOIN_ROUND = 1, Wi.JOIN_MITRE = 2, Wi.JOIN_BEVEL = 3, Wi.DEFAULT_QUADRANT_SEGMENTS = 8, Wi.DEFAULT_MITRE_LIMIT = 5, Wi.DEFAULT_SIMPLIFY_FACTOR = .01, e(Ki.prototype, {
            getCoordinate: function() {
                return this.minCoord
            },
            getRightmostSide: function(t, e) {
                var n = this.getRightmostSideOfSegment(t, e);
                return n < 0 && (n = this.getRightmostSideOfSegment(t, e - 1)), n < 0 && (this.minCoord = null, this.checkForRightmostCoordinate(t)), n
            },
            findRightmostEdgeAtVertex: function() {
                var t = this.minDe.getEdge().getCoordinates();
                f.isTrue(this.minIndex > 0 && this.minIndex < t.length, "rightmost point expected to be interior vertex of edge");
                var e = t[this.minIndex - 1],
                    n = t[this.minIndex + 1],
                    i = le.computeOrientation(this.minCoord, n, e),
                    r = !1;
                e.y < this.minCoord.y && n.y < this.minCoord.y && i === le.COUNTERCLOCKWISE ? r = !0 : e.y > this.minCoord.y && n.y > this.minCoord.y && i === le.CLOCKWISE && (r = !0), r && (this.minIndex = this.minIndex - 1)
            },
            getRightmostSideOfSegment: function(t, e) {
                var n = t.getEdge(),
                    i = n.getCoordinates();
                if (e < 0 || e + 1 >= i.length) return -1;
                if (i[e].y === i[e + 1].y) return -1;
                var r = hn.LEFT;
                return i[e].y < i[e + 1].y && (r = hn.RIGHT), r
            },
            getEdge: function() {
                return this.orientedDe
            },
            checkForRightmostCoordinate: function(t) {
                for (var e = t.getEdge().getCoordinates(), n = 0; n < e.length - 1; n++)(null === this.minCoord || e[n].x > this.minCoord.x) && (this.minDe = t, this.minIndex = n, this.minCoord = e[n])
            },
            findRightmostEdgeAtNode: function() {
                var t = this.minDe.getNode(),
                    e = t.getEdges();
                this.minDe = e.getRightmostEdge(), this.minDe.isForward() || (this.minDe = this.minDe.getSym(), this.minIndex = this.minDe.getEdge().getCoordinates().length - 1)
            },
            findEdge: function(t) {
                for (var e = t.iterator(); e.hasNext();) {
                    var n = e.next();
                    n.isForward() && this.checkForRightmostCoordinate(n)
                }
                f.isTrue(0 !== this.minIndex || this.minCoord.equals(this.minDe.getCoordinate()), "inconsistency in rightmost processing"), 0 === this.minIndex ? this.findRightmostEdgeAtNode() : this.findRightmostEdgeAtVertex(), this.orientedDe = this.minDe, this.getRightmostSide(this.minDe, this.minIndex) === hn.LEFT && (this.orientedDe = this.minDe.getSym())
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Ki
            }
        }), Ji.prototype.addLast = function(t) {
            this.array_.push(t)
        }, Ji.prototype.removeFirst = function() {
            return this.array_.shift()
        }, Ji.prototype.isEmpty = function() {
            return 0 === this.array_.length
        }, e(Zi.prototype, {
            clearVisitedEdges: function() {
                for (var t = this.dirEdgeList.iterator(); t.hasNext();) {
                    t.next().setVisited(!1)
                }
            },
            getRightmostCoordinate: function() {
                return this.rightMostCoord
            },
            computeNodeDepth: function(t) {
                for (var e = null, n = t.getEdges().iterator(); n.hasNext();) {
                    var i = n.next();
                    if (i.isVisited() || i.getSym().isVisited()) {
                        e = i;
                        break
                    }
                }
                if (null === e) throw new rn("unable to find edge to compute depths at " + t.getCoordinate());
                t.getEdges().computeDepths(e);
                for (var n = t.getEdges().iterator(); n.hasNext();) {
                    var i = n.next();
                    i.setVisited(!0), this.copySymDepths(i)
                }
            },
            computeDepth: function(t) {
                this.clearVisitedEdges();
                var e = this.finder.getEdge();
                e.getNode(), e.getLabel(), e.setEdgeDepths(hn.RIGHT, t), this.copySymDepths(e), this.computeDepths(e)
            },
            create: function(t) {
                this.addReachable(t), this.finder.findEdge(this.dirEdgeList), this.rightMostCoord = this.finder.getCoordinate()
            },
            findResultEdges: function() {
                for (var t = this.dirEdgeList.iterator(); t.hasNext();) {
                    var e = t.next();
                    e.getDepth(hn.RIGHT) >= 1 && e.getDepth(hn.LEFT) <= 0 && !e.isInteriorAreaEdge() && e.setInResult(!0)
                }
            },
            computeDepths: function(t) {
                var e = new Q,
                    n = new Ji,
                    i = t.getNode();
                for (n.addLast(i), e.add(i), t.setVisited(!0); !n.isEmpty();) {
                    var r = n.removeFirst();
                    e.add(r), this.computeNodeDepth(r);
                    for (var s = r.getEdges().iterator(); s.hasNext();) {
                        var o = s.next(),
                            a = o.getSym();
                        if (!a.isVisited()) {
                            var u = a.getNode();
                            e.contains(u) || (n.addLast(u), e.add(u))
                        }
                    }
                }
            },
            compareTo: function(t) {
                var e = t;
                return this.rightMostCoord.x < e.rightMostCoord.x ? -1 : this.rightMostCoord.x > e.rightMostCoord.x ? 1 : 0
            },
            getEnvelope: function() {
                if (null === this.env) {
                    for (var t = new C, e = this.dirEdgeList.iterator(); e.hasNext();)
                        for (var n = e.next(), i = n.getEdge().getCoordinates(), r = 0; r < i.length - 1; r++) t.expandToInclude(i[r]);
                    this.env = t
                }
                return this.env
            },
            addReachable: function(t) {
                var e = new de;
                for (e.add(t); !e.empty();) {
                    var n = e.pop();
                    this.add(n, e)
                }
            },
            copySymDepths: function(t) {
                var e = t.getSym();
                e.setDepth(hn.LEFT, t.getDepth(hn.RIGHT)), e.setDepth(hn.RIGHT, t.getDepth(hn.LEFT))
            },
            add: function(t, e) {
                t.setVisited(!0), this.nodes.add(t);
                for (var n = t.getEdges().iterator(); n.hasNext();) {
                    var i = n.next();
                    this.dirEdgeList.add(i);
                    var r = i.getSym(),
                        s = r.getNode();
                    s.isVisited() || e.push(s)
                }
            },
            getNodes: function() {
                return this.nodes
            },
            getDirectedEdges: function() {
                return this.dirEdgeList
            },
            interfaces_: function() {
                return [s]
            },
            getClass: function() {
                return Zi
            }
        }), e(Qi.prototype, {
            isDeletable: function(t, e, n, i) {
                var r = this.inputLine[t],
                    s = this.inputLine[e],
                    o = this.inputLine[n];
                return !!this.isConcave(r, s, o) && !!this.isShallow(r, s, o, i) && this.isShallowSampled(r, s, t, n, i)
            },
            deleteShallowConcavities: function() {
                for (var t = 1, e = (this.inputLine.length, this.findNextNonDeletedIndex(t)), n = this.findNextNonDeletedIndex(e), i = !1; n < this.inputLine.length;) {
                    var r = !1;
                    this.isDeletable(t, e, n, this.distanceTol) && (this.isDeleted[e] = Qi.DELETE, r = !0, i = !0), t = r ? n : e, e = this.findNextNonDeletedIndex(t), n = this.findNextNonDeletedIndex(e)
                }
                return i
            },
            isShallowConcavity: function(t, e, n, i) {
                return le.computeOrientation(t, e, n) === this.angleOrientation && le.distancePointLine(e, t, n) < i
            },
            isShallowSampled: function(t, e, n, i, r) {
                var s = Math.trunc((i - n) / Qi.NUM_PTS_TO_CHECK);
                s <= 0 && (s = 1);
                for (var o = n; o < i; o += s)
                    if (!this.isShallow(t, e, this.inputLine[o], r)) return !1;
                return !0
            },
            isConcave: function(t, e, n) {
                return le.computeOrientation(t, e, n) === this.angleOrientation
            },
            simplify: function(t) {
                this.distanceTol = Math.abs(t), t < 0 && (this.angleOrientation = le.CLOCKWISE), this.isDeleted = new Array(this.inputLine.length).fill(null);
                var e = !1;
                do {
                    e = this.deleteShallowConcavities()
                } while (e);
                return this.collapseLine()
            },
            findNextNonDeletedIndex: function(t) {
                for (var e = t + 1; e < this.inputLine.length && this.isDeleted[e] === Qi.DELETE;) e++;
                return e
            },
            isShallow: function(t, e, n, i) {
                return le.distancePointLine(e, t, n) < i
            },
            collapseLine: function() {
                for (var t = new N, e = 0; e < this.inputLine.length; e++) this.isDeleted[e] !== Qi.DELETE && t.add(this.inputLine[e]);
                return t.toCoordinateArray()
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Qi
            }
        }), Qi.simplify = function(t, e) {
            return new Qi(t).simplify(e)
        }, Qi.INIT = 0, Qi.DELETE = 1, Qi.KEEP = 1, Qi.NUM_PTS_TO_CHECK = 10, e($i.prototype, {
            getCoordinates: function() {
                return this.ptList.toArray($i.COORDINATE_ARRAY_TYPE)
            },
            setPrecisionModel: function(t) {
                this.precisionModel = t
            },
            addPt: function(t) {
                var e = new g(t);
                return this.precisionModel.makePrecise(e), this.isRedundant(e) ? null : void this.ptList.add(e)
            },
            reverse: function() {},
            addPts: function(t, e) {
                if (e)
                    for (var n = 0; n < t.length; n++) this.addPt(t[n]);
                else
                    for (var n = t.length - 1; n >= 0; n--) this.addPt(t[n])
            },
            isRedundant: function(t) {
                if (this.ptList.size() < 1) return !1;
                var e = this.ptList.get(this.ptList.size() - 1);
                return t.distance(e) < this.minimimVertexDistance
            },
            toString: function() {
                return (new ne).createLineString(this.getCoordinates()).toString()
            },
            closeRing: function() {
                if (this.ptList.size() < 1) return null;
                var t = new g(this.ptList.get(0)),
                    e = this.ptList.get(this.ptList.size() - 1);
                return this.ptList.size() >= 2 && this.ptList.get(this.ptList.size() - 2), t.equals(e) ? null : void this.ptList.add(t)
            },
            setMinimumVertexDistance: function(t) {
                this.minimimVertexDistance = t
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return $i
            }
        }), $i.COORDINATE_ARRAY_TYPE = new Array(0).fill(null), e(tr.prototype, {
            addNextSegment: function(t, e) {
                if (this.s0 = this.s1, this.s1 = this.s2, this.s2 = t, this.seg0.setCoordinates(this.s0, this.s1), this.computeOffsetSegment(this.seg0, this.side, this.distance, this.offset0), this.seg1.setCoordinates(this.s1, this.s2), this.computeOffsetSegment(this.seg1, this.side, this.distance, this.offset1), this.s1.equals(this.s2)) return null;
                var n = le.computeOrientation(this.s0, this.s1, this.s2),
                    i = n === le.CLOCKWISE && this.side === hn.LEFT || n === le.COUNTERCLOCKWISE && this.side === hn.RIGHT;
                0 === n ? this.addCollinear(e) : i ? this.addOutsideTurn(n, e) : this.addInsideTurn(n, e)
            },
            addLineEndCap: function(t, e) {
                var n = new he(t, e),
                    i = new he;
                this.computeOffsetSegment(n, hn.LEFT, this.distance, i);
                var r = new he;
                this.computeOffsetSegment(n, hn.RIGHT, this.distance, r);
                var s = e.x - t.x,
                    o = e.y - t.y,
                    a = Math.atan2(o, s);
                switch (this.bufParams.getEndCapStyle()) {
                    case Wi.CAP_ROUND:
                        this.segList.addPt(i.p1), this.addFilletArc(e, a + Math.PI / 2, a - Math.PI / 2, le.CLOCKWISE, this.distance), this.segList.addPt(r.p1);
                        break;
                    case Wi.CAP_FLAT:
                        this.segList.addPt(i.p1), this.segList.addPt(r.p1);
                        break;
                    case Wi.CAP_SQUARE:
                        var u = new g;
                        u.x = Math.abs(this.distance) * Math.cos(a), u.y = Math.abs(this.distance) * Math.sin(a);
                        var l = new g(i.p1.x + u.x, i.p1.y + u.y),
                            h = new g(r.p1.x + u.x, r.p1.y + u.y);
                        this.segList.addPt(l), this.segList.addPt(h)
                }
            },
            getCoordinates: function() {
                return this.segList.getCoordinates()
            },
            addMitreJoin: function(t, e, n, i) {
                var r = !0,
                    s = null;
                try {
                    s = F.intersection(e.p0, e.p1, n.p0, n.p1);
                    (i <= 0 ? 1 : s.distance(t) / Math.abs(i)) > this.bufParams.getMitreLimit() && (r = !1)
                } catch (t) {
                    if (!(t instanceof _)) throw t;
                    s = new g(0, 0), r = !1
                }
                r ? this.segList.addPt(s) : this.addLimitedMitreJoin(e, n, i, this.bufParams.getMitreLimit())
            },
            addFilletCorner: function(t, e, n, i, r) {
                var s = e.x - t.x,
                    o = e.y - t.y,
                    a = Math.atan2(o, s),
                    u = n.x - t.x,
                    l = n.y - t.y,
                    h = Math.atan2(l, u);
                i === le.CLOCKWISE ? a <= h && (a += 2 * Math.PI) : a >= h && (a -= 2 * Math.PI), this.segList.addPt(e), this.addFilletArc(t, a, h, i, r), this.segList.addPt(n)
            },
            addOutsideTurn: function(t, e) {
                return this.offset0.p1.distance(this.offset1.p0) < this.distance * tr.OFFSET_SEGMENT_SEPARATION_FACTOR ? (this.segList.addPt(this.offset0.p1), null) : void(this.bufParams.getJoinStyle() === Wi.JOIN_MITRE ? this.addMitreJoin(this.s1, this.offset0, this.offset1, this.distance) : this.bufParams.getJoinStyle() === Wi.JOIN_BEVEL ? this.addBevelJoin(this.offset0, this.offset1) : (e && this.segList.addPt(this.offset0.p1), this.addFilletCorner(this.s1, this.offset0.p1, this.offset1.p0, t, this.distance), this.segList.addPt(this.offset1.p0)))
            },
            createSquare: function(t) {
                this.segList.addPt(new g(t.x + this.distance, t.y + this.distance)), this.segList.addPt(new g(t.x + this.distance, t.y - this.distance)), this.segList.addPt(new g(t.x - this.distance, t.y - this.distance)), this.segList.addPt(new g(t.x - this.distance, t.y + this.distance)), this.segList.closeRing()
            },
            addSegments: function(t, e) {
                this.segList.addPts(t, e)
            },
            addFirstSegment: function() {
                this.segList.addPt(this.offset1.p0)
            },
            addLastSegment: function() {
                this.segList.addPt(this.offset1.p1)
            },
            initSideSegments: function(t, e, n) {
                this.s1 = t, this.s2 = e, this.side = n, this.seg1.setCoordinates(t, e), this.computeOffsetSegment(this.seg1, n, this.distance, this.offset1)
            },
            addLimitedMitreJoin: function(t, e, n, i) {
                var r = this.seg0.p1,
                    s = Ni.angle(r, this.seg0.p0),
                    o = (Ni.angle(r, this.seg1.p1), Ni.angleBetweenOriented(this.seg0.p0, r, this.seg1.p1)),
                    a = o / 2,
                    u = Ni.normalize(s + a),
                    l = Ni.normalize(u + Math.PI),
                    h = i * n,
                    c = h * Math.abs(Math.sin(a)),
                    f = n - c,
                    d = r.x + h * Math.cos(l),
                    p = r.y + h * Math.sin(l),
                    m = new g(d, p),
                    v = new he(r, m),
                    y = v.pointAlongOffset(1, f),
                    E = v.pointAlongOffset(1, -f);
                this.side === hn.LEFT ? (this.segList.addPt(y), this.segList.addPt(E)) : (this.segList.addPt(E), this.segList.addPt(y))
            },
            computeOffsetSegment: function(t, e, n, i) {
                var r = e === hn.LEFT ? 1 : -1,
                    s = t.p1.x - t.p0.x,
                    o = t.p1.y - t.p0.y,
                    a = Math.sqrt(s * s + o * o),
                    u = r * n * s / a,
                    l = r * n * o / a;
                i.p0.x = t.p0.x - l, i.p0.y = t.p0.y + u, i.p1.x = t.p1.x - l, i.p1.y = t.p1.y + u
            },
            addFilletArc: function(t, e, n, i, r) {
                var s = i === le.CLOCKWISE ? -1 : 1,
                    o = Math.abs(e - n),
                    a = Math.trunc(o / this.filletAngleQuantum + .5);
                if (a < 1) return null;
                var u = null,
                    l = null;
                u = 0, l = o / a;
                for (var h = u, c = new g; h < o;) {
                    var f = e + s * h;
                    c.x = t.x + r * Math.cos(f), c.y = t.y + r * Math.sin(f), this.segList.addPt(c), h += l
                }
            },
            addInsideTurn: function(t, e) {
                if (this.li.computeIntersection(this.offset0.p0, this.offset0.p1, this.offset1.p0, this.offset1.p1), this.li.hasIntersection()) this.segList.addPt(this.li.getIntersection(0));
                else if (this._hasNarrowConcaveAngle = !0, this.offset0.p1.distance(this.offset1.p0) < this.distance * tr.INSIDE_TURN_VERTEX_SNAP_DISTANCE_FACTOR) this.segList.addPt(this.offset0.p1);
                else {
                    if (this.segList.addPt(this.offset0.p1), this.closingSegLengthFactor > 0) {
                        var n = new g((this.closingSegLengthFactor * this.offset0.p1.x + this.s1.x) / (this.closingSegLengthFactor + 1), (this.closingSegLengthFactor * this.offset0.p1.y + this.s1.y) / (this.closingSegLengthFactor + 1));
                        this.segList.addPt(n);
                        var i = new g((this.closingSegLengthFactor * this.offset1.p0.x + this.s1.x) / (this.closingSegLengthFactor + 1), (this.closingSegLengthFactor * this.offset1.p0.y + this.s1.y) / (this.closingSegLengthFactor + 1));
                        this.segList.addPt(i)
                    } else this.segList.addPt(this.s1);
                    this.segList.addPt(this.offset1.p0)
                }
            },
            createCircle: function(t) {
                var e = new g(t.x + this.distance, t.y);
                this.segList.addPt(e), this.addFilletArc(t, 0, 2 * Math.PI, -1, this.distance), this.segList.closeRing()
            },
            addBevelJoin: function(t, e) {
                this.segList.addPt(t.p1), this.segList.addPt(e.p0)
            },
            init: function(t) {
                this.distance = t, this.maxCurveSegmentError = t * (1 - Math.cos(this.filletAngleQuantum / 2)), this.segList = new $i, this.segList.setPrecisionModel(this.precisionModel), this.segList.setMinimumVertexDistance(t * tr.CURVE_VERTEX_SNAP_DISTANCE_FACTOR)
            },
            addCollinear: function(t) {
                this.li.computeIntersection(this.s0, this.s1, this.s1, this.s2), this.li.getIntersectionNum() >= 2 && (this.bufParams.getJoinStyle() === Wi.JOIN_BEVEL || this.bufParams.getJoinStyle() === Wi.JOIN_MITRE ? (t && this.segList.addPt(this.offset0.p1), this.segList.addPt(this.offset1.p0)) : this.addFilletCorner(this.s1, this.offset0.p1, this.offset1.p0, le.CLOCKWISE, this.distance))
            },
            closeRing: function() {
                this.segList.closeRing()
            },
            hasNarrowConcaveAngle: function() {
                return this._hasNarrowConcaveAngle
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return tr
            }
        }), tr.OFFSET_SEGMENT_SEPARATION_FACTOR = .001, tr.INSIDE_TURN_VERTEX_SNAP_DISTANCE_FACTOR = .001, tr.CURVE_VERTEX_SNAP_DISTANCE_FACTOR = 1e-6, tr.MAX_CLOSING_SEG_LEN_FACTOR = 80, e(er.prototype, {
            getOffsetCurve: function(t, e) {
                if (this.distance = e, 0 === e) return null;
                var n = e < 0,
                    i = Math.abs(e),
                    r = this.getSegGen(i);
                t.length <= 1 ? this.computePointCurve(t[0], r) : this.computeOffsetCurve(t, n, r);
                var s = r.getCoordinates();
                return n && H.reverse(s), s
            },
            computeSingleSidedBufferCurve: function(t, e, n) {
                var i = this.simplifyTolerance(this.distance);
                if (e) {
                    n.addSegments(t, !0);
                    var r = Qi.simplify(t, -i),
                        s = r.length - 1;
                    n.initSideSegments(r[s], r[s - 1], hn.LEFT), n.addFirstSegment();
                    for (var o = s - 2; o >= 0; o--) n.addNextSegment(r[o], !0)
                } else {
                    n.addSegments(t, !1);
                    var a = Qi.simplify(t, i),
                        u = a.length - 1;
                    n.initSideSegments(a[0], a[1], hn.LEFT), n.addFirstSegment();
                    for (var o = 2; o <= u; o++) n.addNextSegment(a[o], !0)
                }
                n.addLastSegment(), n.closeRing()
            },
            computeRingBufferCurve: function(t, e, n) {
                var i = this.simplifyTolerance(this.distance);
                e === hn.RIGHT && (i = -i);
                var r = Qi.simplify(t, i),
                    s = r.length - 1;
                n.initSideSegments(r[s - 1], r[0], e);
                for (var o = 1; o <= s; o++) {
                    var a = 1 !== o;
                    n.addNextSegment(r[o], a)
                }
                n.closeRing()
            },
            computeLineBufferCurve: function(t, e) {
                var n = this.simplifyTolerance(this.distance),
                    i = Qi.simplify(t, n),
                    r = i.length - 1;
                e.initSideSegments(i[0], i[1], hn.LEFT);
                for (var s = 2; s <= r; s++) e.addNextSegment(i[s], !0);
                e.addLastSegment(), e.addLineEndCap(i[r - 1], i[r]);
                var o = Qi.simplify(t, -n),
                    a = o.length - 1;
                e.initSideSegments(o[a], o[a - 1], hn.LEFT);
                for (var s = a - 2; s >= 0; s--) e.addNextSegment(o[s], !0);
                e.addLastSegment(), e.addLineEndCap(o[1], o[0]), e.closeRing()
            },
            computePointCurve: function(t, e) {
                switch (this.bufParams.getEndCapStyle()) {
                    case Wi.CAP_ROUND:
                        e.createCircle(t);
                        break;
                    case Wi.CAP_SQUARE:
                        e.createSquare(t)
                }
            },
            getLineCurve: function(t, e) {
                if (this.distance = e, e < 0 && !this.bufParams.isSingleSided()) return null;
                if (0 === e) return null;
                var n = Math.abs(e),
                    i = this.getSegGen(n);
                if (t.length <= 1) this.computePointCurve(t[0], i);
                else if (this.bufParams.isSingleSided()) {
                    var r = e < 0;
                    this.computeSingleSidedBufferCurve(t, r, i)
                } else this.computeLineBufferCurve(t, i);
                return i.getCoordinates()
            },
            getBufferParameters: function() {
                return this.bufParams
            },
            simplifyTolerance: function(t) {
                return t * this.bufParams.getSimplifyFactor()
            },
            getRingCurve: function(t, e, n) {
                if (this.distance = n, t.length <= 2) return this.getLineCurve(t, n);
                if (0 === n) return er.copyCoordinates(t);
                var i = this.getSegGen(n);
                return this.computeRingBufferCurve(t, e, i), i.getCoordinates()
            },
            computeOffsetCurve: function(t, e, n) {
                var i = this.simplifyTolerance(this.distance);
                if (e) {
                    var r = Qi.simplify(t, -i),
                        s = r.length - 1;
                    n.initSideSegments(r[s], r[s - 1], hn.LEFT), n.addFirstSegment();
                    for (var o = s - 2; o >= 0; o--) n.addNextSegment(r[o], !0)
                } else {
                    var a = Qi.simplify(t, i),
                        u = a.length - 1;
                    n.initSideSegments(a[0], a[1], hn.LEFT), n.addFirstSegment();
                    for (var o = 2; o <= u; o++) n.addNextSegment(a[o], !0)
                }
                n.addLastSegment()
            },
            getSegGen: function(t) {
                return new tr(this.precisionModel, this.bufParams, t)
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return er
            }
        }), er.copyCoordinates = function(t) {
            for (var e = new Array(t.length).fill(null), n = 0; n < e.length; n++) e[n] = new g(t[n]);
            return e
        }, e(nr.prototype, {
            findStabbedSegments: function() {
                if (1 === arguments.length) {
                    for (var t = arguments[0], e = new I, n = this.subgraphs.iterator(); n.hasNext();) {
                        var i = n.next(),
                            r = i.getEnvelope();
                        t.y < r.getMinY() || t.y > r.getMaxY() || this.findStabbedSegments(t, i.getDirectedEdges(), e)
                    }
                    return e
                }
                if (3 === arguments.length)
                    if (w(arguments[2], y) && arguments[0] instanceof g && arguments[1] instanceof xn)
                        for (var s = arguments[0], o = arguments[1], a = arguments[2], u = o.getEdge().getCoordinates(), n = 0; n < u.length - 1; n++) {
                            this.seg.p0 = u[n], this.seg.p1 = u[n + 1], this.seg.p0.y > this.seg.p1.y && this.seg.reverse();
                            var l = Math.max(this.seg.p0.x, this.seg.p1.x);
                            if (!(l < s.x || this.seg.isHorizontal() || s.y < this.seg.p0.y || s.y > this.seg.p1.y || le.computeOrientation(this.seg.p0, this.seg.p1, s) === le.RIGHT)) {
                                var h = o.getDepth(hn.LEFT);
                                this.seg.p0.equals(u[n]) || (h = o.getDepth(hn.RIGHT));
                                var c = new ir(this.seg, h);
                                a.add(c)
                            }
                        } else if (w(arguments[2], y) && arguments[0] instanceof g && w(arguments[1], y))
                            for (var f = arguments[0], d = arguments[1], p = arguments[2], n = d.iterator(); n.hasNext();) {
                                var m = n.next();
                                m.isForward() && this.findStabbedSegments(f, m, p)
                            }
            },
            getDepth: function(t) {
                var e = this.findStabbedSegments(t);
                return 0 === e.size() ? 0 : uo.min(e).leftDepth
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return nr
            }
        }), e(ir.prototype, {
            compareTo: function(t) {
                var e = t;
                if (this.upwardSeg.minX() >= e.upwardSeg.maxX()) return 1;
                if (this.upwardSeg.maxX() <= e.upwardSeg.minX()) return -1;
                var n = this.upwardSeg.orientationIndex(e.upwardSeg);
                return 0 !== n ? n : (n = -1 * e.upwardSeg.orientationIndex(this.upwardSeg), 0 !== n ? n : this.upwardSeg.compareTo(e.upwardSeg))
            },
            compareX: function(t, e) {
                var n = t.p0.compareTo(e.p0);
                return 0 !== n ? n : t.p1.compareTo(e.p1)
            },
            toString: function() {
                return this.upwardSeg.toString()
            },
            interfaces_: function() {
                return [s]
            },
            getClass: function() {
                return ir
            }
        }), nr.DepthSegment = ir, e(rr.prototype, {
            addPoint: function(t) {
                if (this.distance <= 0) return null;
                var e = t.getCoordinates(),
                    n = this.curveBuilder.getLineCurve(e, this.distance);
                this.addCurve(n, S.EXTERIOR, S.INTERIOR)
            },
            addPolygon: function(t) {
                var e = this.distance,
                    n = hn.LEFT;
                this.distance < 0 && (e = -this.distance, n = hn.RIGHT);
                var i = t.getExteriorRing(),
                    r = H.removeRepeatedPoints(i.getCoordinates());
                if (this.distance < 0 && this.isErodedCompletely(i, this.distance)) return null;
                if (this.distance <= 0 && r.length < 3) return null;
                this.addPolygonRing(r, e, n, S.EXTERIOR, S.INTERIOR);
                for (var s = 0; s < t.getNumInteriorRing(); s++) {
                    var o = t.getInteriorRingN(s),
                        a = H.removeRepeatedPoints(o.getCoordinates());
                    this.distance > 0 && this.isErodedCompletely(o, -this.distance) || this.addPolygonRing(a, e, hn.opposite(n), S.INTERIOR, S.EXTERIOR)
                }
            },
            isTriangleErodedCompletely: function(t, e) {
                var n = new Ci(t[0], t[1], t[2]),
                    i = n.inCentre();
                return le.distancePointLine(i, n.p0, n.p1) < Math.abs(e)
            },
            addLineString: function(t) {
                if (this.distance <= 0 && !this.curveBuilder.getBufferParameters().isSingleSided()) return null;
                var e = H.removeRepeatedPoints(t.getCoordinates()),
                    n = this.curveBuilder.getLineCurve(e, this.distance);
                this.addCurve(n, S.EXTERIOR, S.INTERIOR)
            },
            addCurve: function(t, e, n) {
                if (null === t || t.length < 2) return null;
                var i = new We(t, new fn(0, S.BOUNDARY, e, n));
                this.curveList.add(i)
            },
            getCurves: function() {
                return this.add(this.inputGeom), this.curveList
            },
            addPolygonRing: function(t, e, n, i, r) {
                if (0 === e && t.length < Mt.MINIMUM_VALID_SIZE) return null;
                var s = i,
                    o = r;
                t.length >= Mt.MINIMUM_VALID_SIZE && le.isCCW(t) && (s = r, o = i, n = hn.opposite(n));
                var a = this.curveBuilder.getRingCurve(t, n, e);
                this.addCurve(a, s, o)
            },
            add: function(t) {
                if (t.isEmpty()) return null;
                if (t instanceof bt) this.addPolygon(t);
                else if (t instanceof Lt) this.addLineString(t);
                else if (t instanceof St) this.addPoint(t);
                else if (t instanceof Rt) this.addCollection(t);
                else if (t instanceof gt) this.addCollection(t);
                else if (t instanceof Tt) this.addCollection(t);
                else {
                    if (!(t instanceof ft)) throw new UnsupportedOperationException(t.getClass().getName());
                    this.addCollection(t)
                }
            },
            isErodedCompletely: function(t, e) {
                var n = t.getCoordinates();
                if (n.length < 4) return e < 0;
                if (4 === n.length) return this.isTriangleErodedCompletely(n, e);
                var i = t.getEnvelopeInternal(),
                    r = Math.min(i.getHeight(), i.getWidth());
                return e < 0 && 2 * Math.abs(e) > r
            },
            addCollection: function(t) {
                for (var e = 0; e < t.getNumGeometries(); e++) {
                    var n = t.getGeometryN(e);
                    this.add(n)
                }
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return rr
            }
        }), e(sr.prototype, {
            isTrivialIntersection: function(t, e, n, i) {
                if (t === n && 1 === this.li.getIntersectionNum()) {
                    if (sr.isAdjacentSegments(e, i)) return !0;
                    if (t.isClosed()) {
                        var r = t.size() - 1;
                        if (0 === e && i === r || 0 === i && e === r) return !0
                    }
                }
                return !1
            },
            getProperIntersectionPoint: function() {
                return this.properIntersectionPoint
            },
            hasProperInteriorIntersection: function() {
                return this.hasProperInterior
            },
            getLineIntersector: function() {
                return this.li
            },
            hasProperIntersection: function() {
                return this.hasProper
            },
            processIntersections: function(t, e, n, i) {
                if (t === n && e === i) return null;
                this.numTests++;
                var r = t.getCoordinates()[e],
                    s = t.getCoordinates()[e + 1],
                    o = n.getCoordinates()[i],
                    a = n.getCoordinates()[i + 1];
                this.li.computeIntersection(r, s, o, a), this.li.hasIntersection() && (this.numIntersections++, this.li.isInteriorIntersection() && (this.numInteriorIntersections++, this.hasInterior = !0), this.isTrivialIntersection(t, e, n, i) || (this._hasIntersection = !0, t.addIntersections(this.li, e, 0), n.addIntersections(this.li, i, 1), this.li.isProper() && (this.numProperIntersections++, this.hasProper = !0, this.hasProperInterior = !0)))
            },
            hasIntersection: function() {
                return this._hasIntersection
            },
            isDone: function() {
                return !1
            },
            hasInteriorIntersection: function() {
                return this.hasInterior
            },
            interfaces_: function() {
                return [sn]
            },
            getClass: function() {
                return sr
            }
        }), sr.isAdjacentSegments = function(t, e) {
            return 1 === Math.abs(t - e)
        }, e(or.prototype, {
            setWorkingPrecisionModel: function(t) {
                this.workingPrecisionModel = t
            },
            insertUniqueEdge: function(t) {
                var e = this.edgeList.findEqualEdge(t);
                if (null !== e) {
                    var n = e.getLabel(),
                        i = t.getLabel();
                    e.isPointwiseEqual(t) || (i = new fn(t.getLabel()), i.flip()), n.merge(i);
                    var r = or.depthDelta(i),
                        s = e.getDepthDelta(),
                        o = s + r;
                    e.setDepthDelta(o)
                } else this.edgeList.add(t), t.setDepthDelta(or.depthDelta(t.getLabel()))
            },
            buildSubgraphs: function(t, e) {
                for (var n = new I, i = t.iterator(); i.hasNext();) {
                    var r = i.next(),
                        s = r.getRightmostCoordinate(),
                        o = new nr(n),
                        a = o.getDepth(s);
                    r.computeDepth(a), r.findResultEdges(), n.add(r), e.add(r.getDirectedEdges(), r.getNodes())
                }
            },
            createSubgraphs: function(t) {
                for (var e = new I, n = t.getNodes().iterator(); n.hasNext();) {
                    var i = n.next();
                    if (!i.isVisited()) {
                        var r = new Zi;
                        r.create(i), e.add(r)
                    }
                }
                return uo.sort(e, uo.reverseOrder()), e
            },
            createEmptyResultGeometry: function() {
                return this.geomFact.createPolygon()
            },
            getNoder: function(t) {
                if (null !== this.workingNoder) return this.workingNoder;
                var e = new en,
                    n = new oe;
                return n.setPrecisionModel(t), e.setSegmentIntersector(new sr(n)), e
            },
            buffer: function(t, e) {
                var n = this.workingPrecisionModel;
                null === n && (n = t.getPrecisionModel()), this.geomFact = t.getFactory();
                var i = new er(n, this.bufParams),
                    r = new rr(t, e, i),
                    s = r.getCurves();
                if (s.size() <= 0) return this.createEmptyResultGeometry();
                this.computeNodedEdges(s, n), this.graph = new Nn(new Mn), this.graph.addEdges(this.edgeList.getEdges());
                var o = this.createSubgraphs(this.graph),
                    a = new Cn(this.geomFact);
                this.buildSubgraphs(o, a);
                var u = a.getPolygons();
                return u.size() <= 0 ? this.createEmptyResultGeometry() : this.geomFact.buildGeometry(u)
            },
            computeNodedEdges: function(t, e) {
                var n = this.getNoder(e);
                n.computeNodes(t);
                for (var i = n.getNodedSubstrings(), r = i.iterator(); r.hasNext();) {
                    var s = r.next(),
                        o = s.getCoordinates();
                    if (2 !== o.length || !o[0].equals2D(o[1])) {
                        var a = s.getData(),
                            u = new Zn(s.getCoordinates(), new fn(a));
                        this.insertUniqueEdge(u)
                    }
                }
            },
            setNoder: function(t) {
                this.workingNoder = t
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return or
            }
        }), or.depthDelta = function(t) {
            var e = t.getLocation(0, hn.LEFT),
                n = t.getLocation(0, hn.RIGHT);
            return e === S.INTERIOR && n === S.EXTERIOR ? 1 : e === S.EXTERIOR && n === S.INTERIOR ? -1 : 0
        }, or.convertSegStrings = function(t) {
            for (var e = new ne, n = new I; t.hasNext();) {
                var i = t.next(),
                    r = e.createLineString(i.getCoordinates());
                n.add(r)
            }
            return e.buildGeometry(n)
        }, e(ar.prototype, {
            checkEndPtVertexIntersections: function() {
                if (0 === arguments.length)
                    for (var t = this.segStrings.iterator(); t.hasNext();) {
                        var e = t.next(),
                            n = e.getCoordinates();
                        this.checkEndPtVertexIntersections(n[0], this.segStrings), this.checkEndPtVertexIntersections(n[n.length - 1], this.segStrings)
                    } else if (2 === arguments.length)
                        for (var i = arguments[0], r = arguments[1], t = r.iterator(); t.hasNext();)
                            for (var e = t.next(), n = e.getCoordinates(), s = 1; s < n.length - 1; s++)
                                if (n[s].equals(i)) throw new l("found endpt/interior pt intersection at index " + s + " :pt " + i)
            },
            checkInteriorIntersections: function() {
                if (0 === arguments.length)
                    for (var t = this.segStrings.iterator(); t.hasNext();)
                        for (var e = t.next(), n = this.segStrings.iterator(); n.hasNext();) {
                            var i = n.next();
                            this.checkInteriorIntersections(e, i)
                        } else if (2 === arguments.length)
                            for (var r = arguments[0], s = arguments[1], o = r.getCoordinates(), a = s.getCoordinates(), u = 0; u < o.length - 1; u++)
                                for (var h = 0; h < a.length - 1; h++) this.checkInteriorIntersections(r, u, s, h);
                        else if (4 === arguments.length) {
                    var c = arguments[0],
                        f = arguments[1],
                        g = arguments[2],
                        d = arguments[3];
                    if (c === g && f === d) return null;
                    var p = c.getCoordinates()[f],
                        m = c.getCoordinates()[f + 1],
                        v = g.getCoordinates()[d],
                        y = g.getCoordinates()[d + 1];
                    if (this.li.computeIntersection(p, m, v, y), this.li.hasIntersection() && (this.li.isProper() || this.hasInteriorIntersection(this.li, p, m) || this.hasInteriorIntersection(this.li, v, y))) throw new l("found non-noded intersection at " + p + "-" + m + " and " + v + "-" + y)
                }
            },
            checkValid: function() {
                this.checkEndPtVertexIntersections(), this.checkInteriorIntersections(), this.checkCollapses()
            },
            checkCollapses: function() {
                if (0 === arguments.length)
                    for (var t = this.segStrings.iterator(); t.hasNext();) {
                        var e = t.next();
                        this.checkCollapses(e)
                    } else if (1 === arguments.length)
                        for (var n = arguments[0], i = n.getCoordinates(), t = 0; t < i.length - 2; t++) this.checkCollapse(i[t], i[t + 1], i[t + 2])
            },
            hasInteriorIntersection: function(t, e, n) {
                for (var i = 0; i < t.getIntersectionNum(); i++) {
                    var r = t.getIntersection(i);
                    if (!r.equals(e) && !r.equals(n)) return !0
                }
                return !1
            },
            checkCollapse: function(t, e, n) {
                if (t.equals(n)) throw new l("found non-noded collapse at " + ar.fact.createLineString([t, e, n]))
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return ar
            }
        }), ar.fact = new ne, e(ur.prototype, {
            intersectsScaled: function(t, e) {
                var n = Math.min(t.x, e.x),
                    i = Math.max(t.x, e.x),
                    r = Math.min(t.y, e.y),
                    s = Math.max(t.y, e.y),
                    o = this.maxx < n || this.minx > i || this.maxy < r || this.miny > s;
                if (o) return !1;
                var a = this.intersectsToleranceSquare(t, e);
                return f.isTrue(!(o && a), "Found bad envelope test"), a
            },
            initCorners: function(t) {
                this.minx = t.x - .5, this.maxx = t.x + .5, this.miny = t.y - .5, this.maxy = t.y + .5, this.corner[0] = new g(this.maxx, this.maxy), this.corner[1] = new g(this.minx, this.maxy), this.corner[2] = new g(this.minx, this.miny), this.corner[3] = new g(this.maxx, this.miny)
            },
            intersects: function(t, e) {
                return 1 === this.scaleFactor ? this.intersectsScaled(t, e) : (this.copyScaled(t, this.p0Scaled), this.copyScaled(e, this.p1Scaled), this.intersectsScaled(this.p0Scaled, this.p1Scaled))
            },
            scale: function(t) {
                return Math.round(t * this.scaleFactor)
            },
            getCoordinate: function() {
                return this.originalPt
            },
            copyScaled: function(t, e) {
                e.x = this.scale(t.x), e.y = this.scale(t.y)
            },
            getSafeEnvelope: function() {
                if (null === this.safeEnv) {
                    var t = ur.SAFE_ENV_EXPANSION_FACTOR / this.scaleFactor;
                    this.safeEnv = new C(this.originalPt.x - t, this.originalPt.x + t, this.originalPt.y - t, this.originalPt.y + t)
                }
                return this.safeEnv
            },
            intersectsPixelClosure: function(t, e) {
                return this.li.computeIntersection(t, e, this.corner[0], this.corner[1]), !!(this.li.hasIntersection() || (this.li.computeIntersection(t, e, this.corner[1], this.corner[2]), this.li.hasIntersection() || (this.li.computeIntersection(t, e, this.corner[2], this.corner[3]), this.li.hasIntersection() || (this.li.computeIntersection(t, e, this.corner[3], this.corner[0]), this.li.hasIntersection()))))
            },
            intersectsToleranceSquare: function(t, e) {
                var n = !1,
                    i = !1;
                return this.li.computeIntersection(t, e, this.corner[0], this.corner[1]), !!(this.li.isProper() || (this.li.computeIntersection(t, e, this.corner[1], this.corner[2]), this.li.isProper() || (this.li.hasIntersection() && (n = !0), this.li.computeIntersection(t, e, this.corner[2], this.corner[3]), this.li.isProper() || (this.li.hasIntersection() && (i = !0), this.li.computeIntersection(t, e, this.corner[3], this.corner[0]), this.li.isProper() || n && i || t.equals(this.pt) || e.equals(this.pt)))))
            },
            addSnappedNode: function(t, e) {
                var n = t.getCoordinate(e),
                    i = t.getCoordinate(e + 1);
                return !!this.intersects(n, i) && (t.addIntersection(this.getCoordinate(), e), !0)
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return ur
            }
        }), ur.SAFE_ENV_EXPANSION_FACTOR = .75, e(lr.prototype, {
            snap: function() {
                if (1 === arguments.length) {
                    var t = arguments[0];
                    return this.snap(t, null, -1)
                }
                if (3 === arguments.length) {
                    var e = arguments[0],
                        n = arguments[1],
                        i = arguments[2],
                        r = e.getSafeEnvelope(),
                        s = new hr(e, n, i);
                    return this.index.query(r, {
                        interfaces_: function() {
                            return [De]
                        },
                        visitItem: function(t) {
                            t.select(r, s)
                        }
                    }), s.isNodeAdded()
                }
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return lr
            }
        }), h(hr, li), e(hr.prototype, {
            isNodeAdded: function() {
                return this._isNodeAdded
            },
            select: function() {
                if (2 !== arguments.length) return li.prototype.select.apply(this, arguments);
                var t = arguments[0],
                    e = arguments[1],
                    n = t.getContext();
                return null !== this.parentEdge && n === this.parentEdge && e === this.hotPixelVertexIndex ? null : void(this._isNodeAdded = this.hotPixel.addSnappedNode(n, e))
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return hr
            }
        }), lr.HotPixelSnapAction = hr, e(cr.prototype, {
            processIntersections: function(t, e, n, i) {
                if (t === n && e === i) return null;
                var r = t.getCoordinates()[e],
                    s = t.getCoordinates()[e + 1],
                    o = n.getCoordinates()[i],
                    a = n.getCoordinates()[i + 1];
                if (this.li.computeIntersection(r, s, o, a), this.li.hasIntersection() && this.li.isInteriorIntersection()) {
                    for (var u = 0; u < this.li.getIntersectionNum(); u++) this.interiorIntersections.add(this.li.getIntersection(u));
                    t.addIntersections(this.li, e, 0), n.addIntersections(this.li, i, 1)
                }
            },
            isDone: function() {
                return !1
            },
            getInteriorIntersections: function() {
                return this.interiorIntersections
            },
            interfaces_: function() {
                return [sn]
            },
            getClass: function() {
                return cr
            }
        }), e(fr.prototype, {
            checkCorrectness: function(t) {
                var e = We.getNodedSubstrings(t),
                    n = new ar(e);
                try {
                    n.checkValid()
                } catch (t) {
                    if (!(t instanceof L)) throw t;
                    t.printStackTrace()
                }
            },
            getNodedSubstrings: function() {
                return We.getNodedSubstrings(this.nodedSegStrings)
            },
            snapRound: function(t, e) {
                var n = this.findInteriorIntersections(t, e);
                this.computeIntersectionSnaps(n), this.computeVertexSnaps(t)
            },
            findInteriorIntersections: function(t, e) {
                var n = new cr(e);
                return this.noder.setSegmentIntersector(n), this.noder.computeNodes(t), n.getInteriorIntersections()
            },
            computeVertexSnaps: function() {
                if (w(arguments[0], m))
                    for (var t = arguments[0], e = t.iterator(); e.hasNext();) {
                        var n = e.next();
                        this.computeVertexSnaps(n)
                    } else if (arguments[0] instanceof We)
                        for (var i = arguments[0], r = i.getCoordinates(), s = 0; s < r.length; s++) {
                            var o = new ur(r[s], this.scaleFactor, this.li),
                                a = this.pointSnapper.snap(o, i, s);
                            a && i.addIntersection(r[s], s)
                        }
            },
            computeNodes: function(t) {
                this.nodedSegStrings = t, this.noder = new en, this.pointSnapper = new lr(this.noder.getIndex()), this.snapRound(t, this.li)
            },
            computeIntersectionSnaps: function(t) {
                for (var e = t.iterator(); e.hasNext();) {
                    var n = e.next(),
                        i = new ur(n, this.scaleFactor, this.li);
                    this.pointSnapper.snap(i)
                }
            },
            interfaces_: function() {
                return [$e]
            },
            getClass: function() {
                return fr
            }
        }), e(gr.prototype, {
            bufferFixedPrecision: function(t) {
                var e = new Xi(new fr(new te(1)), t.getScale()),
                    n = new or(this.bufParams);
                n.setWorkingPrecisionModel(t), n.setNoder(e), this.resultGeometry = n.buffer(this.argGeom, this.distance)
            },
            bufferReducedPrecision: function() {
                if (0 === arguments.length) {
                    for (var t = gr.MAX_PRECISION_DIGITS; t >= 0; t--) {
                        try {
                            this.bufferReducedPrecision(t)
                        } catch (t) {
                            if (!(t instanceof rn)) throw t;
                            this.saveException = t
                        }
                        if (null !== this.resultGeometry) return null
                    }
                    throw this.saveException
                }
                if (1 === arguments.length) {
                    var e = arguments[0],
                        n = gr.precisionScaleFactor(this.argGeom, this.distance, e),
                        i = new te(n);
                    this.bufferFixedPrecision(i)
                }
            },
            computeGeometry: function() {
                if (this.bufferOriginalPrecision(), null !== this.resultGeometry) return null;
                var t = this.argGeom.getFactory().getPrecisionModel();
                t.getType() === te.FIXED ? this.bufferFixedPrecision(t) : this.bufferReducedPrecision()
            },
            setQuadrantSegments: function(t) {
                this.bufParams.setQuadrantSegments(t)
            },
            bufferOriginalPrecision: function() {
                try {
                    var t = new or(this.bufParams);
                    this.resultGeometry = t.buffer(this.argGeom, this.distance)
                } catch (t) {
                    if (!(t instanceof l)) throw t;
                    this.saveException = t
                }
            },
            getResultGeometry: function(t) {
                return this.distance = t, this.computeGeometry(), this.resultGeometry
            },
            setEndCapStyle: function(t) {
                this.bufParams.setEndCapStyle(t)
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return gr
            }
        }), gr.bufferOp = function() {
            if (2 === arguments.length) {
                var t = arguments[0],
                    e = arguments[1],
                    n = new gr(t),
                    i = n.getResultGeometry(e);
                return i
            }
            if (3 === arguments.length) {
                if (Number.isInteger(arguments[2]) && arguments[0] instanceof B && "number" == typeof arguments[1]) {
                    var r = arguments[0],
                        s = arguments[1],
                        o = arguments[2],
                        a = new gr(r);
                    a.setQuadrantSegments(o);
                    var i = a.getResultGeometry(s);
                    return i
                }
                if (arguments[2] instanceof Wi && arguments[0] instanceof B && "number" == typeof arguments[1]) {
                    var u = arguments[0],
                        l = arguments[1],
                        h = arguments[2],
                        a = new gr(u, h),
                        i = a.getResultGeometry(l);
                    return i
                }
            } else if (4 === arguments.length) {
                var c = arguments[0],
                    f = arguments[1],
                    g = arguments[2],
                    d = arguments[3],
                    a = new gr(c);
                a.setQuadrantSegments(g), a.setEndCapStyle(d);
                var i = a.getResultGeometry(f);
                return i
            }
        }, gr.precisionScaleFactor = function(t, e, n) {
            var i = t.getEnvelopeInternal(),
                r = b.max(Math.abs(i.getMaxX()), Math.abs(i.getMaxY()), Math.abs(i.getMinX()), Math.abs(i.getMinY())),
                s = e > 0 ? e : 0,
                o = r + 2 * s,
                a = Math.trunc(Math.log(o) / Math.log(10) + 1),
                u = n - a;
            return Math.pow(10, u)
        }, gr.CAP_ROUND = Wi.CAP_ROUND, gr.CAP_BUTT = Wi.CAP_FLAT, gr.CAP_FLAT = Wi.CAP_FLAT, gr.CAP_SQUARE = Wi.CAP_SQUARE, gr.MAX_PRECISION_DIGITS = 12;
        var No = Object.freeze({
            BufferOp: gr,
            BufferParameters: Wi
        });
        e(dr.prototype, {
            filter: function(t) {
                t instanceof bt && this.comps.add(t)
            },
            interfaces_: function() {
                return [ht]
            },
            getClass: function() {
                return dr
            }
        }), dr.getPolygons = function() {
            if (1 === arguments.length) {
                var t = arguments[0];
                return dr.getPolygons(t, new I)
            }
            if (2 === arguments.length) {
                var e = arguments[0],
                    n = arguments[1];
                return e instanceof bt ? n.add(e) : e instanceof ft && e.apply(new dr(n)), n
            }
        }, e(pr.prototype, {
            isInsideArea: function() {
                return this.segIndex === pr.INSIDE_AREA
            },
            getCoordinate: function() {
                return this.pt
            },
            getGeometryComponent: function() {
                return this.component
            },
            getSegmentIndex: function() {
                return this.segIndex
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return pr
            }
        }), pr.INSIDE_AREA = -1, e(mr.prototype, {
            filter: function(t) {
                t instanceof St && this.pts.add(t)
            },
            interfaces_: function() {
                return [ht]
            },
            getClass: function() {
                return mr
            }
        }), mr.getPoints = function() {
            if (1 === arguments.length) {
                var t = arguments[0];
                return t instanceof St ? uo.singletonList(t) : mr.getPoints(t, new I)
            }
            if (2 === arguments.length) {
                var e = arguments[0],
                    n = arguments[1];
                return e instanceof St ? n.add(e) : e instanceof ft && e.apply(new mr(n)), n
            }
        }, e(vr.prototype, {
            filter: function(t) {
                (t instanceof St || t instanceof Lt || t instanceof bt) && this.locations.add(new pr(t, 0, t.getCoordinate()))
            },
            interfaces_: function() {
                return [ht]
            },
            getClass: function() {
                return vr
            }
        }), vr.getLocations = function(t) {
            var e = new I;
            return t.apply(new vr(e)), e
        }, e(yr.prototype, {
            computeContainmentDistance: function() {
                if (0 === arguments.length) {
                    var t = new Array(2).fill(null);
                    if (this.computeContainmentDistance(0, t), this.minDistance <= this.terminateDistance) return null;
                    this.computeContainmentDistance(1, t)
                } else if (2 === arguments.length) {
                    var e = arguments[0],
                        n = arguments[1],
                        i = 1 - e,
                        r = dr.getPolygons(this.geom[e]);
                    if (r.size() > 0) {
                        var s = vr.getLocations(this.geom[i]);
                        if (this.computeContainmentDistance(s, r, n), this.minDistance <= this.terminateDistance) return this.minDistanceLocation[i] = n[0], this.minDistanceLocation[e] = n[1], null
                    }
                } else if (3 === arguments.length)
                    if (arguments[2] instanceof Array && w(arguments[0], y) && w(arguments[1], y)) {
                        for (var o = arguments[0], a = arguments[1], u = arguments[2], l = 0; l < o.size(); l++)
                            for (var h = o.get(l), c = 0; c < a.size(); c++)
                                if (this.computeContainmentDistance(h, a.get(c), u), this.minDistance <= this.terminateDistance) return null
                    } else if (arguments[2] instanceof Array && arguments[0] instanceof pr && arguments[1] instanceof bt) {
                    var f = arguments[0],
                        g = arguments[1],
                        d = arguments[2],
                        p = f.getCoordinate();
                    if (S.EXTERIOR !== this.ptLocator.locate(p, g)) return this.minDistance = 0, d[0] = f, d[1] = new pr(g, p), null
                }
            },
            computeMinDistanceLinesPoints: function(t, e, n) {
                for (var i = 0; i < t.size(); i++)
                    for (var r = t.get(i), s = 0; s < e.size(); s++) {
                        var o = e.get(s);
                        if (this.computeMinDistance(r, o, n), this.minDistance <= this.terminateDistance) return null
                    }
            },
            computeFacetDistance: function() {
                var t = new Array(2).fill(null),
                    e = zn.getLines(this.geom[0]),
                    n = zn.getLines(this.geom[1]),
                    i = mr.getPoints(this.geom[0]),
                    r = mr.getPoints(this.geom[1]);
                return this.computeMinDistanceLines(e, n, t), this.updateMinDistance(t, !1), this.minDistance <= this.terminateDistance ? null : (t[0] = null, t[1] = null, this.computeMinDistanceLinesPoints(e, r, t), this.updateMinDistance(t, !1), this.minDistance <= this.terminateDistance ? null : (t[0] = null, t[1] = null, this.computeMinDistanceLinesPoints(n, i, t), this.updateMinDistance(t, !0), this.minDistance <= this.terminateDistance ? null : (t[0] = null, t[1] = null, this.computeMinDistancePoints(i, r, t), void this.updateMinDistance(t, !1))))
            },
            nearestLocations: function() {
                return this.computeMinDistance(), this.minDistanceLocation
            },
            updateMinDistance: function(t, e) {
                return null === t[0] ? null : void(e ? (this.minDistanceLocation[0] = t[1], this.minDistanceLocation[1] = t[0]) : (this.minDistanceLocation[0] = t[0], this.minDistanceLocation[1] = t[1]))
            },
            nearestPoints: function() {
                return this.computeMinDistance(), [this.minDistanceLocation[0].getCoordinate(), this.minDistanceLocation[1].getCoordinate()]
            },
            computeMinDistance: function() {
                if (0 === arguments.length) {
                    if (null !== this.minDistanceLocation) return null;
                    if (this.minDistanceLocation = new Array(2).fill(null), this.computeContainmentDistance(), this.minDistance <= this.terminateDistance) return null;
                    this.computeFacetDistance()
                } else if (3 === arguments.length)
                    if (arguments[2] instanceof Array && arguments[0] instanceof Lt && arguments[1] instanceof St) {
                        var t = arguments[0],
                            e = arguments[1],
                            n = arguments[2];
                        if (t.getEnvelopeInternal().distance(e.getEnvelopeInternal()) > this.minDistance) return null;
                        for (var i = t.getCoordinates(), r = e.getCoordinate(), s = 0; s < i.length - 1; s++) {
                            var o = le.distancePointLine(r, i[s], i[s + 1]);
                            if (o < this.minDistance) {
                                this.minDistance = o;
                                var a = new he(i[s], i[s + 1]),
                                    u = a.closestPoint(r);
                                n[0] = new pr(t, s, u), n[1] = new pr(e, 0, r)
                            }
                            if (this.minDistance <= this.terminateDistance) return null
                        }
                    } else if (arguments[2] instanceof Array && arguments[0] instanceof Lt && arguments[1] instanceof Lt) {
                    var l = arguments[0],
                        h = arguments[1],
                        c = arguments[2];
                    if (l.getEnvelopeInternal().distance(h.getEnvelopeInternal()) > this.minDistance) return null;
                    for (var i = l.getCoordinates(), f = h.getCoordinates(), s = 0; s < i.length - 1; s++)
                        for (var g = 0; g < f.length - 1; g++) {
                            var o = le.distanceLineLine(i[s], i[s + 1], f[g], f[g + 1]);
                            if (o < this.minDistance) {
                                this.minDistance = o;
                                var d = new he(i[s], i[s + 1]),
                                    p = new he(f[g], f[g + 1]),
                                    m = d.closestPoints(p);
                                c[0] = new pr(l, s, m[0]), c[1] = new pr(h, g, m[1])
                            }
                            if (this.minDistance <= this.terminateDistance) return null
                        }
                }
            },
            computeMinDistancePoints: function(t, e, n) {
                for (var i = 0; i < t.size(); i++)
                    for (var r = t.get(i), s = 0; s < e.size(); s++) {
                        var o = e.get(s),
                            a = r.getCoordinate().distance(o.getCoordinate());
                        if (a < this.minDistance && (this.minDistance = a, n[0] = new pr(r, 0, r.getCoordinate()), n[1] = new pr(o, 0, o.getCoordinate())), this.minDistance <= this.terminateDistance) return null
                    }
            },
            distance: function() {
                if (null === this.geom[0] || null === this.geom[1]) throw new i("null geometries are not supported");
                return this.geom[0].isEmpty() || this.geom[1].isEmpty() ? 0 : (this.computeMinDistance(), this.minDistance)
            },
            computeMinDistanceLines: function(t, e, n) {
                for (var i = 0; i < t.size(); i++)
                    for (var r = t.get(i), s = 0; s < e.size(); s++) {
                        var o = e.get(s);
                        if (this.computeMinDistance(r, o, n), this.minDistance <= this.terminateDistance) return null
                    }
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return yr
            }
        }), yr.distance = function(t, e) {
            return new yr(t, e).distance()
        }, yr.isWithinDistance = function(t, e, n) {
            return new yr(t, e, n).distance() <= n
        }, yr.nearestPoints = function(t, e) {
            return new yr(t, e).nearestPoints()
        };
        var Co = Object.freeze({
            DistanceOp: yr
        });
        e(Er.prototype, {
            getCoordinates: function() {
                if (null === this.coordinates) {
                    for (var t = 0, e = 0, n = new N, i = this.directedEdges.iterator(); i.hasNext();) {
                        var r = i.next();
                        r.getEdgeDirection() ? t++ : e++, n.add(r.getEdge().getLine().getCoordinates(), !1, r.getEdgeDirection())
                    }
                    this.coordinates = n.toCoordinateArray(), e > t && H.reverse(this.coordinates)
                }
                return this.coordinates
            },
            toLineString: function() {
                return this.factory.createLineString(this.getCoordinates())
            },
            add: function(t) {
                this.directedEdges.add(t)
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Er
            }
        }), e(xr.prototype, {
            setVisited: function(t) {
                this._isVisited = t
            },
            isMarked: function() {
                return this._isMarked
            },
            setData: function(t) {
                this.data = t
            },
            getData: function() {
                return this.data
            },
            setMarked: function(t) {
                this._isMarked = t
            },
            getContext: function() {
                return this.data
            },
            isVisited: function() {
                return this._isVisited
            },
            setContext: function(t) {
                this.data = t
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return xr
            }
        }), xr.getComponentWithVisitedState = function(t, e) {
            for (; t.hasNext();) {
                var n = t.next();
                if (n.isVisited() === e) return n
            }
            return null
        }, xr.setVisited = function(t, e) {
            for (; t.hasNext();) {
                t.next().setVisited(e)
            }
        }, xr.setMarked = function(t, e) {
            for (; t.hasNext();) {
                t.next().setMarked(e)
            }
        }, h(Ir, xr), e(Ir.prototype, {
            isRemoved: function() {
                return null === this.parentEdge
            },
            compareDirection: function(t) {
                return this.quadrant > t.quadrant ? 1 : this.quadrant < t.quadrant ? -1 : le.computeOrientation(t.p0, t.p1, this.p1)
            },
            getCoordinate: function() {
                return this.from.getCoordinate()
            },
            print: function(t) {
                var e = this.getClass().getName(),
                    n = e.lastIndexOf("."),
                    i = e.substring(n + 1);
                t.print("  " + i + ": " + this.p0 + " - " + this.p1 + " " + this.quadrant + ":" + this.angle)
            },
            getDirectionPt: function() {
                return this.p1
            },
            getAngle: function() {
                return this.angle
            },
            compareTo: function(t) {
                var e = t;
                return this.compareDirection(e)
            },
            getFromNode: function() {
                return this.from
            },
            getSym: function() {
                return this.sym
            },
            setEdge: function(t) {
                this.parentEdge = t
            },
            remove: function() {
                this.sym = null, this.parentEdge = null
            },
            getEdge: function() {
                return this.parentEdge
            },
            getQuadrant: function() {
                return this.quadrant
            },
            setSym: function(t) {
                this.sym = t
            },
            getToNode: function() {
                return this.to
            },
            getEdgeDirection: function() {
                return this.edgeDirection
            },
            interfaces_: function() {
                return [s]
            },
            getClass: function() {
                return Ir
            }
        }), Ir.toEdges = function(t) {
            for (var e = new I, n = t.iterator(); n.hasNext();) e.add(n.next().parentEdge);
            return e
        }, h(Nr, Ir), e(Nr.prototype, {
            getNext: function() {
                return 2 !== this.getToNode().getDegree() ? null : this.getToNode().getOutEdges().getEdges().get(0) === this.getSym() ? this.getToNode().getOutEdges().getEdges().get(1) : (f.isTrue(this.getToNode().getOutEdges().getEdges().get(1) === this.getSym()), this.getToNode().getOutEdges().getEdges().get(0))
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Nr
            }
        }), h(Cr, xr), e(Cr.prototype, {
            isRemoved: function() {
                return null === this.dirEdge
            },
            setDirectedEdges: function(t, e) {
                this.dirEdge = [t, e], t.setEdge(this), e.setEdge(this), t.setSym(e), e.setSym(t), t.getFromNode().addOutEdge(t), e.getFromNode().addOutEdge(e)
            },
            getDirEdge: function() {
                if (Number.isInteger(arguments[0])) {
                    var t = arguments[0];
                    return this.dirEdge[t]
                }
                if (arguments[0] instanceof _r) {
                    var e = arguments[0];
                    return this.dirEdge[0].getFromNode() === e ? this.dirEdge[0] : this.dirEdge[1].getFromNode() === e ? this.dirEdge[1] : null
                }
            },
            remove: function() {
                this.dirEdge = null
            },
            getOppositeNode: function(t) {
                return this.dirEdge[0].getFromNode() === t ? this.dirEdge[0].getToNode() : this.dirEdge[1].getFromNode() === t ? this.dirEdge[1].getToNode() : null
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Cr
            }
        }), e(Lr.prototype, {
            getNextEdge: function(t) {
                var e = this.getIndex(t);
                return this.outEdges.get(this.getIndex(e + 1))
            },
            getCoordinate: function() {
                var t = this.iterator();
                return t.hasNext() ? t.next().getCoordinate() : null
            },
            iterator: function() {
                return this.sortEdges(), this.outEdges.iterator()
            },
            sortEdges: function() {
                this.sorted || (uo.sort(this.outEdges), this.sorted = !0)
            },
            remove: function(t) {
                this.outEdges.remove(t)
            },
            getEdges: function() {
                return this.sortEdges(), this.outEdges
            },
            getNextCWEdge: function(t) {
                var e = this.getIndex(t);
                return this.outEdges.get(this.getIndex(e - 1))
            },
            getIndex: function() {
                if (arguments[0] instanceof Cr) {
                    var t = arguments[0];
                    this.sortEdges();
                    for (var e = 0; e < this.outEdges.size(); e++) {
                        var n = this.outEdges.get(e);
                        if (n.getEdge() === t) return e
                    }
                    return -1
                }
                if (arguments[0] instanceof Ir) {
                    var i = arguments[0];
                    this.sortEdges();
                    for (var e = 0; e < this.outEdges.size(); e++) {
                        var n = this.outEdges.get(e);
                        if (n === i) return e
                    }
                    return -1
                }
                if (Number.isInteger(arguments[0])) {
                    var r = arguments[0],
                        s = r % this.outEdges.size();
                    return s < 0 && (s += this.outEdges.size()), s
                }
            },
            add: function(t) {
                this.outEdges.add(t), this.sorted = !1
            },
            getDegree: function() {
                return this.outEdges.size()
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Lr
            }
        }), h(_r, xr), e(_r.prototype, {
            isRemoved: function() {
                return null === this.pt
            },
            addOutEdge: function(t) {
                this.deStar.add(t)
            },
            getCoordinate: function() {
                return this.pt
            },
            getOutEdges: function() {
                return this.deStar
            },
            remove: function() {
                if (0 === arguments.length) this.pt = null;
                else if (1 === arguments.length) {
                    var t = arguments[0];
                    this.deStar.remove(t)
                }
            },
            getIndex: function(t) {
                return this.deStar.getIndex(t)
            },
            getDegree: function() {
                return this.deStar.getDegree()
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return _r
            }
        }), _r.getEdgesBetween = function(t, e) {
            var n = Ir.toEdges(t.getOutEdges().getEdges()),
                i = new Q(n),
                r = Ir.toEdges(e.getOutEdges().getEdges());
            return i.retainAll(r), i
        }, h(Sr, Cr), e(Sr.prototype, {
            getLine: function() {
                return this.line
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Sr
            }
        }), e(wr.prototype, {
            find: function(t) {
                return this.nodeMap.get(t)
            },
            iterator: function() {
                return this.nodeMap.values().iterator()
            },
            remove: function(t) {
                return this.nodeMap.remove(t)
            },
            values: function() {
                return this.nodeMap.values()
            },
            add: function(t) {
                return this.nodeMap.put(t.getCoordinate(), t), t
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return wr
            }
        }), e(br.prototype, {
            findNodesOfDegree: function(t) {
                for (var e = new I, n = this.nodeIterator(); n.hasNext();) {
                    var i = n.next();
                    i.getDegree() === t && e.add(i)
                }
                return e
            },
            dirEdgeIterator: function() {
                return this.dirEdges.iterator()
            },
            edgeIterator: function() {
                return this.edges.iterator()
            },
            remove: function() {
                if (arguments[0] instanceof Cr) {
                    var t = arguments[0];
                    this.remove(t.getDirEdge(0)), this.remove(t.getDirEdge(1)), this.edges.remove(t), t.remove()
                } else if (arguments[0] instanceof Ir) {
                    var e = arguments[0],
                        n = e.getSym();
                    null !== n && n.setSym(null), e.getFromNode().remove(e), e.remove(), this.dirEdges.remove(e)
                } else if (arguments[0] instanceof _r) {
                    for (var i = arguments[0], r = i.getOutEdges().getEdges(), s = r.iterator(); s.hasNext();) {
                        var o = s.next(),
                            n = o.getSym();
                        null !== n && this.remove(n), this.dirEdges.remove(o);
                        var a = o.getEdge();
                        null !== a && this.edges.remove(a)
                    }
                    this.nodeMap.remove(i.getCoordinate()), i.remove()
                }
            },
            findNode: function(t) {
                return this.nodeMap.find(t)
            },
            getEdges: function() {
                return this.edges
            },
            nodeIterator: function() {
                return this.nodeMap.iterator()
            },
            contains: function() {
                if (arguments[0] instanceof Cr) {
                    var t = arguments[0];
                    return this.edges.contains(t)
                }
                if (arguments[0] instanceof Ir) {
                    var e = arguments[0];
                    return this.dirEdges.contains(e)
                }
            },
            add: function() {
                if (arguments[0] instanceof _r) {
                    var t = arguments[0];
                    this.nodeMap.add(t)
                } else if (arguments[0] instanceof Cr) {
                    var e = arguments[0];
                    this.edges.add(e), this.add(e.getDirEdge(0)), this.add(e.getDirEdge(1))
                } else if (arguments[0] instanceof Ir) {
                    var n = arguments[0];
                    this.dirEdges.add(n)
                }
            },
            getNodes: function() {
                return this.nodeMap.values()
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return br
            }
        }), h(Rr, br), e(Rr.prototype, {
            addEdge: function(t) {
                if (t.isEmpty()) return null;
                var e = H.removeRepeatedPoints(t.getCoordinates());
                if (e.length <= 1) return null;
                var n = e[0],
                    i = e[e.length - 1],
                    r = this.getNode(n),
                    s = this.getNode(i),
                    o = new Nr(r, s, e[1], !0),
                    a = new Nr(s, r, e[e.length - 2], !1),
                    u = new Sr(t);
                u.setDirectedEdges(o, a), this.add(u)
            },
            getNode: function(t) {
                var e = this.findNode(t);
                return null === e && (e = new _r(t), this.add(e)), e
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Rr
            }
        }), e(Mr.prototype, {
            buildEdgeStringsForUnprocessedNodes: function() {
                for (var t = this.graph.getNodes().iterator(); t.hasNext();) {
                    var e = t.next();
                    e.isMarked() || (f.isTrue(2 === e.getDegree()), this.buildEdgeStringsStartingAt(e), e.setMarked(!0))
                }
            },
            buildEdgeStringsForNonDegree2Nodes: function() {
                for (var t = this.graph.getNodes().iterator(); t.hasNext();) {
                    var e = t.next();
                    2 !== e.getDegree() && (this.buildEdgeStringsStartingAt(e), e.setMarked(!0))
                }
            },
            buildEdgeStringsForObviousStartNodes: function() {
                this.buildEdgeStringsForNonDegree2Nodes()
            },
            getMergedLineStrings: function() {
                return this.merge(), this.mergedLineStrings
            },
            buildEdgeStringsStartingAt: function(t) {
                for (var e = t.getOutEdges().iterator(); e.hasNext();) {
                    var n = e.next();
                    n.getEdge().isMarked() || this.edgeStrings.add(this.buildEdgeStringStartingWith(n))
                }
            },
            merge: function() {
                if (null !== this.mergedLineStrings) return null;
                xr.setMarked(this.graph.nodeIterator(), !1), xr.setMarked(this.graph.edgeIterator(), !1), this.edgeStrings = new I, this.buildEdgeStringsForObviousStartNodes(), this.buildEdgeStringsForIsolatedLoops(), this.mergedLineStrings = new I;
                for (var t = this.edgeStrings.iterator(); t.hasNext();) {
                    var e = t.next();
                    this.mergedLineStrings.add(e.toLineString())
                }
            },
            buildEdgeStringStartingWith: function(t) {
                var e = new Er(this.factory),
                    n = t;
                do {
                    e.add(n), n.getEdge().setMarked(!0), n = n.getNext()
                } while (null !== n && n !== t);
                return e
            },
            add: function() {
                if (arguments[0] instanceof B) {
                    arguments[0].apply({
                        interfaces_: function() {
                            return [G]
                        },
                        filter: function(t) {
                            t instanceof Lt && this.add(t)
                        }
                    })
                } else if (w(arguments[0], m)) {
                    var t = arguments[0];
                    this.mergedLineStrings = null;
                    for (var e = t.iterator(); e.hasNext();) {
                        var n = e.next();
                        this.add(n)
                    }
                } else if (arguments[0] instanceof Lt) {
                    var i = arguments[0];
                    null === this.factory && (this.factory = i.getFactory()), this.graph.addEdge(i)
                }
            },
            buildEdgeStringsForIsolatedLoops: function() {
                this.buildEdgeStringsForUnprocessedNodes()
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Mr
            }
        });
        var Lo = Object.freeze({
                LineMerger: Mr
            }),
            _o = Object.freeze({
                OverlayOp: ni
            });
        h(Tr, Ir), e(Tr.prototype, {
            getNext: function() {
                return this.next
            },
            isInRing: function() {
                return null !== this.edgeRing
            },
            setRing: function(t) {
                this.edgeRing = t
            },
            setLabel: function(t) {
                this.label = t
            },
            getLabel: function() {
                return this.label
            },
            setNext: function(t) {
                this.next = t
            },
            getRing: function() {
                return this.edgeRing
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Tr
            }
        }), h(Pr, Cr), e(Pr.prototype, {
            getLine: function() {
                return this.line
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Pr
            }
        }), e(Or.prototype, {
            visitInteriorRing: function(t, e) {
                var n = t.getCoordinates(),
                    i = n[0],
                    r = Or.findDifferentPoint(n, i),
                    s = e.findEdgeInSameDirection(i, r),
                    o = e.findEdgeEnd(s),
                    a = null;
                o.getLabel().getLocation(0, hn.RIGHT) === S.INTERIOR ? a = o : o.getSym().getLabel().getLocation(0, hn.RIGHT) === S.INTERIOR && (a = o.getSym()), f.isTrue(null !== a, "unable to find dirEdge with Interior on RHS"), this.visitLinkedDirectedEdges(a)
            },
            visitShellInteriors: function(t, e) {
                if (t instanceof bt) {
                    var n = t;
                    this.visitInteriorRing(n.getExteriorRing(), e)
                }
                if (t instanceof Tt)
                    for (var i = t, r = 0; r < i.getNumGeometries(); r++) {
                        var n = i.getGeometryN(r);
                        this.visitInteriorRing(n.getExteriorRing(), e)
                    }
            },
            getCoordinate: function() {
                return this.disconnectedRingcoord
            },
            setInteriorEdgesInResult: function(t) {
                for (var e = t.getEdgeEnds().iterator(); e.hasNext();) {
                    var n = e.next();
                    n.getLabel().getLocation(0, hn.RIGHT) === S.INTERIOR && n.setInResult(!0)
                }
            },
            visitLinkedDirectedEdges: function(t) {
                var e = t,
                    n = t;
                do {
                    f.isTrue(null !== n, "found null Directed Edge"), n.setVisited(!0), n = n.getNext()
                } while (n !== e)
            },
            buildEdgeRings: function(t) {
                for (var e = new I, n = t.iterator(); n.hasNext();) {
                    var i = n.next();
                    if (i.isInResult() && null === i.getEdgeRing()) {
                        var r = new pn(i, this.geometryFactory);
                        r.linkDirectedEdgesForMinimalEdgeRings();
                        var s = r.buildMinimalRings();
                        e.addAll(s)
                    }
                }
                return e
            },
            hasUnvisitedShellEdge: function(t) {
                for (var e = 0; e < t.size(); e++) {
                    var n = t.get(e);
                    if (!n.isHole()) {
                        var i = n.getEdges(),
                            r = i.get(0);
                        if (r.getLabel().getLocation(0, hn.RIGHT) === S.INTERIOR)
                            for (var s = 0; s < i.size(); s++)
                                if (r = i.get(s), !r.isVisited()) return this.disconnectedRingcoord = r.getCoordinate(), !0
                    }
                }
                return !1
            },
            isInteriorsConnected: function() {
                var t = new I;
                this.geomGraph.computeSplitEdges(t);
                var e = new Nn(new Mn);
                e.addEdges(t), this.setInteriorEdgesInResult(e), e.linkResultDirectedEdges();
                var n = this.buildEdgeRings(e.getEdgeEnds());
                return this.visitShellInteriors(this.geomGraph.getGeometry(), e), !this.hasUnvisitedShellEdge(n)
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Or
            }
        }), Or.findDifferentPoint = function(t, e) {
            for (var n = 0; n < t.length; n++)
                if (!t[n].equals(e)) return t[n];
            return null
        }, e(Dr.prototype, {
            createEdgeEndForNext: function(t, e, n, i) {
                var r = n.segmentIndex + 1;
                if (r >= t.getNumPoints() && null === i) return null;
                var s = t.getCoordinate(r);
                null !== i && i.segmentIndex === n.segmentIndex && (s = i.coord);
                var o = new En(t, n.coord, s, new fn(t.getLabel()));
                e.add(o)
            },
            createEdgeEndForPrev: function(t, e, n, i) {
                var r = n.segmentIndex;
                if (0 === n.dist) {
                    if (0 === r) return null;
                    r--
                }
                var s = t.getCoordinate(r);
                null !== i && i.segmentIndex >= r && (s = i.coord);
                var o = new fn(t.getLabel());
                o.flip();
                var a = new En(t, n.coord, s, o);
                e.add(a)
            },
            computeEdgeEnds: function() {
                if (1 === arguments.length) {
                    for (var t = arguments[0], e = new I, n = t; n.hasNext();) {
                        var i = n.next();
                        this.computeEdgeEnds(i, e)
                    }
                    return e
                }
                if (2 === arguments.length) {
                    var r = arguments[0],
                        s = arguments[1],
                        o = r.getEdgeIntersectionList();
                    o.addEndpoints();
                    var a = o.iterator(),
                        u = null,
                        l = null;
                    if (!a.hasNext()) return null;
                    var h = a.next();
                    do {
                        u = l, l = h, h = null, a.hasNext() && (h = a.next()), null !== l && (this.createEdgeEndForPrev(r, s, l, u), this.createEdgeEndForNext(r, s, l, h))
                    } while (null !== l)
                }
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Dr
            }
        }), h(Ar, En), e(Ar.prototype, {
            insert: function(t) {
                this.edgeEnds.add(t)
            },
            print: function(t) {
                t.println("EdgeEndBundle--\x3e Label: " + this.label);
                for (var e = this.iterator(); e.hasNext();) {
                    e.next().print(t), t.println()
                }
            },
            iterator: function() {
                return this.edgeEnds.iterator()
            },
            getEdgeEnds: function() {
                return this.edgeEnds
            },
            computeLabelOn: function(t, e) {
                for (var n = 0, i = !1, r = this.iterator(); r.hasNext();) {
                    var s = r.next(),
                        o = s.getLabel().getLocation(t);
                    o === S.BOUNDARY && n++, o === S.INTERIOR && (i = !0)
                }
                var o = S.NONE;
                i && (o = S.INTERIOR), n > 0 && (o = Qn.determineBoundary(e, n)), this.label.setLocation(t, o)
            },
            computeLabelSide: function(t, e) {
                for (var n = this.iterator(); n.hasNext();) {
                    var i = n.next();
                    if (i.getLabel().isArea()) {
                        var r = i.getLabel().getLocation(t, e);
                        if (r === S.INTERIOR) return this.label.setLocation(t, e, S.INTERIOR), null;
                        r === S.EXTERIOR && this.label.setLocation(t, e, S.EXTERIOR)
                    }
                }
            },
            getLabel: function() {
                return this.label
            },
            computeLabelSides: function(t) {
                this.computeLabelSide(t, hn.LEFT), this.computeLabelSide(t, hn.RIGHT)
            },
            updateIM: function(t) {
                Zn.updateIM(this.label, t)
            },
            computeLabel: function(t) {
                for (var e = !1, n = this.iterator(); n.hasNext();) {
                    n.next().getLabel().isArea() && (e = !0)
                }
                this.label = e ? new fn(S.NONE, S.NONE, S.NONE) : new fn(S.NONE);
                for (var i = 0; i < 2; i++) this.computeLabelOn(i, t), e && this.computeLabelSides(i)
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Ar
            }
        }), h(Fr, bn), e(Fr.prototype, {
            updateIM: function(t) {
                for (var e = this.iterator(); e.hasNext();) {
                    e.next().updateIM(t)
                }
            },
            insert: function(t) {
                var e = this.edgeMap.get(t);
                null === e ? (e = new Ar(t), this.insertEdgeEnd(t, e)) : e.insert(t)
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Fr
            }
        }), h(kr, vn), e(kr.prototype, {
            updateIMFromEdges: function(t) {
                this.edges.updateIM(t)
            },
            computeIM: function(t) {
                t.setAtLeastIfValid(this.label.getLocation(0), this.label.getLocation(1), 0)
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return kr
            }
        }), h(Gr, In), e(Gr.prototype, {
            createNode: function(t) {
                return new kr(t, new Fr)
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Gr
            }
        }), e(Br.prototype, {
            insertEdgeEnds: function(t) {
                for (var e = t.iterator(); e.hasNext();) {
                    var n = e.next();
                    this.nodes.add(n)
                }
            },
            getNodeIterator: function() {
                return this.nodes.iterator()
            },
            copyNodesAndLabels: function(t, e) {
                for (var n = t.getNodeIterator(); n.hasNext();) {
                    var i = n.next();
                    this.nodes.addNode(i.getCoordinate()).setLabel(e, i.getLabel().getLocation(e))
                }
            },
            build: function(t) {
                this.computeIntersectionNodes(t, 0), this.copyNodesAndLabels(t, 0);
                var e = new Dr,
                    n = e.computeEdgeEnds(t.getEdgeIterator());
                this.insertEdgeEnds(n)
            },
            computeIntersectionNodes: function(t, e) {
                for (var n = t.getEdgeIterator(); n.hasNext();)
                    for (var i = n.next(), r = i.getLabel().getLocation(e), s = i.getEdgeIntersectionList().iterator(); s.hasNext();) {
                        var o = s.next(),
                            a = this.nodes.addNode(o.coord);
                        r === S.BOUNDARY ? a.setLabelBoundary(e) : a.getLabel().isNull(e) && a.setLabel(e, S.INTERIOR)
                    }
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Br
            }
        }), e(qr.prototype, {
            isNodeEdgeAreaLabelsConsistent: function() {
                for (var t = this.nodeGraph.getNodeIterator(); t.hasNext();) {
                    var e = t.next();
                    if (!e.getEdges().isAreaLabelsConsistent(this.geomGraph)) return this.invalidPoint = e.getCoordinate().copy(), !1
                }
                return !0
            },
            getInvalidPoint: function() {
                return this.invalidPoint
            },
            hasDuplicateRings: function() {
                for (var t = this.nodeGraph.getNodeIterator(); t.hasNext();)
                    for (var e = t.next(), n = e.getEdges().iterator(); n.hasNext();) {
                        var i = n.next();
                        if (i.getEdgeEnds().size() > 1) return this.invalidPoint = i.getEdge().getCoordinate(0), !0
                    }
                return !1
            },
            isNodeConsistentArea: function() {
                var t = this.geomGraph.computeSelfNodes(this.li, !0, !0);
                return t.hasProperIntersection() ? (this.invalidPoint = t.getProperIntersectionPoint(), !1) : (this.nodeGraph.build(this.geomGraph), this.isNodeEdgeAreaLabelsConsistent())
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return qr
            }
        }), e(zr.prototype, {
            buildIndex: function() {
                this.index = new ze;
                for (var t = 0; t < this.rings.size(); t++) {
                    var e = this.rings.get(t),
                        n = e.getEnvelopeInternal();
                    this.index.insert(n, e)
                }
            },
            getNestedPoint: function() {
                return this.nestedPt
            },
            isNonNested: function() {
                this.buildIndex();
                for (var t = 0; t < this.rings.size(); t++)
                    for (var e = this.rings.get(t), n = e.getCoordinates(), i = this.index.query(e.getEnvelopeInternal()), r = 0; r < i.size(); r++) {
                        var s = i.get(r),
                            o = s.getCoordinates();
                        if (e !== s && e.getEnvelopeInternal().intersects(s.getEnvelopeInternal())) {
                            var a = Ur.findPtNotNode(n, s, this.graph);
                            if (null !== a) {
                                var u = le.isPointInRing(a, o);
                                if (u) return this.nestedPt = a, !1
                            }
                        }
                    }
                return !0
            },
            add: function(t) {
                this.rings.add(t), this.totalEnv.expandToInclude(t.getEnvelopeInternal())
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return zr
            }
        }), e(Vr.prototype, {
            getErrorType: function() {
                return this.errorType
            },
            getMessage: function() {
                return Vr.errMsg[this.errorType]
            },
            getCoordinate: function() {
                return this.pt
            },
            toString: function() {
                var t = "";
                return null !== this.pt && (t = " at or near point " + this.pt), this.getMessage() + t
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Vr
            }
        }), Vr.ERROR = 0, Vr.REPEATED_POINT = 1, Vr.HOLE_OUTSIDE_SHELL = 2, Vr.NESTED_HOLES = 3, Vr.DISCONNECTED_INTERIOR = 4, Vr.SELF_INTERSECTION = 5, Vr.RING_SELF_INTERSECTION = 6, Vr.NESTED_SHELLS = 7, Vr.DUPLICATE_RINGS = 8, Vr.TOO_FEW_POINTS = 9, Vr.INVALID_COORDINATE = 10, Vr.RING_NOT_CLOSED = 11, Vr.errMsg = ["Topology Validation Error", "Repeated Point", "Hole lies outside shell", "Holes are nested", "Interior is disconnected", "Self-intersection", "Ring Self-intersection", "Nested shells", "Duplicate Rings", "Too few distinct points in geometry component", "Invalid Coordinate", "Ring is not closed"], e(Ur.prototype, {
            checkInvalidCoordinates: function() {
                if (arguments[0] instanceof Array) {
                    for (var t = arguments[0], e = 0; e < t.length; e++)
                        if (!Ur.isValid(t[e])) return this.validErr = new Vr(Vr.INVALID_COORDINATE, t[e]), null
                } else if (arguments[0] instanceof bt) {
                    var n = arguments[0];
                    if (this.checkInvalidCoordinates(n.getExteriorRing().getCoordinates()), null !== this.validErr) return null;
                    for (var e = 0; e < n.getNumInteriorRing(); e++)
                        if (this.checkInvalidCoordinates(n.getInteriorRingN(e).getCoordinates()), null !== this.validErr) return null
                }
            },
            checkHolesNotNested: function(t, e) {
                for (var n = new zr(e), i = 0; i < t.getNumInteriorRing(); i++) {
                    var r = t.getInteriorRingN(i);
                    n.add(r)
                }
                n.isNonNested() || (this.validErr = new Vr(Vr.NESTED_HOLES, n.getNestedPoint()))
            },
            checkConsistentArea: function(t) {
                var e = new qr(t);
                return e.isNodeConsistentArea() ? void(e.hasDuplicateRings() && (this.validErr = new Vr(Vr.DUPLICATE_RINGS, e.getInvalidPoint()))) : (this.validErr = new Vr(Vr.SELF_INTERSECTION, e.getInvalidPoint()), null)
            },
            isValid: function() {
                return this.checkValid(this.parentGeometry), null === this.validErr
            },
            checkShellInsideHole: function(t, e, n) {
                var i = t.getCoordinates(),
                    r = e.getCoordinates(),
                    s = Ur.findPtNotNode(i, e, n);
                if (null !== s) {
                    if (!le.isPointInRing(s, r)) return s
                }
                var o = Ur.findPtNotNode(r, t, n);
                if (null !== o) {
                    return le.isPointInRing(o, i) ? o : null
                }
                return f.shouldNeverReachHere("points in shell and hole appear to be equal"), null
            },
            checkNoSelfIntersectingRings: function(t) {
                for (var e = t.getEdgeIterator(); e.hasNext();) {
                    var n = e.next();
                    if (this.checkNoSelfIntersectingRing(n.getEdgeIntersectionList()), null !== this.validErr) return null
                }
            },
            checkConnectedInteriors: function(t) {
                var e = new Or(t);
                e.isInteriorsConnected() || (this.validErr = new Vr(Vr.DISCONNECTED_INTERIOR, e.getCoordinate()))
            },
            checkNoSelfIntersectingRing: function(t) {
                for (var e = new at, n = !0, i = t.iterator(); i.hasNext();) {
                    var r = i.next();
                    if (n) n = !1;
                    else {
                        if (e.contains(r.coord)) return this.validErr = new Vr(Vr.RING_SELF_INTERSECTION, r.coord), null;
                        e.add(r.coord)
                    }
                }
            },
            checkHolesInShell: function(t, e) {
                for (var n = t.getExteriorRing(), i = new xi(n), r = 0; r < t.getNumInteriorRing(); r++) {
                    var s = t.getInteriorRingN(r),
                        o = Ur.findPtNotNode(s.getCoordinates(), n, e);
                    if (null === o) return null;
                    if (!i.isInside(o)) return this.validErr = new Vr(Vr.HOLE_OUTSIDE_SHELL, o), null
                }
            },
            checkTooFewPoints: function(t) {
                if (t.hasTooFewPoints()) return this.validErr = new Vr(Vr.TOO_FEW_POINTS, t.getInvalidPoint()), null
            },
            getValidationError: function() {
                return this.checkValid(this.parentGeometry), this.validErr
            },
            checkValid: function() {
                if (arguments[0] instanceof St) {
                    var t = arguments[0];
                    this.checkInvalidCoordinates(t.getCoordinates())
                } else if (arguments[0] instanceof Rt) {
                    var e = arguments[0];
                    this.checkInvalidCoordinates(e.getCoordinates())
                } else if (arguments[0] instanceof Mt) {
                    var n = arguments[0];
                    if (this.checkInvalidCoordinates(n.getCoordinates()), null !== this.validErr) return null;
                    if (this.checkClosedRing(n), null !== this.validErr) return null;
                    var i = new Qn(0, n);
                    if (this.checkTooFewPoints(i), null !== this.validErr) return null;
                    var r = new oe;
                    i.computeSelfNodes(r, !0, !0), this.checkNoSelfIntersectingRings(i)
                } else if (arguments[0] instanceof Lt) {
                    var s = arguments[0];
                    if (this.checkInvalidCoordinates(s.getCoordinates()), null !== this.validErr) return null;
                    var i = new Qn(0, s);
                    this.checkTooFewPoints(i)
                } else if (arguments[0] instanceof bt) {
                    var o = arguments[0];
                    if (this.checkInvalidCoordinates(o), null !== this.validErr) return null;
                    if (this.checkClosedRings(o), null !== this.validErr) return null;
                    var i = new Qn(0, o);
                    if (this.checkTooFewPoints(i), null !== this.validErr) return null;
                    if (this.checkConsistentArea(i), null !== this.validErr) return null;
                    if (!this.isSelfTouchingRingFormingHoleValid && (this.checkNoSelfIntersectingRings(i), null !== this.validErr)) return null;
                    if (this.checkHolesInShell(o, i), null !== this.validErr) return null;
                    if (this.checkHolesNotNested(o, i), null !== this.validErr) return null;
                    this.checkConnectedInteriors(i)
                } else if (arguments[0] instanceof Tt) {
                    for (var a = arguments[0], u = 0; u < a.getNumGeometries(); u++) {
                        var l = a.getGeometryN(u);
                        if (this.checkInvalidCoordinates(l), null !== this.validErr) return null;
                        if (this.checkClosedRings(l), null !== this.validErr) return null
                    }
                    var i = new Qn(0, a);
                    if (this.checkTooFewPoints(i), null !== this.validErr) return null;
                    if (this.checkConsistentArea(i), null !== this.validErr) return null;
                    if (!this.isSelfTouchingRingFormingHoleValid && (this.checkNoSelfIntersectingRings(i), null !== this.validErr)) return null;
                    for (var u = 0; u < a.getNumGeometries(); u++) {
                        var l = a.getGeometryN(u);
                        if (this.checkHolesInShell(l, i), null !== this.validErr) return null
                    }
                    for (var u = 0; u < a.getNumGeometries(); u++) {
                        var l = a.getGeometryN(u);
                        if (this.checkHolesNotNested(l, i), null !== this.validErr) return null
                    }
                    if (this.checkShellsNotNested(a, i), null !== this.validErr) return null;
                    this.checkConnectedInteriors(i)
                } else if (arguments[0] instanceof ft)
                    for (var h = arguments[0], u = 0; u < h.getNumGeometries(); u++) {
                        var c = h.getGeometryN(u);
                        if (this.checkValid(c), null !== this.validErr) return null
                    } else if (arguments[0] instanceof B) {
                        var f = arguments[0];
                        if (this.validErr = null, f.isEmpty()) return null;
                        if (f instanceof St) this.checkValid(f);
                        else if (f instanceof Rt) this.checkValid(f);
                        else if (f instanceof Mt) this.checkValid(f);
                        else if (f instanceof Lt) this.checkValid(f);
                        else if (f instanceof bt) this.checkValid(f);
                        else if (f instanceof Tt) this.checkValid(f);
                        else {
                            if (!(f instanceof ft)) throw new UnsupportedOperationException(f.getClass().getName());
                            this.checkValid(f)
                        }
                    }
            },
            setSelfTouchingRingFormingHoleValid: function(t) {
                this.isSelfTouchingRingFormingHoleValid = t
            },
            checkShellNotNested: function(t, e, n) {
                var i = t.getCoordinates(),
                    r = e.getExteriorRing(),
                    s = r.getCoordinates(),
                    o = Ur.findPtNotNode(i, r, n);
                if (null === o) return null;
                if (!le.isPointInRing(o, s)) return null;
                if (e.getNumInteriorRing() <= 0) return this.validErr = new Vr(Vr.NESTED_SHELLS, o), null;
                for (var a = null, u = 0; u < e.getNumInteriorRing(); u++) {
                    var l = e.getInteriorRingN(u);
                    if (null === (a = this.checkShellInsideHole(t, l, n))) return null
                }
                this.validErr = new Vr(Vr.NESTED_SHELLS, a)
            },
            checkClosedRings: function(t) {
                if (this.checkClosedRing(t.getExteriorRing()), null !== this.validErr) return null;
                for (var e = 0; e < t.getNumInteriorRing(); e++)
                    if (this.checkClosedRing(t.getInteriorRingN(e)), null !== this.validErr) return null
            },
            checkClosedRing: function(t) {
                if (!t.isClosed()) {
                    var e = null;
                    t.getNumPoints() >= 1 && (e = t.getCoordinateN(0)), this.validErr = new Vr(Vr.RING_NOT_CLOSED, e)
                }
            },
            checkShellsNotNested: function(t, e) {
                for (var n = 0; n < t.getNumGeometries(); n++)
                    for (var i = t.getGeometryN(n), r = i.getExteriorRing(), s = 0; s < t.getNumGeometries(); s++)
                        if (n !== s) {
                            var o = t.getGeometryN(s);
                            if (this.checkShellNotNested(r, o, e), null !== this.validErr) return null
                        }
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Ur
            }
        }), Ur.findPtNotNode = function(t, e, n) {
            for (var i = n.findEdge(e), r = i.getEdgeIntersectionList(), s = 0; s < t.length; s++) {
                var o = t[s];
                if (!r.isIntersection(o)) return o
            }
            return null
        }, Ur.isValid = function() {
            if (arguments[0] instanceof B) {
                return new Ur(arguments[0]).isValid()
            }
            if (arguments[0] instanceof g) {
                var t = arguments[0];
                return !(r.isNaN(t.x) || r.isInfinite(t.x) || r.isNaN(t.y) || r.isInfinite(t.y))
            }
        }, e(Yr.prototype, {
            isIncluded: function() {
                return this._isIncluded
            },
            getCoordinates: function() {
                if (null === this.ringPts) {
                    for (var t = new N, e = this.deList.iterator(); e.hasNext();) {
                        var n = e.next(),
                            i = n.getEdge();
                        Yr.addEdge(i.getLine().getCoordinates(), n.getEdgeDirection(), t)
                    }
                    this.ringPts = t.toCoordinateArray()
                }
                return this.ringPts
            },
            isIncludedSet: function() {
                return this._isIncludedSet
            },
            isValid: function() {
                return this.getCoordinates(), !(this.ringPts.length <= 3) && (this.getRing(), Ur.isValid(this.ring))
            },
            build: function(t) {
                var e = t;
                do {
                    this.add(e), e.setRing(this), e = e.getNext(), f.isTrue(null !== e, "found null DE in ring"), f.isTrue(e === t || !e.isInRing(), "found DE already in ring")
                } while (e !== t)
            },
            isOuterHole: function() {
                return !!this._isHole && !this.hasShell()
            },
            getPolygon: function() {
                var t = null;
                if (null !== this.holes) {
                    t = new Array(this.holes.size()).fill(null);
                    for (var e = 0; e < this.holes.size(); e++) t[e] = this.holes.get(e)
                }
                return this.factory.createPolygon(this.ring, t)
            },
            isHole: function() {
                return this._isHole
            },
            isProcessed: function() {
                return this._isProcessed
            },
            addHole: function() {
                if (arguments[0] instanceof Mt) {
                    var t = arguments[0];
                    null === this.holes && (this.holes = new I), this.holes.add(t)
                } else if (arguments[0] instanceof Yr) {
                    var e = arguments[0];
                    e.setShell(this);
                    var n = e.getRing();
                    null === this.holes && (this.holes = new I), this.holes.add(n)
                }
            },
            setIncluded: function(t) {
                this._isIncluded = t, this._isIncludedSet = !0
            },
            getOuterHole: function() {
                if (this.isHole()) return null;
                for (var t = 0; t < this.deList.size(); t++) {
                    var e = this.deList.get(t),
                        n = e.getSym().getRing();
                    if (n.isOuterHole()) return n
                }
                return null
            },
            computeHole: function() {
                var t = this.getRing();
                this._isHole = le.isCCW(t.getCoordinates())
            },
            hasShell: function() {
                return null !== this.shell
            },
            isOuterShell: function() {
                return null !== this.getOuterHole()
            },
            getLineString: function() {
                return this.getCoordinates(), this.factory.createLineString(this.ringPts)
            },
            toString: function() {
                return re.toLineString(new kt(this.getCoordinates()))
            },
            getShell: function() {
                return this.isHole() ? this.shell : this
            },
            add: function(t) {
                this.deList.add(t)
            },
            getRing: function() {
                if (null !== this.ring) return this.ring;
                this.getCoordinates(), this.ringPts.length < 3 && A.out.println(this.ringPts);
                try {
                    this.ring = this.factory.createLinearRing(this.ringPts)
                } catch (t) {
                    if (!(t instanceof L)) throw t;
                    A.out.println(this.ringPts)
                }
                return this.ring
            },
            updateIncluded: function() {
                if (this.isHole()) return null;
                for (var t = 0; t < this.deList.size(); t++) {
                    var e = this.deList.get(t),
                        n = e.getSym().getRing().getShell();
                    if (null !== n && n.isIncludedSet()) return this.setIncluded(!n.isIncluded()), null
                }
            },
            setShell: function(t) {
                this.shell = t
            },
            setProcessed: function(t) {
                this._isProcessed = t
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Yr
            }
        }), Yr.findDirEdgesInRing = function(t) {
            var e = t,
                n = new I;
            do {
                n.add(e), e = e.getNext(), f.isTrue(null !== e, "found null DE in ring"), f.isTrue(e === t || !e.isInRing(), "found DE already in ring")
            } while (e !== t);
            return n
        }, Yr.addEdge = function(t, e, n) {
            if (e)
                for (var i = 0; i < t.length; i++) n.add(t[i], !1);
            else
                for (var i = t.length - 1; i >= 0; i--) n.add(t[i], !1)
        }, Yr.findEdgeRingContaining = function(t, e) {
            for (var n = t.getRing(), i = n.getEnvelopeInternal(), r = n.getCoordinateN(0), s = null, o = null, a = e.iterator(); a.hasNext();) {
                var u = a.next(),
                    l = u.getRing(),
                    h = l.getEnvelopeInternal();
                if (!h.equals(i) && h.contains(i)) {
                    r = H.ptNotInList(n.getCoordinates(), l.getCoordinates());
                    var c = !1;
                    le.isPointInRing(r, l.getCoordinates()) && (c = !0), c && (null === s || o.contains(h)) && (s = u, o = s.getRing().getEnvelopeInternal())
                }
            }
            return s
        }, e(Xr.prototype, {
            compare: function(t, e) {
                var n = t,
                    i = e;
                return n.getRing().getEnvelope().compareTo(i.getRing().getEnvelope())
            },
            interfaces_: function() {
                return [a]
            },
            getClass: function() {
                return Xr
            }
        }), Yr.EnvelopeComparator = Xr, h(Hr, br), e(Hr.prototype, {
            findEdgeRing: function(t) {
                var e = new Yr(this.factory);
                return e.build(t), e
            },
            computeDepthParity: function() {
                if (0 === arguments.length)
                    for (;;) {
                        return null
                    } else 1 === arguments.length && arguments[0]
            },
            computeNextCWEdges: function() {
                for (var t = this.nodeIterator(); t.hasNext();) {
                    var e = t.next();
                    Hr.computeNextCWEdges(e)
                }
            },
            addEdge: function(t) {
                if (t.isEmpty()) return null;
                var e = H.removeRepeatedPoints(t.getCoordinates());
                if (e.length < 2) return null;
                var n = e[0],
                    i = e[e.length - 1],
                    r = this.getNode(n),
                    s = this.getNode(i),
                    o = new Tr(r, s, e[1], !0),
                    a = new Tr(s, r, e[e.length - 2], !1),
                    u = new Pr(t);
                u.setDirectedEdges(o, a), this.add(u)
            },
            deleteCutEdges: function() {
                this.computeNextCWEdges(), Hr.findLabeledEdgeRings(this.dirEdges);
                for (var t = new I, e = this.dirEdges.iterator(); e.hasNext();) {
                    var n = e.next();
                    if (!n.isMarked()) {
                        var i = n.getSym();
                        if (n.getLabel() === i.getLabel()) {
                            n.setMarked(!0), i.setMarked(!0);
                            var r = n.getEdge();
                            t.add(r.getLine())
                        }
                    }
                }
                return t
            },
            getEdgeRings: function() {
                this.computeNextCWEdges(), Hr.label(this.dirEdges, -1);
                var t = Hr.findLabeledEdgeRings(this.dirEdges);
                this.convertMaximalToMinimalEdgeRings(t);
                for (var e = new I, n = this.dirEdges.iterator(); n.hasNext();) {
                    var i = n.next();
                    if (!i.isMarked() && !i.isInRing()) {
                        var r = this.findEdgeRing(i);
                        e.add(r)
                    }
                }
                return e
            },
            getNode: function(t) {
                var e = this.findNode(t);
                return null === e && (e = new _r(t), this.add(e)), e
            },
            convertMaximalToMinimalEdgeRings: function(t) {
                for (var e = t.iterator(); e.hasNext();) {
                    var n = e.next(),
                        i = n.getLabel(),
                        r = Hr.findIntersectionNodes(n, i);
                    if (null !== r)
                        for (var s = r.iterator(); s.hasNext();) {
                            var o = s.next();
                            Hr.computeNextCCWEdges(o, i)
                        }
                }
            },
            deleteDangles: function() {
                for (var t = this.findNodesOfDegree(1), e = new Q, n = new de, i = t.iterator(); i.hasNext();) n.push(i.next());
                for (; !n.isEmpty();) {
                    var r = n.pop();
                    Hr.deleteAllEdges(r);
                    for (var s = r.getOutEdges().getEdges(), i = s.iterator(); i.hasNext();) {
                        var o = i.next();
                        o.setMarked(!0);
                        var a = o.getSym();
                        null !== a && a.setMarked(!0);
                        var u = o.getEdge();
                        e.add(u.getLine());
                        var l = o.getToNode();
                        1 === Hr.getDegreeNonDeleted(l) && n.push(l)
                    }
                }
                return e
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Hr
            }
        }), Hr.findLabeledEdgeRings = function(t) {
            for (var e = new I, n = 1, i = t.iterator(); i.hasNext();) {
                var r = i.next();
                if (!(r.isMarked() || r.getLabel() >= 0)) {
                    e.add(r);
                    var s = Yr.findDirEdgesInRing(r);
                    Hr.label(s, n), n++
                }
            }
            return e
        }, Hr.getDegreeNonDeleted = function(t) {
            for (var e = t.getOutEdges().getEdges(), n = 0, i = e.iterator(); i.hasNext();) {
                i.next().isMarked() || n++
            }
            return n
        }, Hr.deleteAllEdges = function(t) {
            for (var e = t.getOutEdges().getEdges(), n = e.iterator(); n.hasNext();) {
                var i = n.next();
                i.setMarked(!0);
                var r = i.getSym();
                null !== r && r.setMarked(!0)
            }
        }, Hr.label = function(t, e) {
            for (var n = t.iterator(); n.hasNext();) {
                n.next().setLabel(e)
            }
        }, Hr.computeNextCWEdges = function(t) {
            for (var e = t.getOutEdges(), n = null, i = null, r = e.getEdges().iterator(); r.hasNext();) {
                var s = r.next();
                if (!s.isMarked()) {
                    if (null === n && (n = s), null !== i) {
                        var o = i.getSym();
                        o.setNext(s)
                    }
                    i = s
                }
            }
            if (null !== i) {
                var o = i.getSym();
                o.setNext(n)
            }
        }, Hr.computeNextCCWEdges = function(t, e) {
            for (var n = t.getOutEdges(), i = null, r = null, s = n.getEdges(), o = s.size() - 1; o >= 0; o--) {
                var a = s.get(o),
                    u = a.getSym(),
                    l = null;
                a.getLabel() === e && (l = a);
                var h = null;
                u.getLabel() === e && (h = u), null === l && null === h || (null !== h && (r = h), null !== l && (null !== r && (r.setNext(l), r = null), null === i && (i = l)))
            }
            null !== r && (f.isTrue(null !== i), r.setNext(i))
        }, Hr.getDegree = function(t, e) {
            for (var n = t.getOutEdges().getEdges(), i = 0, r = n.iterator(); r.hasNext();) {
                r.next().getLabel() === e && i++
            }
            return i
        }, Hr.findIntersectionNodes = function(t, e) {
            var n = t,
                i = null;
            do {
                var r = n.getFromNode();
                Hr.getDegree(r, e) > 1 && (null === i && (i = new I), i.add(r)), n = n.getNext(), f.isTrue(null !== n, "found null DE in ring"), f.isTrue(n === t || !n.isInRing(), "found DE already in ring")
            } while (n !== t);
            return i
        }, e(jr.prototype, {
            getGeometry: function() {
                return null === this.geomFactory && (this.geomFactory = new ne), this.polygonize(), this.extractOnlyPolygonal ? this.geomFactory.buildGeometry(this.polyList) : this.geomFactory.createGeometryCollection(ne.toGeometryArray(this.polyList))
            },
            getInvalidRingLines: function() {
                return this.polygonize(), this.invalidRingLines
            },
            findValidRings: function(t, e, n) {
                for (var i = t.iterator(); i.hasNext();) {
                    var r = i.next();
                    r.isValid() ? e.add(r) : n.add(r.getLineString())
                }
            },
            polygonize: function() {
                if (null !== this.polyList) return null;
                if (this.polyList = new I, null === this.graph) return null;
                this.dangles = this.graph.deleteDangles(), this.cutEdges = this.graph.deleteCutEdges();
                var t = this.graph.getEdgeRings(),
                    e = new I;
                this.invalidRingLines = new I, this.isCheckingRingsValid ? this.findValidRings(t, e, this.invalidRingLines) : e = t, this.findShellsAndHoles(e), jr.assignHolesToShells(this.holeList, this.shellList), uo.sort(this.shellList, new Yr.EnvelopeComparator);
                var n = !0;
                this.extractOnlyPolygonal && (jr.findDisjointShells(this.shellList), n = !1), this.polyList = jr.extractPolygons(this.shellList, n)
            },
            getDangles: function() {
                return this.polygonize(), this.dangles
            },
            getCutEdges: function() {
                return this.polygonize(), this.cutEdges
            },
            getPolygons: function() {
                return this.polygonize(), this.polyList
            },
            add: function() {
                if (w(arguments[0], m))
                    for (var t = arguments[0], e = t.iterator(); e.hasNext();) {
                        var n = e.next();
                        this.add(n)
                    } else if (arguments[0] instanceof Lt) {
                        var i = arguments[0];
                        this.geomFactory = i.getFactory(), null === this.graph && (this.graph = new Hr(this.geomFactory)), this.graph.addEdge(i)
                    } else if (arguments[0] instanceof B) {
                    var r = arguments[0];
                    r.apply(this.lineStringAdder)
                }
            },
            setCheckRingsValid: function(t) {
                this.isCheckingRingsValid = t
            },
            findShellsAndHoles: function(t) {
                this.holeList = new I, this.shellList = new I;
                for (var e = t.iterator(); e.hasNext();) {
                    var n = e.next();
                    n.computeHole(), n.isHole() ? this.holeList.add(n) : this.shellList.add(n)
                }
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return jr
            }
        }), jr.findOuterShells = function(t) {
            for (var e = t.iterator(); e.hasNext();) {
                var n = e.next(),
                    i = n.getOuterHole();
                null === i || i.isProcessed() || (n.setIncluded(!0), i.setProcessed(!0))
            }
        }, jr.extractPolygons = function(t, e) {
            for (var n = new I, i = t.iterator(); i.hasNext();) {
                var r = i.next();
                (e || r.isIncluded()) && n.add(r.getPolygon())
            }
            return n
        }, jr.assignHolesToShells = function(t, e) {
            for (var n = t.iterator(); n.hasNext();) {
                var i = n.next();
                jr.assignHoleToShell(i, e)
            }
        }, jr.assignHoleToShell = function(t, e) {
            var n = Yr.findEdgeRingContaining(t, e);
            null !== n && n.addHole(t)
        }, jr.findDisjointShells = function(t) {
            jr.findOuterShells(t);
            var e = null;
            do {
                e = !1;
                for (var n = t.iterator(); n.hasNext();) {
                    var i = n.next();
                    i.isIncludedSet() || (i.updateIncluded(), i.isIncludedSet() || (e = !0))
                }
            } while (e)
        }, e(Wr.prototype, {
            filter: function(t) {
                t instanceof Lt && this.p.add(t)
            },
            interfaces_: function() {
                return [G]
            },
            getClass: function() {
                return Wr
            }
        }), jr.LineStringAdder = Wr;
        var So = Object.freeze({
            Polygonizer: jr
        });
        e(Kr.prototype, {
            insertEdgeEnds: function(t) {
                for (var e = t.iterator(); e.hasNext();) {
                    var n = e.next();
                    this.nodes.add(n)
                }
            },
            computeProperIntersectionIM: function(t, e) {
                var n = this.arg[0].getGeometry().getDimension(),
                    i = this.arg[1].getGeometry().getDimension(),
                    r = t.hasProperIntersection(),
                    s = t.hasProperInteriorIntersection();
                2 === n && 2 === i ? r && e.setAtLeast("212101212") : 2 === n && 1 === i ? (r && e.setAtLeast("FFF0FFFF2"), s && e.setAtLeast("1FFFFF1FF")) : 1 === n && 2 === i ? (r && e.setAtLeast("F0FFFFFF2"), s && e.setAtLeast("1F1FFFFFF")) : 1 === n && 1 === i && s && e.setAtLeast("0FFFFFFFF")
            },
            labelIsolatedEdges: function(t, e) {
                for (var n = this.arg[t].getEdgeIterator(); n.hasNext();) {
                    var i = n.next();
                    i.isIsolated() && (this.labelIsolatedEdge(i, e, this.arg[e].getGeometry()), this.isolatedEdges.add(i))
                }
            },
            labelIsolatedEdge: function(t, e, n) {
                if (n.getDimension() > 0) {
                    var i = this.ptLocator.locate(t.getCoordinate(), n);
                    t.getLabel().setAllLocations(e, i)
                } else t.getLabel().setAllLocations(e, S.EXTERIOR)
            },
            computeIM: function() {
                var t = new ce;
                if (t.set(S.EXTERIOR, S.EXTERIOR, 2), !this.arg[0].getGeometry().getEnvelopeInternal().intersects(this.arg[1].getGeometry().getEnvelopeInternal())) return this.computeDisjointIM(t), t;
                this.arg[0].computeSelfNodes(this.li, !1), this.arg[1].computeSelfNodes(this.li, !1);
                var e = this.arg[0].computeEdgeIntersections(this.arg[1], this.li, !1);
                this.computeIntersectionNodes(0), this.computeIntersectionNodes(1), this.copyNodesAndLabels(0), this.copyNodesAndLabels(1), this.labelIsolatedNodes(), this.computeProperIntersectionIM(e, t);
                var n = new Dr,
                    i = n.computeEdgeEnds(this.arg[0].getEdgeIterator());
                this.insertEdgeEnds(i);
                var r = n.computeEdgeEnds(this.arg[1].getEdgeIterator());
                return this.insertEdgeEnds(r), this.labelNodeEdges(), this.labelIsolatedEdges(0, 1), this.labelIsolatedEdges(1, 0), this.updateIM(t), t
            },
            labelNodeEdges: function() {
                for (var t = this.nodes.iterator(); t.hasNext();) {
                    t.next().getEdges().computeLabelling(this.arg)
                }
            },
            copyNodesAndLabels: function(t) {
                for (var e = this.arg[t].getNodeIterator(); e.hasNext();) {
                    var n = e.next();
                    this.nodes.addNode(n.getCoordinate()).setLabel(t, n.getLabel().getLocation(t))
                }
            },
            labelIntersectionNodes: function(t) {
                for (var e = this.arg[t].getEdgeIterator(); e.hasNext();)
                    for (var n = e.next(), i = n.getLabel().getLocation(t), r = n.getEdgeIntersectionList().iterator(); r.hasNext();) {
                        var s = r.next(),
                            o = this.nodes.find(s.coord);
                        o.getLabel().isNull(t) && (i === S.BOUNDARY ? o.setLabelBoundary(t) : o.setLabel(t, S.INTERIOR))
                    }
            },
            labelIsolatedNode: function(t, e) {
                var n = this.ptLocator.locate(t.getCoordinate(), this.arg[e].getGeometry());
                t.getLabel().setAllLocations(e, n)
            },
            computeIntersectionNodes: function(t) {
                for (var e = this.arg[t].getEdgeIterator(); e.hasNext();)
                    for (var n = e.next(), i = n.getLabel().getLocation(t), r = n.getEdgeIntersectionList().iterator(); r.hasNext();) {
                        var s = r.next(),
                            o = this.nodes.addNode(s.coord);
                        i === S.BOUNDARY ? o.setLabelBoundary(t) : o.getLabel().isNull(t) && o.setLabel(t, S.INTERIOR)
                    }
            },
            labelIsolatedNodes: function() {
                for (var t = this.nodes.iterator(); t.hasNext();) {
                    var e = t.next(),
                        n = e.getLabel();
                    f.isTrue(n.getGeometryCount() > 0, "node with empty label found"), e.isIsolated() && (n.isNull(0) ? this.labelIsolatedNode(e, 0) : this.labelIsolatedNode(e, 1))
                }
            },
            updateIM: function(t) {
                for (var e = this.isolatedEdges.iterator(); e.hasNext();) {
                    e.next().updateIM(t)
                }
                for (var n = this.nodes.iterator(); n.hasNext();) {
                    var i = n.next();
                    i.updateIM(t), i.updateIMFromEdges(t)
                }
            },
            computeDisjointIM: function(t) {
                var e = this.arg[0].getGeometry();
                e.isEmpty() || (t.set(S.INTERIOR, S.EXTERIOR, e.getDimension()), t.set(S.BOUNDARY, S.EXTERIOR, e.getBoundaryDimension()));
                var n = this.arg[1].getGeometry();
                n.isEmpty() || (t.set(S.EXTERIOR, S.INTERIOR, n.getDimension()), t.set(S.EXTERIOR, S.BOUNDARY, n.getBoundaryDimension()))
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Kr
            }
        }), e(Jr.prototype, {
            isContainedInBoundary: function(t) {
                if (t instanceof bt) return !1;
                if (t instanceof St) return this.isPointContainedInBoundary(t);
                if (t instanceof Lt) return this.isLineStringContainedInBoundary(t);
                for (var e = 0; e < t.getNumGeometries(); e++) {
                    var n = t.getGeometryN(e);
                    if (!this.isContainedInBoundary(n)) return !1
                }
                return !0
            },
            isLineSegmentContainedInBoundary: function(t, e) {
                if (t.equals(e)) return this.isPointContainedInBoundary(t);
                if (t.x === e.x) {
                    if (t.x === this.rectEnv.getMinX() || t.x === this.rectEnv.getMaxX()) return !0
                } else if (t.y === e.y && (t.y === this.rectEnv.getMinY() || t.y === this.rectEnv.getMaxY())) return !0;
                return !1
            },
            isLineStringContainedInBoundary: function(t) {
                for (var e = t.getCoordinateSequence(), n = new g, i = new g, r = 0; r < e.size() - 1; r++)
                    if (e.getCoordinate(r, n), e.getCoordinate(r + 1, i), !this.isLineSegmentContainedInBoundary(n, i)) return !1;
                return !0
            },
            isPointContainedInBoundary: function() {
                if (arguments[0] instanceof St) {
                    var t = arguments[0];
                    return this.isPointContainedInBoundary(t.getCoordinate())
                }
                if (arguments[0] instanceof g) {
                    var e = arguments[0];
                    return e.x === this.rectEnv.getMinX() || e.x === this.rectEnv.getMaxX() || e.y === this.rectEnv.getMinY() || e.y === this.rectEnv.getMaxY()
                }
            },
            contains: function(t) {
                return !!this.rectEnv.contains(t.getEnvelopeInternal()) && !this.isContainedInBoundary(t)
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Jr
            }
        }), Jr.contains = function(t, e) {
            return new Jr(t).contains(e)
        }, e(Zr.prototype, {
            intersects: function(t, e) {
                var n = new C(t, e);
                if (!this.rectEnv.intersects(n)) return !1;
                if (this.rectEnv.intersects(t)) return !0;
                if (this.rectEnv.intersects(e)) return !0;
                if (t.compareTo(e) > 0) {
                    var i = t;
                    t = e, e = i
                }
                var r = !1;
                return e.y > t.y && (r = !0), r ? this.li.computeIntersection(t, e, this.diagDown0, this.diagDown1) : this.li.computeIntersection(t, e, this.diagUp0, this.diagUp1), !!this.li.hasIntersection()
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Zr
            }
        }), e(Qr.prototype, {
            applyTo: function(t) {
                for (var e = 0; e < t.getNumGeometries() && !this._isDone; e++) {
                    var n = t.getGeometryN(e);
                    if (n instanceof ft) this.applyTo(n);
                    else if (this.visit(n), this.isDone()) return this._isDone = !0, null
                }
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Qr
            }
        }), e($r.prototype, {
            intersects: function(t) {
                if (!this.rectEnv.intersects(t.getEnvelopeInternal())) return !1;
                var e = new ts(this.rectEnv);
                if (e.applyTo(t), e.intersects()) return !0;
                var n = new es(this.rectangle);
                if (n.applyTo(t), n.containsPoint()) return !0;
                var i = new ns(this.rectangle);
                return i.applyTo(t), !!i.intersects()
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return $r
            }
        }), $r.intersects = function(t, e) {
            return new $r(t).intersects(e)
        }, h(ts, Qr), e(ts.prototype, {
            isDone: function() {
                return !0 === this._intersects
            },
            visit: function(t) {
                var e = t.getEnvelopeInternal();
                return this.rectEnv.intersects(e) ? this.rectEnv.contains(e) ? (this._intersects = !0, null) : e.getMinX() >= this.rectEnv.getMinX() && e.getMaxX() <= this.rectEnv.getMaxX() ? (this._intersects = !0, null) : e.getMinY() >= this.rectEnv.getMinY() && e.getMaxY() <= this.rectEnv.getMaxY() ? (this._intersects = !0, null) : void 0 : null
            },
            intersects: function() {
                return this._intersects
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return ts
            }
        }), h(es, Qr), e(es.prototype, {
            isDone: function() {
                return !0 === this._containsPoint
            },
            visit: function(t) {
                if (!(t instanceof bt)) return null;
                var e = t.getEnvelopeInternal();
                if (!this.rectEnv.intersects(e)) return null;
                for (var n = new g, i = 0; i < 4; i++)
                    if (this.rectSeq.getCoordinate(i, n), e.contains(n) && wn.containsPointInPolygon(n, t)) return this._containsPoint = !0, null
            },
            containsPoint: function() {
                return this._containsPoint
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return es
            }
        }), h(ns, Qr), e(ns.prototype, {
            intersects: function() {
                return this.hasIntersection
            },
            isDone: function() {
                return !0 === this.hasIntersection
            },
            visit: function(t) {
                var e = t.getEnvelopeInternal();
                if (!this.rectEnv.intersects(e)) return null;
                var n = zn.getLines(t);
                this.checkIntersectionWithLineStrings(n)
            },
            checkIntersectionWithLineStrings: function(t) {
                for (var e = t.iterator(); e.hasNext();) {
                    var n = e.next();
                    if (this.checkIntersectionWithSegments(n), this.hasIntersection) return null
                }
            },
            checkIntersectionWithSegments: function(t) {
                for (var e = t.getCoordinateSequence(), n = 1; n < e.size(); n++)
                    if (e.getCoordinate(n - 1, this.p0), e.getCoordinate(n, this.p1), this.rectIntersector.intersects(this.p0, this.p1)) return this.hasIntersection = !0, null
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return ns
            }
        }), h(is, $n), e(is.prototype, {
            getIntersectionMatrix: function() {
                return this._relate.computeIM()
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return is
            }
        }), is.covers = function(t, e) {
            return !!t.getEnvelopeInternal().covers(e.getEnvelopeInternal()) && (!!t.isRectangle() || is.relate(t, e).isCovers())
        }, is.intersects = function(t, e) {
            return !!t.getEnvelopeInternal().intersects(e.getEnvelopeInternal()) && (t.isRectangle() ? $r.intersects(t, e) : e.isRectangle() ? $r.intersects(e, t) : is.relate(t, e).isIntersects())
        }, is.touches = function(t, e) {
            return !!t.getEnvelopeInternal().intersects(e.getEnvelopeInternal()) && is.relate(t, e).isTouches(t.getDimension(), e.getDimension())
        }, is.within = function(t, e) {
            return e.contains(t)
        }, is.coveredBy = function(t, e) {
            return is.covers(e, t)
        }, is.relate = function() {
            if (2 === arguments.length) {
                var t = arguments[0],
                    e = arguments[1],
                    n = new is(t, e),
                    i = n.getIntersectionMatrix();
                return i
            }
            if (3 === arguments.length) {
                if ("string" == typeof arguments[2] && arguments[0] instanceof B && arguments[1] instanceof B) {
                    var r = arguments[0],
                        s = arguments[1],
                        o = arguments[2];
                    return is.relateWithCheck(r, s).matches(o)
                }
                if (w(arguments[2], z) && arguments[0] instanceof B && arguments[1] instanceof B) {
                    var a = arguments[0],
                        u = arguments[1],
                        l = arguments[2],
                        n = new is(a, u, l),
                        i = n.getIntersectionMatrix();
                    return i
                }
            }
        }, is.overlaps = function(t, e) {
            return !!t.getEnvelopeInternal().intersects(e.getEnvelopeInternal()) && is.relate(t, e).isOverlaps(t.getDimension(), e.getDimension())
        }, is.disjoint = function(t, e) {
            return !t.intersects(e)
        }, is.relateWithCheck = function(t, e) {
            return t.checkNotGeometryCollection(t), t.checkNotGeometryCollection(e), is.relate(t, e)
        }, is.crosses = function(t, e) {
            return !!t.getEnvelopeInternal().intersects(e.getEnvelopeInternal()) && is.relate(t, e).isCrosses(t.getDimension(), e.getDimension())
        }, is.contains = function(t, e) {
            return !!t.getEnvelopeInternal().contains(e.getEnvelopeInternal()) && (t.isRectangle() ? Jr.contains(t, e) : is.relate(t, e).isContains())
        };
        var wo = Object.freeze({
            RelateOp: is
        });
        e(rs.prototype, {
            extractElements: function(t, e) {
                if (null === t) return null;
                for (var n = 0; n < t.getNumGeometries(); n++) {
                    var i = t.getGeometryN(n);
                    this.skipEmpty && i.isEmpty() || e.add(i)
                }
            },
            combine: function() {
                for (var t = new I, e = this.inputGeoms.iterator(); e.hasNext();) {
                    var n = e.next();
                    this.extractElements(n, t)
                }
                return 0 === t.size() ? null !== this.geomFactory ? this.geomFactory.createGeometryCollection(null) : null : this.geomFactory.buildGeometry(t)
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return rs
            }
        }), rs.combine = function() {
            if (1 === arguments.length) {
                var t = arguments[0],
                    e = new rs(t);
                return e.combine()
            }
            if (2 === arguments.length) {
                var n = arguments[0],
                    i = arguments[1],
                    e = new rs(rs.createList(n, i));
                return e.combine()
            }
            if (3 === arguments.length) {
                var r = arguments[0],
                    s = arguments[1],
                    o = arguments[2],
                    e = new rs(rs.createList(r, s, o));
                return e.combine()
            }
        }, rs.extractFactory = function(t) {
            return t.isEmpty() ? null : t.iterator().next().getFactory()
        }, rs.createList = function() {
            if (2 === arguments.length) {
                var t = arguments[0],
                    e = arguments[1],
                    n = new I;
                return n.add(t), n.add(e), n
            }
            if (3 === arguments.length) {
                var i = arguments[0],
                    r = arguments[1],
                    s = arguments[2],
                    n = new I;
                return n.add(i), n.add(r), n.add(s), n
            }
        }, e(ss.prototype, {
            union: function() {
                for (var t = new we, e = new at, n = 0; n < this.pointGeom.getNumGeometries(); n++) {
                    var i = this.pointGeom.getGeometryN(n),
                        r = i.getCoordinate();
                    t.locate(r, this.otherGeom) === S.EXTERIOR && e.add(r)
                }
                if (0 === e.size()) return this.otherGeom;
                var s = null,
                    o = H.toCoordinateArray(e);
                return s = 1 === o.length ? this.geomFact.createPoint(o[0]) : this.geomFact.createMultiPointFromCoords(o), rs.combine(s, this.otherGeom)
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return ss
            }
        }), ss.union = function(t, e) {
            return new ss(t, e).union()
        }, e(os.prototype, {
            filter: function(t) {
                -1 !== this.sortIndex && t.getSortIndex() !== this.sortIndex || this.comps.add(t)
            },
            interfaces_: function() {
                return [ht]
            },
            getClass: function() {
                return os
            }
        }), os.extract = function() {
            if (2 === arguments.length) {
                var t = arguments[0],
                    e = arguments[1];
                return os.extract(t, e, new I)
            }
            if (3 === arguments.length) {
                var n = arguments[0],
                    i = arguments[1],
                    r = arguments[2];
                return n.getSortIndex() === i ? r.add(n) : n instanceof ft && n.apply(new os(i, r)), r
            }
        }, e(as.prototype, {
            reduceToGeometries: function(t) {
                for (var e = new I, n = t.iterator(); n.hasNext();) {
                    var i = n.next(),
                        r = null;
                    w(i, y) ? r = this.unionTree(i) : i instanceof B && (r = i), e.add(r)
                }
                return e
            },
            extractByEnvelope: function(t, e, n) {
                for (var i = new I, r = 0; r < e.getNumGeometries(); r++) {
                    var s = e.getGeometryN(r);
                    s.getEnvelopeInternal().intersects(t) ? i.add(s) : n.add(s)
                }
                return this.geomFactory.buildGeometry(i)
            },
            unionOptimized: function(t, e) {
                var n = t.getEnvelopeInternal(),
                    i = e.getEnvelopeInternal();
                if (!n.intersects(i)) {
                    return rs.combine(t, e)
                }
                if (t.getNumGeometries() <= 1 && e.getNumGeometries() <= 1) return this.unionActual(t, e);
                var r = n.intersection(i);
                return this.unionUsingEnvelopeIntersection(t, e, r)
            },
            union: function() {
                if (null === this.inputPolys) throw new IllegalStateException("union() method cannot be called twice");
                if (this.inputPolys.isEmpty()) return null;
                this.geomFactory = this.inputPolys.iterator().next().getFactory();
                for (var t = new ze(as.STRTREE_NODE_CAPACITY), e = this.inputPolys.iterator(); e.hasNext();) {
                    var n = e.next();
                    t.insert(n.getEnvelopeInternal(), n)
                }
                this.inputPolys = null;
                var i = t.itemsTree();
                return this.unionTree(i)
            },
            binaryUnion: function() {
                if (1 === arguments.length) {
                    var t = arguments[0];
                    return this.binaryUnion(t, 0, t.size())
                }
                if (3 === arguments.length) {
                    var e = arguments[0],
                        n = arguments[1],
                        i = arguments[2];
                    if (i - n <= 1) {
                        var r = as.getGeometry(e, n);
                        return this.unionSafe(r, null)
                    }
                    if (i - n == 2) return this.unionSafe(as.getGeometry(e, n), as.getGeometry(e, n + 1));
                    var s = Math.trunc((i + n) / 2),
                        r = this.binaryUnion(e, n, s),
                        o = this.binaryUnion(e, s, i);
                    return this.unionSafe(r, o)
                }
            },
            repeatedUnion: function(t) {
                for (var e = null, n = t.iterator(); n.hasNext();) {
                    var i = n.next();
                    e = null === e ? i.copy() : e.union(i)
                }
                return e
            },
            unionSafe: function(t, e) {
                return null === t && null === e ? null : null === t ? e.copy() : null === e ? t.copy() : this.unionOptimized(t, e)
            },
            unionActual: function(t, e) {
                return as.restrictToPolygons(t.union(e))
            },
            unionTree: function(t) {
                var e = this.reduceToGeometries(t);
                return this.binaryUnion(e)
            },
            unionUsingEnvelopeIntersection: function(t, e, n) {
                var i = new I,
                    r = this.extractByEnvelope(n, t, i),
                    s = this.extractByEnvelope(n, e, i),
                    o = this.unionActual(r, s);
                return i.add(o), rs.combine(i)
            },
            bufferUnion: function() {
                if (1 === arguments.length) {
                    var t = arguments[0],
                        e = t.get(0).getFactory(),
                        n = e.buildGeometry(t),
                        i = n.buffer(0);
                    return i
                }
                if (2 === arguments.length) {
                    var r = arguments[0],
                        s = arguments[1],
                        e = r.getFactory(),
                        n = e.createGeometryCollection([r, s]),
                        i = n.buffer(0);
                    return i
                }
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return as
            }
        }), as.restrictToPolygons = function(t) {
            if (w(t, wt)) return t;
            var e = dr.getPolygons(t);
            return 1 === e.size() ? e.get(0) : t.getFactory().createMultiPolygon(ne.toPolygonArray(e))
        }, as.getGeometry = function(t, e) {
            return e >= t.size() ? null : t.get(e)
        }, as.union = function(t) {
            return new as(t).union()
        }, as.STRTREE_NODE_CAPACITY = 4, e(us.prototype, {
            unionNoOpt: function(t) {
                var e = this.geomFact.createPoint();
                return ri.overlayOp(t, e, ni.UNION)
            },
            unionWithNull: function(t, e) {
                return null === t && null === e ? null : null === e ? t : null === t ? e : t.union(e)
            },
            extract: function() {
                if (w(arguments[0], m))
                    for (var t = arguments[0], e = t.iterator(); e.hasNext();) {
                        var n = e.next();
                        this.extract(n)
                    } else if (arguments[0] instanceof B) {
                        var i = arguments[0];
                        null === this.geomFact && (this.geomFact = i.getFactory()), os.extract(i, B.SORTINDEX_POLYGON, this.polygons), os.extract(i, B.SORTINDEX_LINESTRING, this.lines), os.extract(i, B.SORTINDEX_POINT, this.points)
                    }
            },
            union: function() {
                if (null === this.geomFact) return null;
                var t = null;
                if (this.points.size() > 0) {
                    var e = this.geomFact.buildGeometry(this.points);
                    t = this.unionNoOpt(e)
                }
                var n = null;
                if (this.lines.size() > 0) {
                    var i = this.geomFact.buildGeometry(this.lines);
                    n = this.unionNoOpt(i)
                }
                var r = null;
                this.polygons.size() > 0 && (r = as.union(this.polygons));
                var s = this.unionWithNull(n, r),
                    o = null;
                return o = null === t ? s : null === s ? t : ss.union(t, s), null === o ? this.geomFact.createGeometryCollection() : o
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return us
            }
        }), us.union = function() {
            if (1 === arguments.length) {
                if (w(arguments[0], m)) {
                    var t = arguments[0],
                        e = new us(t);
                    return e.union()
                }
                if (arguments[0] instanceof B) {
                    var n = arguments[0],
                        e = new us(n);
                    return e.union()
                }
            } else if (2 === arguments.length) {
                var i = arguments[0],
                    r = arguments[1],
                    e = new us(i, r);
                return e.union()
            }
        };
        var bo = Object.freeze({
                UnaryUnionOp: us
            }),
            Ro = Object.freeze({
                IsValidOp: Ur,
                ConsistentAreaTester: qr
            }),
            Mo = Object.freeze({
                BoundaryOp: dt,
                IsSimpleOp: Hi,
                buffer: No,
                distance: Co,
                linemerge: Lo,
                overlay: _o,
                polygonize: So,
                relate: wo,
                union: bo,
                valid: Ro
            });
        h(ls, Pt.CoordinateOperation), e(ls.prototype, {
            editCoordinates: function(t, e) {
                if (0 === t.length) return null;
                for (var n = new Array(t.length).fill(null), i = 0; i < t.length; i++) {
                    var r = new g(t[i]);
                    this.targetPM.makePrecise(r), n[i] = r
                }
                var s = new N(n, !1),
                    o = s.toCoordinateArray(),
                    a = 0;
                e instanceof Lt && (a = 2), e instanceof Mt && (a = 4);
                var u = n;
                return this.removeCollapsed && (u = null), o.length < a ? u : o
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return ls
            }
        }), e(hs.prototype, {
            fixPolygonalTopology: function(t) {
                var e = t;
                this.changePrecisionModel || (e = this.changePM(t, this.targetPM));
                var n = e.buffer(0),
                    i = n;
                return this.changePrecisionModel || (i = this.changePM(n, t.getPrecisionModel())), i
            },
            reducePointwise: function(t) {
                var e = null;
                if (this.changePrecisionModel) {
                    e = new Pt(this.createFactory(t.getFactory(), this.targetPM))
                } else e = new Pt;
                var n = this.removeCollapsed;
                return t.getDimension() >= 2 && (n = !0), e.edit(t, new ls(this.targetPM, n))
            },
            changePM: function(t, e) {
                return this.createEditor(t.getFactory(), e).edit(t, new Pt.NoOpGeometryOperation)
            },
            setRemoveCollapsedComponents: function(t) {
                this.removeCollapsed = t
            },
            createFactory: function(t, e) {
                return new ne(e, t.getSRID(), t.getCoordinateSequenceFactory())
            },
            setChangePrecisionModel: function(t) {
                this.changePrecisionModel = t
            },
            reduce: function(t) {
                var e = this.reducePointwise(t);
                return this.isPointwise ? e : w(e, wt) ? e.isValid() ? e : this.fixPolygonalTopology(e) : e
            },
            setPointwise: function(t) {
                this.isPointwise = t
            },
            createEditor: function(t, e) {
                return t.getPrecisionModel() === e ? new Pt : new Pt(this.createFactory(t, e))
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return hs
            }
        }), hs.reduce = function(t, e) {
            return new hs(e).reduce(t)
        }, hs.reducePointwise = function(t, e) {
            var n = new hs(e);
            return n.setPointwise(!0), n.reduce(t)
        };
        var To = Object.freeze({
            GeometryPrecisionReducer: hs
        });
        e(cs.prototype, {
            simplifySection: function(t, e) {
                if (t + 1 === e) return null;
                this.seg.p0 = this.pts[t], this.seg.p1 = this.pts[e];
                for (var n = -1, i = t, r = t + 1; r < e; r++) {
                    var s = this.seg.distance(this.pts[r]);
                    s > n && (n = s, i = r)
                }
                if (n <= this.distanceTolerance)
                    for (var r = t + 1; r < e; r++) this.usePt[r] = !1;
                else this.simplifySection(t, i), this.simplifySection(i, e)
            },
            setDistanceTolerance: function(t) {
                this.distanceTolerance = t
            },
            simplify: function() {
                this.usePt = new Array(this.pts.length).fill(null);
                for (var t = 0; t < this.pts.length; t++) this.usePt[t] = !0;
                this.simplifySection(0, this.pts.length - 1);
                for (var e = new N, t = 0; t < this.pts.length; t++) this.usePt[t] && e.add(new g(this.pts[t]));
                return e.toCoordinateArray()
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return cs
            }
        }), cs.simplify = function(t, e) {
            var n = new cs(t);
            return n.setDistanceTolerance(e), n.simplify()
        }, e(fs.prototype, {
            setEnsureValid: function(t) {
                this.isEnsureValidTopology = t
            },
            getResultGeometry: function() {
                return this.inputGeom.isEmpty() ? this.inputGeom.copy() : new gs(this.isEnsureValidTopology, this.distanceTolerance).transform(this.inputGeom)
            },
            setDistanceTolerance: function(t) {
                if (t < 0) throw new i("Tolerance must be non-negative");
                this.distanceTolerance = t
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return fs
            }
        }), fs.simplify = function(t, e) {
            var n = new fs(t);
            return n.setDistanceTolerance(e), n.getResultGeometry()
        }, h(gs, ye), e(gs.prototype, {
            transformPolygon: function(t, e) {
                if (t.isEmpty()) return null;
                var n = ye.prototype.transformPolygon.call(this, t, e);
                return e instanceof Tt ? n : this.createValidArea(n)
            },
            createValidArea: function(t) {
                return this.isEnsureValidTopology ? t.buffer(0) : t
            },
            transformCoordinates: function(t, e) {
                var n = t.toCoordinateArray(),
                    i = null;
                return i = 0 === n.length ? new Array(0).fill(null) : cs.simplify(n, this.distanceTolerance), this.factory.getCoordinateSequenceFactory().create(i)
            },
            transformMultiPolygon: function(t, e) {
                var n = ye.prototype.transformMultiPolygon.call(this, t, e);
                return this.createValidArea(n)
            },
            transformLinearRing: function(t, e) {
                var n = e instanceof bt,
                    i = ye.prototype.transformLinearRing.call(this, t, e);
                return !n || i instanceof Mt ? i : null
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return gs
            }
        }), fs.DPTransformer = gs, h(ds, he), e(ds.prototype, {
            getIndex: function() {
                return this.index
            },
            getParent: function() {
                return this.parent
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return ds
            }
        }), e(ps.prototype, {
            addToResult: function(t) {
                this.resultSegs.add(t)
            },
            asLineString: function() {
                return this.parentLine.getFactory().createLineString(ps.extractCoordinates(this.resultSegs))
            },
            getResultSize: function() {
                var t = this.resultSegs.size();
                return 0 === t ? 0 : t + 1
            },
            getParent: function() {
                return this.parentLine
            },
            getSegment: function(t) {
                return this.segs[t]
            },
            getParentCoordinates: function() {
                return this.parentLine.getCoordinates()
            },
            getMinimumSize: function() {
                return this.minimumSize
            },
            asLinearRing: function() {
                return this.parentLine.getFactory().createLinearRing(ps.extractCoordinates(this.resultSegs))
            },
            getSegments: function() {
                return this.segs
            },
            init: function() {
                var t = this.parentLine.getCoordinates();
                this.segs = new Array(t.length - 1).fill(null);
                for (var e = 0; e < t.length - 1; e++) {
                    var n = new ds(t[e], t[e + 1], this.parentLine, e);
                    this.segs[e] = n
                }
            },
            getResultCoordinates: function() {
                return ps.extractCoordinates(this.resultSegs)
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return ps
            }
        }), ps.extractCoordinates = function(t) {
            for (var e = new Array(t.size() + 1).fill(null), n = null, i = 0; i < t.size(); i++) n = t.get(i), e[i] = n.p0;
            return e[e.length - 1] = n.p1, e
        }, e(ms.prototype, {
            remove: function(t) {
                this.index.remove(new C(t.p0, t.p1), t)
            },
            add: function() {
                if (arguments[0] instanceof ps)
                    for (var t = arguments[0], e = t.getSegments(), n = 0; n < e.length; n++) {
                        var i = e[n];
                        this.add(i)
                    } else if (arguments[0] instanceof he) {
                        var r = arguments[0];
                        this.index.insert(new C(r.p0, r.p1), r)
                    }
            },
            query: function(t) {
                var e = new C(t.p0, t.p1),
                    n = new vs(t);
                return this.index.query(e, n), n.getItems()
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return ms
            }
        }), e(vs.prototype, {
            visitItem: function(t) {
                var e = t;
                C.intersects(e.p0, e.p1, this.querySeg.p0, this.querySeg.p1) && this.items.add(t)
            },
            getItems: function() {
                return this.items
            },
            interfaces_: function() {
                return [De]
            },
            getClass: function() {
                return vs
            }
        }), e(ys.prototype, {
            flatten: function(t, e) {
                var n = this.linePts[t],
                    i = this.linePts[e],
                    r = new he(n, i);
                return this.remove(this.line, t, e), this.outputIndex.add(r), r
            },
            hasBadIntersection: function(t, e, n) {
                return !!this.hasBadOutputIntersection(n) || !!this.hasBadInputIntersection(t, e, n)
            },
            setDistanceTolerance: function(t) {
                this.distanceTolerance = t
            },
            simplifySection: function(t, e, n) {
                n += 1;
                var i = new Array(2).fill(null);
                if (t + 1 === e) {
                    var r = this.line.getSegment(t);
                    return this.line.addToResult(r), null
                }
                var s = !0;
                if (this.line.getResultSize() < this.line.getMinimumSize()) {
                    n + 1 < this.line.getMinimumSize() && (s = !1)
                }
                var o = new Array(1).fill(null),
                    a = this.findFurthestPoint(this.linePts, t, e, o);
                o[0] > this.distanceTolerance && (s = !1);
                var u = new he;
                if (u.p0 = this.linePts[t], u.p1 = this.linePts[e], i[0] = t, i[1] = e, this.hasBadIntersection(this.line, i, u) && (s = !1), s) {
                    var r = this.flatten(t, e);
                    return this.line.addToResult(r), null
                }
                this.simplifySection(t, a, n), this.simplifySection(a, e, n)
            },
            hasBadOutputIntersection: function(t) {
                for (var e = this.outputIndex.query(t), n = e.iterator(); n.hasNext();) {
                    var i = n.next();
                    if (this.hasInteriorIntersection(i, t)) return !0
                }
                return !1
            },
            findFurthestPoint: function(t, e, n, i) {
                var r = new he;
                r.p0 = t[e], r.p1 = t[n];
                for (var s = -1, o = e, a = e + 1; a < n; a++) {
                    var u = t[a],
                        l = r.distance(u);
                    l > s && (s = l, o = a)
                }
                return i[0] = s, o
            },
            simplify: function(t) {
                this.line = t, this.linePts = t.getParentCoordinates(), this.simplifySection(0, this.linePts.length - 1, 0)
            },
            remove: function(t, e, n) {
                for (var i = e; i < n; i++) {
                    var r = t.getSegment(i);
                    this.inputIndex.remove(r)
                }
            },
            hasInteriorIntersection: function(t, e) {
                return this.li.computeIntersection(t.p0, t.p1, e.p0, e.p1), this.li.isInteriorIntersection()
            },
            hasBadInputIntersection: function(t, e, n) {
                for (var i = this.inputIndex.query(n), r = i.iterator(); r.hasNext();) {
                    var s = r.next();
                    if (this.hasInteriorIntersection(s, n)) {
                        if (ys.isInLineSection(t, e, s)) continue;
                        return !0
                    }
                }
                return !1
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return ys
            }
        }), ys.isInLineSection = function(t, e, n) {
            if (n.getParent() !== t.getParent()) return !1;
            var i = n.getIndex();
            return i >= e[0] && i < e[1]
        }, e(Es.prototype, {
            setDistanceTolerance: function(t) {
                this.distanceTolerance = t
            },
            simplify: function(t) {
                for (var e = t.iterator(); e.hasNext();) this.inputIndex.add(e.next());
                for (var e = t.iterator(); e.hasNext();) {
                    var n = new ys(this.inputIndex, this.outputIndex);
                    n.setDistanceTolerance(this.distanceTolerance), n.simplify(e.next())
                }
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Es
            }
        }), e(xs.prototype, {
            getResultGeometry: function() {
                return this.inputGeom.isEmpty() ? this.inputGeom.copy() : (this.linestringMap = new $t, this.inputGeom.apply(new Ns(this)), this.lineSimplifier.simplify(this.linestringMap.values()), new Is(this.linestringMap).transform(this.inputGeom))
            },
            setDistanceTolerance: function(t) {
                if (t < 0) throw new i("Tolerance must be non-negative");
                this.lineSimplifier.setDistanceTolerance(t)
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return xs
            }
        }), xs.simplify = function(t, e) {
            var n = new xs(t);
            return n.setDistanceTolerance(e), n.getResultGeometry()
        }, h(Is, ye), e(Is.prototype, {
            transformCoordinates: function(t, e) {
                if (0 === t.size()) return null;
                if (e instanceof Lt) {
                    var n = this.linestringMap.get(e);
                    return this.createCoordinateSequence(n.getResultCoordinates())
                }
                return ye.prototype.transformCoordinates.call(this, t, e)
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Is
            }
        }), e(Ns.prototype, {
            filter: function(t) {
                if (t instanceof Lt) {
                    var e = t;
                    if (e.isEmpty()) return null;
                    var n = e.isClosed() ? 4 : 2,
                        i = new ps(e, n);
                    this.tps.linestringMap.put(e, i)
                }
            },
            interfaces_: function() {
                return [G]
            },
            getClass: function() {
                return Ns
            }
        }), xs.LineStringTransformer = Is, xs.LineStringMapBuilderFilter = Ns;
        var Po = Object.freeze({
            DouglasPeuckerSimplifier: fs,
            TopologyPreservingSimplifier: xs
        });
        e(Cs.prototype, {
            splitAt: function() {
                if (1 === arguments.length) {
                    var t = arguments[0],
                        e = this.minimumLen / this.segLen;
                    if (t.distance(this.seg.p0) < this.minimumLen) return this.splitPt = this.seg.pointAlong(e), null;
                    if (t.distance(this.seg.p1) < this.minimumLen) return this.splitPt = Cs.pointAlongReverse(this.seg, e), null;
                    this.splitPt = t
                } else if (2 === arguments.length) {
                    var n = arguments[0],
                        i = arguments[1],
                        r = this.getConstrainedLength(n),
                        s = r / this.segLen;
                    i.equals2D(this.seg.p0) ? this.splitPt = this.seg.pointAlong(s) : this.splitPt = Cs.pointAlongReverse(this.seg, s)
                }
            },
            setMinimumLength: function(t) {
                this.minimumLen = t
            },
            getConstrainedLength: function(t) {
                return t < this.minimumLen ? this.minimumLen : t
            },
            getSplitPoint: function() {
                return this.splitPt
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Cs
            }
        }), Cs.pointAlongReverse = function(t, e) {
            var n = new g;
            return n.x = t.p1.x - e * (t.p1.x - t.p0.x), n.y = t.p1.y - e * (t.p1.y - t.p0.y), n
        }, e(Ls.prototype, {
            findSplitPoint: function(t, e) {},
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Ls
            }
        }), e(_s.prototype, {
            findSplitPoint: function(t, e) {
                var n = t.getLineSegment(),
                    i = n.getLength(),
                    r = i / 2,
                    s = new Cs(n),
                    o = _s.projectedSplitPoint(t, e),
                    a = 2 * o.distance(e) * .8,
                    u = a;
                return u > r && (u = r), s.setMinimumLength(u), s.splitAt(o), s.getSplitPoint()
            },
            interfaces_: function() {
                return [Ls]
            },
            getClass: function() {
                return _s
            }
        }), _s.projectedSplitPoint = function(t, e) {
            return t.getLineSegment().project(e)
        }, e(Ss.prototype, {
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Ss
            }
        }), Ss.triArea = function(t, e, n) {
            return (e.x - t.x) * (n.y - t.y) - (e.y - t.y) * (n.x - t.x)
        }, Ss.isInCircleDDNormalized = function(t, e, n, i) {
            var r = P.valueOf(t.x).selfSubtract(i.x),
                s = P.valueOf(t.y).selfSubtract(i.y),
                o = P.valueOf(e.x).selfSubtract(i.x),
                a = P.valueOf(e.y).selfSubtract(i.y),
                u = P.valueOf(n.x).selfSubtract(i.x),
                l = P.valueOf(n.y).selfSubtract(i.y),
                h = r.multiply(a).selfSubtract(o.multiply(s)),
                c = o.multiply(l).selfSubtract(u.multiply(a)),
                f = u.multiply(s).selfSubtract(r.multiply(l)),
                g = r.multiply(r).selfAdd(s.multiply(s)),
                d = o.multiply(o).selfAdd(a.multiply(a)),
                p = u.multiply(u).selfAdd(l.multiply(l));
            return g.selfMultiply(c).selfAdd(d.selfMultiply(f)).selfAdd(p.selfMultiply(h)).doubleValue() > 0
        }, Ss.checkRobustInCircle = function(t, e, n, i) {
            var r = Ss.isInCircleNonRobust(t, e, n, i),
                s = Ss.isInCircleDDSlow(t, e, n, i),
                o = Ss.isInCircleCC(t, e, n, i),
                a = Ci.circumcentre(t, e, n);
            A.out.println("p radius diff a = " + Math.abs(i.distance(a) - t.distance(a)) / t.distance(a)), r === s && r === o || (A.out.println("inCircle robustness failure (double result = " + r + ", DD result = " + s + ", CC result = " + o + ")"), A.out.println(re.toLineString(new kt([t, e, n, i]))), A.out.println("Circumcentre = " + re.toPoint(a) + " radius = " + t.distance(a)), A.out.println("p radius diff a = " + Math.abs(i.distance(a) / t.distance(a) - 1)), A.out.println("p radius diff b = " + Math.abs(i.distance(a) / e.distance(a) - 1)), A.out.println("p radius diff c = " + Math.abs(i.distance(a) / n.distance(a) - 1)), A.out.println())
        }, Ss.isInCircleDDFast = function(t, e, n, i) {
            var r = P.sqr(t.x).selfAdd(P.sqr(t.y)).selfMultiply(Ss.triAreaDDFast(e, n, i)),
                s = P.sqr(e.x).selfAdd(P.sqr(e.y)).selfMultiply(Ss.triAreaDDFast(t, n, i)),
                o = P.sqr(n.x).selfAdd(P.sqr(n.y)).selfMultiply(Ss.triAreaDDFast(t, e, i)),
                a = P.sqr(i.x).selfAdd(P.sqr(i.y)).selfMultiply(Ss.triAreaDDFast(t, e, n));
            return r.selfSubtract(s).selfAdd(o).selfSubtract(a).doubleValue() > 0
        }, Ss.isInCircleCC = function(t, e, n, i) {
            var r = Ci.circumcentre(t, e, n),
                s = t.distance(r);
            return i.distance(r) - s <= 0
        }, Ss.isInCircleNormalized = function(t, e, n, i) {
            var r = t.x - i.x,
                s = t.y - i.y,
                o = e.x - i.x,
                a = e.y - i.y,
                u = n.x - i.x,
                l = n.y - i.y;
            return (r * r + s * s) * (o * l - u * a) + (o * o + a * a) * (u * s - r * l) + (u * u + l * l) * (r * a - o * s) > 0
        }, Ss.isInCircleDDSlow = function(t, e, n, i) {
            var r = P.valueOf(i.x),
                s = P.valueOf(i.y),
                o = P.valueOf(t.x),
                a = P.valueOf(t.y),
                u = P.valueOf(e.x),
                l = P.valueOf(e.y),
                h = P.valueOf(n.x),
                c = P.valueOf(n.y),
                f = o.multiply(o).add(a.multiply(a)).multiply(Ss.triAreaDDSlow(u, l, h, c, r, s)),
                g = u.multiply(u).add(l.multiply(l)).multiply(Ss.triAreaDDSlow(o, a, h, c, r, s)),
                d = h.multiply(h).add(c.multiply(c)).multiply(Ss.triAreaDDSlow(o, a, u, l, r, s)),
                p = r.multiply(r).add(s.multiply(s)).multiply(Ss.triAreaDDSlow(o, a, u, l, h, c));
            return f.subtract(g).add(d).subtract(p).doubleValue() > 0
        }, Ss.isInCircleNonRobust = function(t, e, n, i) {
            return (t.x * t.x + t.y * t.y) * Ss.triArea(e, n, i) - (e.x * e.x + e.y * e.y) * Ss.triArea(t, n, i) + (n.x * n.x + n.y * n.y) * Ss.triArea(t, e, i) - (i.x * i.x + i.y * i.y) * Ss.triArea(t, e, n) > 0
        }, Ss.isInCircleRobust = function(t, e, n, i) {
            return Ss.isInCircleNormalized(t, e, n, i)
        }, Ss.triAreaDDSlow = function(t, e, n, i, r, s) {
            return n.subtract(t).multiply(s.subtract(e)).subtract(i.subtract(e).multiply(r.subtract(t)))
        }, Ss.triAreaDDFast = function(t, e, n) {
            var i = P.valueOf(e.x).selfSubtract(t.x).selfMultiply(P.valueOf(n.y).selfSubtract(t.y)),
                r = P.valueOf(e.y).selfSubtract(t.y).selfMultiply(P.valueOf(n.x).selfSubtract(t.x));
            return i.selfSubtract(r)
        }, e(ws.prototype, {
            circleCenter: function(t, e) {
                var n = new ws(this.getX(), this.getY()),
                    i = this.bisector(n, t),
                    r = this.bisector(t, e),
                    s = new F(i, r),
                    o = null;
                try {
                    o = new ws(s.getX(), s.getY())
                } catch (i) {
                    if (!(i instanceof _)) throw i;
                    A.err.println("a: " + n + "  b: " + t + "  c: " + e), A.err.println(i)
                }
                return o
            },
            dot: function(t) {
                return this.p.x * t.getX() + this.p.y * t.getY()
            },
            magn: function() {
                return Math.sqrt(this.p.x * this.p.x + this.p.y * this.p.y)
            },
            getZ: function() {
                return this.p.z
            },
            bisector: function(t, e) {
                var n = e.getX() - t.getX(),
                    i = e.getY() - t.getY();
                return new F(new F(t.getX() + n / 2, t.getY() + i / 2, 1), new F(t.getX() - i + n / 2, t.getY() + n + i / 2, 1))
            },
            equals: function() {
                if (1 === arguments.length) {
                    var t = arguments[0];
                    return this.p.x === t.getX() && this.p.y === t.getY()
                }
                if (2 === arguments.length) {
                    var e = arguments[0],
                        n = arguments[1];
                    return this.p.distance(e.getCoordinate()) < n
                }
            },
            getCoordinate: function() {
                return this.p
            },
            isInCircle: function(t, e, n) {
                return Ss.isInCircleRobust(t.p, e.p, n.p, this.p)
            },
            interpolateZValue: function(t, e, n) {
                var i = t.getX(),
                    r = t.getY(),
                    s = e.getX() - i,
                    o = n.getX() - i,
                    a = e.getY() - r,
                    u = n.getY() - r,
                    l = s * u - o * a,
                    h = this.getX() - i,
                    c = this.getY() - r,
                    f = (u * h - o * c) / l,
                    g = (-a * h + s * c) / l;
                return t.getZ() + f * (e.getZ() - t.getZ()) + g * (n.getZ() - t.getZ())
            },
            midPoint: function(t) {
                return new ws((this.p.x + t.getX()) / 2, (this.p.y + t.getY()) / 2, (this.p.z + t.getZ()) / 2)
            },
            rightOf: function(t) {
                return this.isCCW(t.dest(), t.orig())
            },
            isCCW: function(t, e) {
                return (t.p.x - this.p.x) * (e.p.y - this.p.y) - (t.p.y - this.p.y) * (e.p.x - this.p.x) > 0
            },
            getX: function() {
                return this.p.x
            },
            crossProduct: function(t) {
                return this.p.x * t.getY() - this.p.y * t.getX()
            },
            setZ: function(t) {
                this.p.z = t
            },
            times: function(t) {
                return new ws(t * this.p.x, t * this.p.y)
            },
            cross: function() {
                return new ws(this.p.y, -this.p.x)
            },
            leftOf: function(t) {
                return this.isCCW(t.orig(), t.dest())
            },
            toString: function() {
                return "POINT (" + this.p.x + " " + this.p.y + ")"
            },
            sub: function(t) {
                return new ws(this.p.x - t.getX(), this.p.y - t.getY())
            },
            getY: function() {
                return this.p.y
            },
            classify: function(t, e) {
                var n = this,
                    i = e.sub(t),
                    r = n.sub(t),
                    s = i.crossProduct(r);
                return s > 0 ? ws.LEFT : s < 0 ? ws.RIGHT : i.getX() * r.getX() < 0 || i.getY() * r.getY() < 0 ? ws.BEHIND : i.magn() < r.magn() ? ws.BEYOND : t.equals(n) ? ws.ORIGIN : e.equals(n) ? ws.DESTINATION : ws.BETWEEN
            },
            sum: function(t) {
                return new ws(this.p.x + t.getX(), this.p.y + t.getY())
            },
            distance: function(t, e) {
                return Math.sqrt(Math.pow(e.getX() - t.getX(), 2) + Math.pow(e.getY() - t.getY(), 2))
            },
            circumRadiusRatio: function(t, e) {
                var n = this.circleCenter(t, e),
                    i = this.distance(n, t),
                    r = this.distance(this, t),
                    s = this.distance(t, e);
                return s < r && (r = s), s = this.distance(e, this), s < r && (r = s), i / r
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return ws
            }
        }), ws.interpolateZ = function() {
            if (3 === arguments.length) {
                var t = arguments[0],
                    e = arguments[1],
                    n = arguments[2],
                    i = e.distance(n),
                    r = t.distance(e),
                    s = n.z - e.z;
                return e.z + s * (r / i)
            }
            if (4 === arguments.length) {
                var o = arguments[0],
                    a = arguments[1],
                    u = arguments[2],
                    l = arguments[3],
                    h = a.x,
                    c = a.y,
                    f = u.x - h,
                    g = l.x - h,
                    d = u.y - c,
                    p = l.y - c,
                    m = f * p - g * d,
                    v = o.x - h,
                    y = o.y - c,
                    E = (p * v - g * y) / m,
                    x = (-d * v + f * y) / m;
                return a.z + E * (u.z - a.z) + x * (l.z - a.z)
            }
        }, ws.LEFT = 0, ws.RIGHT = 1, ws.BEYOND = 2, ws.BEHIND = 3, ws.BETWEEN = 4, ws.ORIGIN = 5, ws.DESTINATION = 6, h(bs, ws), e(bs.prototype, {
            getConstraint: function() {
                return this.constraint
            },
            setOnConstraint: function(t) {
                this._isOnConstraint = t
            },
            merge: function(t) {
                t._isOnConstraint && (this._isOnConstraint = !0, this.constraint = t.constraint)
            },
            isOnConstraint: function() {
                return this._isOnConstraint
            },
            setConstraint: function(t) {
                this._isOnConstraint = !0, this.constraint = t
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return bs
            }
        }), e(Rs.prototype, {
            equalsNonOriented: function(t) {
                return !!this.equalsOriented(t) || !!this.equalsOriented(t.sym())
            },
            toLineSegment: function() {
                return new he(this.vertex.getCoordinate(), this.dest().getCoordinate())
            },
            dest: function() {
                return this.sym().orig()
            },
            oNext: function() {
                return this.next
            },
            equalsOriented: function(t) {
                return !(!this.orig().getCoordinate().equals2D(t.orig().getCoordinate()) || !this.dest().getCoordinate().equals2D(t.dest().getCoordinate()))
            },
            dNext: function() {
                return this.sym().oNext().sym()
            },
            lPrev: function() {
                return this.next.sym()
            },
            rPrev: function() {
                return this.sym().oNext()
            },
            rot: function() {
                return this._rot
            },
            oPrev: function() {
                return this._rot.next._rot
            },
            sym: function() {
                return this._rot._rot
            },
            setOrig: function(t) {
                this.vertex = t
            },
            lNext: function() {
                return this.invRot().oNext().rot()
            },
            getLength: function() {
                return this.orig().getCoordinate().distance(this.dest().getCoordinate())
            },
            invRot: function() {
                return this._rot.sym()
            },
            setDest: function(t) {
                this.sym().setOrig(t)
            },
            setData: function(t) {
                this.data = t
            },
            getData: function() {
                return this.data
            },
            delete: function() {
                this._rot = null
            },
            orig: function() {
                return this.vertex
            },
            rNext: function() {
                return this._rot.next.invRot()
            },
            toString: function() {
                var t = this.vertex.getCoordinate(),
                    e = this.dest().getCoordinate();
                return re.toLineString(t, e)
            },
            isLive: function() {
                return null !== this._rot
            },
            getPrimary: function() {
                return this.orig().getCoordinate().compareTo(this.dest().getCoordinate()) <= 0 ? this : this.sym()
            },
            dPrev: function() {
                return this.invRot().oNext().invRot()
            },
            setNext: function(t) {
                this.next = t
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Rs
            }
        }), Rs.makeEdge = function(t, e) {
            var n = new Rs,
                i = new Rs,
                r = new Rs,
                s = new Rs;
            n._rot = i, i._rot = r, r._rot = s, s._rot = n, n.setNext(n), i.setNext(s), r.setNext(r), s.setNext(i);
            var o = n;
            return o.setOrig(t), o.setDest(e), o
        }, Rs.swap = function(t) {
            var e = t.oPrev(),
                n = t.sym().oPrev();
            Rs.splice(t, e), Rs.splice(t.sym(), n), Rs.splice(t, e.lNext()), Rs.splice(t.sym(), n.lNext()), t.setOrig(e.dest()), t.setDest(n.dest())
        }, Rs.splice = function(t, e) {
            var n = t.oNext().rot(),
                i = e.oNext().rot(),
                r = e.oNext(),
                s = t.oNext(),
                o = i.oNext(),
                a = n.oNext();
            t.setNext(r), e.setNext(s), n.setNext(o), i.setNext(a)
        }, Rs.connect = function(t, e) {
            var n = Rs.makeEdge(t.dest(), e.orig());
            return Rs.splice(n, t.lNext()), Rs.splice(n.sym(), e), n
        }, e(Ms.prototype, {
            insertSite: function(t) {
                var e = this.subdiv.locate(t);
                if (this.subdiv.isVertexOfEdge(e, t)) return e;
                this.subdiv.isOnEdge(e, t.getCoordinate()) && (e = e.oPrev(), this.subdiv.delete(e.oNext()));
                var n = this.subdiv.makeEdge(e.orig(), t);
                Rs.splice(n, e);
                var i = n;
                do {
                    n = this.subdiv.connect(e, n.sym()), e = n.oPrev()
                } while (e.lNext() !== i);
                for (;;) {
                    var r = e.oPrev();
                    if (r.dest().rightOf(e) && t.isInCircle(e.orig(), r.dest(), e.dest())) Rs.swap(e), e = e.oPrev();
                    else {
                        if (e.oNext() === i) return n;
                        e = e.oNext().lPrev()
                    }
                }
            },
            insertSites: function(t) {
                for (var e = t.iterator(); e.hasNext();) {
                    var n = e.next();
                    this.insertSite(n)
                }
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Ms
            }
        }), e(Ts.prototype, {
            locate: function(t) {},
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Ts
            }
        }), e(Ps.prototype, {
            init: function() {
                this.lastEdge = this.findEdge()
            },
            locate: function(t) {
                this.lastEdge.isLive() || this.init();
                var e = this.subdiv.locateFromEdge(t, this.lastEdge);
                return this.lastEdge = e, e
            },
            findEdge: function() {
                return this.subdiv.getEdges().iterator().next()
            },
            interfaces_: function() {
                return [Ts]
            },
            getClass: function() {
                return Ps
            }
        }), h(Os, l), e(Os.prototype, {
            getSegment: function() {
                return this.seg
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Os
            }
        }), Os.msgWithSpatial = function(t, e) {
            return null !== e ? t + " [ " + e + " ]" : t
        }, e(Ds.prototype, {
            visit: function(t) {},
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Ds
            }
        }), e(As.prototype, {
            getTriangleVertices: function(t) {
                var e = new Gs;
                return this.visitTriangles(e, t), e.getTriangleVertices()
            },
            isFrameVertex: function(t) {
                return !!t.equals(this.frameVertex[0]) || !!t.equals(this.frameVertex[1]) || !!t.equals(this.frameVertex[2])
            },
            isVertexOfEdge: function(t, e) {
                return !(!e.equals(t.orig(), this.tolerance) && !e.equals(t.dest(), this.tolerance))
            },
            connect: function(t, e) {
                var n = Rs.connect(t, e);
                return this.quadEdges.add(n), n
            },
            getVoronoiCellPolygon: function(t, e) {
                var n = new I,
                    i = t;
                do {
                    var r = t.rot().orig().getCoordinate();
                    n.add(r), t = t.oPrev()
                } while (t !== i);
                var s = new N;
                s.addAll(n, !1), s.closeRing(), s.size() < 4 && (A.out.println(s), s.add(s.get(s.size() - 1), !0));
                var o = s.toCoordinateArray(),
                    a = e.createPolygon(e.createLinearRing(o), null),
                    u = i.orig();
                return a.setUserData(u.getCoordinate()), a
            },
            setLocator: function(t) {
                this.locator = t
            },
            initSubdiv: function() {
                var t = this.makeEdge(this.frameVertex[0], this.frameVertex[1]),
                    e = this.makeEdge(this.frameVertex[1], this.frameVertex[2]);
                Rs.splice(t.sym(), e);
                var n = this.makeEdge(this.frameVertex[2], this.frameVertex[0]);
                return Rs.splice(e.sym(), n), Rs.splice(n.sym(), t), t
            },
            isFrameBorderEdge: function(t) {
                var e = new Array(3).fill(null);
                As.getTriangleEdges(t, e);
                var n = new Array(3).fill(null);
                As.getTriangleEdges(t.sym(), n);
                var i = t.lNext().dest();
                if (this.isFrameVertex(i)) return !0;
                var r = t.sym().lNext().dest();
                return !!this.isFrameVertex(r)
            },
            makeEdge: function(t, e) {
                var n = Rs.makeEdge(t, e);
                return this.quadEdges.add(n), n
            },
            visitTriangles: function(t, e) {
                this.visitedKey++;
                var n = new de;
                n.push(this.startingEdge);
                for (var i = new Q; !n.empty();) {
                    var r = n.pop();
                    if (!i.contains(r)) {
                        var s = this.fetchTriangleToVisit(r, n, e, i);
                        null !== s && t.visit(s)
                    }
                }
            },
            isFrameEdge: function(t) {
                return !(!this.isFrameVertex(t.orig()) && !this.isFrameVertex(t.dest()))
            },
            isOnEdge: function(t, e) {
                return this.seg.setCoordinates(t.orig().getCoordinate(), t.dest().getCoordinate()), this.seg.distance(e) < this.edgeCoincidenceTolerance
            },
            getEnvelope: function() {
                return new C(this.frameEnv)
            },
            createFrame: function(t) {
                var e = t.getWidth(),
                    n = t.getHeight(),
                    i = 0;
                i = e > n ? 10 * e : 10 * n, this.frameVertex[0] = new ws((t.getMaxX() + t.getMinX()) / 2, t.getMaxY() + i), this.frameVertex[1] = new ws(t.getMinX() - i, t.getMinY() - i), this.frameVertex[2] = new ws(t.getMaxX() + i, t.getMinY() - i), this.frameEnv = new C(this.frameVertex[0].getCoordinate(), this.frameVertex[1].getCoordinate()), this.frameEnv.expandToInclude(this.frameVertex[2].getCoordinate())
            },
            getTriangleCoordinates: function(t) {
                var e = new Bs;
                return this.visitTriangles(e, t), e.getTriangles()
            },
            getVertices: function(t) {
                for (var e = new Q, n = this.quadEdges.iterator(); n.hasNext();) {
                    var i = n.next(),
                        r = i.orig();
                    !t && this.isFrameVertex(r) || e.add(r);
                    var s = i.dest();
                    !t && this.isFrameVertex(s) || e.add(s)
                }
                return e
            },
            fetchTriangleToVisit: function(t, e, n, i) {
                var r = t,
                    s = 0,
                    o = !1;
                do {
                    this.triEdges[s] = r, this.isFrameEdge(r) && (o = !0);
                    var a = r.sym();
                    i.contains(a) || e.push(a), i.add(r), s++, r = r.lNext()
                } while (r !== t);
                return o && !n ? null : this.triEdges
            },
            getEdges: function() {
                if (0 === arguments.length) return this.quadEdges;
                if (1 === arguments.length) {
                    for (var t = arguments[0], e = this.getPrimaryEdges(!1), n = new Array(e.size()).fill(null), i = 0, r = e.iterator(); r.hasNext();) {
                        var s = r.next();
                        n[i++] = t.createLineString([s.orig().getCoordinate(), s.dest().getCoordinate()])
                    }
                    return t.createMultiLineString(n)
                }
            },
            getVertexUniqueEdges: function(t) {
                for (var e = new I, n = new Q, i = this.quadEdges.iterator(); i.hasNext();) {
                    var r = i.next(),
                        s = r.orig();
                    n.contains(s) || (n.add(s), !t && this.isFrameVertex(s) || e.add(r));
                    var o = r.sym(),
                        a = o.orig();
                    n.contains(a) || (n.add(a), !t && this.isFrameVertex(a) || e.add(o))
                }
                return e
            },
            getTriangleEdges: function(t) {
                var e = new ks;
                return this.visitTriangles(e, t), e.getTriangleEdges()
            },
            getPrimaryEdges: function(t) {
                this.visitedKey++;
                var e = new I,
                    n = new de;
                n.push(this.startingEdge);
                for (var i = new Q; !n.empty();) {
                    var r = n.pop();
                    if (!i.contains(r)) {
                        var s = r.getPrimary();
                        !t && this.isFrameEdge(s) || e.add(s), n.push(r.oNext()), n.push(r.sym().oNext()), i.add(r), i.add(r.sym())
                    }
                }
                return e
            },
            delete: function(t) {
                Rs.splice(t, t.oPrev()), Rs.splice(t.sym(), t.sym().oPrev());
                var e = t.sym(),
                    n = t.rot(),
                    i = t.rot().sym();
                this.quadEdges.remove(t), this.quadEdges.remove(e), this.quadEdges.remove(n), this.quadEdges.remove(i), t.delete(), e.delete(), n.delete(), i.delete()
            },
            locateFromEdge: function(t, e) {
                for (var n = 0, i = this.quadEdges.size(), r = e;;) {
                    if (++n > i) throw new Os(r.toLineSegment());
                    if (t.equals(r.orig()) || t.equals(r.dest())) break;
                    if (t.rightOf(r)) r = r.sym();
                    else if (t.rightOf(r.oNext())) {
                        if (t.rightOf(r.dPrev())) break;
                        r = r.dPrev()
                    } else r = r.oNext()
                }
                return r
            },
            getTolerance: function() {
                return this.tolerance
            },
            getVoronoiCellPolygons: function(t) {
                this.visitTriangles(new Fs, !0);
                for (var e = new I, n = this.getVertexUniqueEdges(!1), i = n.iterator(); i.hasNext();) {
                    var r = i.next();
                    e.add(this.getVoronoiCellPolygon(r, t))
                }
                return e
            },
            getVoronoiDiagram: function(t) {
                var e = this.getVoronoiCellPolygons(t);
                return t.createGeometryCollection(ne.toGeometryArray(e))
            },
            getTriangles: function(t) {
                for (var e = this.getTriangleCoordinates(!1), n = new Array(e.size()).fill(null), i = 0, r = e.iterator(); r.hasNext();) {
                    var s = r.next();
                    n[i++] = t.createPolygon(t.createLinearRing(s), null)
                }
                return t.createGeometryCollection(n)
            },
            insertSite: function(t) {
                var e = this.locate(t);
                if (t.equals(e.orig(), this.tolerance) || t.equals(e.dest(), this.tolerance)) return e;
                var n = this.makeEdge(e.orig(), t);
                Rs.splice(n, e);
                var i = n;
                do {
                    n = this.connect(e, n.sym()), e = n.oPrev()
                } while (e.lNext() !== i);
                return i
            },
            locate: function() {
                if (1 === arguments.length) {
                    if (arguments[0] instanceof ws) {
                        var t = arguments[0];
                        return this.locator.locate(t)
                    }
                    if (arguments[0] instanceof g) {
                        var e = arguments[0];
                        return this.locator.locate(new ws(e))
                    }
                } else if (2 === arguments.length) {
                    var n = arguments[0],
                        i = arguments[1],
                        r = this.locator.locate(new ws(n));
                    if (null === r) return null;
                    var s = r;
                    r.dest().getCoordinate().equals2D(n) && (s = r.sym());
                    var o = s;
                    do {
                        if (o.dest().getCoordinate().equals2D(i)) return o;
                        o = o.oNext()
                    } while (o !== s);
                    return null
                }
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return As
            }
        }), As.getTriangleEdges = function(t, e) {
            if (e[0] = t, e[1] = e[0].lNext(), e[2] = e[1].lNext(), e[2].lNext() !== e[0]) throw new i("Edges do not form a triangle")
        }, e(Fs.prototype, {
            visit: function(t) {
                for (var e = t[0].orig().getCoordinate(), n = t[1].orig().getCoordinate(), i = t[2].orig().getCoordinate(), r = Ci.circumcentre(e, n, i), s = new ws(r), o = 0; o < 3; o++) t[o].rot().setOrig(s)
            },
            interfaces_: function() {
                return [Ds]
            },
            getClass: function() {
                return Fs
            }
        }), e(ks.prototype, {
            getTriangleEdges: function() {
                return this.triList
            },
            visit: function(t) {
                this.triList.add(t.clone())
            },
            interfaces_: function() {
                return [Ds]
            },
            getClass: function() {
                return ks
            }
        }), e(Gs.prototype, {
            visit: function(t) {
                this.triList.add([t[0].orig(), t[1].orig(), t[2].orig()])
            },
            getTriangleVertices: function() {
                return this.triList
            },
            interfaces_: function() {
                return [Ds]
            },
            getClass: function() {
                return Gs
            }
        }), e(Bs.prototype, {
            checkTriangleSize: function(t) {
                t.length >= 2 ? re.toLineString(t[0], t[1]) : t.length >= 1 && re.toPoint(t[0])
            },
            visit: function(t) {
                this.coordList.clear();
                for (var e = 0; e < 3; e++) {
                    var n = t[e].orig();
                    this.coordList.add(n.getCoordinate())
                }
                if (this.coordList.size() > 0) {
                    this.coordList.closeRing();
                    var i = this.coordList.toCoordinateArray();
                    if (4 !== i.length) return null;
                    this.triCoords.add(i)
                }
            },
            getTriangles: function() {
                return this.triCoords
            },
            interfaces_: function() {
                return [Ds]
            },
            getClass: function() {
                return Bs
            }
        }), As.TriangleCircumcentreVisitor = Fs, As.TriangleEdgesListVisitor = ks, As.TriangleVertexListVisitor = Gs, As.TriangleCoordinatesVisitor = Bs, As.EDGE_COINCIDENCE_TOL_FACTOR = 1e3, e(qs.prototype, {
            getLineSegment: function() {
                return this.ls
            },
            getEndZ: function() {
                return this.ls.getCoordinate(1).z
            },
            getStartZ: function() {
                return this.ls.getCoordinate(0).z
            },
            intersection: function(t) {
                return this.ls.intersection(t.getLineSegment())
            },
            getStart: function() {
                return this.ls.getCoordinate(0)
            },
            getEnd: function() {
                return this.ls.getCoordinate(1)
            },
            getEndY: function() {
                return this.ls.getCoordinate(1).y
            },
            getStartX: function() {
                return this.ls.getCoordinate(0).x
            },
            equalsTopo: function(t) {
                return this.ls.equalsTopo(t.getLineSegment())
            },
            getStartY: function() {
                return this.ls.getCoordinate(0).y
            },
            setData: function(t) {
                this.data = t
            },
            getData: function() {
                return this.data
            },
            getEndX: function() {
                return this.ls.getCoordinate(1).x
            },
            toString: function() {
                return this.ls.toString()
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return qs
            }
        }), e(zs.prototype, {
            visit: function(t) {},
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return zs
            }
        }), e(Vs.prototype, {
            isRepeated: function() {
                return this.count > 1
            },
            getRight: function() {
                return this.right
            },
            getCoordinate: function() {
                return this.p
            },
            setLeft: function(t) {
                this.left = t
            },
            getX: function() {
                return this.p.x
            },
            getData: function() {
                return this.data
            },
            getCount: function() {
                return this.count
            },
            getLeft: function() {
                return this.left
            },
            getY: function() {
                return this.p.y
            },
            increment: function() {
                this.count = this.count + 1
            },
            setRight: function(t) {
                this.right = t
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Vs
            }
        }), e(Us.prototype, {
            insert: function() {
                if (1 === arguments.length) {
                    var t = arguments[0];
                    return this.insert(t, null)
                }
                if (2 === arguments.length) {
                    var e = arguments[0],
                        n = arguments[1];
                    if (null === this.root) return this.root = new Vs(e, n), this.root;
                    if (this.tolerance > 0) {
                        var i = this.findBestMatchNode(e);
                        if (null !== i) return i.increment(), i
                    }
                    return this.insertExact(e, n)
                }
            },
            query: function() {
                var t = arguments,
                    e = this;
                if (1 === arguments.length) {
                    var n = arguments[0],
                        i = new I;
                    return this.query(n, i), i
                }
                if (2 === arguments.length)
                    if (arguments[0] instanceof C && w(arguments[1], y)) ! function() {
                        var n = t[0],
                            i = t[1];
                        e.queryNode(e.root, n, !0, {
                            interfaces_: function() {
                                return [zs]
                            },
                            visit: function(t) {
                                i.add(t)
                            }
                        })
                    }();
                    else if (arguments[0] instanceof C && w(arguments[1], zs)) {
                    var r = arguments[0],
                        s = arguments[1];
                    this.queryNode(this.root, r, !0, s)
                }
            },
            queryNode: function(t, e, n, i) {
                if (null === t) return null;
                var r = null,
                    s = null,
                    o = null;
                n ? (r = e.getMinX(), s = e.getMaxX(), o = t.getX()) : (r = e.getMinY(), s = e.getMaxY(), o = t.getY());
                var a = r < o,
                    u = o <= s;
                a && this.queryNode(t.getLeft(), e, !n, i), e.contains(t.getCoordinate()) && i.visit(t), u && this.queryNode(t.getRight(), e, !n, i)
            },
            findBestMatchNode: function(t) {
                var e = new Ys(t, this.tolerance);
                return this.query(e.queryEnvelope(), e), e.getNode()
            },
            isEmpty: function() {
                return null === this.root
            },
            insertExact: function(t, e) {
                for (var n = this.root, i = this.root, r = !0, s = !0; null !== n;) {
                    if (null !== n) {
                        if (t.distance(n.getCoordinate()) <= this.tolerance) return n.increment(), n
                    }
                    s = r ? t.x < n.getX() : t.y < n.getY(), i = n, n = s ? n.getLeft() : n.getRight(), r = !r
                }
                this.numberOfNodes = this.numberOfNodes + 1;
                var o = new Vs(t, e);
                return s ? i.setLeft(o) : i.setRight(o), o
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Us
            }
        }), Us.toCoordinates = function() {
            if (1 === arguments.length) {
                var t = arguments[0];
                return Us.toCoordinates(t, !1)
            }
            if (2 === arguments.length) {
                for (var e = arguments[0], n = arguments[1], i = new N, r = e.iterator(); r.hasNext();)
                    for (var s = r.next(), o = n ? s.getCount() : 1, a = 0; a < o; a++) i.add(s.getCoordinate(), !0);
                return i.toCoordinateArray()
            }
        }, e(Ys.prototype, {
            visit: function(t) {
                var e = this.p.distance(t.getCoordinate());
                if (!(e <= this.tolerance)) return null;
                var n = !1;
                (null === this.matchNode || e < this.matchDist || null !== this.matchNode && e === this.matchDist && t.getCoordinate().compareTo(this.matchNode.getCoordinate()) < 1) && (n = !0), n && (this.matchNode = t, this.matchDist = e)
            },
            queryEnvelope: function() {
                var t = new C(this.p);
                return t.expandBy(this.tolerance), t
            },
            getNode: function() {
                return this.matchNode
            },
            interfaces_: function() {
                return [zs]
            },
            getClass: function() {
                return Ys
            }
        }), Us.BestMatchVisitor = Ys, e(Xs.prototype, {
            getInitialVertices: function() {
                return this.initialVertices
            },
            getKDT: function() {
                return this.kdt
            },
            enforceConstraints: function() {
                this.addConstraintVertices();
                var t = 0,
                    e = 0;
                do {
                    e = this.enforceGabriel(this.segments), t++
                } while (e > 0 && t < Xs.MAX_SPLIT_ITER)
            },
            insertSites: function(t) {
                for (var e = t.iterator(); e.hasNext();) {
                    var n = e.next();
                    this.insertSite(n)
                }
            },
            getVertexFactory: function() {
                return this.vertexFactory
            },
            getPointArray: function() {
                for (var t = new Array(this.initialVertices.size() + this.segVertices.size()).fill(null), e = 0, n = this.initialVertices.iterator(); n.hasNext();) {
                    var i = n.next();
                    t[e++] = i.getCoordinate()
                }
                for (var r = this.segVertices.iterator(); r.hasNext();) {
                    var i = r.next();
                    t[e++] = i.getCoordinate()
                }
                return t
            },
            setConstraints: function(t, e) {
                this.segments = t, this.segVertices = e
            },
            computeConvexHull: function() {
                var t = new ne,
                    e = this.getPointArray(),
                    n = new me(e, t);
                this.convexHull = n.getConvexHull()
            },
            addConstraintVertices: function() {
                this.computeConvexHull(), this.insertSites(this.segVertices)
            },
            findNonGabrielPoint: function(t) {
                var e = t.getStart(),
                    n = t.getEnd(),
                    i = new g((e.x + n.x) / 2, (e.y + n.y) / 2),
                    s = e.distance(i),
                    o = new C(i);
                o.expandBy(s);
                for (var a = this.kdt.query(o), u = null, l = r.MAX_VALUE, h = a.iterator(); h.hasNext();) {
                    var c = h.next(),
                        f = c.getCoordinate();
                    if (!f.equals2D(e) && !f.equals2D(n)) {
                        var d = i.distance(f);
                        if (d < s) {
                            var p = d;
                            (null === u || p < l) && (u = f, l = p)
                        }
                    }
                }
                return u
            },
            getConstraintSegments: function() {
                return this.segments
            },
            setSplitPointFinder: function(t) {
                this.splitFinder = t
            },
            getConvexHull: function() {
                return this.convexHull
            },
            getTolerance: function() {
                return this.tolerance
            },
            enforceGabriel: function(t) {
                for (var e = new I, n = 0, i = new I, r = t.iterator(); r.hasNext();) {
                    var s = r.next(),
                        o = this.findNonGabrielPoint(s);
                    if (null !== o) {
                        this.splitPt = this.splitFinder.findSplitPoint(s, o);
                        var a = this.createVertex(this.splitPt, s),
                            u = (this.insertSite(a), new qs(s.getStartX(), s.getStartY(), s.getStartZ(), a.getX(), a.getY(), a.getZ(), s.getData())),
                            l = new qs(a.getX(), a.getY(), a.getZ(), s.getEndX(), s.getEndY(), s.getEndZ(), s.getData());
                        e.add(u), e.add(l), i.add(s), n += 1
                    }
                }
                return t.removeAll(i), t.addAll(e), n
            },
            createVertex: function() {
                if (1 === arguments.length) {
                    var t = arguments[0],
                        e = null;
                    return e = null !== this.vertexFactory ? this.vertexFactory.createVertex(t, null) : new bs(t)
                }
                if (2 === arguments.length) {
                    var n = arguments[0],
                        i = arguments[1],
                        e = null;
                    return e = null !== this.vertexFactory ? this.vertexFactory.createVertex(n, i) : new bs(n), e.setOnConstraint(!0), e
                }
            },
            getSubdivision: function() {
                return this.subdiv
            },
            computeBoundingBox: function() {
                var t = Xs.computeVertexEnvelope(this.initialVertices),
                    e = Xs.computeVertexEnvelope(this.segVertices),
                    n = new C(t);
                n.expandToInclude(e);
                var i = .2 * n.getWidth(),
                    r = .2 * n.getHeight(),
                    s = Math.max(i, r);
                this.computeAreaEnv = new C(n), this.computeAreaEnv.expandBy(s)
            },
            setVertexFactory: function(t) {
                this.vertexFactory = t
            },
            formInitialDelaunay: function() {
                this.computeBoundingBox(), this.subdiv = new As(this.computeAreaEnv, this.tolerance), this.subdiv.setLocator(new Ps(this.subdiv)), this.incDel = new Ms(this.subdiv), this.insertSites(this.initialVertices)
            },
            insertSite: function() {
                if (arguments[0] instanceof bs) {
                    var t = arguments[0],
                        e = this.kdt.insert(t.getCoordinate(), t);
                    if (e.isRepeated()) {
                        var n = e.getData();
                        return n.merge(t), n
                    }
                    return this.incDel.insertSite(t), t
                }
                if (arguments[0] instanceof g) {
                    var i = arguments[0];
                    this.insertSite(this.createVertex(i))
                }
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Xs
            }
        }), Xs.computeVertexEnvelope = function(t) {
            for (var e = new C, n = t.iterator(); n.hasNext();) {
                var i = n.next();
                e.expandToInclude(i.getCoordinate())
            }
            return e
        }, Xs.MAX_SPLIT_ITER = 99, e(Hs.prototype, {
            create: function() {
                if (null !== this.subdiv) return null;
                var t = Hs.envelope(this.siteCoords),
                    e = Hs.toVertices(this.siteCoords);
                this.subdiv = new As(t, this.tolerance), new Ms(this.subdiv).insertSites(e)
            },
            setTolerance: function(t) {
                this.tolerance = t
            },
            setSites: function() {
                if (arguments[0] instanceof B) {
                    var t = arguments[0];
                    this.siteCoords = Hs.extractUniqueCoordinates(t)
                } else if (w(arguments[0], m)) {
                    var e = arguments[0];
                    this.siteCoords = Hs.unique(H.toCoordinateArray(e))
                }
            },
            getEdges: function(t) {
                return this.create(), this.subdiv.getEdges(t)
            },
            getSubdivision: function() {
                return this.create(), this.subdiv
            },
            getTriangles: function(t) {
                return this.create(), this.subdiv.getTriangles(t)
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Hs
            }
        }), Hs.extractUniqueCoordinates = function(t) {
            if (null === t) return new N;
            var e = t.getCoordinates();
            return Hs.unique(e)
        }, Hs.envelope = function(t) {
            for (var e = new C, n = t.iterator(); n.hasNext();) {
                var i = n.next();
                e.expandToInclude(i)
            }
            return e
        }, Hs.unique = function(t) {
            var e = H.copyDeep(t);
            return ut.sort(e), new N(e, !1)
        }, Hs.toVertices = function(t) {
            for (var e = new I, n = t.iterator(); n.hasNext();) {
                var i = n.next();
                e.add(new ws(i))
            }
            return e
        }, e(js.prototype, {
            createSiteVertices: function(t) {
                for (var e = new I, n = t.iterator(); n.hasNext();) {
                    var i = n.next();
                    this.constraintVertexMap.containsKey(i) || e.add(new bs(i))
                }
                return e
            },
            create: function() {
                if (null !== this.subdiv) return null;
                var t = Hs.envelope(this.siteCoords),
                    e = new I;
                null !== this.constraintLines && (t.expandToInclude(this.constraintLines.getEnvelopeInternal()), this.createVertices(this.constraintLines), e = js.createConstraintSegments(this.constraintLines));
                var n = this.createSiteVertices(this.siteCoords),
                    i = new Xs(n, this.tolerance);
                i.setConstraints(e, new I(this.constraintVertexMap.values())), i.formInitialDelaunay(), i.enforceConstraints(), this.subdiv = i.getSubdivision()
            },
            setTolerance: function(t) {
                this.tolerance = t
            },
            setConstraints: function(t) {
                this.constraintLines = t
            },
            setSites: function(t) {
                this.siteCoords = Hs.extractUniqueCoordinates(t)
            },
            getEdges: function(t) {
                return this.create(), this.subdiv.getEdges(t)
            },
            getSubdivision: function() {
                return this.create(), this.subdiv
            },
            getTriangles: function(t) {
                return this.create(), this.subdiv.getTriangles(t)
            },
            createVertices: function(t) {
                for (var e = t.getCoordinates(), n = 0; n < e.length; n++) {
                    var i = new bs(e[n]);
                    this.constraintVertexMap.put(e[n], i)
                }
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return js
            }
        }), js.createConstraintSegments = function() {
            if (1 === arguments.length) {
                for (var t = arguments[0], e = zn.getLines(t), n = new I, i = e.iterator(); i.hasNext();) {
                    var r = i.next();
                    js.createConstraintSegments(r, n)
                }
                return n
            }
            if (2 === arguments.length)
                for (var s = arguments[0], o = arguments[1], a = s.getCoordinates(), i = 1; i < a.length; i++) o.add(new qs(a[i - 1], a[i]))
        }, e(Ws.prototype, {
            create: function() {
                if (null !== this.subdiv) return null;
                var t = Hs.envelope(this.siteCoords);
                this.diagramEnv = t;
                var e = Math.max(this.diagramEnv.getWidth(), this.diagramEnv.getHeight());
                this.diagramEnv.expandBy(e), null !== this.clipEnv && this.diagramEnv.expandToInclude(this.clipEnv);
                var n = Hs.toVertices(this.siteCoords);
                this.subdiv = new As(t, this.tolerance), new Ms(this.subdiv).insertSites(n)
            },
            getDiagram: function(t) {
                this.create();
                var e = this.subdiv.getVoronoiDiagram(t);
                return Ws.clipGeometryCollection(e, this.diagramEnv)
            },
            setTolerance: function(t) {
                this.tolerance = t
            },
            setSites: function() {
                if (arguments[0] instanceof B) {
                    var t = arguments[0];
                    this.siteCoords = Hs.extractUniqueCoordinates(t)
                } else if (w(arguments[0], m)) {
                    var e = arguments[0];
                    this.siteCoords = Hs.unique(H.toCoordinateArray(e))
                }
            },
            setClipEnvelope: function(t) {
                this.clipEnv = t
            },
            getSubdivision: function() {
                return this.create(), this.subdiv
            },
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Ws
            }
        }), Ws.clipGeometryCollection = function(t, e) {
            for (var n = t.getFactory().toGeometry(e), i = new I, r = 0; r < t.getNumGeometries(); r++) {
                var s = t.getGeometryN(r),
                    o = null;
                e.contains(s.getEnvelopeInternal()) ? o = s : e.intersects(s.getEnvelopeInternal()) && (o = n.intersection(s), o.setUserData(s.getUserData())), null === o || o.isEmpty() || i.add(o)
            }
            return t.getFactory().createGeometryCollection(ne.toGeometryArray(i))
        };
        var Oo = Object.freeze({
                Vertex: ws
            }),
            Do = Object.freeze({
                ConformingDelaunayTriangulationBuilder: js,
                DelaunayTriangulationBuilder: Hs,
                VoronoiDiagramBuilder: Ws,
                quadedge: Oo
            });
        e(Ks.prototype, {
            interfaces_: function() {
                return []
            },
            getClass: function() {
                return Ks
            }
        }), Ks.union = function(t, e) {
            if (t.isEmpty() || e.isEmpty()) {
                if (t.isEmpty() && e.isEmpty()) return ni.createEmptyResult(ni.UNION, t, e, t.getFactory());
                if (t.isEmpty()) return e.copy();
                if (e.isEmpty()) return t.copy()
            }
            return t.checkNotGeometryCollection(t), t.checkNotGeometryCollection(e), ri.overlayOp(t, e, ni.UNION)
        }, e(B.prototype, {
            equalsTopo: function(t) {
                return !!this.getEnvelopeInternal().equals(t.getEnvelopeInternal()) && is.relate(this, t).isEquals(this.getDimension(), t.getDimension())
            },
            union: function() {
                if (0 === arguments.length) return us.union(this);
                if (1 === arguments.length) {
                    var t = arguments[0];
                    return Ks.union(this, t)
                }
            },
            isValid: function() {
                return Ur.isValid(this)
            },
            intersection: function(t) {
                if (this.isEmpty() || t.isEmpty()) return ni.createEmptyResult(ni.INTERSECTION, this, t, this.factory);
                if (this.isGeometryCollection()) {
                    var e = t;
                    return ln.map(this, {
                        interfaces_: function() {
                            return [MapOp]
                        },
                        map: function(t) {
                            return t.intersection(e)
                        }
                    })
                }
                return this.checkNotGeometryCollection(this), this.checkNotGeometryCollection(t), ri.overlayOp(this, t, ni.INTERSECTION)
            },
            covers: function(t) {
                return is.covers(this, t)
            },
            coveredBy: function(t) {
                return is.coveredBy(this, t)
            },
            touches: function(t) {
                return is.touches(this, t)
            },
            intersects: function(t) {
                return is.intersects(this, t)
            },
            within: function(t) {
                return is.within(this, t)
            },
            overlaps: function(t) {
                return is.overlaps(this, t)
            },
            disjoint: function(t) {
                return is.disjoint(this, t)
            },
            crosses: function(t) {
                return is.crosses(this, t)
            },
            buffer: function() {
                if (1 === arguments.length) {
                    var t = arguments[0];
                    return gr.bufferOp(this, t)
                }
                if (2 === arguments.length) {
                    var e = arguments[0],
                        n = arguments[1];
                    return gr.bufferOp(this, e, n)
                }
                if (3 === arguments.length) {
                    var i = arguments[0],
                        r = arguments[1],
                        s = arguments[2];
                    return gr.bufferOp(this, i, r, s)
                }
            },
            convexHull: function() {
                return new me(this).getConvexHull()
            },
            relate: function() {
                for (var t = arguments.length, e = Array(t), n = 0; n < t; n++) e[n] = arguments[n];
                return is.relate.apply(is, [this].concat(e))
            },
            getCentroid: function() {
                if (this.isEmpty()) return this.factory.createPoint();
                var t = fe.getCentroid(this);
                return this.createPointFromInternalCoord(t, this)
            },
            getInteriorPoint: function() {
                if (this.isEmpty()) return this.factory.createPoint();
                var t = null,
                    e = this.getDimension();
                if (0 === e) {
                    var n = new ui(this);
                    t = n.getInteriorPoint()
                } else if (1 === e) {
                    var n = new ai(this);
                    t = n.getInteriorPoint()
                } else {
                    var n = new si(this);
                    t = n.getInteriorPoint()
                }
                return this.createPointFromInternalCoord(t, this)
            },
            symDifference: function(t) {
                if (this.isEmpty() || t.isEmpty()) {
                    if (this.isEmpty() && t.isEmpty()) return ni.createEmptyResult(ni.SYMDIFFERENCE, this, t, this.factory);
                    if (this.isEmpty()) return t.copy();
                    if (t.isEmpty()) return this.copy()
                }
                return this.checkNotGeometryCollection(this), this.checkNotGeometryCollection(t), ri.overlayOp(this, t, ni.SYMDIFFERENCE)
            },
            createPointFromInternalCoord: function(t, e) {
                return e.getPrecisionModel().makePrecise(t), e.getFactory().createPoint(t)
            },
            toText: function() {
                return (new re).write(this)
            },
            toString: function() {
                this.toText()
            },
            contains: function(t) {
                return is.contains(this, t)
            },
            difference: function(t) {
                return this.isEmpty() ? ni.createEmptyResult(ni.DIFFERENCE, this, t, this.factory) : t.isEmpty() ? this.copy() : (this.checkNotGeometryCollection(this), this.checkNotGeometryCollection(t), ri.overlayOp(this, t, ni.DIFFERENCE))
            },
            isSimple: function() {
                return new Hi(this).isSimple()
            },
            isWithinDistance: function(t, e) {
                return !(this.getEnvelopeInternal().distance(t.getEnvelopeInternal()) > e) && yr.isWithinDistance(this, t, e)
            },
            distance: function(t) {
                return yr.distance(this, t)
            },
            isEquivalentClass: function(t) {
                return this.getClass() === t.getClass()
            }
        });
        t.version = "1.3.0 (6e65adb)", t.algorithm = lo, t.densify = ho, t.dissolve = co, t.geom = ao, t.geomgraph = fo, t.index = mo, t.io = xo, t.noding = Io, t.operation = Mo, t.precision = To, t.simplify = Po, t.triangulate = Do, Object.defineProperty(t, "__esModule", {
            value: !0
        })
    })
}, function(t, e, n) {
    t.exports = n(8)
}, function(t, e, n) {
    "use strict";

    function i(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    n(9);
    var r = n(10),
        s = n(11),
        o = i(s),
        a = n(12),
        u = i(a),
        l = n(0),
        h = i(l);
    n(14), n(15), n(16), n(17), n(18), n(19);
    var c = n(1),
        f = i(c);
    n(28), n(29), n(30), n(31), n(32), n(33), n(34), n(35), L.PM = L.PM || {
        Map: o.default,
        Toolbar: u.default,
        Draw: h.default,
        Edit: f.default,
        version: r.version,
        initialize: function() {
            this.addInitHooks()
        },
        addInitHooks: function() {
            function t() {
                this.options.pmIgnore || (this.pm = new L.PM.Map(this))
            }

            function e() {
                this.pm = new L.PM.Edit.LayerGroup(this)
            }

            function n() {
                this.options.pmIgnore || (this.pm = new L.PM.Edit.Marker(this))
            }

            function i() {
                this.options.pmIgnore || (this.pm = new L.PM.Edit.Line(this))
            }

            function r() {
                this.options.pmIgnore || (this.pm = new L.PM.Edit.Poly(this))
            }

            function s() {
                this.options.pmIgnore || (this.pm = new L.PM.Edit.Rectangle(this))
            }

            function o() {
                this.options.pmIgnore || (this.pm = new L.PM.Edit.Circle(this))
            }
            L.Map.addInitHook(t), L.LayerGroup.addInitHook(e), L.Marker.addInitHook(n), L.Polyline.addInitHook(i), L.Polygon.addInitHook(r), L.Rectangle.addInitHook(s), L.Circle.addInitHook(o)
        }
    }, L.PM.initialize()
}, function(t, e, n) {
    "use strict";
    Array.prototype.findIndex = Array.prototype.findIndex || function(t) {
            if (null === this) throw new TypeError("Array.prototype.findIndex called on null or undefined");
            if ("function" != typeof t) throw new TypeError("callback must be a function");
            for (var e = Object(this), n = e.length >>> 0, i = arguments[1], r = 0; r < n; r++)
                if (t.call(i, e[r], r, e)) return r;
            return -1
        }, Array.prototype.find = Array.prototype.find || function(t) {
            if (null === this) throw new TypeError("Array.prototype.find called on null or undefined");
            if ("function" != typeof t) throw new TypeError("callback must be a function");
            for (var e = Object(this), n = e.length >>> 0, i = arguments[1], r = 0; r < n; r++) {
                var s = e[r];
                if (t.call(i, s, r, e)) return s
            }
        }, "function" != typeof Object.assign && (Object.assign = function(t) {
            if (null == t) throw new TypeError("Cannot convert undefined or null to object");
            t = Object(t);
            for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                if (null != n)
                    for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i])
            }
            return t
        }),
        function(t) {
            t.forEach(function(t) {
                t.hasOwnProperty("remove") || Object.defineProperty(t, "remove", {
                    configurable: !0,
                    enumerable: !0,
                    writable: !0,
                    value: function() {
                        this.parentNode.removeChild(this)
                    }
                })
            })
        }([Element.prototype, CharacterData.prototype, DocumentType.prototype])
}, function(t, e) {
    t.exports = {
        name: "leaflet.pm",
        version: "0.22.0",
        description: "A Leaflet Plugin For Editing Geometry Layers in Leaflet 1.0",
        keywords: ["leaflet", "polygon management", "geometry editing", "map data", "map overlay", "polygon", "geojson", "leaflet-draw", "data-field-geojson", "ui-leaflet-draw"],
        files: ["dist"],
        main: "dist/leaflet.pm.min.js",
        dependencies: {
            "@turf/difference": "^4.7.4",
            "@turf/intersect": "^4.7.4",
            "@turf/kinks": "^4.7.3"
        },
        devDependencies: {
            "babel-core": "^6.24.1",
            "babel-loader": "^7.0.0",
            "babel-preset-env": "^1.4.0",
            "css-loader": "^0.28.0",
            eslint: "^3.5.0",
            "eslint-config-airbnb-base": "^7.1.0",
            "eslint-plugin-import": "^1.15.0",
            "extract-text-webpack-plugin": "^2.1.0",
            "file-loader": "^0.11.1",
            leaflet: "^1.2.0",
            "style-loader": "^0.16.1",
            tape: "^4.6.2",
            "tape-run": "^2.1.4",
            "url-loader": "^0.5.8",
            webpack: "^3.6.0"
        },
        peerDependencies: {
            leaflet: "^1.2.0"
        },
        scripts: {
            start: "npm run dev",
            dev: "./node_modules/.bin/webpack --config=webpack.dev.js",
            test: "browserify ./spec/test.spec.js | tape-run",
            build: "./node_modules/.bin/webpack --config=webpack.build.js",
            prepare: "npm run build"
        },
        repository: {
            type: "git",
            url: "git+https://github.com/codeofsumit/leaflet.pm.git"
        },
        author: {
            name: "Sumit Kumar",
            email: "sk@outlook.com",
            url: "http://twitter.com/TweetsOfSumit"
        },
        license: "MIT",
        bugs: {
            url: "https://github.com/codeofsumit/leaflet.pm/issues"
        },
        homepage: "https://leafletpm.now.sh"
    }
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = L.Class.extend({
        initialize: function(t) {
            var e = this;
            this.map = t, this.Draw = new L.PM.Draw(t), this.Toolbar = new L.PM.Toolbar(t), this.map.on("layerremove", function(t) {
                t.layer.pm && !t.layer._pmTempLayer && e.map.fire("pm:remove", t)
            })
        },
        addControls: function(t) {
            this.Toolbar.addControls(t)
        },
        removeControls: function() {
            this.Toolbar.removeControls()
        },
        toggleControls: function() {
            this.Toolbar.toggleControls()
        },
        controlsVisible: function() {
            return this.Toolbar.isVisible
        },
        enableDraw: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "Poly",
                e = arguments[1];
            this.Draw.enable(t, e)
        },
        disableDraw: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "Poly";
            this.Draw.disable(t)
        },
        setPathOptions: function(t) {
            this.Draw.setPathOptions(t)
        },
        removeLayer: function(t) {
            var e = t.target;
            e._layers || e.pm && e.pm.dragging() || t.target.remove()
        },
        toggleGlobalRemovalMode: function() {
            var t = this;
            this.globalRemovalEnabled() ? (this._globalRemovalMode = !1, this.map.eachLayer(function(e) {
                e.off("click", t.removeLayer)
            })) : (this._globalRemovalMode = !0, this.map.eachLayer(function(e) {
                e.pm && e.on("click", t.removeLayer)
            })), this.Toolbar.toggleButton("deleteLayer", this._globalRemovalMode)
        },
        globalRemovalEnabled: function() {
            return this._globalRemovalMode
        },
        globalEditEnabled: function() {
            return this._globalEditMode
        },
        enableGlobalEditMode: function(t) {
            var e = [];
            this.map.eachLayer(function(t) {
                (t instanceof L.Polyline || t instanceof L.Marker || t instanceof L.Circle) && e.push(t)
            }), e = e.filter(function(t) {
                return !!t.pm
            }), e = e.filter(function(t) {
                return !t._pmTempLayer
            }), this._globalEditMode = !0, e.forEach(function(e) {
                e.pm.enable(t)
            }), this.Toolbar.toggleButton("editPolygon", this._globalEditMode)
        },
        disableGlobalEditMode: function() {
            var t = [];
            this.map.eachLayer(function(e) {
                (e instanceof L.Polyline || e instanceof L.Marker || e instanceof L.Circle) && t.push(e)
            }), t = t.filter(function(t) {
                return !!t.pm
            }), t = t.filter(function(t) {
                return !t._pmTempLayer
            }), this._globalEditMode = !1, t.forEach(function(t) {
                t.pm.disable()
            }), this.Toolbar.toggleButton("editPolygon", this._globalEditMode)
        },
        toggleGlobalEditMode: function(t) {
            this.globalEditEnabled() ? this.disableGlobalEditMode() : this.enableGlobalEditMode(t)
        }
    });
    e.default = i
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = n(13),
        r = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(i);
    L.Control.PMButton = r.default;
    var s = L.Class.extend({
        options: {
            drawMarker: !0,
            drawPolygon: !0,
            drawPolyline: !0,
            drawCircle: !0,
            drawRectangle: !0,
            editMode: !0,
            cutPolygon: !0,
            dragPolygon: !1,
            removalMode: !0,
            position: "topleft"
        },
        initialize: function(t) {
            this.map = t, this.buttons = {}, this.isVisible = !1, this.container = L.DomUtil.create("div", "leaflet-pm-toolbar leaflet-bar leaflet-control"), this._defineButtons()
        },
        getButtons: function() {
            return this.buttons
        },
        addControls: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.options;
            void 0 !== t.editPolygon && (t.editMode = t.editPolygon), void 0 !== t.deleteLayer && (t.removalMode = t.deleteLayer), L.Util.setOptions(this, t), this._showHideButtons(), this.isVisible = !0
        },
        removeControls: function() {
            var t = this.getButtons();
            for (var e in t) t[e].remove();
            this.isVisible = !1
        },
        toggleControls: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.options;
            this.isVisible ? this.removeControls() : this.addControls(t)
        },
        _addButton: function(t, e) {
            return this.buttons[t] = e, this.options[t] = this.options[t] || !1, this.buttons[t]
        },
        triggerClickOnToggledButtons: function(t) {
            for (var e in this.buttons) this.buttons[e] !== t && this.buttons[e].toggled() && this.buttons[e]._triggerClick()
        },
        toggleButton: function(t, e) {
            return "editPolygon" === t && (t = "editMode"), "deleteLayer" === t && (t = "removalMode"), this.triggerClickOnToggledButtons(this.buttons[t]), this.buttons[t].toggle(e)
        },
        _defineButtons: function() {
            var t = this,
                e = {
                    className: " leaflet-pm-icon-delete",
                    onClick: function() {},
                    afterClick: function() {
                        t.map.pm.toggleGlobalRemovalMode()
                    },
                    doToggle: !0,
                    toggleStatus: !1,
                    disableOtherButtons: !0,
                    position: this.options.position
                },
                n = {
                    className: "leaflet-pm-icon-polygon",
                    onClick: function() {},
                    afterClick: function() {
                        t.map.pm.Draw.Poly.toggle()
                    },
                    doToggle: !0,
                    toggleStatus: !1,
                    disableOtherButtons: !0,
                    position: this.options.position
                },
                i = {
                    className: "leaflet-pm-icon-cut",
                    onClick: function() {},
                    afterClick: function() {
                        t.map.pm.Draw.Cut.toggle({
                            snappable: !0,
                            cursorMarker: !0,
                            allowSelfIntersection: !1
                        })
                    },
                    doToggle: !0,
                    toggleStatus: !1,
                    disableOtherButtons: !0,
                    position: this.options.position
                },
                r = {
                    className: "leaflet-pm-icon-marker",
                    onClick: function() {},
                    afterClick: function() {
                        t.map.pm.Draw.Marker.toggle()
                    },
                    doToggle: !0,
                    toggleStatus: !1,
                    disableOtherButtons: !0,
                    position: this.options.position
                },
                s = {
                    className: "leaflet-pm-icon-polyline",
                    onClick: function() {},
                    afterClick: function() {
                        t.map.pm.Draw.Line.toggle()
                    },
                    doToggle: !0,
                    toggleStatus: !1,
                    disableOtherButtons: !0,
                    position: this.options.position
                },
                o = {
                    className: "leaflet-pm-icon-circle",
                    onClick: function() {},
                    afterClick: function() {
                        t.map.pm.Draw.Circle.toggle()
                    },
                    doToggle: !0,
                    toggleStatus: !1,
                    disableOtherButtons: !0,
                    position: this.options.position
                },
                a = {
                    className: "leaflet-pm-icon-rectangle",
                    onClick: function() {},
                    afterClick: function() {
                        t.map.pm.Draw.Rectangle.toggle()
                    },
                    doToggle: !0,
                    toggleStatus: !1,
                    disableOtherButtons: !0,
                    position: this.options.position
                },
                u = {
                    className: "leaflet-pm-icon-edit",
                    onClick: function() {},
                    afterClick: function() {
                        t.map.pm.toggleGlobalEditMode()
                    },
                    doToggle: !0,
                    toggleStatus: !1,
                    disableOtherButtons: !0,
                    position: this.options.position
                },
                l = {
                    className: "leaflet-pm-icon-drag",
                    onClick: function() {},
                    afterClick: function() {},
                    doToggle: !0,
                    toggleStatus: !1,
                    disableOtherButtons: !0,
                    position: this.options.position
                };
            this._addButton("drawMarker", new L.Control.PMButton(r)), this._addButton("drawPolyline", new L.Control.PMButton(s)), this._addButton("drawRectangle", new L.Control.PMButton(a)), this._addButton("drawPolygon", new L.Control.PMButton(n)), this._addButton("drawCircle", new L.Control.PMButton(o)), this._addButton("cutPolygon", new L.Control.PMButton(i)), this._addButton("editMode", new L.Control.PMButton(u)), this._addButton("dragPolygon", new L.Control.PMButton(l)), this._addButton("removalMode", new L.Control.PMButton(e))
        },
        _showHideButtons: function() {
            this.removeControls();
            var t = this.getButtons();
            for (var e in t) this.options[e] && (t[e].setPosition(this.options.position), t[e].addTo(this.map))
        }
    });
    e.default = s
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = L.Control.extend({
        options: {
            position: "topleft"
        },
        initialize: function(t) {
            this._button = L.Util.setOptions(this, t)
        },
        onAdd: function(t) {
            return this._map = t, this._container = this._map.pm.Toolbar.container, this.buttonsDomNode = this._makeButton(this._button), this._container.appendChild(this.buttonsDomNode), this._container
        },
        onRemove: function() {
            return this.buttonsDomNode.remove(), this._container
        },
        getText: function() {
            return this._button.text
        },
        getIconUrl: function() {
            return this._button.iconUrl
        },
        destroy: function() {
            this._button = {}, this._update()
        },
        toggle: function(t) {
            return this._button.toggleStatus = "boolean" == typeof t ? t : !this._button.toggleStatus, this._applyStyleClasses(), this._button.toggleStatus
        },
        toggled: function() {
            return this._button.toggleStatus
        },
        onCreate: function() {
            this.toggle(!1)
        },
        _triggerClick: function(t) {
            this._button.onClick(t), this._clicked(t), this._button.afterClick(t)
        },
        _makeButton: function(t) {
            var e = this,
                n = L.DomUtil.create("a", "leaflet-buttons-control-button", this._container);
            t.toggleStatus && L.DomUtil.addClass(n, "active");
            var i = L.DomUtil.create("div", "control-icon", n);
            return t.iconUrl && i.setAttribute("src", t.iconUrl), t.className && L.DomUtil.addClass(i, t.className), L.DomEvent.addListener(n, "click", function() {
                e._button.disableOtherButtons && e._map.pm.Toolbar.triggerClickOnToggledButtons(e)
            }), L.DomEvent.addListener(n, "click", this._triggerClick, this), L.DomEvent.disableClickPropagation(n), n
        },
        _applyStyleClasses: function() {
            this._container && (this._button.toggleStatus ? L.DomUtil.addClass(this.buttonsDomNode, "active") : L.DomUtil.removeClass(this.buttonsDomNode, "active"))
        },
        _clicked: function() {
            this._button.doToggle && this.toggle()
        }
    });
    e.default = i
}, function(t, e, n) {
    "use strict";
    var i = n(0),
        r = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(i);
    r.default.Marker = r.default.extend({
        initialize: function(t) {
            this._map = t, this._shape = "Marker", this.toolbarButtonName = "drawMarker"
        },
        enable: function(t) {
            L.Util.setOptions(this, t), this._enabled = !0, this._map.on("click", this._createMarker, this), this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !0), this._hintMarker = L.marker([0, 0], this.options.markerStyle), this._hintMarker._pmTempLayer = !0, this._hintMarker.addTo(this._map), this._layer = this._hintMarker, this._map.on("mousemove", this._syncHintMarker, this), this._map.fire("pm:drawstart", {
                shape: this._shape,
                workingLayer: this._layer
            }), this._map.eachLayer(function(t) {
                t instanceof L.Marker && t.pm && t.pm.enable()
            })
        },
        disable: function() {
            this._enabled && (this._map.off("click", this._createMarker, this), this._hintMarker.remove(), this._map.off("mousemove", this._syncHintMarker, this), this._map.eachLayer(function(t) {
                t instanceof L.Marker && t.pm && !t._pmTempLayer && t.pm.disable()
            }), this._map.fire("pm:drawend", {
                shape: this._shape
            }), this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !1), this._enabled = !1)
        },
        enabled: function() {
            return this._enabled
        },
        toggle: function(t) {
            this.enabled() ? this.disable() : this.enable(t)
        },
        _createMarker: function(t) {
            if (t.latlng) {
                this._hintMarker._snapped || this._hintMarker.setLatLng(t.latlng);
                var e = this._hintMarker.getLatLng(),
                    n = new L.Marker(e, this.options.markerStyle);
                n.addTo(this._map), n.pm.enable(), this._map.fire("pm:create", {
                    shape: this._shape,
                    marker: n,
                    layer: n
                }), this._cleanupSnapping()
            }
        },
        _syncHintMarker: function(t) {
            if (this._hintMarker.setLatLng(t.latlng), this.options.snappable) {
                var e = t;
                e.target = this._hintMarker, this._handleSnapping(e)
            }
        }
    })
}, function(t, e, n) {
    "use strict";

    function i(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    var r = n(5),
        s = i(r),
        o = n(0),
        a = i(o);
    a.default.Line = a.default.extend({
        initialize: function(t) {
            this._map = t, this._shape = "Line", this.toolbarButtonName = "drawPolyline", this._doesSelfIntersect = !1
        },
        enable: function(t) {
            L.Util.setOptions(this, t), this.options.finishOnDoubleClick && !this.options.finishOn && (this.options.finishOn = "dblclick"), this._enabled = !0, this._layerGroup = new L.LayerGroup, this._layerGroup._pmTempLayer = !0, this._layerGroup.addTo(this._map), this._layer = L.polyline([], this.options.templineStyle), this._layer._pmTempLayer = !0, this._layerGroup.addLayer(this._layer), this._hintline = L.polyline([], this.options.hintlineStyle), this._hintline._pmTempLayer = !0, this._layerGroup.addLayer(this._hintline), this._hintMarker = L.marker(this._map.getCenter(), {
                icon: L.divIcon({
                    className: "marker-icon cursor-marker"
                })
            }), this._hintMarker._pmTempLayer = !0, this._layerGroup.addLayer(this._hintMarker), this.options.cursorMarker && L.DomUtil.addClass(this._hintMarker._icon, "visible"), this._map._container.style.cursor = "crosshair", this._map.on("click", this._createVertex, this), this.options.finishOn && this._map.on(this.options.finishOn, this._finishShape, this), "dblclick" === this.options.finishOn && (this.tempMapDoubleClickZoomState = this._map.doubleClickZoom._enabled, this.tempMapDoubleClickZoomState && this._map.doubleClickZoom.disable()), this._map.on("mousemove", this._syncHintMarker, this), this._hintMarker.on("move", this._syncHintLine, this), this._map.fire("pm:drawstart", {
                shape: this._shape,
                workingLayer: this._layer
            }), this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !0), this._otherSnapLayers = []
        },
        disable: function() {
            this._enabled && (this._enabled = !1, this._map._container.style.cursor = "default", this._map.off("click", this._createVertex, this), this._map.off("mousemove", this._syncHintMarker, this), this.options.finishOn && this._map.off(this.options.finishOn, this._finishShape, this), this.tempMapDoubleClickZoomState && this._map.doubleClickZoom.enable(), this._map.removeLayer(this._layerGroup), this._map.fire("pm:drawend", {
                shape: this._shape
            }), this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !1), this.options.snappable && this._cleanupSnapping())
        },
        enabled: function() {
            return this._enabled
        },
        toggle: function(t) {
            this.enabled() ? this.disable() : this.enable(t)
        },
        hasSelfIntersection: function() {
            return (0, s.default)(this._layer.toGeoJSON()).features.length > 0
        },
        _syncHintLine: function() {
            var t = this._layer.getLatLngs();
            if (t.length > 0) {
                var e = t[t.length - 1];
                this._hintline.setLatLngs([e, this._hintMarker.getLatLng()])
            }
        },
        _syncHintMarker: function(t) {
            if (this._hintMarker.setLatLng(t.latlng), this.options.snappable) {
                var e = t;
                e.target = this._hintMarker, this._handleSnapping(e)
            }
            this.options.allowSelfIntersection || this._handleSelfIntersection()
        },
        _handleSelfIntersection: function() {
            var t = L.polyline(this._layer.getLatLngs());
            t.addLatLng(this._hintMarker.getLatLng());
            var e = (0, s.default)(t.toGeoJSON());
            this._doesSelfIntersect = e.features.length > 0, this._doesSelfIntersect ? this._hintline.setStyle({
                color: "red"
            }) : this._hintline.setStyle({
                color: "#3388ff"
            })
        },
        _createVertex: function(t) {
            if (this.options.allowSelfIntersection || !this._doesSelfIntersect) {
                this._hintMarker._snapped || this._hintMarker.setLatLng(t.latlng);
                var e = this._hintMarker.getLatLng();
                if (e.equals(this._layer.getLatLngs()[0])) return void this._finishShape(t);
                var n = 0 === this._layer.getLatLngs().length;
                this._layer.addLatLng(e);
                var i = this._createMarker(e, n);
                this._hintline.setLatLngs([e, e]), this._layer.fire("pm:vertexadded", {
                    shape: this._shape,
                    workingLayer: this._layer,
                    marker: i,
                    latlng: e
                })
            }
        },
        _finishShape: function() {
            if (this.options.allowSelfIntersection || !this._doesSelfIntersect) {
                var t = this._layer.getLatLngs(),
                    e = L.polyline(t, this.options.pathOptions).addTo(this._map);
                this.disable(), this._map.fire("pm:create", {
                    shape: this._shape,
                    layer: e
                }), this.options.snappable && this._cleanupSnapping()
            }
        },
        _createMarker: function(t) {
            var e = new L.Marker(t, {
                draggable: !1,
                icon: L.divIcon({
                    className: "marker-icon"
                })
            });
            return e._pmTempLayer = !0, this._layerGroup.addLayer(e), e.on("click", this._finishShape, this), e
        }
    })
}, function(t, e, n) {
    "use strict";
    var i = n(0),
        r = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(i);
    r.default.Poly = r.default.Line.extend({
        initialize: function(t) {
            this._map = t, this._shape = "Poly", this.toolbarButtonName = "drawPolygon"
        },
        _finishShape: function() {
            if (this.options.allowSelfIntersection || !this._doesSelfIntersect) {
                var t = this._layer.getLatLngs(),
                    e = L.polygon(t, this.options.pathOptions).addTo(this._map);
                this.disable(), this._map.fire("pm:create", {
                    shape: this._shape,
                    layer: e
                }), this._cleanupSnapping(), this._otherSnapLayers.splice(this._tempSnapLayerIndex, 1), delete this._tempSnapLayerIndex
            }
        },
        _createMarker: function(t, e) {
            var n = new L.Marker(t, {
                draggable: !1,
                icon: L.divIcon({
                    className: "marker-icon"
                })
            });
            return n._pmTempLayer = !0, this._layerGroup.addLayer(n), e && (n.on("click", this._finishShape, this), this._tempSnapLayerIndex = this._otherSnapLayers.push(n) - 1, this.options.snappable && this._cleanupSnapping()), n
        }
    })
}, function(t, e, n) {
    "use strict";
    var i = n(0),
        r = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(i);
    r.default.Rectangle = r.default.extend({
        initialize: function(t) {
            this._map = t, this._shape = "Rectangle", this.toolbarButtonName = "drawRectangle"
        },
        enable: function(t) {
            if (L.Util.setOptions(this, t), this._enabled = !0, this._layerGroup = new L.LayerGroup, this._layerGroup._pmTempLayer = !0, this._layerGroup.addTo(this._map), this._layer = L.rectangle([
                    [0, 0],
                    [0, 0]
                ]).addTo(this._map), this._layer._pmTempLayer = !0, this._layerGroup.addLayer(this._layer), this._startMarker = L.marker([0, 0], {
                    icon: L.divIcon({
                        className: "marker-icon"
                    }),
                    draggable: !0,
                    zIndexOffset: 100,
                    opacity: this.options.cursorMarker ? 1 : 0
                }), this._startMarker._pmTempLayer = !0, this._layerGroup.addLayer(this._startMarker), this._hintMarker = L.marker([0, 0], {
                    icon: L.divIcon({
                        className: "marker-icon cursor-marker"
                    })
                }), this._hintMarker._pmTempLayer = !0, this._layerGroup.addLayer(this._hintMarker), this.options.cursorMarker) {
                L.DomUtil.addClass(this._hintMarker._icon, "visible"), this._styleMarkers = [];
                for (var e = 0; e < 2; e++) {
                    var n = L.marker([0, 0], {
                        icon: L.divIcon({
                            className: "marker-icon"
                        }),
                        draggable: !0,
                        zIndexOffset: 100
                    });
                    n._pmTempLayer = !0, this._layerGroup.addLayer(n), this._styleMarkers.push(n)
                }
            }
            this._map._container.style.cursor = "crosshair", this._map.on("click", this._placeStartingMarkers, this), this._map.on("mousemove", this._syncHintMarker, this), this._map.fire("pm:drawstart", {
                shape: this._shape,
                workingLayer: this._layer
            }), this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !0), this._otherSnapLayers = []
        },
        disable: function() {
            this._enabled && (this._enabled = !1, this._map._container.style.cursor = "default", this._map.off("click", this._finishShape, this), this._map.off("click", this._placeStartingMarkers, this), this._map.off("mousemove", this._syncHintMarker, this), this._map.removeLayer(this._layerGroup), this._map.fire("pm:drawend", {
                shape: this._shape
            }), this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !1), this.options.snappable && this._cleanupSnapping())
        },
        enabled: function() {
            return this._enabled
        },
        toggle: function(t) {
            this.enabled() ? this.disable() : this.enable(t)
        },
        _placeStartingMarkers: function(t) {
            this._hintMarker._snapped || this._hintMarker.setLatLng(t.latlng);
            var e = this._hintMarker.getLatLng();
            this._startMarker.setLatLng(e), this.options.cursorMarker && this._styleMarkers && this._styleMarkers.forEach(function(t) {
                t.setLatLng(e)
            }), this._map.off("click", this._placeStartingMarkers, this), this._map.on("click", this._finishShape, this), this._setRectangleOrigin()
        },
        _setRectangleOrigin: function() {
            var t = this._startMarker.getLatLng();
            t && (this._layer.setLatLngs([t, t]), this._hintMarker.on("move", this._syncRectangleSize, this))
        },
        _syncHintMarker: function(t) {
            if (this._hintMarker.setLatLng(t.latlng), this.options.snappable) {
                var e = t;
                e.target = this._hintMarker, this._handleSnapping(e)
            }
        },
        _syncRectangleSize: function() {
            var t = this,
                e = this._startMarker.getLatLng(),
                n = this._hintMarker.getLatLng();
            if (this._layer.setBounds([e, n]), this.options.cursorMarker && this._styleMarkers) {
                var i = this._findCorners(),
                    r = [];
                i.forEach(function(e) {
                    e.equals(t._startMarker.getLatLng()) || e.equals(t._hintMarker.getLatLng()) || r.push(e)
                }), r.forEach(function(e, n) {
                    t._styleMarkers[n].setLatLng(e)
                })
            }
        },
        _finishShape: function() {
            var t = this._startMarker.getLatLng(),
                e = this._hintMarker.getLatLng(),
                n = L.rectangle([t, e]).addTo(this._map);
            this.disable(), this._map.fire("pm:create", {
                shape: this._shape,
                layer: n
            })
        },
        _findCorners: function() {
            var t = this._layer.getBounds();
            return [t.getNorthWest(), t.getNorthEast(), t.getSouthEast(), t.getSouthWest()]
        }
    })
}, function(t, e, n) {
    "use strict";
    var i = n(0),
        r = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(i);
    r.default.Circle = r.default.extend({
        initialize: function(t) {
            this._map = t, this._shape = "Circle", this.toolbarButtonName = "drawCircle"
        },
        enable: function(t) {
            L.Util.setOptions(this, t), this.options.radius = 0, this._enabled = !0, this._layerGroup = new L.LayerGroup, this._layerGroup._pmTempLayer = !0, this._layerGroup.addTo(this._map), this._layer = L.circle([0, 0], this.options.templineStyle), this._layer._pmTempLayer = !0, this._layerGroup.addLayer(this._layer), this._centerMarker = L.marker([0, 0], {
                icon: L.divIcon({
                    className: "marker-icon"
                }),
                draggable: !1,
                zIndexOffset: 100
            }), this._centerMarker._pmTempLayer = !0, this._layerGroup.addLayer(this._centerMarker), this._hintMarker = L.marker([0, 0], {
                icon: L.divIcon({
                    className: "marker-icon cursor-marker"
                })
            }), this._hintMarker._pmTempLayer = !0, this._layerGroup.addLayer(this._hintMarker), this.options.cursorMarker && L.DomUtil.addClass(this._hintMarker._icon, "visible"), this._hintline = L.polyline([], this.options.hintlineStyle), this._hintline._pmTempLayer = !0, this._layerGroup.addLayer(this._hintline), this._map._container.style.cursor = "crosshair", this._map.on("click", this._placeCenterMarker, this), this._map.on("mousemove", this._syncHintMarker, this), this._map.fire("pm:drawstart", {
                shape: this._shape,
                workingLayer: this._layer
            }), this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !0), this._otherSnapLayers = []
        },
        disable: function() {
            this._enabled && (this._enabled = !1, this._map._container.style.cursor = "default", this._map.off("click", this._finishShape, this), this._map.off("click", this._placeCenterMarker, this), this._map.off("mousemove", this._syncHintMarker, this), this._map.removeLayer(this._layerGroup), this._map.fire("pm:drawend", {
                shape: this._shape
            }), this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !1), this.options.snappable && this._cleanupSnapping())
        },
        enabled: function() {
            return this._enabled
        },
        toggle: function(t) {
            this.enabled() ? this.disable() : this.enable(t)
        },
        _syncHintLine: function() {
            var t = this._centerMarker.getLatLng();
            this._hintline.setLatLngs([t, this._hintMarker.getLatLng()])
        },
        _syncCircleRadius: function() {
            var t = this._centerMarker.getLatLng(),
                e = this._hintMarker.getLatLng(),
                n = t.distanceTo(e);
            this._layer.setRadius(n)
        },
        _syncHintMarker: function(t) {
            if (this._hintMarker.setLatLng(t.latlng), this.options.snappable) {
                var e = t;
                e.target = this._hintMarker, this._handleSnapping(e)
            }
        },
        _placeCenterMarker: function(t) {
            this._hintMarker._snapped || this._hintMarker.setLatLng(t.latlng);
            var e = this._hintMarker.getLatLng();
            this._centerMarker.setLatLng(e), this._map.off("click", this._placeCenterMarker, this), this._map.on("click", this._finishShape, this), this._placeCircleCenter()
        },
        _placeCircleCenter: function() {
            var t = this._centerMarker.getLatLng();
            t && (this._layer.setLatLng(t), this._hintMarker.on("move", this._syncHintLine, this), this._hintMarker.on("move", this._syncCircleRadius, this))
        },
        _finishShape: function() {
            var t = this._centerMarker.getLatLng(),
                e = this._hintMarker.getLatLng(),
                n = t.distanceTo(e),
                i = L.circle(t, {
                    radius: n
                }).addTo(this._map);
            this.disable(), this._map.fire("pm:create", {
                shape: this._shape,
                layer: i
            })
        },
        _createMarker: function(t) {
            var e = new L.Marker(t, {
                draggable: !1,
                icon: L.divIcon({
                    className: "marker-icon"
                })
            });
            return e._pmTempLayer = !0, this._layerGroup.addLayer(e), e
        }
    })
}, function(t, e, n) {
    "use strict";

    function i(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    var r = n(20),
        s = i(r),
        o = n(22),
        a = i(o),
        u = n(0),
        l = i(u);
    l.default.Cut = l.default.Poly.extend({
        initialize: function(t) {
            this._map = t, this._shape = "Cut", this.toolbarButtonName = "cutPolygon"
        },
        _cut: function(t) {
            var e = this,
                n = this._map._layers,
                i = Object.keys(n).map(function(t) {
                    return n[t]
                }).filter(function(t) {
                    return t.pm
                }).filter(function(t) {
                    return t instanceof L.Polygon
                }).filter(function(e) {
                    return e !== t
                }).filter(function(e) {
                    try {
                        return !!(0, s.default)(t.toGeoJSON(), e.toGeoJSON())
                    } catch (t) {
                        return console.error("You cant cut polygons with self-intersections"), !1
                    }
                }),
                r = [];
            i.forEach(function(n) {
                var i = (0, a.default)(n.toGeoJSON(), t.toGeoJSON());
                if ("MultiPolygon" === i.geometry.type) {
                    i.geometry.coordinates.reduce(function(t, e) {
                        return t.push({
                            type: "Polygon",
                            coordinates: e
                        }), t
                    }, []).forEach(function(t) {
                        var i = L.geoJSON(t, n.options);
                        r.push(i), i.addTo(e._map), i.pm.enable(e.options), i.pm.disable()
                    })
                } else {
                    var s = L.geoJSON(i, n.options).addTo(e._map);
                    r.push(s), s.addTo(e._map), s.pm.enable(e.options), s.pm.disable()
                }
                n.fire("pm:cut", {
                    shape: e._shape,
                    layer: n,
                    resultingLayers: r
                }), e._map.fire("pm:cut", {
                    shape: e._shape,
                    cuttedLayer: n,
                    resultingLayers: r
                }), n._pmTempLayer = !0, t._pmTempLayer = !0, n.remove(), t.remove()
            })
        },
        _finishShape: function() {
            var t = this._layer.getLatLngs(),
                e = L.polygon(t, this.options.pathOptions);
            this._cut(e), this.disable(), this._cleanupSnapping(), this._otherSnapLayers.splice(this._tempSnapLayerIndex, 1), delete this._tempSnapLayerIndex
        }
    })
}, function(t, e, n) {
    var i = n(6),
        r = n(21),
        s = n(2).feature;
    t.exports = function(t, e) {
        var n = "Feature" === t.type ? t.geometry : t,
            o = "Feature" === e.type ? e.geometry : e,
            a = new i.io.GeoJSONReader,
            u = a.read(r(n)),
            l = a.read(r(o)),
            h = u.intersection(l);
        if (h.isEmpty()) return null;
        var c = new i.io.GeoJSONWriter,
            f = c.write(h);
        return s(f)
    }
}, function(t, e, n) {
    function i(t, e, n) {
        t.length > n && t.splice(n, t.length);
        for (var i = 0; i < t.length; i++) t[i] = Math.round(t[i] * e) / e;
        return t
    }
    var r = n(3).coordEach;
    t.exports = function(t, e, n, s) {
        if (e = void 0 === e || null === e || isNaN(e) ? 6 : e, n = void 0 === n || null === n || isNaN(n) ? 3 : n, !t) throw new Error("<geojson> is required");
        if ("number" != typeof e) throw new Error("<precision> must be a number");
        if ("number" != typeof n) throw new Error("<coordinates> must be a number");
        !1 !== s && void 0 !== s || (t = JSON.parse(JSON.stringify(t)));
        var o = Math.pow(10, e);
        return r(t, function(t) {
            i(t, o, n)
        }), t
    }
}, function(t, e, n) {
    function i(t) {
        switch (t.type) {
            case "Polygon":
                return s(t) > 1 ? t : null;
            case "MultiPolygon":
                var e = [];
                if (u(t, function(t) {
                        s(t) > 1 && e.push(t.geometry.coordinates)
                    }), e.length) return {
                    type: "MultiPolygon",
                    coordinates: e
                }
        }
    }
    var r = n(6),
        s = n(23),
        o = n(2).feature,
        a = n(26).getGeom,
        u = n(3).flattenEach;
    t.exports = function(t, e) {
        var n = a(t),
            s = a(e),
            u = t.properties || {};
        if (n = i(n), s = i(s), !n) return null;
        if (!s) return o(n, u);
        var l = new r.io.GeoJSONReader,
            h = l.read(n),
            c = l.read(s),
            f = h.difference(c);
        if (f.isEmpty()) return null;
        var g = new r.io.GeoJSONWriter,
            d = g.write(f);
        return o(d, u)
    }
}, function(t, e, n) {
    var i = n(24).geometry,
        r = n(3).geomReduce;
    t.exports = function(t) {
        return r(t, function(t, e) {
            return t + i(e)
        }, 0)
    }
}, function(t, e, n) {
    function i(t) {
        var e, n = 0;
        switch (t.type) {
            case "Polygon":
                return r(t.coordinates);
            case "MultiPolygon":
                for (e = 0; e < t.coordinates.length; e++) n += r(t.coordinates[e]);
                return n;
            case "Point":
            case "MultiPoint":
            case "LineString":
            case "MultiLineString":
                return 0;
            case "GeometryCollection":
                for (e = 0; e < t.geometries.length; e++) n += i(t.geometries[e]);
                return n
        }
    }

    function r(t) {
        var e = 0;
        if (t && t.length > 0) {
            e += Math.abs(s(t[0]));
            for (var n = 1; n < t.length; n++) e -= Math.abs(s(t[n]))
        }
        return e
    }

    function s(t) {
        var e, n, i, r, s, u, l, h = 0,
            c = t.length;
        if (c > 2) {
            for (l = 0; l < c; l++) l === c - 2 ? (r = c - 2, s = c - 1, u = 0) : l === c - 1 ? (r = c - 1, s = 0, u = 1) : (r = l, s = l + 1, u = l + 2), e = t[r], n = t[s], i = t[u], h += (o(i[0]) - o(e[0])) * Math.sin(o(n[1]));
            h = h * a.RADIUS * a.RADIUS / 2
        }
        return h
    }

    function o(t) {
        return t * Math.PI / 180
    }
    var a = n(25);
    t.exports.geometry = i, t.exports.ring = s
}, function(t, e) {
    t.exports.RADIUS = 6378137, t.exports.FLATTENING = 1 / 298.257223563, t.exports.POLAR_RADIUS = 6356752.3142
}, function(t, e) {
    function n(t) {
        if (!t) throw new Error("obj is required");
        var e = i(t);
        if (e.length > 1 && "number" == typeof e[0] && "number" == typeof e[1]) return e;
        throw new Error("Coordinate is not a valid Point")
    }

    function i(t) {
        if (!t) throw new Error("obj is required");
        var e;
        if (t.length ? e = t : t.coordinates ? e = t.coordinates : t.geometry && t.geometry.coordinates && (e = t.geometry.coordinates), e) return r(e), e;
        throw new Error("No valid coordinates")
    }

    function r(t) {
        if (t.length > 1 && "number" == typeof t[0] && "number" == typeof t[1]) return !0;
        if (Array.isArray(t[0]) && t[0].length) return r(t[0]);
        throw new Error("coordinates must only contain numbers")
    }

    function s(t, e, n) {
        if (!e || !n) throw new Error("type and name required");
        if (!t || t.type !== e) throw new Error("Invalid input to " + n + ": must be a " + e + ", given " + t.type)
    }

    function o(t, e, n) {
        if (!t) throw new Error("No feature passed");
        if (!n) throw new Error(".featureOf() requires a name");
        if (!t || "Feature" !== t.type || !t.geometry) throw new Error("Invalid input to " + n + ", Feature with geometry required");
        if (!t.geometry || t.geometry.type !== e) throw new Error("Invalid input to " + n + ": must be a " + e + ", given " + t.geometry.type)
    }

    function a(t, e, n) {
        if (!t) throw new Error("No featureCollection passed");
        if (!n) throw new Error(".collectionOf() requires a name");
        if (!t || "FeatureCollection" !== t.type) throw new Error("Invalid input to " + n + ", FeatureCollection required");
        for (var i = 0; i < t.features.length; i++) {
            var r = t.features[i];
            if (!r || "Feature" !== r.type || !r.geometry) throw new Error("Invalid input to " + n + ", Feature with geometry required");
            if (!r.geometry || r.geometry.type !== e) throw new Error("Invalid input to " + n + ": must be a " + e + ", given " + r.geometry.type)
        }
    }

    function u(t) {
        if (!t) throw new Error("geojson is required");
        if (void 0 !== t.geometry) return t.geometry;
        if (t.coordinates || t.geometries) return t;
        throw new Error("geojson must be a valid Feature or Geometry Object")
    }

    function l(t) {
        if (!t) throw new Error("geojson is required");
        var e = u(t);
        if (e) return e.type
    }
    t.exports = {
        geojsonType: s,
        collectionOf: a,
        featureOf: o,
        getCoord: n,
        getCoords: i,
        containsNumber: r,
        getGeom: u,
        getGeomType: l
    }
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = {
        _initDraggableLayer: function() {
            this._tempDragCoord = null;
            var t = this._layer._path;
            L.DomUtil.addClass(t, "leaflet-pm-draggable"), this._originalMapDragState = this._layer._map.dragging._enabled, this._safeToCacheDragState = !0, this._layer.on("mousedown", this._dragMixinOnMouseDown, this)
        },
        _dragMixinOnMouseUp: function() {
            var t = this,
                e = this._layer._path;
            return this._originalMapDragState && this._layer._map.dragging.enable(), this._safeToCacheDragState = !0, this._layer._map.off("mousemove", this._dragMixinOnMouseMove, this), this._layer.off("mouseup", this._dragMixinOnMouseUp, this), !!this._dragging && (this._initMarkers(), window.setTimeout(function() {
                t._dragging = !1, L.DomUtil.removeClass(e, "leaflet-pm-dragging"), t._layer.fire("pm:dragend"), t._fireEdit()
            }, 10), !0)
        },
        _dragMixinOnMouseMove: function(t) {
            var e = this._layer._path;
            this._dragging || (this._dragging = !0, L.DomUtil.addClass(e, "leaflet-pm-dragging"), this._layer.bringToFront(), this._originalMapDragState && this._layer._map.dragging.disable(), this._markerGroup.clearLayers(), this._layer.fire("pm:dragstart")), this._onLayerDrag(t)
        },
        _dragMixinOnMouseDown: function(t) {
            this._safeToCacheDragState && (this._originalMapDragState = this._layer._map.dragging._enabled, this._safeToCacheDragState = !1), this._tempDragCoord = t.latlng, this._layer.on("mouseup", this._dragMixinOnMouseUp, this), this._layer._map.on("mousemove", this._dragMixinOnMouseMove, this)
        },
        dragging: function() {
            return this._dragging
        },
        _onLayerDrag: function(t) {
            var e = t.latlng,
                n = {
                    lat: e.lat - this._tempDragCoord.lat,
                    lng: e.lng - this._tempDragCoord.lng
                },
                i = function(t) {
                    return t.map(function(t) {
                        return {
                            lat: t.lat + n.lat,
                            lng: t.lng + n.lng
                        }
                    })
                },
                r = void 0;
            r = this.isPolygon() ? this._layer._latlngs.map(i, this) : i(this._layer._latlngs), this._layer.setLatLngs(r).redraw(), this._tempDragCoord = e, this._layer.fire("pm:drag")
        }
    };
    e.default = i
}, function(t, e, n) {
    "use strict";
    var i = n(1);
    (function(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    })(i).default.LayerGroup = L.Class.extend({
        initialize: function(t) {
            var e = this;
            this._layerGroup = t, this._layers = this.findLayers(), this._layers.forEach(function(t) {
                return e._initLayer(t)
            }), this._layerGroup.on("layeradd", function(t) {
                e._layers = e.findLayers(), t.layer.pm && e._initLayer(t.layer), t.target.pm.enabled() && e.enable(e.getOptions())
            })
        },
        findLayers: function() {
            var t = this._layerGroup.getLayers();
            return t = t.filter(function(t) {
                return !!t.pm
            })
        },
        _initLayer: function(t) {
            var e = this;
            ["pm:edit", "pm:remove", "pm:dragstart", "pm:drag", "pm:dragend", "pm:snap", "pm:unsnap", "pm:cut", "pm:raiseMarkers", "pm:markerdragend", "pm:markerdragstart"].forEach(function(n) {
                t.on(n, e._fireEvent, e)
            }), t.pm._layerGroup = this._layerGroup
        },
        _fireEvent: function(t) {
            this._layerGroup.fireEvent(t.type, t)
        },
        toggleEdit: function(t) {
            this._options = t, this._layers.forEach(function(e) {
                e.pm.toggleEdit(t)
            })
        },
        enable: function(t) {
            this._options = t, this._layers.forEach(function(e) {
                e.pm.enable(t)
            })
        },
        disable: function() {
            this._layers.forEach(function(t) {
                t.pm.disable()
            })
        },
        enabled: function() {
            return !!this._layers.find(function(t) {
                return t.pm.enabled()
            })
        },
        dragging: function() {
            return !!this._layers.find(function(t) {
                return t.pm.dragging()
            })
        },
        getOptions: function() {
            return this._options
        }
    })
}, function(t, e, n) {
    "use strict";
    var i = n(1),
        r = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(i);
    r.default.Marker = r.default.extend({
        initialize: function(t) {
            this._layer = t, this._enabled = !1, this._layer.on("dragend", this._onDragEnd, this)
        },
        toggleEdit: function(t) {
            this.enabled() ? this.disable() : this.enable(t)
        },
        enable: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
                draggable: !0,
                snappable: !0
            };
            this.options = t, this._map = this._layer._map, this.enabled() || (this._enabled = !0, this._layer.on("contextmenu", this._removeMarker, this), this.options.draggable && this._layer.dragging.enable(), this.options.snappable && this._initSnappableMarkers())
        },
        enabled: function() {
            return this._enabled
        },
        disable: function() {
            this._enabled = !1, this._layer.dragging.disable(), this._layer.off("contextmenu", this._removeMarker, this)
        },
        _removeMarker: function(t) {
            var e = t.target;
            e.remove(), e.fire("pm:remove")
        },
        _onDragEnd: function(t) {
            t.target.fire("pm:edit")
        },
        _initSnappableMarkers: function() {
            var t = this._layer;
            this.options.snapDistance = this.options.snapDistance || 30, t.off("drag", this._handleSnapping, this), t.on("drag", this._handleSnapping, this), t.off("dragend", this._cleanupSnapping, this), t.on("dragend", this._cleanupSnapping, this), t.off("pm:dragstart", this._unsnap, this), t.on("pm:dragstart", this._unsnap, this)
        }
    })
}, function(t, e, n) {
    "use strict";

    function i(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    var r = n(5),
        s = i(r),
        o = n(1),
        a = i(o);
    a.default.Line = a.default.extend({
        initialize: function(t) {
            this._layer = t, this._enabled = !1
        },
        toggleEdit: function(t) {
            this.enabled() ? this.disable() : this.enable(t)
        },
        enable: function(t) {
            L.Util.setOptions(this, t), this._map = this._layer._map, this._map && (this.enabled() || this.disable(), this._enabled = !0, this._initMarkers(), this._layer.on("remove", this._onLayerRemove, this), this.options.allowSelfIntersection || this._layer.on("pm:vertexremoved", this._handleSelfIntersectionOnVertexRemoval, this), this.options.draggable && this._initDraggableLayer(), this.options.allowSelfIntersection || this._handleLayerStyle())
        },
        _onLayerRemove: function(t) {
            this.disable(t.target)
        },
        enabled: function() {
            return this._enabled
        },
        disable: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this._layer;
            if (!this.enabled()) return !1;
            if (t.pm._dragging) return !1;
            t.pm._enabled = !1, t.pm._markerGroup.clearLayers(), t.off("mousedown"), t.off("mouseup"), this._layer.off("remove", this._onLayerRemove), this.options.allowSelfIntersection || this._layer.off("pm:vertexremoved", this._handleSelfIntersectionOnVertexRemoval);
            var e = t._path;
            return L.DomUtil.removeClass(e, "leaflet-pm-draggable"), this.hasSelfIntersection() && L.DomUtil.removeClass(e, "leaflet-pm-invalid"), !0
        },
        hasSelfIntersection: function() {
            return (0, s.default)(this._layer.toGeoJSON()).features.length > 0
        },
        _handleSelfIntersectionOnVertexRemoval: function() {
            this._handleLayerStyle(!0), this.hasSelfIntersection() && (this._layer.setLatLngs(this._coordsBeforeEdit), this._coordsBeforeEdit = null, this._initMarkers())
        },
        _handleLayerStyle: function(t) {
            var e = this._layer._path;
            if (this.hasSelfIntersection()) {
                if (L.DomUtil.hasClass(e, "leaflet-pm-invalid")) return;
                t ? (L.DomUtil.addClass(e, "leaflet-pm-invalid"), window.setTimeout(function() {
                    L.DomUtil.removeClass(e, "leaflet-pm-invalid")
                }, 200)) : L.DomUtil.addClass(e, "leaflet-pm-invalid"), this._layer.fire("pm:intersect", {
                    intersection: (0, s.default)(this._layer.toGeoJSON())
                })
            } else L.DomUtil.removeClass(e, "leaflet-pm-invalid")
        },
        _initMarkers: function() {
            var t = this,
                e = this._map,
                n = this._layer.getLatLngs();
            this._markerGroup && this._markerGroup.clearLayers(), this._markerGroup = new L.LayerGroup, this._markerGroup._pmTempLayer = !0, e.addLayer(this._markerGroup);
            var i = function(e) {
                var n = e.map(t._createMarker, t);
                return e.map(function(i, r) {
                    var s = void 0;
                    return s = t.isPolygon() ? (r + 1) % e.length : r + 1, t._createMiddleMarker(n[r], n[s])
                }), n
            };
            this._markers = [], this.isPolygon() ? this._markers = n.map(i, this) : this._markers = i(n), this.options.snappable && this._initSnappableMarkers()
        },
        _createMarker: function(t) {
            var e = new L.Marker(t, {
                draggable: !0,
                icon: L.divIcon({
                    className: "marker-icon"
                })
            });
            return e._pmTempLayer = !0, e.on("dragstart", this._onMarkerDragStart, this), e.on("move", this._onMarkerDrag, this), e.on("dragend", this._onMarkerDragEnd, this), e.on("contextmenu", this._removeMarker, this), this._markerGroup.addLayer(e), e
        },
        _createMiddleMarker: function(t, e) {
            var n = this;
            if (!t || !e) return !1;
            var i = this._calcMiddleLatLng(t.getLatLng(), e.getLatLng()),
                r = this._createMarker(i),
                s = L.divIcon({
                    className: "marker-icon marker-icon-middle"
                });
            return r.setIcon(s), t._middleMarkerNext = r, e._middleMarkerPrev = r, r.on("click", function() {
                var i = L.divIcon({
                    className: "marker-icon"
                });
                r.setIcon(i), n._addMarker(r, t, e)
            }), r.on("movestart", function() {
                r.on("moveend", function() {
                    var t = L.divIcon({
                        className: "marker-icon"
                    });
                    r.setIcon(t), r.off("moveend")
                }), n._addMarker(r, t, e)
            }), r
        },
        _addMarker: function(t, e, n) {
            t.off("movestart"), t.off("click");
            var i = t.getLatLng(),
                r = this._layer._latlngs,
                s = this.findMarkerIndex(this._markers, n),
                o = s.ringIndex,
                a = s.index,
                u = o > -1 ? r[o] : r,
                l = o > -1 ? this._markers[o] : this._markers;
            u.splice(a, 0, i), l.splice(a, 0, t), this._layer.setLatLngs(r), this._createMiddleMarker(e, t), this._createMiddleMarker(t, n), this._fireEdit(), this._layer.fire("pm:vertexadded", {
                layer: this._layer,
                marker: t,
                index: a,
                ringIndex: o
            }), this.options.snappable && this._initSnappableMarkers()
        },
        _removeMarker: function(t) {
            if (!this.options.allowSelfIntersection) {
                var e = this._layer.getLatLngs();
                this._coordsBeforeEdit = JSON.parse(JSON.stringify(e))
            }
            var n = t.target,
                i = this._layer.getLatLngs(),
                r = this.findMarkerIndex(this._markers, n),
                s = r.ringIndex,
                o = r.index,
                a = s > -1 ? i[s] : i,
                u = s > -1 ? this._markers[s] : this._markers;
            if (-1 !== this.findMarkerIndex(this._markers, n).index) {
                a.splice(o, 1), this._layer.setLatLngs(i), a.length <= 1 && (i.splice(s, 1), this._layer.setLatLngs(i), this.disable(), this.enable(this.options)), i.length < 1 && this._layer.remove(), n._middleMarkerPrev && this._markerGroup.removeLayer(n._middleMarkerPrev), n._middleMarkerNext && this._markerGroup.removeLayer(n._middleMarkerNext), this._markerGroup.removeLayer(n);
                var l = void 0,
                    h = void 0;
                if (this.isPolygon() ? (l = (o + 1) % u.length, h = (o + (u.length - 1)) % u.length) : (h = o - 1 < 0 ? void 0 : o - 1, l = o + 1 >= u.length ? void 0 : o + 1), l !== h) {
                    var c = u[h],
                        f = u[l];
                    this._createMiddleMarker(c, f)
                }
                u.splice(o, 1), this._fireEdit(), this._layer.fire("pm:vertexremoved", {
                    layer: this._layer,
                    marker: n,
                    index: o,
                    ringIndex: s
                })
            }
        },
        findMarkerIndex: function(t, e) {
            var n = void 0,
                i = void 0;
            return this.isPolygon() ? i = t.findIndex(function(t) {
                return (n = t.findIndex(function(t) {
                    return e._leaflet_id === t._leaflet_id
                })) > -1
            }) : n = t.findIndex(function(t) {
                return e._leaflet_id === t._leaflet_id
            }), {
                index: n,
                ringIndex: i
            }
        },
        updatePolygonCoordsFromMarkerDrag: function(t) {
            var e = this._layer.getLatLngs(),
                n = this.findMarkerIndex(this._markers, t),
                i = n.ringIndex,
                r = n.index;
            (i > -1 ? e[i] : e).splice(r, 1, t.getLatLng()), this._layer.setLatLngs(e).redraw()
        },
        _onMarkerDrag: function(t) {
            var e = t.target;
            if (-1 !== this.findMarkerIndex(this._markers, e).index) {
                this.updatePolygonCoordsFromMarkerDrag(e);
                var n = this.findMarkerIndex(this._markers, e),
                    i = n.ringIndex,
                    r = n.index,
                    s = i > -1 ? this._markers[i] : this._markers,
                    o = (r + 1) % s.length,
                    a = (r + s.length - 1) % s.length,
                    u = e.getLatLng(),
                    l = s[a].getLatLng(),
                    h = s[o].getLatLng();
                if (e._middleMarkerNext) {
                    var c = this._calcMiddleLatLng(u, h);
                    e._middleMarkerNext.setLatLng(c)
                }
                if (e._middleMarkerPrev) {
                    var f = this._calcMiddleLatLng(u, l);
                    e._middleMarkerPrev.setLatLng(f)
                }
                this.options.allowSelfIntersection || this._handleLayerStyle()
            }
        },
        _onMarkerDragEnd: function(t) {


            console.log("DROPPED!! ");
            var e = t.target,
                n = this.findMarkerIndex(this._markers, e),
                i = n.ringIndex,
                r = n.index;
            if (!this.options.allowSelfIntersection && this.hasSelfIntersection()) return this._layer.setLatLngs(this._coordsBeforeEdit), this._coordsBeforeEdit = null, this._initMarkers(), void this._handleLayerStyle();
            this._layer.fire("pm:markerdragend", {
                markerEvent: t,
                ringIndex: i,
                index: r
            }), this._fireEdit()
        },
        _onMarkerDragStart: function(t) {
            var e = t.target,
                n = this.findMarkerIndex(this._markers, e),
                i = n.ringIndex,
                r = n.index;
            this._layer.fire("pm:markerdragstart", {
                markerEvent: t,
                ringIndex: i,
                index: r
            }), this.options.allowSelfIntersection || (this._coordsBeforeEdit = this._layer.getLatLngs())
        },
        _fireEdit: function() {
            this._layer.edited = !0, this._layer.fire("pm:edit")
        },
        _calcMiddleLatLng: function(t, e) {
            var n = this._map,
                i = n.project(t),
                r = n.project(e);
            return n.unproject(i._add(r)._divideBy(2))
        }
    })
}, function(t, e, n) {
    "use strict";
    var i = n(1),
        r = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(i);
    r.default.Poly = r.default.Line.extend({})
}, function(t, e, n) {
    "use strict";
    var i = n(1),
        r = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(i);
    r.default.Rectangle = r.default.Poly.extend({
        _initMarkers: function() {
            var t = this._map,
                e = this._findCorners();
            this._markerGroup && this._markerGroup.clearLayers(), this._markerGroup = new L.LayerGroup, this._markerGroup._pmTempLayer = !0, t.addLayer(this._markerGroup), this._markers = [], this._markers[0] = e.map(this._createMarker, this), this._cornerMarkers = this._markers[0], this.options.snappable && this._initSnappableMarkers()
        },
        _createMarker: function(t, e) {
            var n = new L.Marker(t, {
                draggable: !0,
                icon: L.divIcon({
                    className: "marker-icon"
                })
            });
            return n._origLatLng = t, n._index = e, n._pmTempLayer = !0, n.on("dragstart", this._onMarkerDragStart, this), n.on("drag", this._onMarkerDrag, this), n.on("dragend", this._onMarkerDragEnd, this), n.on("contextmenu", this._removeMarker, this), n.on("pm:snap", this._adjustRectangleForMarkerSnap, this), this._markerGroup.addLayer(n), n
        },
        _removeMarker: function(t) {
            return null
        },
        _onMarkerDragStart: function(t) {
            var e = t.target,
                n = this._findCorners();
            e._oppositeCornerLatLng = n[(e._index + 2) % 4], e._snapped = !1
        },
        _onMarkerDrag: function(t) {
            var e = t.target;
            void 0 !== e._index && (e._snapped || this._adjustRectangleForMarkerMove(e))
        },
        _onMarkerDragEnd: function(t) {
            var e = this._findCorners();
            this._adjustAllMarkers(e), this._cornerMarkers.forEach(function(t) {
                delete t._oppositeCornerLatLng
            }), this._layer.setLatLngs(e), this._layer.redraw()
        },
        _adjustRectangleForMarkerMove: function(t) {
            L.extend(t._origLatLng, t._latlng);
            var e = t.getLatLng();
            this._layer.setBounds(L.latLngBounds(e, t._oppositeCornerLatLng)), this._adjustAdjacentMarkers(t), this._layer.redraw()
        },
        _adjustRectangleForMarkerSnap: function(t) {
            if (this.options.snappable) {
                var e = t.target;
                this._adjustRectangleForMarkerMove(e)
            }
        },
        _adjustAllMarkers: function(t) {
            if (!t.length || 4 != t.length) return void console.error("_adjustAllMarkers() requires an array of EXACTLY 4 LatLng coordinates");
            this._cornerMarkers.forEach(function(e, n) {
                e.setLatLng(t[n])
            })
        },
        _adjustAdjacentMarkers: function(t) {
            if (!t || !t.getLatLng || !t._oppositeCornerLatLng) return void console.error("_adjustAdjacentMarkers() requires a valid Marker object");
            var e = t.getLatLng(),
                n = t._oppositeCornerLatLng,
                i = [];
            this._findCorners().forEach(function(t) {
                t.equals(e) || t.equals(n) || i.push(t)
            });
            var r = 0;
            2 == i.length && this._cornerMarkers.forEach(function(t) {
                var s = t.getLatLng();
                s.equals(e) || s.equals(n) || (t.setLatLng(i[r]), r++)
            })
        },
        _findCorners: function() {
            var t = this._layer.getBounds();
            return [t.getNorthWest(), t.getNorthEast(), t.getSouthEast(), t.getSouthWest()]
        }
    })
}, function(t, e, n) {
    "use strict";
    var i = n(1),
        r = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(i);
    r.default.Circle = r.default.extend({
        initialize: function(t) {
            this._layer = t, this._enabled = !1
        },
        toggleEdit: function(t) {
            this.enabled() ? this.disable() : this.enable(t)
        },
        enabled: function() {
            return this._enabled
        },
        enable: function() {
            var t = this,
                e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            this.options = e, this._map = this._layer._map, this.enabled() || this.disable(), this._enabled = !0, this._initMarkers(), this._layer.on("remove", function(e) {
                t.disable(e.target)
            })
        },
        disable: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this._layer;
            if (!this.enabled()) return !1;
            if (t.pm._dragging) return !1;
            t.pm._enabled = !1, t.pm._layerGroup.clearLayers(), t.off("mousedown"), t.off("mouseup");
            var e = t._path;
            return L.DomUtil.removeClass(e, "leaflet-pm-draggable"), !0
        },
        _initMarkers: function() {
            var t = this._map;
            this._layerGroup && this._layerGroup.clearLayers(), this._layerGroup = new L.LayerGroup, t.addLayer(this._layerGroup);
            var e = this._layer.getLatLng(),
                n = this._layer._radius,
                i = this._getLatLngOnCircle(e, n);
            this._centerMarker = this._createCenterMarker(e), this._outerMarker = this._createOuterMarker(i), this._markers = [this._centerMarker, this._outerMarker], this._createHintLine(this._centerMarker, this._outerMarker), this.options.snappable && this._initSnappableMarkers()
        },
        _getLatLngOnCircle: function(t, e) {
            var n = this._map.project(t),
                i = L.point(n.x + e, n.y);
            return this._map.unproject(i)
        },
        _resizeCircle: function() {
            this._syncHintLine(), this._syncCircleRadius(), this._fireEdit()
        },
        _moveCircle: function(t) {
            var e = t.latlng;
            this._layer.setLatLng(e);
            var n = this._layer._radius,
                i = this._getLatLngOnCircle(e, n);
            this._outerMarker.setLatLng(i), this._syncHintLine(), this._fireEdit()
        },
        _syncCircleRadius: function() {
            var t = this._centerMarker.getLatLng(),
                e = this._outerMarker.getLatLng(),
                n = t.distanceTo(e);
            this._layer.setRadius(n)
        },
        _syncHintLine: function() {
            var t = this._centerMarker.getLatLng(),
                e = this._outerMarker.getLatLng();
            this._hintline.setLatLngs([t, e])
        },
        _createHintLine: function(t, e) {
            var n = t.getLatLng(),
                i = e.getLatLng();
            this._hintline = L.polyline([n, i], this.options.hintlineStyle), this._hintline._pmTempLayer = !0, this._layerGroup.addLayer(this._hintline)
        },
        _createCenterMarker: function(t) {
            var e = this._createMarker(t);
            return e.on("move", this._moveCircle, this), e
        },
        _createOuterMarker: function(t) {
            var e = this._createMarker(t);
            return e.on("move", this._resizeCircle, this), e
        },
        _createMarker: function(t) {
            var e = new L.Marker(t, {
                draggable: !0,
                icon: L.divIcon({
                    className: "marker-icon"
                })
            });
            return e._origLatLng = t, e._pmTempLayer = !0, this._layerGroup.addLayer(e), e
        },
        _fireEdit: function() {
            this._layer.fire("pm:edit")
        }
    })
}, function(t, e) {}, function(t, e) {}]);