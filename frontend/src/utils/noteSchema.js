function noteSchema(name, value) {
    switch (name) {
        case "title":
            if (value === "")
                return "Title is required";
            else
                return false
        case "content":
            if (value === "")
                return "Content is required";
            else
                return false
        default:
            break;
    }
}

export default noteSchema;