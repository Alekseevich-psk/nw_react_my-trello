import React from 'react';

class Header extends React.Component {

    render() {
        return (
            <header className="header">
                <div className="container">
                    <div className="header__title">
                        <img src={"./img/task-list-ico.svg"} alt="" />
                            <span>Task manager</span>
                    </div>
                    <div className="header__profile">
                        <div className="header__ico">
                            <img src={"./img/profile.svg"} alt="" />
                        </div>
                        <div className="header__auth">
                            <button className="header__btn header__btn--profile">Профиль</button>
                            <button className="header__btn header__btn--out">Выход</button>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header;