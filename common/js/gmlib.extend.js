/*
 *  gmlib.extend.js 0.02 - for Google Maps API V3
 *
 *  Date: 2017.7.27
 *
 *  Copyright (c) 2017 AOK (aokura.com)
 *
 */
(function($) {

  $.Map.prototype.removeMarker = function(marker) {
    if (marker) {
      var latlng = marker.getPosition();
      for (var i in this.markers) {
        if (this.markers[i].getPosition().equals(latlng)) {
          this.markers[i].setMap(null);
          this.markers.splice(i, 1);
          break;
        }
      }
    } else {
      for (var i in this.markers) {
        this.markers[i].setMap(null);
      }
      this.markers = [];
    }
  };

  $.Map.prototype.setStyledMap = function(style, title, id) {
    var smt = new $.StyledMapType(style, { name:title });
    this.mapTypes.set(id, smt);
    this.setMapTypeId(id);
  };

  $.Map.prototype.fitMap = function() {
    var bound = new $.LatLngBounds(), c = 0;
    for (var i in this.markers) {
      if (this.markers[i].getVisible()) {
        bound.extend(this.markers[i].getPosition());
        c++;
      }
    }
    if (c > 0) this.fitBounds(bound);
    return c;
  };

  $.Map.prototype.selectMarkers = function(key, val, hide) {
    if (!val || val == '') {
      for (var i in this.markers) {
        this.markers[i].setVisible(!hide);
      }
    } else {
      for (var i in this.markers) {
        if (this.markers[i].get(key) == val) {
          this.markers[i].setVisible(!hide);
        } else {
          this.markers[i].setVisible(!!hide);
        }
      }
    }
  };

  if ($.Map.prototype.dump == undefined) {
    $.Map.prototype.dump = function() {
      return this.getCenter().toUrlValue() + ',' +
             this.getZoom() + ',' +
             this.getBounds().toUrlValue();
    };
  }

  $.Marker.prototype.popup = function(url, target, w, h) {
    var features = 'width='+w+',height='+h+',resizable=yes,scrollbars=yes';
    this.subwin = window.open('about:blank', target, features);
    if (this.subwin) {
      this.subwin.location.href = url;
      this.subwin.focus();
    }
  };

})(google.maps);