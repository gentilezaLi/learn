import asyncio
import time
from agents import Agent, Runner
import local_settings  # 加载本地设置

agent_a = Agent(
    name="AI助手",
    instructions="使用中文进行问答",  # 系统提示词
    handoff_description="只使用韩文进行回答",
)

agent_b = Agent(
    name="AI助手",
    instructions="使用英文进行问答",  # 系统提示词
    handoff_description="只使用英文进行回答",
)

agent_d = Agent(
    name="前台助手",
    instructions="不回答问题，而是把问题交接给合适的Agent",
    handoffs=[agent_a, agent_b],
)


async def main():
    query = "太阳围绕地球，还是地球围绕太阳？？"

    result = Runner.run_streamed(agent_d, query)
    for event in result.stream_events():  # 流式传输事件
        print(event)
    print(result.final_output)


if __name__ == "__main__":
    asyncio.run(main())
