import './theme-wrapper.css'

export const ThemeWrapper = ({themeInfo}) => {
    return (
        <>
            <div className={"theme-wrapper"}>
                <h2>{themeInfo.name}</h2>
                <div className={"theme-wrapper__buttons"}>
                    <button className={"button"}>Изменить</button>
                    <button className={"button"}>Удалить</button>
                </div>
            </div>
        </>
    )


}