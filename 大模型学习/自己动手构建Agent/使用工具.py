import asyncio
from agents import Agent, Runner,function_tool
import local_settings  # 加载本地设置

import httpx

@function_tool
def get_weather(latitude, longitude):
  """获取指定经纬度的天气"""
  response = httpx.get(
        f"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&current=temperature_2m"
  )
  data = response.json()
  return f"{data['current']['temperature_2m']}°C"

agent = Agent(
    name="AI助手",
    instructions="你是一个友好的AI助手。使用中文进行问答",  # 系统提示词
    tools=[get_weather]
)

async def main():
    result = await Runner.run(agent, input='你是谁？')
    print(result.final_output)

if __name__ == '__main__':
    asyncio.run(main())
