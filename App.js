import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { Text, View, SafeAreaView } from "react-native";

import firebase from "firebase";

// import for Redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";
const store = createStore(rootReducer, applyMiddleware(thunk));

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
import RegisterScreen from "./components/auth/Register";
import LoginScreen from "./components/auth/Login";
import MainScreen from "./components/Main";
import AddScreen from "./components/main/Add";
import SaveScreen from "./components/main/Save";

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
                        <Stack.Screen
                            name="Register"
                            component={RegisterScreen}
                        />
                        <Stack.Screen name="Login" component={LoginScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
            );
        }

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Provider store={store}>
                    <StatusBar />
                    <NavigationContainer>
                        <Stack.Navigator initialRouteName="Main">
                            <Stack.Screen
                                name="Main"
                                component={MainScreen}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Add"
                                component={AddScreen}
                                navigation={this.props.navigation}
                            />
                            <Stack.Screen
                                name="Save"
                                component={SaveScreen}
                                navigation={this.props.navigation}
                            />
                        </Stack.Navigator>
                    </NavigationContainer>
                </Provider>
            </SafeAreaView>
        );
    }
}

export default App;
