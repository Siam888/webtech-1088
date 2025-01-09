export function addNote(content) {
    return {
        type: 'ADD_NOTE',
        payload: content
    }
}

//Ex3
export function deleteNote(content) {
    return {
        type: 'DELETE_NOTE'
    }
}