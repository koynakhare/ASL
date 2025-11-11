import { getRequest, postRequest } from '../../utils/axios';
import { TestApiUrl } from '../../constant';
import { handleAsyncAction } from '../helper';
import SignHello from "../../assets/sign/hello.png";
import SignThankYou from "../../assets/sign/thankyou.jpg";
import SignLove from "../../assets/sign/love.jpg";
import SignYes from "../../assets/sign/yes.png";
import SignNo from "../../assets/sign/no.webp";
import SignSorry from "../../assets/sign/sorry.jpg";
import SignPlease from "../../assets/sign/please.jpg";
import SignHelp from "../../assets/sign/help.png";
import SignGoodMorning from "../../assets/sign/goodmorning.jpg";
import SignGoodbye from "../../assets/sign/goodbye.jpg";
const getTestApiUrl = (endPoints) => {
  return `${TestApiUrl}/${endPoints}`
}

export const getTestQuestions = async (data, dispatch) => {
  const response = await getRequest(TestApiUrl, data,true,dispatch);
  console.log(response,'response')
  return response?.data;

};

export const submitTest = async (data, dispatch) => {
  const response = await postRequest(TestApiUrl, data,true,dispatch);
  return response?.data;

};


export const getTestReportAction = handleAsyncAction('test/getTestReportAction', getTestQuestions, 'get');
export const submitTestAction = handleAsyncAction('test/submitTestAction', submitTest);