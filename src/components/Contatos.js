import React, { Component } from 'react';
import { View, Text, ListView, StyleSheet, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { contatosUsuarioFetch } from '../actions/AppActions';
import NavigationService from '../services/NavigationService';

class Contatos extends Component {

    componentWillMount() {
        this.props.contatosUsuarioFetch();
        this.criaFonteDeDados(this.props.contatos);
    }

    componentWillReceiveProps(nextProps) {
        this.criaFonteDeDados(nextProps.contatos);
    }

    criaFonteDeDados(contatos) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.fonteDeDados = ds.cloneWithRows(contatos);
    }

    renderRow(contato) {
        return (
        <TouchableHighlight
            onPress={() => NavigationService.navigate('Conversa', {
                title: contato.nome,
                contatoNome: contato.nome,
                contatoEmail: contato.email
            })}
            underlayColor='#114d44'
        >
            <View style={styles.stView}>
                <Text style={styles.txtNome}>{contato.nome}</Text>
                <Text style={styles.txtEmail}>{contato.email}</Text>
            </View>
        </TouchableHighlight>
        );
    }

    render() {
        return (
            <ListView
                enableEmptySections
                dataSource={this.fonteDeDados}
                renderRow={this.renderRow}
            />
        );
    }
}

const styles = StyleSheet.create({
    stView: {
        flex: 1,
        padding: 20,
        borderBottomWidth: 1,
        borderColor: '#ccc'
    },
    txtNome: {
        fontSize: 25
    },
    txtEmail: {
        fontSize: 20
    }
});

const mapStateToProps = state => {
    const contatos = _.map(state.ListaContatosReducer, (val, uid) => ({
        ...val,
        uid
    }));
    // console.log(contatos);
    return {
        contatos
    };
};

export default connect(mapStateToProps, { contatosUsuarioFetch })(Contatos);
