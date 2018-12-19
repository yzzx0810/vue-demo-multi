const testGetters = {
    getName: (state) => () => {
        return state.name;
    }
};

export default testGetters;