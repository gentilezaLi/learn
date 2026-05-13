import asyncio
from agents import Agent, Runner
import local_settings  # 加载本地设置

agent = Agent(
    name="AI助手",
    instructions="你是一个友好的AI助手。使用中文进行问答"  # 系统提示词
)

async def main():
    result = await Runner.run(agent, input='你是谁？')
    print(result.final_output)

if __name__ == '__main__':
    asyncio.run(main())
