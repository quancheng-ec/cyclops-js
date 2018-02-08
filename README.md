# CyclopsJS

前端异常及性能监控

## Usage

在 html 最前部加载 cyclops 并初始化

```html
  <script src="your.domain/cyclops.js" />
  <script>
    const conf = {
      // ... 配置项
    }
    const cyclops = new Cyclops(conf)
    cyclops.start()
  </script>
```

## Config

still working

## Working Progress

* [x] log script error

* [x] log assets error

* [x] log xhr error

* [ ] log fetch error

* [ ] log bad performance

* [ ] log adapter
