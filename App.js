import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { Text, View } from "react-native";

import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCxKFuvEkLhuUYSK9SjY3CngmvY1m6TljY",
    authDomain: "instagram-clone-fcc-860a2.firebaseapp.com",
    projectId: "instagram-clone-fcc-860a2",
    storageBucket: "instagram-clone-fcc-860a2.appspot.com",
    messagingSenderId: "885431709440",
    appId: "1:885431709440:web:846162f27bb5a96d0bcde5",
    measurementId: "G-VWMQJB47D4",
};

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LandingScreen from "./components/auth/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

const Stack = createStackNavigator();

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        };
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                this.setState({
                    loggedIn: false,
                    loaded: true,
                });
            } else {
                this.setState({
                    loggedIn: true,
                    loaded: true,
                });
            }
        });
    }
    render() {
        const { loggedIn, loaded } = this.state;
        if (!loaded) {
            return (
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text>Loading...</Text>
                </View>
            );
        }

        if (!loggedIn) {
            return (
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Landing">
                        <Stack.Screen
                            name="Landing"
                            component={LandingScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen name="Register" component={Register} />
                        <Stack.Screen name="Login" component={Login} />
                    </Stack.Navigator>
                </NavigationContainer>
            );
        }

        return (
            <View style={{ flex: 1, justifyContent: "center" }}>
                <Text>User is Logged In</Text>
            </View>
        );
    }
}

export default App;
