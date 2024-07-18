import './header.css'

export const Header = () => {
    const username = "Владислав Голиков";
    let avatarArray = username.split(" ");
    const avatar = avatarArray[0][0] + avatarArray[1][0]
    console.log(avatar)

    return (
        <header className={"header"}>
            <div className={"logo"}>
                <h2>ККЗ</h2>
            </div>
            <div className={"container user-info"}>
                <p className={"text avatar"}>{avatar}</p>
                <p className={"text"}>
                    {username}
                </p>
            </div>
        </header>
    )
}