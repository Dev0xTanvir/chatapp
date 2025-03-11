import { toast, Bounce } from "react-toastify";

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

_.successtost = (msg) => {
    toast.success(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
}
_.infotost = (msg) => {
    toast.info(msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
}
_.errortost = (msg) => {
    toast.error( msg, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
}

export default _;
