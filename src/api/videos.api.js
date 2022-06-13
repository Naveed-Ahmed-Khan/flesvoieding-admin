import API from "./baseURL";

const addVideo = async (formData) => {
  try {
    const { data } = await API.post("/add-video", formData);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const updateVideo = async (id, formData) => {
  try {
    const res = await API.patch(`/update-video/${id}`, formData);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const deleteVideo = async (id) => {
  try {
    const res = await API.delete(`/delete-video/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const videoService = {
  addVideo,
  updateVideo,
  deleteVideo,
};

export default videoService;
