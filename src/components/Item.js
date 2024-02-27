import React from 'react';
class Item extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };

        // this.func = this.func.bind(this);

    }



    render() {
        return (
            <div className=''>
                <div className="item__img"> </div>
                <div className="item__desription">
                    <h3>{this.props.item.product}</h3>
                    {this.props.item.brand && <p>Бренд: {this.props.item.brand}</p>}
                    {this.props.item.price && <p>{this.props.item.price} ₽</p>}
                    
                </div>
            </div>
        );
    }
}

export default Item;