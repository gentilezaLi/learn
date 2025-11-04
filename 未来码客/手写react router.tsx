// browserRouter
import { createContext, useState, useEffect } from 'react'

export const RouterContext = createContext()
// 针对history创建context，关联页面路径切换
export const HistoryContext = createContext()

export function useRouter() {
  return useContext(RouterContext)
}

function BrowserRouter(props) {
  const [path, setPath] = useState(window.location.pathname)

  // 监听popstate
  useEffect(() => {
    const handlePopstate = function (event) {
      const { pathname } = window.location
      setPath(pathname)
    }
    // 监听用户点击浏览器的前进，后退按钮跳转页面
    window.addEventListener('popstate', handlePopstate)

    return () => {
      window.removeEventListener('popstate', handlePopstate)
    }
  }, [])

  // 点击ui跳转页面
  const push = function (path) {
    setPath(path)
    window.history.pushState({ path }, null, path)
  }

  const goBack = function () {
    window.history.go(-1)
  }

  return (
    <RouterContext.Provider value={path}>
      // 针对用户操作 单独创建上下文环境
      <HistoryContext.Provider
        value={{
          push,
          goBack,
        }}
      >
        {props.children} // Route path 是否渲染 component
      </HistoryContext.Provider>
    </RouterContext.Provider>
  )
}

export default BrowserRouter

// Route
// 创建Route组件，根据当前路径决定是否渲染对应的组件。
export function Route({ path: componentPath, element }) {
  const { path } = useRouter()

  // 简单路径匹配（支持精确匹配）
  const match = componentPath === path

  return match ? element : null
}

// Link组件
export const Link: React.FC<{
  to: string
  children: React.ReactNode
}> = ({ to, children }) => {
  const { navigate } = useContext(RouterContext)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    navigate(to)
  }

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  )
}

// useNavigate hook
export const useNavigate = () => {
  const { navigate } = useContext(RouterContext)
  return navigate
}

// 如何使用

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from './mini-router-dom'
import './index.css'
import User from './view/User'
import Name from './view/Name'

// path / user
// path / name Name
ReactDOM.render(
  <BrowserRouter>
    <Route path="/" component={User} />
    <Route path="/name" component={Name} />
  </BrowserRouter>,
  document.getElementById('root')
)

// User页面中如何跳转到Name页面
import { useContext } from 'react'
import { HistoryContext } from '../mini-router-dom/BrowserRouter'
export default function User() {
  const { push } = useContext(HistoryContext)
  const onGoToName = () => {
    push('/name')
  }
  return (
    <div>
      user<button onClick={onGoToName}>跳转</button>
    </div>
  )
}
