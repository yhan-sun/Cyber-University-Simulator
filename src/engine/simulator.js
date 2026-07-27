// Smart Real-World Procedural Scenario Matrix with Academic Realism

export const MAJORS_LIST = [
  { id: "cs_tech", label: "💻 计算机科学与技术 / 软件工程", tag: "MAJOR_CS" },
  { id: "electronic", label: "⚡ 电子信息工程 / 通信工程", tag: "MAJOR_EE" },
  { id: "finance", label: "📈 金融学 / 国际经济与贸易", tag: "MAJOR_FINANCE" },
  { id: "literature", label: "📚 汉语言文学 / 赛博传媒", tag: "MAJOR_ARTS" },
  { id: "medicine", label: "🩺 临床医学 / 赛博生物工程", tag: "MAJOR_MED" },
  { id: "design", label: "🎨 视觉传达设计 / 数字媒体艺术", tag: "MAJOR_DESIGN" }
];

export const MONTH_CALENDAR = [
  { year: 1, term: 1, month: 9, monthLabel: "大一 9月", season: "AUTUMN", theme: "新体验" },
  { year: 1, term: 1, month: 10, monthLabel: "大一 10月", season: "AUTUMN", theme: "探索" },
  { year: 1, term: 1, month: 11, monthLabel: "大一 11月", season: "AUTUMN", theme: "学业期中" },
  { year: 1, term: 2, month: 1, monthLabel: "大一 1月", season: "WINTER", theme: "期末大考" },
  { year: 1, term: 2, month: 3, monthLabel: "大一 3月", season: "SPRING", theme: "开学季" },
  { year: 1, term: 2, month: 5, monthLabel: "大一 5月", season: "SPRING", theme: "体育与选修" },
  
  { year: 2, term: 1, month: 9, monthLabel: "大二 9月", season: "AUTUMN", theme: "专业深化" },
  { year: 2, term: 1, month: 11, monthLabel: "大二 11月", season: "AUTUMN", theme: "学科竞赛" },
  { year: 2, term: 2, month: 3, monthLabel: "大二 3月", season: "SPRING", theme: "课题实践" },
  { year: 2, term: 2, month: 5, monthLabel: "大二 5月", season: "SPRING", theme: "资格认证" },

  { year: 3, term: 1, month: 9, monthLabel: "大三 9月", season: "AUTUMN", theme: "方向抉择" },
  { year: 3, term: 1, month: 11, monthLabel: "大三 11月", season: "AUTUMN", theme: "复习备考" },
  { year: 3, term: 2, month: 4, monthLabel: "大三 4月", season: "SPRING", theme: "大厂实习" },
  { year: 3, term: 2, month: 6, monthLabel: "大三 6月", season: "SUMMER", theme: "实习实战" },

  { year: 4, term: 1, month: 10, monthLabel: "大四 10月", season: "AUTUMN", theme: "秋招与开题" },
  { year: 4, term: 1, month: 12, monthLabel: "大四 12月", season: "WINTER", theme: "研究生初试" },
  { year: 4, term: 2, month: 5, monthLabel: "大四 5月", season: "SPRING", theme: "论文答辩" },
  { year: 4, term: 2, month: 6, monthLabel: "大四 6月", season: "SUMMER", theme: "毕业典礼" }
];

export const INITIAL_STATS = {
  academic: 50,
  skill: 50,
  wealth: 50,
  love: 30,
  network: 40,
  happiness: 60,
  health: 70,
  stress: 20
};

export function analyzeUniversityTier(name) {
  const cleanName = name.trim();

  const topC9List = ["清华", "北京大学", "北大", "复旦", "上海交通大学", "上海交大", "浙江大学", "浙大", "中国科学技术大学", "中科大", "南京大学", "南大", "哈尔滨工业大学", "哈工大", "西安交通大学", "西安交大", "Cyber Matrix", "赛博黑客"];
  if (topC9List.some(k => cleanName.includes(k))) {
    return { tier: "TOP_C9", statBonus: { academic: 10, skill: 6, stress: 10 }, eventsTag: "TIER_TOP" };
  }

  const g985List = ["中山大学", "武汉大学", "华中科技大学", "华科", "同济大学", "南开大学", "天津大学", "四川大学", "川大", "电子科技大学", "成电", "厦门大学", "厦大", "吉林大学", "北京航空航天大学", "北航", "北京理工大学", "北理", "西北工业大学", "西工大", "中国人民大学", "人大", "山东大学", "山大", "中南大学", "湖南大学", "重庆大学", "重大", "兰州大学", "大连理工大学", "东南大学", "985"];
  if (g985List.some(k => cleanName.includes(k))) {
    return { tier: "TIER_985", statBonus: { academic: 8, skill: 5, network: 5 }, eventsTag: "TIER_985" };
  }

  const g211List = ["重庆邮电大学", "重邮", "北京邮电大学", "北邮", "南京邮电大学", "南邮", "西安电子科技大学", "西电", "上海大学", "苏州大学", "暨南大学", "华中师范", "华东师范", "中国政法大学", "西南财经大学", "中南财经政法", "上海财经大学", "北京交通大学", "西南交通大学", "河海大学", "江南大学", "211"];
  if (g211List.some(k => cleanName.includes(k))) {
    return { tier: "TIER_211", statBonus: { skill: 8, network: 5, wealth: 4 }, eventsTag: "TIER_211" };
  }

  return { tier: "REGULAR", statBonus: { happiness: 5, stress: -3 }, eventsTag: "TIER_REGULAR" };
}

