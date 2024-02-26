import React from "react";
import axios from "axios";
// import { ImPlus, ImCross } from "react-icons/im";
// import CurrencyBlock from "./CurrencyBlock";
// import CurrencyCalculator from "./CurrencyCalculator";

class ItemsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            idList: [],
            url: `http://api.valantis.store:40000/`,
            headers: { 'X-Auth': '70e9e15f52c7209ab6b6f80b795aa4f2' },
            goods: []
            // targetCurrency: "none",
            // result: "",
            // isScrollbar: false,
        };

        this.getIds = this.getIdList.bind(this);
        this.getGoods = this.getGoods.bind(this);
        // this.clearCurrencies = this.clearCurrencies.bind(this);
        // this.delCurrency = this.delCurrency.bind(this);
        // this.editCurrencyCurrency = this.editCurrencyCurrency.bind(this);
        // this.editCurrencyAmount = this.editCurrencyAmount.bind(this);
        // this.editTargetCurrency = this.editTargetCurrency.bind(this);
        // this.calculate = this.calculate.bind(this);
        // this.checkScrollbar = this.checkScrollbar.bind(this);
    }

    async componentDidMount() {
        this.getIdList();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.idList !== this.state.idList) {
            this.getGoods();
        }
    }

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

    async getGoods() {

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

    // addCurrency() {
    //     let currencyList = this.props.lastData;

    //     currencyList.push({
    //         id: currencyList[currencyList.length - 1].id + 1,
    //         currency: "none",
    //         amount: 0,
    //         error: "",
    //     });

    //     this.props.sendLastData(currencyList);
    // }

    // async clearCurrencies() {
    //     const currencyList = [
    //         {
    //             id: 1,
    //             currency: "none",
    //             amount: 0,
    //             error: "",
    //         },
    //     ];

    //     await this.props.sendLastData(currencyList);
    //     await this.setState({ result: "", isScrollbar: false });
    // }

    // async delCurrency(id) {
    //     const currencies = this.props.lastData.filter(
    //         (element) => element.id !== id
    //     );
    //     this.setState({ result: "" });
    //     this.props.sendLastData(currencies);
    // }

    // editCurrencyCurrency(currency, elementId) {
    //     let allCurrencies = this.props.lastData;
    //     const currentIndex = allCurrencies.findIndex(
    //         (element) => element.id === elementId
    //     );
    //     allCurrencies[currentIndex].currency = currency;
    //     this.setState({ result: "" });
    //     this.props.sendLastData(allCurrencies);
    // }

    // editCurrencyAmount(amount, elementId, error) {
    //     let allCurrencies = this.props.lastData;
    //     const currentIndex = allCurrencies.findIndex(
    //         (element) => element.id === elementId
    //     );
    //     allCurrencies[currentIndex].amount = amount;
    //     allCurrencies[currentIndex].error = error;
    //     this.setState({ result: "" });
    //     this.props.sendLastData(this.props.lastData);
    // }

    // editTargetCurrency(currency) {
    //     this.setState({ targetCurrency: currency, result: "" });
    // }

    // async calculate() {
    //     let result = 0;
    //     this.props.lastData.forEach((currency) => {
    //         const amount = currency.amount;
    //         const rate = this.state.rates[currency.currency];
    //         const targetRate = this.state.rates[this.state.targetCurrency];

    //         result += (amount / rate) * targetRate;
    //     });

    //     result = result.toFixed(2);
    //     await this.setState({ result: result });
    //     this.props.sendHistoryRecord(this.generateHistoryRecord());
    // }

    // generateHistoryRecord() {
    //     const date = new Date();
    //     const currentDate = date.toLocaleDateString();

    //     if (localStorage.expatsWallet) {
    //         let history = JSON.parse(localStorage.expatsWallet).history;

    //         return {
    //             id: history.length ? history[history.length - 1].id + 1 : 1,
    //             date: currentDate,
    //             amount: this.state.result,
    //             currency: this.state.targetCurrency,
    //         };
    //     } else {
    //         return {
    //             id: 1,
    //             date: currentDate,
    //             amount: this.state.result,
    //             currency: this.state.targetCurrency,
    //         };
    //     }
    // }

    // async checkScrollbar() {
    //     const converterCurrencies = document.querySelector(
    //         ".converter__currencies"
    //     );
    //     if (
    //         converterCurrencies.scrollHeight > converterCurrencies.offsetHeight
    //     ) {
    //         await this.setState({ isScrollbar: true });
    //     } else {
    //         await this.setState({ isScrollbar: false });
    //     }
    // }

    render() {
        return (
            <div className="goods-list">
                goods list
            </div>
        );
    }
}

export default ItemsList;