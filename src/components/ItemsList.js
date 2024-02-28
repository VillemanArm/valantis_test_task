import React from "react";
import Item from "./Item";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";

// import CurrencyBlock from "./CurrencyBlock";
// import CurrencyCalculator from "./CurrencyCalculator";

class ItemsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // idList: [],
            // url: `http://api.valantis.store:40000/`,
            // headers: { 'X-Auth': '70e9e15f52c7209ab6b6f80b795aa4f2' },
            // goods: []
        };

        // this.getIds = this.getIdList.bind(this);

    }

    

    render() {
        return (
            <div className="items-list__wrapper container">
                <div className="items-list__management">
                    <button className="items-list__button"><FaArrowLeft /></button>
                    <button className="items-list__button"><FaArrowRight /></button>
                </div>
                <div className="items-list">
                    {this.props.items.map(item => (<Item key={item.id} item={item}/>))}
                </div>
            </div>

        );
    }
}

export default ItemsList;