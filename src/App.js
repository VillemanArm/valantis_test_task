import React from 'react';
import './css/base.sass';
import Header from './components/Header'
import ItemsList from './components/ItemsList';
// import Footer from './components/Footer'

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rates: "",
            targetCurrency: "none",
            result: "",
            isScrollbar: false,
        };

        // this.getRates = this.getRates.bind(this);

    }
    render () {
        return (
            <React.StrictMode>
                <Header />
                <main>
                <ItemsList/>
                </main>
                {/* <Footer /> */}
            </React.StrictMode>
        )
    }

}

export default App;