import b64 from 'base-64';
import firebase from '@firebase/app';
import NavigationService from '../services/NavigationService';
import {
    MODIFICA_EMAIL,
    MODIFICA_SENHA,
    MODIFICA_NOME,
    CADASTRO_USUARIO_SUCESSO,
    CADASTRO_USUARIO_ERRO,
    LOGIN_USUARIO_SUCESSO,
    LOGIN_USUARIO_ERRO,
    LOGIN_EM_ANDAMENTO,
    CADASTRO_EM_ANDAMENTO
 } from './types';

require('firebase/auth');
require('firebase/database');

export const modificaEmail = (texto) => ({
    // Action
    type: MODIFICA_EMAIL,
    payload: texto
});

export const modificaSenha = (senha) => ({
    type: MODIFICA_SENHA,
    payload: senha
});

export const modificaNome = (nome) => ({
    type: MODIFICA_NOME,
    payload: nome
});

export const cadastraUsuario = ({ nome, email, senha }) => (
    dispatch => {
        dispatch({ type: CADASTRO_EM_ANDAMENTO });

        const novoUsuario = firebase.auth();
        novoUsuario.createUserWithEmailAndPassword(email, senha)
            .then(() => {
                const emailB64 = b64.encode(email);
                firebase.database().ref(`/contatos/${emailB64}`)
                .push({ nome })
                .then(() => cadastroUsuarioSucesso(dispatch));
            })
            .catch(erro => cadastroUsuarioErro(erro, dispatch));
    }
);

const cadastroUsuarioSucesso = (dispatch) => {
    dispatch({
        type: CADASTRO_USUARIO_SUCESSO
    });
    NavigationService.navigate('BoasVindas');
};

const cadastroUsuarioErro = (erro, dispatch) => {
    let msgErro = '';
    if (erro.code === 'auth/weak-password') {
        msgErro = 'A senha precisa ter no mínimo 6 caracteres.';
    } else if (erro.code === 'auth/email-already-in-use') {
        msgErro = 'Email já cadastrado.';
    } else if (erro.code === 'auth/invalid-email') {
        msgErro = 'Email inválido.';
    } else if (erro.code === 'auth/operation-not-allowed') {
        msgErro = 'Conta desativada';
    } else {
        msgErro = 'ERRO - Contate o Suporte';
    }

    dispatch({
        type: CADASTRO_USUARIO_ERRO,
        payload: msgErro
    });
};

export const autenticarUsuario = ({ email, senha }) => (
    dispatch => {
        dispatch({ type: LOGIN_EM_ANDAMENTO });

        firebase.auth().signInWithEmailAndPassword(email, senha)
        .then(() => loginUsuarioSucesso(dispatch))
        .catch((erro) => loginUsuarioErro(dispatch, erro));
    }
);

const loginUsuarioSucesso = (dispatch) => {
    dispatch({
        type: LOGIN_USUARIO_SUCESSO
    });

    NavigationService.navigate('Principal');
};

const loginUsuarioErro = (dispatch, erro) => {
    dispatch({
        type: LOGIN_USUARIO_ERRO,
        payload: erro.message
    });
};

// export const autenticarUsuario = () => ({
//     type: 'teste'
// });
