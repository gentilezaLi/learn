from pydantic import BaseModel
import asyncio
from agents import Agent,Runner
import Local_settings # 加载本地设置

class Data(BaseModel):
    名字: str
    年龄: int
    性别: str
    事迹: str

agent = Agent(
    name="AI助手",
    instructions="你是一个友好的AI助手。使用中文进行问答",  # 系统提示词
    output_type=Data, # 输出类型为Data模型
)

async def main():
    result = await Runner.run(agent, '介绍一位值得记住的人')
    obj: Data = result.final_output

    print(obj)
    print(obj.名字)
    print(obj.年龄)
    print(obj.性别)
    print(obj.事迹)

    print(result.to_input_list())

if __name__ == '__main__':
    asyncio.run(main())

