import './theme-wrapper.css'

export const ThemeWrapper = () => {


    return (
        <>
            <div className={"theme-wrapper"}>
                <h1>Название</h1>
                <div className={"theme-wrapper__buttons"}>
                    <button className={"button"}>Изменить</button>
                    <button className={"button"}>Удалить</button>
                </div>
            </div>
        </>
    )


}