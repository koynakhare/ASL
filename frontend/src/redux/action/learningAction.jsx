import { getRequest, postRequest } from '../../utils/axios';
import { LearnApiUrl } from '../../constant';
import { handleAsyncAction } from '../helper';
import SignHello from "../../assets/sign/hello.png";
import SignThankYou from "../../assets/sign/thankyou.jpg";
import SignLove from "../../assets/sign/love.jpg";
const getLearnApiUrl = (endPoints) => {
  return endPoints ? `${LearnApiUrl}/${endPoints}` : LearnApiUrl
}

export const getLearningContent = async (data, dispatch) => {
  const response = await getRequest(getLearnApiUrl(''), data, false, dispatch);
  return response?.data;

};


export const getLearningContentAction = handleAsyncAction('sign/getLearningContentAction', getLearningContent, 'get');