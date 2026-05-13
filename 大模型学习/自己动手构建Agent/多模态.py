import asyncio
import base64
from agents import Agent, Runner
import local_settings  # 加载本地设置

agent = Agent(
    name="AI助手",
    instructions="你是一个友好的AI助手。使用中文进行问答"  # 系统提示词
)

def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        bin_content = image_file.read()
        return base64.b64encode(bin_content).decode("utf-8")

async def main():
    base64_image = encode_image("hello.png")  # 图片路径
    messages = [
        {
            "role": "user",
            "content": [
                {
                    "type": "input_image",
                    "image_url": f"data:image/jpeg;base64,{base64_image}"
                }
            ]  # 图片内容
        },
        {
            "role": "user",
            "content": "图片中是什么内容？"
        }  # 提示词内容
    ]
    result = await Runner.run(agent, messages)
    print(result.final_output)

if __name__ == '__main__':
    asyncio.run(main())
