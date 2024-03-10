function getImageUrl(person, size = "s") {
    return "https://i.imgur.com/" + person.imageId + size + ".jpg";
}

// Truyền props cho 1 thành phần
function avatar({ person, size }) {
    return (
        <div>
            <img
                className="avatar"
                src={getImageUrl}
                alt={person.name}
                width={size}
                height={size}
            />
            ;
        </div>
    );
}

function Profile() {
    return (
        <div>
            <avatar size={80} person={{ name: "Person 1", image: "person1" }} />
            <avatar size={60} person={{ name: "Person 2", image: "person2" }} />
            <avatar size={40} person={{ name: "Person 3", image: "person3" }} />
            <avatar size={20} person={{ name: "Person 4", image: "person4" }} />
        </div>
    );
}

// Viết lại avatar ngắn gọn hơn
// function avatar(props) {
//     let person = props.person;
//     let size = props.size;

//     return (
//         <div>
//             <img
//                 className="avatar"
//                 src={getImageUrl}
//                 alt={person.name}
//                 width={size}
//                 height={size}
//             />
//             ;
//         </div>
//     );
// }

// Đặt một component trong một component
function card({ children }) {
    return <div className="card">{children}</div>;
}

// có thể đặt avatar vào trong card
function profile() {
    return (
        <card>
            <avatar
                size={100}
                person={{
                    name: "Katsuko Saruhashi",
                    imageId: "YfeOqp2",
                }}
            />
        </card>
    );
}

// chuyển tiếp tất cả các props của cha sang con: <card {...props}/>

// HIỂN THỊ CÓ ĐK

// điều kiện null không trả lại gì cả.
// function item({ name, isPacked }) {
//     // return <li className="item"> {name}</li>;
//     if (isPacked) {
//         return <li className="item">{name} ✔</li>;
//     }
//     return <li className="item">{name}</li>;
// }

// viết lại item 
function item ({name, isPacked}) {
    return <li>{isPacked ? name + ' ✔' : name}</li>
}
function packingList() {
    return (
        <section>
            <h1>Header</h1>
            <ul>
                <item isPacked={true} name="Space suit" />
                <item isPacked={true} name="Helmet with a golden leaf" />
                <item isPacked={false} name="Photo of Tam" />
            </ul>
        </section>
    );
}
