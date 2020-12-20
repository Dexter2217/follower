import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import App from '../components/App';
//import MockedDashboard from '../components/Dashboard';
//import MockedLogin from '../components/Login';

jest.mock('../components/Dashboard', () => {
    return () => {
        return (<p id="mock-dashboard">Dashboard Component</p>);
    }
});
jest.mock('../components/Login', () => {
    return function mockLogin() {
        return (<p id="mock-login">Login Component</p>);
    }  
});
describe("The App Test Suite", () => {
    // jest.mock('../components/Dashboard', () => {
    //     return () => {
    //         return (<p id="mock-dashboard">Dashboard Component</p>);
    //     }
    // });
    // jest.mock('../components/Login', () => {
    //     return function mockLogin() {
    //         debugger;
    //         return (<p id="mock-login">Login Component</p>);
    //     }  
    // });
    
    let container = null;
    beforeEach (() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });
    
    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    })
    
    it('should render the Login component if no access token exists', () => {
        act(() => {
            render(<App />, container);
        });
    
        expect(container.querySelector('#mock-login').textContent).toEqual('Login Component');
    });
    
    it('should render the Dashboard component if an access token exists', () => {
    
        jest.spyOn(App.prototype, "getAccessToken").mockImplementation(() => {
            return true;
        });
    
        act(() => {
            render(<App />, container);
        });
    
        expect(container.querySelector('#mock-dashboard').textContent).toEqual('Dashboard Component');
    });

});
