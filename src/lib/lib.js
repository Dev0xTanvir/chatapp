import moment from "moment";
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

_.successtost = (msg = 'success msg mising', position = "top-right") => {
    toast.success(msg, {
        position: position,
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
_.infotost = (msg = 'infotost mising') => {
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
_.errortost = (msg = 'errortost mising') => {
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

// Time and date

_.gettimenow = () =>{
    return moment().format("MM DD YYYY, h:mm:ss a");
}


export default _;
