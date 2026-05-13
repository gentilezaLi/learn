import asyncio
import time
from agents import Agent, Runner
import local_settings  # 加载本地设置

agent_a = Agent(
    name="AI助手",
    instructions="使用中文进行问答",  # 系统提示词
)

agent_b = Agent(
    name="AI助手",
    instructions="使用英文进行问答",  # 系统提示词
)


async def main():
    query = "太阳围绕地球，还是地球围绕太阳？？"
    # result_1 = await Runner.run(agent_a, query)
    # result_2 = await Runner.run(agent_b, query)
    # print(result_1.final_output)
    # print(result_2.final_output)
    t1 = time.time()
    result_1, result_2 = await asyncio.gather(
        Runner.run(agent_a, query),
        Runner.run(agent_b, query),
    )
    t2 = time.time()
    print(result_1.final_output)
    print(result_2.final_output)
    print(t2 - t1)


if __name__ == "__main__":
    asyncio.run(main())
