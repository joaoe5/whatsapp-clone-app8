import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { TabViewAnimated, SceneMap } from 'react-native-tab-view';
import TabBarMenu from './TabBarMenu';
import Conversas from './Conversas';
import Contatos from './Contatos';

export default class Principal extends Component {
    state = {
        index: 0,
        routes: [
        { key: 'conversas', title: 'Conversas' },
        { key: 'contatos', title: 'Contatos' },
        ],
    };

    handleChangeTab = index => this.setState({ index });
 
    renderHeader = props => <TabBarMenu {...props} />;

    renderScene = SceneMap({
        conversas: Conversas,
        contatos: Contatos
    })

    render() {
        return (
        <TabViewAnimated
            style={styles.container}
            navigationState={this.state}
            renderScene={this.renderScene}
            renderHeader={this.renderHeader}
            onRequestChangeTab={this.handleChangeTab}
        />
        );
    }
}

const styles = StyleSheet.create({
    txtTitulo: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 30
    },
    container: {
        flex: 1
    }
});
