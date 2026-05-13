import asyncio
from agents import Agent, Runner
import local_settings  # 加载本地设置

agent_a = Agent(
    name="AI助手",
    instructions="你是一个友好的AI助手。使用中文进行问答",  # 系统提示词
)

agent_b = Agent(
    name="AI助手",
    instructions="对前一个 AI 的回答进行扩展和补充",  # 系统提示词
)


async def main():
    result = await Runner.run(agent_a, input="太阳围绕地球还是地球围绕太阳？")
    print(result.final_output)
    result = await Runner.run(agent_b, input=result.final_output)
    print(result.final_output)


if __name__ == "__main__":
    asyncio.run(main())
