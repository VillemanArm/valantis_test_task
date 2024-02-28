import React from 'react';


class AppInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };

        // this.func = this.func.bind(this);

    }



    render() {
        return (
            <input 
                type="text" 
                className='app-input' 
                placeholder={this.props.placeholder}
                onInput={(event) => {this.props.changeFunc(event.target.value)}}
            >

            </input>
        );
    }
}

export default AppInput;