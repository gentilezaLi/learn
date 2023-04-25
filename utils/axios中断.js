// 导入axios
import axios from 'axios';

// 创建一个CancelToken源
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

// 发送请求
axios.get('https://api.example.com/data', {
  cancelToken: source.token
}).then(response => {
  console.log(response.data);
}).catch(error => {
  if (axios.isCancel(error)) {
    console.log('请求已取消:', error.message);
  } else {
    console.log('请求发生错误:', error.message);
  }
});

// 在需要取消请求的时候调用
source.cancel('请求已取消');


//在这个示例中，我们首先导入了axios，然后创建了一个CancelToken源。
//接下来，我们发送一个GET请求，并将cancelToken作为请求配置的一部分传递。
//当我们需要取消请求时，我们调用source.cancel()方法并传递一个可选的取消消息。

//如果请求被取消，catch块将捕获错误，并使用axios.isCancel()方法检查错误是否是由于取消请求引起的。
//如果是，我们可以处理取消请求的情况。

