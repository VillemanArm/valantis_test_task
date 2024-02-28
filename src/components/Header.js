import React from "react";
import Logo from './Logo'
import AppInput from './UI/AppInput'

class Header extends React.Component {
    render() {
        return (
            <header>
                <div className="container header">
                    <Logo />
                    <AppInput 
                    changeFunc="setSearchQuery"
                    placeholder="⌕"
            />
                </div>
            </header>
        )
    }
}

export default Header