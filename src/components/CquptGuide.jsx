import React, { useState } from 'react';
import { 
  Home, 
  Utensils, 
  BookOpen, 
  Truck, 
  ShieldAlert, 
  MapPin, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronRight,
  Flame,
  Zap,
  Info,
  Sparkles
} from 'lucide-react';

export default function CquptGuide({ onBack }) {
  const [activeTab, setActiveTab] = useState('dorm');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('ALL');

  // Realistic and Comprehensive CQUPT Data
  const categories = [
    { id: 'dorm', label: '🏡 宿舍指南', icon: Home, count: 5 },
    { id: 'canteen', label: '🍲 食堂美食', icon: Utensils, count: 6 },
    { id: 'academic', label: '📚 选课与学业', icon: BookOpen, count: 5 },
    { id: 'express', label: '📦 快递与出行', icon: Truck, count: 4 },
    { id: 'avoid', label: '⚠️ 新生避坑大赏', icon: ShieldAlert, count: 7 },
    { id: 'life', label: '💡 校园生活神器', icon: Zap, count: 5 }
  ];

  const guideData = {
    dorm: [
      {
        title: '五大苑区分布（明理、宁静、知行、兴业、明志）',
        tag: '最新苑区格局',
        type: 'RECOMMENDED',
        location: '全校宿舍区',
        details: '全校宿舍均配备空调。1.明理苑（9栋，明理1舍/3舍升级集中供热水系统）；2.宁静苑（女生集中，近老图）；3.知行苑（工科男生集中，近太极操场）；4.兴业苑（地势最高，3/4/5舍已完成暑期热水改造，连夺命天梯）；5.明志苑（新建标准化公寓，卫浴三分离，配套滨湖餐厅）。',
        tips: [
          '宿舍门禁时间为 23:30，晚归可刷校园卡走应急通道',
          '床铺尺寸多为 0.9m × 2.0m，楼下配有公共开水房、自助洗衣机与烘干机',
          '报到材料务必随身携带（录取通知书、身份证、准考证、学籍档案、团组织关系及10张1寸+4张2寸照片）'
        ]
      },
      {
        title: '🚫 宿舍违禁电器与积分扣分清单 (官方规定)',
        tag: '宿舍红线',
        type: 'WARNING',
        location: '全校宿舍栋楼',
        details: '重邮后勤对宿舍违禁电器巡查严格！无3C认证电器一律严禁。违规将被通报扣除行为积分。',
        tips: [
          '❌ 绝对禁止存放使用：电饭煲/电煮锅/电磁炉/养生壶、大功率电热水壶(>2000W)、电热毯(非暖脚型)、烘干机/发热衣架、大功率吹风机、小冰箱、微波炉、洗衣机',
          '⚠️ 人走必须断电（否则积分扣分）：吹风机、卷发棒、电热毯式暖脚器(<500W)、加湿器/除湿器(<500W)、恒温暖杯垫(<500W)、电脑加热垫',
          '🚫 严禁遮光床帘、装饰彩灯、电热毯与刀具加工食品'
        ]
      },
      {
        title: '知行苑（1-6舍 / C区等）',
        tag: '核心生活区',
        type: 'RECOMMENDED',
        location: '学校中心地带',
        details: 'C4/C5/C6等栋。离食堂、新教、太极操场、教急快递点都非常近。生活极其便利，下楼即是小吃街和超市。',
        tips: [
          '4人/6人间，绝大多数上床下桌',
          '楼下配有公共洗衣机与烘干机（重邮9月天气潮湿，烘干机是必备神技）',
          '水电气故障可直接在“We重邮”小程序报修'
        ]
      },
      {
        title: '兴业苑（兴业大楼 / 夺命天梯区）',
        tag: '运动锻炼区',
        type: 'WARNING',
        location: '太极操场上方',
        details: '以“夺命天梯”闻名！每天上学相当于爬山锻炼。环境优美，依山而建，视野极佳。兴业3/4/5舍已完成最新供热水系统改造。',
        tips: [
          '上课务必提前15-20分钟出门，预留爬天梯和等电梯的时间',
          '离兴业苑食堂与芊芊美食城（原红高粱）近，晚上宵夜选择丰富'
        ]
      },
      {
        title: '宿舍必备清单与水电避坑',
        tag: '生活常识',
        type: 'IMPORTANT',
        location: '全校宿舍适用',
        details: '重邮宿舍电费需提前预充值，断电通常是因为欠费或违禁电器触发自动断路器。',
        tips: [
          '充电费：通过“We重邮”小程序 -> 校园卡 -> 水电充值',
          '建议自备除湿盒/除湿袋，应对南山潮湿季'
        ]
      }
    ],
    canteen: [
      {
        title: '芊芊美食城（原红高粱食堂 / 夺命天梯顶端）',
        tag: '重装升级',
        type: 'RECOMMENDED',
        location: '兴业苑片区',
        details: '原红高粱食堂重装升级为“芊芊美食城”！环境与档口档次显著提升，不仅保持了早餐生煎包与夜宵传统，还引进了各种特色小吃与快餐。',
        tips: ['晚上宵夜人气极高，干锅与烧烤是保留项目', '虽然价格随品质有所微调，但依然是兴业苑同学的深夜食堂']
      },
      {
        title: '中心食堂 (3元小面与极高性价比)',
        tag: '性价比最高',
        type: 'RECOMMENDED',
        location: '学校地理中心',
        details: '小红书/知乎学长学姐力荐！重邮体量最大的食堂之一，3元一碗的重邮小面是无数毕业生念念不忘的白月光。一楼自选快餐是性价比首选。',
        tips: ['正餐人均10-15元，中午12:00高峰期建议错峰就餐', '3元重邮小面早晨排队极长，建议提前去体验']
      },
      {
        title: '千喜鹤食堂 (工业风打卡标杆)',
        tag: '网红风貌',
        type: 'RECOMMENDED',
        location: '靠近明理苑/宁静苑',
        details: '重邮最早重装为复古工业风的食堂之一！环境优雅，光线温馨。提供精致小火锅、日韩料理、烧腊饭及各类特色铁板。',
        tips: ['适合聚餐打卡与约会就餐', '二楼窗口样式丰富，高峰期座位较抢手']
      },
      {
        title: '延生食堂 (经典老牌人气店)',
        tag: '经典口碑',
        type: 'RECOMMENDED',
        location: '教学区与宿舍交界处',
        details: '重邮老牌食堂代表！以豆汤泡饭、双拼卤肉饭、砂锅米线等经典家常味深受学子喜爱，性价比极佳。',
        tips: ['招牌豆汤泡饭与双拼卤肉饭必点', '出餐速度快，适合课间快速就餐']
      },
      {
        title: '滨湖餐厅 (明志苑新建配套食堂)',
        tag: '全新体验',
        type: 'RECOMMENDED',
        location: '明志苑片区',
        details: '明志苑新建标准化公寓配套食堂，环境与现代化窗口全面升级，支持室内休息与活动。',
        tips: ['适合明志苑及附近住户，就餐环境安静舒适']
      },
      {
        title: '大西北食堂 (清真与面食天堂)',
        tag: '特色风味',
        type: 'RECOMMENDED',
        location: '宁静苑附近',
        details: '主打西北风味，面食爱好者和北方同学的最爱！拉面、大盘鸡、肉夹馍、刀削面地道实惠。',
        tips: ['设有清真专属窗口', '大盘鸡分量很大，建议2-3人合点']
      },
      {
        title: '校外后花园：黄桷垭 & 南山火锅',
        tag: '校外美食',
        type: 'RECOMMENDED',
        location: '学校大门/黄桷垭老街',
        details: '重邮学子的后花园！聚餐必吃南山陆派火锅、黄桷垭老街小吃、九村烤脑花、串串香。',
        tips: ['周末聚餐建议提前打车或预订']
      }
    ],
    academic: [
      {
        title: '🏛️ 重邮最新五大学院调整 (2025重大架构革新)',
        tag: '学院重组',
        type: 'IMPORTANT',
        location: '全校教学与科研基地',
        details: '重邮于2025年5月完成重大教学与科研机构调整，成立五大新学院：1.计算机科学与技术学院；2.人工智能学院；3.电子科学与工程学院；4.集成电路学院；5.数学与统计学院。',
        tips: [
          '大一新生在选课、找导师或查看专业培养方案时，务必关注所属新学院的官方公众号与最新教务处公告',
          '大类招生分流方向与各新学院科研实验室紧密挂钩，建议尽早了解实验室招新规程'
        ]
      },
      {
        title: '选课测评红黑榜 (2025选课真实口碑)',
        tag: '选课红黑榜',
        type: 'RECOMMENDED',
        location: '选课参考评教库',
        details: '根据学长学姐真实选课反馈：通识课与工程课选老师至关重要！',
        tips: [
          '🌟 推荐好老师：《工程伦理》《工程与社会》首选【刘坤】老师（幽默神中神，课讲得有趣给分高），【付佳】【尹龙】老师（和善不强迫，分高）；《工程管理与经济决策》【丁冬】老师（透题怪，最后一节课讲啥考啥），【李立平】女老师（人好爱给机会）',
          '⚠️ 避坑预警：《工程伦理》【张世云】老师（抽人频繁，平时分与小组汇报给分极低，不推荐）；【杨振国】老师（作业需与课本一字不落，开卷考要买专门书，较古板）；【崔亚平】《融合创新与产品运营》（3学分但事务繁多）'
        ]
      },
      {
        title: '大类培养与专业分流规则',
        tag: '学业分流',
        type: 'IMPORTANT',
        location: '教务处',
        details: '重邮工科专业多数实行大类招生！大一统一修读通识基础课（高数、线代、C语言）。',
        tips: [
          '大一学年末将结合大一学业成绩GPA与个人志愿进行专业分流',
          '绩点直接决定你能否进入热门的计算机科学与技术、人工智能、软件工程等专业'
        ]
      },
      {
        title: '选课系统避坑与手速攻略',
        tag: '选课核心',
        type: 'IMPORTANT',
        location: '重庆邮电大学一体化教学平台',
        details: '选课是大学第一战！系统开放瞬间容易卡顿崩溃，需做好充足准备。',
        tips: [
          '提前在教务系统拉出预选清单，记下课程代码与教师姓名',
          '不要用校园网WiFi选课，建议提前用5G hotspot或校内有线网'
        ]
      },
      {
        title: '重邮王牌专业与保研/考研',
        tag: '学业规划',
        type: 'RECOMMENDED',
        location: '全校教学楼/实验室',
        details: '重邮作为“中国数字通信发祥地”，通信、芯片、人工智能、计算机实验室设备处于行业领先水平。',
        tips: [
          '大一绩点（GPA）至关重要！转专业、奖学金（国家奖学金8000元/年）、保研全看大一绩点'
        ]
      },
      {
        title: '重邮校园网绑定与WiFi设置 (30元/月)',
        tag: '网络指南',
        type: 'IMPORTANT',
        location: '统一身份认证平台',
        details: '宿舍区有线宽带30元/月，校园公共区域（教学楼、图书馆、实验室）WiFi全覆盖。包含390G大流量套餐。',
        tips: [
          '网络绑定方法：搜索连接校园网WiFi (CQUPT) -> 自动弹出认证界面 -> 登录学号与统一身份认证密码',
          '实验室台式机需要通过已办好的校园网账号登录才能连接外网'
        ]
      }
    ],
    express: [
      {
        title: '📦 校内快递驿站分布与错峰取件',
        tag: '快递取件避坑',
        type: 'RECOMMENDED',
        location: '教急快递中心 / 各苑区菜鸟驿站',
        details: '校内快递主要集中在【教急快递服务中心】以及知行苑、兴业苑、明理苑下方的菜鸟驿站。开学季和双11包裹量巨大，均采取自助扫码查取模式。',
        tips: [
          '📮 快递地址规范写法：重庆市南岸区崇文路2号重庆邮电大学 + [所在苑区名称+楼栋号+寝室号]',
          '⚠️ 避坑 Peak 极惨时段：绝对避开 12:00-13:00（午饭后）与 21:00-22:30（寝室关门前），这两个时段排队查码闸机队伍能排几百米！推荐在上午10点前或下午4点前错峰取件',
          '🛒 大件箱包：开学前提前网购的行李被褥包裹，收到取件码后再去取，驿站门口通常有小推车可租借'
        ]
      },
      {
        title: '🚗 上下山交通与崇文路大堵车预警',
        tag: '交通拥堵避坑',
        type: 'WARNING',
        location: '崇文路 / 南山路段',
        details: '重邮地处南山风景区，崇文路是唯一上下山主干道！由于路窄坡陡弯多，早晚上下班高峰（7:30-9:00, 17:30-19:00）以及周末/节假日南山游客爆满时，崇文路常面临“大瘫痪”。',
        tips: [
          '🚌 公交线路：346路（直达南坪商圈）、347路（直达菜园坝/解放碑）。早高峰赶考或赶火车务必提前1.5小时以上出门预留堵车时间',
          '🚇 地铁换乘：从学校坐346/347下山至【上新街站】换乘轨道交通 6号线/环线，是避开主城陆路大堵车最稳妥的方案',
          '🚫 严禁滑板/自行车：山城陡坡落差大，绝不能买滑板或骑共享单车，极其危险'
        ]
      },
      {
        title: '🚕 校内打车/网约车定位漂移与接驾地点避坑',
        tag: '打车定位技巧',
        type: 'IMPORTANT',
        location: '校门口 / 逸夫科技楼 / 老校门',
        details: '因重邮建在南山山坡上，高层建筑与山体阻挡导致 GPS 信号常出现漂移，司机若不熟悉山路极易迷路或开错门（如定位在山上结果司机开到了山脚下）。',
        tips: [
          '📍 正确定位地址：不要直接定在寝室楼深处！建议上车地点定在【重邮老校门】、【新校门】或【逸夫科技楼】等大标示性建筑入口',
          '📞 提前沟通：叫单后第一时间给司机打电话沟通：“师傅我是重邮学生，我在XX校门出入口等你”，确认司机上山路线',
          '🌧️ 大雨天/旅游季：雨天及节假日南山很难叫到网约车，建议提前高德/滴滴预约预约单，或者选择坐 346/347 公交下山后再打车'
        ]
      },
      {
        title: '🛵 校内小白车 (园区接驳公交) 乘坐攻略',
        tag: '校内交通',
        type: 'RECOMMENDED',
        location: '环校主干道',
        details: '校内有运行的园区接驳小巴（小白车），招手即停，支持刷校园卡或扫码，是爬天梯和懒人赶课的绝对神器。',
        tips: [
          '早高峰（7:50-8:10）小白车极度抢手，往往满载不停车，赶课尽量提前出门',
          '路线覆盖主要宿舍区与各大教学楼'
        ]
      },
      {
        title: '重邮气候与防潮神器',
        tag: '环境气候',
        type: 'IMPORTANT',
        location: '重庆南山环境',
        details: '9-10月重庆气温依旧较高（“秋老虎”），随后进入漫长湿冷的大雾梅雨季。',
        tips: [
          '衣柜必须买除湿袋/除湿盒，防止衣服发霉',
          '随身携带雨伞：南山天气多变，随时可能下雨'
        ]
      }
    ],
    avoid: [
      {
        title: '🚨 避坑 1：床上用品（线下扫楼 vs 暑期线上推销 vs 推荐正规购买）',
        tag: '床品防骗',
        type: 'WARNING',
        location: '暑期QQ/微信群 / 新生寝室门',
        details: '【暑期线上/开学线下双重套路】：7-8月暑期有代理在非官方“新生QQ群/小红书”私信推销“重邮合作特惠床品九件套”；9月开学当晚更有假冒“学长学姐”直接进宿舍扫楼卖300-500元劣质黑心棉。',
        tips: [
          '❌ 避坑：99% 的私信推销和上门扫楼均为黑心棉劣质产品，售价虚高且无售后',
          '✅ 推荐正规购买途径：1. 提前网购国标A类床品直接邮寄到学校所在苑区驿站（被子规格选 1.5m×2.0m，床垫选 0.9m×2.0m）；2. 报到当天前往校内重邮正规超市购买；3. 现场学校后勤官方自愿采购点购买',
          '📌 官方警示：学校绝不会派任何个人进寝室推销床品！'
        ]
      },
      {
        title: '📱 校园卡/手机卡：真实优惠揭秘 vs 办理防诈指南',
        tag: '办卡客观指南',
        type: 'NEUTRAL',
        location: '暑期线上扫码 / 校内营业厅',
        details: '【客观事实】：三大运营商（移动/电信/联通）针对大一新生推出的“校园卡/大流量套餐”确实拥有普通商业卡难以企及的超高性价比（如 30-40元/月 包含 150G-390G 专属流量与校内宽带）。暑期线上正规代理渠道办理确实能提前拿到卡并在开学使用，并非完全不能办理。',
        tips: [
          '🌟 真实优惠点：校园卡包含的通用流量+校内定向流量非常充足，且绑定校园网宽带账号后性价比极高',
          '⚠️ 防诈识别关键：1. 确认办理页面为运营商官方域名/官方小程序（或认准重邮官方 cqupt.edu.cn 入口）；2. 拒绝任何要求“私下向个人微信/QQ转账”或“私传手持身份证照”的个人中介；3. 看清合约期（避免被偷偷绑定24个月无法注销的远郊漫游套餐）',
          '💡 稳妥建议：如果不确定线上链接真伪，完全可以等到开学报到当天，前往校内【移动/电信/联通官方实体营业厅】现场选号办理，同样享受新生专属优惠套餐！'
        ]
      },
      {
        title: '🚗 驾校学车：大学学车优势 vs 正规报名避坑',
        tag: '驾校客观指南',
        type: 'NEUTRAL',
        location: '南山驾校训练场 / 校内招新点',
        details: '【客观事实】：大学期间（尤其是大一/大二课业相对合理时）利用空余时间学车拿驾照确实非常划算且方便，校周边的正规驾校在暑期或开学季也确实会推出面向重邮学生的团购优惠，完全可以报名。',
        tips: [
          '🌟 真实优势：校附近正规驾校接送方便，大学生组团报名往往能争取到学费优惠和优先安排练车的福利',
          '⚠️ 甄别中介与黑驾校：1. 坚决不找“私人代理”手头私下缴费（谨防中介卷款跑路或转手卖给远郊偏僻练车场）；2. 必须看清练车场地的真实位置（重庆山城陡坡多，场地正规且距离近最省心）；3. 签订纸质/电子正规合同，确认费用包含“考试费、补训费、看考场费”等，拒绝后续无休止二次加价',
          '💡 稳妥建议：开学后亲自去南山或校旁练车场地实地看场地、试乘，与学长学姐打听口碑后再正式签订合同缴费。'
        ]
      },
      {
        title: '🚨 避坑 4：校内推销与兼职诈骗',
        tag: '安全红线',
        type: 'WARNING',
        location: '宿舍门前',
        details: '开学头两周，会有自称“学长学姐”的人进宿舍推销英语报纸、四六级资料、上网卡或办卡兼职。',
        tips: [
          '⚠️ 报纸和资料质量差，付款后对方直接拉黑失联',
          '学校官方通知均由辅导员或班导师在班级群发布，绝不会私下上门收钱',
          '遇到陌生人推销，直接拒绝或报告宿管阿姨'
        ]
      },
      {
        title: '🚨 避坑 5：军训防晒与防暑救命指南',
        tag: '军训生存',
        type: 'IMPORTANT',
        location: '太极操场 / 运场',
        details: '9月重庆号称“火炉”，军训烈日下站军姿对体能是巨大考验。',
        tips: [
          '防晒霜：必须买高倍数防水防汗防晒霜（如SPF50+），每2小时补涂一次',
          '鞋垫：军训鞋底较硬，一定要买厚实软吸汗的“军训防晒卫生巾鞋垫”或硅胶鞋垫',
          '防暑药品：随身带藿香正气口服液、葡萄糖水，身体不适立刻向教官请假，切勿硬撑'
        ]
      },
      {
        title: '🚨 避坑 6：挂科与重修代价',
        tag: '学业警示',
        type: 'WARNING',
        location: '教务处',
        details: '大学没有“60分万岁”！挂科不仅影响评优评奖、保研，重修还要缴纳重修学费，且成绩单上留有记录。',
        tips: [
          '平时分（出勤+作业）占总成绩 30%-40%，千万不要旷课逃课',
          '期末复习周（划重点周）一定要认真对待学长学姐传承的“历年试卷与复习笔记”'
        ]
      },
      {
        title: '🚨 避坑 7：社团盲目报一堆',
        tag: '时间管理',
        type: 'NEUTRAL',
        location: '百团大战',
        details: '开学“百团大战”时社团招新眼花缭乱，很多新生一口气报4-5个社团，导致精疲力竭。',
        tips: [
          '建议最多报 1个兴趣类社团 + 1个校级/院级组织',
          '保持精力放在专业学习和核心技能培养上'
        ]
      },
      {
        title: '🚨 避坑 8：恋爱与人际关系陷阱',
        tag: '心理健康',
        type: 'NEUTRAL',
        location: '情人坡 / 校园',
        details: '大学人际关系比高中复杂，保持独立人格与健康心态最重要。',
        tips: [
          '室友关系多包容沟通，制定宿舍作息公约（熄灯时间、打游戏声音等）',
          '遭遇感情或心理困惑，可随时预约学校心理咨询中心'
        ]
      },
      {
        title: '🚨 避坑 9：二手交易与买卖私下转账',
        tag: '财产安全',
        type: 'WARNING',
        location: '跳蚤市场 / 贴吧',
        details: '购买学长学姐二手电动车、自行车、书籍、台灯时，注意核实物品真实情况。',
        tips: [
          '尽量当面交易验货，切勿先通过微信/支付宝全额转账',
          '二手电动车注意检查电池寿命和校内通行证办理规定'
        ]
      }
    ],
    life: [
      {
        title: '📱 “We重邮” 微信小程序 (必备神器)',
        tag: '超级 APP',
        type: 'RECOMMENDED',
        location: '微信小程序 Search',
        details: '重邮官方掌上校园！集成了课表查询、空教室查询、校园卡充值、水电费缴纳、故障报修、图书借阅。',
        tips: ['进校第一天必须绑定学号！每日课表提醒非常方便']
      },
      {
        title: '🏫 重庆邮电大学一体化教学平台',
        tag: '教务核心',
        type: 'RECOMMENDED',
        location: 'jw.cqupt.edu.cn',
        details: '查成绩、选课、查看培养方案、评教、申请缓考补考的官方平台。',
        tips: ['建议将网址添加至浏览器书签']
      },
      {
        title: '📖 重邮开源代码与课程攻略 GitHub 项目',
        tag: '开源干货',
        type: 'RECOMMENDED',
        location: 'GitHub Search: CQUPT',
        details: '重邮学长学姐开源的课程攻略、实验代码、期末复习资料库（如 CQUPT-Course-Guide 等）。',
        tips: ['计算机与通信专业同学的宝藏仓库，期末复习和实验参考极佳']
      },
      {
        title: '🏥 校医院与医疗保险报销',
        tag: '健康保障',
        type: 'NEUTRAL',
        location: '校医院 (靠近中心区)',
        details: '学生均参保重庆市大学生医保。日常感冒发烧、小磕小碰可在校医院看诊，药费报销比例高。',
        tips: ['看病带上身份证和校园卡', '大病转诊至校外三甲医院（如重医附一院）需校医院开具转诊单']
      },
      {
        title: '🏃 跑操与体育达标 (红绿跑)',
        tag: '体育考核',
        type: 'IMPORTANT',
        location: '太极操场 / 体育App',
        details: '重邮每学期有体育打卡/跑操要求，计入体育课平时成绩。',
        tips: ['了解当学期指定的体育打卡App与规定里程', '切勿找人代跑，一旦被系统识别或举报面临纪律处分']
      }
    ]
  };

  const currentItems = guideData[activeTab] || [];

  const filteredItems = currentItems.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tips.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTag = selectedTag === 'ALL' || item.type === selectedTag;

    return matchesSearch && matchesTag;
  });

  return (
    <div style={{
      maxWidth: '850px',
      margin: '0 auto',
      padding: '10px 14px 60px 14px',
      color: 'var(--text-main)',
      fontFamily: 'var(--font-sans)'
    }}>
      {/* Header Banner - CQUPT Aesthetic */}
      <div className="cyber-box" style={{
        padding: '24px',
        marginBottom: '20px',
        background: 'linear-gradient(135deg, rgba(5, 12, 28, 0.95), rgba(15, 23, 42, 0.95))',
        borderColor: 'rgba(0, 240, 255, 0.4)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{
                background: 'linear-gradient(90deg, #ffaa00, #ff007f)',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '0.72rem',
                fontWeight: 'bold',
                color: '#fff'
              }} className="cyber-mono-font">
                CQUPT FRESHMAN GUIDE 2026
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--primary-cyan)' }} className="cyber-mono-font">
                全景实测与搜集
              </span>
            </div>

            <h1 style={{
              fontSize: '1.65rem',
              fontWeight: '900',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              重庆邮电大学 • 新生避坑指南
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '6px', lineHeight: '1.5' }}>
              从“夺命天梯”到千喜鹤美食，从选课手速到防晒防诈。汇聚重邮学长学姐多年实战全方位避坑攻略！
            </p>
          </div>

          {onBack && (
            <button 
              onClick={onBack}
              className="cyber-btn"
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            >
              返回游戏
            </button>
          )}
        </div>

        {/* Quick Stats bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '10px',
          marginTop: '20px',
          paddingTop: '16px',
          borderTop: '1px solid rgba(0, 240, 255, 0.15)'
        }}>
          <div style={{ background: 'rgba(0, 240, 255, 0.05)', padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(0, 240, 255, 0.15)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>校训精神</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--primary-cyan)' }}>修德博学 求实创新</div>
          </div>
          <div style={{ background: 'rgba(255, 170, 0, 0.05)', padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(255, 170, 0, 0.15)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>校区地址</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--accent-amber)' }}>重庆市南岸区崇文路2号</div>
          </div>
          <div style={{ background: 'rgba(255, 0, 127, 0.05)', padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(255, 0, 127, 0.15)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>掌上服务</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--accent-pink)' }}>We重邮 小程序</div>
          </div>
        </div>
      </div>

      {/* Search & Tag Filter Bar */}
      <div className="cyber-box" style={{ padding: '14px 18px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="搜索避坑关键词（如：天梯、选课、防晒、推销）..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="cyber-input"
              style={{ paddingLeft: '36px', fontSize: '0.88rem' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {[
              { id: 'ALL', label: '全部' },
              { id: 'RECOMMENDED', label: '👍 推荐' },
              { id: 'WARNING', label: '⚠️ 避坑 Warning' },
              { id: 'IMPORTANT', label: '❗ 重要须知' }
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setSelectedTag(t.id)}
                style={{
                  background: selectedTag === t.id ? 'rgba(0, 240, 255, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                  border: `1px solid ${selectedTag === t.id ? 'var(--primary-cyan)' : 'rgba(255, 255, 255, 0.1)'}`,
                  color: selectedTag === t.id ? 'var(--primary-cyan)' : 'var(--text-muted)',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(125px, 1fr))',
        gap: '8px',
        marginBottom: '20px'
      }}>
        {categories.map(cat => {
          const IconComp = cat.icon;
          const isActive = activeTab === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => { setActiveTab(cat.id); }}
              style={{
                background: isActive ? 'linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(157, 0, 255, 0.2))' : 'rgba(10, 16, 30, 0.6)',
                border: `1px solid ${isActive ? 'var(--primary-cyan)' : 'rgba(255, 255, 255, 0.1)'}`,
                color: isActive ? '#fff' : 'var(--text-muted)',
                padding: '12px 8px',
                borderRadius: '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                fontSize: '0.82rem',
                fontWeight: isActive ? 'bold' : 'normal',
                transition: 'all 0.2s ease',
                boxShadow: isActive ? '0 0 12px rgba(0, 240, 255, 0.2)' : 'none'
              }}
            >
              <IconComp size={15} color={isActive ? 'var(--primary-cyan)' : 'var(--text-muted)'} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredItems.length === 0 ? (
          <div className="cyber-box" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
            <Info size={32} style={{ marginBottom: '8px', color: 'var(--primary-cyan)' }} />
            <p>未找到符合条件的避坑指南条目</p>
          </div>
        ) : (
          filteredItems.map((item, idx) => (
            <div key={idx} className="cyber-box" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {item.type === 'WARNING' && <AlertTriangle size={20} color="var(--accent-red)" />}
                  {item.type === 'RECOMMENDED' && <CheckCircle2 size={20} color="var(--accent-green)" />}
                  {item.type === 'IMPORTANT' && <Flame size={20} color="var(--accent-amber)" />}
                  {item.type === 'NEUTRAL' && <Sparkles size={20} color="var(--primary-cyan)" />}

                  <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fff' }}>
                    {item.title}
                  </h3>
                </div>

                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <span style={{
                    fontSize: '0.72rem',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <MapPin size={12} color="var(--primary-cyan)" /> {item.location}
                  </span>

                  <span style={{
                    fontSize: '0.72rem',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    background: item.type === 'WARNING' ? 'rgba(255, 51, 102, 0.15)' : item.type === 'RECOMMENDED' ? 'rgba(0, 255, 136, 0.15)' : 'rgba(255, 170, 0, 0.15)',
                    color: item.type === 'WARNING' ? 'var(--accent-red)' : item.type === 'RECOMMENDED' ? 'var(--accent-green)' : 'var(--accent-amber)',
                    border: `1px solid ${item.type === 'WARNING' ? 'var(--accent-red)' : item.type === 'RECOMMENDED' ? 'var(--accent-green)' : 'var(--accent-amber)'}`
                  }}>
                    {item.tag}
                  </span>
                </div>
              </div>

              <p style={{
                fontSize: '0.92rem',
                color: 'var(--text-main)',
                lineHeight: '1.6',
                marginBottom: '14px',
                background: 'rgba(0, 0, 0, 0.2)',
                padding: '12px 14px',
                borderRadius: '8px'
              }}>
                {item.details}
              </p>

              {item.tips && item.tips.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--primary-cyan)', fontWeight: 'bold' }} className="cyber-mono-font">
                    💡 学长学姐建议 / TIPS:
                  </div>
                  {item.tips.map((tip, tIdx) => (
                    <div key={tIdx} style={{
                      fontSize: '0.85rem',
                      color: 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '6px',
                      lineHeight: '1.5'
                    }}>
                      <ChevronRight size={14} color="var(--accent-pink)" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Footer Banner */}
      <div style={{ marginTop: '30px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.78rem' }} className="cyber-mono-font">
        © 2026 重庆邮电大学新生避坑指南 • 修德博学 求实创新
      </div>
    </div>
  );
}
