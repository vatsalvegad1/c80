import React, { Component } from 'react';
import { Text, View, Alert, StyleSheet } from 'react-native';
import axios from "axios";

export default class MeteorScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meteors: {},
        };
    }

    componentDidMount() {
        this.getMeteors();
    }

    getMeteors = () => {
        axios
            .get("https://api.nasa.gov/planetary/apod?api_key=cwrXjKNJ4V6URxJxUB8A5nXs9a9JLM4GxUk7jrls")
            .then(response => {
                this.setState({ meteors: response.data.near_earth_objects })
            })
            .catch(error => {
                Alert.alert(error.message)
            })
    }
    render() {
        if(Object.keys(this.state.meteors).length===0) {
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Text>Loading...</Text>
                </View>
            )
        }
        else{
        let meteor_arr=Object.keys(this.state.meteors).map(meteor_date=>{
            return this.state.meteors[meteor_date]
        })
        let meteors=[].concat.apply([],meteor_arr);
        meteors.forEach(function(element){
            let diameter=(element.estimated_diameter.kilometers.estimated_diameter_min + element.estimated_diameter.kilometers.estimated_diameter_max)/2
            let threatScore = (diameter/element.close_approach_data[0].miss_distance.kilometers)*1000000000
            element.threatScore=threatScore;
        });
        return(
            <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
                    <Text>Meteor Screen!</Text>
            </View>
        )
        }
    }
}