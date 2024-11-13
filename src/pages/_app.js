

import React from 'react'; 
import { Provider } from 'react-redux';
import {store} from '../redux/store';
// import { setUser } from '../redux/userSlice';
// import helper from '../utils/Helper';
import '../index.css';

// const AppInitializer = ({ children }) => {
//     const dispatch = useDispatch();

//     useEffect(() => {
//         const userData = helper.getLocalStorageWithExpiration('wendogouser');
//         if (userData) {
//             dispatch(setUser(userData)); // Populate Redux store with user data
//         }
//     }, [dispatch]);

//     return children;
// };

const MyApp = ({ Component, pageProps }) => {
    return (
        <Provider store={store}>
            {/* <AppInitializer> */}
                <Component {...pageProps} />
            {/* </AppInitializer> */}
        </Provider>
    );
};

export default MyApp;


