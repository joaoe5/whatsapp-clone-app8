import React from 'react';
import { View, Text, StatusBar, Image, TouchableHighlight } from 'react-native';
import { TabBar } from 'react-native-tab-view';
import { connect } from 'react-redux';
import firebase from '@firebase/app';
import NavigationService from '../services/NavigationService';
import { habilitaInclusaoContato } from '../actions/AppActions';

require('firebase/auth');

const addContato = require('../imgs/adicionar-contato.png');

const TabBarMenu = props => (
    <View style={{ backgroundColor: '#115e54', elevation: 4, marginBottom: 9 }}>
        <StatusBar backgroundColor='#114d44' />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ height: 50, justifyContent: 'center' }}>
                <Text style={{ fontSize: 20, color: '#fff', marginLeft: 20 }}>WhatsApp Clone</Text>
            </View>

            <View style={{ flexDirection: 'row', marginRight: 30 }}>
                <View style={{ justifyContent: 'center', width: 60, alignItems: 'center' }}>
                    <TouchableHighlight
                    onPress={() => { 
                        NavigationService.navigate('AdicionarContato'); 
                        props.habilitaInclusaoContato();
                    }}
                    underlayColor='#114d44'
                    >
                        <Image source={addContato} />
                    </TouchableHighlight>
                </View>

                <View style={{ justifyContent: 'center' }}>
                    <TouchableHighlight
                        onPress={
                            () => firebase.auth().signOut().then(
                                () => NavigationService.navigate('FormLogin')
                            )
                        }
                        underlayColor='#114d44'
                    >
                        <Text style={{ fontSize: 25, color: '#fff' }}>Sair</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>

        <TabBar {...props} style={{ backgroundColor: '#115e54', elevation: 0 }} />
    </View>
);

export default connect(null, { habilitaInclusaoContato })(TabBarMenu);
