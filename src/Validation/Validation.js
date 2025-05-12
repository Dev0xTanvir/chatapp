// validate function implement

export const validationFild = (groupinfo, setgrouperror) => {
    let error = {};
    for (let field in groupinfo) {
      if (groupinfo[field] === "") {
        error[`${field}error`] = `${field} is required`;
      }
    }
    setgrouperror(error);
    return Object.keys(error).length === 0;
  };