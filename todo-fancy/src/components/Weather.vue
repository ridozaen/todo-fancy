<template>
	<div class="col-sm-4 offset-sm-4 p-2"  v-if="currWeather">
		<div class="card-header blue-dark text-center">
			<span class="p-1">{{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}} {{new Date().toLocaleTimeString()}}</span>
		</div>
		<div class="card-body blue-light text-center">
			<h5 class="card-title">
				{{currWeather.city}}, {{currWeather.country}}
			</h5>
			<div class="card-text">
				<div class="celcius"><span>{{currWeather.result.main.temp}}°C</span>
				<img :src="'https://openweathermap.org/img/w/' + currWeather.result.weather[0].icon + '.png'"></div>
				<p>{{currWeather.result.weather[0].description}}</p>
			</div>
		</div>
	</div>
</template>
<script>
import axios from "axios";

// const baseUrl = "http://localhost:3000";

export default {
	data(){
		return{
			currWeather : null
		}
	},
	methods: {
		getWeather(){
			console.log('getWeather')
			axios.get(`/weather`,{headers:{Authorization:localStorage.getItem('curr-token')}})
			.then(response=>{
				console.log('response: ', response.data)
				this.currWeather = response.data
			})
			.catch(err=>{
				console.log(err.response)
			})
		}
	},
	created(){
		console.log('created weather')
		this.getWeather()
	}
};
</script>
<style scoped>
.blue-light {
  background-color: #bbdefb;
  opacity: 0.75;
  color: #0D47A1;
}
.blue-dark {
  background-color: #1565c0;
  opacity: 0.9;
  color: #fff;
  font-size: 9px;
  height: 35px;
  text-align: center;
}
.celcius{
	font-size: 35px;
	font-weight: 600;
}
</style>


