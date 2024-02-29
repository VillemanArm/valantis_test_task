import React from "react";
import Logo from './Logo'
import AppInput from './UI/AppInput'

class Header extends React.Component {

    render() {
        return (
            <header>
                <div className="container header">
                    <Logo />
                    <a href="https://insight-webstudio.ru/">Другие мои работы можно посмотреть на моем сайте</a>
                    <AppInput 
                        changeFunc={this.props.searchFunc}
                        placeholder="⌕"
            />
                </div>
            </header>
        )
    }
}

export default Header