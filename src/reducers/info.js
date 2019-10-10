let defaultInfo = {
    version: '1.2.1',
    releasedate: new Date(2019,9,9,20,11,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return state;
    }
}
