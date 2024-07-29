import './banner.css'

export const Banner = ({banner, setIsVisible}) => {

    const handleCloseBanner = () => {
        setIsVisible(false)
    }

    return (
        <>
            <div className={"banner"}>
                <div className={"banner__text"}>
                    <h2>
                        {banner.title}
                    </h2>
                    <p>
                        {banner.description}
                    </p>
                </div>

                <span onClick={handleCloseBanner}>X</span>
            </div>
        </>
    )
}