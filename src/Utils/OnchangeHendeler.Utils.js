// hadleinput function implement

 export const handleinput = (event, groupinfo, validationFild, setgroupinfo) => {
    const { id, value, files } = event.target;
    setgroupinfo({
      ...groupinfo,
      [id]: id === "groupImg" ? files[0] : value,
    });
    validationFild();
  };