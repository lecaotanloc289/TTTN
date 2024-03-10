import { useState } from "react";
import { sculptureList } from "./data";

// USING STATE
function Gallery() {
    // thay đổi index của data
    const [index, setIndex] = useState(0);
    // thay đổi khi click more
    const [showMore, setShowMore] = useState(false);
    // có next được hay không
    const hasNext = index < sculptureList.length - 1;

    // hàm xử lý khi click next
    function handleNextClick() {
        if (hasNext) setIndex(index + 1);
        else setIndex(0);
    }
    // hàm xử lý khic click show more | hide more
    function handleShowMoreClick() {
        setShowMore(!showMore);
    }
    let sculpture = sculptureList[index];

    return (
        <div>
            <button onClick={handleNextClick}>Next</button>
            <h2>
                <i>{sculpture.name}</i>
                by {sculpture.artist}
            </h2>
            <h3>
                {index + 1} of {sculptureList.length}
            </h3>
            <button onClick={handleShowMoreClick}>
                {showMore ? "Show" : "Hide"} Details
            </button>
            {showMore && <p>{sculpture.description}</p>}
            <img src={sculpture.url} alt={sculpture.alt} />
        </div>
    );
}

// SEND BẤT ĐỒNG BỘ, LƯU STATE VÀ DÂTA
function Form() {
    const [to, setTo] = useState("Alice");
    const [mess, setMess] = useState("Hello");

    function handleSubmit(e) {
        e.preventDefault();
        setTimeout(() => {
            alert(`You said ${mess} to ${to}`);
        }, 1000);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                To: {}
                <select
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                ></select>
            </label>
            <textarea
                placeholder="message"
                value={mess}
                onChange={(e) => setMess(e.target.value)}
            ></textarea>
            <button type="submit">Send</button>
        </form>
    );
}

// QUEUE UPDATE STATE
function Counter() {
    const [score, setScore] = useState(0);
    function increament() {
        // cho phép update nhiều trangj thái
        setScore((score) => score + 1);
    }

    return (
        <>
            <button onClick={increament}> +1 </button>
            <button
                onClick={() => {
                    increament();
                    increament();
                    increament();
                }}
            >
                {" "}
                +3
            </button>
            <h1>Score: {score}</h1>
        </>
    );
}

// CẬP NHẬT CÁC ĐỐI TƯỢNG Ở STATE
function Form2() {
    const [person, setPerson] = useState({
        name: "Niki de Saint Phalle",
        artwork: {
            title: "Blue Nana",
            city: "Hamburg",
            image: "https://i.imgur.com/Sd1AgUOm.jpg",
        },
    });

    function handleNameChange(e) {
        setPerson({
            ...person,
            artwork: { ...person.artwork, title: e.target.value },
        });
    }

    function handleCity(e) {
        setPerson({
            ...person,
            artwork: {
                ...person.artwork,
                city: e.target.value,
            },
        });
    }
    function handleTitleChange(e) {
        setPerson({
            ...person,
            artwork: {
                ...person.artwork,
                title: e.target.value,
            },
        });
    }

    function handleImageChange(e) {
        setPerson({
            ...person,
            artwork: {
                ...person.artwork,
                image: e.target.value,
            },
        });
    }

    return (
        <>
            <label>
                Name: <input value={person.name} onChange={handleNameChange} />
            </label>
            <label>
                Title:{" "}
                <input
                    value={person.artwork.title}
                    onChange={handleTitleChange}
                />
            </label>
            <label>
                City:{" "}
                <input value={person.artwork.city} onChange={handleCity} />
            </label>
            <label>
                image:{" "}
                <input
                    value={person.artwork.image}
                    onChange={handleImageChange}
                />
            </label>
            <p>
                <i>{person.artwork.title}</i>
                {" by "}
                {person.name}
                <br />
                (located in {person.artwork.city})
            </p>
            <img src={person.artwork.image} alt={person.name} />{" "}
        </>
    );
}

// CẬP NHẬT MẢNG Ở STATE
function ArrayState() {
    const initialList = [
        { id: 0, title: "Big Bellies", seen: false },
        { id: 1, title: "Lunar Landscape", seen: false },
        { id: 2, title: "Terracotta Army", seen: true },
    ];

    const [list, setList] = useState(initialList);

    function handleToggle(i, nextSeen) {
        setList(
            list.map((id) => {
                if (id.id === i) return { ...id, seen: nextSeen };
                else return id;
            }),
        );
    }

    return (
        <>
            <h1>Art Bucket List</h1>
            <h2>My list of art to see:</h2>
            <ItemList artwork={list} onToggle={handleToggle} />
        </>
    );
}

function ItemList({ artwork, onToggle }) {
    return (
        <ul>
            {artwork.map((artwork) => (
                <li key={artwork.id}>
                    <lable>
                        <input
                            onChange={(e) => {
                                onToggle(artwork.id, e.target.checked);
                            }}
                            type=" checkbox"
                            checked={artwork.seen}
                        />
                        {artwork.title}
                    </lable>
                </li>
            ))}
        </ul>
    );
}
