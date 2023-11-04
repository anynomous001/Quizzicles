export const Initial_State = {
    loading: false,
    answerChecked: false
}

export const QuizReducer = (state, action) => {
    switch (action.type) {
        case 'Fetching_start':
            return {
                loading: true,
                answerChecked: false
            };
        case 'Fetching-success':
            return {
                loading: false,
                answerChecked: false

            };
        case 'Answer_checked':
            return {
                loading: false,
                answerChecked: true
            };
        case 'game-restarted':
            return {
                loading: false,
                answerChecked: false
            };
        default: return state;
    }
}