let _ = {};

_ .singUpData = () => {

    let singupitem = [
        {
            id: 1,
            name: 'email',
            requared: true,
        },
        {
            id: 2,
            name: 'fullname',
            requared: false,
        },
        {
            id: 3,
            name: 'password',
            requared: true,
        },
    ]
    return singupitem
};

export default _;
