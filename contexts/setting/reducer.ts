const reducer = (draft, action) => {
    switch (action.type) {
        case 'TOGGLE_DARK_MODE':
            draft.isDarkMode = action.payload;
            break;

        default:
            break;
    }
}

export default reducer