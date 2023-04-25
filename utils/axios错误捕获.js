import axios from 'axios';

// 添加请求拦截器
axios.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    return config;
  },
  error => {
    // 对请求错误做些什么
    console.log('请求错误:', error);
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    return response;
  },
  error => {
    // 对响应错误做点什么
    console.log('响应错误:', error);
    return Promise.reject(error);
  }
);

// 发送请求
axios.get('https://api.example.com/data')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log('捕获到错误:', error);
  });


  //在这个示例中，我们首先导入了axios，然后添加了请求和响应拦截器。
  //请求拦截器允许您在请求发送之前对其进行修改，而响应拦截器允许您在响应被处理之前对其进行修改。

  //在这里，我们在请求和响应拦截器的错误处理函数中分别打印了请求错误和响应错误。
  //这样，无论何时发生错误，我们都可以在全局范围内捕获并处理它们。
  
  