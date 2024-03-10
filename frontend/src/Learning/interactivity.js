const { Children } = require("react");

// Phản hồi sự kiện
function app() {
    return (
        <toolbar
            onPlayMovie={() => alert("Playing")}
            onUploadVideo={() => alert("Uploading")}
        />
    );
}

function toolbar({ onPlayMovie, onUploadVideo }) {
    return (
        <div>
            <Button onClick={onPlayMovie}>Play movie</Button>
            <Button onClick={onUploadVideo}>Uploading</Button>
        </div>
    );
}

function Button({ onClick, children }) {
    return <button onClick={onClick}>{children}</button>;
}
