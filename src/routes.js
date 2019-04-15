import { createStackNavigator, createAppContainer } from 'react-navigation';
// createSwitchNavigator,
// CreateSwitchNavigator impossibilita o usuário de voltar a página anterior, tipo logar e volt
import FormLogin from './components/FormLogin';
import FormCadastro from './components/FormCadastro';
import BoasVindas from './components/BoasVindas';
import Principal from './components/Principal';
import AdicionarContato from './components/AdicionarContato';
import Conversa from './components/Conversa';

const Routes = createAppContainer(
    createStackNavigator({
        // Principal: {
        //     screen: Principal,
        //     navigationOptions: {
        //         header: null
        //     }
        // },
        FormLogin: {
            screen: FormLogin,
            navigationOptions: {
                header: null
            }
        },
        Principal: {
            screen: Principal,
            navigationOptions: {
                header: null
            }
        },
        AdicionarContato: {
            screen: AdicionarContato,
            navigationOptions: {
                title: 'Adicionar Contato',
                headerStyle: {
                    backgroundColor: '#115e54',
                },
                headerTitleStyle: {
                    fontWeight: 'bold',
                    color: '#fff'
                },
            }
        },
        Conversa: {
            screen: Conversa,
        },
        FormCadastro: {
            screen: FormCadastro
        },
        BoasVindas: {
            screen: BoasVindas,
            navigationOptions: {
                header: null
            }
        },
        // App: createStackNavigator({
        //     FormCadastro
        // }),
    })
);

export default Routes;
