import { CgDarkMode } from "react-icons/cg";
import { MdAddPhotoAlternate, MdChat, MdOutlineCreate, MdOutlineDelete, MdOutlineHelp, MdOutlinePassword } from "react-icons/md";


export const getProfileSettingsData = () => {
  return [
    {
      id: 1,
      name: "Edit Profile Name",
      icon: MdOutlineCreate,
    },
    {
      id: 2,
      name: "Edit Profile Status Info",
      icon: MdChat,
    },
    {
      id: 3,
      name: "Edit Profile Photo",
      icon: MdAddPhotoAlternate,
    },
    {
      id: 4,
      name: "Help",
      icon: MdOutlineHelp,
    },
  ];
};

export const getAccountSettingsData = () => {
  return [
    {
      id: 1,
      name: "Change Password",
      icon: MdOutlinePassword,
    },
    {
      id: 2,
      name: "Chnage Theme",
      icon: CgDarkMode,
    },
    {
      id: 3,
      name: "Delete Account",
      icon: MdOutlineDelete,
    },
  ];
};
