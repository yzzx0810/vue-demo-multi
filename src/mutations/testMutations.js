const testMutations = {
    setNameMutation: (state, data) => {
        state.name = data.name;
        console.log("=========" + state.name);
    }
};

export default testMutations;