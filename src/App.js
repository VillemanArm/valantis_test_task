import React from 'react';
import './css/base.sass';
import axios from "axios";
import { md5 } from 'js-md5'
import Header from './components/Header'
import ItemsList from './components/ItemsList';
// import Footer from './components/Footer'

class App extends React.Component {
    constructor(props) {
        super(props);

         this.state = {
            password: 'Valantis',
            idList: [],
            url: `http://api.valantis.store:40000/`,
            headers: {},
            goods: []
        };

        this.getIdList = this.getIdList.bind(this);
        this.getItems = this.getItems.bind(this);
        this.generateHashKey = this.generateHashKey.bind(this);

        // )
    }

    async componentDidMount() {
        await this.setState({ headers: { 'X-Auth': this.generateHashKey() }})
        await this.getIdList();

    }

    // componentDidUpdate(prevProps, prevState) {
    //     if (prevState.idList !== this.state.idList) {
    //         this.getGoods();
    //     }
    // }

    async getIdList() {
        const body = { 	
            "action": "get_ids",
	        "params": {"offset": 0, "limit": 50} 
        }

        await axios
            .post(this.state.url, body, {headers: this.state.headers})
            .then(async (res) => {
                await this.setState({ idList: [...res.data.result] })
                console.log(this.state.idList)
            })
            .catch((err) => console.log(err));
    }

    async getItems() {

        const body = { 	
            "action": "get_items",
            "params": {"ids": this.state.idList}
        }
        console.log('getGoods')

        await axios
            .post(this.state.url, body, {headers: this.state.headers})
            .then(async (res) => {
                await this.setState({ goods: [...res.data.result] })
                // console.log(res.data.result)
            })
            .catch((err) => console.log(err));
    }

    generateHashKey() {
        let timeStamp = new Date()
        timeStamp = timeStamp.toLocaleDateString().split('.').reverse().join('')
        return md5(`${this.state.password}_${timeStamp}`)
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