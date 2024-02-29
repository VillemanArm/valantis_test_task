import React from "react";
import Item from "./Item";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";

// import CurrencyBlock from "./CurrencyBlock";
// import CurrencyCalculator from "./CurrencyCalculator";

class ItemsList extends React.Component {

    render() {
        return (
            <div className="items-list__wrapper container">
                <div className="items-list__management">
                    <button 
                        className="items-list__button"
                        onClick={() => {this.props.setCurrentPage(-1)}}
                    >
                        <FaArrowLeft />                   
                    </button>
                    <span>{this.props.currentPage}</span>
                    <button 
                        className="items-list__button"
                        onClick={() => {this.props.setCurrentPage(1)}}
                    >
                        <FaArrowRight />
                    </button>
                </div>
                <div className="items-list">
                    {this.props.items.map(item => (<Item key={item.id} item={item}/>))}
                </div>
            </div>

        );
    }
}

export default ItemsList;