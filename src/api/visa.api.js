import API from "./baseURL";

const addVisa = async (formData) => {
  try {
    const { data } = await API.post("/add-visa", formData);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const updateVisa = async (id, formData) => {
  try {
    const res = await API.patch(`/update-visa/${id}`, formData);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const deleteVisa = async (id) => {
  try {
    const res = await API.delete(`/delete-visa/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const visaService = {
  addVisa,
  updateVisa,
  deleteVisa,
};

export default visaService;
