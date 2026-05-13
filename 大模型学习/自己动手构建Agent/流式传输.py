import asyncio
from agents import Agent, Runner
from agents.types import ResponseTextDeltaEvent
import local_settings  # 加载本地设置

agent = Agent(
    name="AI助手",
    instructions="你是一个友好的AI助手。使用中文进行问答"  # 系统提示词
)

async def main():
    result = Runner.run_streamed(agent, input='你是谁？')
    async for event in result.stream_events():
        if event.type == "raw_response_event" and isinstance(event.data, ResponseTextDeltaEvent):
            # raw_response_event 来自LLM的响应
            print(event.data.delta)

if __name__ == '__main__':
    asyncio.run(main())
