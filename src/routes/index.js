import { createNativeStackNavigator} from '@react-navigation/native-stack'

import Index from '../pages'
import Login from '../pages/autentication/login'
import ProductCard from '../pages/dashboard/productCard';
import ProductScreen from '../pages/colection/productScreen';

const Stack = createNativeStackNavigator();

export default function Routes(){
    return(
       <Stack.Navigator>
            <Stack.Screen name='Welcome' component={Index} options={{headerShown: false}}/>
            <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
            <Stack.Screen name='ProductCard' component={ProductCard} options={{headerShown: false}}/>
            <Stack.Screen name="ProductScreen" component={ProductScreen} />
       </Stack.Navigator> 
    )
}
