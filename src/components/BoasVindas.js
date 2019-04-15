import React from 'react';
import { View, Text, Button, Image, ImageBackground } from 'react-native';
import NavigationService from '../services/NavigationService';

const imgBackGround = require('../imgs/bg.png');
const logo = require('../imgs/logo.png');

export default props => (
    <ImageBackground source={imgBackGround} style={{ flex: 1 }}>
        <View style={{ flex: 1, padding: 15 }}>
            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 40, color: '#fff' }}>Seja Bem-Vindo!</Text>
                <Image source={logo} style={{ width: 100, height: 100, marginTop: 10 }} />
            </View>
            <View style={{ flex: 1 }}>
                <Button title='Fazer Login' onPress={() => NavigationService.navigate('FormLogin')} />
            </View>
        </View>
    </ImageBackground>
);
