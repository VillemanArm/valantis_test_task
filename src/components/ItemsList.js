import React from "react";
import Item from "./Item";

// import { ImPlus, ImCross } from "react-icons/im";
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
            <div className="items-list">
                {this.props.items.map(item => (<Item key={item.id} item={item}/>))}
            </div>
        );
    }
}

export default ItemsList;