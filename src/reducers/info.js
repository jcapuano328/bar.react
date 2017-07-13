let defaultInfo = {
    version: '1.2.0',
    releasedate: new Date(2017,6,13,14,30,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return state;
    }
}
