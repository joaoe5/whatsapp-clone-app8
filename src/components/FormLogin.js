import React, { Component } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    Button, 
    TouchableHighlight, 
    ImageBackground, 
    StyleSheet,
    ActivityIndicator,
    // O keyboardAvoindinView é usado no ajuste visual quando o teclado é utilizado
    KeyboardAvoidingView
} 
from 'react-native';
import { connect } from 'react-redux';
import { modificaEmail, modificaSenha, autenticarUsuario } from '../actions/AutenticacaoActions';

const imgBackGround = require('../imgs/bg.png');

class formLogin extends Component {
    // static navigationOptions = {
    //     header: {
    //         visible: false,
    //     }
    // }

    funcAutenticarUsuario() {
        const { email, senha } = this.props;
        this.props.autenticarUsuario({ email, senha });
    }

    renderBtnAcessar() {
        if (this.props.loading_login) {
            return (
                <ActivityIndicator size='large' color='#fff' />
            );
        }
        return (
            <Button 
                title="Acessar" 
                color='#115E54' 
                onPress={() => this.funcAutenticarUsuario()} 
            />
        );
    }

    render() {
        return (
            <ImageBackground source={imgBackGround} style={{ flex: 1 }}>
                <KeyboardAvoidingView style={{ flex: 1, padding: 10 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.txtTitulo}>WhatsApp Clone</Text>
                    </View>
                    <View style={{ flex: 2 }}>
                        <TextInput 
                            value={this.props.email} 
                            style={styles.campoEmail} 
                            placeholder='E-mail'
                            placeholderTextColor='#fff'
                            selectionColor={'#000'}
                            // underlineColorAndroid='#000'
                            onChangeText={texto => this.props.modificaEmail(texto)}
                        />
                        <TextInput
                            secureTextEntry 
                            value={this.props.senha} 
                            style={styles.campoSenha} 
                            placeholder='Senha'
                            placeholderTextColor='#fff'
                            onChangeText={senha => this.props.modificaSenha(senha)}
                        />
                        <TouchableHighlight 
                            onPress={() => this.props.navigation.navigate('FormCadastro')}
                        >
                            <Text 
                                style={styles.txtCadastrar}
                            >Ainda não tem cadastro? Cadastre-se</Text>
                        </TouchableHighlight>
                        <Text style={styles.txtErro}>
                            {this.props.erroLogin}
                        </Text>
                    </View>
                    <View style={styles.btnAcessar}>
                        {this.renderBtnAcessar()}
                    </View>
                </KeyboardAvoidingView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    txtCadastrar: {
        fontSize: 20,
        color: '#fff',
        textDecorationLine: 'underline',
        textAlign: 'center',
        paddingTop: 30
    },
    campoSenha: {
        fontSize: 20, 
        height: 45, 
        borderWidth: 0.5, 
        borderColor: '#fff',
        borderRadius: 5,
        marginTop: 10,
    },
    campoEmail: {
        fontSize: 20, 
        height: 45, 
        borderWidth: 0.5, 
        borderColor: '#fff',
        borderRadius: 5
    },
    txtTitulo: {
        fontSize: 30,
        color: '#fff', 
        fontWeight: 'bold'
    },
    btnAcessar: {
        flex: 2,
        marginHorizontal: 20
    },
    txtErro: {
        color: '#8b0000',
        // fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 20,
        fontSize: 30,
        textShadowRadius: 30,
        // textShadowColor: '#000'
    }
});

const mapStateToProps = state => ({
    email: state.AutenticacaoReducer.email,
    senha: state.AutenticacaoReducer.senha,
    erroLogin: state.AutenticacaoReducer.erroLogin,
    loading_login: state.AutenticacaoReducer.loading_login
});

export default connect(mapStateToProps, { 
    modificaEmail, modificaSenha, autenticarUsuario 
})(formLogin);
