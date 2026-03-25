import Title from "antd/es/typography/Title";
import { Flex, message } from "antd";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";
import QuestionBankList from "@/components/QuestionBankList";
import "./index.css";

// 本页面使用服务端渲染，禁用静态生成
export const dynamic = "force-dynamic";

/**
 * 题库列表页面
 * @constructor
 */
export default async function BanksPage() {
  let questionBankList = [];
  const pageSize = 200;
  try {
    const res = await listQuestionBankVoByPageUsingPost({
      pageSize,
      sortField: "createTime",
      sortOrder: "descend",
    });
    questionBankList = res.data.records ?? [];
  } catch (e) {
    message.error("获取题库列表失败，" + e.message);
  }

  return (
    <div id="homePage" className="max-width-content">
      <Flex justify="space-between" align="center">
        <Title level={3}>题库大全</Title>
      </Flex>
      <QuestionBankList questionBankList={questionBankList} />
    </div>
  );
}
