/*
 *  gmlib.base.js 0.65 - for Google Maps API V3
 *
 *  Date: 2017.3.17
 *
 *  Copyright (c) 2011, 2014, 2015, 2017 AOK (aokura.com)
 *
 */
(function($) {

  $.Map.prototype.infoWindow = null;

  $.Map.prototype.markers = [];

  $.Map.prototype.addMarker = function(lat, lng, html, flag) {
    var marker = new $.Marker({
      map: this,
      position: new $.LatLng(lat, lng)
    });
    if (html) {
      $.event.addListener(marker, 'click', function() {
        var map = marker.getMap();
        map.infoWindow.setContent('' + html);
        map.infoWindow.open(map, marker);
      });
      if (flag === true) {
        $.event.addListenerOnce(this, 'tilesloaded', function() {
          $.event.trigger(marker, 'click');
        });
      }
    }
    this.markers.push(marker);
    return marker;
  };

  $.Map.prototype.findMarker = function(key, val) {
    var len = this.markers.length;
    for (var i = 0; i < len; i++)
      if (this.markers[i].get(key) == val)
        return this.markers[i];
    return null;
  };

  $.Map.prototype.setPanorama = function(pano) {
    this.setOptions({
      streetView: pano,
      streetViewControl: true
    });
    var map = this;
    $.event.addListener(pano, 'position_changed', function() {
      map.setCenter(pano.getPosition());
    });
  };

  var gc = new $.Geocoder();

  window.geocode = function(addr, handler, err_handler) {
    gc.geocode({ address:addr }, function(r, s) {
      if (s == $.GeocoderStatus.OK && 'function' == typeof handler) {
        var lat = r[0].geometry.location.lat();
        var lng = r[0].geometry.location.lng();
        handler(lat, lng);
      } else if (s == $.GeocoderStatus.OVER_QUERY_LIMIT) {
        setTimeout(function() {
          window.geocode(addr, handler, err_handler);
        }, 1000);
      } else if ('function' == typeof err_handler) {
        err_handler(s);
      }
    });
  };

  window.roadmap = function(id, lat, lng, zoom) {
    var opt = {
      center: new $.LatLng(lat, lng),
      mapTypeId: $.MapTypeId.ROADMAP,
      streetViewControl: false,
      zoom: zoom ? zoom : 14
    };
    var obj = ('string' == typeof id ? document.getElementById(id) : id);
    var map = new $.Map(obj, opt);
    map.infoWindow = new $.InfoWindow();
    $.event.addListener(map, 'click', function() {
      map.infoWindow.close();
    });
    return map;
  };

  window.panorama = function(id, lat, lng) {
    var obj = ('string' == typeof id ? document.getElementById(id) : id);
    var pano = new $.StreetViewPanorama(obj, {
      position: new $.LatLng(lat, lng)
    });
    return pano;
  };

})(google.maps);