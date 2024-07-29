import './banner.css'

export const Banner = ({banner, isVisible, setIsVisible}) => {

    const handleCloseBanner = () => {
        setIsVisible(false)
    }

    return (
        <>
            <div className={"banner"}>
                <div className={"banner__text"}>
                    <h2>
                        Внимание!
                    </h2>

                    <p>Наблюдаются сбои в работе 1С!
                        Ведутся ремонтные работы.
                    </p>
                </div>

                <span onClick={handleCloseBanner}>X</span>
            </div>
        </>
    )
}