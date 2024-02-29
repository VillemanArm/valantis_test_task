import React from 'react';
import './css/base.sass';
import axios from "axios";
import { md5 } from 'js-md5'
import Header from './components/Header'
import ItemsList from './components/ItemsList';

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
            searchQuery: '',
        };

        
        this.getIdList = this.getIdList.bind(this);
        this.getItems = this.getItems.bind(this);
        this.generateHashKey = this.generateHashKey.bind(this);
        this.setCurrentPage = this.setCurrentPage.bind(this);
        this.setSearchQuery = this.setSearchQuery.bind(this);

    }


    async componentDidMount() {
        await this.setState({ headers: { 'X-Auth': this.generateHashKey() }})
        const requestBody = {	
            "action": "get_ids",
	        // "params": {"offset": 0, "limit": 200}    
        }
        await this.getIdList(requestBody);

    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevState.idList.length !== this.state.idList.length 
            || prevState.pages !== this.state.pages ) {
            this.getItems();
        }
        if (this.state.currentPage > this.state.pages) {
            this.setState({pages: this.state.currentPage})
        }
        if (prevState.searchQuery !== this.state.searchQuery) {
            let requestBody
            if (this.state.searchQuery) {
                requestBody = { 	
                    "action": "filter",
                    "params": {"product": this.state.searchQuery}
                }
            } else {
                requestBody = {	
                    "action": "get_ids",
	                // "params": {"offset": 0, "limit": 200}    
                }
            }

            await this.getIdList(requestBody);          
            await this.setState({items: []})
            await this.setState({pages: 0})
            await this.setState({currentPage: 1})
        }
    }

    async getIdList(body) {
        await axios
            .post(this.state.url, body, {headers: this.state.headers})
            .then(async (res) => {
                await this.setState({idList: []}, () => { this.setState({ idList: [...res.data.result]}) })
            })
            .catch((err) => {
                console.log(err)
                this.getIdList(body)
            });
    }

    async getItems() {    
        const limit = 60
        const startQuery = this.state.items.length
        const finishQuery = (this.state.pages + 1) * limit

        if (startQuery < finishQuery) {
            const body = { 	
                "action": "get_items",
                "params": {"ids": this.state.idList.slice(startQuery, finishQuery)}
            }
            
            await axios
                .post(this.state.url, body, {headers: this.state.headers})
                .then(async (res) => {
                    const oldItems = this.state.items
                    const newItems = this.filterUniqueItems([...oldItems, ...res.data.result])
                    await this.setState({ items: [] }, () => {
                        this.setState({items: newItems})
                    })
                })
                .catch((err) => {
                    console.log(err)
                    this.getItems()
                });
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

    setCurrentPage(number) {
        let newCurrentPage = this.state.currentPage + number;
        if (newCurrentPage < 1) {newCurrentPage = 1};

        this.setState({currentPage: newCurrentPage});
    }

    generateHashKey() {
        let timeStamp = new Date()
        timeStamp = timeStamp.toLocaleDateString().split('.').reverse().join('')
        return md5(`${this.state.password}_${timeStamp}`)
    }

    setSearchQuery(searchQuery) {
         this.setState({searchQuery})
    }

    render () {
        return (
            <React.StrictMode>
                <Header searchFunc={this.setSearchQuery}/>
                <main>
                    <ItemsList 
                        items={this.state.items.slice((this.state.currentPage - 1) * 50, this.state.currentPage * 50)}
                        currentPage={this.state.currentPage}
                        setCurrentPage={this.setCurrentPage}
                    />
                </main>
            </React.StrictMode>
        )
    }

}

export default App;