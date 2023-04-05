'use strict';

const useState = React.useState;

function Text({ text, isQuestion, next }) {
    return (
        <div className='text'>
            <p>{text}</p>
            <div
                className="next"
                style={{ display: isQuestion ? undefined : 'block' }}
                onClick={next}
            >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                        d="M3 5.49686C3 3.17662 5.52116 1.73465 7.52106 2.91106L18.5764 9.41423C20.5484 10.5742 20.5484 13.4259 18.5764 14.5858L7.52106 21.089C5.52116 22.2654 3 20.8234 3 18.5032V5.49686Z"
                        fill="#6BFF2F" />
                </svg>
            </div>
        </div>
    )
}

function Image({ src, onClick, className }) {
    return (
        <div className={"image" + ' ' + className} onClick={onClick}>
            <div className="image-wrap">
                <img src={src} alt="" />
            </div>
        </div>
    )
}

function Images({ images, answer, isQuestion, right }) {
    const [current, setCurrent] = useState()
    const choise = (num) => {
        setCurrent(num)
        answer()
    }
    return (
        <div className="images" style={{ pointerEvents: isQuestion ? undefined : 'none' }}>
            {images.map((el) => <Image
                className={!isQuestion && (right === el.id || current === el.id) ? `image-${right === el.id}` : ''}
                src={el.src}
                key={el.id}
                onClick={() => choise(el.id)}
            />)}
        </div>
    )
}

function NavBar({ count, current }) {
    return (
        <div className="nav">
            {[...Array(count).keys()].map((el, index) => (
                <a
                    className={'nav-item' + (index === current ? ' nav-item__active' : '')}
                    href="#"
                    key={el}
                >
                    Вопрос №
                </a>
            ))}
        </div>
    )
}

function App() {
    const [current, setCurrent] = useState(0)
    const [isQuestion, setIsQuestion] = useState(true)
    const next = () => {
        setIsQuestion(true)
        setCurrent((count) => count + 1)
    }
    return (
        <React.Fragment>
            <NavBar count={2} current={current} />
            <Text
                text='Текст вопроса 2'
                isQuestion={isQuestion}
                next={next}
            />
            <Images
                images={[
                    { src: '/media/images/image1.png', id: 1 },
                    { src: '/media/images/image2.jpg', id: 2 },
                    { src: '/media/images/image3.jpg', id: 3 },
                    { src: '/media/images/image4.jpg', id: 4 },
                ]}
                right={3}
                answer={() => setIsQuestion(false)}
                isQuestion={isQuestion}
            />
        </React.Fragment>
    )
}

const domContainer = document.querySelector('#root');
const root = ReactDOM.createRoot(domContainer);
root.render(<App />);