import React from 'react';
import ReactDOM from 'react-dom';

import store from './store/configureStore';
import Conversion from './components/conversion.js';

class MainComponent extends React.Component {
    componentDidMount() {
        store.subscribe(() => {
            this.setState({});
        });
    }

    render() {
        return (
            <div>
                <Conversion originAmount={store.getState().originAmount} />
            </div>
        )
    }
}


ReactDOM.render(<MainComponent />, document.getElementById('container'));
