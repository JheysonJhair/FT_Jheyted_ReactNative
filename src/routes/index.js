import { createNativeStackNavigator} from '@react-navigation/native-stack'

import Index from '../pages'
import Login from '../pages/autentication/login'
import Chat from '../pages/autentication/Chat'
import ProductCard from '../pages/dashboard/productCard';
import ProductScreen from '../pages/colection/productScreen';
import SelectedProduct from '../pages/products/selectedProducts';
import RegistroScreen from '../pages/autentication/registroScreen';

const Stack = createNativeStackNavigator();

export default function Routes(){
    return(
       <Stack.Navigator>
            <Stack.Screen name='Welcome' component={Index} options={{headerShown: false}}/>
            <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
            <Stack.Screen name='Chat' component={Chat} />
            <Stack.Screen name='ProductCard' component={ProductCard} options={{headerShown: false}}/>
            <Stack.Screen name="ProductScreen" component={ProductScreen} />
            <Stack.Screen name="SelectedProduct" component={SelectedProduct} />
            <Stack.Screen name='RegistroScreen' component={RegistroScreen} />
       </Stack.Navigator> 
    )
}
