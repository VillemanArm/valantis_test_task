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
            items: [],
            pages: 0,
            currentPage: 1,

        };

        
        this.getIdList = this.getIdList.bind(this);
        this.getItems = this.getItems.bind(this);
        this.generateHashKey = this.generateHashKey.bind(this);

    }


    async componentDidMount() {
        await this.setState({ headers: { 'X-Auth': this.generateHashKey() }})
        await this.getIdList();
        this.setState({pages: this.state.pages + 1})

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.pages !== this.state.pages) {
            this.getItems();
        }

    }

    async getIdList() {
        const body = { 	
            "action": "get_ids",
	        // "params": {"offset": 0, "limit": 1963} 
        }

        await axios
            .post(this.state.url, body, {headers: this.state.headers})
            .then(async (res) => {
                const idList = new Set([...res.data.result])
                await this.setState({ idList: [...idList] })
            })
            .catch((err) => console.log(err));
    }

    async getItems() {    

        const limit = 60
        const startQuery = this.state.items.length
        const finishQuery = this.state.pages * limit

        if (startQuery < finishQuery) {
            const body = { 	
                "action": "get_items",
                "params": {"ids": this.state.idList.slice(startQuery, finishQuery)}
            }
            
            await axios
                .post(this.state.url, body, {headers: this.state.headers})
                .then(async (res) => {
                    const uniqueItems = this.filterUniqueItems(res.data.result)
                    await this.setState({ items: [...this.state.items, ...uniqueItems] })
                })
                .catch((err) => console.log(err));
        }
    }

    filterUniqueItems(itemsArr) {
        const uniqueIds = new Set();

        const uniqueItems = itemsArr.filter(item => {
        if (!uniqueIds.has(item.id)) {
            uniqueIds.add(item.id);
            return true;
        }
        return false;
        });

        return uniqueItems
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
                    <ItemsList items={this.state.items.slice((this.state.currentPage - 1) * 50, this.state.currentPage * 50)}/>
                </main>
                {/* <Footer /> */}
            </React.StrictMode>
        )
    }

}

export default App;