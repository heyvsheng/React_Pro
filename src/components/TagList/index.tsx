import "./index.css";
import { Tag } from "antd";

interface Props {
  questionBankList?: API.QuestionBankVO[];
}

/** * 标签列表组件 * @param props * @constructor */
const questionBankList = (props: Props) => {
  const { tagList = [] } = props;
  return (
    <div className="tag_list">
      {tagList.map((tag) => {
        return <Tag key={tag}>{tag}</Tag>;
      })}
    </div>
  );
};
export default questionBankList;
