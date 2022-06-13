import API from "./baseURL";

const addBookRequest = async (formData) => {
  try {
    const { data } = await API.post("/add-bookRequest", formData);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const updateBookRequest = async (id, formData) => {
  try {
    const res = await API.patch(`/update-bookRequest/${id}`, formData);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const deleteBookRequest = async (id) => {
  try {
    const res = await API.delete(`/delete-bookRequest/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const bookRequestService = {
  addBookRequest,
  updateBookRequest,
  deleteBookRequest,
};

export default bookRequestService;
