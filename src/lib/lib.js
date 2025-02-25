let _ = {};

_ .singUpData = () => {

    let singupitem = [
        {
            id: 1,
            name: 'email',
            requared: true,
            icon: false,
        },
        {
            id: 2,
            name: 'fullname',
            requared: true,
            icon: false,
        },
        {
            id: 3,
            name: 'password',
            requared: true,
            icon: true,
        },
    ]
    return singupitem
};

export default _;
