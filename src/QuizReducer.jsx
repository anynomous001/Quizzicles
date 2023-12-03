export const Initial_State = {
    loading: false,
    answerChecked: false,
    count: 0
}

export const QuizReducer = (state, action) => {
    switch (action.type) {
        case 'Fetching_started':
            return {
                ...state,
                loading: true
            };
        case 'Fetching-success':
            return {
                ...state,
                loading: false
            };
        case 'Answer_checked':
            return {
                ...state,
                answerChecked: true
            };
        case 'correct-answer':
            return {
                ...state,
                count: state.count + 1
            };
        case 'game-restarted':
            return {
                ...state,
                loading: false,
                answerChecked: false,
                count: 0
            };
        default: return state;
    }
}