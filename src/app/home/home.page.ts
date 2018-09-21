import { Component, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

	Coordinates: any;
  	watch:any;

	constructor(){}


	ngOnInit(){

		 /*Initializing geolocation*/
		let options = {
			frequency: 3000,
			enableHighAccuracy: true
		};

		navigator.geolocation.getCurrentPosition((geo) => {
			console.log('esta es la localizacion: ', geo.coords);
			
			this.Coordinates = geo.coords;
			this.executemap();
		});

	}

	executemap() {

     /*Initializing Map*/
		mapboxgl.accessToken = 'apy-key';
		var map = new mapboxgl.Map({
			style: 'mapbox://styles/mapbox/light-v9',
			center: [this.Coordinates.longitude, this.Coordinates.latitude],
			zoom: 16,
			pitch: 80,
			minZoom: 7.5, //restrict map zoom - buildings not visible beyond 13
			maxZoom: 17,
			container: 'map'
		});
		map.on('load', function() {
			map.addLayer({
				'id': '3d-buildings',
				'source': 'composite',
				'source-layer': 'building',
				'filter': ['==', 'extrude', 'true'],
				'type': 'fill-extrusion',
				'minzoom': 15,
				'paint': {
					'fill-extrusion-color': '#aaa',
					'fill-extrusion-height': {
						'type': 'identity',
						'property': 'height'
					},
					'fill-extrusion-base': {
						'type': 'identity',
						'property': 'min_height'
					},
					'fill-extrusion-opacity': .6
				}
			});
		});
	}


}
