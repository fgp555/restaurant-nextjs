import config from "@/config";
import "./page.scss";

const page = () => {
  return <div>apiBaseUrl:  {config.apiBaseUrl}</div>;
};

export default page;
