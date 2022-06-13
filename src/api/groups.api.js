import API from "./baseURL";

const addGroup = async (formData) => {
  try {
    const { data } = await API.post("/add-group", formData);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const updateGroup = async (id, formData) => {
  try {
    const res = await API.patch(`/update-group/${id}`, formData);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const deleteGroup = async (id) => {
  try {
    const res = await API.delete(`/delete-group/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const groupService = {
  addGroup,
  updateGroup,
  deleteGroup,
};

export default groupService;