// Realistic Academic Scenario Database Matrix
const SCENARIO_MATRIX = {
  // Season Atmosphere Descriptions
  SEASONS: {
    AUTUMN: [
      "微凉的秋风吹过金黄的银杏树下，校园里弥漫着清新的空气。",
      "秋高气爽的午后，温暖的阳光斜照在图书馆的窗台上。",
      "秋天傍晚落日余晖洒在操场上，远处传来球赛的声音。"
    ],
    SPRING: [
      "春暖花开，校园林荫路两旁盛开着娇艳的花朵。",
      "春雨初晴，空气里弥漫着湿润的泥土与青草香味。",
      "阳光明媚的阳春三月，操场上不少同学在散步踏青。"
    ],
    SUMMER: [
      "夏日的蝉鸣声在繁茂的树枝间此起彼伏，风扇在头顶缓缓旋转。",
      "初夏的夜晚微风拂面，操场上传来吉他与歌声。",
      "夏天的清晨阳光明亮，早读的同学已经在湖边朗读。"
    ],
    WINTER: [
      "冬日微寒，自习室里开着暖气，大家正安静地低头复习。",
      "寒风呼啸的冬夜，宿舍楼里透着温馨的灯光。",
      "清晨寒气袭人，教学楼里已经陆陆续续坐满了课前预习的人。"
    ]
  },

  // Academic Action Synthesizers per Major Group
  MAJOR_ACTIVITIES: {
    MAJOR_CS: [
      { action: "算法复杂性分析研讨", choiceA: "用动态规划递推求解，优化时空复杂度", choiceB: "和同桌探讨回溯算法剪枝技巧" },
      { action: "开源项目代码 Code Review", choiceA: "认真梳理代码注释并提交 PR 补丁", choiceB: "学习顶尖项目的模块化架构设计" },
      { action: "分布式系统故障排查", choiceA: "分析网络抓包数据，定位节点超时原因", choiceB: "重构心跳包机制，提升系统容错能力" }
    ],
    MAJOR_EE: [
      { action: "高频电子线路实验", choiceA: "微调电容电感参数，匹配高频谐振频率", choiceB: "对照原理图检查信号通路与接地线" },
      { action: "单片机嵌入式开发测试", choiceA: "编写中断服务函数，处理按键去抖", choiceB: "用逻辑分析仪观测串口通信时序" }
    ],
    MAJOR_FINANCE: [
      { action: "宏观经济数据解读讨论", choiceA: "撰写加息周期下的资产配置研报", choiceB: "收集行业板块数据进行对比分析" },
      { action: "公司财务造假识别实训", choiceA: "从现金流量表与存货周转率查找线索", choiceB: "分析审计报告中的保留意见条款" }
    ],
    DEFAULT: [
      { action: "选修课学术交叉研讨", choiceA: "结合本专业知识发表跨界独到见解", choiceB: "认真听取其他专业同学的切入视角" },
      { action: "社团志愿服务与经验分享", choiceA: "主动承担组织协调工作，保障活动顺畅", choiceB: "协助后勤保障，和大家打成一片" },
      { action: "校园体育趣味赛事", choiceA: "全情投入拼尽全力，为集体争取荣誉", choiceB: "享受运动过程，结识新朋友" }
    ]
  }
};

export function generateProceduralEvent(currentStepIndex, playerTags = [], usedTitles = []) {
  const currentStep = MONTH_CALENDAR[Math.min(currentStepIndex, MONTH_CALENDAR.length - 1)];
  const seasonTextList = SCENARIO_MATRIX.SEASONS[currentStep.season] || SCENARIO_MATRIX.SEASONS.SPRING;
  const seasonDesc = seasonTextList[currentStepIndex % seasonTextList.length];

  // Match Major
  let majorKey = "DEFAULT";
  if (playerTags.includes("MAJOR_CS")) majorKey = "MAJOR_CS";
  else if (playerTags.includes("MAJOR_EE")) majorKey = "MAJOR_EE";
  else if (playerTags.includes("MAJOR_FINANCE")) majorKey = "MAJOR_FINANCE";

  const activityList = SCENARIO_MATRIX.MAJOR_ACTIVITIES[majorKey] || SCENARIO_MATRIX.MAJOR_ACTIVITIES.DEFAULT;
  const activity = activityList[currentStepIndex % activityList.length];

  let title = `${currentStep.monthLabel}：${activity.action}`;
  let attempt = 0;
  while (usedTitles.includes(title) && attempt < 10) {
    attempt++;
    title = `${currentStep.monthLabel}：${activity.action} (第${attempt + 1}阶段)`;
  }

  const uniqueId = `smart_synth_${currentStep.year}_${currentStep.month}_${currentStepIndex}_${Math.floor(Math.random() * 10000)}`;

  return {
    id: uniqueId,
    templateId: uniqueId,
    year: currentStep.year,
    term: currentStep.term,
    month: currentStep.month,
    monthLabel: currentStep.monthLabel,
    isDynamic: true,
    title: title,
    text: `${seasonDesc}在${activity.action}的现场，你需要做出应对。`,
    choices: [
      { text: activity.choiceA, effect: { academic: 8, skill: 8, happiness: 5 }, log: `你在${activity.action}中取得了令人满意的进展。` },
      { text: activity.choiceB, effect: { happiness: 8, network: 8, stress: -4 }, log: `你通过团队合作顺畅地完成了任务。` }
    ]
  };
}
