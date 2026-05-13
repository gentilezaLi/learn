import os
from openai import AsyncOpenAI
from agents.models import openai_provider
from agents import (
    set_default_openai_api,
    set_default_openai_client,
    set_tracing_disabled,
)

client = AsyncOpenAI(
    base_url=os.environ['GEMINI_BASE_URL'],
    api_key=os.environ['GEMINI_API_KEY'],
)

set_default_openai_client(client=client, use_for_tracing=False)  # 使用自定义客户端
set_default_openai_api("chat_completions")  # 使用兼容的API模式
set_tracing_disabled(disabled=True)  # 禁用OpenAI的跟踪服务
model_name = 'gemini-2.0-flash-lite'
openai_provider.DEFAULT_MODEL = model_name  # 修改默认模型名称
