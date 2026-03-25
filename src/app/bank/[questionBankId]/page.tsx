"use server";
import Title from "antd/es/typography/Title";
import { Avatar, Button, Card, message, Typography } from "antd";
import { searchQuestionVoByPageUsingPost } from "@/api/questionController";
import QuestionTable from "@/components/QuestionTable";
import "./index.css";
import { getQuestionBankVoByIdUsingGet } from "@/api/questionBankController";
import Link from "next/link";
import Meta from "antd/es/card/Meta";
import Paragraph from "antd/es/typography/Paragraph";
import QuestionList from "@/components/QuestionList";

/**
 * 题库列表页面
 * @constructor
 */
export default async function BankPage({ params }) {
  // 获取 url 的查询参数
  const { questionBankId } = params;
  let bank = undefined;

  try {
    const res = await getQuestionBankVoByIdUsingGet({
      id: questionBankId,
      needQueryQuestionList: true,
      pageSize: 200,
    });
    bank = res.data;
  } catch (e) {
    message.error("获取题目列表失败，" + e.message);
  }

  //如果题目不存在
  if (!bank) {
    return <div>获取题库详情失败，请刷新重试</div>;
  }

  //获取第一道题目
  let firstQuestionId;
  if (bank.questionPage?.records && bank.questionPage.records.length > 0) {
    firstQuestionId = bank.questionPage.records[0];
  }

  return (
    <div id="bankPage" className="max-width-content">
      <Card>
        <Meta
          avatar={<Avatar src={bank.picture} size={72} />}
          title={
            <Title level={3} style={{ marginBottom: 0 }}>
              {bank.title}
            </Title>
          }
          description={
            <>
              <Paragraph type="secondary">{bank.description}</Paragraph>
              <Button
                type="primary"
                shape="round"
                href={`/bank/${questionBankId}/question/${firstQuestionId}`}
                target="_blank"
                disabled={!firstQuestionId}
              >
                开始刷题
              </Button>
            </>
          }
        />
      </Card>
      <div style={{ marginBottom: 16 }} />
      <QuestionList
        questionBankId={questionBankId}
        questionList={bank.questionPage?.records ?? []}
        cardTitle={`题目列表(${bank.questionPage?.total})`}
      />
    </div>
  );
}
