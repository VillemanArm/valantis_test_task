import React from 'react';


class AppInput extends React.Component {
    debounce = (callback, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
            callback.apply(this, args);
            }, delay);
        };
    };

    render() {
        return (
            <input 
                type="text" 
                className='app-input' 
                placeholder={this.props.placeholder}
                onInput={this.debounce((event) => {this.props.changeFunc(event.target.value)}, 600)}
            ></input>
        );
    }
}

export default AppInput;