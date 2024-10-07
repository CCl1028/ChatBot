import { createStore } from 'vuex'
// 类似 Redux 中的建立状态树

export default createStore({

  // 1、 存储所有全局数据
  state: {
    person: {
      name: '张三',
      age: 20
    },
    routerArrary: [{
      name: 'Vue3 知识',
      index: '1',
      children: [{
        name: 'Vue Echarts',
        index: '1-1',
        path: '/home/echarts'
      }, {
        name: 'components 标签',
        index: '1-2',
        path: '/home/componentsLine'
      }, {
        name: '前端加密',
        index: '1-3',
        path: '/home/encryptDemo'
      }, {
        name: '计算属性和监听',
        index: '1-4',
        path: '/home/computedOrWatch'
      }, {
        name: '父子组件传值与自制目录',
        index: '1-5',
        path: '/home/fatherToSonValue'
      }, {
        name: '注入和提供',
        index: '1-6',
        path: '/home/injectAndProvide'
      }, {
        name: '打包',
        index: '1-7',
        children: [{
          name: 'Vite 知识',
          index: '1-7-1',
          path: ''
        }
        ]
      }]
    }, {
      name: 'TypeScript',
      index: '2'
    }, {
      name: 'CSS3 动画制作',
      index: '3',
      children: [{
        name: 'CSS3测试',
        index: '3-1',
        path: '/home/CSS3'
      }]
    }, {
      name: '聊天机器人',
      index: '4',
      children: [{
        name: '主页',
        index: '4-1',
        path: '/home/chatbot'
      }]
    },{
      name:'23种设计模式',
      index:'5',
      children:[{
        name:'创建型',
        index:'5-1',
        children:[{
          name:'工厂方法模式',
          index:'5-1-1',
          path:'/designModel/factory_method_pattern'
        },{
          name:'抽象工厂模式',
          index:'5-1-2',
          path:'/designModel/abstract_factory_pattern'
        },{
          name:'单例模式',
          index:'5-1-3',
          path:'/designModel/Singleton'
        },{
          name:'建造模式',
          index:'5-1-4',
          path:'/designModel/Builder'
        },{
          name:'原型模式',
          index:'5-1-5',
          path:'/designModel/Prototype'
        }]
      },{
        name:'行为型',
        index:'5-2',
        children:[{
          name:'迭代器模式',
          index:'5-2-1',
          path:'/designModel/Iterator'
        },{
          name:'观察者模式',
          index:'5-2-2',
          path:'/designModel/Observer'
        },{
          name:'模板方法',
          index:'5-2-3',
          path:'/designModel/TemplateMethod'
        },{
          name:'命令模式',
          index:'5-2-4',
          path:'/designModel/Command'
        },{
          name:'状态模式',
          index:'5-2-5',
          path:'/designModel/State'
        },{
          name:'策略模式',
          index:'5-2-6',
          path:'/designModel/Strategy'
        },{
          name:'职责链模式',
          index:'5-2-7',
          path:'/designModel/Responsibility'
        },{
          name:'中介者模式',
          index:'5-2-8',
          path:'/designModel/Mediator'
        },{
          name:'访问者模式',
          index:'5-2-9',
          path:'/designModel/Visitor'
        },{
          name:'解释器模式',
          index:'5-2-10',
          path:'/designModel/Interpreter'
        },{
          name:'备忘录模式',
          index:'5-2-11',
          path:'/designModel/Memento'
        }]
      },{
        name:'结构型',
        index:'5-3',
        children:[{
          name:'组合模式',
          index:'5-3-1',
          path:'/designModel/Composite'
        },{
          name:'外观模式',
          index:'5-3-2',
          path:'/designModel/Facade'
        },{
          name:'代理模式',
          index:'5-3-3',
          path:'/designModel/Proxy'
        },{
          name:'适配器模式',
          index:'5-3-4',
          path:'/designModel/Adapter'
        },{
          name:'装饰模式',
          index:'5-3-5',
          path:'/designModel/Decrator'
        },{
          name:'桥模式',
          index:'5-3-6',
          path:'/designModel/Bridge'
        },{
          name:'享元模式',
          index:'5-3-7',
          path:'/designModel/Flyweight'
        }]
      }]
    }],
    breadcrumbDate:{
      nameList:[],
      name:'',
      path:'home'
    },
    isLoading: false,
    
  },

  // 2、 需要通过计算获取state里的内容获取的数据
  // 只能读取不可修改
  getters: {
    getPerson(state) {
      return state.person
    }
  },

  //  3、定义对state的各种操作
  // why不直接实现在mutation里需要写到action里?
  // mtations不能执行异步操作。aq:从云端获取信息-->(等待云端反馈)更新到state异步操作
  // 因此说:对于异步操作需要放到action里，简单的直接赋值操作可以直接放到mutation里
  mutations: {
    updataPerson(state, pserson) {
      state.person.name = pserson.name;
    },
    updateBreadcrumbDate(state,obj){
      state.breadcrumbDate = obj
    },
    updateLoading(state, status) {
      state.isLoading = status;
    }
  },

  // 3、定义对state的各种操作
  // actions无法直接修改state，需要在mutations里更新
  // mutation不支持异步，所以需要在action里写api到url
  actions: {
    // 比说action定义了更新state的操作
    // 但是不可对其直接修改
    // 所有的修改操作必须放到mutations里
  },

  // state中信息过长时
  // 用来将state进行分割
  // 如下，将state树分割出一个user state。
  modules: {
    // user: ModuleUser,
  }
})

