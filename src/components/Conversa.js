import React, { Component } from 'react';
import _ from 'lodash';
import { 
    View, 
    StyleSheet, 
    TextInput, 
    Image, 
    TouchableHighlight,
    ListView,
    Text
} from 'react-native';
import { connect } from 'react-redux';
import { modificaMensagem, enviarMensagem, conversaUsuarioFetch } from '../actions/AppActions';

const imagemEnviar = require('../imgs/enviar_mensagem.png');

class Conversa extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
        headerStyle: {
            backgroundColor: '#115e54',
        },
        headerTitleStyle: {
            fontWeight: 'bold',
            color: '#fff'
        },
    });

    componentWillMount() {
        this.props.conversaUsuarioFetch(this.props.navigation.state.params.contatoEmail);
        this.criaFonteDeDados(this.props.conversa);
    }

    componentWillReceiveProps(nextProps) {
        this.criaFonteDeDados(nextProps.conversa);
    }
 
    criaFonteDeDados(conversa) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.dataSource = ds.cloneWithRows(conversa);
    }

    funcEnviarMensagem() {
        const { mensagem } = this.props;
        const contatoNome = this.props.navigation.state.params.contatoNome;
        const contatoEmail = this.props.navigation.state.params.contatoEmail;

        this.props.enviarMensagem(mensagem, contatoNome, contatoEmail);
    }

    renderRow(texto) {
        if (texto.tipo === 'e') {
            return (
                <View style={styles.msgEnvio}>
                    <Text style={styles.txtMsgEnvio}>{texto.mensagem}</Text>
                </View>
            );
        }
        return (
            <View style={styles.msgRecebe}>
                <Text style={styles.txtMsgRecebe}>{texto.mensagem}</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.viewMensagens}>
                    <ListView 
                        enableEmptySections
                        dataSource={this.dataSource}
                        renderRow={this.renderRow}
                    />
                </View>

                <View style={styles.viewEnvio}>
                    <TextInput 
                    value={this.props.mensagem}
                    onChangeText={texto => this.props.modificaMensagem(texto)}
                    style={styles.entradaMsg} 
                    />

                    <TouchableHighlight 
                        onPress={this.funcEnviarMensagem.bind(this)}
                        underlayColor='#fff'
                    >
                        <Image source={imagemEnviar} />
                    </TouchableHighlight>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: 40,
        backgroundColor: '#eee4dc',
        padding: 10
    },
    viewMensagens: {
        flex: 1,
        paddingBottom: 20,
    },
    viewEnvio: {
        flexDirection: 'row',
        height: 60,
    },
    entradaMsg: {
        flex: 4,
        backgroundColor: '#fff',
        fontSize: 22,
        borderWidth: 0.5, 
        borderColor: '#000',
        borderRadius: 5
    },
    msgEnvio: {
        alignItems: 'flex-end',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 40
    },
    msgRecebe: {
        alignItems: 'flex-start',
        marginTop: 5,
        marginBottom: 5,
        marginRight: 40
    },
    txtMsgEnvio: {
        fontSize: 20,
        color: '#000',
        padding: 10,
        backgroundColor: '#dbf5b4',
        elevation: 1,
        borderRadius: 5
    },
    txtMsgRecebe: {
        fontSize: 20,
        color: '#000',
        padding: 10,
        backgroundColor: '#f7f7f7',
        elevation: 1,
        borderRadius: 5
    }
});

const mapStateToProps = state => {
    const conversa = _.map(state.ListaConversaReducer, (val, uid) => {
        return { ...val, uid };
    });
    
    return ({
        conversa,
        mensagem: state.AppReducer.mensagem
    });
};

// As Actions creator são decoradas aqui pelo connect
export default connect(mapStateToProps, { 
    modificaMensagem,
    enviarMensagem,
    conversaUsuarioFetch
})(Conversa);
