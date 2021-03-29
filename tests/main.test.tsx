import React, { Component } from 'react';
import { shallow } from 'enzyme';
import App from '../src/client/components/app';

describe('Testing rednering App component ', () => {
    it('renders without crashing', () => {
        shallow(<App />)
    });
});