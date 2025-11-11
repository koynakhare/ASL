import { getRequest, postRequest } from '../../utils/axios';
import { ResultApiUrl } from '../../constant';
import { handleAsyncAction } from '../helper';

const getResultApiUrl = (endPoints) => {
  return `${ResultApiUrl}/${endPoints}`
}

export const getResult = async (data, dispatch) => {
  // const response = await getRequest(getResultApiUrl('get'), data,true, dispatch);
  // return response?.data;
  return {
    success: true,
    message: 'Result Fetched Successfully',
    data: {
      score: 8,
      total: 10,
      timeTaken: "2 min 45 sec",
      data: [
        { _id: 1, name: "Hello", img: "https://...", status: "correct" },
        { _id: 2, name: "Thank You", img: "https://...", status: "correct" },
        { _id: 3, name: "I Love You", img: "https://...", status: "incorrect" },
      ]
    }
  }
};


export const getResultAction = handleAsyncAction('result/getResultAction', getResult);