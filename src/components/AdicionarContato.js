import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { modificaAdicionaContatoEmail, adicionaContato } from '../actions/AppActions';

class adicionarContato extends Component {
    renderAdicionarContato() {
        if (!this.props.cadastro_resultado_inclusao) {
            return (
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <TextInput 
                            placeholder='E-mail'
                            style={{ fontSize: 25, height: 45 }}
                            onChangeText={(texto) => this.props.modificaAdicionaContatoEmail(texto)}
                            value={this.props.adiciona_contato_email}
                        />
                    </View>
                    <View style={{ flex: 1, margin: 20 }}>
                        <Button 
                            title='Adicionar' 
                            color='#115e54' 
                            onPress={() => 
                                this.props.adicionaContato(this.props.adiciona_contato_email)} 
                        />
                    </View>
                    <View style={{ flex: 1 }}>  
                        <Text style={styles.txtErro} >
                            {this.props.cadastro_resultado_txt_erro}
                        </Text>
                    </View>
                </View>
            );
        } 
        return (
            <View>
                <Text style={{ fontSize: 25, textAlign: 'center' }}>
                    Cadastro realizado com sucesso!
                </Text>
            </View>
        );
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
                {this.renderAdicionarContato()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    txtErro: {
        color: '#8b0000',
        textAlign: 'center',
        paddingTop: 20,
        fontSize: 30,
        textShadowRadius: 30,
    }
});

const mapStateToProps = state => ({
    // Recupera a variável de estado gerenciada pelo reducer
    adiciona_contato_email: state.AppReducer.adiciona_contato_email,
    cadastro_resultado_txt_erro: state.AppReducer.cadastro_resultado_txt_erro,
    cadastro_resultado_inclusao: state.AppReducer.cadastro_resultado_inclusao
});

// Decoração do componente com o mapa
export default connect(mapStateToProps, { 
    modificaAdicionaContatoEmail, adicionaContato
})(adicionarContato);
