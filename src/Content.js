import { useState, useEffect, useRef, useReducer } from 'react'

const tabs = ['posts', 'comments', 'albums']
const lessons = [
    {
        id: 1,
        name: "bai1"
    },
    {
        id: 2,
        name: "bai2"
    },
    {
        id: 3,
        name: "bai3"
    },
]

// Initial value
const initState = 60;

// Actions
const DOWN_ACTION = "down";
const UP_ACTION = "up";

// Reducer
function reducer(state, action) {
    console.log("reducer is calling ...");
    switch (action) {
        case UP_ACTION:
            return state + 1;
        case DOWN_ACTION:
            return state - 1;
        default:
            throw Error("Invalid action!");
    }
}

function Content() {
    const [title, setTitle] = useState('')
    const [posts, setposts] = useState([])
    const [type, setType] = useState('posts')
    const [show, setShow] = useState(false)
    const [width, setWidth] = useState(window.innerWidth)
    const [timeout, setTimeout] = useReducer(reducer, initState)
    const [avatar, setAvatar] = useState()
    const [lessonId, setLessonId] = useState(1)
    const [comment, setComment] = useState([])
    useEffect(() => {
        document.title = title;
        fetch(`https://jsonplaceholder.typicode.com/${type}`)
            .then(res => res.json())
            .then(posts => {
                setposts(posts)
            })
    }, [type]);

    let ref = useRef();

    useEffect(() => {
        const handleScroll = () => {
            setShow(window.scrollY > 200)
        };

        const resizeHandle = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('scroll', handleScroll)
        window.addEventListener('resize', resizeHandle)

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', resizeHandle);
        }
    }, []);

    function Handlestart() {
        ref.current = setInterval(() => {
            console.log(timeout);
            setTimeout(UP_ACTION);
        }, 1000)
    }

    function Handlestop() {
        clearInterval(ref.current);
    }

    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview)
        }
    }, [avatar])

    useEffect(() => {
        function hanldeComment({ detail }) {
            setComment(prev => [...prev, { id: lessonId, details: detail }])
        }
        window.addEventListener(`lesson-${lessonId}`, hanldeComment);
        return () => {
            window.removeEventListener(`lesson-${lessonId}`, hanldeComment);
        };
    }, [lessonId])

    function handleAvavtar(e) {
        const ava = e.target.files[0];
        ava.preview = URL.createObjectURL(ava);
        setAvatar(ava);
    }


    return (
        <div>
            {tabs.map(tab => (
                <button
                    key={tab}
                    onClick={() => setType(tab)}>
                    {tab}
                </button>
            ))}
            <input
                value={width}
                onChange={e => setTitle(e.target.value)}
            />
            <input
                type={'file'}
                onChange={handleAvavtar} />
            <h1>{timeout}</h1>
            <button onClick={Handlestart}>Start</button>
            <button onClick={Handlestop}>Stop</button>
            <button onClick={() => setTimeout(UP_ACTION)}>Cong</button>
            <button onClick={() => setTimeout(DOWN_ACTION)}>Tru</button>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>{post.title || post.name}</li>
                ))}
            </ul>
            {show && (
                <button
                    style={{
                        position: 'fixed',
                        right: 20,
                        bottom: 20,
                    }}>
                    Go to Top
                </button>
            )}
            {avatar && (<img src={avatar.preview} alt='' width={'80%'}></img>)}
            <ul>
                {lessons.map((lesson) => (
                    <li
                        key={lesson.id}
                        style={{
                            color: lessonId === lesson.id ? "red" : "#333"
                        }}
                        onClick={() => setLessonId(lesson.id)}
                    >
                        {lesson.name}
                    </li>
                ))}
            </ul>
            <ul>
                {comment.map((cmt) => (
                    <li key={cmt.lessonId}> {cmt.details}</li>
                ))}
            </ul>
        </div >
    )
}

export default Content