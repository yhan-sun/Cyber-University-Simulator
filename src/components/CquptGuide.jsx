import React, { useState, useEffect } from 'react';
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
  Sparkles,
  ArrowLeft,
  Share2,
  Compass,
  Navigation,
  Info,
  Clock,
  ExternalLink,
  Flame,
  Zap,
  Bookmark
} from 'lucide-react';

export default function CquptGuide({ onBack }) {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('ALL');
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [showToast, setShowToast] = useState(false);

  // Tab configurations tailored for mobile UX
  const tabs = [
    { id: 'all', label: '全部指南', icon: Compass },
    { id: 'dorm', label: '宿舍分布', icon: Home },
    { id: 'canteen', label: '美食食堂', icon: Utensils },
    { id: 'academic', label: '选课与学院', icon: BookOpen },
    { id: 'express', label: '交通避堵', icon: Truck },
    { id: 'avoid', label: '避坑红线', icon: ShieldAlert },
  ];

  const allGuideItems = [
    // 宿舍
    {
      id: 'dorm-1',
      category: 'dorm',
      title: '五大苑区分布（明理、宁静、知行、兴业、明志）',
      tag: '最新苑区格局',
      type: 'RECOMMENDED',
      location: '全校宿舍区',
      summary: '全校宿舍均配备空调。知行/明理靠近核心区，兴业苑靠山顶连“夺命天梯”，明志苑为新建标准化公寓。',
      details: '全校宿舍均配备空调。1.明理苑（9栋，明理1舍/3舍暑期已完成热水系统改造）；2.宁静苑（女生集中，靠近老图书馆）；3.知行苑（工科男生集中，近太极操场与核心区）；4.兴业苑（地势最高，3/4/5舍已完成热水改造，连夺命天梯）；5.明志苑（新建标准化公寓，卫浴三分离，配套滨湖餐厅）。',
      tips: [
        '宿舍门禁时间为 23:30，晚归可刷校园卡走应急通道',
        '床铺尺寸多为 0.9m × 2.0m，楼下配有公共开水房、自助洗衣机与烘干机',
        '报到材料随身携带（录取通知书、身份证、准考证、学籍档案、团组织关系及10张1寸+4张2寸照片）'
      ]
    },
    {
      id: 'dorm-2',
      category: 'dorm',
      title: '🚫 宿舍违禁电器与积分扣分清单 (官方红线)',
      tag: '宿舍管理',
      type: 'WARNING',
      location: '全校宿舍栋楼',
      summary: '无3C认证电器一律禁存。违规使用或人走未断电将被通报并扣除公寓行为积分。',
      details: '重邮后勤对宿舍违禁电器巡查严格！无3C认证电器一律严禁。违规将被通报扣除行为积分。',
      tips: [
        '❌ 绝对禁止存放使用：电饭煲/电煮锅/电磁炉/养生壶、大功率电热水壶(>2000W)、非暖脚电热毯、烘干机/发热衣架、大功率吹风机、小冰箱、微波炉、洗衣机',
        '⚠️ 人走必须断电（违者扣积分）：吹风机、卷发棒、电热毯式暖脚器(<500W)、加湿器/除湿器(<500W)、恒温暖杯垫(<500W)、电脑加热垫',
        '🚫 严禁遮光床帘、装饰彩灯、电热毯与刀具加工食品'
      ]
    },
    // 食堂
    {
      id: 'canteen-1',
      category: 'canteen',
      title: '芊芊美食城（原红高粱食堂 / 夺命天梯顶端）',
      tag: '重装升级',
      type: 'RECOMMENDED',
      location: '兴业苑片区',
      summary: '原红高粱食堂重装升级为芊芊美食城！保持了生煎包与深夜干锅夜宵，环境大幅提升。',
      details: '原红高粱食堂重装升级为“芊芊美食城”！环境与档口档次显著提升，不仅保持了早餐生煎包与夜宵传统，还引进了各种特色小吃与快餐。',
      tips: ['晚上宵夜人气极高，干锅与烧烤是保留项目', '虽然价格随品质有所微调，但依然是兴业苑同学的深夜食堂']
    },
    {
      id: 'canteen-2',
      category: 'canteen',
      title: '中心食堂 (3元重邮小面与高性价比自选)',
      tag: '毕业生白月光',
      type: 'RECOMMENDED',
      location: '学校地理中心',
      summary: '小红书/知乎爆款！重邮体量最大食堂，3元一碗地道重庆小面是毕业生念念念不忘的白月光。',
      details: '重邮体量最大的食堂之一，大众菜品丰富，价格亲民，分量足。一楼自选快餐是性价比首选，3元重邮小面更是全校招牌。',
      tips: ['正餐人均10-15元，中午12:00高峰期建议错峰就餐', '3元重邮小面早晨排队极长，建议提前体验']
    },
    {
      id: 'canteen-3',
      category: 'canteen',
      title: '延生食堂 (经典老牌豆汤泡饭)',
      tag: '经典口碑',
      type: 'RECOMMENDED',
      location: '教学区与宿舍交界',
      summary: '重邮老牌食堂代表！以豆汤泡饭、双拼卤肉饭、砂锅米线等经典家常味深受学子喜爱。',
      details: '重邮老牌食堂代表！以豆汤泡饭、双拼卤肉饭、砂锅米线等经典家常味深受学子喜爱，性价比极佳。',
      tips: ['招牌豆汤泡饭与双拼卤肉饭必点', '出餐速度快，适合课间快速就餐']
    },
    {
      id: 'canteen-4',
      category: 'canteen',
      title: '千喜鹤食堂 (复古工业风标杆)',
      tag: '网红风貌',
      type: 'RECOMMENDED',
      location: '靠近明理苑/宁静苑',
      summary: '工业风网红装修，灯光温馨。提供精致小火锅、日韩料理及特色铁板，适合聚餐约会。',
      details: '重邮最早重装为复古工业风的食堂之一！环境优雅，光线温馨。提供精致小火锅、日韩料理、烧腊饭及各类特色铁板。',
      tips: ['适合聚餐打卡与约会就餐', '二楼窗口样式丰富，高峰期座位较抢手']
    },
    // 选课与学业
    {
      id: 'academic-1',
      category: 'academic',
      title: '🏛️ 重邮最新五大学院调整 (2025重大架构革新)',
      tag: '学院重组',
      type: 'IMPORTANT',
      location: '全校教学与科研基地',
      summary: '重邮于2025年5月成立五大新学院：计算机科学与技术、人工智能、电子科学、集成电路、数统学院。',
      details: '重邮于2025年5月完成重大教学与科研机构调整，成立五大新学院：1.计算机科学与技术学院；2.人工智能学院；3.电子科学与工程学院；4.集成电路学院；5.数学与统计学院。',
      tips: [
        '大一新生在选课、找导师或查看专业培养方案时，务必关注所属新学院的官方公众号与最新教务处公告',
        '大类招生分流方向与各新学院科研实验室紧密挂钩，建议尽早了解实验室招新规程'
      ]
    },
    {
      id: 'academic-2',
      category: 'academic',
      title: '选课测评红黑榜 (2025选课真实口碑库)',
      tag: '选课红黑榜',
      type: 'RECOMMENDED',
      location: '选课参考评教库',
      summary: '选老师比选课更重要！工程伦理首选刘坤老师，工程管理首选丁冬老师。避开张世云老师。',
      details: '根据学长学姐真实选课反馈：通识课与工程课选老师至关重要！',
      tips: [
        '🌟 推荐好老师：《工程伦理》《工程与社会》首选【刘坤】老师（幽默神中神，课讲得有趣给分高），【付佳】【尹龙】老师（和善分高）；《工程管理与经济决策》【丁冬】老师（透题怪，最后一节课讲啥考啥），【李立平】女老师（人好爱给机会）',
        '⚠️ 避坑预警：《工程伦理》【张世云】老师（抽人频繁，平时分与小组汇报给分极低，不推荐）；【杨振国】老师（作业需与课本一字不落，开卷考要买专门书，较古板）；【崔亚平】《融合创新与产品运营》（3学分但事务繁多）'
      ]
    },
    // 交通与快递
    {
      id: 'express-1',
      category: 'express',
      title: '🚌 346与347路公交精准路线 vs 崇文路堵车规避',
      tag: '交通出行',
      type: 'IMPORTANT',
      location: '崇文路 / 南山路段',
      summary: '346路到较场口/解放碑（经南坪），347路到菜园坝火车站。早晚高峰及周末南山极堵！',
      details: '重邮地处南山风景区，崇文路是唯一上下山主干道！早晚上下班高峰（7:30-9:00, 17:30-19:00）及周末南山游客多时，崇文路常面临堵瘫。',
      tips: [
        '🚌 公交精准匹配：346路（重邮 ⇋ 较场口/解放碑商圈，途中经过南坪）；347路（重邮/老厂 ⇋ 菜园坝火车站，途经南坪红星美凯龙与福利社）',
        '🚇 地铁避堵神器：从学校坐346/347下山至【上新街站】换乘轨道交通 6号线/环线，是避开主城陆路大堵车最稳妥方案',
        '🚫 严禁滑板/自行车：山城陡坡落差大，绝不能买滑板或骑共享单车，极其危险'
      ]
    },
    {
      id: 'express-2',
      category: 'express',
      title: '🚕 校内打车/网约车定位漂移与接驾地点避坑',
      tag: '打车定位技巧',
      type: 'IMPORTANT',
      location: '校门口 / 逸夫科技楼 / 老校门',
      summary: '因山体阻挡 GPS 易漂移，司机常迷路。打车定位切勿定在寝室深处，应定在老校门或逸夫楼。',
      details: '因重邮建在南山山坡上，高层建筑与山体阻挡导致 GPS 信号常出现漂移，司机若不熟悉山路极易迷路或开错门。',
      tips: [
        '📍 正确定位地址：建议上车地点定在【重邮老校门】、【新校门】或【逸夫科技楼】等大标示性建筑入口',
        '📞 提前沟通：叫单后第一时间给司机打电话：“师傅我是重邮学生，在XX门等”',
        '🌧️ 雨天及节假日提前使用高德/滴滴预约订单'
      ]
    },
    {
      id: 'express-3',
      category: 'express',
      title: '📦 校内快递驿站分布与错峰取件',
      tag: '快递取件避坑',
      type: 'RECOMMENDED',
      location: '教急快递中心 / 各苑区菜鸟驿站',
      summary: '地址需写清苑区与楼栋。绝对避开 12:00-13:00 与 21:00-22:30 的数百米排队死穴！',
      details: '校内快递主要集中在【教急快递服务中心】以及知行苑、兴业苑、明理苑下方的菜鸟驿站。',
      tips: [
        '📮 快递地址规范写法：重庆市南岸区崇文路2号重庆邮电大学 + [所在苑区名称+楼栋号+寝室号]',
        '⚠️ 错峰提示：绝对避开 12:00-13:00 与 21:00-22:30，推荐在上午10点前或下午4点前错峰取件'
      ]
    },
    // 避坑红线与办卡驾校
    {
      id: 'avoid-1',
      category: 'avoid',
      title: '📱 校园卡/手机卡：真实优惠揭秘 vs 办理防诈指南',
      tag: '办卡客观指南',
      type: 'NEUTRAL',
      location: '暑期线上扫码 / 校内营业厅',
      summary: '新生校园卡包含 150G-390G 流量+宽带，资费30-40元/月性价比极高！认准正规域名与营业厅办理。',
      details: '三大运营商针对大一新生推出的“校园卡/大流量套餐”确实拥有普通商业卡难以企及的超高性价比（30-40元/月 包含 150G-390G 流量与宽带），暑期线上正规代理渠道办理确实能提前拿卡使用，并非不能办。',
      tips: [
        '🌟 真实优惠点：套餐流量充足且绑定校园网账号后性价比极高',
        '⚠️ 防诈识别：确认页面为运营商官方小程序（认准重邮官方 cqupt.edu.cn），切勿向微信/QQ个人转账或发手持身份证照',
        '💡 稳妥建议：开学报到当天在校内【移动/电信/联通官方实体营业厅】摊位现场选号办理同样享受优惠'
      ]
    },
    {
      id: 'avoid-2',
      category: 'avoid',
      title: '🚗 驾校学车：大学学车优势 vs 正规报名避坑',
      tag: '驾校客观指南',
      type: 'NEUTRAL',
      location: '南山驾校训练场 / 校内招新点',
      summary: '大一大二学车划算高效，校旁驾校常有重邮专属团购优惠。坚决拒绝私人中介，必须实地看场地签正规合同。',
      details: '大学期间利用空余时间学车拿驾照确实划算方便，校周边的正规驾校开学季常有面向重邮学生的团购优惠。',
      tips: [
        '🌟 真实优势：校附近正规驾校接送方便，大学生组团能争取到优惠和优先练车',
        '⚠️ 防坑关键：坚决不找私人中介私下缴费（谨防卷款跑路），实地查看场地距离（重庆坡道多），签订包含所有考试费用的正规合同',
        '💡 稳妥建议：开学后亲自去南山或校旁练车场实地看场地、试乘后，再签订合同缴费'
      ]
    },
    {
      id: 'avoid-3',
      category: 'avoid',
      title: '🚨 床上用品：扫楼卖被子骗局 vs 推荐正规购买',
      tag: '床品防骗',
      type: 'WARNING',
      location: '暑期QQ群 / 新生寝室门',
      summary: '开学当晚假冒学长扫楼卖300-500元劣质黑心棉！学校绝不下寝室卖被子，建议提前网购直寄或校内超市买。',
      details: '开学报到当天或当晚，会有冒充“学长学姐”进寝室推销高价被褥套装（300-500元）。',
      tips: [
        '❌ 避坑：99% 的私信推销和上门扫楼均为黑心棉劣质产品，售价虚高且无售后',
        '✅ 推荐途径：1. 提前网购国标A类床品直接邮寄到苑区驿站（被子1.5x2.0m，床垫0.9x2.0m）；2. 报到当天校内重邮超市购买'
      ]
    }
  ];

  // Filtering
  const filteredItems = allGuideItems.filter(item => {
    const matchesCategory = activeTab === 'all' || item.category === activeTab;
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tips.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = filterType === 'ALL' || item.type === filterType;

    return matchesCategory && matchesSearch && matchesType;
  });

  const toggleBookmark = (id, e) => {
    e.stopPropagation();
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(bookmarkedIds.filter(bId => bId !== id));
    } else {
      setBookmarkedIds([...bookmarkedIds, id]);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#090d16',
      color: '#f1f5f9',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      paddingBottom: '80px',
      overflowX: 'hidden'
    }}>
      {/* App Mobile Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'rgba(9, 13, 22, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {onBack && (
            <button 
              onClick={onBack}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                color: '#fff',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <ArrowLeft size={18} />
            </button>
          )}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{
                background: 'linear-gradient(90deg, #ff9900, #ff0055)',
                color: '#fff',
                fontSize: '0.65rem',
                fontWeight: '800',
                padding: '1px 6px',
                borderRadius: '4px',
                letterSpacing: '0.5px'
              }}>
                CQUPT 2026
              </span>
              <span style={{ fontSize: '0.72rem', color: '#00f0ff', fontWeight: '600' }}>
                重邮掌上宝典
              </span>
            </div>
            <h1 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#fff', margin: 0 }}>
              重庆邮电大学 • 新生指南
            </h1>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: '重庆邮电大学新生避坑指南',
                  url: window.location.href
                }).catch(() => {});
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('链接已复制到剪贴板！');
              }
            }}
            style={{
              background: 'rgba(0, 240, 255, 0.1)',
              border: '1px solid rgba(0, 240, 255, 0.3)',
              color: '#00f0ff',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <Share2 size={16} />
          </button>
        </div>
      </header>

      {/* Mobile Search & Quick Filters */}
      <div style={{ padding: '14px 16px 8px 16px' }}>
        <div style={{ position: 'relative', marginBottom: '12px' }}>
          <Search size={16} style={{
            position: 'absolute',
            left: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#64748b'
          }} />
          <input
            type="text"
            placeholder="搜索：3元小面 / 刘坤 / 346路 / 选课..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              backgroundColor: 'rgba(30, 41, 59, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '12px',
              padding: '12px 14px 12px 40px',
              color: '#fff',
              fontSize: '0.9rem',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Filter Pills */}
        <div style={{
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          paddingBottom: '4px',
          WebkitOverflowScrolling: 'touch'
        }}>
          {[
            { id: 'ALL', label: '全部属性' },
            { id: 'RECOMMENDED', label: '🌟 强烈推荐' },
            { id: 'WARNING', label: '⚠️ 避坑预警' },
            { id: 'IMPORTANT', label: '❗ 核心须知' },
            { id: 'NEUTRAL', label: '💡 客观指南' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setFilterType(t.id)}
              style={{
                backgroundColor: filterType === t.id ? 'rgba(0, 240, 255, 0.18)' : 'rgba(255, 255, 255, 0.04)',
                border: `1px solid ${filterType === t.id ? '#00f0ff' : 'rgba(255, 255, 255, 0.08)'}`,
                color: filterType === t.id ? '#00f0ff' : '#94a3b8',
                borderRadius: '20px',
                padding: '5px 12px',
                fontSize: '0.76rem',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                flexShrink: 0
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal Scroll Navigation Tabs */}
      <div style={{
        display: 'flex',
        overflowX: 'auto',
        padding: '8px 16px',
        gap: '8px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        WebkitOverflowScrolling: 'touch'
      }}>
        {tabs.map(tab => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: isActive ? '#00f0ff' : 'rgba(30, 41, 59, 0.5)',
                color: isActive ? '#090d16' : '#cbd5e1',
                border: 'none',
                borderRadius: '10px',
                padding: '8px 14px',
                fontSize: '0.82rem',
                fontWeight: isActive ? '700' : '500',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                flexShrink: 0,
                transition: 'all 0.2s ease',
                boxShadow: isActive ? '0 2px 10px rgba(0, 240, 255, 0.3)' : 'none'
              }}
            >
              <IconComponent size={15} color={isActive ? '#090d16' : '#00f0ff'} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Content Cards */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filteredItems.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px 20px',
            backgroundColor: 'rgba(30, 41, 59, 0.3)',
            borderRadius: '16px',
            border: '1px dashed rgba(255, 255, 255, 0.1)',
            color: '#94a3b8'
          }}>
            <Info size={32} color="#00f0ff" style={{ marginBottom: '8px' }} />
            <p style={{ margin: 0, fontSize: '0.9rem' }}>没有找到符合搜索条件的指南条目</p>
          </div>
        ) : (
          filteredItems.map(item => {
            const isBookmarked = bookmarkedIds.includes(item.id);
            return (
              <div 
                key={item.id}
                style={{
                  backgroundColor: 'rgba(15, 23, 42, 0.75)',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  padding: '16px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                  backdropFilter: 'blur(10px)',
                  position: 'relative'
                }}
              >
                {/* Card Top Badge Header */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '10px',
                  gap: '8px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: '700',
                      padding: '2px 8px',
                      borderRadius: '6px',
                      backgroundColor: 
                        item.type === 'WARNING' ? 'rgba(255, 51, 102, 0.15)' :
                        item.type === 'RECOMMENDED' ? 'rgba(0, 255, 136, 0.15)' :
                        item.type === 'IMPORTANT' ? 'rgba(255, 170, 0, 0.15)' : 'rgba(0, 240, 255, 0.15)',
                      color: 
                        item.type === 'WARNING' ? '#ff3366' :
                        item.type === 'RECOMMENDED' ? '#00ff88' :
                        item.type === 'IMPORTANT' ? '#ffaa00' : '#00f0ff',
                      border: `1px solid ${
                        item.type === 'WARNING' ? '#ff3366' :
                        item.type === 'RECOMMENDED' ? '#00ff88' :
                        item.type === 'IMPORTANT' ? '#ffaa00' : '#00f0ff'
                      }`
                    }}>
                      {item.tag}
                    </span>

                    <span style={{
                      fontSize: '0.7rem',
                      color: '#94a3b8',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '3px',
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}>
                      <MapPin size={11} color="#00f0ff" /> {item.location}
                    </span>
                  </div>

                  <button
                    onClick={(e) => toggleBookmark(item.id, e)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: isBookmarked ? '#ffaa00' : '#475569',
                      cursor: 'pointer',
                      padding: '4px'
                    }}
                  >
                    <Bookmark size={18} fill={isBookmarked ? '#ffaa00' : 'none'} />
                  </button>
                </div>

                {/* Card Title */}
                <h3 style={{
                  fontSize: '1.05rem',
                  fontWeight: '700',
                  color: '#fff',
                  lineHeight: '1.4',
                  margin: '0 0 8px 0'
                }}>
                  {item.title}
                </h3>

                {/* Summary / Details */}
                <p style={{
                  fontSize: '0.86rem',
                  color: '#cbd5e1',
                  lineHeight: '1.55',
                  margin: '0 0 12px 0',
                  backgroundColor: 'rgba(0, 0, 0, 0.25)',
                  padding: '10px 12px',
                  borderRadius: '10px'
                }}>
                  {item.details}
                </p>

                {/* Tips bullet list */}
                {item.tips && item.tips.length > 0 && (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    backgroundColor: 'rgba(0, 240, 255, 0.03)',
                    borderLeft: '3px solid #00f0ff',
                    padding: '8px 10px',
                    borderRadius: '0 8px 8px 0'
                  }}>
                    <div style={{ fontSize: '0.72rem', color: '#00f0ff', fontWeight: '700' }}>
                      学长学姐经验 / TIPS:
                    </div>
                    {item.tips.map((tip, idx) => (
                      <div key={idx} style={{
                        fontSize: '0.8rem',
                        color: '#94a3b8',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '4px',
                        lineHeight: '1.45'
                      }}>
                        <ChevronRight size={13} color="#ff007f" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Floating Toast Notification */}
      {showToast && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#00f0ff',
          color: '#090d16',
          padding: '10px 20px',
          borderRadius: '24px',
          fontWeight: '700',
          fontSize: '0.85rem',
          boxShadow: '0 4px 20px rgba(0, 240, 255, 0.4)',
          zIndex: 100
        }}>
          ✨ 已成功收藏到你的个人宝典！
        </div>
      )}

      {/* Bottom Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '24px 16px',
        color: '#475569',
        fontSize: '0.75rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        © 2026 重庆邮电大学掌上新生指南 • 移动端高保真极速版
      </footer>
    </div>
  );
}
