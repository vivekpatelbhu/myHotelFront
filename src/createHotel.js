import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from '../src/Home'
import axios from 'axios'
class App extends Component {
    constructor() {
        super();
        this.state={
            hotelName: "",
            localadd: "",
            city: "",
            state: "",
            phone: "",
            charge: "",
            roomService: true,
            gym:true,
            restaurant: true,
            parking: true,
            pool: true,
            wifi:true
        }

    }
    submitHandler = () => {
        let data = {
            hotelName: this.state.hotelName,
            localadd: this.state.localadd,
            city: this.state.city,
            state: this.state.state,
            phone: this.state.phone,
            charge: this.state.charge,
            roomService: this.state.roomService,
            gym: this.state.gym,
            restaurant: this.state.restaurant,
            parking: this.state.parking,
            pool: this.state.pool,
            wifi: this.state.wifi
        }
        axios({
            method: 'POST',
            url: 'http://localhost:5000/hotel/register/',
            headers: {
                'Accept': 'application/json',
            },
            data: data
        }).then((response) => {
            console.log('user plans ---------->', response.data);
        })
            .catch((error) => {
                console.log('error---> in documents', error.response)
            })
    }
    render() {
        return (
            <div
                style={{ marginLeft: "35%", marginTop: 50, border: "2px solid green", padding: 40, width: 200 }}
                className="crateHotelinputdiv"
            >
                <input type="text" value={this.state.hotelName} placeholder="Hotel Name" onChange={(e)=>this.setState({hotelName:e.target.value})}/>
                <input type="email" value={this.state.localadd} placeholder="Local Address" onChange={(e)=>this.setState({localadd:e.target.value})} />
                <input type="text" value={this.state.city} placeholder="Enter your City" onChange={(e)=>this.setState({city:e.target.value})}/>
                <input type="text" value={this.state.state} placeholder="State" onChange={(e)=>this.setState({state:e.target.value})}/>
                <input type="text" value={this.state.charge} placeholder="Charge" onChange={(e)=>this.setState({charge:e.target.value})} />

                <input type="text" value={this.state.phone} placeholder="Contact Number" onChange={(e)=>this.setState({phone:e.target.value})} />
                <p> Room Service <select value={this.state.value} onChange={(e)=>this.setState({roomService:e.target.value})}>
                    <option value="true">Yes</option>
                    <option value='false'>No</option>
                </select></p>

                <p>Restaurant<select value={this.state.value} onChange={(e)=>this.setState({restaurant:e.target.value})}>
                    <option value="true">Yes</option>
                    <option value='false'>No</option>
                </select></p>

                <p>Parking<select value={this.state.value} onChange={(e)=>this.setState({parking:e.target.value})}>
                    <option value="true">Yes</option>
                    <option value='false'>No</option>
                </select></p>

                <p>Gym & Spa<select value={this.state.value} onChange={(e)=>this.setState({gym:e.target.value})}>
                    <option value="true">Yes</option>
                    <option value='false'>No</option>
                </select></p>
                <p>Pool<select value={this.state.value} onChange={(e)=>this.setState({pool:e.target.value})}>
                    <option value="true">Yes</option>
                    <option value='false'>No</option>
                </select></p>
                <p>Wi-Fi<select value={this.state.value} onChange={(e)=>this.setState({wifi:e.target.value})}>
                    <option value="true">Yes</option>
                    <option value='false'>No</option>
                </select></p>
                {/* <input type="email" placeholder="GYM & SPA"/>
        <input type="email" placeholder="Resturant"/>
        <input type="email" placeholder="Parking"/>
        <input type="email" placeholder="Pool"/>
        <input type="email" placeholder="Wifi"/> */}
                <button onClick={this.submitHandler}>Submit</button>
            </div>
        );
    }
}

export default App;