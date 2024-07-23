import './preloader.css'

export const Preloader = () => {


    return (
        <>
            <div className={"preloader-container"}>
                <div className="loader-wrapper">
                    <div className="loader">
                    </div>
                    <div className="loader-section section-left"></div>
                    <div className="loader-section section-right"></div>
                </div>
            </div>
        </>
    )
}