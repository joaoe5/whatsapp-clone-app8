import { combineReducers } from 'redux';
import AutenticacaoReducer from './AutenticacaoReducer';
import AppReducer from './AppReducer';
import ListaContatosReducer from './ListaContatosReducer';
import ListaConversaReducer from './ListaConversaReducer';
import ListaConversasReducer from './ListaConversasReducer';

// O combine reducer é utilizado no index para encaminhar os reducers
// para dentro do create store
export default combineReducers({
    AutenticacaoReducer,
    AppReducer,
    ListaContatosReducer,
    ListaConversaReducer,
    ListaConversasReducer
});
