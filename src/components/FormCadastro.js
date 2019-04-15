import React, { Component } from 'react';
import { 
    View, 
    TextInput, 
    Button, 
    ImageBackground, 
    Text, 
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { 
    modificaEmail, 
    modificaSenha, 
    modificaNome, 
    cadastraUsuario 
} from '../actions/AutenticacaoActions';

const imgBackGround = require('../imgs/bg.png');

class formCadastro extends Component {
    static navigationOptions = {
        title: 'Novo Cadastro',
        headerStyle: {
            backgroundColor: '#115e54',
        },
        headerTitleStyle: {
            fontWeight: 'bold',
            color: '#fff'
        },
    };

    btcadastraUsuario() {
        const { nome, email, senha } = this.props;

        this.props.cadastraUsuario({ nome, email, senha });
    }

    renderBtnCadastro() {
        if (this.props.loading_cadastro) {
            return (
                <ActivityIndicator size='large' color='#fff' />
            );
        }
        return (
            <Button 
                title="Cadastrar" 
                color="#115E54" 
                onPress={() => this.btcadastraUsuario()} 
            />
        );
    }

    render() {
        return (
            <ImageBackground style={{ flex: 1 }} source={imgBackGround} >
                <View style={{ flex: 1, padding: 10 }}>
                    <View style={{ flex: 4, justifyContent: 'center' }}>
                        <TextInput 
                            value={this.props.nome} 
                            placeholder="Nome"
                            placeholderTextColor='#fff'
                            style={{ fontSize: 20, height: 45 }}
                            onChangeText={texto => this.props.modificaNome(texto)}
                        />
                        <TextInput 
                            value={this.props.email} 
                            placeholder="E-mail"
                            placeholderTextColor='#fff'
                            style={{ fontSize: 20, height: 45 }}
                            onChangeText={texto => this.props.modificaEmail(texto)}
                        />
                        <TextInput
                            secureTextEntry
                            value={this.props.senha} 
                            placeholder="Senha"
                            placeholderTextColor='#fff' 
                            style={{ fontSize: 20, height: 45 }}
                            onChangeText={texto => this.props.modificaSenha(texto)}
                        />
                        <Text style={styles.txtErro}>{this.props.erroCadastro}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        {this.renderBtnCadastro()}
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    txtErro: {
        color: '#8b0000',
        // fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 20,
        fontSize: 30,
        textShadowRadius: 30,
        textShadowColor: '#000'
    }
});

const mapStateToProps = state => ({
    nome: state.AutenticacaoReducer.nome,
    email: state.AutenticacaoReducer.email,
    senha: state.AutenticacaoReducer.senha,
    erroCadastro: state.AutenticacaoReducer.erroCadastro,
    loading_cadastro: state.AutenticacaoReducer.loading_cadastro
});

export default connect(mapStateToProps, 
    { 
        modificaEmail, 
        modificaSenha,
        modificaNome, 
        cadastraUsuario 
    })(formCadastro);
