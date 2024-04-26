# aHooks 用法总结

## 项目中总结

- **useDeepCompareEffect/useDeepCompareLayoutEffect** 用于深度比较，非===， 可以用于挂载框对象的比较
- **useUpdateEffect/useUpdateLayoutEffect** 跳过第一次运行，仅在 update 时更新，可以用于监听 state（非默认值）
- **useSafeState** 在组件卸载后异步回调内的 setState 不再执行，避免因组件卸载后更新状态而导致的内存泄漏；同样可以用于异步 Effect
- **useRafState** 只在 requestAnimationFrame callback 时更新 state，一般用于性能优化。可以用于动画等和 requestAnimationFrame 有关的逻辑。
- **useLocalStorageState** 将状态存储在 localStorage 中的 Hook；可以用于保存设置，或者登录信息
- **useSetState** 管理 object 类型 state 的 Hooks;自动合并对象;可用于管理复杂状态
- **useMount useUnmount useUnmountedRef** 可以用于涉及到 第三方cornerstone 组件初始化、卸载等功能

## Scene 场景

## LifeCycle 生命周期

### useMount 只在组件初始化时执行的 Hook

```typescript
useMount(() => {
  message.info('mount');
});
```

### useUnmount 在组件卸载（unmount）时执行的 Hook

```typescript
useUnmount(() => {
  message.info('Unmount');
});
```

### useUnmountedRef 获取当前组件是否已经卸载的 Hook

```typescript
// unmountedRef.current 代表组件是否已经卸载
const unmountedRef = useUnmountedRef();
useEffect(() => {
  setTimeout(() => {
    if (!unmountedRef.current) {
      message.info('component is alive');
    }
  }, 3000);
}, []);
```

## State

### useSetState 管理 object 类型 state 的 Hooks

```typescript
// 自动合并对象。
interface State {
  hello: string;
  [key: string]: any;
}

const [state, setState] = useSetState<State>({
  hello: '',
});
setState({ hello: 'world' });
setState({ foo: 'bar' });
```

### useBoolean 优雅的管理 boolean 状态的 Hook

```typescript
const [state, { toggle, setTrue, setFalse }] = useBoolean(true);
```

### useToggle 用于在两个状态值间切换的 Hook

```typescript
// 默认为 boolean 切换，基础用法与 useBoolean 一致。
const [state, { toggle, setLeft, setRight }] = useToggle();
const [state, { toggle, set, setLeft, setRight }] = useToggle('Hello', 'World');
```

### useCookieState 一个可以将状态存储在 Cookie 中的 Hook

### useLocalStorageState 将状态存储在 localStorage 中的 Hook

```typescript
const [message, setMessage] = useLocalStorageState<string | undefined>('key', {
  defaultValue: 'Hello~',
});
setMessage('value');
setMessage(undefined);
```

### useSessionStorageState 将状态存储在 sessionStorage 中的 Hook

### useDebounce 用来处理防抖值的 Hook

### useThrottle 用来处理节流值的 Hook

### useMap

### useSet

### usePrevious 保存上一次状态的 Hook

### useRafState 只在 requestAnimationFrame callback 时更新 state，一般用于性能优化

```typescript
const [state, setState] = useRafState({
  width: 0,
  height: 0,
});

useEffect(() => {
  const onResize = () => {
    setState({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    });
  };
  onResize();

  window.addEventListener('resize', onResize);

  return () => {
    window.removeEventListener('resize', onResize);
  };
}, []);
```

### useSafeState 在组件卸载后异步回调内的 setState 不再执行，避免因组件卸载后更新状态而导致的内存泄漏

```typescript
const [value, setValue] = useSafeState<string>();

useEffect(() => {
  setTimeout(() => {
    setValue('data loaded from server');
  }, 5000);
}, []);
```

### useGetState 额外提供了一个 getter 方法，用于获取最新的 值

```typescript
const [count, setCount, getCount] = useGetState<number>(0);
```

### useResetState 额外提供了一个 reset 方法

```typescript
const [state, setState, resetState] = useResetState<State>({
  hello: '',
  count: 0,
});
```

## Effect

### **useUpdateEffect/useUpdateLayoutEffect** 跳过第一次运行，仅在 update 时更新

### **useAsyncEffect** 异步 Effect

```typescript
function mockCheck(): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 3000);
  });
}

useAsyncEffect(async () => {
  setPass(await mockCheck());
}, []);

useAsyncEffect(
  async function* () {
    setPass(undefined);
    const result = await mockCheck(value);
    yield; // 检查效果是否仍然有效，如果已经清理干净，就停在这里。
    setPass(result);
  },
  [value]
);
```

### useDeepCompareEffect/useDeepCompareLayoutEffect 用于深度比较，非===

```typescript
useDeepCompareEffect(() => {
  // 仅仅执行一次 ，对比方式同 lodash.isEqual
  deepCompareCountRef.current += 1;
  return () => {
    // do something
  };
}, [{}]);
```
