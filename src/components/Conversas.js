import React, { Component } from 'react';
import { View, Text, ListView, StyleSheet, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { conversasUsuarioFetch } from '../actions/AppActions';
import NavigationService from '../services/NavigationService';

class Conversas extends Component {

    componentWillMount() {
        this.props.conversasUsuarioFetch();
        this.criaFonteDeDados(this.props.conversas);
    }

    componentWillReceiveProps(nextProps) {
        this.criaFonteDeDados(nextProps.conversas);
    }

    criaFonteDeDados(conversas) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.dataSource = ds.cloneWithRows(conversas);
    }

    renderRow(conversa) {
        return (
            <TouchableHighlight
                onPress={() => NavigationService.navigate('Conversa', {
                    title: conversa.nome,
                    contatoNome: conversa.nome,
                    contatoEmail: conversa.email
            })}
            >
                <View style={styles.containerView}>
                    <Text style={styles.texto}>{conversa.nome}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <ListView 
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={this.renderRow}
            />
        );
    }
}

const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        padding: 20,
        borderBottomWidth: 1,
        borderColor: '#ccc'
    },
    texto: {
        fontSize: 25
    }
});

const mapStateToProps = state => {
    const conversas = _.map(state.ListaConversasReducer, (val, uid) =>{
        return { ...val, uid };
    });
    return {
        conversas
    };
};

export default connect(mapStateToProps, { conversasUsuarioFetch })(Conversas);
