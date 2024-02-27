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
            <a href="#" className='item'>
                <div className="item__img"> 
                    {this.props.item.img ? <img src={this.props.item.img}></img> : <span> Нет изображения</span>}
                </div>
                <div className="item__desription">
                    <h3 className="item__desription-header" >{this.props.item.product}</h3>
                    {this.props.item.brand && <p>Бренд: {this.props.item.brand}</p>}
                    {this.props.item.price && <p className="item__desription-price">{this.props.item.price} ₽</p>}
                    
                </div>
            </a>
        );
    }
}

export default Item;