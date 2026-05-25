import asyncio
from agents import Agent, Runner,function_tool
from agents.mcp import MCPServerStdio




@function_tool
def get_weather(cityname):
  return f"31.1"



async def main():
  #1.启动MCPServer
  #2. 把MCPServer换地给agent（ 从MCPServer获取支持的工具 把工具传递给agent）
    async with MCPServerStdio(
        name="普通的mcp服务器",
        params={
            "command": "python",
            "args": ["mcp_server.py"],
        }
    ) as mcp_server:
        agent = Agent(
            name="AI助手",
            instructions="你是一个友好的AI助手。使用中文进行问答",  # 系统提示词
            tools=[get_weather],  # 工具列表
            mcp_servers=[mcp_server],
        )

        result = await Runner.run(agent, input='当前目录有几个文件？')
        print(result.final_output)

if __name__ == '__main__':
    asyncio.run(main())
